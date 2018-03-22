import ZoehisSwitch from './src/switch';

/* istanbul ignore next */
ZoehisSwitch.install = function(Vue) {
  Vue.component(ZoehisSwitch.name, ZoehisSwitch);
};

export default ZoehisSwitch;
