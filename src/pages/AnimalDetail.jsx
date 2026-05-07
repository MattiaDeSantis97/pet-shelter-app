import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitAdoptionRequest } from '../features/adoptionSlice';

export default function AnimalDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);

  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ phone: '', reason: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // FIX: controlla res.ok prima di chiamare .json()
    fetch(`http://localhost:3001/local_animals/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Animale non trovato');
        return res.json();
      })
      .then(data => setAnimal(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.phone.trim() || !formData.reason.trim()) {
      setFormError('Compila tutti i campi per la richiesta.');
      return;
    }
    setSubmitting(true);
    try {
      // FIX: .unwrap() rilancia l'errore se il thunk è rejected
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

  if (error) return <div className="text-red-500 font-bold mt-6">{error}</div>;
  if (!animal) return <div className="mt-6">Caricamento...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-6">
      <Link to="/animals" className="text-teal-600 font-bold mb-4 block">&larr; Torna alla lista</Link>
      <h1 className="text-4xl font-bold mb-4">{animal.name}</h1>
      <p className="mb-2"><strong>Specie:</strong> {animal.species}</p>
      <p className="mb-6"><strong>Età:</strong> {animal.age} anni</p>
      <p className="mb-6">{animal.description}</p>

      {role === 'adopter' && !success && (
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
        <div className="bg-green-100 text-green-700 p-4 rounded font-bold">
          Richiesta inviata con successo!
        </div>
      )}
    </div>
  );
}