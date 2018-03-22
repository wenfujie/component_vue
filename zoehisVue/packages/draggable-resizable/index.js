import ZoehisDraggableResizable from './src/draggable-resizable';

/* istanbul ignore next */
ZoehisDraggableResizable.install = function(Vue) {
  Vue.component(ZoehisDraggableResizable.name, ZoehisDraggableResizable);
};

export default ZoehisDraggableResizable;
