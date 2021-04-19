import * as React from "react";

interface _coords {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface _GeolocationPosition {
  readonly coords: _coords;
  readonly timestamp: number;
}

interface Position {
  lat: number;
  lng: number;
}

interface useGeoLocationProps {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

// Temporary solution to correct the rendering and update problem of the position
// of position, using a variable for comparison _postition
// https://stackoverflow.com/a/58877875

export const useGeoLocation = (props?: useGeoLocationProps): Position => {
  const [position, setPosition] = React.useState<Position>({ lat: 0, lng: 0 });
  const { enableHighAccuracy = false, maximumAge = 300000, timeout = 10000 } =
    props ?? {};

  var watcher: number;
  var _position = position;

  function onChange({ coords }: _GeolocationPosition) {
    if (coords.latitude != _position.lat || coords.longitude != _position.lng) {
      _position = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      setPosition(_position);
    }
  }

  React.useEffect(() => {
    if (typeof navigator.geolocation !== "undefined") {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        (err) => console.log(err),
        { enableHighAccuracy, maximumAge, timeout }
      );
    }
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return position;
};
