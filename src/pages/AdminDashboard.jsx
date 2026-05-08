import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdoptionRequests, updateRequestStatus } from '../features/adoptionSlice';
import { updateLocalAnimal } from '../features/animalsSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { requests, status } = useSelector((state) => state.adoption);
  const { items: animals } = useSelector((state) => state.animals);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAdoptionRequests());
  }, [status, dispatch]);

  const handleAction = async (requestId, animalId, newStatus) => {
    await dispatch(updateRequestStatus({ id: requestId, status: newStatus })).unwrap();

    if (newStatus === 'approvata') {
      const animal = animals.find(a => a.id === animalId);
      if (animal) {
        await dispatch(updateLocalAnimal({ ...animal, isAdopted: true })).unwrap();
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 border-teal-500 pb-2 inline-block">
          Gestione Richieste Adozione
        </h2>
        
        <div className="space-y-6">
          {requests.map((req) => (
            <div key={req.id} className="p-6 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="font-black text-xl text-slate-800 uppercase">{req.animalName}</p>
                <p className="text-slate-600 font-bold">Richiedente: <span className="text-teal-600">{req.userEmail}</span></p>
                <p className="text-xs font-black uppercase mt-2">Stato attuale: 
                  <span className={`ml-2 ${req.status === 'approvata' ? 'text-green-600' : req.status === 'rifiutata' ? 'text-red-600' : 'text-orange-500'}`}>
                    {req.status}
                  </span>
                </p>
              </div>
              
              {req.status === 'in attesa' && (
                <div className="flex gap-3">
                  <button onClick={() => handleAction(req.id, req.animalId, 'approvata')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-black transition-all">APPROVA</button>
                  <button onClick={() => handleAction(req.id, req.animalId, 'rifiutata')} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-black transition-all">RIFIUTA</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}