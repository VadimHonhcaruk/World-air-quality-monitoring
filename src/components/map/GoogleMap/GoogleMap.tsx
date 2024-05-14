import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setCoord } from "../../../redux/actions";

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

declare var process: {
  env: {
    REACT_APP_GOOGLE_API_TOKEN: string;
  };
};

interface MarkerType {
  lat: number;
  lng: number;
}

const TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN;

const GoogleMapComp: React.FC = () => {
  const dispatch = useDispatch();
  const pollutionData = useSelector((state: any) => state.data);

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: TOKEN,
  });

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
  }, []);

  useEffect(() => {
    if (
      pollutionData &&
      pollutionData.data &&
      pollutionData.data.city &&
      pollutionData.data.city.geo
    ) {
      const newMarkers = [
        {
          lat: pollutionData.data.city.geo[0],
          lng: pollutionData.data.city.geo[1],
        },
      ];
      setMarkers(newMarkers);
    }
  }, [pollutionData]);

  return isLoaded ? (
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
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComp);
