/* global google */
import React from "react";
import { v4 as uuid } from "uuid";
import { Button, Tooltip } from "@mui/material";
import { GoogleMap, MarkerF, InfoWindowF, PolylineF } from "@react-google-maps/api";
import { BsBusFront } from "react-icons/bs";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapWithPin = (args) => {
  const { center, setShowMap, setCenter, job = { fullLocation: {} }, person = { address: {} } } = args;
  const [markers, setMarkers] = React.useState([]);
  const [duration, setDuration] = React.useState(null);

  const jobAddress = job?.fullLocation?.lat && job?.fullLocation?.lng;
  const personAddress = person?.address?.lat && person?.address?.lng;
  React.useEffect(() => {
    if (jobAddress && personAddress) {
      setMarkers([{ ...job?.fullLocation }, { location: person?.address?.address, ...person?.address }]);
    } else if (!jobAddress && personAddress) {
      setMarkers([{ location: person?.address?.address, ...person?.address }]);
    } else if (jobAddress && !personAddress) {
      setMarkers([{ ...job?.fullLocation }]);
    } else {
      setMarkers([{ lat: 19.4326, lng: -99.1332, address: "Ciudad de México, CDMX" }]);
    }
  }, []);

  const onLoad = (map) => {
    if (!jobAddress || !personAddress) return;
    if (markers) {
      const bounds = new google.maps.LatLngBounds();
      markers?.forEach(({ lat, lng }) => {
        bounds.extend({ lat, lng });
      });
      map.fitBounds(bounds);
    }
  };
  /* eslint-disable consistent-return */
  const linePath = () => {
    if (!jobAddress || !personAddress) return;
    if (markers) {
      return markers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));
    }
  };
  const calcDuration = () => {
    const origen = new google.maps.LatLng(markers[0].lat, markers[0].lng);
    const destino = new google.maps.LatLng(markers[1].lat, markers[1].lng);

    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origen],
        destinations: [destino],
        travelMode: "TRANSIT",
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK") {
          const dis = response?.rows[0]?.elements[0]?.duration?.text;
          setDuration(dis);
        } else {
          console.error("Error al calcular el tiempo: ", status);
        }
      }
    );
  };
  React.useEffect(() => {
    if (markers.length === 2) {
      calcDuration();
    }
  }, [markers]);

  const midLat = (markers?.[0]?.lat + markers[1]?.lat) / 2;
  const midLng = (markers?.[0]?.lng + markers[1]?.lng) / 2;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "max-content", position: "absolute", left: "1rem", top: "1rem", zIndex: 3 }}
        onClick={() => setShowMap(false)}
      >
        Cerrar
      </Button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ fullscreenControl: false, mapTypeControl: false, streetViewControl: false }}
        onLoad={onLoad}
      >
        {duration && (
          <InfoWindowF
            position={{ lat: midLat, lng: midLng }}
          >
            <div className="flex items-center gap-2">
              <BsBusFront size={16} />
              <p style={{ fontSize: "0.65rem", textAlign: "center", color: "black" }}>
                {duration}
              </p>
            </div>
          </InfoWindowF>
        )}
        <PolylineF
          path={linePath()}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 6,
          }}
        />
        {/* {job?.fullLocation?.lat && job?.fullLocation?.lng && (
          <MarkerF
            position={{ lat: job.location.lat, lng: job.location.lng }}
            onClick={() => setCenter({ lat: job.location.lat, lng: job.location.lng })}
          >
            <InfoWindowF position={{ lat: job.location.lat, lng: job.location.lng }}>
              <p style={{ fontSize: "0.65rem", textAlign: "center" }}>{job.location}</p>
            </InfoWindowF>
          </MarkerF>
        )}
        {person.address?.lat && person.address?.lng && (
          <MarkerF
            position={{ lat: person.address?.lat, lng: person.address?.lng }}
            onClick={() => setCenter({ lat: person.address?.lat, lng: person.address?.lng })}
          >
            <InfoWindowF position={{ lat: person.address?.lat, lng: person.address?.lng }}>
              <p style={{ fontSize: "0.65rem", textAlign: "center" }}>{person.address.address}</p>
            </InfoWindowF>
          </MarkerF>
        )} */}
        {markers.length !== 0 &&
          markers.map(({ lat, lng, location }) => (
            <MarkerF key={uuid()} onClick={() => setCenter({ lat, lng })} position={{ lat, lng }}>
              <InfoWindowF position={{ lat, lng }}>
                <p style={{ fontSize: "0.65rem", textAlign: "center", color: "black" }}>
                  {duration !== null && (
                    <Tooltip title={`Duración del viaje: ${duration}`} arrow />
                  )}
                  {location}
                </p>
              </InfoWindowF>
            </MarkerF>
          ))}
      </GoogleMap>
    </>
  );
};

export default MapWithPin;
