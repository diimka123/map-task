import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react';



function Map({ routers }) {

   const [mapsObject, setMapsObject] = useState(null);
   const directionsDisplay = useRef(null);

   useEffect(() => {

      if (mapsObject) {

         const directionsService = new window.google.maps.DirectionsService();
         
         if (!directionsDisplay.current) {
            directionsDisplay.current = new window.google.maps.DirectionsRenderer();
         }
         console.log(mapsObject.map)
         if (routers.length >= 2) {
            
            let waypoints = routers.map(route => ({
               location: route.description,
               stopover: true
            }))
            let origin = { query: routers[0].description };
            let destination = { query: routers[routers.length - 1].description };

            directionsDisplay.current.setMap(mapsObject.map);
            directionsService.route(
               {
                  origin: origin,
                  destination: destination,
                  waypoints: waypoints && waypoints.slice(1, waypoints.length - 1),
                  travelMode: window.google.maps.TravelMode.DRIVING
               },
               (result, status) => {
                  if (status === window.google.maps.DirectionsStatus.OK) {
                     directionsDisplay.current.setDirections(result);
                  } else {
                     console.error(`error fetching directions ${result}`);
                  }
               });
         } else {

            directionsDisplay.current.setMap(null);
            mapsObject.map.setCenter({ lat: 53.9, lng: 27.56667 });

         }

      }

   }, [routers, mapsObject])


   return (
      <div style={{ width: '100%', height: '500px' }}>
         <GoogleMapReact
            defaultCenter={{ lat: 53.9, lng: 27.56667 }}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
               setMapsObject({ map, maps });
            }}>
         </GoogleMapReact>
      </div>
   )

}

export default Map
