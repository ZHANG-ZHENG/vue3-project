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
        //var vm = this;
        mapboxgl.accessToken = 'pk.eyJ1Ijoiemhlbmd6aGFuZyIsImEiOiJja2J1a2Z2MGEwNWk2MnlvNW03ajlybTJsIn0.wkVTkCrn81LDVglsHv3pjA';
        var map = new mapboxgl.Map({
            container: this.$refs.basicMapbox,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [119.9, 22.7],
            zoom: 5,         
        });
        //apps/gongandaping/assets/bs/icons/house.png
        map.loadImage('/resources/apps/gongandaping/assets/bs/icons/icon_car.png', function(error, image) {    
            if (error) {
                console.log("load image error", error);
            } else {
                map.addImage('car', image);
            }
        });
        map.loadImage('/resources/apps/gongandaping/assets/bs/icons/house.png', function(error, image) {    
            if (error) {
                console.log("load image error", error);
            } else {
                map.addImage('house', image);
            }
        });


        map.on('load', function() {
            var size = 200;
            // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
            // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
            var pulsingDot = {
                width: size,
                height: size,
                data: new Uint8Array(size * size * 4),

                // get rendering context for the map canvas when layer is added to the map
                onAdd: function() {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    this.context = canvas.getContext('2d');
                },

                // called once before every frame where the icon will be used
                render: function() {
                    var duration = 1000;
                    var t = (performance.now() % duration) / duration;

                    var radius = (size / 2) * 0.3;
                    var outerRadius = (size / 2) * 0.7 * t + radius;
                    var context = this.context;

                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
                    context.fill();

                    // draw inner circle
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(255, 100, 100, 1)';
                    context.strokeStyle = 'white';
                    context.lineWidth = 2 + 4 * (1 - t);
                    context.fill();
                    context.stroke();

                    // update this image's data with data from the canvas
                    this.data = context.getImageData(
                        0,
                        0,
                        this.width,
                        this.height
                    ).data;

                    // continuously repaint the map, resulting in the smooth animation of the dot
                    map.triggerRepaint();

                    // return `true` to let the map know that the image was updated
                    return true;
                }
            }; 
            console.log("pulsingDot",pulsingDot);
            map.addImage('pulsing-dot', pulsingDot);           
  
            var myLocation={
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "im":"car",
                            "size":2,
                        },
                        "geometry": {
                            "coordinates": [115, 21],
                            "type": "Point"
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "im":"pulsing-dot",
                            "size":1,
                        },
                        "geometry": {
                            "coordinates": [117, 21],
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
                    'icon-image': ["get",'im'],
                    'icon-size': ["get",'size'],
                    "icon-allow-overlap": true,
                    //'fill-translate':90,
                    //"icon-transform": 90,
                }                            
            });
            var sssize = 1;
            setInterval(function() {
    
                sssize = sssize+0.1;
                //map.setLayoutProperty('myLayer', 'icon-size', sssize);
            }, 200);

          
        });
  
    },
    loadYupai() {
        return new Promise((resolve, reject) => {
            fetch("/resources/apps/gongandaping/typhoon/yupai.json")
            .then(t => {
                t.json().then(json => {
                    //console.log("yupaijson",json);
                    resolve(json);
                });
            })
            .catch(e => {
                reject(e);
            });
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