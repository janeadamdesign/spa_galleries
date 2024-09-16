// Package imports
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface GeometerProps {
  pageState: number;
  isHorizontal: boolean;
}

export default function Geometer(props: GeometerProps): React.ReactElement {
  //Destructuring props
  const {
    pageState,
    isHorizontal,
  }: { pageState: number; isHorizontal: boolean } = props;

  // Reference the mount node
  const mountRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  // Gigachad useEffect to establish the whole scene
  useEffect((): void | (() => void) => {
    if (!mountRef.current) return;
    const mounted: HTMLDivElement = mountRef.current;
    const divHeight: number = mounted.clientHeight;
    const divWidth: number = mounted.clientWidth;
    const sizeConst: number =
      pageState === 3 ? Math.min(divHeight, divWidth) : divHeight;

    // Declarations to establish scene
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizeConst / sizeConst,
      0.1,
      1000
    );
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // Situating scene

    renderer.setSize(sizeConst, sizeConst);
    mounted.appendChild(renderer.domElement);

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

    // Polygon
    const calculateCentroid = (vertices: Float32Array): THREE.Vector3 => {
      let sumX: number = 0;
      let sumY: number = 0;
      let sumZ: number = 0;
      const numVertices: number = vertices.length / 3;
      for (let i: number = 0; i < vertices.length; i += 3) {
        sumX += vertices[i];
        sumY += vertices[i + 1];
        sumZ += vertices[i + 2];
      }
      return new THREE.Vector3(
        sumX / numVertices,
        sumY / numVertices,
        sumZ / numVertices
      );
    };
    const createIrregularGeometry = (): THREE.BufferGeometry => {
      const polygonalGeometry: THREE.BufferGeometry =
        new THREE.BufferGeometry();
      const vertices: Float32Array = new Float32Array([
        -10,
        -7.5,
        -7.5, // Vertex 0
        7.5,
        8,
        -10, // Vertex 1
        10,
        7.5,
        15, // Vertex 2
        0,
        5,
        -15, // Vertex 3
        -10,
        10,
        10, // Vertex 4
        -5,
        -10,
        15, // Vertex 5
        5,
        9,
        5, // Vertex 6
        -9,
        -9,
        5, // Vertex 7
      ]);
      const centroid: THREE.Vector3 = calculateCentroid(vertices);
      polygonalGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      const translatedVertices: Float32Array = new Float32Array(
        vertices.length
      );
      for (let i: number = 0; i < translatedVertices.length; i += 3) {
        translatedVertices[i] = vertices[i] - centroid.x;
        translatedVertices[i + 1] = vertices[i + 1] - centroid.x;
        translatedVertices[i + 1] = vertices[i + 1] - centroid.x;
      }
      polygonalGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      const faceIndices: number[] = [
        2, 3, 4, 0, 4, 1, 1, 4, 2, 0, 1, 2, 4, 0, 2, 1, 3, 2, 6, 3, 4, 7, 6, 4,
        7, 4, 1, 6, 7, 1, 1, 2, 6, 2, 3, 6,
      ];

      polygonalGeometry.setIndex(faceIndices);
      polygonalGeometry.computeVertexNormals();
      return polygonalGeometry;
    };
    const polygon: THREE.Mesh = new THREE.Mesh(
      createIrregularGeometry(),
      material
    );
    polygon.scale.set(2, 1.5, 1); // 2x width, 1x height, 3x depth

    let shape: THREE.Mesh | null = null;
    switch (pageState) {
      case 0:
        shape = torusKnot;
        break;
      case 1:
      case 3:
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
    const multiplier: number = pageState === 3 ? 0.2 : 0.125;
    const speed: number = Math.sin(angle) * multiplier;

    // Animation loop
    const animate = (): void => {
      if (!shape) return;
      requestAnimationFrame(animate);
      if (pageState === 3) {
        shape.rotation.x += speed;
      } else shape.rotation.x += speed / 2;
      shape.rotation.y += speed;
      if (!isHorizontal && pageState === 3) {
        shape.rotation.z = Math.PI / 2;
      }
      renderer.setClearColor(0x343434, 0);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const handleResize = (): void => {
      let resize: number | null;
      if (pageState === 3) {
        resize = Math.min(
          mounted.clientHeight,
          mounted.clientWidth
        );
      } else resize = mounted.clientHeight;
      renderer.setSize(resize, resize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);

      if (!shape) return;
      mounted.removeChild(renderer.domElement);
      scene.remove(shape);
      renderer.dispose();
    };
  }, [pageState, isHorizontal]);

  const id: string = pageState === 3 ? "white-mount" : "three-mount";

  return (
    <div
      id={id}
      className="flex row center"
      ref={mountRef as React.RefObject<HTMLDivElement>}
    />
  );
}
