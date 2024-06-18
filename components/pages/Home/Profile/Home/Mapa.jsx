import React from 'react';
import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
import useOnClickOutside from '../../../../../hook/useOnClickOutside';

const Mapa = ({ address, setShowMap }) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const initialCenter = {
    lat: address?.lat || 19.4326,
    lng: address?.lng || -99.1332,
    address: address?.address || 'Ciudad de México, CDMX',
  };

  const [center, setCenter] = React.useState(initialCenter);
  const MapSidebarRef = React.useRef();
  useOnClickOutside(MapSidebarRef, () => setShowMap(false));

  return (
    <div className="h-full" ref={MapSidebarRef}>
      <button
        onClick={() => setShowMap(false)}
        className="absolute z-10 w-20 h-8 m-4 text-white border-none rounded-lg cursor-pointer bg-purple"
        type="button"
      >
        Cerrar
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{ fullscreenControl: false, mapTypeControl: false, streetViewControl: false }}
      >
        <MarkerF
          position={{ lat: center.lat, lng: center.lng }}
          onClick={() => setCenter({ lat: center.lat, lng: center.lng })}
        >
          <InfoWindowF position={{ lat: center.lat, lng: center.lng }}>
            <p style={{ fontSize: '0.65rem', textAlign: 'center', color: 'black' }}>{center.address}</p>
          </InfoWindowF>
        </MarkerF>
      </GoogleMap>
    </div>
  );
};

export default Mapa;
