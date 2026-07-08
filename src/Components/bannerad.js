'use client';

import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

export default function BannerNotice({
  message = 'Hot now🔥 Click here to design a sash in 1 min',
  href = '/design',
  className = '',
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 text-center relative flex items-center justify-center ${className}`}
    >
      <a
        href={href}
        className="text-sm text-white font-medium hover:text-yellow-300 transition"
      >
        Hot now🔥 Click{' '}
        <span className="underline underline-offset-2">here</span> to purchase
        your sash in 1 min
      </a>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden"
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
      >
        <IoMdCloseCircle className="h-5 w-5 text-white hover:text-red-300 transition" />
      </button>
    </div>
  );
}
