<template>
	<mt-header fixed :title="selected" class-name="leh-bg-green" v-if="selected==='个人中心' ? false : true"></mt-header>
	<mt-content class-name="page-tabbar " :class="[{'leh-bg-grey-body' : selected==='个人中心'},{'doctor-index' : selected==='我的医生'}]">
		<div class="page-wrap consult-padding-bottom">
			<mt-tab-container :active.sync="selected">
				<mt-tab-container-item id="在线门诊">
					<div class="mint-tab-container-item">
						<div class="consult-tap-box">
							<mt-tab-item :class="{'leh-guide': firstIn}" v-link="{path: '/online/photo', replace: true}">
								<span slot="icon"><span class="mint-tab-item-icon"></span></span>
								拍照上传

								<div class="consult-tip-img-box">
									<img src="../assets/img/consult-index-tip.png"/>
								</div>
							</mt-tab-item>

							<div class="leh-black-shade"></div>
							<mt-tab-item @click="showpopup = true">
								<span slot="icon"><span class="mint-tab-item-icon"></span></span>
								用药提醒
							</mt-tab-item>
							<mt-tab-item v-link="{path: '/online/feedback', replace: true}">
								<span slot="icon"><span class="mint-tab-item-icon"></span></span>
								留言咨询
							</mt-tab-item>
						</div>
						<div class="leh-null-box"></div>
						<div class="consult-list-box">
							<div class="page-cell consult-list-title">
								<a class="mint-cell">
									<span class="mint-cell-mask"></span>
									<label class="mint-cell-title">
										<span class="mint-cell-text leh-c-green">我的单据</span>
									</label>
									<div class="mint-cell-value"></div>
								</a>
							</div>
							<div class="page-cell consult-list-main">
								<a class="mint-cell" v-link="{path: '/online/bill', query: {actives: 'turn'}, replace: true}">
									<span class="mint-cell-mask iconfont icon-wx-loading"></span>
									<label class="mint-cell-title">
										<span class="mint-cell-text" :class="{'leh-red-dot': unreadInfo.fileQty !== 0}">待转换</span>
									</label>
									<div class="consult-list-text">
										<span>转换中<span v-text="recordInfo.fileProcessingQty"></span></span>
										<span class="leh-c-grey-tint">丨</span>
										<span>需处理<span v-text="recordInfo.fileFailgQty"></span></span>
									</div>
									<div class="mint-cell-value">
										<span class="iconfont icon-wx-arr-right"></span>
									</div>
								</a>
								<a class="mint-cell" v-link="{path: '/online/bill', query: {actives: 'case'}, replace: true}">
									<span class="mint-cell-mask iconfont icon-wx-sick"></span>
									<label class="mint-cell-title">
										<span class="mint-cell-text" :class="{'leh-red-dot': unreadInfo.medicalQty !== 0}">病历</span>
									</label>
									<div class="consult-list-text">
										<span>昨天转换<span v-text="recordInfo.medicalCreatedQty"></span></span>
									</div>
									<div class="mint-cell-value">
										<span class="iconfont icon-wx-arr-right"></span>
									</div>
								</a>
								<a class="mint-cell" v-link="{path: '/online/bill', query: {actives: 'checked'}, replace: true}">
									<span class="mint-cell-mask iconfont icon-wx-check"></span>
									<label class="mint-cell-title">
										<span class="mint-cell-text" :class="{'leh-red-dot': unreadInfo.chkQty !== 0}">检查单</span>
									</label>
									<div class="consult-list-text">
										<span>昨天转换<span v-text="recordInfo.chkCreatedQty"></span></span>
									</div>
									<div class="mint-cell-value">
										<span class="iconfont icon-wx-arr-right"></span>
									</div>
								</a>
							</div>
						</div>
						<div class="leh-null-box"></div>
						<div class="consult-list-box">
							<div class="page-cell consult-list-title">
								<a class="mint-cell" v-link="{path: '/online/scheme', replace: true}">
									<span class="mint-cell-mask"></span>
									<label class="mint-cell-title">
										<span class="mint-cell-text leh-c-green">我的日程</span>
									</label>
									<div class="mint-cell-value">
										<span class="leh-c-red leh-fs-twelve">有新日程更新啦~点击→</span>
										<span>更多</span>
									</div>
									<span class="iconfont icon-wx-arr-right"></span>
								</a>
							</div>
							<!--无日程-->
							<div class="consult-list-not-task" v-if="rechecks.length === 0">
								<div class="breathe-btn">+</div>
								<p>暂无日程添加</p>
							</div>
							<!--有日程-->
							<div class="page-cell consult-list-main">
								<mt-cell
										v-for="items in rechecks"
										:title="items.date"
										:value="items.recheckItem"
										:istitle="true"
										v-link="{path: '/online/schemeAdd', query: {id: items.id, isEdit: true}, replace: true}"
										blackfont>
								</mt-cell>
							</div>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="我的医生">
					<div class="page-cell doctor-index-box">
						<div class="leh-null-data" v-if="!doctorItems.length">暂无数据</div>
						<a class="mint-cell" v-for="items in doctorItems" v-link="{path: '/mydoctor/doctor', query:{id: items.id}, replace: true}">
									<span class="mint-cell-mask" :class="{'leh-red-dot': items.unread}">
										<div class="doctor-img">
											<img :src="items.photo" v-if="items.photo !== null"/>
											<img src="../assets/img/private.jpg" v-if="items.photo === null"/>
										</div>
									</span>
							<div class="mint-cell-title">
										<span class="mint-cell-text">
											<span>{{ items.name }}</span>
											<span>{{ items.title }}</span>
											<span class="leh-c-green">{{ items.custName }}</span>
										</span>
								<span class="mint-cell-label leh-c-black">{{ items.hosipitalName }}</span>
							</div>
							<div class="mint-cell-value"></div>
						</a>

						<div class="page-infinite-loading document-index-load-tap" v-if="pageDoctorNum*10 <= pageDoctorTotal">
							<mt-button size="large" type="transparent" icon="load" @click="moreDoctor" >点击加载更多</mt-button>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="个人中心" class="consult-container-item-hight">
					<div class="center-head" v-link="'/user/info'">
						<div class="center-head-img">
							<img :src="personeInfo.patientPhoto" v-if="personeInfo.patientPhoto !== null"/>
							<img src="../assets/img/private.jpg" v-if="personeInfo.patientPhoto === null"/>
						</div>
						<p class="center-name">{{ personeInfo.patientName }}</p>
					</div>
					<div class="center-content">
						<div class="page-cell">
							<mt-cell title="医生公告" icon="announcement" icons="arr-right" istitle is-icon :reddot="personeInfo.drNoticeUnread" v-link="{path: '/user/notice', replace: true}"></mt-cell>
							<mt-cell title="记录中心" icon="note" icons="arr-right" istitle is-icon :reddot="personeInfo.messageUnread" v-link="{path: '/user/note', replace: true}"></mt-cell>
							<!--<mt-cell title="疾病相关" icon="disease" icons="arr-right" istitle is-icon v-link="{path: '/user/sick', replace: true}"></mt-cell>-->
							<mt-cell title="关于随访家园" icon="link" icons="arr-right" istitle is-icon v-link="{path: '/user/about', replace: true}"></mt-cell>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<mt-tabbar :selected.sync="selected" class-name="consult-tabbar-box">
			<mt-tab-item id="在线门诊">
				<span slot="icon"><span class="mint-tab-item-icon"></span></span>
				在线门诊
			</mt-tab-item>
			<mt-tab-item id="我的医生">
				<span slot="icon"><span class="mint-tab-item-icon"></span></span>
				我的医生
			</mt-tab-item>
			<mt-tab-item id="个人中心">
				<span slot="icon"><span class="mint-tab-item-icon"></span></span>
				个人中心
			</mt-tab-item>
		</mt-tabbar>


	</mt-content>

	<div class="page-popup">
		<mt-popup v-show="showpopup" position="top" class="mint-popup-2" :modal="false">
			<p v-text="tips"></p>
		</mt-popup>
	</div>
