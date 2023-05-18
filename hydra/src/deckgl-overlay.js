import React, {Component} from 'react';
import DeckGL from 'deck.gl';
import VisitorLayer from './visitor-layer';
import TaxiLayer from './taxi-layer';
import TaxiClusterLayer from './taxi-cluster-layer';

export default class DeckGLOverlay extends Component {

  render() {
    const { data, viewport } = this.props;

    if (!data) {
      console.log("No data");
      return null;
    }

    const layers = [
      new VisitorLayer({
        id: 'visitors',
        data: data,
        color: [0, 128, 255],
        getPickupLocation: d => d.MovementStart.split(','),
        getDropoffLocation: d => d.MovementStop.split(',')
      }),
      // new TaxiLayer({
      //   id: 'taxi-trips',
      //   data: data,
      //   pickupColor: [0, 128, 255],
      //   dropoffColor: [255, 0, 128],
      //   getPickupLocation: d => [d.pickup_longitude, d.pickup_latitude],
      //   getDropoffLocation: d => [d.dropoff_longitude, d.dropoff_latitude]
      // }),
      // new TaxiClusterLayer({
      //   id: 'taxi-trips',
      //   data: data,
      //   pickupColor: [0, 128, 255],
      //   dropoffColor: [255, 0, 128],
      //   getPickupLocation: d => [d.pickup_longitude, d.pickup_latitude],
      //   getDropoffLocation: d => [d.dropoff_longitude, d.dropoff_latitude]
      // })
    ];

    return (
      <DeckGL {...viewport} layers={layers} />
    );
  }
}
