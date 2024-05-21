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
  final_price?: number;
}

export interface CartItem extends ProductModel {
  selected_size?: number;
  selected_quantity?: number;
  selected_color?: string;
}
