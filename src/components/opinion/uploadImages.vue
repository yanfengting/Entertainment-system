<template>
  <div class="hello">
    <div class="upload">

      <input
        @change="fileChange($event)"
        type="file"
        id="upload_file"
        multiple
        accept="image/*"
        style="display: none"
        ref="file"
      >
      <div class="upload_warp_img" v-show="imgList.length!=0">
        <div class="upload_warp_img_div" v-for="(item,index) in imgList" :key="index">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">{{item.file.name}}</div>
            <i class="iconfont icon-chahao upload_warp_img_div_del" @click="fileDel(index)"></i>
          </div>
          <img :src="item.file.src">
        </div>
      </div>
      <div class="upload_warp">
        <div class="upload_warp_left" @click="fileClick">
          <div class="img"></div>
        </div>
      </div>
      <div class="upload_warp_text">选中{{imgList.length}}个文件，共{{bytesToSize(this.size)}}</div>
    </div>

    <!-- <div
      v-for="(item,index) in imgList"
      style="text-align: left"
      v-bind:key="index"
    >{{index}}：{{item.file.name}}</div>-->
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        imgList: [],
        formData: new FormData(), // 上传用列表
        size: 0,
        limit: 9
      }
    },
    methods: {
      // 设置
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        console.log(el) // input整个标签
        if (!el.target.files[0].size) return
        this.fileList(el.target)
        el.target.value = ''

        /* 通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。
          它可以更灵活方便的发送表单数据，因为可以独立于表单使用。如果你把表单
          的编码类型设置为multipart/form-data ，则通过FormData传输的数据格式
          和表单通过submit() 方法传输的数据格式相同 */
        // 你可以自己创建一个FormData对象，然后通过调用它的append()方法添加字段，就像这样：
        /*
         let formData = new FormData()
         formData.append('thumb', this.imgList)
         console.log(formData, 'wsd')
         */
        // 向父组件传递参数，事件为fileChange，参数为formData对象
        this.$emit('fileChange', this.imgList)
      },
      fileList(fileList) {
        let files = fileList.files
        console.log(files)
        for (let i = 0; i < files.length; i++) {
          // 判断是否为文件夹
          // eslint-disable-next-line eqeqeq
          if (files[i].type != '') {
            this.fileAdd(files[i])
          } else {
            // 文件夹处理
            this.folders(fileList.items[i])
          }
        }
      },
      // 文件夹处理
      folders(files) {
        let _this = this
        // 判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry()
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i])
            } else {
              _this.folders(file[i])
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--
        if (this.limit !== undefined && this.limit < 0) return
        // 总大小
        this.size = this.size + file.size
        // 判断是否为图片文件
        // eslint-disable-next-line eqeqeq
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png'
          this.imgList.push({
            file
          })
        } else {
          let reader = new FileReader()
          let image = new Image()
          let _this = this
          reader.readAsDataURL(file)
          reader.onload = function () {
            file.src = this.result
            image.onload = function () {
              let width = image.width
              let height = image.height
              file.width = width
              file.height = height
              _this.imgList.push({
                file
              })
              console.log(_this.imgList)
            }
            image.src = file.src
          }
        }
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size // 总大小
        this.imgList.splice(index, 1)
        if (this.limit !== undefined) this.limit = 9 - this.imgList.length
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B'
        let k = 1000 // or 1024
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
      }
    }
  }
</script>
<style scoped>
  .upload_warp_img_div_del {
    position: absolute;
    top: -2px;
    width: 16px;
    right: 4px;
  }

  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    font-size: 12px;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }

  /* 上传的图片展示 */
  .upload_warp_img_div {
    position: relative;
    height: 70px;
    width: 28%;
    /*border: 1px solid #ccc;*/
    margin: 10px 5px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: rgb(236, 228, 228);
    cursor: pointer;
  }

  .upload_warp_img {
    /*border-top: 1px solid #d2d2d2;*/
    padding: 10px;
    overflow: hidden;
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_left .img {
    margin: 1px;
    width: 60px;
    height: 60px;
    background: url("./upload.png") no-repeat center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }


  .upload_warp_left {
    float: left;
    /* width: 80px;
    height: 100px; */
    /*border: 1px dashed #999;*/
    border-radius: 4px;
    cursor: pointer;
  }

  .upload_warp {
    padding: 7px 14px;
    height: 65px;
  }

  .upload {
    /* border: 1px solid #ccc; */
    background-color: #fff;
    width: 100%;
    /* box-shadow: 0px 1px 0px #ccc; */
    border-radius: 4px;
  }

  .hello {
    width: 100%;
  }
</style>
