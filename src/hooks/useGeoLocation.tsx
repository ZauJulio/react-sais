import * as React from "react";

interface Position {
  lat: number;
  lng: number;
}

interface useGeoLocationProps {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

export const useGeoLocation = (props?: useGeoLocationProps): Position => {
  const [position, setPosition] = React.useState<Position>({ lat: 0, lng: 0 });
  const { enableHighAccuracy = false, maximumAge = 1000, timeout = 300000 } =
    props ?? {};

  let watcher: number;

  function onChange({ coords }: any) {
    if (coords.latitude !== position.lat && coords.longitude !== position.lng) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    }
  }

  React.useEffect(() => {
    if (typeof navigator.geolocation !== "undefined") {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        (err) => console.log(err),
        { enableHighAccuracy, maximumAge, timeout }
      );

      return () => navigator.geolocation.clearWatch(watcher);
    }

    return;
  }, []);

  return position;
};
