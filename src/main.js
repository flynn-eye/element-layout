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
  Divider ,
  Autocomplete,
  Breadcrumb,
  BreadcrumbItem,
  Tree,
  DatePicker,
  Avatar,
  Step,
  Steps,
  RadioGroup,
  Radio,
  CheckboxGroup,
} from 'element-ui';
import VuePageTransition from 'vue-page-transition'
import VCharts from 'v-charts'
Vue.use(VCharts)


Vue.use(CheckboxGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(Tree)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Autocomplete)
Vue.use(Divider)
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