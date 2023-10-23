import Link from "next/link"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  date: string
  data: string
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  date,
  data,
}: ModalProps) => {
  const dateObject = new Date(date!)
  const day = String(dateObject.getDate()).padStart(2, "0")
  const month = String(dateObject.getMonth() + 1).padStart(2, "0")
  const year = dateObject.getFullYear()
  const stringDateFormat = `${day}/${month}/${year}`
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-lg">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white w-96 mx-auto rounded shadow-lg z-50">
        <div className="modal-content p-6">
          {children}
          {!data ? (
            ""
          ) : (
            <Link
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 block"
              href={`/reservation?date=${stringDateFormat}`}
            >
              Proceed to reservation
            </Link>
          )}

          <button
            className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
