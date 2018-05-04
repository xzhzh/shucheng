<template>
  <div class="hello">
  <template>
  <div class="header-tab">
    <div class="header_tab">
      <a href="javascript:" :class="{'active':nowindex==1}" @click="tabclick(1)">书城</a>
      <a href="javascript:" :class="{'active':nowindex==2}" @click="tabclick(2)">书架</a>
      <span class="header_user"></span>
      <span class="header_check"></span>
    </div>
  </div>
</template>
  <router-view></router-view>
<!--  <Contain></Contain>
<Bookshelf></Bookshelf> -->
     
  </div>
</template>

<script>
import Mint from 'mint-ui'
import axios from 'axios'

/*import Contain from '@/components/Contain'
import Bookshelf from '@/components/Bookshelf'*/

export default {
name: 'Index',
data () {
  return {
      nowindex:1
  }
},
activated(){
      Mint.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      axios({
        method:'get',
        url:'/hs/v3/channel/418'
    }).then((res)=>{
      Mint.Indicator.close();
      var str = JSON.stringify(res.data)
      localStorage.setItem("items",str)
      console.log(res)
    })
},
methods:{
  tabclick(val){
      this.nowindex=val
      if(val==1){
        this.$router.push({path:'/contain'})
      }
      else{
        this.$router.push({path:'/bookshelf'})
      }
    }
  },
components:{
  /*Bookshelf,
  Contain,*/
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-tab{
  padding: 0px 90px;
    text-align: center;
    position: fixed;
    top:0;
    width: 100%;
    line-height: 44px;
    background: #efeff0;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    z-index: 5;
}
.header_tab a{
  width: 50%;
  float: left;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  text-align: center;
}
.header_check{
  position: absolute;
    left: 0px;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('/static/image/01.png') no-repeat center;
    background-size: 22px;
}
.header_user{
  position: absolute;
    right: 0px;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('/static/image/02.png') no-repeat center;
    background-size: 16px;
}
.header_tab .active{
  color:#ff6600 ;
}


</style>
