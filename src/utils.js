import ol from 'openlayers'

const utils = {
  createOverlay: () => new ol.Overlay({
    element: document.createElement('div')
  }),
  createAccuracyLayer: (style) => new ol.layer.Vector({
    style: style
  }),
  createPoisitionIconElement: (heading, color, size) => {
    const element = document.createElement('div')

    const arrow = `<svg width="${size}px" height="${size}px" viewBox="0 0 560 560" ><g transform="translate(0, -0.561)" style="fill:${color}; fill-rule:evenodd; stroke:none; stroke-width:1; stroke-linecap:butt; stroke-linejoin:miter; stroke-dasharray:none;" ><path d="M0 559.991 C0 558.504 279.994 0 280.458 0.561456 C282.014 2.44528 560.512 560.13 559.999 560.337 C559.665 560.472 496.562 533.384 419.77 500.142 C419.77 500.142 280.15 439.701 280.15 439.701 C280.15 439.701 140.756 500.131 140.756 500.131 C64.0894 533.368 1.05572 560.561 0.681114 560.561 C0.306506 560.561 8e-06 560.304 8e-06 559.991 C8e-06 559.991 0 559.991 0 559.991 Z" /></g></svg>`
    const bullet = `<svg width="${size}px" height="${size}px"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" style="fill:${color};stroke:none;" /></svg>`

    const icon = heading === undefined ? bullet : arrow

    const fontAwsomeIconToNorthRotation = 5.5
    const adjustedHeading = heading !== undefined ? heading + fontAwsomeIconToNorthRotation : 0.4

    element.innerHTML = `<div style="transform: rotate(${adjustedHeading}rad);">${icon}</div>`

    return element
  },
  updateAccuracy: (accuracyLayer, geom) => {
    const feature = new ol.Feature({
      geometry: geom
    })

    const source = new ol.source.Vector({
      features: [feature]
    })

    accuracyLayer.setSource(source)
  },
  updateOverlay: (overlay, coord, offset, icon) => {
    overlay.setOffset([offset, offset])
    overlay.setPosition(coord)
    overlay.setElement(icon)
  },
  panToCoord: (map, coord, duration = 300) => {
    let view = map.getView()
    const pan = ol.animation.pan({
      duration: duration,
      source: view.getCenter()
    })
    view.setCenter(coord)
    map.beforeRender(pan)
  }

}

export default utils
