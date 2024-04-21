import { ListFilterIcon } from 'lucide-react';
import Modal from '../Modal/Modal';
import Sidebar, { Collection } from './Sidebar';

interface Props {
  show: boolean;
  onHide: () => void;
  mutate?: () => void;
  collections: Collection[];
}

export default function SideModal({ collections, show, onHide }: Props) {
  return (
    <Modal.Side direction="left" {...{ show, onHide }}>
      <div className="min-w-[300px] p-6 space-y-6">
        <div className="text-2xl font-semibold">Collections</div>
        <Sidebar collections={collections} />
      </div>
    </Modal.Side>
  );
}
