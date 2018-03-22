
<script>
  import Upload from './upload';

  const noop = function () {};
  export default {
    name: 'ZoehisUpload',

    components: {
      Upload
    },

    props: {
      action: {
        type: String,
        required: true
      },
      headers: {
        type: Object,
        default(){
          return {}
        }
      },
      withcredentials: {
        type: Boolean,
        default: true
      },
      data: Object,
      name: {
        type: String,
        default: 'file'
      },
      autoupload: {
        type: Boolean,
        default: true
      },
      onprogress: {
        type: Function,
        default: noop
      },
      onsuccess: {
        type: Function,
        default: noop
      },
      onerror: {
        type: Function,
        default: noop
      },
      beforeupload: {
        type: Function,
        default: noop
      },
      showtip: {
        type: Boolean,
        default: true
      }
    },

    componentName: 'ZoehisUpload',

    render(createElement){
      const uploadComponent = this.$slots.default ? createElement('upload', this.$slots.default) : createElement('upload');
      let dataObject = {
          props: {
            autoupload: this.autoupload,
            beforeupload: null,
            withcredentials: this.withcredentials,
            data: this.data,
            name: this.name,
            onprogress: this.onprogress,
            onsuccess: this.onsuccess,
            onerror: this.onerror,
            action: this.action,
            showtip: this.showtip
          }
      };
      return createElement( 'upload', dataObject, this.$slots.default)
    }
  }
</script>
