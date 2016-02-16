ol3-my-location
=======================

Uses [OpenLayers](http://openlayers.org) geolocation API to display current location and heading.

![screenshot](https://cloud.githubusercontent.com/assets/5778239/13088053/fd539ae0-d4ea-11e5-8fed-7c4d80aa9aa0.png)

Installation
-----
`npm install itjope/ol3-my-location`

Example usage
-----

```javascript
  import ol from 'openlayers'
  import MyLocation from 'ol3-my-location'
  
  var map = new ol.Map()
  
  var options =  {
    color: 'rgba(255, 0, 0, 0.5)'
  }
  
  var location = MyLocation(map, options)
  
  location.start()
```

API
-----

### .start()

Activates geolocation tracking and centers the map on the first location change.

### .stop()

Stop geolocation tracking and removes marker overlay.

### .toggle()

Toggles geolocation tracking.

Options
-----

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| trackingOptions | <code>object</code> | <code>{ enableHighAccuracy: true }</code> | Tracking options. See http://www.w3.org/TR/geolocation-API/#position_options_interface. |
| size | <code>number</code> | <code>20</code> | Size of the location marker in pixels. |
| color | <code>rgb</code> | <code>rgb(241, 22, 210)</code> | Color for the location marker. |
| accuracyLayerStyle | <code>ol.style.Style</code> | | OL3 style object. |
| onChange | <code>function</code> | <code>null</code>  | Fires on location change. |

Development
-----

* `npm start` - Spins up webpack-dev-server server to serve your app at `localhost:9000`.
* `npm run test` - Runs unit tests with Karma and generates a coverage report.
* `npm run test:dev` - Runs Karma and watches for changes to re-run tests; does not generate coverage reports.
* `npm run deploy`- Runs linter, tests, and then, on success, compiles your application to disk.
