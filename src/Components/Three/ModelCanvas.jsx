import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function SpinningSubscriptionChart() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <group ref={ref}>
      {/* Main chart base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.4} roughness={0.3} />
      </mesh>
      
      {/* Data bars representing subscription metrics */}
      <mesh castShadow receiveShadow position={[-0.8, 0.5, 0]} scale={[0.1, 1, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06B6D4" metalness={0.5} roughness={0.2} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[-0.4, 0.8, 0]} scale={[0.1, 1.6, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.2} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0, 1.2, 0]} scale={[0.1, 2.4, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.5} roughness={0.2} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0.4, 0.9, 0]} scale={[0.1, 1.8, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#EF4444" metalness={0.5} roughness={0.2} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0.8, 0.6, 0]} scale={[0.1, 1.2, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Floating subscription icons */}
      <mesh castShadow receiveShadow position={[0, 2, 0]} scale={0.3}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

const ModelCanvas = () => {
  return (
    <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} castShadow />
        <Suspense fallback={null}>
          <SpinningSubscriptionChart />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelCanvas;


