<template>
<div class="cate">
	<section class="catelog">
		<div class="fireback" @click="back()" > < 目录 </div>
		<img class="right_icom" src="/static/image/10.png" alt="" @click="gotohome()">
	</section>
	<ul class="cate_box">
		<li class="cate_item" v-for="(item,index) in items" @click="path(item,index)">
			<p>{{item.title}}</p>
			<span class=".active">{{item.free}}</span>
			
		</li>
	</ul>
	
</div>
	
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'

	export default{
		data(){
			return{
				items:[],
				fiction_id:this.$route.query.fiction_id,
				chapter_id:this.$route.query.chapter_id,
				chapter_count:this.$route.query.chapter_count,
			}
		},
		mounted(){
			axios({
		        method:'get',
		        url:'/store/v0/fiction/detail/'+this.fiction_id+'?chapter_id='+0
		    }).then((res)=>{
		    	 Mint.Indicator.close();
		    	/* console.log(res.data.item.toc)*/
		    	this.items=res.data.item.toc
		    	for(var i=0; i<this.items.length;i++){
		    		if(this.items[i].free){
		    			this.items[i].free="免费"
		    		}
		    		else{
		    			this.items[i].free=""
		    		}
		    	
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
			path(val,index){
				localStorage[(this.fiction_id)]=index
				this.$router.push({
					path:"/content",
					query:{
						'fiction_id':this.fiction_id,
						'chapter_id':index,
						'chapter_count':this.chapter_count
					}
				})
			}
		}
	}
</script>
<style>
.cate{
    width: 100%;
   padding-top: 40px;
}
.cate .catelog{
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
.cate .fireback{
	float:left;
}
.cate .right_icom{
	margin-top: 5px;
	float: right;
}
.cate_item{
	padding: 0 12px;
	border-bottom: 1px solid #eee;
	line-height: 38px;
	overflow: hidden;
}
.cate_item p{
	float: left;
	font-size: 14px;
	color: #555;
}
.cate_item span{
	float: right;
	font-size: 14px;
	color: #555;
}
.cate_item .active{
  	color: #F35D02;
  }
</style>