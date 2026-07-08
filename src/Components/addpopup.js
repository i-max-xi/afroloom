'use client';

import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

export default function AddPopup({ title = 'Add Item', children }) {
  const [visible, setVisible] = useState(false);

  // Show popup on first render
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Dialog
      header={null}
      visible={visible}
      onHide={() => setVisible(false)}
      modal
      showHeader={false}
      closable={false} // Hide default close icon
      draggable={false}
      contentStyle={{ padding: 0, position: 'relative' }}
      style={{
        width: 'auto',
        maxWidth: '90vw',
        borderRadius: 10,
        overflow: 'hidden',
      }}
      className="relative"
    >
      {/* Custom Close Button Overlay */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 z-10"
      >
        <IoMdCloseCircle className="h-6 w-6 text-black hover:text-red-400 transition" />
      </button>

      {children}
    </Dialog>
  );
}
