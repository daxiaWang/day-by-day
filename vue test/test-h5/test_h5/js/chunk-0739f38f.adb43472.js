(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0739f38f"],{"1a83":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("ul",e._l(e.users,(function(t){var o=t.name,r=t.id;return n("li",{key:r},[e._v(" name-"+e._s(o)+" id-"+e._s(r)+" ")])})),0),e._m(0),e._m(1),e._m(2),n("PromiseAll")],1)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("span",[e._v("span 元素")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"three-column-layout"},[n("div",{staticClass:"left"}),n("div",{staticClass:"center"}),n("div",{staticClass:"right"},[e._v("111111111111111111111111111111111111111111111111111111111111111111")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"three-column-layout1"},[n("div",{staticClass:"left"}),n("div",{staticClass:"center"}),n("div",{staticClass:"right"})])}],i={data:function(){return{testMsg:"testMsg"}},beforeCreate:function(){window.sessionStorage.setItem("mixisBeforeCreate",new Date)},created:function(){console.log("mixis create"),window.sessionStorage.setItem("mixisCreate",new Date)},mounted:function(){this.test()},methods:{test:function(){console.log("mixis mounted test()")}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},c=[],a=(n("b0c0"),n("d3b7"),n("820e"),n("3ca3"),n("ddb0"),{mounted:function(){this.name()},methods:{name:function(){var e=function(){return new Promise((function(e,t){setTimeout((function(){e("promise1")}),3e3)}))},t=function(){return new Promise((function(e,t){setTimeout((function(){e("promise2")}),1e3)}))},n=function(){return new Promise((function(e,t){setTimeout((function(){t("error promise3 ")}),2e3)}))};Promise.all([e(),t(),n()]).then((function(e){console.log("Promise.all res",e)})).catch((function(e){console.log("error",e)})),Promise.allSettled([e(),t(),n()]).then((function(e){console.log("Promise.allSettled res",e)})).catch((function(e){console.log("error",e)}))}}}),u=a,l=n("2877"),f=Object(l["a"])(u,s,c,!1,null,"67371f4b",null),m=f.exports,d={name:"Test",components:{PromiseAll:m},mixins:[i],data:function(){return{users:[{name:"张三",id:0},{name:"李四",id:1},{name:"王五",id:2}]}},computed:{haha:function(e){return console.log("obj ",e),e}},created:function(){console.log("test created");var e=window.sessionStorage.getItem("mixisBeforeCreate");console.log("bbb",e);var t=window.sessionStorage.getItem("mixisCreate");console.log("aaa",t)},mounted:function(){this.aa(),console.log("this.$options",this.$options)},methods:{aa:function(){console.log("1",this.haha)}}},h=d,v=(n("fc87"),Object(l["a"])(h,o,r,!1,null,"ee617d04",null));t["default"]=v.exports},2266:function(e,t,n){var o=n("825a"),r=n("e95a"),i=n("50c4"),s=n("0366"),c=n("35a1"),a=n("2a62"),u=function(e,t){this.stopped=e,this.result=t};e.exports=function(e,t,n){var l,f,m,d,h,v,p,w=n&&n.that,g=!(!n||!n.AS_ENTRIES),_=!(!n||!n.IS_ITERATOR),b=!(!n||!n.INTERRUPTED),C=s(t,w,1+g+b),x=function(e){return l&&a(l),new u(!0,e)},E=function(e){return g?(o(e),b?C(e[0],e[1],x):C(e[0],e[1])):b?C(e,x):C(e)};if(_)l=e;else{if(f=c(e),"function"!=typeof f)throw TypeError("Target is not iterable");if(r(f)){for(m=0,d=i(e.length);d>m;m++)if(h=E(e[m]),h&&h instanceof u)return h;return new u(!1)}l=f.call(e)}v=l.next;while(!(p=v.call(l)).done){try{h=E(p.value)}catch(P){throw a(l),P}if("object"==typeof h&&h&&h instanceof u)return h}return new u(!1)}},"4fb9":function(e,t,n){},"820e":function(e,t,n){"use strict";var o=n("23e7"),r=n("1c0b"),i=n("f069"),s=n("e667"),c=n("2266");o({target:"Promise",stat:!0},{allSettled:function(e){var t=this,n=i.f(t),o=n.resolve,a=n.reject,u=s((function(){var n=r(t.resolve),i=[],s=0,a=1;c(e,(function(e){var r=s++,c=!1;i.push(void 0),a++,n.call(t,e).then((function(e){c||(c=!0,i[r]={status:"fulfilled",value:e},--a||o(i))}),(function(e){c||(c=!0,i[r]={status:"rejected",reason:e},--a||o(i))}))})),--a||o(i)}));return u.error&&a(u.value),n.promise}})},e667:function(e,t){e.exports=function(e){try{return{error:!1,value:e()}}catch(t){return{error:!0,value:t}}}},f069:function(e,t,n){"use strict";var o=n("1c0b"),r=function(e){var t,n;this.promise=new e((function(e,o){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=o})),this.resolve=o(t),this.reject=o(n)};e.exports.f=function(e){return new r(e)}},fc87:function(e,t,n){"use strict";var o=n("4fb9"),r=n.n(o);r.a}}]);
//# sourceMappingURL=chunk-0739f38f.adb43472.js.map