</template>

<script type="text/babel">

	import MtContent from '../components/content'
	import MtHeader from '../components/header.vue'
	import MtButton from '../components/button.vue'
	import MtTabContainer from '../components/tab-container.vue'
	import MtTabContainerItem from '../components/tab-container-item.vue'
	import MtTabbar from '../components/tabbar.vue'
	import MtTabItem from '../components/tab-item.vue'
	import MtCell from '../components/cell.vue'
	import MtPopup from '../components/popup.vue'
	import {getJson} from 'util'

	export default{
		name: 'page-tabbar',
		route: {
			data ({to, next}) {

				let _self = this

				_self.isDoctorPage = to.query.tohome || false
				_self.isMydoctor = to.query.mydoctor
				if(_self.isDoctorPage) return // 是否从列表页返回

				// 在线门诊
				getJson('api/records/getindex', '', (rsp)=>{
					_self.unreadInfo = rsp.unreadInfo
					_self.recordInfo = rsp.recordInfo
					_self.rechecks = rsp.rechecks

					// 个人信息
					getJson('api/records/patientIndex', '', (rsp_info)=>{

						_self.personeInfo = rsp_info

						// 我的医生
						_self.pageDoctorNum = 1
						_self.getDoctors()
					}, _self)
				},_self)

				next()

			}
		},

		data() {
			return {
				list: [],
				loading: false,
				allLoaded: false,
				wrapperHeight: 0,
				selected: '在线门诊',
				istitle: true,
				showpopup: false,
				isMydoctor: false, // 访问我的医生
				tips: '用药提醒功能，暂未开放！',
				tasks: [],
				personeInfo: '', // 个人信息
				unreadInfo: {}, // 红点
				recordInfo: {}, // 我的单据处理与未处理数据
				rechecks: [], // 我的日程
				doctorItems: [], // 我的医生
				pageDoctorTotal: 0,   // 我的医生列表总数
				pageDoctorNum: 1,  // 我的医生列表页码
				isDoctorPage: false, // 是否由我的医生返回
				firstIn: false // 是否第一次进入
			};
		},

		ready() {

			if(this.isMydoctor) {
				this.selected = '我的医生'
			}
		},

		methods: {
			// 我的医生列表
			getDoctors () {

				let _self = this
				getJson('api/doctors/index?pageIndex=1&pageSize=10', '', (rsp)=>{

					_self.doctorItems = rsp.items
					_self.pageDoctorTotal = rsp.totalQty
				},_self)
			},

			// 获取更多医生列表信息
			moreDoctor () {
				let _self = this

				if(_self.pageDoctorNum*10 >= _self.pageDoctorTotal) {
					return
				}
				_self.pageDoctorNum = _self.pageDoctorNum + 1
				getJson('api/doctors/index?pageIndex='+ this.pageDoctorNum +'&pageSize=10', '', (rsp)=>{

					// 合并数组
					_self.doctorItems = _self.doctorItems.concat(rsp.items)
				},_self)
			}
		},


		watch: {
			showpopup(val) {
				if (val) {
					setTimeout(() => {
						this.showpopup = false;
					}, 2000);
				}
			}
		},

		components: {
			MtContent,
			MtHeader,
			MtButton,
			MtTabContainer,
			MtTabContainerItem,
			MtTabbar,
			MtTabItem,
			MtCell,
			MtPopup
		}
	}


