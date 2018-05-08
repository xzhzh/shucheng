<template>
	<div>
		<section class="channel_groud">
			<div class="channel_header">限时免费</div>
			<ul class="book_table">
				<li v-for="list in item.data" @click="gotodetail(list.data)">
					<img :src="list.data.book_cover" alt="">
					<div class="free_tip"></div>
					<h3 class="book_table_title">{{list.ad_name}}</h3>
				</li>
			</ul>
			<a href="" class="channel_groud_footer">更多限免佳作>></a>
		</section>
	</div>
</template>
<script>
import axios from 'axios'
	export default{
		data(){
			return{
				item:[]
			}
		},
		mounted(){
			this.item=JSON.parse(localStorage.items).items[5].data
			/*console.log(this.item)*/
		},
		methods:{
			gotodetail(val){
				this.$router.push({path:'/detail',query:{
					'fiction_id':val.fiction_id,
					'title':val.title
				}})
			}
		}
	}
</script>
<style>
.channel_groud{
	border-bottom: 10px solid #f5f5f5;
}
.channel_groud  .channel_header{
	position: relative;
    padding: 10px 14px;
    font-size: 14px;
    color: #555;
    border-bottom: 1px solid #f0f0f0;
    border-left: 6px solid #ffab18;
}
.book_table{
	padding: 13px 14px 5px;
	overflow: hidden;
}
.book_table li{
	float: left;
	width: 30%;
	height: 155px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: 1;
    margin-bottom: 8px;
}
.book_table li img{
	width: 86px;
    height: 113px;
}

.book_table_title{
	padding-top:4px;
	font-size: 13px;
	color: #8d8d8d;
	width:100%;
	font-weight: normal;
	line-height: 20px;
	text-align: center;
	overflow: hidden;
	margin-bottom: 0;
}
.book_table li:nth-child(3n+2){
	text-align: center;
	padding:0 5%;

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