import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel, onClose }) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else if (onCancel) {
            onCancel();
        }
    };

    return (
        <div style={backdropStyle}>
            <div style={modalStyle}>
                <h3 style={titleStyle}>Confirm Action</h3>
                <p style={messageStyle}>{message}</p>
                <div style={buttonContainerStyle}>
                    {onConfirm && (
                        <button style={confirmBtnStyle} onClick={onConfirm}>
                            Yes, Confirm
                        </button>
                    )}
                    <button style={cancelBtnStyle} onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// === Styles ===
const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    maxWidth: '420px',
    width: '90%',
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease-out',
};

const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
};

const messageStyle = {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#555',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
};

const confirmBtnStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.3s ease',
};

const cancelBtnStyle = {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.3s ease',
};

export default ConfirmationModal;
