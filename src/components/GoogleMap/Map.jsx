import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';

function Map({ routers }) {

   const [mapsObject, setMapsObject] = useState(null);

   useEffect(() => {

      if (routers.length >= 2) {

         const directionsService = new mapsObject.maps.DirectionsService();
         const directionsDisplay = new mapsObject.maps.DirectionsRenderer();
         directionsDisplay.setOptions({});

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
                  directionsDisplay.setDirections(result);
                  const routePolyline = new window.google.maps.Polyline({
                     path: result.routes[0].overview_path,
                     strokeColor: '#1A89EE',
                     strokeOpacity: 0.9
                  });
                  routePolyline.setMap(mapsObject.map);
               } else {
                  console.error(`error fetching directions ${result}`);
               }
            });
      }

   }, [routers])


   return (
      <div style={{width: '100%', height: '500px'}}>
         <GoogleMapReact 
            bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyApNd4_MnUJYsREwr0SiOpBxMoACIfVoV4' }}
            defaultCenter={{lat: 53.9 , lng: 27.56667}}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
               setMapsObject({map, maps});
            }}>
         </GoogleMapReact>
      </div>
   )

}

export default Map
