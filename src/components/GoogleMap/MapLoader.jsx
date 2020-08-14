import React from 'react';
import { withScriptjs } from "react-google-maps";
import Map from './Map';


function MapLoaderContainer() {
   const MapLoader = withScriptjs(Map);
   console.log(1)
   return (
      <MapLoader
         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyApNd4_MnUJYsREwr0SiOpBxMoACIfVoV4"
         loadingElement={<div style={{ height: `100%` }} />}
      />
   );
};

export default MapLoaderContainer