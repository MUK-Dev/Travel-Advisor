import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import useStyles from './styles';

const Header = ({ setCoordinates }) => {
  const s = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position='static'>
      <Toolbar className={s.toolbar}>
        <Typography variant='h5' className={s.title}>
          Travel Advisor
        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={s.title}>
            Explore New Places
          </Typography>
          <Autocomplete
            onLoad={(autoC) => setAutocomplete(autoC)}
            onPlaceChanged={onPlaceChanged}
          >
            <div className={s.search}>
              <div className={s.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder='Search...'
                classes={{ root: s.inputRoot, input: s.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
