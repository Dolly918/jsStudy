<template>
  <div class="gjf" id="dropArea" @mousemove="move($event)">
    <div v-for="(list, i) in lists" :key="i" class="item" @mousedown="down($event)" @mouseup="up($event)" >
      {{list}}
		</div>
  </div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';
import {eventUtil} from '../assets/js/eventUtil'
function getPos(ev){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
  var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
  let x = ev.clientX + scrollLeft-200;
  let y = ev.clientY + scrollTop-32;
  /*  if(x < 0){
        x = 0;
      }
  */	
  return {x , y};
}
export default {
  name: 'Gjf',
  data () {
    return {
      isDown: false,
      downTarget: null,
      oBox: null,
      initX: 0,
      initY: 0,
      lists: ['内容1','内容2','内容3','内容4','内容5']
    }
  },
  mounted(){
    let dropArea = document.getElementById('dropArea');
  },
  methods: {
    down: function($event){
      eventUtil.preventDefault($event);
      console.log($event);
      this.isDown = true;
      var pos=getPos($event);
      this.downTarget = $event.target;
      this.initX = $event.clientX;
      this.initY = $event.clientY;
      this.downTarget.style.position = 'absolute';
      this.downTarget.style.left = pos.x+'px';
		  this.downTarget.style.top = pos.y+'px';

      /* this.oBox=document.createElement('div');
      // oBox.className='box';
      this.oBox.style='border:1px dashed black;position:absolute;width: 400px;height: 64px;';
      this.oBox.style.left= this.downTarget.offsetLeft-1+'px';
      this.oBox.style.top= this.downTarget.offsetTop-1+'px';
      document.body.appendChild(this.oBox); */
    },
    move: function($event){
      eventUtil.preventDefault($event);
      if(this.isDown){
        var pos=getPos($event);
        // this.downTarget.style.position = 'absolute';
        this.downTarget.style.left = pos.x+'px';
		    this.downTarget.style.top = pos.y+'px';
      }

    },
    up: function(){
      this.isDown = false;
      // this.downTarget.style.position = 'absolute';
      // this.downTarget.style.left = this.oBox.offsetLeft+'px';
		  // this.downTarget.style.top = this.oBox.offsetTop+'px';
      // this.oBox = null;
      // this.downTarget = null;
      // document.body.removeChild(this.oBox);
    }
  }
}
</script>

<style scoped>
 .gjf{
   width: 500px;
   padding: 20px 50px;
   margin: 0 auto;
   background: #eee;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
 }
 .item{
   /* position: absolute; */
   width: 400px;
   height: 64px;
   padding: 20px 0;
   background: #eafff5;
   border: 1px solid #aec5ae;
   margin-bottom: 10px;
    -webkit-box-sizing: border-box;
   box-sizing: border-box;
 }
 .box {
   border:1px dashed black; 
   position:absolute;
   width: 400px;
   height: 64px;
  }
 .item:hover{
   cursor: move;
 }
</style>
