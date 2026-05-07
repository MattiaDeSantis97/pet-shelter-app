import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalAnimal, updateLocalAnimal, fetchLocalAnimals } from '../features/animalsSlice';

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
    reader.readAsDataURL(file);
  };

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setFormData({
      name: animal.name,
      species: animal.species,
      age: String(animal.age),
      description: animal.description,
      image: animal.image || '',
    });
    setImagePreview(animal.image || '');
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setImagePreview('');
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.name.trim() || !formData.species.trim() || !formData.age.trim() || !formData.description.trim()) {
      setError('Tutti i campi sono obbligatori (eccetto immagine).');
      return;
    }
    if (isNaN(formData.age) || Number(formData.age) < 0) {
      setError("L'età deve essere un numero valido.");
      return;
    }

    setLoading(true);
    const payload = { ...formData, age: Number(formData.age) };

    try {
      if (editingId) {
        await dispatch(updateLocalAnimal({ id: editingId, ...payload })).unwrap();
        setMessage('Animale aggiornato con successo!');
      } else {
        await dispatch(addLocalAnimal(payload)).unwrap();
        setMessage('Animale inserito con successo nel database.');
      }
      handleCancel();
      setMessage(editingId ? 'Animale aggiornato con successo!' : 'Animale inserito con successo!');
    } catch {
      setError('Errore durante il salvataggio. Verifica che il server sia attivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          {editingId ? '✏️ Modifica Animale' : '➕ Inserisci Nuovo Animale'}
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Nome</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Specie</label>
              <input type="text" name="species" value={formData.species} onChange={handleChange} className="w-full border p-2 rounded" placeholder="es. Cane, Gatto" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Età</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" className="w-full border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Descrizione</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded h-24" />
          </div>

          {/* IMAGE SECTION */}
          <div>
            <label className="block text-sm font-bold mb-2">Immagine (opzionale)</label>
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">Carica dal dispositivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">— oppure —</p>
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">URL immagine</span>
                  <input
                    type="text"
                    name="image"
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={handleChange}
                    placeholder="https://esempio.com/foto.jpg"
                    className="w-full border p-2 rounded text-sm"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" onError={() => setImagePreview('')} />
                ) : (
                  <span className="text-gray-400 text-xs text-center px-2">Anteprima immagine</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white px-6 py-2 rounded font-bold hover:bg-teal-700 disabled:opacity-50 transition"
            >
              {loading ? 'Salvataggio...' : editingId ? 'Salva Modifiche' : 'Salva Scheda Animale'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-bold hover:bg-gray-300 transition"
              >
                Annulla
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ANIMAL LIST */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Animali nel Database</h3>

        {status === 'loading' && <p className="text-gray-500 text-sm">Caricamento...</p>}
        {items.length === 0 && status !== 'loading' && (
          <p className="text-gray-400 text-sm">Nessun animale presente.</p>
        )}

        <div className="space-y-3">
          {items.map((animal) => (
            <div
              key={animal.id}
              className={`flex items-center gap-4 p-3 rounded-lg border transition ${
                editingId === animal.id
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-gray-100 hover:border-gray-200 bg-gray-50'
              }`}
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                {animal.image ? (
                  <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🐾</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">{animal.name}</p>
                <p className="text-sm text-gray-500">{animal.species} · {animal.age} anni</p>
              </div>

              <button
                onClick={() => editingId === animal.id ? handleCancel() : handleEdit(animal)}
                className={`px-4 py-1.5 rounded text-sm font-semibold transition shrink-0 ${
                  editingId === animal.id
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                }`}
              >
                {editingId === animal.id ? 'Annulla' : 'Modifica'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}