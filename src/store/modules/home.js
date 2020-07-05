const home = {
    namespaced:true,
    state:{
        items: []
    },
    mutations:{
        
    },
    actions:{
        getCate({dispatch}){
            return new Promise(() => {
                dispatch("category/GetCategory","",{root:true})
            })
        }
    }
}
export default home