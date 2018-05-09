<template>
	<div class="top search1">
		<div class="top_tit">
			<a href="javascript:history.back()" class="top__back"><i class="fa fa-angle-left back"></i></a>
			<div id="search-input" class="search-input">
			    <b class="search-input_mi"></b>
			    <input type="text" v-model="sid"  placeholder="输入书名/作者/关键字">
			    <div class="search-input__btn" id="Tag__146" @click="search()">搜索</div>
			</div>
		</div>
		
		<!-- <ul class="tab">
			<li v-for="item in items.ads">{{item.ad_name}}</li>
		</ul> -->
		<div class="tab_wrap">
				<div class="tab_wrap_box"  >
						<ul class="tab_wrap_box_ul" >
							<li v-for= "item in items" @click="gotodetail(item)">
								<div class="list_li">
									<div class="list_inner_left">
										<img :src="item.cover" alt="">
										<!-- <p class="list_inner_finish">{{item.finish}}</p> -->
									</div>
									<div class="list_inner_right">
										<p class="book_list_title">{{item.title}}</p>
										<p class="book_list_summery">{{item.intro}}</p>
										<br>
										<p class="book_list_author"><span>{{item.role[0][1]}}</span></p>
									</div>
								</div>
							</li>
						</ul>
						<mt-spinner class="get_more" color="#26a2ff" type="fading-circle" >加载更多</mt-spinner>
				</div>
			
	     </div>

	</div>
</template>
<script>
import Mint from 'mint-ui';
import axios from 'axios'
export default{
	data(){
		return{
			items:[],
			sid:"",
			data:0,
			fetching:false,

		}
		
	},
	mounted(){
	},
	methods:{

		search(){
			console.log(this.sid)
			Mint.Indicator.open({
			text: '加载中...',
			spinnerType: 'fading-circle'
		   });
		axios({
		   method:'get',
		   url:'store/v0/lib/query/onebox?start='+this.data+'&count=10&s='+this.sid+'&source=2%2C5'
		}).then((res)=>{
			Mint.Indicator.close();
			this.items=res.data.items
			console.log(res.data)


			    var  self=this
				$(window).scroll(function(){
				　　var scrollTop = $(this).scrollTop();
				　　var scrollHeight = $(document).height();
				　　var windowHeight = $(this).height();
			　　  if(scrollTop + windowHeight>= scrollHeight){
						if(!self.fetching){
								self.data=self.data+10
						}else{
							return
						}
			　　}
			   });
		 
	    })
		},
		gotodetail(val){
			this.$router.push({path:'/detail',query:{
				'fiction_id':val.id,
				'title':val.title
			}})
		}
	},
	watch:{
		'data'(){
		  this.fetching=true;
			axios({
		        method:'get',
		        url:'store/v0/lib/query/onebox?start='+this.data+'&count=10&s='+this.sid+'&source=2%2C5'
		    }).then((res)=>{
		    	this.fetching=false;
		    	for(var i=0; i<res.data.items.length ; i++){
		    		this.items.push(res.data.items[i])
		    	}
		     })
		}
	}
}
</script>
<style scoped>
.top{
	width: 100%;
	overflow: hidden;
}
.top_tit{
	position: fixed;
	width: 100%;
	height: 44px;
	z-index: 5;
	background: #efeff0;
    border-bottom: 1px solid #ddd;
    color: rgba(0, 0, 0, 0.7);
}
.top a{
	float: left;
    width: 42px;
    height: 44px;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
}
.back{
	font-size: 35px;
	margin-left: 10px;
	margin-top: 4px;
}
.search-input {
    position: relative;
    margin: 5px 20px 5px 42px;
    height: 35px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.search-input b {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 35px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    background-size: 17px 17px;
}
.search-input_mi {
    background: url('/static/image/search.png') no-repeat center;
}
.search-input input {
    border: none;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 52px 8px 42px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    background: #fff;
}
.search-input__btn {
    display: block;
    line-height: 36px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #ddd;
    padding: 0 8px;
    font-size: 14px;
    color: #666;
}
.top .tab{
	width:100%;
	padding: 15px;
	overflow: hidden;
}
.top .tab li{
	display: inline-block;
    width: auto;
    padding: 0 20px;
    color: #766d5d;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    border: 1px solid #d3d3d3;
}
.top .tab li:nth-child(3n+1){
	background:#fbebe8;
}
.top .tab li:nth-child(3n+2){
	background:#fcedda;
}


.tab_wrap{
	float: left;
	top: 40px;
    position: relative;
    width: 100%;
    margin-right: -100%;
    z-index: 1;
}	
.tab_wrap_box{

	position: relative;
}
.tab_wrap_box_ul{
	padding: 0 13px;
}
.tab_wrap_box_ul li{
	padding: 17px 0;
    border-bottom: 1px solid #f0f0f0;
}
.tab_wrap_box_ul .list_li{
	overflow: hidden;
}
.list_inner_left{
	float: left;
    position: relative;
    width: 85px;
    height: 113px;
    background-color: #eeece9;
    border: 1px solid #f0f0f0;
    border-radius: 1px;
    overflow: hidden;
}
.list_inner_left img{
	width: 100%;
	height: 100%;
	border-radius: 1px;
}
.list_inner_finish{
	position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    font: 10px/10px a;
    padding: 25px 7px 6px;
    color: #fff;
     background:linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.3));
    background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.3));
}
.list_inner_order{
	position: absolute;
    left: 3px;
    top: 0;
    padding: 2px 1px 2px 4px;
    height: 17px;
    width: 12px;
    font-size: 12px;
    color: #fff;
    background: #ffab18;
}
.list_inner_right{
	margin-left: 100px;
	padding-top: 6px;
	background: #fff;
}
.book_list_title{
	margin-bottom: 4px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.book_list_author{
	/* margin-top: 8px; */
    font-size:12px;
    color: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.book_list_summery{
	display: -webkit-box;
    margin: 8px 0 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.book_list_tab{
	margin-top: 10px;
    padding-top: 3px;
    overflow: hidden;
}
.tab_list{
	float: left;
    margin: -3px 7px 0 0;
    padding: 3px 6px 2px;
 	max-width: 100%;
    font-size: 12px;
    color: #53ac7d;
    border-radius: 3px;
    border: 1px solid #53ac7d;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.book_list{
	overflow: hidden;
}
.book_list .order{
	float: left;
    margin-top: 1px;
    font-size: 13px;
    color: rgba(237, 83, 15, 0.9);
}
.book_list_info{
	margin-left: 27px;
}
.book_list_info p{
	position: relative;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    background: #fff;
}
.book_list_info p span{
	position: absolute;
    margin: 1px 0 0 13px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    background: #fff;
}
.channal_footer_next{
	border-top: 1px solid #f0f0f0;
    overflow: hidden;
}
.channal_footer_next a:first-child{
	border-right: 1px solid #f0f0f0;
}
.channal_footer_next a{
	width: 50%;
	float: left;
	padding: 14px;
	text-decoration: none;
	font-size: 13px;
	color: rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
    text-align: center;
}
.show{
	display: block;
}
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
.get_more{
	height: 40px;
	line-height: 40px;
	text-align: center;
	position: relative;
	bottom:0px;
	margin: 0 auto;
	left: 47%;
	top: 5px;
	display: block;
}
</style>