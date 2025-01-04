import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [6.4577589, 3.1402052]; // Replace with your latitude and longitude

const LeafletMap = () => {
  return (
    <MapContainer
      center={position}
      zoom={18}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>
          <b>Address:</b><br />
          26 Ichie Dara Street, Opposite pako, by Agogo Close, shibiri bus/stop, Lagos
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
