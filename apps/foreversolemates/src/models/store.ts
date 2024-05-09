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

export interface UserModel {
  cart: ProductModel[];
}
