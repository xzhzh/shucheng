<template>
	<div class="tab_wrap">
		<div class="channel_tab_header">
				<p class="channel_tab_header_title">男生最爱</p>
			</div>
		<div class="tab_wrap_box" v-if="nvsheng" >
				<ul class="tab_wrap_box_ul" >
					<li v-for= "item in nvsheng" @click="gotodetail(item)">
						<div class="list_li">
							<div class="list_inner_left">
								<img :src="item.cover" alt="">
								<p class="list_inner_finish">{{item.finish}}</p>
							</div>
							<div class="list_inner_right">
								<p class="book_list_title">{{item.title}}</p>
								<p class="book_list_author"><span>{{item.authors}}</span></p>
								<p class="book_list_summery">{{item.summary}}</p>
								<div class="book_list_tab" >
									<div class="tab_list" >{{item.tags[1]}}</div>
									<div class="tab_list" >{{item.word_count}}万</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
		</div>
		<div class="channal_footer_next">
		<a href="javascript:" @click="chang" class="chang">换一换</a>
		<a href="javascript:">男生频道</a>	
		</div>
	</div>
</template>
<script>
    
	export default{
		data(){
			return{
				nvsheng:null,
				tuijian_index:0,
				items:[]
			}
		},
		mounted(){
			this.nvsheng = this.items;
			var arr=JSON.parse(localStorage.items).items[4].data.data
			for(var i=0,len=arr.length;i<len;i+=5){
				 this.items.push(arr.slice(i,i+5));
			}
			for(var j=0; j<this.items.length; j++){
				for(var n=0; n<this.items[j].length; n++){
					this.items[j][n].word_count=this.items[j][n].word_count%1000
					if(this.items[j][n].finish==true){
						this.items[j][n].finish='完结'
					}else{
						this.items[j][n].finish='连载'
					}
			    }
			}
		/*	console.log(this.items)*/
			this.nvsheng = this.items[this.tuijian_index];

		},
		methods:{
			chang(){
				this.tuijian_index++;
				if(this.tuijian_index>this.items.length-1){
					this.tuijian_index=0
				}
				this.nvsheng = this.items[this.tuijian_index];
			},
			gotodetail(val){
				this.$router.push({path:'/detail',query:{
					'fiction_id':val.fiction_id,
					'title':val.title
				}})
			}
		}
	}
	
</script>


<style scoped>
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


</style>