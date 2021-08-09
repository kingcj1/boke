<template>
  <div id="wrap">
    <van-search v-model="keyword" placeholder="搜索人名、组织" @clear="clearSearch" class="search" @input="onSearch" clearable @cancel="clearSearch" :showAction="popup.showData.length>0" left-icon=''>
      <template slot='left' v-if="zzjgShow">
        <div class="picker" @click="handleClickPicker">
          <img src="~@/assets/images/choosing/organization/tree_xr.svg" alt="" />
          选人模式
        </div>
      </template>
    </van-search>
    <div id="diagramDiv"></div>
    <van-popup v-model="popup.show" position="bottom" :style="{ height: 'calc(100% - 4rem)' }" get-container=".search" :overlay="false">
      <ul v-for="(item, idx) in popup.showData" :key="`popup_list_${idx}`">
        <li class="list" @click="handleClickPopupItem(item)">
          <span v-html="item.nameHtml"></span>
          <span class="list-value" v-html="item.titleHtml"></span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
// import {landscape} from '@/mixin/landscape';
import go from "gojs";
const $ = go.GraphObject.make;
export default {
  // mixins:[landscape],
  data() {
    return {
      _myDiagram: null,
      keyword: "",
      popup:{
        show: false,
        showData:[],
      },
    };
  },
  mounted() {
    this.drawTree();
  },
  methods: {
    onSubmit() {},
    getData() {
      let src = this.$api.getPerssionOrgByAdUser2;
      let params = {
        adUser: "ying.cao",
        // adUser: this.$store.state.adUser,
      };
      this.$https.get(src, { params }).then((res) => {
        let arr = [];
        let searchkey = '';
        res.data.map((item) => {
          let o = {...item};
          if(params.adUser==item.adUser) searchkey = item.code
          o.key = item.code;
          o.parent = item.parentCode;
          o.name = item.userName;
          if (item.postLevel == "MIC" || item.postLevel == "DSM"){
            o.title = item.orgDistrict;
          }else if (item.postLevel == "RSD" || item.postLevel == "RSM"){
            o.title = item.orgRegion;
          }else if (item.postLevel == "VP"){
            o.title = item.orgArea;
          } else if (item.postLevel == "CCO" || item.postLevel == "CEO"){
            o.title = item.postLevel;
          }
          arr.push(o);
        });
        let obj = {
          class: "go.TreeModel",
          nodeDataArray: arr,
        };
        this._myDiagram.model = go.Model.fromJson(obj);
        setTimeout(()=>{
          this._myDiagram.scale = 1;
          this._myDiagram.commandHandler.scrollToPart(this._myDiagram.findNodeForKey(searchkey));
        },300)
      });
    },
    drawTree() {
      const myDiagram = $(
        go.Diagram,
        "diagramDiv", // must be the ID or reference to div
        {
          maxSelectionCount: 10, // users can select only one part at a time
          validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
          contentAlignment: go.Spot.Center,
          // 树形图的设置
          layout: $(go.TreeLayout, {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            angle: 90,
            layerSpacing: 35,
            alternateAngle: 90,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 50,
            alternateLayerSpacing: 35,
            alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
            alternateChildPortSpot: go.Spot.Left,
          }),
        }
      );
      this._myDiagram = myDiagram;
      myDiagram.layout.commitNodes = function () {
        go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);
        myDiagram.layout.network.vertexes.each(function (v) {
          if (v.node) {
            let color = "";
            if (v.node.nb.postLevel == "MIC") color = "rgba(246, 244, 255, 1)";
            else if (v.node.nb.postLevel == "DSM") color = "rgba(253, 245, 245, 1)";
            else if (v.node.nb.postLevel == "RSM") color = "rgba(255, 246, 240, 1)";
            else if (v.node.nb.postLevel == "RSD") color = "rgba(249, 253, 244, 1)";
            else color = "rgba(245, 250, 253, 1)";
            let shape = v.node.findObject("Table");
            if (shape) shape.mb = color;
          }
        });
      };
      /* 点击事件 */
      function nodeClick(e, obj) {
        let _data = obj.nb
        console.log(_data); 
        if(!_data.clickFlag) return
      }
      function textStyle() {
        return {
          font: "12px PingFangSC-Medium, PingFang SC",
          stroke: "rgba(51, 51, 51, 1)",
        };
      }
      /* 获取人物头像 */
      function findHeadShot(val) {
        return (
          val.userImg || require("@/assets/images/common/user_defult_img.svg")
        );
      }
      /* 绘制节点 */
      myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        { click: nodeClick },
        new go.Binding("layerName", "isSelected", function (sel) {
          return sel ? "Foreground" : "";
        }).ofObject(),
        $(go.Panel, "Vertical",
          $(go.Picture,
            { name: "Picture", desiredSize: new go.Size(57, 57) },
            new go.Binding("source", findHeadShot)
          ),
          $( go.Panel, "Table",
            { name: "Table",background: "rgba(245, 250, 253, 1)", margin: new go.Margin(7, 0, 0, 0), padding: new go.Margin(6, 20, 6, 20), },
            $( go.TextBlock, textStyle(),
              {
                row: 0,
                column: 0,
                font: "12px PingFangSC-Medium,PingFang SC",
                stroke: "rgba(51, 51, 51, 1)",
              },
              new go.Binding("text", "name").makeTwoWay()
            ),
            $(go.TextBlock, textStyle(),
              {
                row: 1,
                column: 0,
                stroke: "rgba(102, 102, 102, 1)",
                font: "12px PingFangSC-Medium,PingFang SC",
              },
              new go.Binding("text", "title")
            )
          ) 
        ),
      );
      /* 绘制线 */
      myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 1, stroke: "rgba(0, 122, 255, 1)" })
      );
      this.getData();
    },
    onSearch() {
      let keyword = this.keyword;
      if (keyword) {
        let regex = new RegExp(keyword, "i");
        let results = this._myDiagram.findNodesByExample(
          { name: regex },
          { title: regex },
        );
        let arr = [];
        results.each(function(node){
          let reg = new RegExp(keyword, "g");
          node.nb.nameHtml = node.nb.name.replace(reg, "<font color=#1679FF>" + keyword + "</font>");
          node.nb.titleHtml = node.nb.title.replace(reg, "<font color=#1679FF>" + keyword + "</font>");
          arr.push(node.nb)
        });
        console.log(arr);
        if(arr.length){
          this.popup.show = true
          this.popup.showData = arr;
        }else{
          this.popup.show = false
          this.popup.showData = [];
        }
      } else {
        this.popup.show = false
        this.popup.showData = [];
        this._myDiagram.clearHighlighteds();
      }
    },
    handleClickPopupItem(val){
      this.popup.show = false;
      this.keyword = val.name || val.title;
      this._myDiagram.startTransaction("highlight search");
      let regex = new RegExp(this.keyword, "i");
      let results = this._myDiagram.findNodesByExample(
        { name: regex },
        { title: regex },
      );
      this._myDiagram.highlightCollection(results);
      this._myDiagram.centerRect(results.first().actualBounds);
      this._myDiagram.commitTransaction("highlight search");
    },
    clearSearch() {
      this.keyword = "";
    },
    handleClickPicker(){
      this.$router.push({
        name:'choosing_organization',
      })
    },
  },
  computed: {
    zzjgShow(){
      return this.$store.state.userPowerList.some(item=>{
        return item == this.$store.state.powerList.zzjg;
      })
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/base.less";
#wrap{
  .search{
    height: 4rem;
    width: 100%;
    .picker{
      width: 8.5rem;
      color: rgba(0, 122, 255, 1);
      .font(1.4rem);
      img{
        width: 1.5rem;
        vertical-align: middle;
      }
    }
  }
  #diagramDiv {
    height: ~"calc(100vh - 4rem)";
    background-color: #ffffff;
    overflow: hidden;
  }
  .list{
    padding: 1.4rem 1.2rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font(1.7rem);
    .list-value{
      color: rgba(102, 102, 102, 1);
      .font(1.3rem);
    }
  }
}
</style>
