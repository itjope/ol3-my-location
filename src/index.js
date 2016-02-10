import ol from 'openlayers'
import utils from './utils'
import controls from './controls'

const OL3ShowLocation = (map, options) => {
  const defaults = {
    trackingOptions: {
      enableHighAccuracy: true
    },
    size: 20,
    color: 'rgb(241, 22, 210)',
    accuracyLayerStyle: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(241, 22, 210, 0.05)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(241, 22, 210, 0.5)'
      })
    }),
    onChange: null
  }

  const config = Object.assign({}, defaults, options)

  let state = {
    map: map,
    config: config,
    geolocation: new ol.Geolocation({
      projection: map.getView().getProjection(),
      trackingOptions: config.trackingOptions
    }),
    overlay: utils.createOverlay(),
    accuracyLayer: utils.createAccuracyLayer(config.accuracyLayerStyle)
  }

  return Object.assign(
      {},
      controls(state)
  )
}

export default OL3ShowLocation
