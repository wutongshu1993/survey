<template>
  <transition name="modal-fade">
    <div :class="['modal', className]" v-show="show" :style="style">
      <div class="modal-mask" v-if="mask" ></div>
      <transition name="modal-fade">
        <div class="modal-dialog" v-show="show" :style="dialogStyle">
          <span class="modal-close" v-if="closeButton" @click="closeModal"></span>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default{
  name : 'modal',
  props : {
    show : {
      type : Boolean,
      required : true
    },
    width : {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 240
    },
    duration: {
      type: Number,
      default: 300
    },
    measure: {//单位
      type : String,
      default: 'px'
    },
   /* animation:{
      type: String, //动画
      default: 'zoom'
    },*/
    mask:{
      type: Boolean,
      default: true
    },
    closeButton:{
      type: Boolean,
      default: true
    } ,
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    style(){
      return `
      animationDuration: ${this.duration}ms;
      webkitAnimationDuration: ${this.duration}ms;
    `
    },
    dialogStyle(){
      return `
      width: ${this.width + this.measure};
      height: ${this.height+this.measure};
       ${this.style}
    `;
    }
  },
  methods: {
    closeModal : function () {
      this.show = false;
    }
  }
}
</script>

<style scoped>
  /*fade*/
  @-webkit-keyframes modal-fade-enter {
    from{
  opacity: 0;
  }
  }
  @keyframes modal-fade-enter {
    from{
      opacity: 0;
    }
  }
  .modal-fade-enter-active{
    -webkit-animation: modal-fade-enter both ease-in;
    animation: modal-fade-enter both ease-in;
  }

  @-webkit-keyframes  modal-fade-leave{
    to{
      opacity: 0;
    }
  }
  @keyframes  modal-fade-leave{
    to{
      opacity: 0;
    }
  }
  .modal-fade-leave-active{
    -webkit-animation: modal-fade-leave both ease-out;
    animation:  modal-fade-leave both ease-out;
  }

  .modal, .modal-mask{
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .modal{
    position: fixed;
  }
  .modal-mask{
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal-dialog{/*这样也能水平垂直居中*/
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 101;
    padding: 15px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);

  }
  .modal-close{
    position: absolute;
    cursor: pointer;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
  }
  .modal-close:after,
  .modal-close:before{
  position: absolute;
    content: '';
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    background:  #999;
    border-radius: 100%;
  }
  .modal-close:after{
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .modal-close:before{
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
