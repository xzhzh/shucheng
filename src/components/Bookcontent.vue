<template>
<div>
	<div class="reader__mask" @click="showtit"></div>
	<div class="reader__hd" @click="back()" v-show="show"><i class="fa fa-angle-left back"></i> 返回</div>
	<div class="reader__ft" v-show="show">
		<div class="reader__ft-bar">
			<a href="javascript:" class="reader__prev-chapter" @click="gobackpage()">上一章</a>
			<a href="javascript:" id="Tag__3">{{parseInt(this.chapter_id)+1}}/{{chapter_count}}</a>
			<a href="javascript:" class="reader__next-chapter" @click="next()">下一章</a>
		</div>
		<a href="javascript:" @click="gotocate(fiction_id,chapter_id,chapter_count)">
			<i class="fa  fa-bars"></i>
			<p>目录</p>
		</a>
		<a href="javascript:" @click="fontshow()" >
		   <i class="fa  fa-font"></i>
		   <p>字体</p>
		</a>
		<a href="javascript:" @click="nigth()" >
			<i class="fa fa-moon-o" ></i>
			<p>{{ninght}}</p>
		</a>
		<a href="javascript:" >
			<i class="fa fa-cloud-download"></i>
			<p>下载</p>
		</a>
	</div>
	<div class="reader__font" v-show="show && fontShow">
		<div class="reader__font-size">
			<span>字号</span>
			<a href="javascript:" class="reader__font-large" @click="bigfont()">大</a>
			<a href="javascript:" class="reader__font-small" @click="redufont()">小</a>
		</div>
		<div class="reader__font-bg">
			<span>背景</span>
			<a href="javascript:" :class="{active:index==active}" :style="{backgroundColor:item}"   @click="readerbg(item,index)" v-for="(item,index) in bg_arr"></a>

		</div>
	</div>


	<div :class="{'content': true, 'ningth': ningth }"  :style="{backgroundColor:bg_arr[this.active_readerBg_index]}" >
		<div v-for="item in items" class="mar_bo">
			<h3 class="content_title">{{item.t}}</h3>
			<p :style="{'font-size':readerFontSize+'px'}" class="reader__content" v-for="list in item.p">
				{{list}}
			</p>
		</div>
		<mt-spinner v-show="items.length" class="get_more" color="#2222" type="fading-circle">加载更多</mt-spinner>
	</div>

</div>
	
</template>
<script>
import Vue from 'vue'
import Mint from 'mint-ui'
import axios from 'axios'
import { Base64 } from 'js-base64';

	export default{
		data(){
			return{
				items:[],
				chapter_count:this.$route.query.chapter_count,
				fetching:false,
				fiction_id:this.$route.query.fiction_id,
				chapter_id:0,
				fetch:false,
				readerFontSize:15,
				readerBg:1,
				active:0,
				bg_arr:['#f7eee5','#e9dfc7','#a4a4a4','#cdefce','pink'],
				active_readerBg_index:0,
				ningth:false,
				ninght:'夜晚',
				show:false,
				fontShow:false,

			}
		},
		mounted(){
			 if(localStorage.readerFontSize){
			 	this.readerFontSize=localStorage.readerFontSize
			 }

			 if(localStorage.readerBg){
			 	this.readerBg=localStorage.readerBg
			 }
			/*console.log(this.chapter_count)*/
		      Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });

		      if(localStorage[String(this.fiction_id)]){
		      		this.chapter_id=localStorage[(this.fiction_id)];
		      }
		      axios({
		        method:'get',
		        url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'&format=jsonp'

		    }).then((res)=>{
		    this.fetch=true;
		      var url=res.data.url.indexOf('/mfsv2')
		      var urel=res.data.url.substring(url)
		      Mint.Indicator.close();

		      var  self=this
		      var fiction_id=this.fiction_id
				$(window).scroll(function(){
				　　var scrollTop = $(this).scrollTop();
				　　var scrollHeight = $(document).height();
				　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight+20>= scrollHeight){
						if(!self.fetching){
							/*console.log(self.chapter_id)*/
							self.chapter_id=parseInt(self.chapter_id)+1
							localStorage.setItem(fiction_id, self.chapter_id);

						}　
			　　    }
			   });

		    axios({
		        method:'get',
		        url:urel
		    }).then((res)=>{
		      var base=res.data.toString().split("'")[1]
		      this.items.push(JSON.parse(Base64.decode(base)))
		       Mint.Indicator.close();
		     /* console.log(JSON.parse(Base64.decode(base)))*/
		      
		    })

		     
		    })
		},
		watch:{
				"chapter_id"(){
					if(this.fetch==true){
						this.fetching=true;
					axios({
				        method:'get',
				         url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'&format=jsonp'
				    }).then((res)=>{
				      var url=res.data.url.indexOf('/mfsv2')
				      var urel=res.data.url.substring(url)
				      this.fetching=false;
				      Mint.Indicator.close();
				    axios({
				        method:'get',
				        url:urel
				    }).then((res)=>{
				    	this.fetch=true;
				      var base=res.data.toString().split("'")[1]
				      var datall=JSON.parse(Base64.decode(base))
				      this.items.push(datall)
				    })

			       })
				}
			},
			
			
		},
		methods:{
			back(){
				window.history.go(-1)
			},
			gotocate(val1,val2,val3){
				this.$router.push({
					path:"/catelog",
					query:{
						'fiction_id':val1,
						'chapter_id':val2,
						'chapter_count':val3
					}
				})
			},
			gobackpage(){
				Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
				/*console.log(this.chapter_id)*/
				if(localStorage[(this.fiction_id)]<=0){
					localStorage[(this.fiction_id)]=0
					 Mint.Indicator.close();
					return
				}else{
					localStorage[(this.fiction_id)]=parseInt(localStorage[(this.fiction_id)])-1
					this.chapter_id=parseInt(localStorage[(this.fiction_id)]);
					this.items=[];
				}
				
			},
			next(){
					Mint.Indicator.open({
				        text: '加载中...',
				        spinnerType: 'fading-circle'
				    });
					  
				    Mint.Indicator.close();
					if(localStorage[(this.fiction_id)]==this.chapter_count){
						alert("已经是最后一页了")
					}else{
					   localStorage[(this.fiction_id)]=parseInt(localStorage[(this.fiction_id)])+1
					    this.chapter_id=parseInt(localStorage[(this.fiction_id)]);
					    Mint.Indicator.close();
					    this.items=[]
				    }
					
			},
			bigfont(){
				if(!localStorage.readerFontSize){
					localStorage.setItem('readerFontSize',16)
				}else{
					if(localStorage.readerFontSize>=21){
						return
					}else{
					 localStorage.readerFontSize=parseInt(localStorage.readerFontSize)+1
					 this.readerFontSize=localStorage.readerFontSize;
					}
				}
			},
			redufont(){
				if(!localStorage.readerFontSize){
					localStorage.setItem('readerFontSize',14)
				}else{
					if(localStorage.readerFontSize<=12){
						return
					}else{
					 localStorage.readerFontSize=parseInt(localStorage.readerFontSize)-1	
					 this.readerFontSize=localStorage.readerFontSize;
					}
				}
			},
			readerbg(val,index){
				localStorage.readerBg=index
				 this.active=index;
				this.active_readerBg_index = index
			},
			nigth(){
				this.ningth=!this.ningth
				if(this.ningth){
					this.ninght='白天'
				}else{
					this.ninght='夜晚'
				}
				
			},
			showtit(){
				this.show=!this.show
			},
			fontshow(){
				this.fontShow=!this.fontShow
			}
		}
	}
