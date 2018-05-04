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
										<img src="/static/image/14.jpg!s" alt=""> 
										<!-- <p class="list_inner_finish">{{item.finish}}</p> -->
									</div>
									<div class="list_inner_right">
										<p class="book_list_title">东方化工</p>
										<p class="book_list_author"><span>德国</span></p>
										<p class="book_list_summery">变更法人和</p>
									</div>
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

	export default{
		data(){
			return{
				items:[]
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
		    	console.log(res)
		    	this.items=res.data.items
		        Mint.Indicator.close(); 
		     
		    })
	    },
	    methods:{
	    	back(){
	    		window.history.go(-1)
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

</style>