import { Trash2 } from "lucide-react";

export default function DeleteConfirmation({ isOpen, onClose, onConfirm, folderName, title = 'Delete Folder', Icon = Trash2  , actionTxt = 'Delete', fullMsg }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-text/50 z-50 flex items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md p-6 relative animate-slideIn">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <Icon className="text-red-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-text">{title}</h2>

          <p className="mt-2 text-placeholderText">
            {
              fullMsg ? fullMsg : `
            Are you sure you want to delete "${folderName}"? This action cannot be undone.
              `
            }
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text hover:bg-secondPrimaryColor rounded-md
                transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600
                transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {actionTxt}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
