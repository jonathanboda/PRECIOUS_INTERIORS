"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface GradientSphereProps {
  position?: [number, number, number];
  scale?: number;
  colorTop?: string;
  colorBottom?: string;
  distortionSpeed?: number;
  distortionAmount?: number;
}

// Custom shader for gradient and distortion
const vertexShader = `
  uniform float uTime;
  uniform float uDistortionAmount;

  varying vec2 vUv;
  varying vec3 vPosition;

  // Simplex noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vUv = uv;

    // Apply noise-based distortion
    float noise = snoise(position * 2.0 + uTime * 0.3) * uDistortionAmount;
    vec3 newPosition = position + normal * noise;

    vPosition = newPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorTop;
  uniform vec3 uColorBottom;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Create gradient based on y position
    float gradientFactor = (vPosition.y + 1.0) * 0.5;
    gradientFactor = smoothstep(0.0, 1.0, gradientFactor);

    // Mix colors with subtle time-based variation
    vec3 color = mix(uColorBottom, uColorTop, gradientFactor);

    // Add subtle shimmer
    float shimmer = sin(vUv.x * 20.0 + uTime) * 0.05 + 0.95;
    color *= shimmer;

    // Add subtle fresnel effect for depth
    float fresnel = pow(1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0))), 2.0);
    color += vec3(fresnel * 0.1);

    gl_FragColor = vec4(color, 0.7);
  }
`;

export default function GradientSphere({
  position = [0, 0, 0],
  scale = 1,
  colorTop = "#c9a227",
  colorBottom = "#1a3a2f",
  distortionSpeed = 0.5,
  distortionAmount = 0.1,
}: GradientSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorTop: { value: new THREE.Color(colorTop) },
      uColorBottom: { value: new THREE.Color(colorBottom) },
      uDistortionAmount: { value: distortionAmount },
    }),
    [colorTop, colorBottom, distortionAmount]
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Update shader uniforms
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = time * distortionSpeed;

    // Subtle rotation
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Mouse responsiveness
    meshRef.current.position.x = position[0] + pointer.x * 0.2;
    meshRef.current.position.y = position[1] + pointer.y * 0.2;

    // Invalidate for demand frameloop
    state.invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
