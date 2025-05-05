import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface School {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  score?: number;
}

interface SchoolMapProps {
  schools: School[];
}

export function SchoolMap({ schools }: SchoolMapProps) {
  // Default center: Newport, VIC
  const center: [number, number] = [-37.84, 144.88]; // Explicitly type as a tuple
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          // Use Stadia Maps Alidade Smooth Dark tiles
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {schools.map(school => (
          <Marker key={school.id} position={[school.lat, school.lng]}>
            <Popup>
              <div className="font-bold">{school.name}</div>
              <div className="text-xs">{school.address}</div>
              {school.score !== undefined && (
                <div className="mt-1 text-sm">Score: <span className="font-semibold">{school.score.toFixed(2)}</span></div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
