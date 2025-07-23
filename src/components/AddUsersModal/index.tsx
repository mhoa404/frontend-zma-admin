
interface Props {
  onClose?: () => void;
}
const AddUsersModal = ({ onClose }: Props) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add users</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            X
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Name</h3>

            {/* Email input */}
            <div className="flex items-center gap-2 mb-4">
              <input
                placeholder="Enter name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Email</h3>

            {/* Email input */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Password</h3>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="password"
                placeholder="Enter password"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUsersModal;