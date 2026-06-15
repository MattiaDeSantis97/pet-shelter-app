import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../features/authSlice';

// Pagina di login, con supporto per diversi ruoli (adottante, volontario, admin) e gestione dell'autenticazione tramite Redux, con design moderno e responsive
export default function Login() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [formData, setFormData] = useState({ username: '', password: '', role: 'adopter' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Imposta il ruolo automaticamente se cliccato dalla Navbar
  useEffect(() => {
    const roleFromUrl = searchParams.get('role');
    if (roleFromUrl) {
      setFormData(prev => ({ ...prev, role: roleFromUrl }));
    }
  }, [location.search]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Funzione per gestire il submit del form di login, con validazione dei campi e gestione dell'autenticazione tramite Redux, con redirezione in base al ruolo
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Tutti i campi sono obbligatori.');
      return;
    }
    dispatch(login({ username: formData.username, role: formData.role }));
    
    if (formData.role === 'admin') navigate('/admin-dashboard');
    else if (formData.role === 'volunteer') navigate('/volunteer-dashboard');
    else navigate('/animals');
  };

  return (
    // Layout della pagina di login, con supporto per diversi ruoli (adottante, volontario, admin) e gestione dell'autenticazione tramite Redux, con design moderno e responsive
    <div className="max-w-md mx-auto mt-16 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
      <h2 className="text-3xl font-black mb-6 text-center text-slate-800">Area Riservata</h2>
      {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-bold text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors" placeholder="Il tuo nome utente" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors" placeholder="••••••••" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Seleziona Ruolo</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors bg-white">
            <option value="adopter">Adottante (Utente Base)</option>
            <option value="volunteer">Volontario (Staff)</option>
            <option value="admin">Amministratore (Direttivo)</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 font-black text-lg transition-colors shadow-lg mt-4">
          Accedi al Sistema
        </button>
      </form>
    </div>
  );
}