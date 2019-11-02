<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item class="swiper-item" v-for="(item,index) in imgs" :key="index">
				<view class="item">
					<image class="img" :src="item.imgUrl"></image>
					<image class='img-icon' src="../../static/img/play.png" @click="play"></image>
					<!-- <video class="video" @play="play" :src="list[index].imgUrl" controls></video> -->
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default  {
		name: 'pay',
		props: {
			list: {
				type: Array
			},
			imgs: {
				type: Array
			},
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				duration: 500
			}
		},
		methods: {
			play(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		width: 100%;
		height: 750upx;
		.swiper-item{
			.item{
				width: 100%;
				height: 750upx;
				.img{
					width: 100%;
					height: 750upx;
				}
				.img-icon{
					width: 100upx;
					height: 100upx;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: -50upx;
					margin-top: -50upx;
					z-index: 99999;
				}
				.video{
					width: 100%;
					height: 750upx;
					position: absolute !important;
					top: 0;
					left: 0;
				}
			}
		}
	}
</style>
