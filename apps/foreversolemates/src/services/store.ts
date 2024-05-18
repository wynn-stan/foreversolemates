import axios from 'axios';

interface CheckoutPayload {
  details?: any;
}

export const generateCheckoutLink = (payload: CheckoutPayload) =>
  axios.post<never, any>(`/api/generate-checkout-link`, payload);
