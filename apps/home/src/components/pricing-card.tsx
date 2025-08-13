
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type VanillaTilt from 'vanilla-tilt';

export function PricingCard() {
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        let isMounted = true;
        let renderer: THREE.WebGLRenderer;
        
        async function init() {
            if (!isMounted || !cardContainerRef.current || !canvasRef.current) return;

            const DEBUG = false;
            function log(...args: any[]) { if (DEBUG) console.log('[FieryCard]', ...args); }
            function warn(...args: any[]) { if (DEBUG) console.warn('[FieryCard]', ...args); }

            let scene: THREE.Scene, camera: THREE.OrthographicCamera, fieryBandMesh: THREE.Mesh;
            let uniforms: any;
            let material: THREE.ShaderMaterial;

            const cardContainer = cardContainerRef.current;
            const canvas = canvasRef.current;

            const bandVertexShader = `
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vec3 newPosition = position;
                    float distortionAmount = 0.02; 
                    float distortion = noise(vec2(position.x * 0.05 + time * 0.1, position.y * 0.05 - time * 0.15)) * distortionAmount;
                    vec2 normalizedPos = normalize(position.xy);
                    newPosition.x += normalizedPos.x * distortion;
                    newPosition.y += normalizedPos.y * distortion;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `;

            const fieryBandFragmentShader = `
                uniform float time;
                uniform vec3 fireColorBase;
                varying vec2 vUv;
                float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
                float noise(vec2 st) {
                    vec2 i = floor(st); vec2 f = fract(st);
                    float a = random(i); float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }
                float turbulence(vec2 st, float baseFreq, int octaves) {
                    float value = 0.0; float amplitude = 1.0; float frequency = baseFreq;
                    for (int i = 0; i < octaves; i++) {
                        value += amplitude * abs(noise(st * frequency));
                        st = st * 1.4 + vec2(3.2, 1.7); 
                        frequency *= 2.0; amplitude *= 0.5;
                    }
                    return value;
                }
                void main() {
                    float slowTime = time * 0.4; float mediumTime = time * 0.8; float fastTime = time * 1.6;
                    vec2 centeredUv = vUv - vec2(0.5);
                    float angle = atan(centeredUv.y, centeredUv.x);
                    float normalizedAngle = (angle / (2.0 * 3.14159)) + 0.5;
                    vec2 noiseCoord1 = vec2(normalizedAngle * 8.0 + mediumTime * 0.3, vUv.y * 4.0 - mediumTime * 0.4);
                    float fireDetail1 = turbulence(noiseCoord1, 1.0, 4);
                    vec2 noiseCoord2 = vec2(normalizedAngle * 6.0 - mediumTime * 0.5, vUv.y * 3.0 + mediumTime * 0.3);
                    float widthModulation = 1.0 - pow(abs(vUv.y - 0.5) * 1.8, 2.0);
                    widthModulation = clamp(widthModulation, 0.3, 1.0);
                    float fireDetail = fireDetail1 * 0.6 + fireDetail2 * 0.4;
                    fireDetail = pow(fireDetail, 1.2); 
                    float turbulentIntensity = fireDetail * widthModulation;
                    vec3 finalColor = mix(vec3(0.7, 0.05, 0.01), fireColorBase, turbulentIntensity);
                    gl_FragColor = vec4(finalColor, turbulentIntensity);
                }
            `;

            function initThree() {
                log("Initializing Three.js");
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(-1000, 1000, 1000, -1000, 0.1, 2000);
                camera.position.z = 100;

                try {
                    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
                    uniforms = {
                        time: { value: 0.0 },
                        fireColorBase: { value: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--primary')) },
                    };
                    material = new THREE.ShaderMaterial({
                        vertexShader: bandVertexShader,
                        fragmentShader: fieryBandFragmentShader,
                        uniforms: uniforms,
                        transparent: true,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false,
                        depthTest: false,
                        side: THREE.DoubleSide
                    });
                    const placeHolderGeometry = new THREE.PlaneGeometry(50, 50);
                    fieryBandMesh = new THREE.Mesh(placeHolderGeometry, material);
                    scene.add(fieryBandMesh);
                    createRingGeometry();
                    animate();
                } catch (error) { warn("Error in Three.js initialization:", error); }
            }

            function animate() {
                if (!isMounted) return;
                animationFrameId.current = requestAnimationFrame(animate);
                if (uniforms) { uniforms.time.value += 0.016; }
                try { if (renderer && scene && camera) { renderer.render(scene, camera); } }
                catch (error) { warn("Error during rendering:", error); }
            }

            function createRingGeometry() {
                try {
                    const cardRect = cardContainer.getBoundingClientRect();
                    if (cardRect.width === 0 || cardRect.height === 0) { return; }
                    const gap = 10; const ringThickness = 20; const cornerRadius = 24;
                    const outerWidth = cardRect.width + 2 * (gap + ringThickness);
                    const outerHeight = cardRect.height + 2 * (gap + ringThickness);
                    const outerRadius = cornerRadius + gap + ringThickness;
                    const innerWidth = cardRect.width + 2 * gap;
                    const innerHeight = cardRect.height + 2 * gap;
                    const innerRadius = cornerRadius + gap;
                    const canvasPadding = 40;
                    const canvasWidth = outerWidth + canvasPadding;
                    const canvasHeight = outerHeight + canvasPadding;

                    if (renderer) renderer.setSize(canvasWidth, canvasHeight);
                    if (camera) {
                        camera.left = -canvasWidth / 2; camera.right = canvasWidth / 2;
                        camera.top = canvasHeight / 2; camera.bottom = -canvasHeight / 2;
                        camera.updateProjectionMatrix();
                    }
                    if (fieryBandMesh && fieryBandMesh.geometry) fieryBandMesh.geometry.dispose();

                    const outerShape = new THREE.Shape();
                    outerShape.moveTo(-outerWidth/2 + outerRadius, -outerHeight/2);
                    outerShape.lineTo(outerWidth/2 - outerRadius, -outerHeight/2);
                    outerShape.quadraticCurveTo(outerWidth/2, -outerHeight/2, outerWidth/2, -outerHeight/2 + outerRadius);
                    outerShape.lineTo(outerWidth/2, outerHeight/2 - outerRadius);
                    outerShape.quadraticCurveTo(outerWidth/2, outerHeight/2, outerWidth/2 - outerRadius, outerHeight/2);
                    outerShape.lineTo(-outerWidth/2 + outerRadius, outerHeight/2);
                    outerShape.quadraticCurveTo(-outerWidth/2, outerHeight/2, -innerWidth/2, outerHeight/2 - outerRadius);
                    outerShape.lineTo(-innerWidth/2, -innerHeight/2 + outerRadius);
                    outerShape.quadraticCurveTo(-innerWidth/2, -innerHeight/2, -innerWidth/2 + outerRadius, -innerHeight/2);

                    const innerShapePath = new THREE.Path();
                    innerShapePath.moveTo(-innerWidth/2 + innerRadius, -innerHeight/2);
                    innerShapePath.lineTo(innerWidth/2 - innerRadius, -innerHeight/2);
                    innerShapePath.quadraticCurveTo(innerWidth/2, -innerHeight/2, innerWidth/2, -innerHeight/2 + innerRadius);
                    innerShapePath.lineTo(innerWidth/2, innerHeight/2 - innerRadius);
                    innerShapePath.quadraticCurveTo(innerWidth/2, innerHeight/2, innerWidth/2 - innerRadius, innerHeight/2);
                    innerShapePath.lineTo(-innerWidth/2 + innerRadius, innerHeight/2);
                    innerShapePath.quadraticCurveTo(-innerWidth/2, innerHeight/2, -innerWidth/2, innerHeight/2 - innerRadius);
                    innerShapePath.lineTo(-innerWidth/2, -innerHeight/2 + innerRadius);
                    innerShapePath.quadraticCurveTo(-innerWidth/2, -innerHeight/2, -innerWidth/2 + innerRadius, -innerHeight/2);

                    outerShape.holes.push(innerShapePath);
                    const ringGeometry = new THREE.ShapeGeometry(outerShape, 48);
                    if (fieryBandMesh) fieryBandMesh.geometry = ringGeometry;
                } catch (error) { warn("Error creating ring geometry:", error); }
            }

            let resizeTimeout: NodeJS.Timeout;
            function onWindowResize() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(createRingGeometry, 150);
            }

            initThree();
            window.addEventListener('resize', onWindowResize);
            if (cardContainerRef.current) {
                const cardElement = cardContainerRef.current.querySelector<HTMLElement>(".card");
                if (cardElement) {
                    const VanillaTilt = (await import('vanilla-tilt')).default;
                    VanillaTilt.init(cardElement, {
                        max: 10, speed: 400, glare: true, "max-glare": 0.2
                    });
                }
            }
        }

        init();

        return () => {
            isMounted = false;
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if(renderer) {
                renderer.dispose();
            }
            window.removeEventListener('resize', () => {}); 
        };
    }, []);

    return (
        <div className="card-container" ref={cardContainerRef}>
            <canvas id="energy-canvas" ref={canvasRef}></canvas>
            <div className="card" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000" data-tilt-glare data-tilt-max-glare="0.2">
                <h2 className="card-title">Pro Tier Access</h2>
                <p className="card-price">
                    <span className="currency">$</span>99<span className="text-3xl align-baseline">.00</span>
                    <span className="period">/month</span>
                </p>
                <p className="card-description">
                    For growing businesses and production use. Unlock powerful features to scale your operations.
                </p>
                <ul className="features-list">
                    <li>
                        <svg className="rotating-disc-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                        Up to 5 Clusters
                    </li>
                    <li>
                        <svg className="rotating-disc-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                        Up to 50 Hosts
                    </li>
                    <li>
                        <svg className="rotating-disc-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                         Priority Email Support
                    </li>
                    <li>
                        <svg className="rotating-disc-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                        Advanced AI Features
                    </li>
                    <li>
                        <svg className="rotating-disc-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                        Weekly Health Reports
                    </li>
                </ul>
                <button className="cta-button">Choose Pro</button>
            </div>
        </div>
    );
}
