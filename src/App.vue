<template>
  <div id="app">
  <transition :name="transitionName"> 
    <router-view class="child-view"/>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-left' 
       }
   },
   watch:{
    "$route"(to,from){
      if(to.path == '/'){  
        this.transitionName = 'slide-right';  
      }else{  
        this.transitionName = 'slide-left';  
      }  
     }
     
   }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow: hidden; */
}
html,body, #app{
  height: 100%;
  width: 100%;
}
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1); 

}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(200px, 0);  
  transform: translate(200px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-200px, 0);  
  transform: translate(-200px, 0);  
}  

</style>
