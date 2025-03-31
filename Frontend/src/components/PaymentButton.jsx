import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const PaymentButton = ({ course }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    try {
      const cartItem = {
        id: course.id,
        name: course.bookname,
        price: parseFloat(course.price),
        image: course.image,
        quantity: 1
      };
      addToCart(cartItem);
      toast.success('Item added to cart');
      navigate('/checkout');
    } catch (error) {
      toast.error('Failed to process purchase');
      console.error('Buy Now Error:', error);
    }
  };

  const handleAddToCart = () => {
    try {
      const cartItem = {
        id: course.id,
        name: course.bookname,
        price: parseFloat(course.price),
        image: course.image,
        quantity: 1
      };
      addToCart(cartItem);
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Add to Cart Error:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full justify-center items-center mt-4">
      <button
        onClick={handleBuyNow}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        Buy Now
      </button>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default PaymentButton; 