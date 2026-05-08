import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitAdoptionRequest } from '../features/adoptionSlice';
import { fetchLocalAnimals } from '../features/animalsSlice';

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Prendiamo la lista degli animali e lo stato del caricamento dal Redux Store
  const { items, status } = useSelector((state) => state.animals);

  const [animal, setAnimal] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Sincronizziamo i dati: se la lista è vuota (es. dopo un refresh), carichiamola
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocalAnimals());
    }
  }, [status, dispatch]);

  // Cerchiamo l'animale specifico nell'array dei dati locali
  useEffect(() => {
    if (items.length > 0) {
      const found = items.find(a => a.id === id);
      if (found) {
        setAnimal(found);
      } else {
        setError("Animale non trovato nel database.");
      }
    }
  }, [items, id]);

  const handleAdoption = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await dispatch(submitAdoptionRequest({
        animalId: animal.id,
        animalName: animal.name,
        userEmail: user.username,
        status: 'in attesa'
      })).unwrap();
      setMessage('Richiesta inviata con successo! Verrai contattato dai nostri volontari.');
    } catch (err) {
      setError("Errore durante l'invio della richiesta.");
    }
  };

  if (status === 'loading') return <div className="text-center mt-20 text-white font-black text-2xl">Caricamento dettagli...</div>;
  if (error || !animal) return (
    <div className="max-w-md mx-auto mt-20 bg-white/90 p-8 rounded-3xl text-center shadow-2xl">
      <p className="text-red-500 font-black text-xl mb-4">{error || "Animale non trovato"}</p>
      <button onClick={() => navigate('/animals')} className="bg-teal-600 text-white px-6 py-2 rounded-xl font-bold">Torna alla lista</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-20 px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-[40px] overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row">
        {/* Immagine */}
        <div className="md:w-1/2 h-125 relative">
          <img 
            src={animal.image || 'https://placehold.co/600x800?text=Foto+In+Arrivo'} 
            alt={animal.name} 
            className="w-full h-full object-cover" 
          />
          {animal.isAdopted && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-green-500 text-white font-black text-3xl px-8 py-3 rounded-full rotate-[-10deg] shadow-2xl border-4 border-white uppercase tracking-widest">
                Già Adottato 🎉
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <span className="bg-teal-100 text-teal-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
              Scheda Ospite
            </span>
            <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-2">{animal.name}</h2>
            <p className="text-2xl font-bold text-teal-600 uppercase italic">
              {animal.species} · {animal.age} {animal.age === 1 ? 'anno' : 'anni'}
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl mb-8 border border-gray-100 shadow-inner">
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Storia e Personalità</h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
              "{animal.description}"
            </p>
          </div>

          {!animal.isAdopted && (
            <div className="space-y-4">
              {message ? (
                <div className="bg-green-100 text-green-700 p-6 rounded-2xl font-black text-center border-2 border-green-200 animate-bounce">
                  {message}
                </div>
              ) : (
                <button 
                  onClick={handleAdoption}
                  className="w-full bg-teal-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-teal-700 transition-all transform hover:scale-[1.02] shadow-[0_15px_30px_rgba(20,184,166,0.3)] uppercase tracking-widest"
                >
                  Inizia il percorso di adozione
                </button>
              )}
            </div>
          )}
          
          {error && <p className="text-red-500 text-center font-black mt-4 uppercase text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}