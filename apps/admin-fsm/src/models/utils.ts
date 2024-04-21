export interface ModalProps {
  show: boolean;
  onHide: () => void;
  mutate?: () => void;
}
