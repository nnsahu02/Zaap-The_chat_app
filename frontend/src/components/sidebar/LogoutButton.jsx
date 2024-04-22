import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <div className="mt-auto">
      {!loading ? (
        <>
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer"
            onClick={handleLogout}
          />
          {showModal && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
              <div className="bg-white w-80 rounded-lg shadow-lg">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
                  <p className="text-gray-700">Are you sure you want to logout?</p>
                </div>
                <div className="flex justify-end p-4 border-t border-gray-200">
                  <button
                    className="px-4 py-2 mr-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={confirmLogout}
                  >
                    Yes
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
