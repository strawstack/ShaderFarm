uniform float resolution;

void main() {
    float x = gl_FragCoord.x/resolution;
    float y = gl_FragCoord.y/resolution;
    gl_FragColor = vec4(vec3(x, y, 1.0), 1.0);
}
