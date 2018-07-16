<template>
  <section class="container">
    <div>
      <h1 class="title">
        STUDY CLUB
      </h1>
      <h2 class="subtitle">
        Welcome to Online Course
      </h2>
      <br><br>
      <!--new concept english-->
      <div class="menu-list">
        <h2 style="line-height:50px;">
          New Concept English：
        </h2>
        <template v-for="item in searchAlbum.albums">
          <span style="margin-right:10px;">{{item.id}}</span>
          <el-button
            type="primary"
            @click="clickNce(item)"
            :key="item.id">{{item.name}}
          </el-button>
          <br>
        </template>

      </div>
      <!-- ielts -->
      <div class="menu-list">
        <span>
          Ielts:
        </span>
        <el-button
          type="primary"
          v-for="listNo in 12"
          :key="listNo"
          v-show="listNo >3"
          @click="$router.push({path: `/ielts/${listNo}`})"
        >Ielts {{listNo}}
        </el-button>
      </div>
      <div style="height:260px;"></div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {
      this.getAlbum()
      this.$store.dispatch('loadNceAlbum')
    },
    computed: mapState({
      searchAlbum: state => state.nce.searchAlbum
    }),
    methods: {
      getAlbum() {
      },
      clickNce(item) {
        this.$store.commit('nce/ACTIVE_ALBUM', item)
        this.$router.push({path: `/newConcept/${item.id}`})
      }
    }
  }
</script>

<style lang="scss">
  .container {
    min-height: calc(100vh - 62px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .menu-list {
    padding-bottom: 20px;
    max-width: 590px;
    text-align: center;
    > button {
      margin-bottom: 10px;
    }
  }
</style>
