<template>
	<view>
		<div class="edit">
			
			<div class="body">
				<div class="cf item">
					<span class="fll">收货人姓名</span>
					<input class="flr" maxlength='20' placeholder="真实姓名" v-model="address.name"  />
				</div>
				
				<div class="cf item">
					<span class="fll">手机号码</span>
					<input type="number" maxlength='12' class="flr" placeholder="输入手机号码" v-model="address.phone" />
				</div>
				
				<div class="cf item" @click="showPicker">
					<span class="fll">所在地区</span>
					<input class="flr" placeholder="请选择地址" disabled v-model="fullAddress" />
					<div class="tag-go">
						<img src="/static/img/tag-go.png" width="10" height="10" alt class="pr" />
					</div>
				</div>
				
				<div class="cf item itemLastChild">
					<span class="fll">详细地址</span>
					<input class="flr" maxlength='50' placeholder="如道路,小区门牌号等详细地址" v-model="address.address"></input>
				</div>
				
				<div class="mt10 cf set-default">
					<span class="fll fs30">设为默认地址</span>
					<RaBtn :val="address.def" class="pr flr" @radio="setDefault" />
				</div>

				<div class="del" v-if="id" @click="preDel(id)">删除地址</div>
			</div>
			<!-- <AreaSelector :show="isPicker" :close="close" @area="area"></AreaSelector> -->
			<div class="icon" @click="preSave">保存</div>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			 
			 <Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
		</div>
	</view>
