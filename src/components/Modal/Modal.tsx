import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";

interface IModalTypes {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalTypes) => {
  return isOpen ? (
    <div className="modal-container">
      <div className="modal-content">
        <AiOutlineClose className="close-icon" size={28} onClick={onClose} />
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
