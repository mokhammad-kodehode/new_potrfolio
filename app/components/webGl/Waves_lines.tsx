"use client";
import { useEffect, useRef } from "react";

const WebGLWaves = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize WebGL context
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Vertex shader
        const vertexShaderSource = `
            attribute vec2 a_position;
            uniform float u_time;
            uniform vec2 u_resolution;
            varying float v_wave;

            void main() {
                vec2 pos = a_position / u_resolution * 2.0 - 1.0;
                pos.x *= u_resolution.x / u_resolution.y;
                float wave = sin(pos.x * 0.05 + u_time * 0.005) * 0.1;
                pos.y += wave;
                v_wave = wave;
                gl_Position = vec4(pos, 0, 1);
            }
        `;

        // Fragment shader
        const fragmentShaderSource = `
            precision mediump float;
            varying float v_wave;
            void main() {
                gl_FragColor = vec4(vec3(0.5 + v_wave * 0.5), 1.0);
            }
        `;

        // Compile shader function
        const compileShader = (type: number, source: string): WebGLShader => {
            const shader = gl.createShader(type);
            if (!shader) throw new Error("Error creating shader");
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
                throw new Error("Shader compilation error");
            }
            return shader;
        };

        // Create and link shaders
        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = gl.createProgram();
        if (!program) throw new Error("Error creating WebGL program");

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Error linking WebGL program:", gl.getProgramInfoLog(program));
            throw new Error("Error linking WebGL program");
        }

        gl.useProgram(program);

        // Define vertices
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);

        // Create buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Set up attribute
        const positionLocation = gl.getAttribLocation(program, "a_position");
        if (positionLocation === -1) {
            console.error("Attribute 'a_position' not found");
            return;
        }

        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Set up uniforms
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

        if (timeLocation === null || resolutionLocation === null) {
            console.error(
                `Error locating uniforms: ${
                    timeLocation === null ? "u_time" : ""
                } ${resolutionLocation === null ? "u_resolution" : ""}`
            );
            return;
        }

        // Animation variables
        let time = 0;

        // Render loop
        const render = () => {
            time += 1;

            // Set uniform values
            gl.uniform1f(timeLocation, time);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

            // Clear and draw
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(render);
        };

        render();

        // Clean up
        return () => {
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(buffer);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute z-[1001] bottom-0 left-0 opacity-[0.1] w-full h-full" />;
};

export default WebGLWaves;
