import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import { getPlacesData } from './api/index';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((p) => p.name && p.num_reviews > 0));
        setFilteredPlaces([]);
        setRating('');
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  useEffect(() => {
    const filteredPlaces = places.filter((p) => p.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            rating={rating}
            setRating={setRating}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
