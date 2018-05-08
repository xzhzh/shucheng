<template>
	<div class="content">
		<h3 class="content_title">进城</h3>
		<div class="reader__content">
			一个二十来岁的青年人站在镇海市客运站前，望着周边的高楼大厦，街上的车水马龙，形形色色的人群，就是一阵眼晕，唏嘘不已。
		</div>
	</div>
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'
	export default{
		data(){
			return{
				items:[]
			}
		},
		mounted(){
		      Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		        method:'get',
		        url:'/store/v0/fiction/detail/352876'
		    }).then((res)=>{
		      Mint.Indicator.close();
		      /*var str = JSON.stringify(res.data)
		      localStorage.setItem("items",str)*/
		      console.log(res)
		    })
		},
	}
</script>
<style>
.content{
	height: 100%;
	background:#f7eee5;
	padding: 0 10px;
}
.content .content_title{
    margin-bottom: 20px;
    border-bottom: 1px solid #736357;
    font-size: 20px;
    line-height: 31px;
    color: #736357;
    letter-spacing: 2px;
}

	
</style>