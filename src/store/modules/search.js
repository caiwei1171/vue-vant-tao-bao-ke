import {getSearch,searchGoods} from "@/network/api"
const search = {
	namespaced: true,
	state: {
		items: [],
		goods: {
			world: "",
			page: 1,
			data: []
		}
	},
	mutations:{
		// 搜索
		SET_SEARCH:(state,data) =>{
			state.items = data
		},
		// 增加搜索的商品列表
		ADD_SEARCH_GOODS:(state,options) => {
			state.goods.page = options.page;
			if(options.page == 1){
				state.goods.data = options.data;
			}
			if(state.goods.world == options.world){
				if(options.push){
					state.goods.data = [...state.goods.data,...options.data]
				}else{
					state.goods.data = [...options.data,...state.goods.data]
				}
			}
		}
	},
	actions:{
		GetSearch({commit}){
			return new Promise((resolve,reject) => {
				getSearch().then(response => {
                    const data = response.data.search
					commit('SET_SEARCH', data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		SearchGoods({commit},options){
			return new Promise((resolve,reject) => {
				searchGoods(options).then(res => {
					commit("ADD_SEARCH_GOODS",{
						world:options.world,
						page:options.page,
						push:options.push,
						data:res.data.goods
					})
					resolve(res)
				},err => {
					reject(err)
				})
			})
		}
	},
	getters: {
        search:(state) => {
            return state.items
		},
		add_search_list:(state) => {
			let temp = Object.assign({},state.goods)
			temp.data = temp.data.map(item => {
				return {
					dtitle: item.dtitle,
					id: item.id,
					goods_id: item.goods_id,
					main_pic: item.main_pic,
					istmall: (item.shop_type == '1' ? true : false),
					original_price: item.original_price,
					sales_num: item.month_sales,
					price: item.actual_price,
					coupon_price: parseFloat(item.coupon_price)
				}
			})
			return temp
		}
	}
}
export default search
