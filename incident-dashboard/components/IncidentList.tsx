"use client";

interface Incident {
  id: number;
  thumbnailUrl: string;
  ts: string;
}

const IncidentList = ({ incidents, onResolve }: { incidents: Incident[]; onResolve: (id: number) => void }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li
            key={incident.id}
            className="flex items-center gap-4 p-3 mb-2 rounded-lg bg-gray-800"
            style={{ minHeight: "70px" }}
          >
            <img
              src={incident.thumbnailUrl}
              alt="Incident"
              className="w-12 h-12 object-cover rounded border"
              style={{ minWidth: "48px", minHeight: "48px" }}
            />
            <div className="flex-1 flex flex-col justify-center">
              <div className="font-semibold">Webcam Incident</div>
              <div className="text-xs text-gray-400">{incident.ts}</div>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded ml-auto"
              onClick={() => onResolve(incident.id)}
            >
              Resolve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
