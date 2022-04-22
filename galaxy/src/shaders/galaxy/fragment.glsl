varying vec3 vColor;

void main() {

  // Disc
  // float len = distance(vec2(0.5), gl_PointCoord);
  // float strength = 1.- step(0.5, len);

  // Deffuse point
  // float strength = distance(vec2(0.5), gl_PointCoord);
  // strength *= 2.;
  // strength = 1. - strength;

  // Light point
  float strength = distance(vec2(0.5), gl_PointCoord);
  strength = 1. - strength;
  strength = pow(strength, 10.);

  vec3 color = mix(vec3(0.), vColor, strength);



  gl_FragColor = vec4(color, 1.0);
}