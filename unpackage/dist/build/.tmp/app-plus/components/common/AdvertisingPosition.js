(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/AdvertisingPosition"],{"0d04":function(t,e,n){"use strict";n.r(e);var o=n("51ff"),i=n("1272");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("514a");var a=n("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"bc3ce64e",null);e["default"]=r.exports},1272:function(t,e,n){"use strict";n.r(e);var o=n("6fca"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=i.a},"514a":function(t,e,n){"use strict";var o=n("5937"),i=n.n(o);i.a},"51ff":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},5937:function(t,e,n){},"6fca":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("7384"),i={name:"AdvertisingPosition",props:{num:{type:Number,default:0}},data:function(){return{adSets:[]}},mounted:function(){this.getAdPositione()},methods:{goPath:function(e){1===e.type?t.navigateTo({url:"/pages/common/webview/webview?url="+e.url}):5===e.type&&t.navigateTo({url:"/pages/user/order/detail?shopId="+e.id+"&goodsId="+e.url})},getAdPositione:function(){var t=this,e={id:1};(0,o.getAdPositioneById)(e).then(function(e){"1000"===e.code&&(t.adSets=e.data.adSet)})}}};e.default=i}).call(this,n("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/AdvertisingPosition-create-component',
    {
        'components/common/AdvertisingPosition-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0d04"))
        })
    },
    [['components/common/AdvertisingPosition-create-component']]
]);                
