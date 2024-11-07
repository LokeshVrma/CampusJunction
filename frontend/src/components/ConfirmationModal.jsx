import React from 'react';
import PropTypes from 'prop-types';
import '../styles/confirmationModal.css'; // Ensure this path is correct

const ConfirmationModal = ({ shippingAddress, onConfirm, onCancel }) => {
    return (
        <div className="checkout-modal">
            <div className="checkout-modal-content">
                <h2>Confirm Checkout</h2>
                <p><strong>Shipping Address:</strong> {shippingAddress}</p>
                <p>Are you sure you want to proceed with the checkout?</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Confirm</button>
                    <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    shippingAddress: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
