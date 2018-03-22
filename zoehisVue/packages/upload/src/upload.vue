<script>
  import ajax from './ajax';

  const noop = function () {};
  export default {
    props: {
      type: String,
      name: {
        type: String,
        default: 'file'
      },
      action: {
        type: String,
        required: true
      },
      data: Object,
      headers: Object,
      withcredentials: Boolean,
      multiple: {
        type: Boolean,
        default: true
      },
      accept: String,
      onStart: {
        type: Function,
        default: noop
      },
      showtip: Boolean,
      onprogress: Function,
      onsuccess: Function,
      onerror: Function,
      beforeupload: Function,
      drag: Boolean,
      onPreview: {
        type: Function,
        default: function() {}
      },
      onRemove: {
        type: Function,
        default: function() {}
      },
      fileList: Array,
      autoupload: Boolean,
      listType: String,
      httpRequest: {
        type: Function,
        default: ajax
      },
      disabled: Boolean
    },

    methods: {
      handleclick(){
        this.$refs.input.value = null;
        this.$refs.input.click();
      },
      handlechange(ev){
        const files = ev.target.files;
        if (!files) return;
        this.uploadFiles(files);
      },
      uploadFiles(files){
        let filesArray = Array.prototype.slice.call(files);//将类数组转为数组
        if (filesArray.length === 0) { return; }
        if (!this.multiple) { filesArray.slice(0,1); }//如果为单文件上传，则取第一个文件

        filesArray.forEach((rawFile) => {
          this.onStart(rawFile);
          if (this.autoupload){ this.upload(rawFile) }
        });
      },
      upload(rawFile){
        this.$refs.input.value = null;
//        if (!this.beforeupload){//若上传文件前的钩子返回值为false
//          this.post(rawFile)
//        }
        this.post(rawFile)
      },
      post(rawFile){
        const options = {
          headers: this.headers,//设置上传的请求头部
          withCredentials: this.withcredentials,//支持发送 cookie 凭证信息
          file: rawFile,//上传的文件
          data: this.data,//上传时附带的额外参数
          filename: this.name,//上传的文件字段名
          action: this.action,//上传的地址
          onProgress: e => {
            this.onprogress(e, rawFile);
          },
          onSuccess: res => {
            this.onsuccess(res, rawFile);
          },
          onError: err => {
            this.onerror(err, rawFile);
          }
        };
        const req = this.httpRequest(options);
      }


    },

    render(createElement){
      const componentArray = [];

      let { name, multiple, accept, handleclick, handlechange } = this;

      let uploadInput = createElement('input',
        {
          attrs: {
            class: 'zoehis_upload_input', type: 'file'
          },
          domProps: {
            name: name, multiple: multiple,accept: accept
          },
          on: {
            change: handlechange
          },
          ref: 'input'
        }
      );

      if (this.$slots.default) {
        componentArray.push(this.$slots.default);
      }

      componentArray.push(uploadInput);


      return createElement(
        'div',
        {
          attrs: {
            class: 'zoehis_upload'
          },
          on: {
            click: handleclick
          }
        },
        componentArray
      );
    }
  }
</script>
