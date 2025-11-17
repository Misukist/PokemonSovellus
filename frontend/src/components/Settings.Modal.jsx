import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-8 w-96 relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lapset ryhmiteltynä */}
        <div className="flex flex-col gap-4">
          {children}
        </div>

        {/* Close-nappi oikeassa yläkulmassa */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 text-lg"
        >
          ✕
        </button>

        {/* Close & Submit napit modalin alalaidassa vierekkäin */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-white rounded-lg hover:bg-neutral-700 transition"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ModalLiveDemoExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    alert('Form submitted!');
    setIsOpen(false);
  };

  return (
    <div className="">

        <div onClick={() => setIsOpen(true)}  className="flex gap-1 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-white">Settings</h2>

        <input 
          type="text" 
          placeholder="Email" 
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <h2 className="text-lg font-bold mt-4  pb-2 border-b border-neutral-700 text-white">Change Password</h2>
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <input 
          type="password" 
          placeholder="Password again" 
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </Modal>
    </div>
  );
};
