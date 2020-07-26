import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index'
Vue.use(VueRouter)
NProgress.configure({
  showSpinner: false
})
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(router.options.routes)
  if (to.path !== '/userLayout/login'&&store.state.commonStore.routes.length===0&&to.path !== '/403') {
    store.dispatch('commonStore/getPermission')
      .then(res => {
        // let temp = res.data["const routes"];
        // for (let i = 0; i < temp.length; i++) {
        //   handleRouter(temp[i])
        // }
        // store.state.commonStore.routes=temp
        
        // router.addRoutes(temp);
        store.state.commonStore.menuList = res.data["const menuList"]
         next()
      }).catch(err=>{
        console.log(err)
      })
  }else{
  next()
  }

  
})
router.afterEach((to, from) => {
  // store.dispatch('commonStore/getPermission')
  //   .then(res => {
  //     store.state.commonStore.menuList = res.data["const menuList"]
  //   })
  NProgress.done()
});
function handleRouter(r) {
  if (r['component']) {
    let path = r['component']
    r['component'] = () => {
      return () => import(path)
    }
  }
  if (r['children'])
    for (let i = 0; i < r['children'].length; i++) {
      handleRouter(r['children'][i])
    }
}
export default router