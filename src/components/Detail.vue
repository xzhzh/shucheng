<template>
	<div class="detail" >
		<section class="fire">
			<div class="fireback" @click="back()" > <span><</span>dfhrtfh  </div>
			<img class="right_icom" src="/static/image/10.png" alt="" @click="gotohome()">
		</section>
		<div class="tab_wrap">
				<div class="tab_wrap_box"  >
						<ul class="tab_wrap_box_ul" >
							<li v-for= "item in items">
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
	width: 100px;
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
</style>