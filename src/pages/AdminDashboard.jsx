import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdoptionRequests, updateRequestStatus } from '../features/adoptionSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { requests, status } = useSelector((state) => state.adoption);
  // FIX: mappa id -> {status, adminNotes} per evitare conflitti tra richieste
  const [evaluations, setEvaluations] = useState({});

  useEffect(() => {
    dispatch(fetchAdoptionRequests());
  }, [dispatch]);

  const getEval = (id) => evaluations[id] || { status: 'approvata', adminNotes: '' };

  const setEval = (id, patch) =>
    setEvaluations((prev) => ({ ...prev, [id]: { ...getEval(id), ...patch } }));

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const ev = getEval(id);
    if (!ev.adminNotes.trim()) {
      alert('Inserire una nota di valutazione.');
      return;
    }
    dispatch(updateRequestStatus({ id, status: ev.status, adminNotes: ev.adminNotes }));
    setEvaluations((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  if (status === 'loading') return <div className="text-center mt-10">Caricamento...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Admin - Gestione Richieste</h2>
      {requests.length === 0 && <p className="text-gray-500">Nessuna richiesta presente.</p>}
      <div className="space-y-4">
        {requests.map((req) => {
          const ev = getEval(req.id);
          return (
            <div key={req.id} className="bg-white p-6 rounded shadow border">
              <h3 className="font-bold text-lg mb-2">Richiesta per: {req.animalName}</h3>
              <p><strong>Richiedente:</strong> {req.applicant}</p>
              <p><strong>Telefono:</strong> {req.phone}</p>
              <p className="mb-4"><strong>Motivazione:</strong> {req.reason}</p>
              <p className="mb-4">
                <strong>Stato attuale:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  req.status === 'in attesa' ? 'bg-yellow-200' :
                  req.status === 'approvata' ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  {req.status.toUpperCase()}
                </span>
              </p>

              {req.status === 'in attesa' && (
                <form onSubmit={(e) => handleSubmit(e, req.id)} className="bg-gray-50 p-4 rounded mt-4 flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-1">Esito</label>
                    <select
                      value={ev.status}
                      onChange={(e) => setEval(req.id, { status: e.target.value })}
                      className="w-full border p-2 rounded"
                    >
                      <option value="approvata">Approva</option>
                      <option value="rifiutata">Rifiuta</option>
                    </select>
                  </div>
                  <div className="flex-2 w-1/2">
                    <label className="block text-sm font-bold mb-1">Note Admin</label>
                    <input
                      type="text"
                      value={ev.adminNotes}
                      onChange={(e) => setEval(req.id, { adminNotes: e.target.value })}
                      className="w-full border p-2 rounded"
                      placeholder="Motivazione esito..."
                    />
                  </div>
                  <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded font-bold">
                    Salva Esito
                  </button>
                </form>
              )}
              {req.adminNotes && (
                <p className="mt-4 text-sm text-gray-600"><strong>Note Admin:</strong> {req.adminNotes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}