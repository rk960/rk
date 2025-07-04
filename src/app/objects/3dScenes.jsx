"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDObject({
  geometry = "TorusGeometry",
  material = "MeshBasicMaterial",
  color = "#ffcc70",
  wireframe = false,
  size = 0.5,
  maxPosition = 1,
  animation = true,
  mouseControl = false,
}) {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let renderer;
    let scene;
    let camera;
    let mesh;

    const initThreeScene = async () => {
      const mount = mountRef.current;
      if (!mount) return;

      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;

      // ✅ Renderer
      renderer = await new THREE.WebGLRenderer({ alpha: true, antialias: true });
      await renderer.setSize(width, height);
      await renderer.setClearColor(0x000000, 0);
      await mount.appendChild(renderer.domElement);

      // ✅ Scene & Camera
      scene = await new THREE.Scene();
      camera = await new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
      camera.position.z = 3;

      // ✅ Lights
      const ambientLight = await new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const directionalLight = await new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // ✅ Geometry
      let objectGeometry;
      switch (geometry) {
        case "TorusGeometry":
          objectGeometry = await new THREE.TorusGeometry(0.5, 0.2, 16, 100);
          break;
        case "TorusKnotGeometry":
          objectGeometry = await new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
          break;
        case "SphereGeometry":
          objectGeometry = await new THREE.SphereGeometry(0.7, 32, 32);
          break;
        default:
          objectGeometry = await new THREE.BoxGeometry(1, 1, 1);
      }

      // ✅ Material
      let objectMaterial;
      try {
        objectMaterial = await new THREE[material]({
          color,
          wireframe,
        });
      } catch (err) {
        console.error("Material error:", err);
        objectMaterial = await new THREE.MeshBasicMaterial({ color: "#000000", wireframe: true });
      }

      // ✅ Mesh
      mesh = await new THREE.Mesh(objectGeometry, objectMaterial);

      // ✅ Scaling
      const minDimension = await Math.min(width, height);
      const scaleFactor = await (minDimension / 100) * (size / 3);
      mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

      scene.add(mesh);

      // ✅ Mouse Controls (optional)
      const onMouseMove = async (event) => {
        if (!mouseControl) return;
        const rect = await mount.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        camera.position.x = mouseX * 2;
        camera.position.y = mouseY * 2;
        camera.lookAt(scene.position);
      };
      if (mouseControl) {
        await mount.addEventListener("mousemove", onMouseMove);
      }

      // ✅ Animate
      const animate = async () => {
        animationFrameId = await requestAnimationFrame(animate);
        if (animation) {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
        }
        await renderer.render(scene, camera);
      };

      animate();

      // ✅ Resize
      const handleResize = async () => {
        const newWidth = await mount.clientWidth || window.innerWidth;
        const newHeight = await mount.clientHeight || window.innerHeight;
        await renderer.setSize(newWidth, newHeight);
         camera.aspect = newWidth / newHeight;
        await camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      // ✅ Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (mouseControl) mount.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (renderer) {
          renderer.dispose();
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
        }
      };
    };

    const run = async () => {
      await initThreeScene();
      setIsReady(true); // ✅ Mark component ready only after full setup
    };

    let cleanupFn;
    run().then((cleanup) => {
      cleanupFn = cleanup;
    });

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [geometry, material, color, wireframe, size, maxPosition, animation, mouseControl]);

  // ✅ Until ready, show loading or null
  if (!isReady) {
    return <div style={{ width: "100%", height: "100%", background: "transparent" }}>Loading 3D...</div>;
  }

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: Math.random() > 0.5 ? 1 : -1,
      }}
    />
  );
}
