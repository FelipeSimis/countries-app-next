import { NextPage } from 'next';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { Country } from '../../hooks/countries';

interface Props {
  country: Country;
}

const Map: NextPage<Props> = ({ country }): JSX.Element => {
  const ChangeMapView = ({ center }) => {
    const map = useMap();

    if (center !== undefined) {
      map.setView(center, country.area <= 1800 ? 9 : 5);
    }

    return null;
  };

  return (
    <MapContainer
      center={country.latlng.length !== 0 && country.latlng}
      zoom={country.area <= 1800 ? 9 : 5}
      style={{ width: '100%', height: 400 }}
      touchZoom={false}
      zoomControl={false}
    >
      <ChangeMapView center={country.latlng} />
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/felipe-simis/ckjxe7zc01lsn17pc73e1nx4v/tiles/256/{z}/{x}/{y}@2x?fresh=true&title=view&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      />
    </MapContainer>
  );
};

export default Map;
