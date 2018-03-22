import Vue from 'vue'
import Router from 'vue-router'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import Radio from '@/components/Radio'
import Tree from '@/components/Tree'
import Dialog from '@/components/Dialog'
import Scrollbar from '@/components/Scrollbar';
import Menu from '@/components/Menu'
import Loading from '@/components/Loading'
import Page from '@/components/Page'
import MessageBox from '@/components/MessageBox'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import Upload from '@/components/Upload'
import Dropdown from '@/components/Dropdown'
import Datepicker from '@/components/Datepicker'
import TimePicker from '@/components/TimePicker'
import KeyFocus from '@/components/KeyFocus.vue'
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/button', component: Button },//button
    { path: '/checkbox', component: Checkbox },//check
    { path: '/input', component: Input },//input
    { path: '/radio', component: Radio },//radio
    { path: '/tree', component: Tree },//tree
    { path: '/dialog', component: Dialog },
    { path: '/scrollbar', component: Scrollbar },//scrollbar
    { path: '/menu', component: Menu },//menu
    { path: '/loading', component: Loading },//loading
    { path: '/page', component: Page },//page
    { path: '/message-box', component: MessageBox },
    { path: '/select', component: Select },
    { path: '/switch', component: Switch },//switch
    { path: '/upload', component: Upload },//upload
    { path: '/dropdown', component: Dropdown },//dropdown
    { path: '/datepicker', component: Datepicker },//dropdown
    { path: '/time-picker', component: TimePicker },
    { path: '/key-focus', component: KeyFocus },

  ]
})
