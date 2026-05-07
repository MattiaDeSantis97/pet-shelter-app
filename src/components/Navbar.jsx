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
    <nav className="bg-slate-900/90 backdrop-blur-md text-white p-4 shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-black text-teal-400 tracking-wider">PetShelter</Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <Link to="/animals" className="hover:text-teal-300 transition-colors">Lista Animali</Link>
            {role === 'volunteer' && <Link to="/volunteer-dashboard" className="hover:text-teal-300 transition-colors">Dashboard Volontario</Link>}
            {role === 'admin' && <Link to="/admin-dashboard" className="hover:text-teal-300 transition-colors">Dashboard Admin</Link>}

            {/* Impostazioni Dropdown */}
            <div className="relative group cursor-pointer py-2">
              <span className="hover:text-teal-300 transition-colors flex items-center">Impostazioni ▾</span>
              <div className="absolute left-0 top-full mt-0 w-48 bg-white text-slate-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border border-gray-100">
                <Link to="/about" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 rounded-t-md border-b border-gray-50">Chi siamo</Link>
                <Link to="/contact" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 rounded-b-md">Contattaci</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500/90 hover:bg-red-500 px-5 py-2 rounded-full font-bold transition-colors">Logout</button>
          ) : (
            <div className="relative group cursor-pointer py-2">
              <span className="bg-teal-500 hover:bg-teal-400 px-5 py-2 rounded-full font-bold transition-colors inline-block text-white shadow-lg">Login ▾</span>
              <div className="absolute right-0 top-full mt-0 w-56 bg-white text-slate-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                <Link to="/login?role=adopter" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 border-b border-gray-50">Login Adottante</Link>
                <Link to="/login?role=volunteer" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600 border-b border-gray-50">Login Volontario</Link>
                <Link to="/login?role=admin" className="block px-4 py-3 hover:bg-teal-50 hover:text-teal-600">Login Admin</Link>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button className="md:hidden text-white focus:outline-none p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-slate-800 p-5 rounded-xl shadow-inner border border-slate-700">
          <Link to="/animals" className="block text-lg font-medium hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Lista Animali</Link>
          {role === 'volunteer' && <Link to="/volunteer-dashboard" className="block text-lg font-medium hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Dashboard Volontario</Link>}
          {role === 'admin' && <Link to="/admin-dashboard" className="block text-lg font-medium hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Dashboard Admin</Link>}
          
          <div className="border-t border-slate-700 pt-3 mt-3">
            <span className="text-teal-500 text-sm uppercase font-black mb-2 block">Impostazioni</span>
            <Link to="/about" className="block py-2 hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Chi siamo</Link>
            <Link to="/contact" className="block py-2 hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Contattaci</Link>
          </div>

          <div className="border-t border-slate-700 pt-3 mt-3">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left font-bold text-red-400 hover:text-red-300">Logout</button>
            ) : (
              <>
                <span className="text-teal-500 text-sm uppercase font-black mb-2 block">Accedi</span>
                <Link to="/login?role=adopter" className="block py-2 hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Login Adottante</Link>
                <Link to="/login?role=volunteer" className="block py-2 hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Login Volontario</Link>
                <Link to="/login?role=admin" className="block py-2 hover:text-teal-300" onClick={() => setIsMobileMenuOpen(false)}>Login Admin</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}