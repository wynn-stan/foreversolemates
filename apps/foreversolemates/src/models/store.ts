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
  // available_sizes: number[]; - taken off
  images: string[];
  // available_colors: string[]; - taken off
  product_name: string;
  initial_price: number;
  discount: number;
  // available_units: number; - taken off
  total_available_units: number;
  alert: number;
  description: string;
  status: string;
  collection_id: string;
  createdOn: string;
  final_price: number;
  available_sizes_and_units: { size: number; available_units: number }[];
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  delivery_details: {
    country?: string;
    location?: string;
    cost?: number;
    recipient_first_name?: string;
    recipient_last_name?: string;
    recipient_address?: string;
    recipient_city?: string;
    recipient_phone?: string;
    recipient_email?: string;
    _id: string;
  };
  cart: ProductModel[];
  order_reference: string;
}

export interface CartItem extends ProductModel {
  selected_size?: number;
  selected_quantity?: number;
  selected_color?: string;
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
    cost?: number;
    location?: string;
    custom_message?: string;
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
