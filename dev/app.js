import ol from 'openlayers'
import OL3MyLocation from '../src/index'

document.addEventListener('DOMContentLoaded', () => {
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      center: [100, 0],
      zoom: 2
    })
  })

  const location = OL3MyLocation(map, {
    onChange: (e) => {
      console.log('change', e)
    }
  })

  document.getElementById('toggle').addEventListener('click', () => {
    location.toggle()
  })

  location.start()
})
