/* global window */
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay';

import taxiData from './data/taxi';
// import visitorData from './data/keplertest_all.csv';
// import visitorData from './data/keplertest_all_smol.csv';
// import visitorData from './data/keplertest_visitoronly.csv'; // too big to push into GitHub
// import visitorData from './data/keplertest_visitoronly_smol.csv';

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9';
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGplcHBzIiwiYSI6ImNsZ3kzNW56YjAydDYzZm83dXhiYmg5bTkifQ.ffLjmgXnf73SWbSPtYjPCg'; // eslint-disable-line

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -111.91,
        latitude: 40.59,
        zoom: 10.5,
        pitch: 30,
        maxZoom: 20
      },
      currentTime: 0,
      data: []
    };
    this._resize = this._resize.bind(this);
    this._animate = this._animate.bind(this);
    this._onViewportChange = this._onViewportChange.bind(this);
    this._csvFileToArray = this._csvFileToArray.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    // this._animate(); // TODO this causes infinite re-render
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
    window.cancelAnimationFrame(this._animation);
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _animate() {
    this.setState({currentTime: Date.now()});
    this._animation = window.requestAnimationFrame(this._animate);
  }

  _csvFileToArray(string) {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    csvRows.pop();

    const array = csvRows.map(i => {
      const values = i.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (values) {
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index].replaceAll('"', '');
          return object;
        }, {});
        return obj;
      }
    });

    return array;
  };

  render() {
    const {viewport} = this.state;
    const fileReader = new FileReader();
    const csvFileToArray = this._csvFileToArray;

    return (
      <div>
        <input
          style={{ position: 'absolute', zIndex: 9, top: 5, left: 5 }}
          type="file"
          onChange={e => {
            const file = e.target.files[0];

            if (file) {
              fileReader.onload = (event) => {
                  const csvOutput = event.target.result;
                  const data = csvFileToArray(csvOutput);
                  this.setState({ data });
              };

              fileReader.readAsText(file);
            }
          }}
        />

        <MapGL {...viewport}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}>

          <DeckGLOverlay viewport={viewport} data={this.state.data} />

        </MapGL>
      </div>
    );
  }
}
