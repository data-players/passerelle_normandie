import React from 'react';
import { extractContext, LocationInput } from '@semapps/geo-components';

const PlaceLocationInput = props => (
    <LocationInput
      mapboxConfig={{
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        types: ['place', 'address'],
        country: ['fr', 'be', 'ch']
      }}
      source="pair:hasPostalAddress"
      parse={value => ({
        type: 'pair:PostalAddress',
        'pair:label': value.place_name,
        'pair:addressLocality': value.place_type[0] === 'place' ? value.text : extractContext(value.context, 'place'),
        'pair:addressStreet': value.place_type[0] === 'address' ? [value.address, value.text].join(' ') : undefined,
        'pair:addressZipCode': extractContext(value.context, 'postcode'),
        'pair:addressCountry': extractContext(value.context, 'country'),
        'pair:longitude': value.center[0],
        'pair:latitude': value.center[1],
      })}
      optionText={resource => resource['pair:label']}
      fullWidth
    />
  );

  export default PlaceLocationInput;
