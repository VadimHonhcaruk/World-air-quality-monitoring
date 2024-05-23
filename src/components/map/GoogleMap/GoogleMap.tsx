import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  PolylineF,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setCoord, setCountryShortName } from "../../../redux/actions";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import c from "../MapPage.module.css";

const containerStyle = {
  width: "70vw",
  height: "88vh",
  border: "1px solid #64ea81",
};

const center = {
  lat: 50.450001,
  lng: 30.523333,
};

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#454545",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#2e9043",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#21933a",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#39a250",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#42a056",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const polylineOptions = {
  strokeColor: "#ffffff",
};

declare var process: {
  env: {
    REACT_APP_GOOGLE_API_TOKEN: string;
  };
};

interface MarkerType {
  lat: number;
  lng: number;
  icon?: string;
}

const TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN;

const GoogleMapComp: React.FC = () => {
  const dispatch = useDispatch();
  const coord = useSelector((state: any) => state.coord);
  const pollutionData = useSelector((state: any) => state.data);

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: TOKEN,
    libraries: ["places"],
  });

  useEffect(() => {
    console.log("TUT");
    const getCountryName = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.coord[0]},${coord.coord[1]}&key=${TOKEN}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        dispatch(setCountryShortName(data.results[0].address_components));
      }
    };
    getCountryName();
  }, [coord]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
  }, []);

  useEffect(() => {
    setMarkers([]);
    if (
      pollutionData &&
      pollutionData.data &&
      pollutionData.data.city &&
      pollutionData.data.city.geo
    ) {
      const newMarkers: MarkerType[] = [
        {
          lat: pollutionData.data.city.geo[0],
          lng: pollutionData.data.city.geo[1],
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
        {
          lat: coord.coord[0],
          lng: coord.coord[1],
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      ];
      setMarkers(newMarkers);
    }
  }, [pollutionData]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        zoom={5}
        onClick={(e) => {
          if (e.latLng) {
            dispatch(setCoord([e.latLng.lat(), e.latLng.lng()]));
          }
        }}
        options={{
          styles: mapStyles,
          fullscreenControl: false,
          mapTypeControl: false,
          mapTypeId: "terrain",
          streetViewControl: false,
          zoomControl: false,
          minZoom: 3,
          maxZoom: 10,
          restriction: {
            latLngBounds: {
              north: 85,
              south: -85,
              west: -179.9,
              east: 179.9,
            },
            strictBounds: false,
          },
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={marker.icon}
          />
        ))}
        {markers.length === 2 && (
          <PolylineF path={markers} options={polylineOptions} />
        )}
      </GoogleMap>
      <PlacesAutocomplete />
    </>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComp);

const PlacesAutocomplete: React.FC = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const dispatch = useDispatch();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    dispatch(setCoord([lat, lng]));
  };

  return (
    <Combobox onSelect={handleSelect} className={c.combox}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={c.comboxInp}
        placeholder="Знайдіть адресу"
      />
      <ComboboxPopover>
        <ComboboxList className={c.list}>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
