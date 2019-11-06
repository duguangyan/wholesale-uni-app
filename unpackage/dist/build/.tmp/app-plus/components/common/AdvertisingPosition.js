(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/AdvertisingPosition"],{"0d04":function(t,n,e){"use strict";e.r(n);var o=e("da25"),a=e("1272");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("1a76");var u=e("2877"),r=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,"724faba8",null);n["default"]=r.exports},1272:function(t,n,e){"use strict";e.r(n);var o=e("6fca"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},"1a76":function(t,n,e){"use strict";var o=e("698d"),a=e.n(o);a.a},"698d":function(t,n,e){},"6fca":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("7384"),a={name:"AdvertisingPosition",props:{num:{type:Number,default:0}},data:function(){return{adSets:[]}},mounted:function(){this.getAdPositione()},methods:{goPath:function(n){1===n.type?t.navigateTo({url:"/pages/common/webview/webview?url="+n.url}):5===n.type&&t.navigateTo({url:"/pages/user/order/detail?shopId="+n.id+"&goodsId="+n.url})},getAdPositione:function(){var t=this,n={id:1};(0,o.getAdPositioneById)(n).then(function(n){"1000"===n.code&&(t.adSets=n.data.adSet)})}}};n.default=a}).call(this,e("6e42")["default"])},da25:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/AdvertisingPosition-create-component',
    {
        'components/common/AdvertisingPosition-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0d04"))
        })
    },
    [['components/common/AdvertisingPosition-create-component']]
]);                
