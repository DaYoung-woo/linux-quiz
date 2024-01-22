import Modal from "react-modal";
import { alertPopupStyles } from "../../utils/styles";
import { ReactComponent as Check } from "../../assets/img/check_circle.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
Modal.setAppElement("#root");

function AlertPopup({ isOpen, onRequestClose, title, desc }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={alertPopupStyles}
      contentLabel="Example Modal"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Check className="mr-2" />
          <div>
            <p>{title}</p>
            <span className="text-gray-500">{desc}</span>
          </div>
        </div>
        <Close onClick={onRequestClose} />
      </div>
    </Modal>
  );
}

export default AlertPopup;
