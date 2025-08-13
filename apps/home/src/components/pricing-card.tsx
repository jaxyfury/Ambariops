
'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export function PricingCard() {
    useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js';

        const DEBUG = false;
        
        function log(...args) {
            if (DEBUG) {
                console.log('[FieryCard]', ...args);
            }
        }
        
        function warn(...args) {
            if (DEBUG) {
                console.warn('[FieryCard]', ...args);
            }
        }

        let scene, camera, renderer, fieryBandMesh;
        let uniforms;
        let material;

        const cardContainer = document.getElementById('cardContainer');
        const canvas = document.getElementById('energy-canvas');

        if (!cardContainer || !canvas) return;

        const bandVertexShader = \`
            uniform float time;
            varying vec2 vUv;
            varying vec3 vPosition;
            
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
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
        \`;

        const fieryBandFragmentShader = \`
            uniform float time;
            uniform vec3 fireColorBase;
            uniform vec3 fireColorHot;
            uniform vec3 fireColorCool;
            varying vec2 vUv;
            varying vec3 vPosition;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
            
            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                
                vec2 u = f * f * (3.0 - 2.0 * f);
                
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }
            
            float turbulence(vec2 st, float baseFreq, int octaves) {
                float value = 0.0;
                float amplitude = 1.0;
                float frequency = baseFreq;
                
                for (int i = 0; i < octaves; i++) {
                    value += amplitude * abs(noise(st * frequency));
                    st = st * 1.4 + vec2(3.2, 1.7); 
                    frequency *= 2.0;
                    amplitude *= 0.5;
                }
                
                return value;
            }

            void main() {
                float slowTime = time * 0.4;
                float mediumTime = time * 0.8;
                float fastTime = time * 1.6;
                
                vec2 centeredUv = vUv - vec2(0.5);
                float angle = atan(centeredUv.y, centeredUv.x);
                float normalizedAngle = (angle / (2.0 * 3.14159)) + 0.5;
                float radius = length(centeredUv) * 2.0;
                
                
                float flowSpeed = 2.0;
                float flowFrequency = 3.0;
                float baseFlow = sin(normalizedAngle * flowFrequency * 6.28318 + mediumTime * flowSpeed);
                baseFlow = baseFlow * 0.5 + 0.5; 
                
                vec2 noiseCoord1 = vec2(
                    normalizedAngle * 8.0 + mediumTime * 0.3,
                    vUv.y * 4.0 - mediumTime * 0.4
                );
                float fireDetail1 = turbulence(noiseCoord1, 1.0, 4);
                
                vec2 noiseCoord2 = vec2(
                    normalizedAngle * 6.0 - mediumTime * 0.5,
                    vUv.y * 3.0 + mediumTime * 0.3
                );
                float fireDetail2 = turbulence(noiseCoord2, 1.5, 3);
                
                vec2 emberCoord = vec2(
                    normalizedAngle * 10.0,
                    mod(vUv.y * 3.0 - fastTime * 0.5, 3.0)
                );
                float embers = noise(emberCoord * 8.0);
                embers = pow(embers, 3.0) * smoothstep(0.4, 0.6, vUv.y);
                
                float widthModulation = 1.0 - pow(abs(vUv.y - 0.5) * 1.8, 2.0);
                widthModulation = clamp(widthModulation, 0.3, 1.0);
                
                float mainFlicker = 0.92 + 0.08 * sin(fastTime * 7.7);
                float microFlicker = 0.95 + 0.05 * sin(fastTime * 30.0) * sin(fastTime * 17.3);
                float combinedFlicker = mainFlicker * microFlicker;
                
                float fireDetail = fireDetail1 * 0.6 + fireDetail2 * 0.4;
                fireDetail = pow(fireDetail, 1.2); 
                
                float baseIntensity = 0.7 + 0.3 * baseFlow;
                float turbulentIntensity = baseIntensity * fireDetail * widthModulation * combinedFlicker;
                
                float fineDetail = noise(noiseCoord1 * 3.0 + fastTime * 0.1) * 0.2;
                turbulentIntensity += fineDetail * widthModulation;
                
                turbulentIntensity += embers * 0.2;
                
                float finalIntensity = smoothstep(0.1, 0.9, turbulentIntensity);
                
                vec3 deepRed = vec3(0.7, 0.05, 0.01);    
                vec3 midOrange = fireColorBase;          
                vec3 brightYellow = vec3(1.0, 0.9, 0.3);   
                vec3 hotWhite = vec3(1.0, 1.0, 0.95);    
                
                vec3 finalColor;
                
                if (finalIntensity < 0.3) {
                    float t = finalIntensity / 0.3;
                    finalColor = mix(deepRed, midOrange, t);
                } 
                else if (finalIntensity < 0.7) {
                    float t = (finalIntensity - 0.3) / 0.4;
                    finalColor = mix(midOrange, brightYellow, t);
                }
                else {
                    float t = (finalIntensity - 0.7) / 0.3;
                    finalColor = mix(brightYellow, hotWhite, t);
                }
                
                float blueHint = pow(finalIntensity, 5.0) * 0.1;
                finalColor = mix(finalColor, vec3(0.7, 0.8, 1.0), blueHint);
                
                float alpha = finalIntensity * 2.0; 
                alpha = clamp(alpha, 0.0, 1.0);
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        \`;

        function initThree() {
            log("Initializing Three.js");
            
            scene = new THREE.Scene();
            log("Scene created");
            
            camera = new THREE.OrthographicCamera(-1000, 1000, 1000, -1000, 0.1, 2000);
            camera.position.z = 100; 
            log("Camera created");

            try {
                renderer = new THREE.WebGLRenderer({ 
                    canvas: canvas, 
                    alpha: true, 
                    antialias: true 
                });
                
                renderer.setSize(800, 800); 
                log("Renderer created and sized to 800x800");
                
                uniforms = {
                    time: { value: 0.0 },
                    fireColorBase: { value: new THREE.Color(0xff6600) }, 
                    fireColorHot: { value: new THREE.Color(0xffffaa) },  
                    fireColorCool: { value: new THREE.Color(0xcc2200) }  
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
                log("Material created with shader");
                
                const placeHolderGeometry = new THREE.PlaneGeometry(50, 50); 
                fieryBandMesh = new THREE.Mesh(placeHolderGeometry, material);
                scene.add(fieryBandMesh);
                log("Initial mesh created and added to scene");
                
                createRingGeometry(); 
                
                animate();
                log("Animation started");
            } catch (error) {
                warn("Error in Three.js initialization:", error);
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = 'red';
                    ctx.font = '16px Arial';
                    ctx.fillText('Error initializing 3D graphics.', 10, 50);
                }
            }
        }

        function animate() {
            if(!fieryBandMesh) return;
            requestAnimationFrame(animate); 
            
            if (uniforms) {
                uniforms.time.value += 0.016; 
                
                const time = uniforms.time.value;
                const hueShift = Math.sin(time * 0.1) * 0.05; 
                
                const baseColor = new THREE.Color();
                baseColor.setHSL(0.07 + hueShift, 0.9, 0.55); 
                uniforms.fireColorBase.value.copy(baseColor);
            }
            
            try {
                if (renderer && scene && camera) { 
                    renderer.render(scene, camera);
                }
            } catch (error) {
                warn("Error during rendering:", error);
            }
        }

        function createRingGeometry() {
            log("Creating ring geometry...");
            
            try {
                const cardRect = cardContainer.getBoundingClientRect(); 
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;

                if (cardWidth === 0 || cardHeight === 0) {
                    warn("Card dimensions are zero. Retrying geometry creation shortly or check layout.");
                    return; 
                }
                log("Card dimensions (px):", cardWidth, cardHeight);
                
                const gap = 10;          
                const ringThickness = 20;   
                const cornerRadius = 24;    
                
                const outerWidth = cardWidth + 2 * (gap + ringThickness);
                const outerHeight = cardHeight + 2 * (gap + ringThickness);
                const outerRadius = cornerRadius + gap + ringThickness;
                
                const innerWidth = cardWidth + 2 * gap;
                const innerHeight = cardHeight + 2 * gap;
                const innerRadius = cornerRadius + gap;
                
                log("Ring dimensions:", {
                    outerWidth, outerHeight, outerRadius,
                    innerWidth, innerHeight, innerRadius
                });

                const canvasPadding = 40; 
                const canvasWidth = outerWidth + canvasPadding;
                const canvasHeight = outerHeight + canvasPadding;
                
                if (renderer) { 
                    renderer.setSize(canvasWidth, canvasHeight);
                    log("Canvas sized to:", canvasWidth, canvasHeight);
                }

                if (camera) { 
                    camera.left = -canvasWidth / 2;
                    camera.right = canvasWidth / 2;
                    camera.top = canvasHeight / 2;
                    camera.bottom = -canvasHeight / 2;
                    camera.updateProjectionMatrix();
                    log("Camera projection updated");
                }
                
                if (fieryBandMesh && fieryBandMesh.geometry) {
                    fieryBandMesh.geometry.dispose();
                }
                
                const outerShape = new THREE.Shape();
                outerShape.moveTo(-outerWidth/2 + outerRadius, -outerHeight/2); 
                outerShape.lineTo(outerWidth/2 - outerRadius, -outerHeight/2);  
                outerShape.quadraticCurveTo(outerWidth/2, -outerHeight/2, outerWidth/2, -outerHeight/2 + outerRadius); 
                outerShape.lineTo(outerWidth/2, outerHeight/2 - outerRadius);   
                outerShape.quadraticCurveTo(outerWidth/2, outerHeight/2, outerWidth/2 - outerRadius, outerHeight/2); 
                outerShape.lineTo(-outerWidth/2 + outerRadius, outerHeight/2);  
                outerShape.quadraticCurveTo(-outerWidth/2, outerHeight/2, -outerWidth/2, outerHeight/2 - outerRadius); 
                outerShape.lineTo(-outerWidth/2, -outerHeight/2 + outerRadius); 
                outerShape.quadraticCurveTo(-outerWidth/2, -outerHeight/2, -outerWidth/2 + outerRadius, -outerHeight/2); 
                
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
                log("Shapes with hole created");
                
                const ringGeometry = new THREE.ShapeGeometry(outerShape, 48); 
                log("Geometry created from shape");
                
                if (fieryBandMesh) { 
                    fieryBandMesh.geometry = ringGeometry;
                    fieryBandMesh.position.set(0, 0, 0); 
                }
                
                log("Ring geometry created successfully");

            } catch (error) {
                warn("Error creating ring geometry:", error);
                if (fieryBandMesh) {
                    const fallbackRadius = (cardContainer.offsetWidth || 360) / 2 + 15; 
                    fieryBandMesh.geometry = new THREE.RingGeometry(fallbackRadius, fallbackRadius + ringThickness, 48);
                    log("Created fallback circular ring geometry due to error.");
                }
            }
        }

        let resizeTimeout;
        function onWindowResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                log("Window resize detected, recreating ring geometry.");
                createRingGeometry();
            }, 150); 
        }

        function init() {
            log("Starting initialization");
            try {
                initThree();
                window.addEventListener('resize', onWindowResize); 

                if (typeof VanillaTilt !== 'undefined') {
                    VanillaTilt.init(document.querySelector(".card"), {
                        max: 10,    
                        speed: 400,   
                        glare: true,   
                        "max-glare": 0.2 
                    });
                    log("VanillaTilt.js initialized on .card");
                } else {
                    warn("VanillaTilt.js not loaded.");
                }

            } catch (error) {
                warn("Critical error during initialization:", error);
            }
        }
        
        init();
    `;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
        window.removeEventListener('resize', () => {}); // Simplified for example
    };
    }, []);

    return (
        <div className="card-container" id="cardContainer">
            <canvas id="energy-canvas"></canvas>
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

    