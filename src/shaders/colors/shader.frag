uniform float resolution;
float cnoise(vec2); // See def below main

void main() {
    float x = gl_FragCoord.x/resolution * 100.0;
    float y = gl_FragCoord.y/resolution * 100.0;
    float xf = floor(x) / 20.0;
    float yf = floor(y) / 20.0;
    float z = abs(cnoise(vec2(xf, yf))) + 0.2;

    float x2 = gl_FragCoord.x/resolution * 100.0;
    float y2 = gl_FragCoord.y/resolution * 100.0;
    float xf2 = floor(y2) / 20.0;
    float yf2 = floor(x2) / 20.0;
    float z2 = abs(cnoise(vec2(xf2, yf2))) + 0.2;

    float x3 = gl_FragCoord.x/resolution * 100.0;
    float y3 = gl_FragCoord.y/resolution * 100.0;
    float xf3 = floor(x3 + y3) / 20.0;
    float yf3 = floor(x3 / y3) / 20.0;
    float z3 = abs(cnoise(vec2(xf3, yf3))) + 0.2;

    gl_FragColor = vec4(vec3(z, z2, z3), 1.0);
}




//  Classic Perlin 2D Noise by Stefan Gustavson
//  From: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0); vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0); Pi = mod(Pi, 289.0); vec4 ix = Pi.xzxz; vec4 iy = Pi.yyww; vec4 fx = Pf.xzxz; vec4 fy = Pf.yyww; vec4 i = permute(permute(ix) + iy); vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; vec4 gy = abs(gx) - 0.5; vec4 tx = floor(gx + 0.5); gx = gx - tx; vec2 g00 = vec2(gx.x,gy.x); vec2 g10 = vec2(gx.y,gy.y); vec2 g01 = vec2(gx.z,gy.z); vec2 g11 = vec2(gx.w,gy.w); vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)); g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w; float n00 = dot(g00, vec2(fx.x, fy.x)); float n10 = dot(g10, vec2(fx.y, fy.y)); float n01 = dot(g01, vec2(fx.z, fy.z)); float n11 = dot(g11, vec2(fx.w, fy.w)); vec2 fade_xy = fade(Pf.xy); vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x); float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}