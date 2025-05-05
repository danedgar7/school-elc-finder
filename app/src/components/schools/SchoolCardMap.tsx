import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SchoolCardMapProps {
    lat: number;
    lng: number;
    schoolName: string;
}

const SchoolCardMap: React.FC<SchoolCardMapProps> = ({ lat, lng, schoolName }) => {
    const position: L.LatLngExpression = [lat, lng];

    // Check for invalid coordinates
    if (isNaN(lat) || isNaN(lng)) {
        return <div className="h-32 bg-muted rounded flex items-center justify-center text-destructive text-sm">Invalid coordinates</div>;
    }

    return (
        <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }} 
            className="rounded z-0" // Add z-index if needed, ensure rounding
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            doubleClickZoom={false}
            attributionControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
                <Popup>
                    {schoolName}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default SchoolCardMap;
