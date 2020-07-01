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
        var vm = this;
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
  


           vm.loadYupai().then(yupaiData => {
                console.log("yupaiData",yupaiData);

                var yupaiPoints={
                    "type": "FeatureCollection",
                    "features": [
                        // {
                        //     "type": "Feature",
                        //     "properties": {
                        //         "id":1,
                        //         "name": "kunming",
                        //         "color":"red",
                        //         "im":"cat",
                        //         "size":0.05,
                        //     },
                        //     "geometry": {
                        //         "coordinates": [119.9, 22.7],
                        //         "type": "Point"
                        //     }
                        // }
                    ]
                };
                yupaiData.forEach((yupai) => {

                    var randomX = Math.random()*10;
                    var randomY = Math.random()*10;
                    if(randomX>3&&randomX<7&&randomY>3&&randomY<7){
                        yupai.im = "car";
                    }else{
                        yupai.im = "house";         
                    }

                    yupai.size = 0.5;
                    yupai.color = "green";


                    var feature = {
                            "type": "Feature",
                            "properties": yupai,
                            "geometry": {
                                "coordinates": [115+randomX, 21+randomY],
                                "type": "Point"
                            }                    
                    }
                    yupaiPoints.features.push(feature);
                });
                console.log("yupaiPoints",yupaiPoints);
                map.addSource('yupaiSource', { type: 'geojson', data: yupaiPoints });
                map.addLayer({
                    "id": "yupaiLayer",
                    // "type": "circle",
                    "type": "symbol",
                    "source": "yupaiSource",
                    // "paint": {
                    //     "circle-color": ["get",'color']     
                    // }                
                    'layout': {
                        'icon-image': ["get",'im'],
                        'icon-size': ["get",'size'],
                        "icon-allow-overlap": true,
                    }                            
                });

                // Create a popup, but don't add it to the map yet.
                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                map.on('mouseenter', 'yupaiLayer', function(e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';

                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.name;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    var content = description+"<br/>未撤离人数3"
                    popup.setLngLat(coordinates).setHTML(content).addTo(map);
                });

                map.on('mouseleave', 'yupaiLayer', function() {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });
            });

            var myLocation={
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "id":1,
                            "name": "kunming",
                            "color":"red",
                            "im":"car",
                            "size":2,
                        },
                        "geometry": {
                            "coordinates": [115, 21],
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
                    'icon-image': 'car',
                    'icon-size': ["get",'size'],
                    "icon-allow-overlap": true,
                }                            
            });
          
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