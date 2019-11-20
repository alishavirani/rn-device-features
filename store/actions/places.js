import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async dispatch => {
    //perform async requests here before return

    //call google decode lat lng to address api with googleApiKey saved in env
    const response = await fetch("");
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
    } catch (err) {
      console.log("error in saving file", err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
