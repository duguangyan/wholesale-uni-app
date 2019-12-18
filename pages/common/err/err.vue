<template>
	<view>
		    <div class="err">
		      <img :src="img" alt="图片">
		      <div class="p fs28">{{text}}</div>
		      <div class="btn" @click="goBack">刷新</div>
		    </div>
		  </div>
	</view>
</template>

<script>
	  import { request } from '@/api/request.js'
	  import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				title: '服务器出错了',
				        img: '../../../static/img/icon-serveerr.png',
				        text: '服务器崩溃了请等待下再刷新',
						from:'',
						redirect:''
			};
		},
		onLoad(options) {
			this.from = options.from
			if(options.redirect){
				this.redirect = options.redirect
			}
			if (this.from === 'unonline') {
				this.title = '网络出错了'
				this.url = '../../../static/img/icon-connecterr.png'
				this.text = '网络出错误，飞走了\n' +
				'刷新下试试'
			  }
		},
		onShow() {
			uni.setStorageSync('err',1)
		},
		
		methods: {
		      goBack() {
		        if (this.from == 'unonline') {
					uni.onNetworkStatusChange(function (res) {
						if(res.isConnected) {
							uni.navigateBack({
								delta:1
							})
						}else{
							T.tips('网络异常,刷新失败')
						}
					});
					

		        } else {
		          let redirect = JSON.parse(this.redirect)
		          let data = {
		            url: redirect.url,
		            method: redirect.method,
		            data:redirect.params
		          }
		          if (redirect.type) {
		            data.type = redirect.type
		          }
		          request(data).then(res => {
		            if (res.code === '1000') {
					  uni.setStorageSync('err',0)
		              uni.navigateBack({
		              	delta:1
		              })
		            } else {
						T.tips(res.message || '刷新失败')
		            }
		          }).catch(err => {
		            T.tips(err.message || '刷新失败')
		          })
		        }
		
		      }
		    }
	}
</script>


<style lang="scss" scoped>
  .err{
    text-align: center;
	height: 100vh;
	background: #fff;
    >img{
      margin-top: 200upx;
      width: 240upx;
      height: 240upx;
    }
    .p{
      color: #999;
      width: 220upx;
      margin: 0 auto;
      font-size: 24upx;
    }
    .btn{
      width: 140upx;
      height: 60upx;
      line-height: 60upx;
      margin: 0 auto;
      background: #FE3B0B;
      border-radius: 60upx;
      color: #fff;
      margin-top: 40upx;
      font-size: 28upx;
    }
  }
</style>
