(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,961175,e=>{"use strict";var a=e.i(314726),o=e.i(899690),t=e.i(552095),u=e.i(185390),l=e.i(283266),r=e.i(109306);class n extends r.Geometry{constructor(e,{attributes:a={}}={}){Object.assign(a,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,a)}}let i=e=>{let a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?[parseInt(a[1],16)/255,parseInt(a[2],16)/255,parseInt(a[3],16)/255]:[1,1,1]},c=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,v=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`,f=new WeakMap;e.s(["default",0,({timeSpeed:e=.25,colorBalance:r=0,warpStrength:m=1,warpFrequency:s=5,warpSpeed:d=2,warpAmplitude:p=50,blendAngle:g=0,blendSoftness:h=.05,rotationAmount:y=500,noiseScale:A=2,grainAmount:C=.1,grainScale:w=2,grainAnimated:S=!1,contrast:x=1.5,gamma:F=1,saturation:b=1,centerX:R=0,centerY:B=0,zoom:W=.9,color1:G="#FF9FFC",color2:T="#5227FF",color3:O="#B497CF",lightMode:M=!1,className:q=""})=>{let L=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let e=L.current;if(!e)return;let a=new t.Renderer({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),o=a.gl,r=o.canvas;r.style.width="100%",r.style.height="100%",r.style.display="block",e.appendChild(r);let i=new n(o),m=new u.Program(o,{vertex:c,fragment:v,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uTimeSpeed:{value:.25},uColorBalance:{value:0},uWarpStrength:{value:1},uWarpFrequency:{value:5},uWarpSpeed:{value:2},uWarpAmplitude:{value:50},uBlendAngle:{value:0},uBlendSoftness:{value:.05},uRotationAmount:{value:500},uNoiseScale:{value:2},uGrainAmount:{value:.1},uGrainScale:{value:2},uGrainAnimated:{value:0},uContrast:{value:1.5},uGamma:{value:1},uSaturation:{value:1},uCenterOffset:{value:new Float32Array([0,0])},uZoom:{value:.9},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uLightMode:{value:0}}}),s=new l.Mesh(o,{geometry:i,program:m});f.set(e,{renderer:a,program:m,mesh:s});let d=()=>{let t=e.getBoundingClientRect(),u=Math.max(1,Math.floor(t.width)),l=Math.max(1,Math.floor(t.height));a.setSize(u,l);let r=m.uniforms.iResolution.value;r[0]=o.drawingBufferWidth,r[1]=o.drawingBufferHeight,a.render({scene:s})},p=new ResizeObserver(d);p.observe(e),d();let g=0,h=!0,y=!document.hidden,A=performance.now(),C=e=>{m.uniforms.iTime.value=(e-A)*.001,a.render({scene:s}),g=requestAnimationFrame(C)},w=()=>{h&&y&&0===g&&(g=requestAnimationFrame(C))},S=()=>{0!==g&&(cancelAnimationFrame(g),g=0)},x=new IntersectionObserver(([e])=>{(h=e.isIntersecting)?w():S()},{threshold:0});x.observe(e);let F=()=>{(y=!document.hidden)?w():S()};return document.addEventListener("visibilitychange",F),w(),()=>{S(),p.disconnect(),x.disconnect(),document.removeEventListener("visibilitychange",F),f.delete(e);try{e.removeChild(r)}catch{}}},[]),(0,o.useEffect)(()=>{let a=L.current;if(!a)return;let o=f.get(a);if(!o)return;let{program:t}=o,u=t.uniforms;u.uTimeSpeed.value=e,u.uColorBalance.value=r,u.uWarpStrength.value=m,u.uWarpFrequency.value=s,u.uWarpSpeed.value=d,u.uWarpAmplitude.value=p,u.uBlendAngle.value=g,u.uBlendSoftness.value=h,u.uRotationAmount.value=y,u.uNoiseScale.value=A,u.uGrainAmount.value=C,u.uGrainScale.value=w,u.uGrainAnimated.value=+!!S,u.uContrast.value=x,u.uGamma.value=F,u.uSaturation.value=b,u.uCenterOffset.value=new Float32Array([R,B]),u.uZoom.value=W,u.uColor1.value=new Float32Array(i(G)),u.uColor2.value=new Float32Array(i(T)),u.uColor3.value=new Float32Array(i(O)),u.uLightMode.value=+!!M},[e,r,m,s,d,p,g,h,y,A,C,w,S,x,F,b,R,B,W,G,T,O,M]),(0,a.jsx)("div",{ref:L,className:`relative h-full w-full overflow-hidden ${q}`.trim()})}],961175)},68170,function(e){e.n(e.i(961175))}]);