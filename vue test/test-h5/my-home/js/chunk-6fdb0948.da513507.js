(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fdb0948"],{"072e":function(t,e,i){"use strict";var n=i("1b4c"),s=i.n(n);s.a},"1b4c":function(t,e,i){},"55c3":function(t,e,i){"use strict";i("99af");e["a"]={data:function(){return{pages:{rows:20,page:1,pageCount:1},dataList:[],loading:!1,finished:!1,dataOver:!1,error:!1,refreshing:!1}},methods:{onRefresh:function(){this.finished=!0,this.error=!1,this.loading=!0,this.pages.page=1,this.onLoadList()},onLoadList:function(){this.getList()},getList:function(){var t=this;this.finished=!0,this.loadData().then((function(e){t.dataOver=!0,t.loading=!1,t.refreshing=!1,t.error=!1,t.finished=!1;var i=e.record,n=e.total;t.pages.page>1?t.dataList=t.dataList.concat(i):t.dataList=i||[],t.dataList.length>=n?t.finished=!0:t.pages.page++})).catch((function(e){console.log("error="+e),t.dataOver=!1,t.finished=!1,t.loading=!1,t.refreshing=!1,t.error=!0}))},resetData:function(){this.dataList=[],this.pages={rows:50,page:1},this.loading=!0,this.finished=!1,this.dataOver=!1,this.error=!1,this.refreshing=!1,this.getList()}}}},a562:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-cell-group",[i("van-cell",{attrs:{title:"我发起的",value:t.typeText,"is-link":"",size:"large"},on:{click:function(e){t.showScreenPicker=!0}}})],1),i("div",{staticClass:"jindu_box"},[i("van-pull-refresh",{staticClass:"refresh-wrap",on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[0==t.dataList.length?i("van-empty",{staticClass:"custom-image",attrs:{description:"没有查到相关信息"}}):i("van-list",{attrs:{finished:t.finished,"immediate-check":!0,"finished-text":t.dataList.length>0?"没有更多了":"",error:t.error,"error-text":"请求失败,点击重新加载"},on:{"update:error":function(e){t.error=e},load:t.onLoadList},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[i("div",{staticClass:"list_detail"},[i("van-cell-group",t._l(t.dataList,(function(e){return i("van-cell",{key:e.PROCESSID,attrs:{title:"退宿申请",label:e.CREATETIME,"is-link":"",center:"",to:"jddetail?id="+e.PROCESSID},scopedSlots:t._u([{key:"default",fn:function(){return[i("span",{style:{color:""+t.formatState(e.STATUS).color}},[t._v(t._s(t.formatState(e.STATUS).zh))])]},proxy:!0}],null,!0)})})),1)],1)])],1)],1),i("van-popup",{attrs:{position:"bottom"},on:{click:function(e){t.showScreenPicker=!1}},model:{value:t.showScreenPicker,callback:function(e){t.showScreenPicker=e},expression:"showScreenPicker"}},[i("van-picker",{attrs:{title:"进度类型","show-toolbar":"",columns:t.columnsList},on:{confirm:t.screenSureClick}})],1)],1)},s=[],a=(i("d3b7"),i("55c3")),r=i("7424"),o={0:{zh:"待审核",color:"#9199A3"},1:{zh:"已通过",color:"#00D19D"},2:{zh:"未通过",color:"#FF4E53"}},c={filters:{},mixins:[a["a"]],data:function(){return{showScreenPicker:!1,columnsList:[{text:"全部",value:3},{text:"待审核",value:0},{text:"已通过",value:1},{text:"未通过",value:2}],type:3,typeText:"全部",list:[{cont:"退宿申请",state:"0",date:"2021-01-02"},{cont:"入住申请",state:"1",date:"2020-11-02"},{cont:"调宿申请",state:"2",date:"2021-01-02"},{cont:"调宿申请",state:"3",date:"2021-01-02"}]}},mounted:function(){this.onLoadList()},methods:{formatState:function(t){return o[t]},loadData:function(){var t=this,e={type:this.type,page:this.pages.page,rows:this.pages.rows};return new Promise((function(i,n){Object(r["g"])(e).then((function(e){var s=e.body;2e4===s.code?i(s.result):(n("error"),t.$toast.fail(s.message))})).catch((function(t){n(t)}))}))},screenSureClick:function(t,e){this.type=t.value,this.typeText=t.text,this.showdate=!1,this.onRefresh()}}},l=c,h=(i("072e"),i("2877")),d=Object(h["a"])(l,n,s,!1,null,"0a2cc536",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-6fdb0948.da513507.js.map