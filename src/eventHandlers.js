import utils from './utils'

export default {
  handlePositionChange: (state) => {
    const coord = state.geolocation.getPosition()
    const geom = state.geolocation.getAccuracyGeometry()
    const heading = state.geolocation.getHeading()
    const icon = utils.createPoisitionIconElement(heading, state.config.color, state.config.size)
    const offset = state.config.size / 2 * -1

    utils.updateOverlay(state.overlay, coord, offset, icon)
    utils.updateAccuracy(state.accuracyLayer, geom)

    if (state.config.onChange) {
      state.config.onChange({
        coordinate: coord,
        accuracy: geom,
        heading: heading
      })
    }
  },
  handleFirstPositionChange: (state) => {
    const coord = state.geolocation.getPosition()
    utils.panToCoord(state.map, coord)
  }
}
