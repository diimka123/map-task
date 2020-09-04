import React, { useState } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import DragDropList from './DragDropList/DragDropList';
import SearchLocation from './SearchLocation/SearchLocation';
import Map from './GoogleMap/Map';


function MapRouter() {

   const [routers, setRouters] = useState([]);

   return (
      <Container maxWidth="md">
         <Grid container spacing={2} justify="center" style={{ marginTop: '50px'}}>
            <Grid item xs={10} sm={6} md={4}>
               <Paper elevation={3}>
                  <SearchLocation
                     routers={routers}
                     setRouters={setRouters}
                  />
               </Paper>
               <Paper elevation={3}>
                  <DragDropList
                     routers={routers}
                     setRouters={setRouters}
                  />
               </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
               <Paper elevation={3}>
                  <Map 
                     routers={routers}
                  />
               </Paper>
            </Grid>
         </Grid>
      </Container>
   )
}

export default MapRouter;
