import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const PlacesAutocomplete = dynamic(() => import('react-places-autocomplete'), { ssr: false });

function Address({ setState, state }) {
  const [address, setAddress] = useState('');

  const onChange = (e) => {
    if (e?.target?.name === 'termsAndConditions') {
      setState((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked ? 'si' : 'no',
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  async function handleSelect(address) {
    const results = await geocodeByAddress(address);
    const coords = await getLatLng(results[0]);
    onChange({
      target: {
        name: 'address',
        value: {
          address: results?.[0]?.formatted_address || '',
          lat: coords.lat,
          lng: coords.lng,
        },
      },
    });
    setAddress(results?.[0]?.formatted_address || '');
  }

  useEffect(() => {
    if (state?.address) {
      setAddress(state?.address?.address);
    }
  }, [state?.address]);

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            style={{
              width: '100%',
              backgroundColor: '#F9F7ED',
              padding: '0.75rem 1rem',
              outline: 'none',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 400,
            }}
            className="w-full rounded-lg border-0 bg-cream px-3 py-4 font-sans text-sm outline-none placeholder:font-sans placeholder:text-sm placeholder:text-black"
            placeholder="Escribe tu dirección"
            name="address"
            type="text"
            value={address}
            onChange={onChange}
            {...getInputProps({
              placeholder: 'Buscar lugar ...',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#E88A3B', cursor: 'pointer', color: '#FFF' }
                : { backgroundColor: '#ffffff', cursor: 'pointer', color: 'inherit' };
              return (
                <Stack
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={suggestion.placeId}
                  spacing={1}
                  p={1}
                >
                  <Typography>{suggestion.description}</Typography>
                </Stack>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Address;
