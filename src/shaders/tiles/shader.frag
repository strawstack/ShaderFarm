uniform float resolution;

void main() {
    float x = gl_FragCoord.x/resolution * 10.0;
    float y = gl_FragCoord.y/resolution * 10.0;
    float xf = floor(x) / 10.0;
    float yf = floor(y) / 10.0;
    gl_FragColor = vec4(vec3(xf, yf, 0.0), 1.0);
}
