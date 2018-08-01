<template>
  <div class="comp-index">
    
  </div>
</template>

<script type="text/ecmascript-6">
  import {baiduTranlate} from '../../util/getBaiduTranslate'

  export default {
    name: '',
    data() {
      return {
        query: 'plastic'
      }
    },
    methods: {
      toGetTranlate() {
        let {query} = this
        baiduTranlate({query}).then(res => {
          console.log(res)
          let a = {
            'from': 'en',
            'to': 'zh',
            'trans_result': [{'src': 'plastic', 'dst': '\u5851\u6599'}]
          }
          if (a) {
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
