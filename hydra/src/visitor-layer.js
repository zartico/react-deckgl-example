import { CompositeLayer, LineLayer } from 'deck.gl';

export default class VisitorsLayer extends CompositeLayer {
  renderLayers() {
    const { id, data, color, getPickupLocation, getDropoffLocation } = this.props;

    return [
      new LineLayer({
        id: `${id}-line`,
        data: data,
        getColor: () => color,
        getSourcePosition: getPickupLocation,
        getTargetPosition: getDropoffLocation,
        strokeWidth: 1
      })
    ];
  }
}
