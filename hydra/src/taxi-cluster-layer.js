import DeckGL, {CompositeLayer} from 'deck.gl';
import TaxiLayer from './taxi-layer';
import {clusterPoints} from './helpers';

export default class TaxiClusterLayer extends CompositeLayer {
    updateState({oldProps, props}) {
        if (oldProps.data !== props.data) {
            // data changed, recalculate cluster
            const clusteredData = clusterPoints(props.data, {
                pickup_cluster: props.getPickupLocation,
                dropoff_cluster: props.getDropoffLocation
            });
            this.setState({clusteredData});
        }
      }

      renderLayers() {
        // Create sublayers
        return [
          new TaxiLayer({
            ...this.props,
            data: this.state.clusteredData,
            getPickupLocation: d => d.pickup_cluster,
            getDropoffLocation: d => d.dropoff_cluster
          })
        ];
      }
    }
    
TaxiClusterLayer.layerName = 'TaxiClusterLayer';

  