import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Plus, X } from 'lucide-react';

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
    onSave?.(step);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement="center"
      classNames={{
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
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
              size='sm'
              className="text-text hover:text-hoverText border-2 border-borderColor rounded-full !min-w-1 w-6 h-6"
            >
              <X size={15} className='text-hoverText' />
            </Button>
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
            <Button
              variant="bordered" 
              onPress={onClose}
              className="w-full border-borderColor text-text hover:text-hoverText"
            >
              {cancelButtonText}
            </Button>
            <Button
              onPress={handleSave}
              isLoading={isLoading}
              className="w-full bg-primary hover:bg-altPrimary text-white"
            >
              {saveButtonText}
            </Button>
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
