import {request} from '@/network/request.js'

// 获取商品分类
export function getCategory(params = {}) {
	return request({
		url:"/api/category",
		params:params
	})
}
export function getActGoods(params = {}) {
	return request({
		url:"/api/goods/activity",
		params:params
	})
}
export function getRecommend(params) {
	return request({
		url:"/api/goods/recommend",
		params:params
	})
}
export function getBanner(params = {}){
	return request({
		url:"/api/banner",
		params:params
	})
}
export function getSearch(){
	return request({
		url:'/api/search/worlds'
	})
}
export function searchGoods(params) {
	return request({
		url:"/api/search",
		params:params
	})
}
export function getGoodDetail(params){
	return request({
		url:"/api/goods/detail",
		params:params
	})
}
