export default function DeleteConfirmation({ isOpen, onClose, onConfirm, folderName , title='Delete Folder'}) {
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
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          
          <h2 className="mt-4 text-lg font-semibold text-text">{title}</h2>
          
          <p className="mt-2 text-placeholderText">
            Are you sure you want to delete "{folderName}"? This action cannot be undone.
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
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
