---
title: AE表达式大全中英文对照手册(整理中)
author: Cynthia
categories:
  - 设计
  - 软件
tags:
  - "\U0001F353无\U0001F353"
date: 2019-09-24 13:08:04
---

🐰
...
<!--more-->

## 优秀教程汇总

- [超赞！一份实用简单好上手的AE表达式江湖文档](https://www.uisdc.com/useful-ae-expression-document)
- [AE常用表达式详解](https://wenku.baidu.com/view/49e0577ef011f18583d049649b6648d7c1c708f3.html)



```js
// 练习

r=thisComp.layer("数值").effect("编号")("数值/位移/随机最大")

linear(r,0,100,-180,45)
```









## 全局对象（global）

| 对象                              | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Comp comp(name)                   | 用另一个名字给合成命名。                                     |
| Footage footage(name)             | 用另一个名字给脚本标志命名。                                 |
| Comp `thisComp`                   | 描述合成内容的表达式。例如：thisComp.layer(2)                |
| Layer, Light, or Camera thisLayer | 是对层本身的描述，thisLayer是一个默认的对象，对它的应用是可选的。<br />例如, 用表达式 thisLayer.width 或 width 可获得同样的结果。 |
| Property thisProperty             | 描述属性的表达式。<br />例如，如果写一个旋转属性的表达式就能获取旋转属性的值。 |
| Number `time`                     | 描述合成的时间, 单位是秒。                                   |
| Number colorDepth                 | 返回8或16表示的彩色深度位数值。例如, 当项目的每通道的彩色深度为16位时colorDepth 返回16 。 |
| Number posterizeTime              | (framesPerSecond) {framesPerSecond 是一个数}返回或改变帧率。允许用这个表达式设置比合成低的帧率。 |

  

 

 

  


## 向量数学方法（Vector Math）

Array add(vec1, vec2) {vec1 和 vec2 是数组} 两个向量相加。 
Array sub(vec1, vec2) {vec1 和 vec2 是数组}两个向量相减。 
Array mul(vec1, amount) {vec1 是数组, amount 是数} 向量的每个元素被 amount相乘。 
Array div(vec1, amount) {vec1 是数组, amount 是数}向量的每个元素被 amount相除。 
Number or Array Clamp(value, limit1, limit2) 限制value中每个元素的值在 limit1 到 limit2之间。 
Number dot(vec1, vec2) {vec1 和 vec2 是数组} 返回点积, 结果为两个向量相乘。 
Array [2 or 3] cross(vec1, vec2) {vec1 和 vec2 是数组 [2 or 3]} 返回向量的交积。 
Array normalize(vec) {vec 是数组} 格式化一个向量,如某长度表示为1.0. 
Number length(vec) {vec是数组}返回向量的长度。 
Number length(point1, point2) {point1 and point2 是数组} 

## 随机数方法(Random Numbers)

Nothing seedRandom(seed, timeless=false) {seed 是一个数, 默认 timeless 为 false} 取现有的seed 增量一个随机值,这个随机值依赖于层的 index (number) 和 stream (property),但不总是这样. 例如, seedRandom (n, true)通过给第二个参数赋值 true ,seedRandom()获取一个0到1间的随机数. 
Number random()返回0和1间的随机数. 
Number or Array random(maxValOrArray) {maxValOrArray 是一个数或数组}返回0到maxVal间的数,维度 与 maxVal相同; 或返回与maxArray相同维度的数组, 数组的每个元素在 0 到 maxArray之间 
Number or Array random(minValOrArray, maxValOrArray) {minValOrArray 和 maxValOrArray 是一个数或数组} 返回一个minVal 到 maxVal间的数, 或返回一个与 minArray和maxArray有相同维度的数组,其每个元素的范围在 minArray 与 maxArray之间.例如, random([100, 200], [300, 400]) 返回数组的第一个值在 100 到300间, 第二个值在 200 到400间.如果两个数组的维度不同，较短的一个后面自动用0补齐. 
Number gaussRandom()返回一个0到1之间的随机数. 结果为钟形分布,大约90%的结果在 0 到1之间, 剩余10%在边沿. 
Number or Array gaussRandom(maxValOrArray){maxValOrArray是一个数或数组}当用maxVal,它返回一个0到maxVal之间的随机数. 结果为钟形分布,大约90%的结果在0到maxVal之间,剩余10%在边缘.当用maxArray,它返回一个与maxArray相同维度的数组, 结果为钟形分布,大约90%的结果在 0到maxArray之间, 剩余10%在边缘. 
Number gaussRandom(minValOrArray, maxValOrArray){minValOrArray和maxValOrArray是一个数或数组} 当用minVal和 maxVal, 它返回一个minVal到maxVal之间的随机数. 结果为钟形分布,大约90%的结果在minVal到maxVal之间, 剩余10%在边缘.当用minArray和maxArray, 它返回一个与 minArray和maxArray相同维度的数组, 结果为钟形分布,大约90%的结果在 minArray到maxArray之间, 剩余10%在边缘. 剩余10%在边缘. 
Number noise(valOrArray) {valOrArray是一个数或数组 [2 or 3]}返回一个0到1间的数.噪声不是事实上的随机,但它是在样本附近相关的随机数.它基于花边噪声 . 例如, add(position, noise(position)*50). 

## 插值方法（interpolation）

### Linear（线性运动）

#### 表达式一

`linear(t, value1, value2) `

{t 是一个数, value1 和 value2 是一个数或数组}

- t：指定图层 或者 合成tmin最小值/tmax最大值

  > 0<t<1：返回一个从value1到value2的线性插值
  >
  > t <= 0：返回value1
  >
  > t >= 1：返回 value2 

- value1：当最小值时返回的作用数值

- value2：当最大值时返回的作用数值



#### 表达式二

`linear(t, tMin, tMax, value1, value2)`

{t, tMin和 tMax are 数, value1和value2 是数或数组} 

- t <= tmin：返回value1
- t >= tMax：返回value2 
- tMin < t < tMax ：返回 value1和value2 的线性联合



#### 举例

```js
t=thisComp.layer("圆形").transform.position[1];
linear(t,-299,299,90,-90)

// 该图层Y轴与另外的图层Y值相同（比如码表的码数t和指针的旋转度数value）
// 当最小值是-299时，该图层旋转90度
// 当最大值是299时，旋转-90度
```


### Ease

Number or Array ease(t, value1, value2) {t 是一个数, value1 和 value2 是数或数组} 返回值与linear相似, 但在开始和结束点的速率都为0。这种方法的结果是动画非常平滑。 
Number or Array ease(t, tMin, tMax, value1, value2) {t, tMin, 和 tMax 是数, value1 和 value2 是数或数组} 返回 值与 linear相似, 但在开始和结束点的速率都为0。这种方法的结果是动画非常平滑。 
Number or Array easeIn(t, value1, value2) {t 是一个数, and value1 and value2 是数或数组} 返回 值与ease相似, 但只在切入点value1 的速率为0，靠近value2 一边是线性的。 
Number or Array easeIn(t, tMin, tMax, value1, value2) {t, tMin和tMax 是一个数, value1和value2 是数或数组}返回 值与ease相似, 但只在切入点tMin 的速率为0，靠近tMax 一边是线性的。 
Number or Array easeOut(t, value1, value2) {t 是一个数, value1和value2 是数或数组}.返回 值与ease相似, 但只在切入点value2 的速率为0，靠近value1 一边是线性的。 
Number or Array easeOut(t, tMin, tMax, value1, value2) {t, tMin和tMax 是数, value1 value2 是数或数组} 返回 值与ease相似, 但只在切入点tMax的速率为0，靠近tMin 一边是线性的。 

## 彩色转换方法 ( Color Conversion )

Array [4] rgbToHsl(rgbaArray) {rgbaArray 是数组 [4]} 转换 RGBA 彩色空间到 HSLA彩色空间。输入数组指定红、绿、蓝、透明， 它们的范围都在 0.0 到 1.0之间。结果值是一个指定色调、饱和度、亮度和透明的数组，它们的范围都在 0.0 到 1.0之间。例如, rgbToHsl.effect("Change Color")("Color To Change")。 
Array [4] hslToRgb(hslaArray) {hslaArray 是数组[4]}. 转换 HSLA彩色空间到RGBA 彩色空间。其操作与rgbToHsl相反。 

## 其它数学方法 ( Other Math )

Number degreesToRadians(degrees)转换度到弧度。 
Number radiansToDegrees(radians) 转换弧度到度。 

## Comp

\-------------------------------------------------------------------------------- 
Layer, Light, or Camera layer(index) {index 是一个数} 得到层的序数(在时间线窗口中的顺序). 例如, thisComp.layer(3). 
Layer, Light, or Camera layer("name") {name是一个字串} 得到层名。指定的名字与层名匹配，或者在没有层名时与源名匹配。如果存在重名，After Effects 使用时间线窗口中的第一个. 例如, thisComp.layer("Solid 1"). 
Layer, Light, or Camera layer(otherLayer, relIndex) {otherLayer 一 个层对象， relIndex 是一个数} 得到otherLayer (层名)上面或下面relIndex (数) 的一个层。 例如, layer(thisLayer, -2) 返回 在时间线窗口中比写这个表达式的层高两层的一个层。 
Number marker(markerNum) {markerNum 是一个数}得到合成中一个标记点的时间。你可以用它减淡标记点的透明，实现淡出。例如, markTime = thisComp.marker(1); linear(time, markTime - .5, markTime, 100, 0). 
Number numLayers 返回 合成中层的数量。 
Camera activeCamera 从在当前帧中着色合成所经过的摄象机获取值。这不一定是你在合成窗口所看到的。 
Number width 返回合成的宽度，单位为像素（pixels.） 
Number height 返回合成的高度，单位为像素（pixels.） 
Number duration 返回合成的持续时间值,单位为秒。 
Number frameDuration 返回画面的持续时间. 
Number shutterAngle 返回合成中快门角度的度数. 
Number shutterPhase 返回合成中快门相位的度数 
Array [4] bgColor 返回合成背景的颜色。 
Number pixelAspect 返回合成中用width/heigh表示的像素（pixel ）宽高比。 
String name 返回合成的名字。 

## 脚本属性和方法（Footage）

Number width 返回脚本的宽度，单位为像素。 
Number height返回脚本的高度，单位为像素。 
Number duration 返回脚本的持续长度，单位为秒。 
Number frameDuration 返回画面的持续长度，单位为秒。 
Number pixelAspect 返回脚本的像素比, 表示为 width/height. 
String name 返回脚本的名字。 



## 层子对象属性和方法（Layer） 

Comp or Footage source 返回层的源 Comp 或源Footage 对象。默认时间是在这个源中调节的时间。例如, source.layer(1).position. 
Effect effect(name) {name是一个字串} 返回 Effect 对象。 After Effects 在效果控制窗口中用这个名字查找对应的效果。这个名字可以是默认名，也可以是用户自定义名。如果这里有一些相同的效果名则选择效果控制窗口中同名字的最上面的一个效果。 
Effect effect(index) {index 是一个数} 返回 Effect 对象。After Effects 在效果控制窗口中用这个序号查找对应的效果。起始于1 且从顶部开始。 
Mask mask(name) {name是一个字串} 返回层 Mask 对象。 这个名字可以是默认名，也可以是用户自定义名。 
Mask mask(index) {index 是一个数} 返回层 Mask 对象。After Effects 在时间线窗口中用这个序号查找对应的遮罩。起始于1 且从顶部开始。 

### 层的一般属性和方法 

| 属性                           | 解释                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| Number width                   | 返回以像素为单位的层宽度。 它与 source.width相同。           |
| Number height                  | 返回以像素为单位的层高度。 它与 source.height相同。          |
| Number `index`                 | 返回合成中层数。                                             |
| Layer, Light, or Camera parent | 返回层的父层对象, 例如, position[0] + parent.width.          |
| Boolean hasParent              | 如果有父层返回 true ,如果没有父层返回 false .                |
| Number inPoint                 | 返回层的入点,单位为秒.                                       |
| Number outPoint                | 返回层的出点,单位为秒.                                       |
| Number startTime               | 返回层的开始时间,单位为秒.                                   |
| Boolean hasVideo               | 如果有视频(video)返回 true ,如果没有(video)返回 false.       |
| Boolean hasAudio               | 如果有音频(audio)返回 true ,如果没有音频(audio)返回 false.   |
| Boolean active                 | 如果层的视频开关(眼睛 )打开返回 true ,如果层的视频开关(眼睛 )关闭返回 false. |
| Boolean audioActive            | 如果层的音频开关(喇叭 )打开返回 true ,如果层的音频开关(喇叭 )关闭返回 false. |







### Layer 特征属性和方法 

\-------------------------------------------------------------------------------- 
Property [2 or 3] anchorPoint 返回层空间内层的锚点值. 
Property [2 or 3] position 如果该层没有父层,返回本层在世界空间的位置值;如果有父层,返回本层在父层空间的位置值 . 
Property [2 or 3] scale 返回层的缩放值,表示为百分数. 
Property rotation 返回层的旋转度数, 对于3D 层, 它 返回 z旋转度数. 
Property [1] opacity 返回层的透明值,表示为百分数. 
Property [2] audioLevels 返回层的音量属性值,单位为分贝.这是一个2维值;第一个值表示左声道的音量,第二个值表示右声道的音量.这个值不是源声音的幅度,而是音量属性关键帧的值. 
Property timeRemap 当时间重测图被激活时,返回重测图属性时间值,单位是秒. 
Marker Number marker.key(index) {index 是一个数} 返回层的标记数属性值. 可能用到的方法和属性只有key(), nearestKey和numKeys. 
Marker Number marker.key("name") {name是一个字串} 返回层中与指定名对应的标记号.这个名字是标记名, 它在标记对话框的注释区,例如, marker.key("ch1"). 这个值对于 marker keys是一个字串, 不是数字.例如, m1 = marker.key("Start").time; m2 = marker.key("End").time; linear(time, m1, m2, 0, 100); 
Marker Number marker.nearestKey 返回最接近当前时间的标记. 
Number marker.numKeys 返回层中标记的总数. 
String name 返回层名. 

### Layer 3D属性和方法 

\-------------------------------------------------------------------------------- 
Property [3] orientation对3D层 ，返回3D 方向的度数。 
Property [1] rotationX 对3D层，返回 x旋转值的度数。 
Property [1] rotationY 对3D层，返回 Y 旋转值的度数。 
Property [1] rotationZ 对3D层，返回 Z 旋转值的度数。 
Property [1] lightTransmission 对3D层，返回光的传导属性值。 
Property castsShadows 如果层投射阴影返回 1.0 。 
Property acceptsShadows 如果层接受阴影返回 1.0 。 
Property acceptsLights 如果层接受灯光返回 1.0 。 
Property ambient 返回环境因素的百分数值。 
Property diffuse 返回慢射因素的百分数值。 
Property specular 返回镜面因素的百分数值。 
Property shininess 返回发光因素的百分数值。 
Property metal 返回才质因素的百分数值。 

### 层空间转换方法 

\-------------------------------------------------------------------------------- 
Array [2 or 3] toComp(point, t = time) {point 是一个数组[2 or 3], t 是一个数} 从层空间转换一个点到合成空间，例如, toComp(anchorPoint)。 
Array [2 or 3] fromComp(point, t=time) {point 是一个数组[2 or 3], t 是一个数}从合成空间转换一个点到层空间。得到的结果在 3D 层可能是一个非0值。例如 (2D layer), fromComp(thisComp.layer(2).position).
Array [2 or 3] toWorld(point, t=time) {point 是一个数组[2 or 3], t 是一个数} 从层空间转换一个点到视点独立的世界空间。例如, toWorld.effect("Bulge")("Bulge Center"). 
Array [2 or 3] fromWorld(point, t=time) {point 是一个数组[2 or 3], t 是一个数}从世界空间转换一个点到层空间。例如, fromWorld(thisComp.layer(2).position). 
Array [2 or 3] toCompVec(vec, t=time) {vec 是一个数组[2 or 3], t 是一个数} 从层空间转换一个向量到合成空间。例如, toCompVec([1, 0]). 
Array [2 or 3] fromCompVec(vec, t=time) {vec 是一个数组[2 or 3], and t 是一个数} 从合成空间转换一个向量到层空间例如 (2D layer), dir=sub(position, thisComp.layer(2).position); fromCompVec(dir). 
Array [2 or 3] toWorldVec(vec, t=time) {vec 是一个数组[2 or 3], t 是一个数} 从层空间转换一个向量到世界空间。例如, p1 = effect("Eye Bulge 1")("Bulge Center"); p2 = effect("Eye Bulge 2")("Bulge Center"); toWorld(sub(p1, p2)). 
Array [2 or 3] fromWorldVec(vec, t=time) {vec 是一个数组[2 or 3], t 是一个数}从世界空间转换一个向量到层空间。例如, fromWorld(thisComp.layer(2).position). 
Array [2] fromCompToSurface(point, t=time) {point 是一个数组[2 or 3], t 是一个数} 在合成空间中从激活的摄象机观察到的位置的层表面（Z值为0）定位一个点。这对于设置效果控制点有用。仅用于3D层。 

## 摄象机属性和方法（Camera）

\-------------------------------------------------------------------------------- 
Property [3] pointOfInterest 返回在世界空间中摄象机兴趣的的值。 
Property zoom 返回摄象机的缩放值，单位为像素。 
Property depthOfField 如果摄象机景深打开返回 1，否则返回0。 
Property focusDistance 返回摄象机焦距值，单位为像素。 
Property aperture返回摄象机光圈值，单位为像素。 
Property blurLevel 返回摄象机的模糊水平的百分数。 
Boolean active (a) 如果摄象机的视频开关 打开， 返回 true ； (b) 当前时间在摄象机的出入点之间，（c）且它是时间线窗口中列出的第一个摄象机，若以上条件之一不满足，返回 false 。 

## 灯光属性和方法（Light）

\-------------------------------------------------------------------------------- 
Property [3] pointOfInterest 在工作区 返回灯光兴趣点。 
Property intensity 返回灯光亮度的百分数。 
Property [4] color 返回灯光彩色值。 
Property coneAngle 返回灯光光锥角度的度数。 
Property coneFeather 返回灯光光锥的羽化百分数。 
Property shadowDarkness 返回灯光阴影暗值的百分数。 
Property shadowDiffusion 返回灯光阴影扩散的像素。 
Note: 灯光对象的大部分属性和方法与层对象相同, 除 source, effect, mask, width, height, anchorPoint, scale, opacity, audioLevels, timeRemap, 和所有的material 属性。 

## 效果的属性和方法（Effect） 

\-------------------------------------------------------------------------------- 
Boolean active 返回 a true value if the effect is turned on in both the 如果效果在时间线窗口和效果控制窗口都打开返回 true , 如果在以上任意一个窗口关闭，返回false。 
Property param(name) {name是一个字串} 返回 效果里面的属性。例如, .effect("Bulge")("Bulge Height")。效果点控制总是在层空间。 
Property param(index) {index 是一个数} 返回 效果里面的属性。例如, .effect("Bulge")(4) 返回 Bulge Height 属性。 效果点控制总是在层空间。 

## 遮罩属性和方法（Mask） 

Property MaskOpacity 返回遮罩透明值的百分数。 
Property MaskFeather 返回遮罩羽化的像素值。 
Boolean invert 如果遮罩是反向的，返回 true ；否则返回 false。 
Property MaskExpansion 返回 遮罩的像素。 
String name 返回遮罩名。 
String name 返回效果名。 

## 特征属性和方法（property）

### 总集（待分类）


- `Number or Array value` 返回当前时间的属性值。

- `Number or Array valueAtTime(t)` {t 是一个数} 返回指定时间（单位为秒）的属性值。 

- `Number or Array velocity` 返回当前时间的即时速率。对于空间属性，例如位置，它返回切向量值。结果与属性有相同的维度。 

- `Number or Array velocityAtTime(t)` {t 是一个数} 返回指定时间的即时速率。 

- `Number speed` 返回 1D量,正的速度值，等于 在默认时间属性的改变量。 这个元素仅用于空间属性。 
- `Number speedAtTime(t)` {t 是一个数} 返回在指定时间的空间速度。 

- `Number or Array temporalWiggle(freq, amp, octaves=1, ampMult=.5, t=time)`

     {freq, amp, octaves, ampMult, 和 t 是数} 取样摆动时的属性值。

    > Freq 计算每秒摆动的次数，用于计算属性的基本幅度单位，octaves 是加到一起的噪声的倍频数，ampMult 与 amp 相乘的倍数。 t 基于开始时间。 对于这个函数意味着取样的属性必须被激活，因为这个函数仅在取样期间改变属性值，而不是改变了对应的属性值。. 例如, scale.temporalWiggle(5, .2). 

- `Number or Array smooth(width=.2, samples=5, t=time)`

     {width, samples, 和 t 是数} 

    > 应用一个箱形滤波器到指定时间的属性值，并且随着时间的变化使结果变得平滑。Width (秒) 是经过滤波器平均时间的范围。Samples 等于离散样本的平均间隔数 。通常, 你需要的采样（ samples）数是奇数。例如, position.smooth(.1, 5). 

- `Number or Array loopIn(type = "cycle", numKeyframe = 0)`

    > 在层中从入点到第一个关键帧之间循环一个指定时间段的内容。被指定为循环内容的基本段，是从层的第一个关键帧向后到层的出点方向的某个关键帧间的内容。 

    > `numKeyframe`是指定以第一个关键帧为起点设定循环基本内容的关键帧数目（计数不包括第一个关键帧）。例如, loopIn("cycle", 1)从层的入点开始到第一个关键帧结束循环第一个关键帧到第二个关键帧间的内容。循环的次数由入点到第一个关键帧间的时间和循环内容长度决定 。 

- `Number or Array loopOut(type = "cycle", num关键帧 = 0)`

    > 在层中从最后一个关键帧到层的出点之间循环一个指定时间段的内容。被指定为循环内容的基本段，是从层的最后关键帧向前到层的入点方向的某个关键帧间的内容。

    > `numKeyframe`是指定以最后一个关键帧为倒数起点设定循环基本内容的关键帧数目（计数不包括最后一个关键帧）。例如, loopOut("cycle", 1)从层的最后关键帧开始到出点结束循环最后一个关键帧到倒数第二个关键帧间的内容。循环的次数由最后关键帧到出点间的时间和循环内容长度决定 。 

- `Number or Array loopInDuration(type = "cycle", duration = 0)`

    > 在层中从入点到第一个关键帧之间循环一个指定时间段的内容。被指定为循环内容的基本段，是从层的第一个关键帧向后到层的出点方向duration秒的内容。 duration是指定以第一个关键帧为起点设定循环基本内容的时间秒数。例如, loopInDuration("cycle", 1) 从层的入点开始到第一个关键帧结束循环第一个关键帧以后1秒的内容。循环的次数由入点到第一个关键帧间的时间和循环内容长度决定 。 

- `Number or Array loopOutDuration(type = "cycle", duration = 0)`

    > 在层中从最后一个关键帧到层的出点之间循环一个指定时间段的内容。被指定为循环内容的基本段，是从层的最后关键帧向前到层的入点方向duration秒的内容。 duration是指定以最后一个关键帧为倒数起点设定循环基本内容的的时间秒数。如,loopOutDuration("cycle", 1) 从层的最后关键帧开始到出点结束循环最后一个关键帧到倒数倒数1秒时间的内容。循环的次数由最后关键帧到出点间的时间和循环内容长度决定 。


- `Key key(index)` 用数字 返回 key对象。

    > 例如, key(1) 返回第一个关键帧对象。 当访问 key 对象时能获得Time, Index, 和属性值。 例如, 下面的表达式给出了第3个位置关键帧处的位置值：position.key(3).value。下面的表达式，当将它写到设置透明属性动画的层时，将忽略在透明属性中设置的关键帧的值而仅用关键帧定位在什么时间层闪现。d = Math.abs(time - nearestKey(time).time); easeOut(d, 0, .1, 100, 0). 

- `Key key(markerName)` 用这个名字 返回标记的 key 对象。仅用于标记属性。 

- `Key nearestKey(time)` 返回指定时间最近的关键帧对象。 

- `Number numKeys` 返回 在一个属性中 关键帧 的数目。 



### wiggle
> 抖动表达式
> {freq, amp, octaves, ampMult, 和 t 是数} 属性值随机摆动(wiggles) 

`Number or Array wiggle(freq, amp, octaves=1, ampMult=.5, t=time)`

- Freq：频率（num），计算每秒摆动的次数，用于计算属性的基本幅度单位
- amp：振幅（num）
- octaves：原有振幅上再增加抖动（num）
- ampMult：频率倍频（ampMult=.5 .5 表示0.5）
- t：持续时间

（频率和振幅必填，其他选填）

例如
`wiggle(50,100)`
`position.wiggle(7, 30, 3)`



对图层进行的S（缩放属性）填写wiggle表达式时，想让X，Y同时进行放大和缩小，用以下语句

```js
s=wiggle(20,50);
[s[0],s[0]]		// 两个0值定义为X和Y的数值相等
```











## 关键帧属性和方法（Key） 

Number or Array value 返回关键帧的值。 
Number time 返回关键帧的时间。 
Number index 返回 关键帧的序号File菜单 

新建 ← New 
    ┗New Project  → 新建项目 
    New Folder  →新建文件夹 

打开项目 ← Open Project 
打开最近项目 ← Open Recent Projects 
关闭 ← Close 
保存 ← Save 
另存为 ← Save As... 
保存副本 ← Save a Copy... 
恢复 ← Revert 
导入 ← Import 
    ┗File...            → 文件 
    Multiple Files...  →多个文件 
    Placeholder...    →输入占位符 
    Solid...          →实色 
导入最近镜头 ← Import Recent Footage 
输出 ← Export 
查找 ← Find... 
再次查找 ← Find Next 
添加镜头到合成 ← Add Footage to Comp 
选定脚本建立合成 ← New Comp From Selection... 
整理镜头 ← Consolidate All Footage 
删除未用镜头 ← Remove Unused Footage 
简化项目 ← Reduce Project 
文件打包 ← Collect Files... 
浏览文件夹 ← Watch Folder... 
运行脚本 ← Run Script 
建立代理 ← Create Proxy 
┗Still... → 静态图片 
Movie... → 影片 
设置代理 ← Set Proxy 
┗File...  → 文件 
None    →无 
解释镜头 ← Interpret Footage 
┗Main...                  → 常规 
Proxy...                → 代理 
Remember Interpretation  →保存解释 
Apply Interpretation    →应用解释 
替换镜头 ← Replace Footage 
┗File...        → 文件 
Placeholder... → 占位符 
Solid..        → 实色 
重载镜头 ← Reload Footage 
显示所在文件夹 ← Reveal in Explorer 
项目设置 ← Project Settings... 
打印 ← Print... 
退出 ← Exit 
Edit菜单 
撤消 ← Undo Copy 
重复 ← Redo Copy 
历史记录 ← History 
剪切 ← Cut 
复制 ← Copy 
粘贴 ← Paste 
清楚 ← Clear 
副本 ← Duplicate 
分层图层 ← Split Layer 
抽出工作区域 ← Lift Work Area 
挤压工作区域 ← Extrace Work Area 
选择全部 ← Select All 
全部取消 ← Deselect All 
标签 ← Label 
清空 ← Pruge 
┗All          → 全部 
Undo          → 撤消 
Image Caches  → 图象缓存 
Snapshot      → 快照 
Video Memory  → 视频内存 
编辑原稿 ← Edit Original 
模版 ← Templates 
┗Render Settings... → 渲染设置 
Output Module...  → 输出模式 
预置 ← Preferences 
┗General...        → 常规 
Previews...        → 预演 
Display            → 显示 
Import...          → 输入 
Output            → 输出 
Grids & Guides...  → 辅助线及网络 
Label Colors...    → 标签颜色 
Label Defaults...  → 标签设置 
Cache...          → 缓存 
Video Preview...  → 视频预演 



## Animation菜单 

添加关键帧 ← Add Keyframe 
冻结关键帧 ← Toggle Hold Keyframe 
关键帧插值 ← Keyframe Interpolation... 
关键帧速率 ← Keyframe Velcity... 
辅助关键帧 ← Keyframe Assistant 
┗Convert Audio to Keyframes      → 转换音频为关键帧 
Convert Expression to Keyframes → 转换表达式为关键帧 
Easy Ease                      → 缓和曲线 
Easy Ease In                    → 缓和曲线进入 
Easy Ease Out                  → 缓和曲线离开 
Exponential Scale              → 指数缩放 
RPF Camera Import              → RPF摄象机导入 
Sequence Layers...              → 图层排序 
Time-Reverse Keyframes          → 反转关键帧 
文字动画 ← Animate Text 
┗Anchor Point      → 轴心点 
Position          → 位置 
Scale            → 缩放 
Skew              → 倾斜 
Rotation          → 旋转 
Opacity          → 不透明度 
All Transform    → 所有变换 
Fill Color        → 填充色 
Stroke Color      → 描边色 
Stroke Width      → 描边宽度 
Tracking          → 追踪 
Line Anchor      → 线形频谱 
Line Spacing      → 线形间距 
Character Offset  → 字符位移 
Character Value  → 字符值率 
添加文字选择器 ← Add Text Selector 
┗Range  → 平行 
Wiggly → 抖动 
移除所有文字动画 ← Remove All Text Animators 
添加表达式 ← Add Expression 
追踪运动 ← Track Motion 
稳定运动 ← Stabilize Motion 
追踪当前属性 ← Track this property 
显示关键帧 ← Reveal Animating Properties 
显示被修改属性 ← Reveal Modified Properties 

 

 

LOFTER：阿卡 

http://chenfangka.lofter.com/post/1d6c55be_834d984