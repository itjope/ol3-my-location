import test from 'tape'
import ol from 'openlayers'
import utils from '../src/utils'

import eventHandlers from '../src/eventHandlers'

const mapFactory = () => {
  return new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      zoom: 15
    })
  })
}

test('location should expose eventHandlers', (t) => {
  t.equal(typeof eventHandlers.handleFirstPositionChange, 'function', 'handleFirstPositionChange should be a function')
  t.equal(typeof eventHandlers.handlePositionChange, 'function', 'handlePositionChange should be a function')
  t.end()
})

test('location should callback', (t) => {
  t.plan(1)
  const handleChange = () => {
    t.pass()
  }

  let state = {
    config: {
      onChange: handleChange
    },
    geolocation: new ol.Geolocation(),
    overlay: utils.createOverlay(),
    accuracyLayer: utils.createAccuracyLayer(new ol.style.Style())
  }

  eventHandlers.handlePositionChange(state)
})

test('location should not throw when no callback is specified', (t) => {
  t.plan(1)
  let state = {
    config: {},
    geolocation: new ol.Geolocation(),
    overlay: utils.createOverlay(),
    accuracyLayer: utils.createAccuracyLayer(new ol.style.Style())
  }

  eventHandlers.handlePositionChange(state)
  t.pass()
})

test('FirstPositionChange callback should pan map', (t) => {
  t.plan(2)
  let state = {
    map: mapFactory(),
    geolocation: new ol.Geolocation()
  }

  state.geolocation.getPosition = () => [1, 1]
  const centerBefore = state.map.getView().getCenter()

  eventHandlers.handleFirstPositionChange(state)
  const centerAfter = state.map.getView().getCenter()
  t.deepEqual(centerBefore, [0, 0])
  t.deepEqual(centerAfter, [1, 1])
})
