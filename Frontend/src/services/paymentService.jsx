import axios from 'axios';

const API_BASE_URL = '/api/payments';

/**
 * Create a new Razorpay order by calling the backend.
 * @param {Object} orderData - Contains amount and currency for the order.
 * @returns {Promise<Object>} - Razorpay order details from the backend.
 */
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-order`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating Razorpay order:', error.message);
        throw new Error('Failed to create order. Please try again.');
    }
};

/**
 * Verify the payment by sending payment details to the backend.
 * @param {Object} paymentData - Contains Razorpay payment details.
 * @returns {Promise<Object>} - Verification response from the backend.
 */
export const verifyPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/verify-payment`, paymentData);
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error.message);
        throw new Error('Payment verification failed. Please try again.');
    }
};
