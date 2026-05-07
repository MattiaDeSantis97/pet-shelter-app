import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'adopter' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validazione dati
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Tutti i campi sono obbligatori.');
      return;
    }

    // Esecuzione azione Redux
    dispatch(login({ username: formData.username, role: formData.role }));
    
    // Routing basato sul ruolo
    if (formData.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (formData.role === 'volunteer') {
      navigate('/volunteer-dashboard');
    } else {
      navigate('/animals');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login Simulato</h2>
      {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Seleziona Ruolo</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="adopter">Adottante</option>
            <option value="volunteer">Volontario</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 font-medium"
        >
          Accedi
        </button>
      </form>
    </div>
  );
}