declare global {
    interface Window {
        VideoFrameCover: typeof VideoFrameCover;
    }
}
type Options = {
    /** 视频地址 */
    url: string;
    /** 截取的时间点，单位为秒，默认为视频的中间位置 */
    currentTime?: number;
    /** 视频质量，取值范围为 0-1，默认为 0.8 */
    quality?: number;
    /** 图片宽度，默认为视频宽度 */
    imgWidth?: number;
    /** 图片类型，支持 "image/jpeg" 和 "image/png"，默认为 "image/jpeg" */
    imageType?: string;
    /** 是否检查背景颜色，如果为 true，则会检查截图中的主要背景颜色，并在截图中添加一个背景色相同的矩形，以便更好地区分主体内容 */
    isCheckBackgroundColor?: boolean;
    /** 截图成功后的回调函数 */
    success?: Function;
};
declare class VideoFrameCoverClass {
    url: string;
    video: HTMLVideoElement | null;
    videoWidth: number;
    videoHeight: number;
    imageType: string;
    quality: number;
    imgWidth?: number;
    currentTime: number;
    isCheckBackgroundColor: boolean;
    duration: number;
    success?: Function;
    canvas?: HTMLCanvasElement;
    constructor(config: Options);
    getVideoFrame(): void;
    setVideoInfo(): void;
    appointFrame(time: number): void;
    previousFrame(): void;
    nextFrame(): void;
    generateCanvas(): void;
    /**
     * 检查图片是否是纯色图
     * @param { Object } ctx canvas执行环境
     * @param { Number } width canvas宽度
     * @param { Number } height canvas高度
     */
    checkImage(ctx: CanvasRenderingContext2D, width: number, height: number): boolean;
    /**
     * 将base64转换成 Blob
     * @param { String } code base64字符串
     * @returns { Blob } 返回Blob对象
     */
    base64ToBlob(code: string): Blob;
    /**
     * 下载文件
     * @param {String} code base64字符串
     */
    downloadFile(code: any): void;
}
declare function VideoFrameCover(opt: Options): VideoFrameCoverClass;

export { Options, VideoFrameCover };
