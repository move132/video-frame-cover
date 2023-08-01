(() => {
  // src/index.ts
  var VideoFrameCoverClass = class {
    constructor(config) {
      const { url, currentTime = 1, quality, imgWidth, imageType = "image/jpeg", isCheckBackgroundColor = false, success } = config;
      if (!url) {
        console.warn("\u89C6\u9891\u94FE\u63A5\u4E0D\u80FD\u4E3A\u7A7A");
      }
      this.url = url;
      this.video = null;
      this.videoWidth = 0;
      this.imageType = imageType;
      this.quality = quality ? quality > 0.2 ? quality : 0.2 : 0.8;
      this.imgWidth = imgWidth;
      this.currentTime = currentTime < 1 ? 1 : currentTime;
      this.isCheckBackgroundColor = isCheckBackgroundColor;
      this.duration = 0;
      this.success = success;
      this.getVideoFrame();
    }
    getVideoFrame() {
      const self = this;
      const video = this.video || document.createElement("video");
      const currentTime = self.currentTime;
      video.src = self.url;
      video.style.cssText = `position: fixed; top: -100%; left: -100%; width: 400px; display: none; visibility: hidden;`;
      video.controls = true;
      video.crossOrigin = "Anonymous";
      video.currentTime = currentTime;
      video.addEventListener("timeupdate", () => {
        this.setVideoInfo();
        if (this.currentTime <= this.duration) {
          this.generateCanvas();
        } else {
          this.nextFrame();
        }
      });
      this.video = video;
      document.body.appendChild(video);
    }
    setVideoInfo() {
      const video = this.video;
      this.videoWidth = video.videoWidth;
      this.videoHeight = video.videoHeight;
      this.duration = Math.floor(video.duration || 0);
    }
    appointFrame(time) {
      if (!this.video) {
        console.warn("\u8BF7\u5148\u521D\u59CB\u5316");
        return;
      }
      const duration = this.duration;
      time = time > duration ? duration : time;
      this.currentTime = time;
      this.video.currentTime = time;
    }
    previousFrame() {
      let currentTime = this.currentTime;
      if (this.currentTime === 0) {
        return;
      }
      currentTime--;
      this.appointFrame(currentTime);
    }
    nextFrame() {
      const duration = this.duration;
      let currentTime = this.currentTime;
      if (this.currentTime === duration) {
        return;
      }
      currentTime++;
      this.appointFrame(currentTime);
    }
    generateCanvas() {
      if (!this.video) {
        console.warn("\u8BF7\u5148\u521D\u59CB\u5316");
        return;
      }
      const self = this;
      const canvas = this.canvas || document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false });
      const imgWidth = this.imgWidth;
      const isCheckBackgroundColor = this.isCheckBackgroundColor;
      let videoWidth = this.videoWidth;
      let videoHeight = this.videoHeight;
      if (!this.canvas) {
        if (imgWidth) {
          videoHeight = imgWidth / (videoWidth / videoHeight);
          videoWidth = imgWidth;
        }
        canvas.width = videoWidth;
        canvas.height = videoHeight;
      }
      ctx == null ? void 0 : ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
      if (isCheckBackgroundColor) {
        const checkImageResult = this.checkImage(ctx, videoWidth, videoHeight);
        if (!checkImageResult) {
          this.nextFrame();
          return;
        }
      }
      const img = canvas.toDataURL(this.imageType, self.quality);
      this.success && this.success(img, this.video);
    }
    /**
     * 检查图片是否是纯色图
     * @param { Object } ctx canvas执行环境
     * @param { Number } width canvas宽度
     * @param { Number } height canvas高度
     */
    checkImage(ctx, width, height) {
      const imgData = ctx.getImageData(0, 0, width, height);
      const imgDataContent = imgData.data;
      const rgbObj = {};
      let differentLen = 0;
      for (let i = 0, len = imgDataContent.length; i < len; i += 4) {
        const key = imgDataContent.slice(i, i + 4).join("");
        if (!rgbObj[key]) {
          rgbObj[key] = 1;
          differentLen++;
        }
        if (differentLen > 100) {
          return true;
        }
      }
      return false;
    }
    /**
     * 将base64转换成 Blob
     * @param { String } code base64字符串
     * @returns { Blob } 返回Blob对象
     */
    base64ToBlob(code) {
      if (!code) {
        console.warn("base64\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
        type: contentType
      });
    }
    /**
     * 下载文件
     * @param {String} code base64字符串
     */
    downloadFile(code) {
      const fileName = Date.now();
      if (!code) {
        console.warn("base64\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      let aLink = document.createElement("a");
      let blob = this.base64ToBlob(code);
      if (!blob)
        return;
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);
      aLink.download = fileName + "";
      aLink.href = URL.createObjectURL(blob);
      aLink.click();
    }
  };
  function videoFrameCover(opt) {
    return new VideoFrameCoverClass(opt);
  }
  if (typeof window !== "undefined") {
    window.videoFrameCover = videoFrameCover;
  }
})();
