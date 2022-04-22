uniform float uSize;
uniform float uTime;
uniform float uHoleRadius;
attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;
 
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // hole
    float minDistance = sqrt(uHoleRadius * uHoleRadius - modelPosition.y * modelPosition.y);


    float angle = atan(modelPosition.z, modelPosition.x);
    float distanceToCenter = distance(modelPosition.xz, vec2(0.0));
    float angleOffset = 1.0 / distanceToCenter * uTime * 0.2;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * aScale * (1.0 / - viewPosition.z);

    float visiblily = step(minDistance, distanceToCenter);
    vColor = color * visiblily;
}