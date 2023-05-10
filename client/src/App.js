import "./App.css";
import { useState } from "react";
import NATIONAL_PARKS_DATA from "./data.json";
import { Map } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGplcHBzIiwiYSI6ImNsZ3kzNW56YjAydDYzZm83dXhiYmg5bTkifQ.ffLjmgXnf73SWbSPtYjPCg";
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  // "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
  bearing: 0,
  pitch: 30,
};

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const onClick = info => {
    // alert(info.object.properties.Name)
    // if (info.object) {
    // } else {
    // }
  } 

  const layers = [
    new GeoJsonLayer({
      id: 'nationalParks',
      data: NATIONAL_PARKS_DATA, 
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusScale: 2000,
      getPointRadius: f => 5,
      getFillColor: data => data.properties.Name.includes("National Park") ? [198,128,73] : [60,95,55],
      pickable: true,
      autoHighlight: true
    })
  ]

  return (
    <div>
      <h1 className="App-header">US National Park System Locations</h1>
      <h3 className="App-subheader">React/Deck.gl Example</h3>
      <div className="key">        
          <span className="keyColor light"></span> = National Park
          <span className="keyColor dark"></span> = National Monument/Other        
      </div>
      <div className="mapContainer">
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers} getTooltip={({object}) => object && (object.properties.Name)}>
          <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div>
    </div>
  );
}

export default App;
