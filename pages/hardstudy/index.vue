<template>
  <div class="comp-index">
    <Form :model="formItem" :label-width="80" style="width:400px;margin:0 auto;">
      <FormItem label="英文">
        <Input v-model="formItem.en" placeholder="Enter something..." clearable/>
      </FormItem>
      <FormItem label="中文">
        <Input v-model="formItem.zn" placeholder="Enter something..." clearable/>
      </FormItem>
      <FormItem label="Text">
        <i-input
          v-model="formItem.info" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
          placeholder="Enter something..."/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="pushStorage">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>

    <div class="history">
      <Table border :columns="columns" :data="historyList"></Table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'
  import storage from 'istorage'

  export default {
    name: 'HardStudy',
    data() {
      return {
        formItem: {
          en: '',
          zh: '',
          info: '',
          dont: true,
          status: true
        },
        columns: [
          {title: '英文', key: 'en'},
          {title: '中文', key: 'ch'},
          {title: '意思', key: 'info'},
          {
            title: 'createdTime',
            key: 'createdTime',
            render: (h, params) => {
              console.log(params)
              return h('div', [
                h('span', params.row.createdTime || '未知时间')
              ])
            }
          }, {
            title: '操作',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                params.row.dont ? h(
                  'Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '记得')
                  : '',
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.historyList.splice(params.index, 1)
                      this.setLocaStorage(this.historyList)
                    }
                  }
                }, 'Delete')
              ])
            }
          }
        ],
        historyList: []
      }
    },
    computed: {
      today() {
        return dayjs().format('YYYY-MM-DD')
      },
      localKey() {
        return `hardStudy-${this.today}`
      }
    },
    mounted() {
      this.getHistoryList()
    },
    methods: {
      getHistoryList() {
        console.log(storage.getItem(this.localKey))
        this.historyList = storage.getItem(this.localKey) || []
      },
      pushStorage() {
        let lastStorage = storage.getItem(this.localKey) || []
        lastStorage.push(Object.assign({}, this.formItem, {
          createdTime: new Date().getTime()
        }))
        this.setLocaStorage(lastStorage)
      },
      setLocaStorage(lastStorage) {
        storage.setItem(this.localKey, lastStorage)
        this.getHistoryList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-index {
    text-align: center;
    padding: 30px;
    .history {
    }
  }
</style>
