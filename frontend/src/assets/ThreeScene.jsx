import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  let mount = useRef(null);
  let renderer = new THREE.WebGLRenderer();
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  useEffect(() => {
    // Create geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up renderer, camera, and lighting
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 4;

    // Add canvas element to the DOM where you want to render your scene
    mount.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderScene();
    };

    animate();

    return () => {
      //mount.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
};

export default ThreeScene;
