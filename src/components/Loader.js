import React from "react";
import Spinner from "react-spinner-material";

//To show loading

export default function Loader() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15%",
        zIndex: "999",
      }}
    >
      <div>
        <Spinner radius={80} color={"blue"} stroke={2} visible={true}></Spinner>
        <h4>Loading...</h4>
      </div>
    </div>
  );
}
