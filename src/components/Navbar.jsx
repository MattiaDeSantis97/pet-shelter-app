import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

export default function Navbar() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md text-white p-4 shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-black text-teal-400 tracking-wider">PetShelter</Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            {/* Dropdown Lista Animali */}
            <div className="relative group py-2">
              <Link to="/animals" className="hover:text-teal-300 font-bold transition-colors flex items-center">
                Lista Animali <span className="ml-1 text-[10px]">▼</span>
              </Link>
              <div className="absolute left-0 top-full w-48 bg-white text-slate-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                <Link to="/animals?type=cane" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold border-b border-gray-50">Cani</Link>
                <Link to="/animals?type=gatto" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold border-b border-gray-50">Gatti</Link>
                <Link to="/animals?type=cavallo" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold">Altro</Link>
              </div>
            </div>

            {role === 'volunteer' && <Link to="/volunteer-dashboard" className="hover:text-teal-300 font-bold">Dashboard Volontario</Link>}
            
            <div className="relative group py-2">
              <span className="hover:text-teal-300 font-bold cursor-pointer flex items-center">Impostazioni <span className="ml-1 text-[10px]">▼</span></span>
              <div className="absolute left-0 top-full w-48 bg-white text-slate-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                <Link to="/about" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold border-b border-gray-50">Chi siamo</Link>
                <Link to="/contact" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold">Contattaci</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Desktop */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-black transition-all shadow-lg">Logout</button>
          ) : (
            <div className="relative group py-2">
              <span className="bg-teal-500 hover:bg-teal-400 px-6 py-2 rounded-full font-black cursor-pointer transition-all shadow-lg">Accedi ▼</span>
              <div className="absolute right-0 top-full w-56 bg-white text-slate-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                <Link to="/login?role=adopter" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold border-b border-gray-50">Login Adottante</Link>
                <Link to="/login?role=volunteer" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold border-b border-gray-50">Login Volontario</Link>
                <Link to="/login?role=admin" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 font-bold">Login Admin</Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </nav>
  );
}