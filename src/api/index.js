import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key':
            '8650decf14msh2a340a3cc98072fp11a19bjsnedde5af7bab7',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
