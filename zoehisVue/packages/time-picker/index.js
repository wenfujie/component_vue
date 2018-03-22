/**
 * Created by tianwenbin on 2017/9/1.
 */
import ZoehisTimePicker from './src/picker/time-picker';

ZoehisTimePicker.install = function(Vue){
  Vue.component(ZoehisTimePicker.name,ZoehisTimePicker);
};

export default ZoehisTimePicker;