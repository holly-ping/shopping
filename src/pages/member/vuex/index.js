import Vue from 'vue'
import Vuex from 'vuex'
// import Address from 'js/addressService.js';
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)



const store=new Vuex.Store({
  state:{
    lists:null,
  },
  mutations:{
    init(state,lists){
      state.lists=lists
    },
    add(state,instance){
      state.lists.push(instance)
    },
    remove(state,id){
      let lists=state.lists
      let index=lists.findIndex(item=>{
        return item.id==id
      })
      lists.splice(index,1)
    },
    update(state,instance){
      let lists= JSON.parse(JSON.stringify(state.lists))  
      let index=lists.findIndex(item=>{
        return item.id==instance.id
      })
      lists[index]=instance
      state.lists=lists
    },
    setDefault(state,id){
      let lists=state.lists;
      lists.forEach(item =>{
        item.isDefault= item.id===id ? true : false
      })
    },
  },
  actions:{
    getLists({commit}){
      Vue.http.get('static/data.json').then(res=>{
        commit('init',res.data.address.list.lists)
      })
    },
    //模拟添加id,instance最好是后台返回.
    addAction({commit},instance){
      Vue.http.get('static/data.json').then(res=>{
        commit('add',instance)
      })
    },
    removeAction({commit},id){
      Vue.http.get('static/data.json').then(res=>{
        commit('remove',id)
      })
    },
    updateAction({commit},instance){
      Vue.http.get('static/data.json').then( res=>{
        console.log(instance,1)
        commit('update',instance)
      })
    },
    setDefaultAction({commit},id){
      Vue.http.get('static/data.json').then(res=>{
        commit('setDefault',id)
      })
    }
  }
});
export default store;