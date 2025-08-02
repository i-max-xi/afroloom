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
      header={null}
      visible={visible}
      onHide={() => setVisible(false)}
      dismissableMask
      showHeader={false}
      modal
      closable
      draggable={false}
      contentStyle={{ padding: 0 }}
      style={{ width: 'auto', maxWidth: '90vw', padding: 0, borderRadius: 10 }}
      headerStyle={{ padding: 0 }}
      className="p-0 m-0"
    >
      {children}
    </Dialog>
  );
}
