import "./App.css";
import { useEffect } from "react";
// import NATIONAL_PARKS_DATA from "./data.json";
import { Map } from "react-map-gl";
import DeckGL, { LineLayer } from "deck.gl";

import visitorData from './data/keplertest_visitoronly_smol.csv';

const data = [
  {Visitor: 1, Income: 73274, MovementStart: '-112.017000571889, 40.65210387936112', MovementStop: '-112.01729694426133, 40.65236589944925', StartTime: '2022-09-25 02:15:52'},
  {Visitor: 1, Income: 73274, MovementStart: '-112.01707062329675, 40.65226654941521', MovementStop: '-112.01706792892287, 40.65233132595191', StartTime: '2022-09-25 16:12:07'},
  {Visitor: 1, Income: 73274, MovementStart: '-112.01706792892287, 40.65233132595191', MovementStop: '-112.01691165943448, 40.65239464536469', StartTime: '2022-09-25 16:12:44'},
  {Visitor: 1, Income: 73274, MovementStart: '-112.01691165943448, 40.65239464536469', MovementStop: '-112.01698979420834, 40.65236298568763', StartTime: '2022-09-25 16:14:20'},
  {Visitor: 1, Income: 73274, MovementStart: '-112.01698979420834, 40.65236298568763', MovementStop: '-112.01784119120741, 40.652209055272586', StartTime: '2022-09-25 16:23:52'},
];

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGplcHBzIiwiYSI6ImNsZ3kzNW56YjAydDYzZm83dXhiYmg5bTkifQ.ffLjmgXnf73SWbSPtYjPCg";
const MAP_STYLE =
     "mapbox://styles/mapbox/dark-v9";
  // "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  // "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// const INITIAL_VIEW_STATE = {
//   latitude: 39.8283,
//   longitude: -98.5795,
//   zoom: 3,
//   bearing: 0,
//   pitch: 30,
// };

const INITIAL_VIEW_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: -111.91,
  latitude: 40.59,
  zoom: 10.5,
  pitch: 30,
  maxZoom: 16
}

function App() {
  // const [showPopup, setShowPopup] = useState(false);

  // const onClick = info => {
  //   // alert(info.object.properties.Name)
  //   // if (info.object) {
  //   // } else {
  //   // }
  // }

  const layers = [
    // new GeoJsonLayer({
    //   id: 'nationalParks',
    //   data: NATIONAL_PARKS_DATA,
    //   filled: true,
    //   pointRadiusMinPixels: 5,
    //   pointRadiusScale: 2000,
    //   getPointRadius: f => 5,
    //   getFillColor: data => data.properties.Name.includes("National Park") ? [198,128,73] : [60,95,55],
    //   pickable: true,
    //   autoHighlight: true
    // })
    new LineLayer({
      id: 'visitor-line',
      data: data,
      getColor: [0, 128, 255],
      getSourcePosition: d => d.MovementStart.split(',').map(c => parseFloat(c.trim())),
      getTargetPosition: d => d.MovementStop.split(',').map(c => parseFloat(c.trim())),
      getWidth: 50
    })
  ];

  useEffect(() => {
    console.log(layers);
  }, []);


  return (
    // <div>
    //   <h1 className="App-header">US National Park System Locations</h1>
    //   <h3 className="App-subheader">React/Deck.gl Example</h3>
    //   <div className="key">
    //       <span className="keyColor light"></span> = National Park
    //       <span className="keyColor dark"></span> = National Monument/Other
    //   </div>
    //   <div className="mapContainer">
    //     <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers} getTooltip={({object}) => object && (object.properties.Name)}>
    //       <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    //     </DeckGL>
    //   </div>
    // </div>
    <>
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers} >
        <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    </>
  );
}

export default App;
