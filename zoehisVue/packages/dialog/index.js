import ZoehisDialog from './src/dialog';

/* istanbul ignore next */
ZoehisDialog.install = function(Vue) {
  Vue.component(ZoehisDialog.name, ZoehisDialog);
};

export default ZoehisDialog;
