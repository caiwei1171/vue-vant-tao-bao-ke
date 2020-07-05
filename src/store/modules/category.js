import {getCategory} from "@/network/api"
const category = {
	namespaced: true,
	state: {
		items: []
	},
	mutations: {
		SET_CATEGORYS: (state, categorys) => {
			state.items = categorys
		}
	},
	actions: {
		GetCategory({commit}) {
			return new Promise((resolve, reject) => {
				getCategory().then(response => {
					const data = response.data.categorys
					commit('SET_CATEGORYS', data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		tcategorys: (state) => {
			return state.items;
		}
	}
}
export default category