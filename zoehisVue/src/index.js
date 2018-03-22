/**
 * Created by lhn on 2017/8/1.
 */
import Scrollbar from '../packages/scrollbar/index.js'
import Button from '../packages/button/index.js';
import ButtonGroup from '../packages/button-group/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import Input from '../packages/input/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import Tree from '../packages/tree/index.js';
import Dialog from '../packages/dialog/index.js';
import Menu from '../packages/menu/index.js';
import MenuGroup from '../packages/menu-group/index.js';
import Loading from '../packages/loading/index.js';
import Page from '../packages/page/index.js';
import MessageBox from '../packages/message-box/index.js';
import Select from '../packages/select/index.js';
import Switch from '../packages/switch/index.js';
import Upload from '../packages/upload/index.js';
import TimePicker from '../packages/time-picker/index.js';

import Option from '../packages/option/index.js';
import Dropdown from '../packages/dropdown/index.js';
import DropdownItem from '../packages/dropdown-item/index.js';
import DropdownMenu from '../packages/dropdown-menu/index.js';
import DatePicker from '../packages/datepicker/index.js';
import keyfocus from './utils/keyfocus.js';
import gridkeyfocus from './utils/gridkeyfocus.js';
import Clickoutside from './utils/clickoutside.js';
import DraggableResizable from '../packages/draggable-resizable/index.js';

const components = [
  Scrollbar,Button,ButtonGroup,Checkbox,CheckboxGroup,Input,Radio,RadioGroup,Tree,Menu,MenuGroup,
  Dialog,Page,MessageBox,Select,Switch,Option,Upload,Dropdown,DropdownItem,DropdownMenu,DatePicker,
  TimePicker,DraggableResizable,
];

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.use(Loading.directive);//自动执行Loading.directive里的install方法
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$messageBox = MessageBox;
  Vue.directive('keyfocus',keyfocus);//自定义指令 v-keyfocus
  Vue.directive('gridkeyfocus',gridkeyfocus);//自定义指令 v-gridkeyfocus
  Vue.directive('clickoutside',Clickoutside);//自定义指令 v-clickoutside   点击其他地方触发的指令
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default{
  version: '1.0.0',
  install,
  Scrollbar,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Tree,
  Menu,
  Dialog,
  MenuGroup,
  Loading,
  Page,
  MessageBox,
  Select,
  Switch,
  Option,
  Upload,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DatePicker,
  TimePicker,
  DraggableResizable
};
