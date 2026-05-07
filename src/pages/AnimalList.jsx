import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLocalAnimals } from '../features/animalsSlice';

export default function AnimalList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.animals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocalAnimals());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="text-center mt-10 font-bold">Caricamento dati...</div>;
  if (status === 'failed') return <div className="text-center mt-10 text-red-500">Errore: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Animali in Cerca di Casa</h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Al momento non ci sono animali nel database locale.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((animal) => (
            <div key={animal.id} className="bg-white p-5 rounded-lg shadow border border-gray-200">
              <h3 className="text-xl font-bold text-teal-600 mb-2">{animal.name}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Specie:</strong> {animal.species}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Età:</strong> {animal.age} anni</p>
              <p className="text-sm text-gray-700 mb-4">{animal.image}</p>
            
              
              <Link 
                to={`/animal/${animal.id}`}
                className="inline-block bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700"
              >
                Vedi Dettagli
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}