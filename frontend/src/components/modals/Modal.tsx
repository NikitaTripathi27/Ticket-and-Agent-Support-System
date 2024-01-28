import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  body: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, body }) => {
  const [, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/40 z-[1000] flex justify-center p-4 items-center w-full min-h-screen overflow-y-auto">
      <div className="bg-white rounded-lg relative text-gray-900 p-4 max-w-2xl w-full">
        <button
          className="cursor-pointer absolute right-4 top-4 text-2xl"
          onClick={handleClose}
        >
          <IoClose />
        </button>
        <h3 className="text-2xl font-bold mb-6 ">{title}</h3>
        <div className="">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
