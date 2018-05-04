<template>
	<div class="channel_tab">
		<div class="channel_tab_header">
			<p class="channel_tab_header_title">{{tuijian.ad_name}}<span>推</span></p>
			<div class="tab">
				<a href="javascript:" :class="{active:1==nowIndex}" @click="toggle(1)">男</a>
				<a href="javascript:" :class="{active:2==nowIndex}" @click="toggle(2)">女</a>
			</div>
		</div>
		<div class="tab__bd">
			<recboy v-show="nowIndex==1"></recboy>
			<regirl v-show="nowIndex==2"></regirl>	
		</div>
		<div class="tab__bd">
			<girllove></girllove>
		</div>
		<div class="tab__bd">
			<Boylove></Boylove>
		</div>
		<div class="tab__bd">
			<Free></Free>
		</div>
		<div class="tab__bd">
			<Topic></Topic>
		</div>
		
			<ListMore></ListMore>
		
	</div>
</template>
<script>
import Mint from 'mint-ui';
import axios from 'axios'
import recboy from '@/components/Recboy'
import regirl from '@/components/Regirl'
import girllove from '@/components/Girlove'
import Boylove from '@/components/Boylove'
import Free from '@/components/Free'
import Topic from '@/components/Topic'
import ListMore from '@/components/ListMore' 
export default{
data(){
	return {
		nowIndex:'1',
		tuijian:JSON.parse(localStorage.items).items[2]
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
		/*console.log(res.data.items[2])*/
		
	})
},
methods:{
	toggle(index){
		this.nowIndex=index;
	}
},

components:{
	recboy,
	regirl,
	girllove,
	Boylove,
	Free,
	Topic,
	ListMore
 }
}
</script>
<style scoped>

.channel_tab{
	overflow: hidden;
	position: relative;
    background: #fff;
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
.channel_tab_header_title span{
	position: absolute;
    margin: -1px 0 0 5px;
    padding: 3px 5px 3px 5px;
    font-size: 12px;
    color: #fff;
    background: #53ac7d;
    border-radius: 1px;
}
.tab{
	position: absolute;
    top: 9px;
    right: 13px;
}
.tab a{
	position: relative;
    padding: 16px 5px;
    font-size: 12px;
    color: #999;
    text-decoration: none;
	}  
.tab__bd{
	overflow: hidden;
	border-bottom: 10px solid #f5f5f5;
}  
.tab .active{
	color: #528ae8 ;
}
</style>
