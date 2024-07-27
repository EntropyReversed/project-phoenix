var t=Object.defineProperty,e=(e,i,s)=>((e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s)(e,"symbol"!=typeof i?i+"":i,s);import{createNoise2D as i}from"https://unpkg.com/simplex-noise@4.0.2/dist/esm/simplex-noise.js";import*as s from"https://cdn.jsdelivr.net/npm/three@0.166.1/+esm";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();class r{constructor({wrap:t,vertical:s,amplitude:r,frequency:a,attenuation:n,speed:o,flip:h}){e(this,"lastTime",0),e(this,"deltaTime",0),e(this,"lineResolution",3),e(this,"isVisible",!1),this.wrap=t,this.isVertical=s,this.amplitudeStrength=r,this.frequency=a,this.attenuationPower=n,this.speed=o,this.flip=h,this.canvas=document.createElement("canvas"),this.wrap.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.noise=i(),this.init()}createGradient(t){const e=this.hexToRgb(t),i=this.isVertical?this.ctx.createLinearGradient(0,0,0,this.canvas.height):this.ctx.createLinearGradient(0,0,this.canvas.width,0);return i.addColorStop(0,`rgba(${e}, 0)`),i.addColorStop(.05,`rgba(${e}, 0)`),i.addColorStop(.3,`rgba(${e}, 0.2)`),i.addColorStop(.5,`rgba(${e}, 1)`),i.addColorStop(.7,`rgba(${e}, 0.2)`),i.addColorStop(.95,`rgba(${e}, 0)`),i.addColorStop(1,`rgba(${e}, 0)`),i}calcLineOffset(t,e,i,s){const{amplitude:r,frequency:a,noiseOffset:n,time:o}=e;return s+(this.noise(t*a+n,o)-1)*r*Math.sin(t/i*Math.PI)**this.attenuationPower}draw(t){this.isVisible&&(this.deltaTime=(t-this.lastTime)/1e3,this.lastTime=t,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.linesParams.forEach((t=>{const e=this.createGradient(t.color);if(this.ctx.beginPath(),this.isVertical){this.ctx.moveTo(this.canvas.width,0);for(let e=0;e<this.canvas.height;e+=this.lineResolution){const i=this.calcLineOffset(e,t,this.canvas.height,this.canvas.width);this.ctx.lineTo(i,e)}}else{this.ctx.moveTo(0,this.canvas.height);for(let e=0;e<this.canvas.width;e+=this.lineResolution){const i=this.calcLineOffset(e,t,this.canvas.width,this.canvas.height);this.ctx.lineTo(e,i)}}this.ctx.strokeStyle=e,this.ctx.lineWidth=1.5*this.ratio,this.ctx.stroke(),t.time+=.05*this.deltaTime*(this.speed+.5*Math.random())}))),requestAnimationFrame(this.draw.bind(this))}hexToRgb(t){return`${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)}`}setUpSize(){this.scaleCanvas(this.wrap.offsetWidth,this.wrap.offsetHeight);new ResizeObserver((()=>{this.scaleCanvas(this.wrap.offsetWidth,this.wrap.offsetHeight),this.updateAmplitude(this.isVertical?.5*this.canvas.width*this.amplitudeStrength:.5*this.canvas.height*this.amplitudeStrength)})).observe(this.wrap)}scaleCanvas(t,e){if(void 0===typeof window)return null;this.ratio=Math.max(1.5,window.devicePixelRatio),this.canvas.width=t*this.ratio,this.canvas.height=e*this.ratio,this.canvas.style.width=`${t}px`,this.canvas.style.height=`${e}px`}setupIntersectionObserver(){new IntersectionObserver((t=>{t.forEach((t=>{this.isVisible=t.isIntersecting}))}),{root:null,rootMargin:"0px",threshold:0}).observe(this.wrap)}updateAmplitude(t){this.linesParams.forEach((e=>e.amplitude=t))}spreadColors(t,e){if(4===t.length&&6===e)return[t[0],t[0],t[1],t[1],t[2],t[3]];const i=[],s=Math.ceil(e/t.length);let r=0;for(let a=0;a<e;a++)a%s==0&&0!==a&&r++,i.push(t[r%t.length]);return i}nameToHex(t){return this.ctx.fillStyle=t,this.ctx.fillStyle}setUpLines(){const t=this.nameToHex("#39EED8"),{colorOne:e,colorTwo:i,colorThree:s,colorFour:r}=this.wrap.dataset,a=[e,i,s,r].filter(Boolean).map((t=>this.nameToHex(t)));0===a.length&&a.push(t),this.linesParams=this.spreadColors(a,6).map((t=>({color:t,amplitude:1,frequency:.01*this.frequency/this.ratio+.001*Math.random(),noiseOffset:1e3*Math.random(),time:0}))),this.flip&&(this.canvas.style.transform=`scale${this.isVertical?"X":"Y"}(-1)`)}init(){this.setUpSize(),this.setUpLines(),this.setupIntersectionObserver(),this.draw(0)}}class a{constructor({container:t,boxSize:i,gap:s,rows:r,cols:a}){e(this,"seed",Math.random()),e(this,"startTime",Date.now()),e(this,"isVisible",!1),e(this,"animate",(()=>{if(requestAnimationFrame(this.animate),this.isVisible){const t=(Date.now()-this.startTime)/1e3;this.scene.children[0].material.uniforms.uTime.value=t,this.renderer.render(this.scene,this.camera)}})),this.container=t,this.boxSize=i,this.gap=s,this.rows=r,this.cols=a,this.canvasSize={w:this.cols*(this.boxSize+this.gap)-this.gap,h:this.rows*(this.boxSize+this.gap)-this.gap},this.init()}setupIntersectionObserver(){new IntersectionObserver((t=>{t.forEach((t=>{this.isVisible=t.isIntersecting}))}),{root:null,rootMargin:"0px",threshold:0}).observe(this.container)}createBoxes(){const t=new s.PlaneGeometry(this.canvasSize.w,this.canvasSize.h),e=new s.ShaderMaterial({uniforms:{uTime:{value:0},uGap:{value:this.gap},uCols:{value:this.cols},uColor:{value:new s.Color("rgb(178, 169, 184)")},uSeed:{value:this.seed},uCanvasSize:{value:new s.Vector2(this.canvasSize.w,this.canvasSize.h)}},vertexShader:"\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",fragmentShader:"\n        uniform float uTime;\n        uniform float uGap;\n        uniform float uCols;\n        uniform float uSeed;\n        uniform vec3 uColor;\n        uniform vec2 uCanvasSize;\n        varying vec2 vUv;\n\n        float random(vec2 st) {\n          return fract(sin(dot(st.xy + uSeed, vec2(12.9898, 78.233))) * 43758.5453123);\n        }\n      \n        void main() {\n          float boxSize = (uCanvasSize.x - uGap * (uCols - 1.0)) / uCols;\n          vec2 gridSize = vec2((boxSize + uGap) / uCanvasSize.x, (boxSize + uGap) / uCanvasSize.y);\n          vec2 cell = floor(vUv / gridSize);\n          vec2 cellUv = (vUv - cell * gridSize) / gridSize;\n          \n          if (cellUv.x > boxSize / (boxSize + uGap) || cellUv.y > boxSize / (boxSize + uGap)) {\n            discard;\n          }\n          \n          float opacity = sin(uTime * 2.0 + random(cell) * 10.0) * 0.5 + 0.5;\n          \n          gl_FragColor = vec4(uColor, opacity);\n        }\n      ",transparent:!0}),i=new s.Mesh(t,e);i.position.z=-.01,this.scene.add(i)}init(){this.scene=new s.Scene,this.camera=new s.OrthographicCamera(-this.canvasSize.w/2,this.canvasSize.w/2,this.canvasSize.h/2,-this.canvasSize.h/2,.01,10),this.renderer=new s.WebGLRenderer({alpha:!0,colorSpace:s.SRGBColorSpace}),this.renderer.setSize(this.canvasSize.w,this.canvasSize.h),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement),this.createBoxes(),this.setupIntersectionObserver(),this.animate()}}class n{constructor({wrap:t,cols:i,rows:s,size:r,gap:a}){e(this,"svgNS","http://www.w3.org/2000/svg"),e(this,"timeline",gsap.timeline()),e(this,"omitIndexes",{"2x10":[0,3,5,6,9,10,12,18]}),e(this,"probability",.4),this.wrap=t,this.cols=i,this.rows=s,this.size=r,this.gap=a,this.init()}setupIntersectionObserver(){const t=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&(this.animateIn(!0),t.disconnect())}))}),{root:null,rootMargin:"0px",threshold:1});t.observe(this.wrap)}animateIn(t=!1){this.timeline.clear(),this.timeline.to(this.dots,{keyframes:{opacity:[1,.2,.8,.1,1,.5,1,.3,1]},duration:1,yoyo:!t,repeat:t?0:-1,ease:"none",stagger:{from:"random",ease:"none",amount:1}})}animateOut(){this.timeline.clear(),this.timeline.to(this.dots,{opacity:1,duration:1,overwrite:!0})}createSVG(){this.svg=document.createElementNS(this.svgNS,"svg");const t=2*this.size,e=t+this.gap,i=this.cols*(this.gap+t)-this.gap,s=this.rows*(this.gap+t)-this.gap;this.svg.setAttribute("width",i),this.svg.setAttribute("height",s),this.svg.setAttribute("viewBox",`0 0 ${i} ${s}`),this.svg.setAttribute("fill","none"),this.svg.setAttribute("xmlns",this.svgNS);const r=`${this.cols}x${this.rows}`,a=new Set(this.omitIndexes[r]||[]);let n=0;for(let o=0;o<this.rows;o++)for(let t=0;t<this.cols;t++){if(!a.has(n)&&(a.size>0||Math.random()>this.probability)){const i=document.createElementNS(this.svgNS,"circle"),s=this.size+t*e,r=this.size+o*e;i.setAttribute("cx",s),i.setAttribute("cy",r),i.setAttribute("r",this.size),i.setAttribute("fill","#93957B"),this.svg.appendChild(i)}n++}return this.svg}init(){this.setupIntersectionObserver(),this.wrap.appendChild(this.createSVG()),this.dots=this.wrap.querySelectorAll("circle"),this.wrap.addEventListener("mouseenter",(()=>{this.animateIn()})),this.wrap.addEventListener("mouseleave",(()=>{this.animateOut()}))}}gsap.registerPlugin(MotionPathPlugin);class o{constructor({wrap:t}){this.wrap=t,this.svg=this.wrap.querySelector("svg"),this.ship=this.svg.querySelector(".ship"),this.grip=this.svg.querySelector(".grid"),this.dots=this.svg.querySelectorAll(".dots circle"),this.circles=this.svg.querySelectorAll(".circles > g"),this.pathMain=this.svg.querySelector(".path-main"),this.pathBranch=this.svg.querySelector(".path-branch"),this.pathShip=this.svg.querySelector(".path-ship"),this.barGraph=this.svg.querySelector(".bar-graph"),this.barGraphTop=this.svg.querySelector(".bar-graph-top"),this.timeline=gsap.timeline({paused:!0}),this.init()}trackSvgHeight(){this.wrap.style.height=`${this.svg.getBoundingClientRect().height}px`;new ResizeObserver((t=>{for(const e of t)e.target.style.height=`${this.svg.getBoundingClientRect().height}px`})).observe(this.svg)}createTimeline(){this.timeline.addLabel("shipStart","start+=0.9").set(this.circles,{"--offset":0}).to(this.dots,{y:0,opacity:1,duration:1,ease:"power2.out",stagger:{amount:1}},"start").to(this.circles,{"--offset":1,z:0,ease:"power2.out",stagger:.1,duration:1},"start").to(this.pathMain,{strokeDashoffset:0,duration:1},"start").to(this.pathBranch,{strokeDashoffset:0,duration:1},"start+=0.6").to(this.barGraph,{opacity:1,duration:1},"start+=1.6").to(this.barGraphTop,{y:3,repeat:-1,yoyo:!0,duration:1,ease:"circ.in"},"start+=2").to(this.pathShip,{keyframes:{strokeDashoffset:[gsap.getProperty(this.pathShip,"strokeDashoffset"),0,0],opacity:[1,1,1,0,0],easeEach:"none"},repeat:-1,duration:6,ease:"none"},"shipStart").to(this.ship,{duration:6,repeat:-1,keyframes:{scale:[0,1,1,1,0,0,0,0],easeEach:"none"},ease:"none"},"shipStart").to(this.ship,{duration:3,repeat:-1,motionPath:{path:this.pathShip,align:this.pathShip,autoRotate:10,alignOrigin:[1,.3]},repeatDelay:3,ease:"none"},"shipStart")}setupIntersectionObserver(){const t=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&(this.timeline.play(),t.disconnect())}))}),{root:null,rootMargin:"0px",threshold:1});t.observe(this.wrap)}init(){this.trackSvgHeight(),this.createTimeline(),this.setupIntersectionObserver()}}gsap.registerPlugin(ScrollTrigger);class h{constructor(t){this.cards=document.querySelectorAll(t),this.initAnimation()}initAnimation(){this.cards.forEach(((t,e)=>{const i=gsap.timeline({scrollTrigger:{trigger:t,start:()=>`top-=${2*t.offsetHeight} center`,end:()=>`bottom+=${1*t.offsetHeight} center-=${3*t.offsetHeight}`,scrub:1,invalidateOnRefresh:!0}}),s=t.querySelector(".inner");i.to(s,{scale:1,opacity:1,duration:1.5}),e!==this.cards.length-1?i.to(s,{scale:.3,duration:2}).to(s,{opacity:.1,duration:1},"<"):i.to({},{duration:2})}))}}document.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelectorAll(".blinking-boxes"),e=document.querySelectorAll(".blinking-dots"),i=document.querySelectorAll(".animated-graph"),s=document.querySelector(".trajectory-map");document.querySelector(".path-animation");const c=document.querySelector(".vertical-items");t.length&&t.forEach((t=>{const{size:e,gap:i,rows:s,cols:r}=t.dataset;new a({container:t,boxSize:Number(e??4),gap:Number(i??2),rows:Number(s??24),cols:Number(r??8)})})),e.length&&e.forEach((t=>{const{size:e,gap:i,rows:s,cols:r}=t.dataset;new n({wrap:t,cols:Number(r??2),rows:Number(s??10),size:Number(e??2.5),gap:Number(i??5)})})),s&&new o({wrap:s}),i.length&&(i.forEach(((t,e)=>{const{vertical:i,amplitude:s,frequency:a,attenuation:n,speed:o,flip:h}=t.dataset;new r({wrap:t,vertical:"true"===i,amplitude:Number(s??1),frequency:Number(a??1),attenuation:Number(n??2),speed:Number(o??1),flip:"true"===h})})),c&&new h(".vertical-item"))}));
