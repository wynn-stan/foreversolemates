'use client';

import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

import CollectionComponent from './Collection';
import { Collection } from './Sidebar';

interface Props {
  collections: Collection[];
}

export default function SideModalToggle({ collections }: Props) {
  //state
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={clsx(
          'block md:hidden',
          'cursor-pointer',
          'text-gray-30 border border-gray-10 p-2 w-fit',
          'flex items-center'
        )}
        onClick={() => setShowMenu(true)}
      >
        <ListFilterIcon size={20} />
      </div>

      {/* Side Modal */}
      <CollectionComponent.SideModal
        show={showMenu}
        onHide={() => setShowMenu(false)}
        collections={collections}
      />
    </>
  );
}
