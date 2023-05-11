# video-frame-cover
Capture preview image from a video file

## Installation
```
npm install video-frame-cover --save

```
## Usage Examples
Browser usage 
```
<script src="https://unpkg.com/video-frame-cover@2.0.4/dist/index.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/video-frame-cover@2.0.4/dist/index.global.js"></script>
```

Javascript

``` js
import videoFrameCover from "video-frame-cover";

videoFrameCover({
    url: this.videoUrl, // video url
    quality: 0.9,
    imageType: 'image/jpeg',
    isCheckBackgroundColor: true, // Check whether the image is a solid color
    success: (res, e) => {
        this.imgsrc = res
    }
})
```
## example
[online example](https://move132.github.io/video-frame-cover/example/)

### Options

#### url
Type: `String`

Default: `true`

video link

#### currentTime
Type: `Number`

Default: `false`

The default value is 1. If the value is 0, a black screen may be displayed


#### quality
Type: `Number`

Default: `false`

Image quality **0.2-0.95** If the value is 1, the size of base64 will be increased


#### imgWidth
Type: `Number`

Default: `false`

Generate image width, height will be calculated according to video aspect ratio


#### imageType
Type: `String`

Default: `false`

Image type ``image/png`` is similar to this format

#### isCheckBackgroundColor
Type: `Boolean`

Default: `false`

Whether to verify that the picture is a solid color, the default is `false`, if enabled, the picture is a solid color, and the next second video picture will be automatically obtained


### Event

#### downloadFile(base64)

Download video frame pictures

#### previousFrame()

Get the video picture of the previous second

#### nextFrame()

Get the next second video picture

#### appointFrame(time)

`time` how many seconds of the picture to get the specified frame video picture

```js
const videoFrameCover = new VideoFrameCover({
    url: './thwj.mp4', 
    quality: 0.9,
    imageType: 'image/jpeg',
    isCheckBackgroundColor: true,
    success: (res) => {
        this.imgsrc = res
    }
})

videoFrameCover.downloadFile(this.imgsrc)
videoFrameCover.previousFrame()
videoFrameCover.nextFrame()
videoFrameCover.appointFrame(23) // Picture at 23 seconds
```
