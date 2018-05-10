<template>
	<div class="content">
		<div v-for="item in items" class="mar_bo">
			<h3 class="content_title">{{item.t}}</h3>
			<p class="reader__content" v-for="list in item.p">
				{{list}}
			</p>
		</div>
		<mt-spinner v-show="items.length" class="get_more" color="#2222" type="fading-circle">加载更多</mt-spinner>
	</div>
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'
import { Base64 } from 'js-base64';
	export default{
		data(){
			return{
				items:[],
				fic_id:localStorage.page==0?'localStorage.page':'0',
				fetching:false,

			}
		},
		mounted(){
		      Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
		    
		      axios({
		        method:'get',
		        url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.$route.query.fiction_id+'&chapter_id='+this.fic_id+'&format=jsonp'

		    }).then((res)=>{
		      var url=res.data.url.indexOf('/mfsv2')
		      var urel=res.data.url.substring(url)
		      Mint.Indicator.close();

		      var  self=this
				$(window).scroll(function(){
				　　var scrollTop = $(this).scrollTop();
				　　var scrollHeight = $(document).height();
				　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight+20>= scrollHeight){
						if(!self.fetching){
							console.log(self.fic_id)
							self.fic_id=parseInt(self.fic_id)+1
							if(typeof(localStorage.page)!=='number'){
							}
							localStorage.page=parseInt(localStorage.page)+1
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
			"fic_id"(){
				this.fetching=true;
			axios({
		        method:'get',
		        url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.$route.query.fiction_id+'&chapter_id='+this.fic_id+'&format=jsonp'
		    }).then((res)=>{
		      var url=res.data.url.indexOf('/mfsv2')
		      var urel=res.data.url.substring(url)
		      this.fetching=false;
		      Mint.Indicator.close();
		    axios({
		        method:'get',
		        url:urel
		    }).then((res)=>{
		   /*  console.log(res.data)*/
		      var base=res.data.toString().split("'")[1]
		      var datall=JSON.parse(Base64.decode(base))
		      this.items.push(datall)
		     /*  console.log(JSON.parse(Base64.decode(base)))*/
		    
		      
		    })


		     
		    })
			}
		}
	}
</script>
<style scoped>
.content{
	height: 100%;
	background:#f7eee5;
	padding: 0 10px;
	width: 100%;
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

	
</style>