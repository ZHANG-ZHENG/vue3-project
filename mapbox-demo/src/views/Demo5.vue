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
            center: [-77.04, 38.907],
            //center: [119.37782008242874, 25.95825357382145],
            zoom: 10.5,
            pitch: 45
        });


        map.on('load', function() {

            // Add a layer showing the places.
            map.addLayer({
                "id": "places",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>路口信息</strong><br>" +
                                    "<span class='pull-left'>编号：zzzzz-</span><span class='pull-right'>名称：-</span><br>" ,
                                "avg": 1,
                                //"icon": "theatre"    
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.038659, 38.931567]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                                "avg": 20
                                //"icon": "theatre"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.003168, 38.894651]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
                                "avg": 30
                                //"icon": "bar"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.090372, 38.881189]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>",
                                "avg": 40
                                //"icon": "art-gallery"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.111561, 38.882342]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
                                "avg": 50
                                //"icon": "bicycle"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.052477, 38.943951]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
                                "avg": 60
                                //"icon": "star"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.043444, 38.909664]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
                                "avg": 70
                                //"icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.031706, 38.914581]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
                                "avg": 1
                                //"icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.020945, 38.878241]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
                                "avg": 16
                                //"icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.007481, 38.876516]
                            }
                        }]
                    }
                },
                "paint": {
                    "circle-radius": [
                                    "step",
                                    ["get", "avg"],
                                    10,
                                    6,
                                    15,
                                    10,
                                    20
                                ],
                    "circle-color": [
                                    "step",
                                    ["get", "avg"],
                                    "#51bbd6",
                                    10,
                                    "#f1f075",
                                    40,
                                    "#f28cb1"
                                ]

                }, 
                /*"layout": {
                    "icon-image": "{icon}-15",
                    "icon-allow-overlap": true
                }*/
            });

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: false
            });

            map.on('mouseenter', 'places', function(e) {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            /*map.on('mouseleave', 'places', function() {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });*/
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