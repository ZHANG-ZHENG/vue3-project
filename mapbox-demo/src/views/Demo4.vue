<template>
  <div style="height:500px;width:100%;text-align:left;">
    <div ref="basicMapbox" style="height:500px;width:100%;"></div>
    <pre id='info'></pre>
    <!-- <pre id='coordinates' class='coordinates'></pre> -->
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
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhlbmd6aGFuZyIsImEiOiJja2J1a2Z2MGEwNWk2MnlvNW03ajlybTJsIn0.wkVTkCrn81LDVglsHv3pjA';
       
      var map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/light-v10',
        //center: [-87.62712, 41.89033],
        center:  [102.73,25.04],
        //center: [119.37782008242874, 25.95825357382145],
        zoom: 10.5,
        pitch: 45
      });
         
      console.log(map);
      map.on('load', function() {
        var myLocation={
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "id":1,
                        "name": "kunming",
                        "color":"red"
                    },
                    "geometry": {
                        "coordinates": [102.73,25.04],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "id":10,
                        "name": "kunming",
                        "color":"green"
                    },
                    "geometry": {
                        "coordinates": [102.83,25.04],    //获取color字段，设置点的颜色
                        "type": "Point"
                    }
                }
            ]
        };
         
         
        map.addSource('mySource', { type: 'geojson', data: myLocation });
        map.addLayer({
            "id": "myLayer",
            "type": "circle",
            "source": "mySource",
            "paint": {
                "circle-color": ["get",'color']     
            }
        });
      });

    }
  },
  computed: {
  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
.coordinates {
    background: rgba(0,0,0,0.5);
    color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding:5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
}
</style>