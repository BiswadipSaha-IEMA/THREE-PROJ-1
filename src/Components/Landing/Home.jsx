import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function Home() {
  const webGl = useRef(null);
  const cursorTrack = useRef(null);

  useEffect(() => {
    const webGlCanvas = webGl.current;
    const cursorTracker = cursorTrack.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: webGlCanvas });
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const count = 8100;
    const positionArray = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const points = new THREE.Mesh(geometry, material);
    scene.add(points);

    controls.enableDamping = true;

    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      const rect = webGlCanvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      cursorTracker.style.transform = `translate(-50%, -50%) translate(${event.clientX}px, ${event.clientY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, [webGl]);

  return (
    <div className="relative webGl">
      <div className="absolute z-10 text-[#fff] w-full flex justify-center items-center">
        Hello World! This IS Biswadip Saha
      </div>
      <canvas ref={webGl} className="absolute top-0 left-0 w-full h-full" />
      <div
        ref={cursorTrack}
        className="cursorTracker w-[50px] h-[50px] bg-[#fff] z-20 rounded-full pointer-events-none"
      ></div>
    </div>
  );
  
}

export default Home;
