<template>
	<div class="content">
		<div>
			<h3 class="content_title">{{items.t}}</h3>
			<p class="reader__content" v-for="list in items.p">
				{{list}}
			</p>
		</div>
	</div>
</template>
<script>
import Mint from 'mint-ui'
import axios from 'axios'
import { Base64 } from 'js-base64';
	export default{
		data(){
			return{
				items:[]
			}
		},
		mounted(){
		      Mint.Indicator.open({
		        text: '加载中...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		        method:'get',
		        url:"mfsv2/secure/fdsc3/60009/file?nonce=11a98e428137471982f808ff460d607d&token=NuXIzAh93h2w99ricPIxasqkJDsTb5PUOxsaK5z-GGBXQ_xl8Q2bHx0NDx2tShL-w2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=5Vn3R-Eov3VQAQ38ElVIOs7t5dM"

		    }).then((res)=>{
		      Mint.Indicator.close();
		      var base=res.data.toString().split("'")[1]
		      this.items=JSON.parse(Base64.decode(base))
		      console.log(JSON.parse(Base64.decode(base)))
		    })
		},
	}
</script>
<style scoped>
.content{
	height: 100%;
	background:#f7eee5;
	padding: 0 10px;
}
.content .content_title{
    margin-bottom: 20px;
    border-bottom: 1px solid #736357;
    font-size: 20px;
    line-height: 31px;
    color: #736357;
    letter-spacing: 2px;
}
.reader__content{
	text-indent: 2em;
}

	
</style>