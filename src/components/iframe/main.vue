<template>
  <div class="layout" style="height: 100%">
    <iframe src="database.html" frameborder="0" id="frame" width="100%" height="100%" ></iframe>
  </div>
</template>
<script>



  export default {
    name: 'watch',
    components: {


    },
    data () {
      return {

      }
    },
    computed: {





    },
    methods: {

      handleCollapsedChange (state) {

      },



    },
    watch: {
      '$route' (newRoute) {

      }
    },
    mounted () {
      /**
       * @description 初始化设置面包屑导航和标签导航
       */
      this.$nextTick(function () {

      })

    }
  }
</script>
<style>

  .input-group .ivu-input.ivu-input-small {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    outline: none;
  }
</style>


<style scoped>
  .empty-page {
    height: 100%;
    text-align: center;
  }
  .pr {
    position: relative;
  }
  .pt10 {
    padding-top: 10px!important;
  }
  .empty-page .ds-empty-img {
    margin-top: 42px;
    background: url('../../assets/images/empty-top.png') center no-repeat;
    width: 100%;
    min-height: 281px;
    height: 50%;
  }
  .btn-add {
    z-index: 99;
    width: 120px;
    height: 40px;
    color: #fff;
    text-align: center;
    left: calc((100% - 120px)/2);
    background-color: #4D83E5;
    display: inline-block;
  }
  .font-size-14 {
    font-size: 14px;
  }

  .pt10 {
    padding-top: 10px;
  }
  .mt24 {
    margin-top: 24px!important;
  }
  .cursor-pointer {
    cursor: pointer;
  }

</style>

