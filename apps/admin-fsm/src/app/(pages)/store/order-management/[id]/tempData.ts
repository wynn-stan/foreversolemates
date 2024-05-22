//Details to send you regarding a product's purchase
// the field names are just for demonstration purpose, you choose the final names and I will update them as well

export const PurchaseOrderDetails = {
  _id: '664cfcc610d690bc5ffe5dbd',
  orderedby: 'kwabenakoranteng5@gmail.com',
  order_reference: 'FSM20249521-XzY', // unique order reference
  delivery_status: 'in-production',

  subtotal: 100, // the subtotal of the order
  tax_amount: 20, // the amount added as tax, this is based on a tax percent that is set by Product team
  total: 120, //the total amount, subtotal + tax_amount

  products_bought: [
    {
      product_id: {
        _id: '661d07dd434f2f12598729ac',
        images: [
          'https://res.cloudinary.com/dxawngoxn/image/upload/v1716308994/product_images/1716308994209-1713895753834-1713895701211-1713807201713-1713178588324-WhatsApp%2525252520Image%25252525202024-03-06%2525252520at%252525252011.20.55%2525252520PM.jpeg.jpg.jpg.jpg.jpg.jpg',
        ],
        product_name: 'Selorm',
        initial_price: 200,
        discount: 10,
        final_price: 180,
      },
      selected_size: 42,
      selected_color: 'black',
      selected_quantity: 4,
    },
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
    _id: '664cfcc610d690bc5ffe5dbe',
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
