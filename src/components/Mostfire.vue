<template>
	<div class="mosefire">
		<section class="fire">
			<div class="fireback" @click="back()"> < 本周最火 </div>
			<img class="right_icom" src="/static/image/10.png" alt="" @click="gotohome()">
		</section>
			<div class="tab_wrap">
				<div class="tab_wrap_box"  >
						<ul class="tab_wrap_box_ul">
							<li v-for= "item in items" @click="gotodetail(item)">
								<div class="list_li">
									<div class="list_inner_left">
										<img :src="item.cover" alt="">
										<!-- <p class="list_inner_finish">{{item.finish}}</p> -->
									</div>
									<div class="list_inner_right">
										<p class="book_list_title">{{item.title}}</p>
										<p class="book_list_author"><span>{{item.authors}}</span></p>
										<p class="book_list_summery">{{item.summary}}</p>
									</div>
								</div>
							</li>
						</ul>
				</div>
				<mt-spinner class="get_more" color="#26a2ff" type="fading-circle" v-show='showmore==1'>加载更多</mt-spinner>
				<div class="mort_style" v-show="showmore==0">更多主题</div>
	    </div>
	</div>
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'
	export default{
		data(){
			return{
				items:[
				  {cover:'/static/image/14.jpg!s',finish:'完结',title:'极品逍遥大少爷',authors:'陈东',summary:'最新: 第4040章：新的征程（大结局）'},
				],
				data:this.$store.state.fire,
				fetching:false,
				showmore:1
			}
		},
		mounted(){
		      Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		        method:'get',
		        url:'store/v0/fiction/list/11059?start='+'this.data'+'&count=10'
		    }).then((res)=>{
		    	console.log(res)
		    	this.items=res.data.items
		        Mint.Indicator.close(); 

		        var  self=this
				$(window).scroll(function(){
				　　var scrollTop = $(this).scrollTop();
				　　var scrollHeight = $(document).height();
				　　var windowHeight = $(this).height();
			　　  if(scrollTop + windowHeight>= scrollHeight){
						if(!self.fetching){
							if(self.data>=10){
								self.data=10
							}else{
								self.data=self.data+10
							}
						}else{
							return
						}
			　　}
			   });
		     
		    })
		        
		},
		methods:{
				back(){
					window.history.go(-1)
				},
				gotohome(){
					this.$router.push({path:'/'})
				},
				gotodetail(val){
					this.$router.push({path:'/detail',query:{
						'fiction_id':val.fiction_id,
						'title':val.title
					}})
				}
				
		},
		watch:{
			'data'(){
				  this.fetching=true;
					if(this.data==10){
						axios({
					        method:'get',
					        url:'store/v0/fiction/list/11059?start='+'this.data'+'& count=10'
					    }).then((res)=>{
					    	this.fetching=false;
					    	this.items=res.data.items
					    	this.showmore=0;
					     })
					}
					
				}
			
		}

	}
</script>
<style scoped>
.mosefire{
	overflow: hidden;
	/* padding-top:40px; */
}

.fire{
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
.mosefire  .fireback{
	float: left;
}
.right_icom{
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
.mort_style{
	height: 40px;
	line-height: 40px;
	text-align: center;
	position: relative;
	bottom:0px;
	margin: 0 auto;
	display: block;
}
</style>