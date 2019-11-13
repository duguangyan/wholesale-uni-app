(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/goodsDetail/goodsDetail"],{

/***/ 187:
/*!********************************************************************************************!*\
  !*** D:/zl/wholesale-uni-app/main.js?{"page":"pages%2Forder%2FgoodsDetail%2FgoodsDetail"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _goodsDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/order/goodsDetail/goodsDetail.vue */ 188));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_goodsDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 188:
/*!***********************************************************************!*\
  !*** D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goodsDetail.vue?vue&type=template&id=0b676e8a&scoped=true& */ 189);
/* harmony import */ var _goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goodsDetail.vue?vue&type=script&lang=js& */ 194);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./goodsDetail.vue?vue&type=style&index=0&id=0b676e8a&lang=scss&scoped=true& */ 199);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);






/* normalize component */

var component = Object(_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0b676e8a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 189:
/*!******************************************************************************************************************!*\
  !*** D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=template&id=0b676e8a&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsDetail.vue?vue&type=template&id=0b676e8a&scoped=true& */ 190);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_template_id_0b676e8a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 190:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=template&id=0b676e8a&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = __webpack_require__(/*! @/static/img/icon-right.png */ 191)

  var m1 = __webpack_require__(/*! @/static/img/tag-go.png */ 64)

  var m2 = __webpack_require__(/*! @/static/img/icon-cart.png */ 192)

  var m3 = __webpack_require__(/*! @/static/img/tag-close2.png */ 193)

  var l1 = _vm.__map(_vm.good.goodsDetailSpecList, function(spec, index) {
    var l0 = _vm.__map(spec.goodsDetailSpecValueList, function(opt, ii) {
      var m4 = _vm.getStatus(opt.value)
      var m5 = _vm.getStatus(opt.value)
      return {
        $orig: _vm.__get_orig(opt),
        m4: m4,
        m5: m5
      }
    })

    return {
      $orig: _vm.__get_orig(spec),
      l0: l0
    }
  })

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.isShare = true
    }

    _vm.e1 = function($event) {
      _vm.isStandard = true
    }

    _vm.e2 = function($event) {
      _vm.isSure = false
    }

    _vm.e3 = function($event) {
      _vm.isSure = false
    }

    _vm.e4 = function($event) {
      _vm.isShare = false
    }

    _vm.e5 = function($event) {
      _vm.isStandard = false
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
        l1: l1
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 194:
/*!************************************************************************************************!*\
  !*** D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsDetail.vue?vue&type=script&lang=js& */ 195);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_ms_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 195:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













































































































































































































































var _iconCollect = _interopRequireDefault(__webpack_require__(/*! @/static/img/icon-collect.png */ 196));
var _iconCollect2 = _interopRequireDefault(__webpack_require__(/*! @/static/img/icon-collect2.png */ 197));
var _goodsApi = __webpack_require__(/*! @/api/goodsApi.js */ 198);










