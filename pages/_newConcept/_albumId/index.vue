<template>
  <div class="comp-new-concept">
    <div :class="['bookmenu-warp',isCollapse?'mini':'']">
      <new-concept-menu
        :isCollapse="isCollapse"
        @changeCollagse="changeisCollapse"
      />
    </div>
    <div :class="['content-warp',isCollapse?'mini':'']">
      <div class="topinfo">
        <img width="480">
        <div class="cont">
          <h2>
            {{albuminfo.name}} {{albuminfo.type}}
          </h2>
          <p>歌手：{{albuminfo.artist?albuminfo.artist.name:''}}</p>
          <p>发行时间：{{albuminfo.publishTime}}</p>
          <p>发行公司： {{albuminfo.company}}</p>
          <p>
            <audio :src="playSong.url" preload="auto" controls></audio>
          </p>
        </div>
      </div>
      <div class="song-list-warp">
        <h2>列表共{{albuminfo.size}}首歌</h2>
        <el-table
          size="mini"
          height="200"
          :data="songsList"
          @row-click="rowClick"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="id"
            label="Id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="歌曲名称">
          </el-table-column>
          <el-table-column
            prop="dt"
            label="时长">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">
                {{(scope.row.dt / 1000).toFixed(0)}} s
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="live-lesson"
      >
        <el-tab-pane label="chinese" name="chinese">
          <div>
            <ul class="old-text">
              <li v-for="(item,idx) in zh">
                <p>{{item}}</p>
                <el-input
                  :key="`${mainbody.id}-${idx}`"
                  size="mini"/>
              </li>
            </ul>
            <ul class="old-text" v-show="transitionSwitch">
              <li v-for="item in en">
                <p>{{item}}</p>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="english" name="english">
          <ul>
            <li v-for="item in en">
              <p>{{item}}</p>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import newConceptMenu from '~/components/layout/newconcept-menu'

  export default {
    name: 'new-concept',
    data() {
      return {
        activeName: 'chinese',
        isCollapse: false,
        LessionStore: [],
        playSong: {
          id: '28256879'
        },
        en: [],
        zh: [],
        mainbody: {}
      }
    },
    mounted() {
      setTimeout(() => {
        if (!this.searchAlbum.albums.length) {
          this.$store.dispatch('loadNceAlbum', this.$route.params.albumId)
        }
      }, 800)
    },
    computed: mapState({
      searchAlbum: state => state.nce.searchAlbum,
      activeAlbum: state => state.nce.activeAlbum,
      albuminfo: state => state.nce.albuminfo,
      songsList: state => state.nce.songsList,
      transitionSwitch: state => state.nce.transitionSwitch
    }),
    components: {
      newConceptMenu
    },
    methods: {
      ...mapActions([
        'loadNceAlbum'
      ]),
      handleClick(tab, event) {
        console.log(tab, event)
      },
      changeisCollapse(payload) {
        this.isCollapse = payload
      },
      rowClick(row, event, column) {
        let {id} = row
        this.getLryic(id)
        this.mainbody = row
        // this.$http({
        //   api: `/music/url${id}`
        // }).then(res => {
        //   this.playSong = res.data.data[0]
        // })
      },
      getLryic(id) {
        this.$http({
          api: `/lyric?id=${id}`
        }).then(res => {
          let {lrc, tlyric} = res.data
          this.handlerLryic(lrc.lyric, tlyric.lyric)
        })
      },
      handlerLryic(en, zh) {
        let engarr = en.split(/(\r\n|\n|\r)/g)
        let zharr = zh.split(/(\r\n|\n|\r)/g)
        this.en = []
        engarr.filter(res => {
          if (res.indexOf(']') > -1) {
            this.en.push(res.split(']')[1])
          }
        })
        this.zh = []
        zharr.filter(res => {
          if (res.indexOf(']') > -1) {
            this.zh.push(res.split(']')[1])
          }
        })
      }
    },
    watch: {
      songsList: {
        handler(val, old) {
          this.getLryic(val[0].id)
        },
        deep: true
      }
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        vm.$store.dispatch('nce/_getAlbumer', to.params.albumId)
      })
    }
  }
</script>

<style lang="scss">
  .bookmenu-warp {
    width: 100%;
    left: 0;
    top: 60px;
    bottom: 0;
    position: fixed;
    overflow-y: auto;
    background-color: #fff;
    z-index: 990;
    display: none;
  }

  .Affix--hidden {
    left: -100%;
    overflow-y: visible;
  }

  .content-warp {
    padding: 47px 30px 40px 340px;
    &.mini {
      padding-left: 64px;
    }
    h2 {
      line-height: 24px;
      font-size: 20px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    }
    .topinfo {
      overflow: hidden;
      float: left;
      width: 30%;
      .cont {
        margin-left: 30px;
      }
      p {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
      }
    }

    .song-list-warp {
      cursor: pointer;
      width: 65%;
      float: left;
    }

    .live-lesson {
      clear: both;
      .old-text {
        text-align: center;
        width: 50%;
        float: left;
        p {
          line-height: 26px;
        }
      }
      textarea {
        text-align: center;
      }
    }
  }

  .lesson-li-item {
    cursor: pointer;
    transition: .3s;
    padding: 3px;
    &:hover {
      background: #0088f5;
      color: #fff;
      transition: .2s;
    }
  }

  @media (min-width: 992px) {
    .bookmenu-warp {
      width: 300px;
      display: block;
      border-right: 1px solid #dbdfe1;
      &.mini {
        width: 60px;
      }
    }
  }
</style>
