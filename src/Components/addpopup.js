'use client';

import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

export default function AddPopup({ title = 'Add Item', children }) {
  const [visible, setVisible] = useState(false);

  // Show popup on first render
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Dialog
      header={''}
      visible={visible}
      onHide={() => setVisible(false)}
      //   style={{ width: '30vw' }}
      modal
      draggable={false}
      closable
    >
      {children}
    </Dialog>
  );
}
