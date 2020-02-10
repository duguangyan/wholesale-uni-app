<template>
  <view class="pro-publish">
    <view class="info">
      <view class="base-title">货品信息</view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">采购名称</view>
        <view :class="['input', search.categoryId ? '' : 'tips']">{{ search.categoryId || '请选择' }}</view>
        <image src="/static/img/tag-go.png"></image>
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">采购品种</view>
        <input class="input" v-model="search.variety" placeholder="如:烟薯25" />
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">采购数量</view>
        <view :class="['input', search.unit ? '' : 'tips']" @click="isUnit = true">{{ search.unit || '斤' }}</view>
        <image src="/static/img/tag-go.png"></image>
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">规格属性</view>
        <input class="input" v-model="search.receiveProvinceId" placeholder="如:3两以上紫皮黄心" />
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">产&emsp;&emsp;地</view>
        <view :class="['input', search.prodRegionId ? '' : 'tips']" @click="isArea = true">{{ search.prodRegionId ? prodArea : '全国' }}</view>
        <image src="/static/img/tag-go.png"></image>
      </view>
    </view>

    <view class="info">
      <view class="base-title">其他信息</view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">包装要求</view>
        <input class="input" placeholder="如:网套、纸箱、塑料筐" readonly />
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">发货方式</view>
        <input type="text" class="input" placeholder="如:整车" v-model="search.deliveryMethod" />
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">收&ensp;货&ensp;地</view>
        <view @click="isRecieve = true" :class="['input', search.receiveRegionId ? '' : 'tips']">{{ search.receiveRegionId ? recArea : '请选择' }}</view>
        <image src="/static/img/tag-go.png"></image>
      </view>
      <view class="base-item">
        <view class="star">*</view>
        <view class="name">补充说明</view>
        <input type="text" class="input" placeholder="其他说明" v-model="search.remark" />
      </view>
    </view>

    <view class="publish" @click="publish">发布采购</view>

    <!-- 产地选择 -->
    <view v-if="isArea" class="dialog">
      <view class="mask" @click="isArea = false"></view>
      <view class="body">
        <picker-view indicator-class="picker" :value="prodVals" @change="changeArea">
          <picker-view-column>
            <view class="item" v-for="(province, index) in areaes[0]" :key="index">{{ province.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(city, index) in areaes[1]" :key="index">{{ city.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(region, index) in areaes[2]" :key="index">{{ region.name }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>

    <!-- 单位选择 -->
    <view v-if="isUnit" class="dialog">
      <view class="mask" @click="isUnit = false"></view>
      <view class="body"></view>
    </view>

    <!-- 品种选择 -->
    <view v-if="isVariety" class="dialog">
      <view class="mask" @click="isVariety = false"></view>
      <view class="body"></view>
    </view>

    <!-- 收货地 -->
    <view v-if="isRecieve" class="dialog">
      <view class="mask" @click="isRecieve = false"></view>
      <view class="body">
        <picker-view indicator-class="picker" :value="recVals" @change="changeRecieve">
          <picker-view-column>
            <view class="item" v-for="(province, index) in areaes2[0]" :key="index">{{ province.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(city, index) in areaes2[1]" :key="index">{{ city.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(region, index) in areaes2[2]" :key="index">{{ region.name }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
import { newPublish, republish } from '@/api/procurement.js';
import { getProvinces } from '@/api/areaApi.js';
import Toast from '@/utils/tips.js';
var vm = {
  data() {
    vm = this;
    return {
      recArea: '',
      prodArea: '',
      prodVals: /*产地当前下标*/ [0, 0, 0],
      recVals: /*产地当前下标*/ [0, 0, 0],
      isArea: /*产地选择*/ false,
      isUnit: /*单位选择*/ false,
      isVariety: /*品种选择*/ false,
      isRecieve: /*收货地小玄子*/ false,
      search: {
        auditTim: '', //审核时间
        categoryId: '', //分类id
        createTime: '', //创建时间
        creatorId: '', //发布人ID
        deliveryMethod: '', //发货方式
        id: '', //id
        packRequire: '', //包装要求
        prodCity: '', //生产市
        prodCityId: '', //生产市ID
        prodProvince: '', //生产省
        prodProvinceId: '', //生产省ID
        prodRegion: '', //生产县/区
        prodRegionId: '', //生产县/区ID
        quantity: '', //数量
        receiveCity: '', //收货市
        receiveCityId: '', //收货市ID
        receiveProvince: '', //收货省
        receiveProvinceId: '', //收货省ID
        receiveRegion: '', //收货县/区
        receiveRegionId: '', //收货县/区ID
        remark: '', //补充说明
        replyContent: '', //审核回复内容
        specAttributes: '', //规格属性
        status: '', //状态 1 新建 2 审核中 3 审核通过（上架） 4 审核不通过 5 下架
        unit: '', //单位
        variety: '' //品种
      },
      areaes: [[], [], []],
      areaes2: [[], [], []],
      rule: {
        variety: {
          required: true
        },
        categoryId: {
          required: true
        },
        unit: {
          required: true
        },
        specAttributes: {
          required: true
        },
        prodRegionId: {
          required: true
        },
        receiveRegionId: {
          required: true
        },
        deliveryMethod: {
          required: true
        },
        remark: {
          required: true
        }
      }
    };
  },
  onLoad(options) {
    vm.search.id = options.id;
    // 获取省
    getProvinces({
      parentId: 0
    }).then(data => {
      let list = [...vm.areaes];
      list[0] = data.data;
      vm.areaes = [...list];
      vm.areaes2 = [...list];

      // 获取市
      getProvinces({
        parentId: data.data[0].id
      }).then(data => {
        let list = vm.areaes;
        list[1] = [...data.data];
        vm.areaes = [...list];
        vm.areaes2 = [...list];

        // 县
        getProvinces({
          parentId: data.data[0].id
        }).then(data => {
          let list = vm.areaes;
          list[2] = [...data.data];
          vm.areaes = [...list];
          vm.areaes2 = [...list];
        });
      });
    });
  },
  methods: {
    changeArea(e) {
      let vals = e.detail.value;
      let level = 0;
      // let curIndex = 0

      // 检测是那一列变化
      for (let i = 0; i < 3; i++) {
        if (vm.prodVals[i] != vals[i]) {
          // curIndex = vals[i];
          level = i;
          vm.prodVals = [...vals];
          break;
        }
      }

      // 省变化清空县列表，县变化不刷新
      if (level == 0) {
        // 更新市
        getProvinces({
          parentId: vm.areaes[0][vals[0]].id
        }).then(data => {
          vm.areaes.splice(1, 1, [...data.data]);

          // 同步更新县
          getProvinces({
            parentId: vm.areaes[1][vals[1]].id
          }).then(data => {
            vm.areaes.splice(2, 1, [...data.data]);
            vm.updateArea();
          });
        });
      } else if (level == 1) {
        // 同步更新县
        getProvinces({
          parentId: vm.areaes[1][vals[1]].id
        }).then(data => {
          vm.areaes.splice(2, 1, [...data.data]);
          vm.updateArea();
        });
      } else {
        vm.updateArea();
      }
    },
    changeRecieve(e) {
      let vals = e.detail.value;
      let level = 0;
      // let curIndex = 0

      // 检测是那一列变化
      for (let i = 0; i < 3; i++) {
        if (vm.recVals[i] != vals[i]) {
          // curIndex = vals[i];
          level = i;
          vm.recVals = [...vals];
          break;
        }
      }

      // 省变化清空县列表，县变化不刷新
      if (level == 0) {
        // 更新市
        getProvinces({
          parentId: vm.areaes2[0][vals[0]].id
        }).then(data => {
          vm.areaes2.splice(1, 1, [...data.data]);

          // 同步更新县
          getProvinces({
            parentId: vm.areaes2[1][vals[1]].id
          }).then(data => {
            vm.areaes2.splice(2, 1, [...data.data]);
            vm.updateRecieve();
          });
        });
      } else if (level == 1) {
        // 同步更新县
        getProvinces({
          parentId: vm.areaes2[1][vals[1]].id
        }).then(data => {
          vm.areaes2.splice(2, 1, [...data.data]);
          vm.updateRecieve();
        });
      } else {
        vm.updateRecieve();
      }
    },
    updateRecieve() {
      vm.search.receiveProvince = vm.areaes2[0][vm.recVals[0]].name;
      vm.search.receiveProvinceId = vm.areaes2[0][vm.recVals[0]].id;

      vm.search.receiveCity = vm.areaes2[1][vm.recVals[1]].name;
      vm.search.receiveCityId = vm.areaes2[1][vm.recVals[1]].id;

      vm.search.receiveRegion = vm.areaes2[2][vm.recVals[2]].name;
      vm.search.receiveRegionId = vm.areaes2[2][vm.recVals[2]].id;

      vm.recArea = '' + vm.search.receiveProvince + vm.search.receiveCity + vm.search.receiveRegion;
    },
    updateArea() {
      vm.search.prodProvince = vm.areaes[0][vm.prodVals[0]].name;
      vm.search.prodProvinceId = vm.areaes[0][vm.prodVals[0]].id;

      vm.search.prodCity = vm.areaes[1][vm.prodVals[1]].name;
      vm.search.prodCityId = vm.areaes[1][vm.prodVals[1]].id;

      vm.search.prodRegion = vm.areaes[2][vm.prodVals[2]].name;
      vm.search.prodRegionId = vm.areaes[2][vm.prodVals[2]].id;

      vm.prodArea = '' + vm.search.prodProvince + vm.search.prodCity + vm.search.prodRegion;
    },
    publish() {
      let isAvailble = true;
      for (let k in vm.rule) {
        if (vm.rule[k].required) {
          isAvailble = isAvailble && vm.search[k] != '';
        }
      }

      if (!isAvailble) {
        return Toast.tips('请正确填写信息');
      }

      if (vm.search.id) {
        // 重新发布
        republish(Object.assign({}, vm.search)).then(data => {});
      } else {
        // 新发布
        newPublish(Object.assign({}, vm.search)).then(data => {});
      }
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.pro-publish {
  .base-title {
    color: #000;
    font-size: 30upx;
  }
  .base-item {
    padding: 30upx 0 30upx 20upx;
    position: relative;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24upx;
    border-bottom: 1px solid #f0f0f0;
    .star {
      font-weight: bold;
      color: #fe3b0b;
      font-size: 24upx;
      position: absolute;
      left: 0;
      top: 34upx;
    }
    .input {
      margin-left: 44upx;
      flex-grow: 1;
      border: none;
      outline: none;
      font-size: 24upx;
      &.tips {
        color: #999;
      }
    }
    input::place-holder {
      color: #999;
      font-size: 24upx;
    }
    image {
      width: 18upx;
      height: 18upx;
    }
  }
  .info {
    margin-top: 20upx;
    padding: 30upx 30upx 0 30upx;
    background: #fff;
  }
  .publish {
    margin: 60upx auto auto auto;
    width: 640upx;
    line-height: 80upx;
    text-align: center;
    color: #fff;
    border-radius: 80upx;
    background: #fe3b0b;
    font-size: 32upx;
  }
  .body {
    bottom: 0;
    position: fixed;
    left: 0;
    width: 100%;
  }
  uni-picker-view {
    height: 300px;
    background: #fff;
  }
  uni-picker-view-column {
    text-align: center;
  }
  .uni-picker-view-content > * {
    font-size: 28upx;
  }
}
</style>
