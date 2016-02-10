import eventHandlers from './eventHandlers'

export default (state) => {
  const start = () => {
    state.geolocation.setTracking(true)
    state.geolocation.on('change', eventHandlers.handlePositionChange.bind(null, state))
    state.geolocation.once('change', eventHandlers.handleFirstPositionChange.bind(null, state))

    state.map.addOverlay(state.overlay)
    state.map.addLayer(state.accuracyLayer)
  }

  const stop = () => {
    state.geolocation.setTracking(false)
    state.map.removeOverlay(state.overlay)
    state.map.removeLayer(state.accuracyLayer)
    state.geolocation.un('change', eventHandlers.handlePositionChange.bind(null, state))
  }

  const toggle = () => {
    const action = state.geolocation.getTracking() ? stop : start
    action()
  }

  return {
    start, stop, toggle
  }
}
