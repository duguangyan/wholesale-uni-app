(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/AdvertisingPosition"],{"0d04":function(t,n,e){"use strict";e.r(n);var o=e("2283"),i=e("1272");for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);e("bbe9");var a=e("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"8b4ef2e6",null);n["default"]=r.exports},1272:function(t,n,e){"use strict";e.r(n);var o=e("6fca"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=i.a},2283:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},3491:function(t,n,e){},"6fca":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("7384"),i={name:"AdvertisingPosition",props:{num:{type:Number,default:0}},data:function(){return{adSets:[]}},mounted:function(){this.getAdPositione()},methods:{goPath:function(t){1===t.type?location.href=t.url:5===t.type&&this.$router.push({path:"gooddetail/"+t.id+"/"+t.url})},getAdPositione:function(){var t=this,n={id:1};(0,o.getAdPositioneById)(n).then(function(n){"1000"===n.code&&(t.adSets=n.data.adSet)})}}};n.default=i},bbe9:function(t,n,e){"use strict";var o=e("3491"),i=e.n(o);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/AdvertisingPosition-create-component',
    {
        'components/common/AdvertisingPosition-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0d04"))
        })
    },
    [['components/common/AdvertisingPosition-create-component']]
]);                