</template>
<script>
	import RaBtn from '@/components/common/RaBtn'
	import Dialog from '@/components/common/Dialog'
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import validator from '@/utils/validator.js'
	import T from '@/utils/tips.js'
	import {
		getAddressById,
		postUserAddressInsert,
		postAddressUpdate,
		postAddressDelete
	} from '@/api/userApi.js'

	export default {
		data() {
			return {
				address: {
					name: '',
					phone: '',
					area: '',
					address: '',
					city: '',
					cityId: '',
					province: '',
					provinceId: '',
					region: '',
					regionId: '',
					def: 1
				},
				isPicker: false,
				fullAddress: '',
				id: '',
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				isShow: false,
				title:'确认保存地址吗?'
			};
		},
		components: {
			RaBtn,
			Dialog,
			mpvueCityPicker
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {

			let _this = this
			if (this.id) {
				let data = {
					id: this.id,
					isLoading:1
				}
				getAddressById(data).then(res => {
					if (res.code === '1000') {
						this.address = res.data
						this.fullAddress = res.data.province + ' ' + res.data.city + ' ' + res.data.region
					} else {
						T.tips(res.message || '根据ID获取地址信息失败')
						uni.navigateBack({
							delta:1
						})
					}
				}).catch(err => {
					T.tips(err.message || '根据ID获取地址信息失败')
					uni.navigateBack({
						delta:1
					})
				})
			}
		},
		methods: {
			
			showPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.fullAddress = e.label
				
				
				// full地址
				let arr = this.fullAddress.split('-');
				// 省
				this.address.province = arr[0]
				this.address.provinceId = e.ids[0]
				// 市
				this.address.city = arr[1]
				this.address.cityId = e.ids[1]
				// 区
				this.address.region = arr[2]
				this.address.regionId = e.ids[2]
			},
			// 验证用户姓名
			getName(e) {
				if (!validator.isNickName(e.detail.value)) {
					T.tips('姓名请输入英文字母或者汉字，限2-20个字符')
				}
			},
			// 验证手机号
			getPhone(e) {
				if (validator.isPhone(e.detail.value)) {
					T.tips('手机号请输入正确的手机号码')
				}
			},
			// 验证详细地址
			getAddressDetall(e) {
				if (!validator.isAddressDetall(e.detail.value)) {
					T.tips('详细地址请输入英文字母或者汉字，限5-120个字符')
				}
			},
			close() {
				this.isPicker = false
			},
			// 获取三级地址地址
			area(e) {
				if (this.isPicker) {
					if (e[2]) {
						// full地址
						this.fullAddress = e[0].name + ' ' + e[1].name + ' ' + e[2].name
						// 省
						this.address.province = e[0].name
						this.address.provinceId = e[0].id
						// 市
						this.address.city = e[1].name
						this.address.cityId = e[1].id
						// 区
						this.address.region = e[2].name
						this.address.regionId = e[2].id
					}
				}
			},
			areaChange() {},
			saveAd(data) {},
			preDel() {
				let _this = this
				uni.showModal({
				    title: '提示',
				    content: '确认删除该地址吗?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							_this.delAd()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			delAd() {
				// api delete
				let data = {
					id: this.id
				}
				postAddressDelete(data).then(res => {
					if (res.code === '1000') {
						uni.navigateBack({
							delta:1
						})
					} else {
						T.tips(res.message || '删除地址失败')
					}
				}).catch(err => {
					T.tips(err.message || '删除地址失败')
				})
			},
			setDefault(data) {
				this.address.def = data
			},
			preSave(data) {
				console.log(this.address)
				// 数据验证
				if (!validator.isNickName(this.address.name)) {
					T.tips('请输入英文字母或者汉字，限2-20个字符')
					return false
				}
				if (validator.isPhone(this.address.phone)) {
					T.tips('请输入正确的手机号码')
					return false
				}
				if (!validator.isAddressDetall(this.address.address)) {
					T.tips('请输入英文字母或者汉字，限5-120个字符')
					return false
				}
				// 保存地址
				this.isShow = true
			},
			doCancel(){
				this.isShow = false 
			},
			doConfirm(e){
				this.isShow = false
				if (this.id) {
					postAddressUpdate(this.address).then(res => {
						if (res.code === '1000') {
							uni.navigateBack({
								delta:1
							})
						} else {
							T.tips(res.message || '地址更新错误')
						}
					}).catch(err => {
						T.tips(err.message || '地址更新错误')
					})
				} else {
					// 保存地址
					postUserAddressInsert(this.address).then(res => {
						if (res.code === '1000') {
							uni.navigateBack({
								delta:1
							})
						} else {
							T.tips(res.message || '地址新增错误')
						}
					}).catch(err => {
						T.tips(err.message || '地址新增错误')
					})
				}
			},
		}
	}
</script>


<style lang="scss" scoped>
.edit {
	.icon{
		width: 640upx;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		background-color: #d9d9d9;
		border-radius: 40upx;
		font-size: 32upx;
		margin: 40upx auto auto;
		background: #FE3B0B;
		position: fixed;
		bottom: 20upx;
		left: 50%;
		margin-left: -320upx;
	}
	.item{
		background: #fff;
		height: 100upx;
		line-height: 100upx;
		padding: 0 30upx;
		position: relative;
		font-size: 30upx;
		input{
			height: 98upx;
			line-height: 98upx;
			border-bottom: 1upx solid #f0f0f0;
			width: 500upx;
			color: #666;
		}
		
		.tag-go{
			position: absolute;
			right: 30upx;
		}
	}
	.itemLastChild {
		input{
			border-bottom: none !important;
		}
	}
	.tag-go{
		width: 22upx;
		height: 22upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
  .set-default{
    height: 100upx;
    line-height: 100upx;
    background: #fff;
    padding: 0 30upx;
    .flr{
      position: relative;
      top: 32upx;
    }
  }
  .pr {
    transform: translateX(-5upx);
  }
  .mt10 {
    margin-top: 10upx;
  }
  min-height: 100vh;
  background-color: #f5f5f5;
  .body {
    
  }
  .del {
    @extend .mt10;
    font-size: 28upx;
    line-height: 100upx;
    color: #FE3B0B;
    text-align: center;
    background-color: #fff;
  }
}
</style>
