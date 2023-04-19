var VFrameCover=(()=>{var h=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var p=(s,e)=>{for(var t in e)h(s,t,{get:e[t],enumerable:!0})},b=(s,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of v(e))!f.call(s,n)&&n!==t&&h(s,n,{get:()=>e[n],enumerable:!(i=g(e,n))||i.enumerable});return s};var T=s=>b(h({},"__esModule",{value:!0}),s);var y={};p(y,{VideoFrameCover:()=>m});var u=class{constructor(e){let{url:t,currentTime:i=1,quality:n,imgWidth:a,imageType:o="image/jpeg",isCheckBackgroundColor:r=!1,success:c}=e;t||console.warn("\u89C6\u9891\u94FE\u63A5\u4E0D\u80FD\u4E3A\u7A7A"),this.url=t,this.video=null,this.videoWidth=0,this.imageType=o,this.quality=n?n>.2?n:.2:.95,this.imgWidth=a,this.currentTime=i<1?1:i,this.isCheckBackgroundColor=r,this.duration=0,this.success=c,this.getVideoFrame()}getVideoFrame(){let e=this,t=this.video||document.createElement("video"),i=e.currentTime;t.src=e.url,t.style.cssText="position: fixed; top: -100%; left: -100%; width: 400px; display: none; visibility: hidden;",t.controls=!0,t.crossOrigin="Anonymous",t.currentTime=i,t.addEventListener("timeupdate",()=>{this.setVideoInfo(),this.currentTime<=this.duration?this.generateCanvas():this.nextFrame()}),this.video=t,document.body.appendChild(t)}setVideoInfo(){let e=this.video;this.videoWidth=e.videoWidth,this.videoHeight=e.videoHeight,this.duration=Math.floor(e.duration||0)}appointFrame(e){if(!this.video){console.warn("\u8BF7\u5148\u521D\u59CB\u5316");return}let t=this.duration;e=e>t?t:e,this.currentTime=e,this.video.currentTime=e}previousFrame(){let e=this.currentTime;this.currentTime!==0&&(e--,this.appointFrame(e))}nextFrame(){let e=this.duration,t=this.currentTime;this.currentTime!==e&&(t++,this.appointFrame(t))}generateCanvas(){if(!this.video){console.warn("\u8BF7\u5148\u521D\u59CB\u5316");return}let e=this,t=this.canvas||document.createElement("canvas"),i=t.getContext("2d",{alpha:!1}),n=this.imgWidth,a=this.isCheckBackgroundColor,o=this.videoWidth,r=this.videoHeight;if(this.canvas||(n&&(r=n/(o/r),o=n),t.width=o,t.height=r),i==null||i.drawImage(this.video,0,0,t.width,t.height),a&&!this.checkImage(i,o,r)){this.nextFrame();return}let c=t.toDataURL(this.imageType,e.quality);this.success&&this.success(c,this.video)}checkImage(e,t,i){let a=e.getImageData(0,0,t,i).data,o={},r=0;for(let c=0,d=a.length;c<d;c+=4){let l=a.slice(c,c+4).join("");if(o[l]||(o[l]=1,r++),r>100)return!0}return!1}base64ToBlob(e){if(!e){console.warn("base64\u4E0D\u80FD\u4E3A\u7A7A");return}let t=e.split(";base64,"),i=t[0].split(":")[1],n=window.atob(t[1]),a=n.length,o=new Uint8Array(a);for(let r=0;r<a;++r)o[r]=n.charCodeAt(r);return new Blob([o],{type:i})}downloadFile(e){let t=Date.now();if(!e){console.warn("base64\u4E0D\u80FD\u4E3A\u7A7A");return}let i=document.createElement("a"),n=this.base64ToBlob(e);if(!n)return;document.createEvent("HTMLEvents").initEvent("click",!0,!0),i.download=t+"",i.href=URL.createObjectURL(n),i.click()}};function m(s){return new u(s)}typeof window<"u"&&(window.VideoFrameCover=m);return T(y);})();