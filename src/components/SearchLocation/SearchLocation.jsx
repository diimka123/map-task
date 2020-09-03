import React, { useEffect, useMemo, useState } from 'react'
import throttle from './../../helpsJS/throttle'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import { makeStyles } from '@material-ui/core/styles';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
   icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
   },
   root: {
      width: '100%',
      marginBottom: theme.spacing(2),
   },
   inputRoot: {
      padding: '0px 10px !important',
   },
   labelRoot: {
      transform: 'translate(14px, 12px)'
   }
}));

function SearchLocation({ routers, setRouters }) {
   const classes = useStyles();

   const [inputValue, setInputValue] = useState('');
   const [options, setOptions] = useState([]);

   const fetch = useMemo(
      () =>
         throttle((request, callback) => {
            autocompleteService.current.getPlacePredictions(request, callback);
         }, 200),
      [],
   );

   useEffect(() => {
      
      let active = true;

      if (!autocompleteService.current && window.google) {
         autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
         return undefined;
      }

      if (inputValue) {
         fetch({ input: inputValue }, (results) => {
            if (active) {
               let newOptions = [];
         
               if (results) {
                  newOptions = [...newOptions, ...results];
               }
   
               setOptions(newOptions);
            }
         });
      }

      return () => {
         active = false;
      };
   }, [inputValue, fetch]);

   return (
      <Autocomplete
         classes={
            {
               root: classes.root,
               inputRoot: classes.inputRoot
            }
         }
         getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
         options={options}
         value={null}
         blurOnSelect={true}
         clearOnBlur={true}
         onChange={(event, newValue) => {
            setRouters([...routers, newValue])
         }}
         onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
         }}
         onBlur={() => { setOptions([]) }}
         renderInput={(params) => (
            <TextField {...params}
               label="Add a new point..."
               variant="outlined"
               fullWidth
               InputLabelProps={{
                  classes: {
                     root: classes.labelRoot
                  }
               }}
            />
         )}
         renderOption={(option) => {

            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
               option.structured_formatting.main_text,
               matches.map((match) => [match.offset, match.offset + match.length]),
            );

            return (
               <Grid container alignItems="center">
                  <Grid item>
                     <LocationOnIcon className={classes.icon} />
                  </Grid>
                  <Grid item xs>
                     {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                           {part.text}
                        </span>
                     ))}

                     <Typography variant="body2" color="textSecondary">
                        {option.structured_formatting.secondary_text}
                     </Typography>
                  </Grid>
               </Grid>
            );
         }}
      />
   );
}

export default SearchLocation
