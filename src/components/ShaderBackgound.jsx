import { useEffect, useRef } from 'react';
import GlslCanvas from 'glslCanvas';  // <-- import par défaut

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sandbox = new GlslCanvas(canvas);

    sandbox.load(`
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));
        gl_FragColor = vec4(col, 1.0);
      }
    `);

    return () => sandbox.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        display: 'block',
      }}
    />
  );
};

export default ShaderBackground;
