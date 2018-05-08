<template>
	<div class="wrap">
		<section class="top_home">
			<div class="top_home_search" @click="search()">输入书名/作者/关键子</div>
			<div class="slider_banner">
				<ul class="toppic" >
					<li class="banner" v-for= "item in item"><a href=""><img :src="item.ad_pic_url" alt=""></a></li>
				</ul>
				<ul class="dian_tab">
					<li></li>
					<li></li>
				</ul>
			</div>
			<ul class="top_home_btn">
				<li v-show="!item.ad_pic_url" v-for="item in item">
				    <img :src="item.ad_copy" alt=""> 
				    <p>{{item.ad_name}}</p>
				</li>
			</ul>
		</section>
		<section class="channel_groud">
			<div class="channel_header">本周最火</div>
			<ul class="book_table">
				<li  v-for="book in books" @click="gotodetail(book)">
					<img :src="book.cover" alt="">
					   <h3 class="book_table_title">{{book.title}}</h3>
				</li>
			</ul>
			<router-link class="channel_groud_footer" to="/mostfire">查看更多</router-link>
		</section>
		<recommend></recommend>
	</div>
</template>
<script>
import recommend from '@/components/Recommend'
import Mint from 'mint-ui';
import axios from 'axios'

	window.onload=function(){
		var timer;
		var num=0;
		timer=setInterval(function(){
			$('.toppic').css('left', '-200%');
			if(num>0){
				$('.toppic').css('left', -num*100+'%');
				num=0;
			}else{
				$('.toppic').css('left', -num*100+'%');
				num++
			}
			
		},2000)
	}
export default{
	data(){
		return{
			item:{},
			books:[]
		}
	},
mounted(){
	Mint.Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	axios({
	   method:'get',
	   url:'/hs/v3/channel/418'
	}).then((res)=>{
		Mint.Indicator.close();
		this.item=JSON.parse(localStorage.items).items[0].data.data
		this.books=JSON.parse(localStorage.items).items[1].data.data
		for(var i=2 ; i<this.item.length ;i++){
			this.item[i].ad_copy=this.item[i].ad_copy.split('|')[2].split(';')[0]
		}
		/*console.log(JSON.parse(localStorage.items).items[0].data)*/
		 
	})
},
methods:{
	gotodetail(val){
		this.$router.push({path:'/detail',query:{
			'fiction_id':val.fiction_id,
			'title':val.title
		}})
	},
	search(){
		this.$router.push({path:'/search'})
	}
	
},
components:{
	recommend
}

}
</script>
<style scoped> 
.wrap .top_home{
	padding-top: 45px;
	background: #fff;
    border-bottom: 10px solid #f5f5f5;
}
.top_home_search{
	margin: 10px 13px;
    padding: 1px 0 0 30px;
    font-size: 11px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.4);
    background: url('/static/image/03.png') no-repeat 8px center;
    background-size: 14px;
    border: 1px solid #f5f5f5;
    border-radius: 2px;
}
.slider_banner{
	height: 150px;
	width: 100%;
	overflow: hidden; 
	position: relative;
}
.toppic{
	position: relative;
	overflow: hidden;
	height: 100%;
	left: 0;
	width: 200%;
}
.toppic li{
	float: left;
	height: 100%;
	width: 50%;
}
.toppic li a img{
	width: 100%;
	height: 150px;
}
.dian_tab{
	position: absolute;
    right: 7px;
    bottom: 10px;
    opacity: .7;
}
.dian_tab li{
	display: block;
	float: left;
    height: 2px;
    width: 15px;
    border-radius: 2px;
    box-sizing: border-box;
    margin-left: 3px;
    background-color: #ccc;
}
.top_home_btn{
	display: flex;
	margin: 14px 0 4px;
	width: 100%;
}
.top_home_btn li{
	flex: 1;
}
.top_home_btn li img{
	display: block;
    margin: 0 auto;
    height: 22px;
    width: 22px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 22px;
    vertical-align: -5px;
}
.top_home_btn li p{
	font-size: 10px;
	color: #555;
	line-height: 20px;
	text-align: center;
}
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