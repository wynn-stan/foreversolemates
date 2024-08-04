export interface ModalProps {
  show: boolean;
  onHide: () => void;
  mutate?: () => void;
}

export interface CheckoutError {
  message: string;
  selected_size: any;
  selected_quantity: number;
  db_available_quantity: number;
  product_id: string;
  type: 'quantity' | 'delete';
}
