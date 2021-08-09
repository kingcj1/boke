
<!-- 架构图 -->
<template>
  <div class="organization-tree">
    <!-- <van-sticky class="heard">
      <van-search v-model="search.keyWord" placeholder="搜索人名、组织" @clear="clearSearch" @input="onSearch" clearable @cancel="clearSearch" :showAction="popup.showData.length>0" left-icon=''>
        <template slot='left' v-if="zzjgShow">
          <div class="picker" @click="handleClickPicker">
            <img src="~@/assets/images/common/organize.svg" alt="" />
            架构模式
          </div>
        </template>
      </van-search>
      <tabItemDom ref='tabs' :data="tabItem.data" @onchange="changeTabs"/>
    </van-sticky>
    <van-popup v-model="popup.show" position="bottom" :style="{ height: 'calc(100% - 5.4rem)' }" get-container=".heard" :overlay="false">
      <ul v-for="(item, idx) in popup.showData" :key="`popup_list_${idx}`">
        <li class="list" @click="handleClickPopupItem(item)">
          <span v-html="item.title"></span>
          <span class="list-value">{{item.value}}</span>
        </li>
      </ul>
    </van-popup> -->
    <div class="content">
      <org-tree
        :data="orgTree.data"
        collapsable
        :node-render="nodeRender"
        :expand-all="orgTree.expandAll"
        :horizontal="false"
        :props="orgTree.props"
        @on-expand="onExpand"
        @on-node-click="onNodeClick" />
    </div>
  </div>
</template>

<script>
import OrgTree from '@/components/org-tree'
export default {
  components: { OrgTree },
  data(){
    return{
      search:{
        active: -1,
        keyWord:'',
        loading: false,
        finished: false,
        pageSize: 50,
        page:1,
      },
      tabItem:{
        timeText:'',
        active: {
          lable:'',
          value:'',
        },
        data:[
          {lable:'VP',value:'1'},
          {lable:'RSD',value:'2'},
          {lable:'RSM',value:'3'},
          {lable:'DSM',value:'4',isDisable:true},
        ],
      },
      popup:{
        show: false,
        data:[],
        showData:[],
      },
      orgTree:{
        data:{},
        expandAll: false,
        props: {
          id: 'jobNUmber',
          label: 'title',
          expand: 'expand',
          children: 'children'
        }
      },
    }
  },
  methods:{
    getPerssionOrgByAdUser(){
      let src = this.$api.getPerssionOrgByAdUser;
      let params = {
        adUser: 'min.liu'//this.$store.state.adUser,
      }
      this.$https.get(src,{params:params}).then(res=>{
        let _data = res.data[0];
        this.orgTree.data = _data;
      })
    },
    nodeRender (h, data) {
      let bgcolor = 'rgba(245, 250, 253, 1)';
      let imgSrc = data.imgSrc || require('@/assets/images/common/user_defult_img.svg');
      return (
        <div class='box'>
          <div class='img-box'>
            <img src={imgSrc}/>
          </div>
          <div class='footer-box' style={{'background-color':bgcolor,}}>
            <p>{data.userName}</p>
            <p>{data.code}</p> 
          </div>
        </div>
      )
    },
    onNodeClick (e, data) {
      console.log(data);
    },
    onExpand (val, status) {
      console.log(val, status);
    },
  },
  mounted(){
    this.getPerssionOrgByAdUser()
  },
}
</script>

<style lang="less" scoped>
.organization-tree{
  height: 100vh;
  .content{
    position: relative;
    height: calc(100vh - 2rem);
    overflow: auto;
    .org-tree-container{
      width: 100%;
      // /deep/.org-tree{
      //   position: absolute;
      //   left: 50%;
      //   transform: translateX(-50%);
      // }
    }
  }
}
</style>