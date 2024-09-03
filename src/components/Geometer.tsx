// Package imports
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface GeometerProps {
  pageState: number;
}

export default function Geometer(props: GeometerProps): React.ReactElement {
  // Reference the mount node
  const mountRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  //Destructuring props
  const { pageState }: { pageState: number } = props;

  // Gigachad useEffect to establish the whole scene
  useEffect((): void | (() => void) => {
    if (!mountRef.current) return;

    const divHeight: number = mountRef.current.clientHeight;

    // Declarations to establish scene
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      divHeight / divHeight,
      0.1,
      1000
    );
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // Situating scene

    renderer.setSize(divHeight, divHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry & textures
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const torusGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry(
      14, // radius
      4.5, // choob radius
      75, // radial segmentation
      12 // tubular segments
    );
    const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
      24, // radius of the sphere
      16, // widthSegments — number of horizontal segments
      20 // heightSegments — number of vertical segments
    );
    const torusKnot: THREE.Mesh = new THREE.Mesh(torusGeometry, material);
    const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material);

    // Polygon..
    const createIrregularGeometry = (): THREE.BufferGeometry => {
      const polygonalGeometry: THREE.BufferGeometry =
        new THREE.BufferGeometry();
      const vertices: Float32Array = new Float32Array([
        0,
        5,
        -5, // Vertex 0
        15,
        0,
        0, // Vertex 1
        10,
        10,
        0, // Vertex 2
        5,
        15,
        5, // Vertex 3
        0,
        10,
        10, // Vertex 4
        -5,
        5,
        15, // Vertex 5
        10, 10, 5, // Vertex 6 - new
        5, 0, 15   // Vertex 7 - new
      ]);
      polygonalGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );

      const indices2: number[] = [
          2, 3, 4,   // Face 1
          0, 4, 1,   // Face 2
          1, 4, 2,   // Face 3
          0, 1, 2,   // Face 4
          4, 0, 2,   // Face 5
          1, 3, 2,    // Face 6 
          6, 3, 4,   // Face 7 - new
          7, 6, 4,   // Face 8 - new
          7, 4, 1,   // Face 9 - new
          6, 7, 1,   // Face 10 - new
          1, 2, 6,   // Face 11 - new
          2, 3, 6    // Face 12 - new      
      ]


      polygonalGeometry.setIndex(indices2);
      polygonalGeometry.computeVertexNormals();
      return polygonalGeometry;
    };
    const polygon: THREE.Mesh = new THREE.Mesh(
      createIrregularGeometry(),
      material
    );
    polygon.scale.set(2, 1.5, 1);  // 2x width, 1x height, 3x depth

    

    let shape: THREE.Mesh | null = null;
    switch (pageState) {
      case 0:
        shape = torusKnot;
        break;
      case 1:
        shape = polygon;
        break;
      case 2:
        shape = sphere;
        break;
    }

    if (shape) {
      scene.add(shape);
    }

    // Camera Position
    camera.position.z = 50;

    // Increment the angle at a constant rate
    let angle: number = 0;
    angle += 0.05;

    // Calculate rotation speed using sine to create an ease-in-out effect
    const speed: number = Math.sin(angle) * 0.125;

    // Animation loop
    const animate = (): void => {
      if (!shape) return;
      requestAnimationFrame(animate);
      shape.rotation.x += speed / 2;
      shape.rotation.y += speed;
      renderer.setClearColor(0x343434, 0);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const handleResize = (): void => {
      renderer.setSize(divHeight, divHeight);
      camera.aspect = divHeight / divHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);

      if (!mountRef.current || !shape) return;
      mountRef.current.removeChild(renderer.domElement);
      scene.remove(shape);
      renderer.dispose();
    };
  }, [pageState]);

  return (
    <div
      id="three-mount"
      className=" flex row center"
      ref={mountRef as React.RefObject<HTMLDivElement>}
    />
  );
}
