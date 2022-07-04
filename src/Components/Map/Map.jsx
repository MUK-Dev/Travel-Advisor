import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const s = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');

  return (
    <div className={s.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '<Key>' }}
        defaultZoom={14}
        center={coordinates}
        defaultCenter={coordinates}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={({ center, marginBounds }) => {
          setBounds({ ne: marginBounds.ne, sw: marginBounds.sw });
          setCoordinates({ lat: center.lat, lng: center.lng });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={s.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <Paper elevation='3' className={s.paper}>
                <Typography
                  className={s.typography}
                  variant='subtitle2'
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={s.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place.name}
                />
                <Rating size='small' value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
