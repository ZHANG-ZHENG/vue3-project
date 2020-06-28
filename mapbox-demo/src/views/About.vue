<template>
  <div style="height:500px;width:100%;text-align:left;">
    <div ref="basicMapbox" style="height:500px;width:100%;"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
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
        //style: 'mapbox://styles/mapbox/streets-v9',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [119.37782008242874, 25.95825357382145],
        zoom: 6, 
      });

      new mapboxgl.Marker().setLngLat([119.37782008242874, 25.95825357382145]).addTo(map);
      new mapboxgl.Marker().setLngLat([119.47782008242874, 25.95825357382145]).addTo(map);

      //console.log(map);
      //console.log(this.mapSize);     
    }
  },
  computed: {
    mapSize () {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
</style>