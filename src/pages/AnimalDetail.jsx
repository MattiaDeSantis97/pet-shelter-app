import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitAdoptionRequest } from '../features/adoptionSlice';
import { fetchLocalAnimals } from '../features/animalsSlice';

export default function AnimalDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);
  
  // PRENDIAMO GLI ANIMALI DA REDUX/LOCALSTORAGE INVECE CHE CON FETCH
  const { items, status } = useSelector((state) => state.animals);

  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ phone: '', reason: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Assicuriamoci che i dati siano caricati in Redux
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocalAnimals());
    }
  }, [status, dispatch]);

  // 2. Cerchiamo l'animale tramite il suo ID locale
  useEffect(() => {
    if (items.length > 0) {
      const found = items.find(a => a.id === id);
      if (found) {
        setAnimal(found);
        setError('');
      } else {
        setError('Animale non trovato');
      }
    }
  }, [id, items]);

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.phone.trim() || !formData.reason.trim()) {
      setFormError('Compila tutti i campi per la richiesta.');
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(submitAdoptionRequest({
        animalId: animal.id,
        animalName: animal.name,
        applicant: user,
        phone: formData.phone,
        reason: formData.reason,
      })).unwrap();
      setSuccess(true);
      setFormData({ phone: '', reason: '' });
    } catch {
      setFormError('Errore durante l\'invio della richiesta. Riprova.');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <div className="text-red-500 font-bold mt-6 text-center">{error}</div>;
  if (!animal) return <div className="mt-6 text-center font-bold">Caricamento...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-6">
      <Link to="/animals" className="text-teal-600 font-bold mb-4 block">&larr; Torna alla lista</Link>
      
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="md:w-1/2">
          {/* Mostriamo l'immagine dell'animale se presente, altrimenti un placeholder */}
          <img 
            src={animal.image || 'https://placehold.co/600x400?text=Foto+Non+Disponibile'} 
            alt={animal.name} 
            className="w-full h-64 object-cover rounded shadow"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{animal.name}</h1>
          <p className="mb-2"><strong>Specie:</strong> {animal.species}</p>
          <p className="mb-2"><strong>Età:</strong> {animal.age} anni</p>
          <p className="mt-4 text-slate-700">{animal.description}</p>
        </div>
      </div>

      {animal.isAdopted && (
        <div className="bg-green-100 text-green-800 p-4 rounded font-bold text-center mt-6 uppercase tracking-wider">
          Questo animale è già stato adottato! 🎉
        </div>
      )}

      {role === 'adopter' && !success && !animal.isAdopted && (
        <div className="bg-teal-50 p-6 rounded border border-teal-200">
          <h3 className="text-xl font-bold mb-4">Richiedi Adozione</h3>
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <form onSubmit={handleAdoptSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Telefono</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Motivazione</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full border p-2 rounded h-20"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-teal-600 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
            >
              {submitting ? 'Invio...' : 'Invia Richiesta'}
            </button>
          </form>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded font-bold mt-4">
          Richiesta inviata con successo!
        </div>
      )}
    </div>
  );
}