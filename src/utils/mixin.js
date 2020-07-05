export const back = {
    data(){
        return {
            boxheight:null,//盒子高度
            scrollheight:0,//滑块隐藏部分
            //tab标签名称及相关参数
            conditions: [
				{
					param: 'score',
					name: '人气'
				},
				{
					param: 'time',
					name: '最新'
				},
				{
					param: 'sales_num',
					name: '销量'
				},
				{
					param: 'price',
					name: '价格'
				},
				{
					param: '',
					name: '筛选'
				}
            ] 
        }
    },
    mounted(){
        // 监听滚动条事件
        window.addEventListener("scroll",this.handleScroll,true)
    },
    // 解决跳转页面和还继续触发滚动条事件
    destroyed(){
        window.removeEventListener('scroll',this.handleScroll,true);//监听页面滚动事件
    },
    methods:{
        // 返回顶部
        backTop(){
            window.scrollTo(0, 0);
        },
        // 重置
        reset(){
            this.startPrice = "";
            this.endPrice = "";
        }
    }
}