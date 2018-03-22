/**
 * Created by wfj on 2017/9/1.
 */
//import DatePicker from './src/picker/date-picker';
import DatePicker from './src/date-picker.vue';

/* istanbul ignore next */
DatePicker.install = function(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
