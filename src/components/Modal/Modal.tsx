import React, { useEffect, useRef } from 'react';

const Frame: React.FC<{
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
  children: React.ReactNode;
}> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (closeOnEsc && open && e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [closeOnEsc, onClose, open]);

  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };
  return (
    <div
      className={`flex justify-center items-center absolute w-full h-screen l-0 inset-0 z-[999] p-8 text-black bg-black/55 ${
        open ? 'visible' : 'invisible'
      }`}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      {/* container: `max-w-sm` to make it reasonably narrow, `mx-auto` to center horizontally */}
      <div
        className="relative w-full max-w-sm mx-auto mt-8 bg-white rounded"
        ref={container}
      >
        {/* closer in the corner */}
        <button
          className="absolute -top-2 -right-2 bg-white flex justify-center rounded-full h-8 w-8 bg-gray-600 cursor-pointer shadow-xl"
          onClick={() => onClose()}
          title="Bye bye"
        >
          <span className="text-2xl leading-7 select-none">&times;</span>
        </button>
        {/* contents */}
        <div className="overflow-hidden bg-gray-800 rounded shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="block p-4 bg-gray-900">
    <h1 className="text-lg text-black text-center font-bold">{children}</h1>
  </div>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const Modal = { Frame, Head, Body };
