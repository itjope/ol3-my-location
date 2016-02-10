import test from 'tape'
import ol from 'openlayers'
import utils from '../src/utils'

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

test('Should create overlay with empty DIV', assert => {
  const expect = 'DIV'
  const overlay = utils.createOverlay()
  const element = overlay.getElement()
  const actual = element.tagName + element.innerHTML

  assert.deepEqual(expect, actual)
  assert.end()
})

test('Should create accuracyLayer', assert => {
  const layer = utils.createAccuracyLayer()
  assert.equal(layer instanceof ol.layer.Vector, true)
  assert.end()
})

test('Should create position element with right color', assert => {
  const color = '#000'
  let rotation = 0
  let iconElement = utils.createPoisitionIconElement(rotation, color, 1)
  assert.equal(iconElement.innerHTML.indexOf(color) > 0, true)

  rotation = undefined
  iconElement = utils.createPoisitionIconElement(rotation, color, 1)
  assert.equal(iconElement.innerHTML.indexOf(color) > 0, true)

  assert.end()
})

test('Should create position element with angle', assert => {
  const color = '#000'
  let rotation = '123'
  let iconElement = utils.createPoisitionIconElement(rotation, color, 42)
  assert.equal(iconElement.innerHTML.indexOf(rotation) > 0, true)

  rotation = 0
  iconElement = utils.createPoisitionIconElement(rotation, color, 42)
  assert.equal(iconElement.innerHTML.indexOf(rotation) > 0, true)
  assert.end()
})

test('Should create circle if no angle is specified', assert => {
  const color = '#000'
  const rotation = undefined
  const iconElement = utils.createPoisitionIconElement(rotation, color, 42)
  assert.equal(iconElement.innerHTML.indexOf('<circle') > 0, true)
  assert.end()
})

test('Should create arrow if angle is specified', assert => {
  const color = '#000'
  let rotation = 13
  let iconElement = utils.createPoisitionIconElement(rotation, color, 42)
  assert.equal(iconElement.innerHTML.indexOf('<circle') < 0, true)

  rotation = 0
  iconElement = utils.createPoisitionIconElement(rotation, color, 42)
  assert.equal(iconElement.innerHTML.indexOf('<circle') < 0, true)
  assert.end()
})

test('Should pan to coord', assert => {
  const map = mapFactory()
  const centerBefore = map.getView().getCenter()
  utils.panToCoord(map, [1, 1], 0)
  const centerAfter = map.getView().getCenter()

  assert.deepEqual(centerBefore, [0, 0])
  assert.deepEqual(centerAfter, [1, 1])
  assert.end()
})
