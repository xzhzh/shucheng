<template>
	<div class="detail" >
		<section class="fire">
			<div class="fireback" @click="back()" > < {{this.$route.query.title}} </div>
			<img class="right_icom" src="/static/image/10.png" alt="" @click="gotohome()">
		</section>
		<div class="tab_wrap">
				<div class="tab_wrap_box"  >
						<ul class="tab_wrap_box_ul" >
							<li >
								<div class="list_li">
									<div class="list_inner_left">
										<img :src="items.cover" alt="">
										<!-- <p class="list_inner_finish">{{item.finish}}</p> -->
									</div>
									<div class="list_inner_right">
										<p class="book_list_title">{{this.$route.query.title}}</p>
										<p class="book_list_author"><span>{{items.authors}}</span></p>
										<div class="star">
											<div class="starbox">

											</div>
											<span class="ping">{{items.score_count}}个评价</span>
										</div>
										<p class="book_list_price">价格:{{items.price}}书币/一千字</p>
										<p class="book_list_price">字数：{{items.word_count}}字</p>
									</div>
								</div>
								<ul class="read">
									<li @click="gotocontent(items)">开始阅读</li>
									<li>下载</li>
								</ul>
								<div class="book_list_amri">
									{{items.content}}
								</div>
								<p class="update">最新：{{items.latest}} 更新于 {{items.updated}}</p>
								<div class="type_tag">
									<p class="type_tag_title">类别标签</p>
									<span v-for="tab in items.tags">{{tab}}</span>
									
								</div>
								<div class="elsebook">
									<p class="elsebook_title">作者其他图书</p>
									<ul>
										<li v-for="val in author_book" @click="gotodetail(val)"> 
										<img :src="val.cover" alt="">
										   <p class="elsebook_comtnt">{{val.title}}</p>
										</li>
										
									</ul>
								</div>
								<div class="elsebook">
									<p class="elsebook_title">图书信息</p>
									<p class="bookdetail">版权：{{items.rights}}
									</p>
								</div>
							</li>
						</ul>

				</div>
				
	    </div>
	</div>
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'
import moment from 'moment'

	export default{
		data(){
			return{
				items:{},
				author_book:[]

			}
			
		},
	mounted(){
		console.log(this.$route.query.fiction_id)
		  var id=this.$route.query.fiction_id
		 Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		        method:'get',
		        url:'/hs/v0/android/fiction/book/'+id
		    }).then((res)=>{
		    	/*console.log(res)*/
		    	this.items=res.data.item
		    	this.author_book=res.data.author_books
		        Mint.Indicator.close();
		       	this.items.word_count=Math.floor(this.items.word_count/10000)
		       	this.items.updated=moment(this.items.updated*1000).format('YYYY-MM-DD HH:mm:ss')
		       /*	console.log(this.items.score)*/
		       	var score=this.items.score
		       	if(score<2){
		       		$('.starbox').css('background-position', '0 0');
		       	}
		       	else if(score>=2&&score<4){
		       		$('.starbox').css('background-position', '0 -34px');
		       	}
		       	else if(score>=4&&score<6){
		       		$('.starbox').css('background-position', '0 -64px');
		       	}
		       	else if(score>=6&&score<8){
		       		$('.starbox').css('background-position', '0 -98px');
		       	}
		       	else if(score>=8&&score<9.5){
		       		$('.starbox').css('background-position', '0 -128px');
		       	}
		       	else{
		       		$('.starbox').css('background-position', '0 -163px');
		       	}
		       
		    })
	    },
	    methods:{
	    	back(){
	    		window.history.go(-1)
	    	},
	    	gotohome(){
	    		this.$router.push({
	    			path:"/"
	    		})
	    	},
	    	gotocontent(val){
	    		this.$router.push({path:'/content',query:{
	    			'fiction_id':val.fiction_id,
	    		}})
	    	},
	    	gotodetail(val){
				this.$router.push({path:'/detail',query:{
					'fiction_id':val.book_id,
					'title':val.title
				}})
			}
	    }

	}
</script>
<style>
.detail{
	width: 100%;
	padding-top: 40px;
}
.detail .fire{
	width: 100%;
	position: fixed;
	top: 0;
	overflow: hidden;
	line-height: 30px;
	height: 40px;
	background: #efeff0;
	padding: 5px 10px;
	z-index: 2;
	box-sizing: border-box;
}
.detail .fireback{
	float:left;
}
.detail .right_icom{
	margin-top: 5px;
	float: right;
}
.tab_wrap{
	float: left;
    position: relative;
    width: 100%;
    margin-right: -100%;
    z-index: 1;
}	
.tab_wrap_box{

	/*display: none;*/
}
.tab_wrap_box_ul{
	padding: 0 13px;
}
.tab_wrap_box_ul li{
	padding: 17px 0;
   /*  border-bottom: 1px solid #f0f0f0; */
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
    font-size:12px;
    color: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.star{
	margin-top: 3px;
}
.starbox{
	float: left;
	height: 16px;
    width: 80px;
    margin: 0 5px 0 0;
    background: url("/static/image/start.png");
    background-size: 80px;
     background-position: 0 -163px; 
}
.starbox .star1{
  width: 12px;
}
.ping{
	font-size: 12px;
	margin-left:5px;
	color: #aaa;
}
.book_list_price{
	font-size: 12px;
	color: #444;
	margin-top: 3px;
}

.read{
	display: flex;
}
.read li{
	flex: 1;
	margin: 3px 5px;
	text-align: center;
	border: 1px solid #ccc;
	padding: 0;
	margin-top: 15px;
	line-height: 35px;
}
.read li:nth-of-type(1){
	color: #fff;
	background: #f35d02;
	border: 1px solid #f35d02;
}
.book_list_amri{
	margin-top: 15px;
	font-size: 14px;
	color:#585858 ;
	line-height: 25px;
	display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
.update{
	font-size: 14px;
	color: #8d8d8d;
	padding:14px 10px;
	border-bottom: 1px solid #ccc ;
}
.type_tag{
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
}
.type_tag_title{
	font-size: 16px;
	color: #8d8d8d;
	margin-top: 10px;
	margin-bottom: 10px;
}
.type_tag span{
	border: 1px solid #ccc;
	padding: 3px 8px ;
	margin: 5px 3px;
	display: inline-block;
	background: #fcedda;
	border-radius: 4px;
}
.elsebook {
	padding: 15px 0;
}
.elsebook_title{
	font-size: 16px;
	color: #8d8d8d;
	margin-top: 10px;
	margin-bottom: 10px;
}
.elsebook ul{
	width: 100%;
	display: flex;
}
.elsebook ul li{
	width:33.333%;
	margin: 5px;
	/* flex: 1; */
}
.elsebook ul li img{
	width:100%;
}
.bookdetail{
	font-size: 14px;
	color: #aaa;
}
.elsebook_comtnt{
	color: #333;
}
</style>