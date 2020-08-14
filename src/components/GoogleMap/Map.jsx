import React, { useState, useEffect } from 'react'
import {
   withGoogleMap,
   GoogleMap,
   DirectionsRenderer
} from 'react-google-maps'

function Map({ routers }) {

   const [directions, setDirections] = useState(null);

   useEffect(() => {

      if (routers.length >= 2) {

         const directionsService = new window.google.maps.DirectionsService();

         const waypoints = routers.map(route => ({
            location: route.description,
            stopover: false
         }))
         const origin = { query: routers[0].description };
         const destination = { query: routers[routers.length - 1].description };
   
         directionsService.route(
            {
               origin: origin,
               destination: destination,
               waypoints: waypoints.slice(1, waypoints.length - 1),
               travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
               if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirections(result);
               } else {
                  console.error(`error fetching directions ${result}`);
               }
            }
         );

      }

   }, [routers])

   const GoogleMapRenderer = withGoogleMap(props => (
      <GoogleMap
         defaultCenter={{ lat: 53.9, lng: 27.56667 }}
         defaultZoom={13}
      >
         <DirectionsRenderer
            directions={directions}
         />
      </GoogleMap>
   ));
   return (
      <div>
         <GoogleMapRenderer
            containerElement={<div style={{ height: `500px`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
         />
      </div>
   )
}

export default Map
