import React from 'react';
import { withScriptjs } from "react-google-maps";
import Map from './Map';


function MapLoaderContainer({ routers }) {
   const MapLoader = withScriptjs(Map);

   return (
      <MapLoader
         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyApNd4_MnUJYsREwr0SiOpBxMoACIfVoV4"
         loadingElement={<div style={{ height: `100%` }} />}
         routers={routers}
      />
   );
};

export default MapLoaderContainer