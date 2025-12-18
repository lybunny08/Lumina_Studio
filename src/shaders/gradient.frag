uniform float uTime;
uniform float uSpeed;
uniform float uZoom;
uniform float uGrainAmount;
uniform float uGrainSpeed;

uniform float uDebug; // debug toggle (0 = off, 1 = on)

uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform vec2 uResolution;

uniform sampler2D uNoise;
uniform sampler2D uGradient;
uniform sampler2D uCursorTexture;

varying vec2 vUv;

vec3 saturation(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);

    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

vec2 rotateUV(vec2 uv, float rotation) {
    float mid = 0.5;

    return vec2(cos(rotation)*(uv.x-mid)+sin(rotation)*(uv.y-mid)+mid, cos(rotation)*(uv.y-mid)-sin(rotation)*(uv.x-mid)+mid);
}

vec3 mod289(vec3 x) {
    return x-floor(x*(1.0/289.0))*289.0;
}

vec2 mod289(vec2 x) {
    return x-floor(x*(1.0/289.0))*289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v+dot(v, C.yy));
    vec2 x0 = v-i+dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x>x0.y)? vec2(1.0, 0.0): vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy+C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y+vec3(0.0, i1.y, 1.0))+i.x+vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5-vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0*fract(p*C.www)-1.0;
    vec3 h = abs(x)-0.5;
    vec3 ox = floor(x+0.5);
    vec3 a0 = x-ox;
    m *= 1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x = a0.x*x0.x+h.x*x0.y;
    g.yz = a0.yz*x12.xz+h.yz*x12.yw;

    return 130.0*dot(m, g);
}

float gradientShaderFbm(vec2 pos, float time, float speed) {
    float a = sin(time*speed);
    float b = cos(time*speed);
    mat2 m = mat2(-0.80, 0.36, -0.60, -0.48);
    float total = 0.0;
    total += 0.2500*snoise(pos) * b;

    return total;
}

vec4 gradientShader(vec2 uv, float time, float speed, float multiplier) {
    vec2 pos = uv.xy*0.05;
    vec2 q = vec2(gradientShaderFbm(pos+vec2(0.0), time, speed), gradientShaderFbm(pos+vec2(0.0), time, speed));
    float c = gradientShaderFbm(pos+sin(time*speed)*multiplier*q, time, speed);

    return vec4(vec3(c), 1.0);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 contrast(vec3 color, float value) {
    return 0.5+value*(color-0.5);
}

void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.2);

    vec4 noiseTex = texture2D(uNoise, uv);
    vec4 mouseTex = texture2D(uCursorTexture, uv);
    float amplitude = 0.3;

    // Convert normalized values into regular unit vector
    float vx = -(mouseTex.r * 2. - 1.);
    float vy = (mouseTex.g * 2. - 1.);

    uv.x += noiseTex.r * vx * amplitude * mouseTex.b;
    uv.y += noiseTex.r * vy * amplitude * mouseTex.b;

    //vec2 gradientShaderUv1 = uv;
    //vec2 gradientUv2 = uv;
    //vec2 gradientUv3 = uv;
    vec2 gradientUV = uv;

    //gradientShaderUv1.xy *= 15.5;
    //gradientShaderUv1.xy += .15;
    //gradientShaderUv1.y /= 1.5;
    //gradientShaderUv1.x *= .75;
    //gradientShaderUv1 = rotateUV(gradientShaderUv1, uTime * .01);

    //vec4 gradientShader1 = gradientShader(gradientShaderUv1, uTime, 0.0, 1.);

    //gradientShader1 /= .5;
    //gradientUv3 = rotateUV(gradientUv3, uTime * .25);
    //gradientUv3.xy -= .5;
    //gradientUv3.xy *= .15;
    //gradientUv3.xy += .5;
    //gradientUv3.xy -= .5;
    //gradientUv3.xy *= gradientShader1.r * 25.;
    //gradientUv3.xy += .5;

    vec2 gradientShaderUv2 = uv * uZoom;

    gradientShaderUv2.xy *= (uResolution.x / uResolution.y) * 10.;
    gradientShaderUv2.y *= uResolution.y / uResolution.x;
    gradientShaderUv2.xy += uTime * .05;
    gradientShaderUv2 = rotateUV(gradientShaderUv2, uTime * .05);

    vec4 gradientShader2 = gradientShader(gradientShaderUv2, uTime, uSpeed, 1.);
    gradientShader2 /= .25;

    // Stronger time-based UV shift to make motion visible
    gradientUV = rotateUV(gradientUV, uTime * uSpeed * 0.6);

    // Add a noticeable traveling offset
    gradientUV += vec2(sin(uTime * uSpeed * 0.35), cos(uTime * uSpeed * 0.2)) * 0.25;

    gradientUV.xy -= .5;
    gradientUV.y *= uResolution.y / uResolution.x;
    gradientUV.xy += .5;
    gradientUV.xy -= .5;
    gradientUV.y *= gradientShader2.r * 4.;
    gradientUV.xy += .5;

    vec4 gradientTexture = texture2D(uGradient, gradientUV);

    vec2 grainedUv = uv + snoise(uv * 400.0);
    float grainSpeed = uGrainSpeed;
    float grain = snoise(grainedUv + uTime * random(grainedUv) * grainSpeed);
    vec3 bg = vec3(grain) * uGrainAmount;

    // Visible color modulation based on time to confirm animation
    float modAmp = 0.35;
    float colorMod = sin(uTime * uSpeed * 1.8) * modAmp;
    vec3 colorShift = vec3(0.6, 0.15, 0.5) * colorMod;

    // Debug overlay: a visible red oscillation when uDebug == 1.0
    float t = sin(uTime * 2.0) * 0.5 + 0.5;
    vec3 debugColor = vec3(t, 0.0, 0.0);

    gl_FragColor = vec4(gradientTexture.rgb + bg + colorShift + debugColor * uDebug, 1.);
}