(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e493fa1"],{"1b45":function(e,n,t){"use strict";var i=t("47c9"),l=t.n(i);l.a},"47c9":function(e,n,t){},c740:function(e,n,t){"use strict";var i=t("23e7"),l=t("b727").findIndex,o=t("44d2"),a=t("ae40"),r="findIndex",c=!0,d=a(r);r in[]&&Array(1)[r]((function(){c=!1})),i({target:"Array",proto:!0,forced:c||!d},{findIndex:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}}),o(r)},f736:function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("demo2")],1)},l=[],o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(n){e.loading=n},expression:"loading"}},e._l(e.list,(function(e){return t("van-cell",{key:e,attrs:{title:e}})})),1)],1)},a=[],r=(t("99af"),{data:function(){return{list:[],loading:!1,finished:!1}},methods:{onLoad:function(){var e=this;setTimeout((function(){for(var n=[],t=0;t<20;t++)n.push(t);e.list=e.list.concat(n),e.loading=!1,e.list.length>=100&&(e.finished=!0)}),1e3)}}}),c=r,d=t("2877"),s=Object(d["a"])(c,o,a,!1,null,"07625f9b",null),u=s.exports,f=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("ul",e._l(e.list,(function(n){return t("li",{key:n,attrs:{"data-src":n}},[e._v(e._s(n))])})),0)])},h=[],v=(t("c740"),t("a630"),t("d81d"),t("3ca3"),{data:function(){return{list:[],treeList:[{id:1,pid:null,label:"一级",value:"1",flag:!0,children:[{id:2,pid:1,label:"二级1",value:"2.1",flag:!1,children:[]},{id:3,pid:1,label:"二级2",value:"2.2",flag:!0,children:[]},{id:4,pid:1,label:"二级3",value:"2.3",flag:!0,children:[{id:5,pid:4,label:"三级1",value:"3.1",flag:!0,children:[]},{id:6,pid:4,label:"三级2",value:"3.2",flag:!0,children:[]}]}]}]}},created:function(){this.list=Array.from({length:600},(function(e,n){return n})),console.log("this.list",this.list)},mounted:function(){var e=this;window.addEventListener("scroll",(function(){console.log("1"),e.lazyload()}));var n=[];console.log("扁平化前：",this.treeList),this.treeTranslate(this.treeList,n),console.log("扁平化后：",n),this.toTree(JSON.parse(JSON.stringify(n)))},methods:{lazyload:function(){var e=document.getElementsByTagName("li"),n=e.length,t=document.documentElement.clientHeight,i=document.documentElement.scrollTop||document.body.scrollTop;console.log("scrollHeight",i);for(var l=0;l<n;l++){var o=e[l].offsetTop;if(o<t+i){var a=e[l].dataset.src;e[l].src=a}}},treeTranslate:function(e,n){var t=this;n.length>1e5||e.map((function(e){n.push(e),e.children&&e.children.length&&t.treeTranslate(e.children,n)}))},toTree:function(e){var n=[];e.map((function(t){null===t.pid&&n.push(t),e.map((function(e){if(e.pid===t.id){var n=t.children.findIndex((function(n){return n.id===e.id}));-1===n&&t.children.push(e)}}))})),console.log("反扁平化后：",n)}}}),p=v,g=(t("1b45"),Object(d["a"])(p,f,h,!1,null,"4af18cfe",null)),m=g.exports,b={components:{demo1:u,demo2:m},data:function(){return{list:[]}},methods:{}},y=b,T=Object(d["a"])(y,i,l,!1,null,"1ac1e658",null);n["default"]=T.exports}}]);
//# sourceMappingURL=chunk-6e493fa1.ea38961d.js.map