import React, { useState, useEffect } from "react";
// import NATIONAL_PARKS_DATA from "./data.json";
import { Map } from "react-map-gl";
import DeckGL, { LineLayer } from "deck.gl";
import { DataFilterExtension } from '@deck.gl/extensions';
import { CSVLoader } from '@loaders.gl/csv';
import { load } from '@loaders.gl/core';

import visitorData from './data/keplertest_visitoronly_smol.csv';

import "./App.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGplcHBzIiwiYSI6ImNsZ3kzNW56YjAydDYzZm83dXhiYmg5bTkifQ.ffLjmgXnf73SWbSPtYjPCg";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v9";

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
  const [data, setData] = useState([]);
  const [incomeMax, setIncomeMax] = useState(250000);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setIncomeMax(newValue);
  };

  const layers = [
    new LineLayer({
      id: 'visitor-line',
      data,
      getColor: [0, 128, 255],
      getSourcePosition: d => d.MovementStart.split(',').map(c => parseFloat(c.trim())),
      getTargetPosition: d => d.MovementStop.split(',').map(c => parseFloat(c.trim())),
      getWidth: 1,
      getFilterValue: d => d.Income,
      filterRange: [1, incomeMax],
      extensions: [new DataFilterExtension({filterSize: 1})]
    })
  ];

  useEffect(() => {
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchData = async () => {
      const csvData = await load(visitorData, CSVLoader);
      console.log(csvData);
      setData(csvData);
    };

    fetchData();
  }, []);

  return (
    <>
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers} >
        <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
      <div className="filters">
        <div className="income">
          <div className="incomeMin">0</div>
          <input className="incomeFilter" type="range" min={0} max={250000} value={incomeMax} onChange={handleSliderChange} />
          <div className="incomeMax">{incomeMax}</div>
        </div>
      </div>
    </>
  );
}

export default App;
