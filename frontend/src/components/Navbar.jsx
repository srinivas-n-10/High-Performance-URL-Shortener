import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-gray-800">
        ShortLink
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>

            <span className="text-gray-500 text-sm">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-gray-600 hover:text-gray-900"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}