<template>
	<li class="sl-li ui-border-b" :class="classed">
		<div class="sl-content">
			<slot></slot>
		</div>
		<div class="sl-opts" v-if="delbtn" @click="handleDel">
			<span class="leh-bg-red leh-c-white" :id="name">删除</span>
		</div>
	</li>
</template>
<script>
	import cx from 'classnames'
	import $ from 'zepto'

	export default{
		props: {
			title: '',
			name: '',
			delbtn: Boolean,
			className: String
		},

		data () {
			return{
			}
		},

		ready() {
			var listItem = $('.sl-content'),
					listOpts = $('.sl-opts');

			var onthel = false, // 是否处于最左端
					isScroll = false, // 列表是否滚动状态
					btnL = 0, // 按钮个数
					initX = 0, // 初始X坐标
					initY = 0, // 初始Y坐标
					endX = 0, // 结束时X坐标
					endY = 0, // 结束时Y坐标
					moveX = 0, // listItem 移动的距离
					expandLi = null; // 是否存在展开的list

			var slideMaxWid = listOpts.width();

			var handleSlide = (function() {

				listItem.on('touchstart',function(e){

					// 判断有无已经展开的li，如果有，是否是当前的li，如果不是，将展开的li收起
					if( expandLi ){
						if( expandLi.parent().index()!==$(this).parent().index() ){
							// 判断当前list是左滑还是上下滑
							if( Math.abs(endY-initY) < Math.abs(endX-initX) ){
								e.preventDefault();
							}
							expandLi.css('-webkit-transform','translateX('+0+'px)');
						}
					}

					initX = e.targetTouches[0].pageX;
					initY = e.targetTouches[0].pageY;

					moveX = $(this).offset().left;

					$(this).on('touchmove',function(e){

						btnL = $(e.target).parents('.sl-li').find('.sl-opts').length;
						var curY = e.targetTouches[0].pageY;
						var curX = e.targetTouches[0].pageX;
						var X = curX - initX; // 不断获取移动的距离

						$(this).removeClass('animated');

						if( Math.abs(endY-initY)<Math.abs(endX-initX) ){

							e.preventDefault();
							if( moveX==0 ){
								if( X>0 ) {
									$(this).css('-webkit-transform','translateX('+0+'px)');
								}else if( X<0 ){

									if(btnL) {
										if( X<-slideMaxWid ) X=-slideMaxWid;
										$(this).css('-webkit-transform','translateX('+X+'px)');
									}else{
										$(this).css('-webkit-transform','translateX('+0+'px)');
									}
								}
							}
							// 已经处于最左
							else if( moveX < 0 ){
								onthel = true;
								if( X>0 ) { // 向右滑
									if( X-slideMaxWid>0 ){
										$(this).css('-webkit-transform','translateX('+0+'px)');
									}else{
										if(btnL) {
											$(this).css('-webkit-transform','translateX('+(X-slideMaxWid)+'px)');
										}else{
											$(this).css('-webkit-transform','translateX('+0+'px)');
										}

									}
								}else { // 左滑
									$(this).addClass('animated');
									$(this).css('-webkit-transform','translateX('+0+'px)');
								}
							}
						}else{
							isScroll = true;
						}

					})
				})

				listItem.on('touchend',function(e){

					btnL = $(e.target).parents('.sl-li').find('.sl-opts').length;
					endX = e.changedTouches[0].pageX;
					endY = e.changedTouches[0].pageY;
					var X = endX - initX;

					$(this).addClass('animated');
					//Slide to right or the distance of slide to left less than 20;
					if( X>-20||onthel||isScroll ){
						$(this).css('-webkit-transform','translateX('+0+'px)');
						onthel = false;
						isScroll = false;
					}else {
						if(btnL){
							$(this).css('-webkit-transform','translateX('+(-slideMaxWid)+'px)');
							expandLi = $(this);
						}else{
							$(this).css('-webkit-transform','translateX('+0+'px)');
							onthel = false;
							isScroll = false;
						}

					}
				})

			})();
		},

		methods: {
			handleDel($event) {
				this.$dispatch('handle-del',$event)
			}
		},

		computed: {
			classed () {
				return cx({
					[this.className]: !!this.className
				})
			}
		},

		components: {
		}
	}
</script>

<style>

</style>