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
        //mapboxgl.accessToken = 'pk.eyJ1Ijoiemhlbmd6aGFuZyIsImEiOiJja2J1a2Z2MGEwNWk2MnlvNW03ajlybTJsIn0.wkVTkCrn81LDVglsHv3pjA';
        //天地图（各个区域的token可以在网上查到）
        var vecUrl =
            "http://t0.tianditu.com/vec_w/wmts?tk=e90d56e5a09d1767899ad45846b0cefd";
        var cvaUrl =
            "http://t0.tianditu.com/cva_w/wmts?tk=e90d56e5a09d1767899ad45846b0cefd";
        //实例化source对象
        var tdtVec = {
            //类型为栅格瓦片
            type: "raster",
            tiles: [
                //请求地址
                vecUrl +
                    "&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
            ],
            //分辨率
            tileSize: 256,
        };
        var tdtCva = {
            type: "raster",
            tiles: [
                cvaUrl +
                    "&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
            ],
            tileSize: 256,
        };  
        var mapStyle = {
            //设置版本号，一定要设置
            version: 8,
            //添加来源
            sources: {
                tdtVec: tdtVec,
                tdtCva: tdtCva,
            },
            glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
            layers: [
                {
                    id: "tdtVec",
                    type: "raster",
                    source: "tdtVec",
                    minzoom: 0,
                    maxzoom: 17,
                },
                {
                    id: "tdtCva",
                    type: "raster",
                    source: "tdtCva",
                    minzoom: 0,
                    maxzoom: 17,
                },
            ],
        };    
        var center = [118.05155447016978, 21.498766543094177];
        // mapboxgl.accessToken = this.$settings.token;          
        // var map = new mapboxgl.Map({
        //     container: this.$refs.basicMapbox,
        //     style: 'mapbox://styles/mapbox/streets-v11',
        //     center:  [119.9, 22.7],
        //     zoom: 5,         
        // });

        var map = new mapboxgl.Map({
            // style: "mapbox://styles/mapbox/streets-v11",
            // style: "mapbox://styles/mapbox/dark-v9",
            style: mapStyle,
            attributionControl: false,
            center: center,
            container: this.$refs.basicMapbox,
            zoom: 5.605,
            bearing: 9.6,
        });
        map.loadImage('/resources/apps/gongandaping/assets/bs/icons/icon_car.png', function(error, image) {    
            if (error) {
                console.log("load image error", error);
            } else {
                map.addImage('car', image);
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
            // var img = new Image();
            // img.src = "/resources/apps/gongandaping/assets/bs/icons/icon_car.png";
            // img.onload = function(){
               
                
            //     // 将图片画到canvas上面上去！
            //     context.drawImage(img,200,200);
            //     context.fill();
            //     context.stroke();
 
            // }

                    this.data = context.getImageData(0,0,this.width,this.height).data;
                    map.triggerRepaint();
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
                    "icon-rotate": 90,
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