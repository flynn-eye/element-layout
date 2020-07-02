import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import {
  Row,
  Col,
  Button,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Checkbox,
  MenuItem,
  Menu,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Tag,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  Loading,
  Select,
  Option,
} from 'element-ui';
import VuePageTransition from 'vue-page-transition'

Vue.use(Option)
Vue.use(Select)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(VuePageTransition)
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Tag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')