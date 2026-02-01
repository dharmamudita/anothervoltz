"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stars, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedGrid() {
    const gridRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    const shader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color("#06b6d4") },
            uColor2: { value: new THREE.Color("#7c3aed") },
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform float uTime;
            void main() {
                vUv = uv;
                vec3 pos = position;
                float elevation = sin(pos.x * 0.5 + uTime * 0.5) * 0.3 + sin(pos.y * 0.3 + uTime * 0.3) * 0.2;
                pos.z += elevation;
                vElevation = elevation;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            void main() {
                float gridX = step(0.98, fract(vUv.x * 30.0));
                float gridY = step(0.98, fract(vUv.y * 30.0));
                float grid = max(gridX, gridY);
                vec3 color = mix(uColor1, uColor2, vUv.y + vElevation * 0.5);
                float fadeX = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
                float fadeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
                float alpha = grid * fadeX * fadeY * 0.2; // Opacity reduced to 0.2
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
    }), []);

    useFrame((state) => {
        if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        if (gridRef.current) gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 2;
    });

    return (
        <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[80, 80, 60, 60]} />
            <shaderMaterial ref={materialRef} {...shader} side={THREE.DoubleSide} />
        </mesh>
    );
}

function CentralSphere() {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0.5, -2]}>
                <MeshDistortMaterial color="#06b6d4" distort={0.4} speed={2} roughness={0.2} metalness={0.8} transparent opacity={0.3} />
            </Sphere>
        </Float>
    );
}

function FloatingCube({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.elapsedTime + delay;
            mesh.current.rotation.x = t * 0.5;
            mesh.current.rotation.y = t * 0.3;
            mesh.current.position.y = position[1] + Math.sin(t) * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshPhongMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} transparent opacity={0.7} wireframe />
            </mesh>
        </Float>
    );
}

function CameraAnimation() {
    const { camera } = useThree();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        camera.position.x = Math.sin(t * 0.05) * 0.5;
        camera.position.y = 1 + Math.sin(t * 0.05) * 0.2;
        camera.lookAt(0, 0, -5);
    });
    return null;
}

export default function TechScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-[#030014]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={75} />
                <CameraAnimation />
                <fog attach="fog" args={["#030014", 3, 20]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={15} color="#06b6d4" />
                <spotLight position={[-10, 5, 5]} angle={0.3} penumbra={1} intensity={10} color="#7c3aed" />
                <pointLight position={[0, 5, -5]} intensity={5} color="#ec4899" />
                <AnimatedGrid />
                <CentralSphere />
                <FloatingCube position={[-2.5, 0.5, -3]} delay={0} />
                <FloatingCube position={[2.5, 1, -5]} delay={1} />
                <FloatingCube position={[1, 2.5, -2]} delay={2} />
                <FloatingCube position={[-1.5, -0.5, -4]} delay={3} />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
            </Canvas>
        </div>
    );
}
