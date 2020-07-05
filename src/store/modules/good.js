import {
	getActGoods,
	getRecommend,
	getGoodDetail
} from "@/network/api"
const good = {
	namespaced: true,
	state:{
		// 推荐
		recommend:{
			page:1,
			data:[]
		},
		// 分类
		actGoods: {
			page: 1,
			data: []
		},
		// 详情
		good:{}
	},
	mutations:{
		// 分类
		ADD_ACTGOODS:(state,data) => {
			state.actGoods.page = data.page;
			if(data.page == 1){
				state.actGoods.data = data.goods;
			}else{
				for(var i = 0, length = data.goods.length; i < length; i++) {
					let good = data.goods[i];
					if (data.push) {
						state.actGoods.data.push(good);
					} else {
						state.actGoods.data.unshift(good);
					}
				}
			}
		},
		// 商品推荐
		ADD_RECOMMEND_GOODS: (state, data) => {
			state.recommend.page = data.page;
			if(data.page == 1){
				state.recommend.data = data.goods
			}else{
				if(data.push){
					state.recommend.data = [...state.recommend.data,...data.goods]
				}else{
					let reserveData = data.goods.reverse()
					state.recommend.data = [...reserveData,...state.recommend.data]
				}
			}
		},
		// 商品详情
		SET_GOOD:(state, data) => {
			state.good = data;
		}
	},
	actions:{
		GetActGoods({commit},options){
			const params = options;
			return new Promise((resolve,reject) => {
				getActGoods(params).then(response => {
					const goods = response.data.goods
					commit('ADD_ACTGOODS', {
						push: params.push,
						page: params.page,
						goods: goods
					})
					resolve(goods)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 商品推荐
		GetRecommend({commit},options){
			const params = options;
			return new Promise((resolve, reject) => {
				getRecommend(params).then(response => {
					const goods = response.data.goods
					commit('ADD_RECOMMEND_GOODS', {
						push: params.push,
						page: params.page,
						goods: goods
					})
					resolve(goods)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 商品详情
		GetGoodDetail({commit,dispatch},options){
			const params = options;
			return new Promise((resolve, reject) => {
				getGoodDetail(params).then(response => {
					const good = response.data.good;
					commit('SET_GOOD', good);
					// 模块内的 dispatch 或 commit 全局的action和mutation：将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
					dispatch('footprint/AddGoods',good,{root: true})
					resolve(good);
				}).catch(error => {
					reject(error)
				})
			})

		}
	},
	getters:{
		// 商品分类
		actGoods:(state) => {
			let temp = {
				page: state.actGoods.page,
				data: []
			}
			temp.data = state.actGoods.data.map((item) => {
				return {
					dtitle:item.dtitle,
					id:item.id,
					goods_id:item.goods_id,
					main_pic:item.main_pic,
					istmall:(item.shop_type == '1' ? true : false),
					original_price:item.original_price,
					sales_num:item.month_sales,
					price:item.actual_price,
					coupon_price:parseFloat(item.coupon_price),
					coupon_total_num:item.coupon_total_num,
					coupon_receive_num:item.coupon_receive_num,
					coupon_end_time:item.coupon_end_time
				}
			})
			return temp;
		},
		// 商品推荐
		recommend: (state) => {
			let temp = {
				page: state.recommend.page,
				data: {}
			}
			temp.data = state.recommend.data.map((item) => {
				return {
					dtitle: item.dtitle,
					id: item.id,
					goods_id: item.goods_id,
					main_pic: item.main_pic,
					istmall: (item.shop_type == '1' ? true : false),
					original_price: item.original_price,
					sales_num: item.month_sales,
					price: item.actual_price,
					coupon_price: parseFloat(item.coupon_price),
					coupon_total_num: item.coupon_total_num,
					coupon_receive_num: item.coupon_receive_num,
					coupon_end_time: item.coupon_end_time
				}
			})
			return temp;
		},
		// 商品详情
		good:(state) => {
			return state.good;
		}
	}
}
export default good
