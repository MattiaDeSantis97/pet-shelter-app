import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

export default function Navbar() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-xl font-bold text-teal-400">PetShelter</Link>
          <Link to="/animals" className="hover:text-teal-300">Lista Animali</Link>
          
          {/* Rendering condizionale basato sul ruolo */}
          {role === 'volunteer' && (
            <Link to="/volunteer-dashboard" className="hover:text-teal-300">Dashboard Volontario</Link>
          )}
          {role === 'admin' && (
            <Link to="/admin-dashboard" className="hover:text-teal-300">Dashboard Admin</Link>
          )}
        </div>

        <div>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-medium"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}