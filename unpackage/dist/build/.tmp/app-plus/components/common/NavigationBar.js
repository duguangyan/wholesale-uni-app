(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/NavigationBar"],{"0b71":function(t,n,a){},"3df9":function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},o=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return o})},"90ac":function(t,n,a){"use strict";a.r(n);var e=a("c818"),o=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(n,t,function(){return e[t]})}(c);n["default"]=o.a},"9c1d":function(t,n,a){"use strict";a.r(n);var e=a("3df9"),o=a("90ac");for(var c in o)"default"!==c&&function(t){a.d(n,t,function(){return o[t]})}(c);a("d30b");var i=a("2877"),u=Object(i["a"])(o["default"],e["a"],e["b"],!1,null,"caf1710a",null);n["default"]=u.exports},c818:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"navigationBar",props:{title:{type:String,default:"标题"},clickTitle:{type:String,default:"按钮"},isClick:{type:Boolean,default:!1}},data:function(){return{autoplay:!0,videoCtx:"",platform:0}},created:function(){},mounted:function(){this.platform=t.getStorageSync("platform")},methods:{goBack:function(){t.navigateBack({delta:1})},doClick:function(){this.$emit("doClick",!1)}}};n.default=a}).call(this,a("6e42")["default"])},d30b:function(t,n,a){"use strict";var e=a("0b71"),o=a.n(e);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/NavigationBar-create-component',
    {
        'components/common/NavigationBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("9c1d"))
        })
    },
    [['components/common/NavigationBar-create-component']]
]);                
