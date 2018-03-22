/**
 * Created by lhn on 2017/8/4.
 */
import  ZoehisButton from './src/button';

/* istanbul ignore next */
ZoehisButton.install = function(Vue) {
  Vue.component(ZoehisButton.name, ZoehisButton);
};

export default ZoehisButton;
