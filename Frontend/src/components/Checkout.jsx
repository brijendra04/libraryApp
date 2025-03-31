import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const { cartItems, clearCart, calculateTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded');
    };
    script.onerror = () => {
      console.error('Razorpay SDK failed to load');
      setCheckoutError('Failed to load payment system');
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    setCheckoutError(null);

    // Define API URL
    const API_URL = 'http://localhost:8080';

    try {
      // First test the connection
      console.log('Testing server connection...');
      let testResponse;
      try {
        testResponse = await fetch(`${API_URL}/test`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!testResponse.ok) {
          throw new Error(`HTTP error! status: ${testResponse.status}`);
        }
        const testData = await testResponse.json();
        console.log('Server test response:', testData);
      } catch (error) {
        console.error('Server connection test failed:', error);
        throw new Error('Server connection failed. Please try again later.');
      }

      // If connection test passed, proceed with payment
      console.log('Creating payment order...');
      const totalAmount = Math.round(calculateTotal(cartItems) * 100);

      const response = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          items: cartItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);

      if (!data.order || !data.order.id) {
        throw new Error('Invalid order response');
      }

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_uDK4EHaVGwje58',
        amount: data.order.amount,
        currency: "INR",
        name: "Book Store",
        description: "Book Purchase",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              toast.success('Payment successful!');
              clearCart();
              navigate('/success');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            console.error('Verification Error:', err);
            toast.error('Payment verification failed');
            setCheckoutError('Payment verification failed');
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#5469d4"
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error('Payment Error:', err);
      toast.error(err.message || 'An error occurred during checkout');
      setCheckoutError(err.message || 'An error occurred during checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/courses" className="back-button">
            ← Back to Shopping
          </Link>
          <h2>Checkout</h2>
        </div>

        {cartItems.length > 0 ? (
          <div className="checkout-content">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="item-image"
                        />
                      )}
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                      <span className="item-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="price-summary">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal(cartItems).toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="price-row total">
                  <strong>Total</strong>
                  <strong>₹{calculateTotal(cartItems).toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {checkoutError && (
              <div className="error-message">
                <span>⚠️ {checkoutError}</span>
              </div>
            )}
            
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="checkout-button"
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="button-text">Pay Now</span>
                  <span className="button-price">
                    ₹{calculateTotal(cartItems).toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/courses" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;