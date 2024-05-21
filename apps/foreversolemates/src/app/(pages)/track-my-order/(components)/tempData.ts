//Details to send you regarding a product's purchase
// the field names are just for demonstration purpose, you choose the final names and I will update them as well

export const PurchaseOrderDetails = {
  subtotal: 100, // the subtotal of the order
  tax_amount: 20, // the amount added as tax, this is based on a tax percent that is set by Product team
  total: 120, //the total amount, subtotal + tax_amount
  order_reference: 'FSM20249521-XzY', // unique order reference

  products_bought: [
    {
      id: 1, //  the id of the product
      selected_size: 42, //  the selected size of the product
      selected_color: 'black', //  the selected color of the product
      selected_quantity: 4, //  the selected quantity of the product
    },
    // ... etc
  ],

  payment_details: {
    id: 123452, //  these are fields that paystack gives back
    reference: 'abc89', //  reference
    receipt_number: '123', //  i don't know what data type the receipt number is
    amount: 120, //  the amount
    gateway_respone: 'Approved', // some message,
    paid_at: new Date().toDateString(),
    channel: 'mobile_money',
    currency: 'GHS',
    fees: 123,
  },

  delivery_details: {
    country: 'Ghana',
    recipient_first_name: '',
    recipient_last_name: '',
    recipient_address: '',
    recipient_city: '',
    recipient_postal_code: '', // optional
    recipient_phone: '',
    recipient_email: '',
  },
};
