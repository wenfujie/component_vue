/**
 * Created by lhn on 2017/8/15.
 */
import { on, off } from '../../../src/utils/dom';
import { renderThumbStyle, BAR_MAP } from './util';
export default{
  name: 'ZoehisBar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  computed: {
    bar(){
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
    },
    wrap(){
      return this.$parent.wrap;//父组件
    }
  },
  render(h) {
    const { size, move, bar } = this;
    return (
      < div
  class
    = {['zoehis_scrollbar__bar', 'is_' +bar.key,size!=0?'zoehis_scrollbar__bar_show':''
  ]
  }
    onMousedown = {this.clickTrackHandler
  } >
  <
    div
    ref = "thumb"
  class
    = "zoehis_scrollbar__thumb"
    onMousedown = {this.clickThumbHandler
  }
    style = {renderThumbStyle({ size, move, bar })} >
      < / div >
      < / div >
  )
    ;
  },
  methods: {
    clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
    },
    clickTrackHandler(e) {
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]);
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },
    startDrag(e){
      e.stopImmediatePropagation();//阻止调用相同事件的其他侦听器。
      this.cursorDown = true;
      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = ()=>false;//禁止选择
    },
    mouseMoveDocumentHandler: function (e) {
      if (this.cursorDown === false)return;
      const prevPage = this[this.bar.axis];
      if (!prevPage)return;
      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },
    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;//解除禁止选择
    },
    destroyed() {
      off(document, 'mouseup', this.mouseUpDocumentHandler);
    }

  }

}
