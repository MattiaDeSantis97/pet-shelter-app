import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalAnimal, updateLocalAnimal, fetchLocalAnimals, deleteLocalAnimal } from '../features/animalsSlice';

const EMPTY_FORM = { name: '', species: '', age: '', description: '', image: '' };

export default function VolunteerDashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.animals);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLocalAnimals());
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'image') setImagePreview(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file); // Converte l'immagine in stringa Base64 per salvarla su db.json
  };

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setFormData({ name: animal.name, species: animal.species, age: String(animal.age), description: animal.description, image: animal.image || '' });
    setImagePreview(animal.image || '');
    setMessage(''); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => { setEditingId(null); setFormData(EMPTY_FORM); setImagePreview(''); setError(''); setMessage(''); };

  // NUOVO: Funzione per gestire l'eliminazione
  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo annuncio definitivamente?')) {
      try {
        await dispatch(deleteLocalAnimal(id)).unwrap();
        setMessage('Annuncio eliminato con successo!');
      } catch {
        setError("Errore durante l'eliminazione.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    if (!formData.name.trim() || !formData.species.trim() || !formData.age.trim() || !formData.description.trim()) {
      setError('Tutti i campi testuali sono obbligatori.'); return;
    }
    setLoading(true);
    const payload = { ...formData, age: Number(formData.age) };

    try {
      if (editingId) {
        await dispatch(updateLocalAnimal({ id: editingId, ...payload })).unwrap();
      } else {
        await dispatch(addLocalAnimal(payload)).unwrap();
      }
      handleCancel();
      setMessage(editingId ? 'Animale aggiornato con successo!' : 'Animale inserito con successo!');
    } catch { setError('Errore durante il salvataggio.'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-black mb-6 text-slate-800 border-b-2 border-teal-100 pb-3">
          {editingId ? '✏️ Modifica Annuncio' : '➕ Nuovo Annuncio Animale'}
        </h2>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 font-bold">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 font-bold">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Specie</label>
                <input type="text" name="species" value={formData.species} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none" placeholder="Cane, Gatto..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Età</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Descrizione</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none h-24" />
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border-2 border-dashed border-gray-300">
            <label className="block text-sm font-bold text-slate-700 mb-3">Allega Foto dell'Animale</label>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">1. Carica dal tuo PC</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer" />
                </div>
                <div className="text-center text-xs font-black text-gray-400">OPPURE</div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">2. Incolla URL Immagine</span>
                  <input type="text" name="image" value={formData.image.startsWith('data:') ? '' : formData.image} onChange={handleChange} placeholder="https://..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none" />
                </div>
              </div>
              <div className="w-40 h-40 rounded-xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gray-200 shrink-0">
                {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs font-bold text-center px-4">Anteprima Foto</span>}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button type="submit" disabled={loading} className="bg-teal-600 text-white px-8 py-3 rounded-xl font-black hover:bg-teal-700 transition shadow-lg">
              {loading ? 'Salvataggio...' : editingId ? 'Salva Modifiche' : 'Pubblica Annuncio'}
            </button>
            {editingId && <button type="button" onClick={handleCancel} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition">Annulla</button>}
          </div>
        </form>
      </div>

      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <h3 className="text-2xl font-black mb-6 text-slate-800">Archivio Annunci Locali</h3>
        {items.length === 0 && <p className="text-gray-500 font-medium">Nessun annuncio presente nel database.</p>}
        <div className="space-y-4">
          {items.map((animal) => (
            <div key={animal.id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                {animal.image ? <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">🐾</div>}
              </div>
              <div className="flex-1 text-center md:text-left min-w-0">
                <p className="font-black text-xl text-slate-800">{animal.name}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{animal.species} · {animal.age} anni</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => editingId === animal.id ? handleCancel() : handleEdit(animal)} className="px-5 py-2 rounded-lg font-bold bg-teal-100 text-teal-800 hover:bg-teal-200 transition">
                  {editingId === animal.id ? 'Annulla' : 'Modifica'}
                </button>
                {/* TASTO ELIMINA AGGIUNTO */}
                <button onClick={() => handleDelete(animal.id)} className="px-5 py-2 rounded-lg font-bold bg-red-100 text-red-700 hover:bg-red-200 transition">
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}