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
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [102.73,25.04],
            zoom: 10.5,
            pitch: 45            
        });

        map.on('load', function() {
            map.loadImage(
                //'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
                '/resources/apps/framework/assets/login-bg.png',
                function(error, image) {
                    if (error) throw error;
                    map.addImage('cat', image);

                    var myLocation={
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "properties": {
                                        "id":1,
                                        "name": "kunming",
                                        "color":"red",
                                        "im":"cat",
                                        "size":0.25,
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
                                        "color":"green",
                                        "im":"cat",
                                        "size":0.15,
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
                            //"type": "circle",
                            "type": "symbol",
                            "source": "mySource",
                            // "paint": {
                            //     "circle-color": ["get",'color']     
                            // }
                            'layout': {
                                'icon-image': 'cat',
                                'icon-size': ["get",'size']
                            }                            
                        });




                }
            );
    
        });

    },

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