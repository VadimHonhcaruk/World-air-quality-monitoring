import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setCoord } from "../../redux/actions";

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
        color: "#1a1b1b",
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
        color: "#1d7430",
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

const MapPage: React.FC = () => {
  const dispatch = useDispatch();
  const coord = useSelector((state: any) => state.coord);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDRAezkJZa0WJgDDSFGruC12YKuoMsf-qc",
  });

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
  }, []);

  useEffect(() => {
    console.log(coord);
  }, [coord]);

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
            north: 85, // Максимальная северная граница карты
            south: -85, // Минимальная южная граница карты
            west: -179.9, // Минимальная западная граница карты
            east: 179.9, // Максимальная восточная граница карты
          },
          strictBounds: false,
        },
      }}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapPage);
