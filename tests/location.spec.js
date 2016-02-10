import test from 'tape'
import ol from 'openlayers'
import Location from '../src/index'

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

test('location should expose test, start and toggle methods', (t) => {
  const map = mapFactory()
  const location = Location(map)
  t.equal(typeof location.start, 'function', 'start should be a function')
  t.equal(typeof location.stop, 'function', 'stop should be a function')
  t.equal(typeof location.toggle, 'function', 'toggle should be a function')
  t.end()
})

test('location should add an accuracy layer on start', (t) => {
  const map = mapFactory()
  const location = Location(map)
  const countBefore = map.getLayers().getArray().length
  location.start()
  const countAfter = map.getLayers().getArray().length
  const expect = countBefore + 1
  t.equal(expect, countAfter, 'Add layer')
  t.end()
})

test('location should remove an accuracy layer on start', (t) => {
  const map = mapFactory()
  const location = Location(map)
  location.start()
  const countBefore = map.getLayers().getArray().length
  location.stop()
  const countAfter = map.getLayers().getArray().length
  const expect = countBefore - 1
  t.equal(expect, countAfter, 'Remove layer')
  t.end()
})

test('location should toggle an accuracy layer on toggle', (t) => {
  const map = mapFactory()
  const location = Location(map)
  location.start()
  const countBefore = map.getLayers().getArray().length
  location.toggle()
  let countAfter = map.getLayers().getArray().length
  let expect = countBefore - 1
  t.equal(expect, countAfter)

  location.toggle()
  countAfter = map.getLayers().getArray().length
  expect = countBefore
  t.equal(expect, countAfter)

  t.end()
})

test('location should add an overlay on start', (t) => {
  const map = mapFactory()
  const location = Location(map)
  const countBefore = map.getOverlays().getArray().length
  location.start()
  const countAfter = map.getOverlays().getArray().length
  const expect = countBefore + 1
  t.equal(expect, countAfter, 'Add overlay')
  t.end()
})

test('location should remove an overlay on start', (t) => {
  const map = mapFactory()
  const location = Location(map)
  location.start()
  const countBefore = map.getOverlays().getArray().length
  location.stop()
  const countAfter = map.getOverlays().getArray().length
  const expect = countBefore - 1
  t.equal(expect, countAfter, 'Remove overlay')
  t.end()
})

test('location should toggle an overlay on toggle', (t) => {
  const map = mapFactory()
  const location = Location(map)
  location.start()
  const countBefore = map.getOverlays().getArray().length
  location.toggle()
  let countAfter = map.getOverlays().getArray().length
  let expect = countBefore - 1
  t.equal(expect, countAfter, 'Remove overlay')

  location.toggle()
  countAfter = map.getOverlays().getArray().length
  expect = countBefore
  t.equal(expect, countAfter, 'Add overlay')

  t.end()
})
