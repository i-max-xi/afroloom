'use client';

import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

export default function BannerNotice({
  message = 'Click here to design a sash in 1 min',
  href = '/design', // default link destination
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
        className="text-sm text-white font-medium underline underline-offset-2 hover:text-yellow-300 transition"
      >
        {message}
      </a>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
      >
        <IoMdCloseCircle className="h-5 w-5 text-white hover:text-red-300 transition" />
      </button>
    </div>
  );
}
