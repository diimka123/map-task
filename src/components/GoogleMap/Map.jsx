import React, { useState, useEffect } from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   DirectionsRenderer,
} from 'react-google-maps'

const MapWithADirectionsRenderer = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyApNd4_MnUJYsREwr0SiOpBxMoACIfVoV4",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap,
)(({ routers }) => {
   const [directions, setDirections] = useState(null)

   useEffect(() => {

      const DirectionsService = new window.google.maps.DirectionsService();

      let waypoints = null;
      let origin = null;
      let destination = null;

      if (routers.length !== 0) {
         waypoints = routers.map(route => ({
            location: route.description,
            stopover: true
         }))
         origin = { query: routers[0].description };
         destination = { query: routers[routers.length - 1].description };
      }

      DirectionsService.route({
         origin: origin,
         destination: destination,
         waypoints: waypoints && waypoints.slice(1, waypoints.length - 1),
         travelMode: window.google.maps.TravelMode.DRIVING
      }, (result, status) => {
         if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
         } else {
            console.error(`error fetching directions ${result}`);
         }
      });

   }, [routers])

   return (
      <GoogleMap
         defaultZoom={10}
         defaultCenter={new window.google.maps.LatLng('53.9', '27.56667')}
      >
         {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
   )
}
);

export default MapWithADirectionsRenderer

