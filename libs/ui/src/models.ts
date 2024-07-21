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

export interface CartItem extends ProductModel {
  selected_size?: number;
  selected_quantity?: number;
  selected_color?: string;
}

export interface PaginatedData<T> {
  data: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

export interface FiltersModel {
  price?: 'low_to_high' | 'high_to_low';
  name?: string;
  order_reference?: string;
  amount_paid?: 'low_to_high' | 'high_to_low';
  channel?: 'card' | 'mobile_money';
  delivery_status?:
    | 'in production'
    | 'ready for delivery'
    | 'out for delivery'
    | 'delivered'
    | 'order reversed';
  page?: number;
}

export interface LocationModel {
  cost: number;
  name: string;
  _id: string;
}
