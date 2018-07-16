<template>
  <div class="comp-newconcept-menu">
    <el-col>
      <h2 style="text-align: center">
        <el-radio-group
          style="margin:10px auto;"
          v-model="selfisCollapse"
          @change="changeCollapse">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
      </h2>
      <el-menu
        :collapse="isCollapse"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item
          v-for="item in searchAlbum.albums"
          :key="item.id"
          :index="item.id.toString()"
          @click="menuItem(item)"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="switch-warp">
      <el-switch
        v-model="selfSwitch"
        active-text="show"
        @change="changeSwitch"
        inactive-text="hide">
      </el-switch>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'

  export default {
    name: 'newconcept-menu',
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selfisCollapse: false,
        selfSwitch: false
      }
    },
    computed: {
      ...mapState({
        searchAlbum: state => state.nce.searchAlbum,
        activeAlbum: state => state.nce.activeAlbum,
        transitionSwitch: state => state.nce.transitionSwitch
      }),
      defaultActive() {
        return this.activeAlbum.id ? this.activeAlbum.id.toString() : this.$route.params.albumsId
      }
    },
    created() {
      this.selfisCollapse = this.isCollapse
    },
    methods: {
      changeCollapse() {
        this.$emit('changeCollagse', this.selfisCollapse)
      },
      menuItem(item) {
        this.$store.commit('nce/ACTIVE_ALBUM', item)
      },
      changeSwitch(isShow) {
        this.$store.commit('nce/CHANGE_TRAN_SWITCH', isShow)
      }
    },
    watch: {
      activeAlbum(val) {
        this.$store.dispatch('nce/_getAlbumer', val.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .switch-warp {
    text-align: center;
    margin: 14px auto;
    float: left;
    width: 100%;
  }
</style>
