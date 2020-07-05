const footprint = {
	namespaced: true,
	state: {
		goods: []
	},
	mutations: {
		SET_GOODS: (state, goods) => {
			state.goods = goods
		},
		ADD_GOOD: (state,good) => {
			function handle(prod){
				for(let item of state.goods){
					if(item.id == prod.id){
						return false
					}
				}
				return true
			}
			if(handle(good)) state.goods.push(good);
			localStorage.setItem('footprint_goods',JSON.stringify(state.goods))
		},
		CLEAN_GOODS:(state) =>{
			state.goods = []
		}
	},
	actions: {
		GetGoods({commit},options) {
			commit('SET_GOODS', JSON.parse(options))
		},
		AddGoods({commit},good){
			return new Promise((resolve) => {
				commit('ADD_GOOD',good)
				resolve()
			})
		},
		CleanGoods({commit}){
			return new Promise((resolve) => {
				commit('CLEAN_GOODS')
				resolve()
			})
		},
	},
	getters: {
		goods : (state) => {
			return state.goods.map((good)=>{
				return {
					dtitle: good.dtitle,
					id: good.id,
					goods_id: good.goods_id,
					main_pic: good.main_pic,
					istmall: (good.shop_type == '1' ? true : false),
					original_price: good.original_price,
					sales_num: good.month_sales,
					price: good.actual_price,
					coupon_price: parseFloat(good.coupon_price),
					coupon_total_num: good.coupon_total_num,
					coupon_receive_num: good.coupon_receive_num,
					coupon_end_time: good.coupon_end_time
				}
			})
		}
	}
}
export default footprint
