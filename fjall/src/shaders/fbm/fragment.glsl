// uniform vec3 uDepthColor;
// uniform vec3 uSurfaceColor;
// uniform float uColorOffset;
// uniform float  uColorMultiplier;

varying float vElevation;
varying vec2 vUv;

void main () {
  // float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  // vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  gl_FragColor = vec4(vElevation, vElevation,  vElevation, 1.0);
} 