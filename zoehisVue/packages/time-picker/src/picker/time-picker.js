import Picker from '../picker';
import TimePanel from '../panel/time';

export default {
  mixins: [Picker],
  name: 'ZoehisTimePicker',
  data(){
    return {
      type:''
    }
  },
  created(){
    this.type = 'time';
    this.panel = TimePanel; //初始化时间弹窗
  }
}