var _userApi = __webpack_require__(/*! @/api/userApi.js */ 25);
var _tips = _interopRequireDefault(__webpack_require__(/*! @/utils/tips.js */ 26));
var _util = _interopRequireDefault(__webpack_require__(/*! @/utils/util.js */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}var Share = function Share() {return Promise.all(/*! import() | components/good/Share */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/good/Share")]).then(__webpack_require__.bind(null, /*! @/components/good/Share */ 596));};var Player = function Player() {return __webpack_require__.e(/*! import() | components/common/Player */ "components/common/Player").then(__webpack_require__.bind(null, /*! @/components/common/Player.vue */ 604));};var Standard = function Standard() {return __webpack_require__.e(/*! import() | components/good/Standard */ "components/good/Standard").then(__webpack_require__.bind(null, /*! @/components/good/Standard */ 611));};var SwiperDot = function SwiperDot() {return __webpack_require__.e(/*! import() | components/common/SwiperDot */ "components/common/SwiperDot").then(__webpack_require__.bind(null, /*! @/components/common/SwiperDot.vue */ 618));};var _default =

{
  data: function data() {
    return {
      imgLoading: true,
      opt: false,
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 500,
      shopId: '',
      goodsId: '',
      curDisable: false,
      nums: /* 数量 */1,
      startNum: /* 起批量 */1,
      curs: /* 当前选中的规格项 */[],
      totalPrice: 0,
      stock: 0,
      deep: 1,
      list: [],
      isPlayer: false,
      videoUrl: "",
      imageList: [],
      videoObj: {},
      postType: 0,
      isStandard: false,
      good: {
        hasColletion: false,
        rules: /* 组合规则 */[],
        goods: {},
        goodsSkuList: [],
        standardList: [] },

      cur: 0,
      total: 0,
      icon: {
        ColSta: _iconCollect.default,
        ColAct: _iconCollect2.default },

      counter: 0,
      isSure: false,
      isShare: false,
      nav: "",
      isGoodsTitle: false,
      goodsTitle: '' };

  },
  components: {
    Share: Share,
    Standard: Standard,
    Player: Player,
    SwiperDot: SwiperDot },

  computed: {
    payPrice: function payPrice() {
      return _util.default.formatMoney(this.totalPrice * 100 * this.nums / 100, 2);
    } },

  onLoad: function onLoad(options) {
    this.shopId = options.shopId;
    this.goodsId = options.goodsId;
  },
  onShow: function onShow() {var _this = this;


    // if (uni.getStorageSync("access_token")) {
    // 	getGoodNums({
    // 		status: ""
    // 	}).then(data => {
    // 		if(data.code == '1000'){
    // 			this.counter = data.data.itemNum;
    // 		}

    // 	});
    // }
    (0, _goodsApi.getDetail)({
      shopId: this.shopId,
      goodsId: this.goodsId }).
    then(function (data) {
      if (data.code == '1000') {
        var d = data.data.goodsDetail;
        d.hasColletion = data.data.hasColletion;
        d.standardList = [];

        //处理金额
        d.goods.minPrice = _util.default.formatMoney(d.goods.minPrice, 2);
        d.goods.maxPrice = _util.default.formatMoney(d.goods.maxPrice, 2);

        // 处理视频和图片
        var imageList = [];
        d.goodsImgVOList.forEach(function (item) {
          if (item.type != 2) {
            imageList.push(item);
          } else {
            _this.videoObj[item.sort] = item.imgUrl;
          }
        });
        _this.imageList = imageList;
        _this.total = imageList.length;

        if (d.goods.unitName == null) {
          d.goods.unitName = d.goodsDetailSpecList[0].name;
        }

        var setNode = function setNode(node, key) {
          node[key] = {};
          return node[key];
        };

        // 生成规格树
        var tree = {};
        // let specLen = d.goodsDetailSpecList.length;
        var parentNodes = [tree];

        d.goodsDetailSpecList.forEach(function (spec) {
          // 为每个父节点插入子节点
          var nodes = [];
          parentNodes.forEach(function (node) {
            spec.goodsDetailSpecValueList.forEach(function (val, index) {
              // 重置当前遍历的父节点
              nodes.push(setNode(node, val.value));
            });
          });
          parentNodes = nodes;
        });

        var sufName;
        var isSection =
        d.goods.showStyle == 1 && d.goodsSkuList.length > 1 ? true : false;
        // if (isSection) {
        //   sufName = d.goodsDetailSpecList[0].valueSuffix;
        // } else {
        //   sufName = "";
        // }
        sufName = d.goodsDetailSpecList[0].valueSuffix || "";

        var grades = JSON.parse(d.goodsSkuList[0].priceExp);
        if (d.goods.showStyle == 2) {
          d.goodsSkuList[0].price = grades[0].price;
          d.goodsSkuList[0].startNum = grades[0].startQuantity;
        }

        // 配置节点
        var isInvalid = /* 是否无效效商品 */true;
        d.goodsSkuList.forEach(function (sku, exIndex) {
          var curNode = tree;
          var len = sku.attrValueList.length;
          d.standardList[exIndex] = [];

          sku.attrValueList.forEach(function (val, index) {
            curNode = curNode[val.value];
            if (len - 1 == index) {
              // 配置参数
              curNode.disabled = !!(sku.stock < sku.startNum);
              curNode.price = sku.price;
              curNode.stock = sku.stock;
              curNode.id = sku.id;
              curNode.startNum = sku.startNum;
            }
            // 顺便处理规格
            if (isSection) {
              d.standardList[exIndex].push("".concat(val.value).concat(d.goods.unitName, "\u8D77\u6279"));
              d.standardList[exIndex].push(
              // `${val.value}${sufName}/${d.goods.unitName}`
              "".concat(val.value).concat(sufName));

            } else {
              d.standardList[exIndex].push(val.value);
            }

            // 累计无效次
            isInvalid = isInvalid && curNode.disabled;
          });
          d.standardList[exIndex].push("\uFFE5".concat(sku.price, "/").concat(d.goods.unitName));
        });
        d.tree = tree;
        d.isInvalid = isInvalid;

        if (d.goods.status != 3) {
          _tips.default.tips("商品已下架啦,看下其它的吧");
        }

        if (d.goods.showStyle == 2) {
          var sku = d.goodsSkuList[0].attrValueList[0];
          d.goodsList = [];
          // let grades = JSON.parse(d.goodsSkuList[0].priceExp);

          grades.forEach(function (item, index) {
            d.goodsList.push({
              startNum: item.startQuantity,
              price: item.price,
              unit: sku.name,
              id: sku.skuId });

          });
        }

        d.sufName = sufName;

        _this.good = d || {};

        // 商品购买面板
        _this.deep = _this.good.goodsDetailSpecList.length;
        _this.good.goodsDetailSpecList.forEach(function (spec) {
          _this.curs.push({
            key: spec.goodsDetailSpecValueList[0].value,
            disabled: undefined });

        });
        _this.calcPrice();
        _this.opt = true;
        // 获得邮费方案
        // getPostItem({
        // 	id: d.goods.postSettingId
        // }).then(data => {
        // 	this.postType = data.data.type;
        // });


        // 判断商品是否备收藏
        // if(uni.getStorageSync('access_token')){
        // 	this.getHasCollect(this.goodsId)
        // }

      }

    });
  },
  methods: {
    imgLoad: function imgLoad(e) {var _this2 = this;
      setTimeout(function () {
        _this2.imgLoading = false;
      }, 500);
    },
    // 判断是否备收藏
    getHasCollect: function getHasCollect(id) {var _this3 = this;
      var data = {
        targetId: id };

      (0, _goodsApi.getHasCollect)(data).then(function (res) {
        _this3.good.hasColletion = res.data;
      });
    },
    closePlayer: function closePlayer() {
      this.isPlayer = false;
      this.videoUrl = '';
    },
    submitInfo: function submitInfo(e) {
      console.log(e.detail.formId);

    },
    goHome: function goHome() {
      uni.switchTab({
        url: '/pages/main/main' });

    },
    doIncrease: function doIncrease() {
      if (this.nums < this.stock) {
        // this.nums = oldval;
        ++this.nums;
      }
      this.calcPrice(1);
    },
    doDecrease: function doDecrease() {
      if (+this.nums > this.startNum) {
        --this.nums;
        if (!this.curDisable) {
          this.nums = this.startNum;
        }
      }
      this.calcPrice(1);
    },
    checkNum: function checkNum(e) {
      var val = +e.target.value;
      if (val > this.stock) {
        _tips.default.tips("超出库存" + this.stock + "啦");
        this.nums = this.stock;
      } else if (val < this.startNum) {
        if (!this.curDisable) {
          _tips.default.tips("起批量不能低于" + this.startNum);
          this.nums = this.startNum;
        }
      }
      this.calcPrice(1);
    },
    getStatus: function getStatus(key) {
      var node = this.good.tree;
      for (var i = 0; i < this.deep; i++) {
        if (i === this.deep - 1) {
          node = node[key];
          return node ? node.disabled : false;
        } else {
          node = node[this.curs[i]["key"]];
        }
      }
    },
    calcPrice: function calcPrice(reset) {var _this4 = this;


      var node = this.good.tree;
      if (this.good.goods.showStyle != 2) {
        this.curs.forEach(function (cur, index) {
          node = node[cur["key"]];
          if (index === _this4.curs.length - 1) {
            _this4.totalPrice = parseFloat(node.price || 0);
            _this4.stock = node.stock;
            !reset && (_this4.nums = node.disabled ? 0 : node.startNum);
            _this4.startNum = node.startNum || 0;
            cur.disabled = node.disabled;
            _this4.curDisable = node.disabled;
          }
        });
      } else {
        this.curs.forEach(function (cur, index) {
          node = node[cur["key"]];
          if (index == _this4.curs.length - 1) {
            _this4.stock = node.stock;
            !reset && (_this4.nums = node.disabled ? 0 : node.startNum);
            cur.disabled = node.disabled;

          }
        });

        var list = _toConsumableArray(this.good.goodsList);
        var first = list[0];
        var last = list[list.length - 1];
        list.push({
          startNum: Math.pow(2, 25),
          price: last.price });

        list.unshift({
          startNum: first.startNum,
          price: first.price });


        this.startNum = first.startNum;
        for (var i = 1, l = list.length - 1; i < l; i++) {
          if (this.nums >= list[i].startNum && this.nums < list[i + 1].startNum) {
            this.totalPrice = list[i].price;
          }
        }
      }



    },
    selOption: function selOption(data, index) {

      this.getStatus();

      var list = _toConsumableArray(this.curs);
      list[index]["key"] = data;
      this.curs = list;
      this.calcPrice();
    },
    navigate: function navigate() {var _this5 = this;
      // 验证选项是否完整
      var isInvalid = false;
      var node = this.good.tree;
      for (var i = 0; i < this.deep; i++) {
        node = node[this.curs[i]["key"]];
        if (i === this.deep - 1) {
          isInvalid = node.disabled;
        }
      }
      if (isInvalid) {
        return _tips.default.tips("请选择所有的项");
      }
      if (this.nav.match(/cart/)) {
        (0, _goodsApi.addToCart)({
          skuId: node.id,
          num: this.nums }).
        then(function (data) {
          _this5.isSure = false;
          _this5.getUpdate();
        });
      } else {
        if (!!this.nav.match(/submit/i)) {
          var submitData = JSON.stringify({
            addressId: "",
            goodsCount: this.nums,
            goodsId: this.goodsId,
            shopId: this.shopId,
            skuId: node.id
            // userId: localStorage.getItem("uid")
          });
          uni.navigateTo({
            url: '/pages/order/submit/submit?submitData=' + submitData + '&isBuyNow=1' });

        } else {
          uni.navigateTo({
            url: '/pages/order/order' });

        }
      }
    },


    goCart: function goCart() {
      if (!uni.getStorageSync('access_token')) {
        uni.navigateTo({
          url: '/pages/login/login' });

      } else {
        uni.switchTab({
          url: '/pages/order/order' });

      }

    },
    goPostSetting: function goPostSetting(id) {
      uni.navigateTo({
        url: '/pages/order/prompt/prompt?id=' + id });

    },
    getUpdate: function getUpdate() {var _this6 = this;
      if (uni.getStorageSync("access_token")) {
        (0, _goodsApi.getGoodNums)({
          status: "" }).
        then(function (data) {
          if (data.code == '1000') {
            _this6.counter = data.data.itemNum;
            _this6.isSure = false;
            _tips.default.tips('已成功加入进货单');
          } else {
            _this6.goodsTitle = res.message;
            _this6.isGoodsTitle = true;
            setTimeout(function () {
              _this6.isGoodsTitle = false;
            }, 1500);
          }
        });
      }
    },
    play: function play(item) {
      if (item.type == 3) {
        this.videoUrl = this.videoObj[item.sort];
        uni.navigateTo({
          url: '/pages/order/goodsDetail/video/video?url=' + this.videoUrl });

        //this.isPlayer = true;
      }

    },
    triShare: function triShare() {},
    changeBanner: function changeBanner(e) {
      this.cur = e.detail.current;
    },














    showConfirm1: function showConfirm1(e, nav) {
      if (!uni.getStorageSync('access_token')) {
        uni.navigateTo({
          url: '/pages/login/login' });

      } else {
        var formId = e.detail.formId;
        var data = {
          userId: uni.getStorageSync('uid'),
          appId: uni.getStorageSync('appid'),
          formId: formId

          // 获取formId
        };(0, _userApi.getSetFormId)(data);
        console.log('formId', formId);
        this.nav = nav;
        this.isSure = true;
      }

    },

    changeCollect: function changeCollect() {
      if (uni.getStorageSync('access_token')) {
        this.good.hasColletion = !this.good.hasColletion;
        if (this.good.hasColletion) {
          _tips.default.tips('已收藏');
        } else {
          _tips.default.tips('取消收藏');
        }
        this.good.hasColletion ?
        (0, _goodsApi.setCollect)({
          goodsId: this.good.goods.id,
          isLoading: 1 }) :

        (0, _goodsApi.removeCollect)({
          goodsId: this.good.goods.id,
          isLoading: 1 });

      } else {
        uni.navigateTo({
          url: '/pages/login/login' });

      }

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 199:
/*!*********************************************************************************************************************************!*\
  !*** D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=style&index=0&id=0b676e8a&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../ms/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsDetail.vue?vue&type=style&index=0&id=0b676e8a&lang=scss&scoped=true& */ 200);
/* harmony import */ var _ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_ms_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_ms_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_ms_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_ms_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_ms_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsDetail_vue_vue_type_style_index_0_id_0b676e8a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 200:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/zl/wholesale-uni-app/pages/order/goodsDetail/goodsDetail.vue?vue&type=style&index=0&id=0b676e8a&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[187,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/goodsDetail/goodsDetail.js.map