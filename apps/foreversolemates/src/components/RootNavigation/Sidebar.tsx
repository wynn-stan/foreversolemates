'use client';

import { Modal } from '@fsm/ui';
import { NavProps } from './RootNavigation';

export default function Sidebar({ showSidebar, setShowSidebar }: NavProps) {
  return (
    <Modal.Side
      direction="left"
      show={showSidebar}
      onHide={() => setShowSidebar(false)}
    >
      <div className="py-4 px-8 min-w-[300px]">Sidebar</div>
    </Modal.Side>
  );
}
