<script>
export default {
  onLaunch: function() {
    let navigator = navigator || null
    if (navigator && navigator.userAgent.match(/MicroMessenger/i)) {
      uni.setStorageSync('isWxWeb',navigator.userAgent.match(/MicroMessenger/i))
      let search = location.search;
      let reg = search.match(/code=(.*?)(&|$)/);
      let code = reg === null ? null : res[1];
      if (!uni.getStorageSync('openId')) {
        if (!code) {
          // let domain = document.domain;
          let domain = 'wsm.qinlvny.com/'
          let redirect = encodeURIComponent('http://' + domain + '?#/pages/login/binding/binding');
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx638cfb37341c1874&redirect_uri=${redirect}&response_type=code&scope=snsapi_base&state=#wechat_redirect`;
        }
      }
      return;
    }
    uni.removeStorageSync('isWxWeb',navigator.userAgent.match(/MicroMessenger/i))
    // console.log('App Launch');
    // 获取 appid
    // uni.setStorageSync('appid', 'wxce7493e1240543c2')
    // console.log(uni.getSystemInfoSync());
    // 判断设备  android:10 , ios:2 , 运行在开发者工具上: 3
    switch (uni.getSystemInfoSync().platform) {
      case 'android':
        console.log('运行Android上');
        uni.setStorageSync('platformAndroid', '10');
        switch (uni.getSystemInfoSync().brand) {
          case 'OPPO':
            console.log('运行OPPO上');
            uni.setStorageSync('platform', '1');
            break;
          case 'HUAWEI':
            console.log('运行华为上');
            uni.setStorageSync('platform', '4');
            break;
          case 'Xiaomi':
            console.log('运行小米 MI 6上');
            uni.setStorageSync('platform', '5');
            break;
        }
        break;
      case 'ios':
        console.log('运行iOS上');
        uni.setStorageSync('platform', '2');
        break;
      default:
        console.log('运行在开发者工具上');
        uni.setStorageSync('platform', '3');
        break;
    }

    // 版本更新 (微信小程序)
    // #ifdef MP-WEIXIN
    if (uni.getUpdateManager) {
      const updateManager = uni.getUpdateManager();
      console.log('updata version', updateManager);
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      });
      updateManager.onUpdateReady(function() {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
    }
    // #endif
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/*每个页面公共css */
@import './asset/css/base.scss';
@import './asset/css/common.scss';
</style>
