<template>
  <div style="height:500px;width:100%;text-align:left;">
    本地化
    <div ref="basicMapbox" style="height:500px;width:100%;"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {

  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhlbmd6aGFuZyIsImEiOiJja2J1a2Z2MGEwNWk2MnlvNW03ajlybTJsIn0.wkVTkCrn81LDVglsHv3pjA'
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style:{
          "version": 8,
          "name": "Mapbox Streets",
          //"sprite": "mapbox://sprites/mapbox/streets-v8",
          "sprite": "http://db.zhost.top/mapbox/sprite/sprite",
          "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
          "sources": {
              "osm-tiles": {
                  "type": "raster",
                  "tiles": [
                    "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    ],
                  "tileSize": 256
              }
          },
          "layers":[{
              "id": "123",
              "type": "raster",
              "source": "osm-tiles",
              "source-layer": "osmtiles"
          }]
        },
        center: [119.37782008242874, 25.95825357382145],
        zoom: 6,      
      });

      new mapboxgl.Marker().setLngLat([119.37782008242874, 25.95825357382145]).addTo(map);
    }
  },
  computed: {

  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
</style>