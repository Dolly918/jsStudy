<template>
  <div class="hello-world">
    <!-- <h3>https://github.com/surmon-china/vue-awesome-swiper</h3> -->
    <!-- <h3>http://www.swiper.com.cn/api/index2.html</h3> -->
    <!-- http://www.swiper.com.cn/api/parameters/21.html -->
    <transition name="fade">
      <swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
          <!-- 第一页 -->
          <swiper-slide class="swiper-slide1">
            <div class="page">
              <h3>第一页</h3>
            </div>
          </swiper-slide>
          <!-- 第二页 -->
          <swiper-slide class="swiper-slide2">
            <div class="page">
              <h3>第二页</h3>
            </div>
          </swiper-slide>
          <!-- 第三页 -->
          <swiper-slide class="swiper-slide3">
            <div class="page">
              <h3>第三页</h3>
            </div>
          </swiper-slide>
      </swiper>
    </transition>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HelloWorld',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        slidesPerView: 1,
        mousewheel: false,
        mousewheelControl: false,
        height: window.innerHeight, // 高度设置，占满设备高度
        resistanceRatio: 0,
        observeParents: true
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
  .swiper-wrapper{
    height: 100px;
  }
  .swiper-slide1{
    background: skyblue;
  }
  .swiper-slide2{
    background: yellowgreen;
  }
  .swiper-slide3{
    background: blanchedalmond;
  }
</style>
