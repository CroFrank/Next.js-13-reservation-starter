interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ReservationModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-lg">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white w-96 mx-auto rounded shadow-lg z-50">
        <div className="modal-content p-6">
          {children}

          <button
            className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  )
}
