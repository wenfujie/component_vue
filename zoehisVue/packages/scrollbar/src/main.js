/**
 * Created by lhn on 2017/8/15.
 */
import {addResizeListener,removeResizeListener} from '../../../src/utils/resize-event';//resize事件
import scrollbarWidth from '../../../src/utils/scrollbar-width';//获取浏览器滚动条宽度
import {toObject} from '../../../src/utils/util';//对象合并方法
import ZoehisBar from './bar';
/**
 * event:
 * scrollafter:滚动后事件
 */
export default {
  name:'ZoehisScrollbar',
  component:{ZoehisBar},
  props:{
    native:Boolean,//是否是原生的滚动条
    wrapStyle:{},//父容器style,对象数组，字符串,
    wrapClass:{},//父容器class
    viewStyle:{},//滚动区域style 对象
    viewClass:{},//滚动区域class 对象
    noresize:Boolean,//如果container尺寸不会发生变化，最好设置它可以优化性能
    tag:{//组件生成的元素
      type:String,
      default:'div'
    }

  },
  data(){
    return {
      sizeWidth: '0',//水平滚动条的长度
      sizeHeight: '0',//垂直滚动条的长度
      moveX: 0,
      moveY: 0
    }
  },
  computed:{
    wrap(){
      return this.$refs.wrap;//子组件的wrap
    }
  },
  render(h){
    let gutter=scrollbarWidth();//获取浏览器滚动条宽度
    let style=this.wrapStyle;//不能直接去改props里的值
    if(gutter){ //合并相关样式，调整因为浏览器滚动条造成的样式偏差
      const gutterWidth=`-${gutter}px`;
      const gutterStyle=`margin-bottom: ${gutterWidth}; margin-right: ${gutterWidth};`
      if(Array.isArray(style)){
        style=toObject(style);
        style.marginBottom=style.marginRight=gutterWidth;
      }else if(typeof style==='string'){
        style+=gutterStyle;
      }else {
        style=gutterStyle;
      }
    }
    const view=h(this.tag,{
      class:['zoehis_scrollbar__view',this.viewClass],
      style:this.viewStyle,
      ref:'resize'
    },this.$slots.default);
    const wrap=(<div ref='wrap' style={style} onScroll={this.handleScroll} class={[this.wrapClass,'zoehis_scrollbar__wrap', gutter ? '' : 'zoehis_scrollbar__wrap--hidden-default']}>{[view]}</div>);
    let nodes;
    if(!this.native){
      //虚拟滚动条
      //vertical:表示true
      nodes=([wrap,<ZoehisBar move={this.moveX} size={this.sizeWidth}></ZoehisBar>,<ZoehisBar vertical move={ this.moveY } size={ this.sizeHeight }></ZoehisBar>])
    }else{
      //运行原生滚动条
      nodes=([<div ref='wrap' style={style} class={[this.wrapClass,'zoehis_scrollbar__wrap']}>{ [view] }</div>])
    }
    return h('div',{class:'zoehis_scrollbar'},nodes);
  },
  methods:{
    /**
     * 设置滚动条滚动位置
     * @param axis Object 对象 ｛top：Number,left:Number｝
       */
    move(axis){
      let top=parseInt(axis.top);
      let left=parseInt(axis.left);
      const wrap=this.wrap;
      if(!isNaN(top)){
        wrap.scrollTop=top;
      }
      if(!isNaN(left)){
        wrap.scrollLeft=left;
      }
    },


    /**
     * 滚动监听回调方法
     */
    handleScroll(e){
      const wrap=this.wrap;
      this.moveY=wrap.scrollTop*100/wrap.clientHeight;
      this.moveX=wrap.scrollLeft*100/wrap.clientWidth;
      if(e){
        this.$emit("scrollafter",wrap);//触发滚动后事件
      }else {
        this.$emit("scrollresize",wrap);//触发滚动条重新设置事件
      }

    },
    /**
     * 更新滚动条大小
     */
    update(){
      let heightPercentage,widthPercentage;
      const wrap=this.wrap;
      if(!wrap)return;
      heightPercentage=(wrap.clientHeight*100/wrap.scrollHeight);
      widthPercentage=(wrap.clientWidth*100/wrap.scrollWidth);
      this.sizeHeight=heightPercentage<100?(heightPercentage+"%"):'0';
      this.sizeWidth=widthPercentage<100?(widthPercentage+"%"):'0';
    }
  },
  /**
   * el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
   */
  mounted(){
    if(this.native)return;
    this.$nextTick(this.update)//将回调延迟到下次 DOM 更新循环之后执行,比如直接操作
    !this.noresize&&addResizeListener(this.$refs.resize,this.update);
    !this.noresize&&addResizeListener(this.$refs.wrap,()=>{
      this.update();
      this.handleScroll();
    });
  },
  /**
   * 组件被销毁时
   */
  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }


}
