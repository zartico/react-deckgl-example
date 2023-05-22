import React, { useState, useEffect } from "react";
import { Map } from "react-map-gl";
import DeckGL, { LineLayer } from "deck.gl";
import { CSVLoader } from '@loaders.gl/csv';
import { load } from '@loaders.gl/core';

import "./App.css";

// import visitorData from './data/keplertest_visitoronly.csv';
import visitorData from './data/keplertest_visitoronly_smol.csv';
// import visitorData from './data/keplertest_visitoronly_smolest.csv';

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGplcHBzIiwiYSI6ImNsZ3kzNW56YjAydDYzZm83dXhiYmg5bTkifQ.ffLjmgXnf73SWbSPtYjPCg";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v9";

const INITIAL_VIEW_STATE = {
  longitude: -111.91,
  latitude: 40.59,
  zoom: 10.5,
  bearing: 0,
  pitch: 30
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchData = async () => {
      const csvData = await load(visitorData, CSVLoader);
      setData(csvData);
    };

    fetchData();
  }, []);

  const lineLayer1 = new LineLayer({
    id: 'line-layer1',
    data,
    getWidth: 1,
    getSourcePosition: d =>
      d.MovementStart.split(',').map(c => parseFloat(c.trim())),
    getTargetPosition: d =>
      d.MovementStop.split(',').map(c => parseFloat(c.trim())),
    getColor: () => [0, 128, 255]
  });

  const lineLayer2 = new LineLayer({
    // https://github.com/visgl/deck.gl/blob/8.9-release/docs/api-reference/layers/line-layer.md
    id: 'line-layer2',
    data: [{
      inbound: 72633,
      outbound: 74735,
      from: {
        name: '19th St. Oakland (19TH)',
        coordinates: [-122.269029, 37.80787]
      },
      to: {
        name: '12th St. Oakland City Center (12TH)',
        coordinates: [-122.271604, 37.803664]
      }
    }],
    getWidth: 50,
    getSourcePosition: d => d.from.coordinates,
    getTargetPosition: d => d.to.coordinates,
    getColor: () => [0, 128, 255]
  });

  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[lineLayer1, lineLayer2]}>
        <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    </div>
  );
}

export default App;
