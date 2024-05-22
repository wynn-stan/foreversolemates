export interface CollectionModel {
  _id: string;
  banner_image: string;
  collection_name: string;
  top_tagline: string;
  bottom_tagline: string;
  status: string;
}

export interface ProductModel {
  _id: string;
  available_sizes: number[];
  images: string[];
  available_colors: string[];
  product_name: string;
  initial_price: number;
  discount: number;
  available_units: number;
  alert: number;
  description: string;
  status: string;
  collection_id: string;
  createdOn: string;
  final_price: number;
}

export interface OrderModel {
  _id: string;
  subtotal: number;
  tax_amount: number;
  total: number;
  orderedby: string;
  order_reference: string;

  delivery_details: {
    country: string;
    recipient_first_name: string;
    recipient_last_name: string;
    recipient_address: string;
    recipient_city: string;
    recipient_postal_code: string;
    recipient_phone: string;
    recipient_email: string;
    _id: string;
  };

  delivery_status: string;

  payment_details: {
    id: number;
    _id: string;
    reference: string;
    receipt_number: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    channel: string;
    currency: string;
    fees: number;
  };
  products_bought: {
    product_id: {
      _id: string;
      images: string[];
      product_name: string;
      initial_price: number;
      discount: number;
      final_price: number;
    };
    selected_size: number;
    selected_color: string;
    selected_quantity: number;
  }[];
}

// {
//   "_id": "664cfcc610d690bc5ffe5dbd",
//   "products_bought": [
//       {
//           "product_id": {
//               "_id": "661d07dd434f2f12598729ac",
//               "images": [
//                   "https://res.cloudinary.com/dxawngoxn/image/upload/v1716308994/product_images/1716308994209-1713895753834-1713895701211-1713807201713-1713178588324-WhatsApp%2525252520Image%25252525202024-03-06%2525252520at%252525252011.20.55%2525252520PM.jpeg.jpg.jpg.jpg.jpg.jpg"
//               ],
//               "product_name": "Selorm",
//               "initial_price": 200,
//               "discount": 10,
//               "final_price": 180
//           },
//           "selected_size": 42,
//           "selected_color": "black",
//           "selected_quantity": 4
//       }
//   ],
//   "subtotal": 100,
//   "tax_amount": 20,
//   "total": 120,
//   "orderedby": "kwabenakoranteng5@gmail.com",
//   "order_reference": "FSM20249521-XzY",
//   "payment_details": {
//       "id": "123452",
//       "reference": "abc89",
//       "receipt_number": "123",
//       "amount": 120,
//       "gateway_response": "Approved",
//       "paid_at": "2024-05-14T00:00:00.000Z",
//       "channel": "mobile_money",
//       "currency": "GHS",
//       "fees": 123,
//       "_id": "664cfcc610d690bc5ffe5dbe"
//   },
//   "delivery_details": {
//       "country": "Ghana",
//       "_id": "664cfcc610d690bc5ffe5dbf"
//   },
//   "delivery_status": "out for delivery",
//   "__v": 0
// }