</script>

<style>
	/** 在线门诊 **/
	.consult-tabbar-box>.mint-tab-item{background-color: #fff;}
	.consult-tabbar-box>.mint-tab-item.is-selected{background-color: #fff;color: #1faa2b;}
	.consult-tabbar-box>.mint-tab-item.is-selected .mint-tab-item-label{color: #1faa2b;}
	.consult-tabbar-box>.mint-tab-item .mint-tab-item-icon{background: url(../assets/img/index-nav.png) no-repeat;background-size: 75px auto;display: inline-block;}
	.consult-tabbar-box .mint-tab-item:nth-of-type(2) .mint-tab-item-icon{background-position:-26px 0;}
	.consult-tabbar-box .mint-tab-item:nth-of-type(3) .mint-tab-item-icon{background-position:-53px 0;}
	.consult-tabbar-box .mint-tab-item:nth-of-type(1).is-selected .mint-tab-item-icon{background-position:0 -28px;}
	.consult-tabbar-box .mint-tab-item:nth-of-type(2).is-selected .mint-tab-item-icon{background-position:-26px -28px;}
	.consult-tabbar-box .mint-tab-item:nth-of-type(3).is-selected .mint-tab-item-icon{background-position:-53px -28px;}
	.consult-tap-box{display: flex;text-align: center;background-color:#fff;padding: 10px 0;}
	.consult-tap-box .mint-tab-item-icon{width: 33px;height: 33px;display:inline-block;border-radius: 50%;overflow: hidden;background: url(../assets/img/consult-nav-ico.png) no-repeat;background-size: auto 33px;}
	.consult-tap-box .mint-tab-item:nth-of-type(2) .mint-tab-item-icon{background-position-x: -39px;}
	.consult-tap-box .mint-tab-item:nth-of-type(3) .mint-tab-item-icon{background-position-x: -79px;}
	.consult-tap-box .mint-tab-item-label{font-size: 14px;}
	.consult-list-title .mint-cell:before,.consult-list-title .mint-cell:after{border: 0;}
	.consult-list-title .mint-cell-value span:nth-of-type(2){font-size: 14px;margin-left: 5px;}
	.consult-list-main .mint-cell{font-size: 14px;}
	.consult-list-main .mint-cell:nth-last-of-type(1):before{border: 0;}
	.consult-list-main .mint-cell-mask{margin-right: 10px;}
	.consult-list-main .mint-cell-mask.icon-wx-loading{color: #fcdb57;}
	.consult-list-main .mint-cell-mask.icon-wx-sick{color: #faa28d;}
	.consult-list-main .mint-cell-mask.icon-wx-check{color: #81d9ff;}
	.consult-list-main .mint-cell-value .icon-wx-arr-right{color: #aaa;}
	.consult-list-text{flex: 2;}
	.consult-list-text span span{margin-left: 12px;}
	.consult-list-not-task{height: 141px;background-color: #fff;border-top: 1px solid #e5e5e5;}
	.consult-list-not-task p{text-align: center;font-size: 12px;color: #363636;}
	.consult-padding-bottom{padding-bottom: 55px;}
	.consult-padding-bottom .mint-tab-container-wrap,.consult-container-item-hight{height: 100%;}
	.consult-list-title .icon-wx-arr-right{color: #fff;background-color: #e5e5e5;font-size: 12px;padding: 2px 0;margin-left: 5px;}
	/*我的医生首页*/
	.doctor-index-box .mint-cell:after{border: 0;}
	.doctor-index-box .mint-cell:before{left: 10px;}
	.doctor-img{width: 50px;height: 50px;border-radius: 50%;overflow:hidden;margin-right: 10px;}
	.doctor-index-box .mint-cell-mask.leh-red-dot:before{content: '';position: absolute;top: 0px;right: 10px;width: 8px;height: 8px;border-radius: 50% 50% 50% 50%;background-color: #f92b2b;}
	.doctor-index-box .mint-cell-text span:nth-of-type(2){font-size: 12px;margin: 0 5px;}
	.doctor-index-box .mint-cell-text span:nth-of-type(3){font-size: 13px;}
	.doctor-index-box .mint-cell-label{font-size: 14px;}
	.doctor-index {bottom: 100px}
	.document-index-load-tap .mint-button--transparent{text-align: center;}
	/*个人中心*/
	.center-head{height: 165px;width:100%;background-color:#1faa2b;position: fixed;left: 0;}
	.center-head-img{width: 55px;height: 55px;border: 1px solid #fff;border-radius: 50%;margin: 50px auto 15px;overflow: hidden;text-align: center;}
	.center-head-img img{width: 45px;height: 45px;border-radius: 50%;margin-top: 4px;}
	.center-name{text-align: center;font-size: 16px;color: #fff;}
	.center-content{padding-top: 165px;}
	.center-content .mint-cell:after,
	.center-content .mint-cell:nth-of-type(3):before,
	.center-content .mint-cell:nth-of-type(4):before{border: 0;}
	.center-content .mint-cell:nth-of-type(2){margin-bottom: 8px;}
	.center-content .mint-cell:before{left: 10px;}
	.center-content .mint-cell-text{font-size: 14px;}
	.center-content .mint-cell-mask{margin-right: 10px;}
	.center-content .icon-wx-announcement{color: #ff9992;}
	.center-content .icon-wx-note{color: #76c0ff;}
	.center-content .icon-wx-disease{color: #8ad650;}
	.center-content .icon-wx-link{color: #ffb67f;}
	.center-content .mint-cell-value .icon-wx-arr-right{color: #aaa;}

	.consult-tip-img-box{display:none;position: absolute;top: 30%;left: 75%;z-index: 7;width: 200%;}
	.consult-tap-box .mint-tab-item~.leh-black-shade{display: none;}
	.leh-guide.mint-tab-item{position: relative;z-index: 6;}
	.leh-guide .mint-tab-item-label{color: #fff;}
	.leh-guide .consult-tip-img-box,.leh-guide~.leh-black-shade{display: block !important;}


	.mint-popup-top {z-index: 50}

</style>
