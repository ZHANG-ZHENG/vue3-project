<template>
    <div class="popDiv">
      <div>标题 <span  @click="hidePopDiv()">取消</span></div>
      <div>
				<div @click="tagClick(dataTag)" class="tagDiv" v-for="dataTag in dataTagList" :key="dataTag.id">{{dataTag.name}}</div>
			</div>    
    </div>
</template>

<script>
export default {
  data () {
    return {
			dataTagList:[
				{
					id:1,
					name:"坐标z1"
				},
				{
					id:2,
					name:"坐标x2"
				},  		
			]
    }
  },	
	methods: {
		showPopDiv(left,top){
			//console.log("popDiv "+top+" "+left);
			document.getElementsByClassName('popDiv')[0].style.top = top+"px";
			document.getElementsByClassName('popDiv')[0].style.left = left+"px";
			document.getElementsByClassName('popDiv')[0].style.display = "block";
		},
		hidePopDiv(){
			document.getElementsByClassName('popDiv')[0].style.display = "none";
		},
		tagClick(tag){
			console.log(tag);
			document.getElementsByClassName('popDiv')[0].style.display = "none";
			this.$emit('childSelect',tag);
		},
	}
};
</script>

<style scoped>
.popDiv{
	height: 50px;
	width: 50px;
	background: red;
	position: absolute;
	top:50px;
	left:30px;
	display: none;
}
.tagDiv{
	width: 100%;
	overflow: hidden;
	background: green;
	cursor:pointer;
}
</style>
