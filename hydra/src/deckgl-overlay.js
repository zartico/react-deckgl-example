import React, {Component} from 'react';
import DeckGL from 'deck.gl';
import TaxiLayer from './taxi-layer';
import TaxiClusterLayer from './taxi-cluster-layer';

export default class DeckGLOverlay extends Component {

  render() {
    if (!this.props.data) {
      return null;
      console.log("No data");
    }

    const layers = [
      // new TaxiLayer({
      //   id: 'taxi-trips',
      //   data: this.props.data,
      //   pickupColor: [0, 128, 255],
      //   dropoffColor: [255, 0, 128],
      //   getPickupLocation: d => [d.pickup_longitude, d.pickup_latitude],
      //   getDropoffLocation: d => [d.dropoff_longitude, d.dropoff_latitude]
      // })
      new TaxiClusterLayer({
        id: 'taxi-trips',
        data: this.props.data,
        pickupColor: [0, 128, 255],
        dropoffColor: [255, 0, 128],
        getPickupLocation: d => [d.pickup_longitude, d.pickup_latitude],
        getDropoffLocation: d => [d.dropoff_longitude, d.dropoff_latitude]
      })
    ];

    return (
      <DeckGL {...this.props.viewport} layers={layers} />
    );
  }
}
