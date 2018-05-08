<template>
	<div>
		<div class="channel_tab_header">
			<p class="channel_tab_header_title">精选专题<span>热</span></p>
		</div>
		<ul class="pic_box">
			<li v-for="icon in pic.data" @click="gotodetail(icon)">
				<img :src="icon.ad_pic_url" alt="">
			</li>
			<a href="" class="channel_groud_footer">更多精彩专题>></a>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				pic:[]
			}
		},
		mounted(){
			this.pic=JSON.parse(localStorage.items).items[6].data
			/*console.log(this.pic.data)*/
		},
		methods:{
			gotodetail(val){
				this.$router.push({path:'/detail',query:{
					'fiction_id':val.reference_id,
					'title':val.ad_name
				}})
			}
		}
	}
</script>
<style scoped>
.channel_tab_header{
	padding: 15px 13px 14px 13px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}
.channel_tab_header_title{
	position: relative;
    font-size: 13px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.9);
}
.channel_tab_header_title span{
	position: absolute;
    margin: -1px 0 0 5px;
    padding: 3px 5px 3px 5px;
    font-size: 12px;
    color: #fff;
    background: #53ac7d;
    border-radius: 1px;
}
.pic_box{
	overflow: hidden;
}
.pic_box li{
	float: left;
	width: 48%;
	margin: 1%;
	height:100px;
	padding-bottom: 10px;
}
.pic_box li img{
	width: 100%;
}
.channel_groud_footer{
	display: block;
    border-top: 1px solid #f0f0f0;
    text-align: center;
    font-size: 14px;
    padding: 10px 0;
    color: #333;
    text-decoration: none;
    cursor: pointer;
}

</style>