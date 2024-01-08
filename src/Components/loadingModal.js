import React from 'react';
import Modal from 'react-modal';


const LoadingModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      className="loading-modal-content"
      overlayClassName="loading-modal-overlay"
      ariaHideApp={false}
    >
      <div className="loading-spinner"></div>
    </Modal>
  );
};

export default LoadingModal;
