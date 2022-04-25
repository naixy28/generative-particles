uniform vec3 uLightPosition;

varying vec3 vNormal;
varying float vElevation;
varying vec2 vUv;
varying vec3 vVertexPosition;

void main () {

  vec3 toLight = normalize(uLightPosition - vVertexPosition);

  float cosAngle = dot(vNormal, toLight);
  float lightStrength = clamp(cosAngle, 0.0, 1.0);


  gl_FragColor = vec4(vElevation, lightStrength,  0., 1.0);
} 