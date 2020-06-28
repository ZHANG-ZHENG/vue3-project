<template>
  <div style="height:500px;width:100%;text-align:left;">
    <div>
        212313
    </div>
    <div ref="basicMapbox" style="height:500px;width:100%;">
      <demo2-pop @childSelect="childSelect" ref="demo2Pop"></demo2-pop>
    </div>
    <pre id='info'></pre>
    <!-- <pre id='coordinates' class='coordinates'></pre> -->
  </div>
</template>
<script>
import Demo2Pop from "@/components/Demo2Pop.vue";
import mapboxgl from 'mapbox-gl';
export default {
  components: {
    Demo2Pop
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
        var vm = this;
        mapboxgl.accessToken = 'pk.eyJ1Ijoiemhlbmd6aGFuZyIsImEiOiJja2J1a2Z2MGEwNWk2MnlvNW03ajlybTJsIn0.wkVTkCrn81LDVglsHv3pjA'
        //var coordinates = document.getElementById('coordinates');
        const map = new mapboxgl.Map({
          container: this.$refs.basicMapbox,
          style: 'mapbox://styles/mapbox/streets-v9',
          //center: [119.37782008242874, 25.95825357382145], // 设置地图中心
          center: [173.9652064864411, -41.516717608535195],
          zoom: 6,  // 设置地图比例
        })
        
        // 使用定位模块
        // map.addControl(new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true
        //     },
        //     trackUserLocation: true,
        //     showUserLocation: true,
        //     zoom: 14,
        // }))
        
        // 建立一个标记点
        var marker = new mapboxgl.Marker({
            draggable: true
        })
       
        marker.on('dragend',  function () {
            var lngLat = marker.getLngLat();
            //coordinates.style.display = 'block';
            document.getElementById('info').innerHTML = 'onDragEnd <br />Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        });

        // 点击获取经纬度模块&点击标记点
        map.on('click', function (e) {
            document.getElementById('info').innerHTML = JSON.stringify(e.point) + '<br />' + JSON.stringify(e.lngLat);
            marker.setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);
            vm.$refs.demo2Pop.showPopDiv(e.point.x,e.point.y);
        })
        // map.addControl(new mapboxgl.MapboxGeocoder({
        //     accessToken: mapboxgl.accessToken
        // }));
    },
    childSelect(tag){
      //console.log("deno2 tag");
      //console.log(tag);
      document.getElementById('info').innerHTML = JSON.stringify(tag);
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