</script>
<style scoped>
.content{
	background:#f7eee5;
	padding: 0 10px;
	width: 100%;
	font-size: 15px;
	overflow: hidden;
	box-sizing: border-box;
}
.content .content_title{
    margin-bottom: 20px;
    border-bottom: 1px solid #736357;
    font-size: 20px;
    line-height: 31px;
    color: #736357;
    letter-spacing: 2px;
}
.content .reader__content{
	text-indent: 2em;
}
.content .mar_bo{
	padding-bottom: 20px;
}
.content .get_more{
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
.reader__hd, .reader__ft, .reader__mask, .reader__font {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2;
}
.reader__mask {
	height: 130px; 
	background: pink;
    top: 28%;
    bottom: 0;
    background: none;
}
.reader__hd {
    top: 0;
    padding-left: 12px;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    color: #d5d5d6;
}
.reader__hd i{
	font-size: 25px;
	position: relative;
	top: 3px;
}
.reader__ft {
    bottom: 0;
}
.reader__font {
	display: block;
    bottom: 70px;
    box-sizing: border-box;
    height: 135px;
}
.reader__ft-bar {
    overflow: hidden;
    border-bottom: 1px solid #333;
}

.reader__ft a {
    float: left;
    width: 25%;
    height: 70px;
    font-size: 10px;
    text-decoration: none;
    line-height: 21px;
    color: #fff;
    text-align: center;
}
.reader__ft-bar a {
    float: left;
    text-decoration: none;
    display: block;
    width: 33.33%;
    font-size: 13px;
    line-height: 48px;
    height: 48px;
    color: #fff;
    text-align: center;
}
.reader__ft a i{
	font-size: 20px;
	margin-top: 13px;
}
.reader__font span{
	margin: 0 20px 0 10px;
	font-size: 14px;
	line-height: 22px;
	color: #fff;
}
.reader__font-size a {
    display: inline-block;
    margin: 0 5px;
    border: 1px solid #8c8c8c;
    border-radius: 16px;
    padding: 5px 40px;
    text-decoration: none;
    font-size: 13px;
    line-height: 16px;
    color: #fff;
}
.reader__font > div{
	margin-top: 15px;
	padding: 5px 10px;
}
.reader__font-bg a {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #fff;
}
.reader__font-bg a[data-bg="1"] {
    background: #f7eee5;
}
.reader__font-bg a[data-bg="2"] {
    background: #e9dfc7;
}
.reader__font-bg a[data-bg="3"] {
    background: #a4a4a4;
}
.reader__font-bg a[data-bg="4"] {
    background: #cdefce;
}
.reader__font-bg a[data-bg="5"] {
    background: #283548;
}
.reader__font-bg a[data-bg="6"] {
    background: #0f1410;
}
.active{
	border: 1px solid red;
}
.ningth{
    color: #4e534f;
    background: #0f1410 !important;
}


	
</style>