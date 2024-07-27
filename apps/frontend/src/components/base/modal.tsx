import React from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal'

interface AdvanceModalProps {
    isOpen : boolean;
    onClose : () => void
    label? : string;
    children : React.ReactNode
    className? : string
}
const AdvanceModal = ({isOpen, onClose, label, children, className, ...props} : AdvanceModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel={label}
            className={className}
            >
			{children}
		</Modal>
	)
}

export default AdvanceModal
