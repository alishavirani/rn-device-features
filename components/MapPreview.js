import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import ENV from "../env";

const MapPreview = props => {
  //gets lat, lng from props in props.location
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = ""; //add google map url(requires credit card details) inject api key here from env.ggogleApiKey
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    height: "100%",
    width: "100%"
  }
});

export default MapPreview;
