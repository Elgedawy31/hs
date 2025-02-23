import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, X } from 'lucide-react';
import UniBtn from './UniBtn';

const defaultStep = {
  label: '',
  optional: false,
  style: {
    icon: 'FaCheckDouble',
    bgColor: '#000000',
    color: '#ffffff'
  }
};

const AddModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialStep = defaultStep,
  size = 'md',
  hideCloseButton = false,
  hideFooter = false,
  saveButtonText = 'Save',
  cancelButtonText = 'No',
  isLoading = false,
  children
}) => {
  const [step, setStep] = useState(initialStep);

  const handleSave = () => {
    console.log('Save button clicked');
    onSave?.(step);
  };

  const handleClose = () => {
    console.log('Close/Cancel button clicked');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement="center"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm animate-fadeIn",
        base: "bg-body rounded-lg shadow-lg max-h-[81vh]",
        header: "border-b border-borderColor px-6 py-4",
        body: "px-6 py-4 overflow-y-auto",
        footer: "px-6 py-4",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {/* Header */}
        <ModalHeader className="flex justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <Plus size={18} className='border-2 border-borderColor rounded-md text-hoverText' />
            <span className="text-lg font-semibold text-hoverText">{title}</span>
          </div>
          {!hideCloseButton && (
            <UniBtn
              text={<X size={15} className='text-hoverText' />}
              onClick={handleClose}
              className="!p-0 !bg-transparent text-text hover:text-hoverText border-2 border-borderColor flex items-center justify-center rounded-full min-w-[24px] w-6 h-6"
            />
          )}
        </ModalHeader>

        {/* Body */}
        <ModalBody>
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </ModalBody>

        {/* Footer */}
        {!hideFooter && (
          <ModalFooter>
            <UniBtn
              text={cancelButtonText}
              onClick={handleClose}
              className="w-full !bg-transparent border-2 border-borderColor text-text hover:text-hoverText"
            />
            <UniBtn
              text={saveButtonText}
              onClick={handleSave}
              loading={isLoading}
              className="w-full text-white"
            />
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

AddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  title: PropTypes.string.isRequired,
  initialStep: PropTypes.shape({
    label: PropTypes.string,
    optional: PropTypes.bool,
    style: PropTypes.shape({
      icon: PropTypes.string,
      bgColor: PropTypes.string,
      color: PropTypes.string
    }),
    flagToAdd: PropTypes.string,
    flagToRemove: PropTypes.string,
    tagToAdd: PropTypes.string,
    tagToRemove: PropTypes.string,
    completed: PropTypes.bool
  }),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  hideCloseButton: PropTypes.bool,
  hideFooter: PropTypes.bool,
  saveButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

export default AddModal;
