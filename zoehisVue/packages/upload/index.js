import ZoehisUpload from './src';

/* istanbul ignore next */
ZoehisUpload.install = function(Vue) {
  Vue.component(ZoehisUpload.name, ZoehisUpload);
};

export default ZoehisUpload;
