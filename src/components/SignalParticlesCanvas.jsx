import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SignalParticlesCanvas
   Port of PredictiveArcCanvas variant="signal-particles"
   Runtime: Raw WebGL2 (no external dependencies)
   ───────────────────────────────────────────────────────────────────────────── */

// ── Vertex Shader ─────────────────────────────────────────────────────────────
const VERT_SRC = /* glsl */ `#version 300 es
precision highp float;

in  vec2  a_position;   // clip-space [-1, 1]
in  float a_size;
in  float a_alpha;
in  float a_hue;

out float v_alpha;
out float v_hue;

void main() {
  v_alpha      = a_alpha;
  v_hue        = a_hue;
  gl_Position  = vec4(a_position, 0.0, 1.0);
  gl_PointSize = a_size;
}
`;

// ── Fragment Shader ────────────────────────────────────────────────────────────
const FRAG_SRC = /* glsl */ `#version 300 es
precision highp float;

uniform float u_hue;
uniform float u_saturation;
uniform float u_brightness;

in  float v_alpha;
in  float v_hue;
out vec4  fragColor;

// HSL → RGB
vec3 hsl2rgb(float h, float s, float l) {
  float c = (1.0 - abs(2.0 * l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
  float m = l - c * 0.5;
  vec3 rgb;
  if      (h < 60.0)  rgb = vec3(c, x, 0.0);
  else if (h < 120.0) rgb = vec3(x, c, 0.0);
  else if (h < 180.0) rgb = vec3(0.0, c, x);
  else if (h < 240.0) rgb = vec3(0.0, x, c);
  else if (h < 300.0) rgb = vec3(x, 0.0, c);
  else                rgb = vec3(c, 0.0, x);
  return rgb + m;
}

void main() {
  // Soft circular point
  vec2  coord = gl_PointCoord - vec2(0.5);
  float dist  = length(coord);
  if (dist > 0.5) discard;

  float edge  = smoothstep(0.5, 0.18, dist);
  float finalHue = mod(u_hue + v_hue, 360.0);
  vec3  col   = hsl2rgb(finalHue, u_saturation, u_brightness * 0.65);
  fragColor   = vec4(col, v_alpha * edge);
}
`;

// ── Arc / Trail Vertex Shader ──────────────────────────────────────────────────
const ARC_VERT = /* glsl */ `#version 300 es
precision highp float;
in  vec2  a_pos;
in  float a_alpha;
out float v_alpha;
void main() {
  v_alpha     = a_alpha;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const ARC_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform float u_hue;
uniform float u_saturation;
uniform float u_brightness;
in  float v_alpha;
out vec4  fragColor;
vec3 hsl2rgb(float h, float s, float l) {
  float c = (1.0 - abs(2.0 * l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
  float m = l - c * 0.5;
  vec3 rgb;
  if      (h < 60.0)  rgb = vec3(c, x, 0.0);
  else if (h < 120.0) rgb = vec3(x, c, 0.0);
  else if (h < 180.0) rgb = vec3(0.0, c, x);
  else if (h < 240.0) rgb = vec3(0.0, x, c);
  else if (h < 300.0) rgb = vec3(x, 0.0, c);
  else                rgb = vec3(c, 0.0, x);
  return rgb + m;
}
void main() {
  vec3 col  = hsl2rgb(u_hue, u_saturation, u_brightness * 0.55);
  fragColor = vec4(col, v_alpha * 0.35);
}
`;

// ── Helpers ────────────────────────────────────────────────────────────────────
function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[SignalParticles] shader error:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl, vertSrc, fragSrc) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[SignalParticles] program link error:', gl.getProgramInfoLog(prog));
    return null;
  }
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  return prog;
}

// ── Particle System ────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 420;
const TRAIL_SEGMENTS = 24;       // segments per arc trail
const ARC_COUNT      = 14;       // concurrent arc trails

function createParticleSystem(speed) {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(spawnParticle(speed, true));
  }
  return particles;
}

function spawnParticle(speed, random = false) {
  const angle  = Math.random() * Math.PI * 2;
  const spd    = (0.0003 + Math.random() * 0.0008) * speed;
  return {
    x:       random ? Math.random() * 2 - 1 : (Math.random() < 0.5 ? -1.1 : 1.1),
    y:       random ? Math.random() * 2 - 1 : Math.random() * 2 - 1,
    vx:      Math.cos(angle) * spd,
    vy:      Math.sin(angle) * spd,
    size:    1.2 + Math.random() * 3.5,
    alpha:   0.0,
    targetA: 0.4 + Math.random() * 0.6,
    life:    0,
    maxLife: 220 + Math.random() * 380,
    hue:     Math.random() * 60 - 30,   // hue offset from base
  };
}

function createArcSystem(speed) {
  const arcs = [];
  for (let i = 0; i < ARC_COUNT; i++) {
    arcs.push(spawnArc(speed));
  }
  return arcs;
}

function spawnArc(speed) {
  const x0 = Math.random() * 2 - 1;
  const y0 = Math.random() * 2 - 1;
  // control point offset for bezier curvature
  const cx = x0 + (Math.random() - 0.5) * 1.2;
  const cy = y0 + (Math.random() - 0.5) * 1.2;
  const x1 = x0 + (Math.random() - 0.5) * 1.6;
  const y1 = y0 + (Math.random() - 0.5) * 1.6;
  const dur = (80 + Math.random() * 160) / speed;
  return { x0, y0, cx, cy, x1, y1, t: 0, dur, alpha: 0 };
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SignalParticlesCanvas({
  mode       = 'dark',
  speed      = 1.0,
  hue        = 0,
  saturation = 1.0,
  brightness = 1.0,
  style      = {},
  className  = '',
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ speed, hue, saturation, brightness });

  // Keep uniform values reactive without restarting the renderer
  useEffect(() => {
    stateRef.current = { speed, hue, saturation, brightness };
  }, [speed, hue, saturation, brightness]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── WebGL context ────────────────────────────────────────────────────────
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) {
      console.warn('[SignalParticles] WebGL2 not supported');
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);   // additive blending for glow

    // ── Programs ─────────────────────────────────────────────────────────────
    const particleProg = createProgram(gl, VERT_SRC, FRAG_SRC);
    const arcProg      = createProgram(gl, ARC_VERT, ARC_FRAG);
    if (!particleProg || !arcProg) return;

    // ── Particle program locations ────────────────────────────────────────────
    const pLoc = {
      position:   gl.getAttribLocation(particleProg, 'a_position'),
      size:       gl.getAttribLocation(particleProg, 'a_size'),
      alpha:      gl.getAttribLocation(particleProg, 'a_alpha'),
      hue:        gl.getAttribLocation(particleProg, 'a_hue'),
      uHue:       gl.getUniformLocation(particleProg, 'u_hue'),
      uSat:       gl.getUniformLocation(particleProg, 'u_saturation'),
      uBri:       gl.getUniformLocation(particleProg, 'u_brightness'),
    };

    // ── Arc program locations ─────────────────────────────────────────────────
    const aLoc = {
      pos:   gl.getAttribLocation(arcProg, 'a_pos'),
      alpha: gl.getAttribLocation(arcProg, 'a_alpha'),
      uHue:  gl.getUniformLocation(arcProg, 'u_hue'),
      uSat:  gl.getUniformLocation(arcProg, 'u_saturation'),
      uBri:  gl.getUniformLocation(arcProg, 'u_brightness'),
    };

    // ── Particle buffers (interleaved: x, y, size, alpha, hue — 5 floats each) ──
    const STRIDE = 5;
    const pData  = new Float32Array(PARTICLE_COUNT * STRIDE);

    const pVao = gl.createVertexArray();
    gl.bindVertexArray(pVao);
    const pBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pData, gl.DYNAMIC_DRAW);

    const bytesPerFloat = 4;
    const strideBytes   = STRIDE * bytesPerFloat;

    gl.enableVertexAttribArray(pLoc.position);
    gl.vertexAttribPointer(pLoc.position, 2, gl.FLOAT, false, strideBytes, 0);
    gl.enableVertexAttribArray(pLoc.size);
    gl.vertexAttribPointer(pLoc.size, 1, gl.FLOAT, false, strideBytes, 2 * bytesPerFloat);
    gl.enableVertexAttribArray(pLoc.alpha);
    gl.vertexAttribPointer(pLoc.alpha, 1, gl.FLOAT, false, strideBytes, 3 * bytesPerFloat);
    gl.enableVertexAttribArray(pLoc.hue);
    gl.vertexAttribPointer(pLoc.hue, 1, gl.FLOAT, false, strideBytes, 4 * bytesPerFloat);

    gl.bindVertexArray(null);

    // ── Arc buffers ───────────────────────────────────────────────────────────
    // Each arc: TRAIL_SEGMENTS+1 points × 2 floats (x,y) + 1 float (alpha)
    const ARC_VERTS    = (TRAIL_SEGMENTS + 1) * ARC_COUNT;
    const ARC_STRIDE   = 3; // x, y, alpha
    const arcData      = new Float32Array(ARC_VERTS * ARC_STRIDE);

    const arcVao = gl.createVertexArray();
    gl.bindVertexArray(arcVao);
    const arcBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf);
    gl.bufferData(gl.ARRAY_BUFFER, arcData, gl.DYNAMIC_DRAW);

    const arcStrideBytes = ARC_STRIDE * bytesPerFloat;
    gl.enableVertexAttribArray(aLoc.pos);
    gl.vertexAttribPointer(aLoc.pos, 2, gl.FLOAT, false, arcStrideBytes, 0);
    gl.enableVertexAttribArray(aLoc.alpha);
    gl.vertexAttribPointer(aLoc.alpha, 1, gl.FLOAT, false, arcStrideBytes, 2 * bytesPerFloat);
    gl.bindVertexArray(null);

    // ── Particle / Arc state ──────────────────────────────────────────────────
    let particles = createParticleSystem(speed);
    let arcs      = createArcSystem(speed);

    // ── Resize ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = canvas.clientWidth  * dpr;
      const h   = canvas.clientHeight * dpr;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    });
    ro.observe(canvas);
    // trigger immediately
    {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // ── Visibility ────────────────────────────────────────────────────────────
    let visible = !document.hidden;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf;

    function bezier(p0, p1, p2, t) {
      const ti = 1 - t;
      return ti * ti * p0 + 2 * ti * t * p1 + t * t * p2;
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const { speed: spd, hue: h, saturation: sat, brightness: bri } = stateRef.current;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // ── Update & upload particles ─────────────────────────────────────────
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.12) {
          p.alpha = Math.min(p.alpha + 0.03, p.targetA * (lifeRatio / 0.12));
        } else if (lifeRatio > 0.8) {
          p.alpha = Math.max(0, p.alpha - 0.02);
        } else {
          p.alpha = p.targetA;
        }

        p.x += p.vx * spd;
        p.y += p.vy * spd;

        // soft wander / noise-like drift
        p.vx += (Math.random() - 0.5) * 0.00006 * spd;
        p.vy += (Math.random() - 0.5) * 0.00006 * spd;

        // clamp velocity
        const vLen = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxV = 0.0014 * spd;
        if (vLen > maxV) { p.vx = (p.vx / vLen) * maxV; p.vy = (p.vy / vLen) * maxV; }

        if (p.life > p.maxLife || p.x < -1.4 || p.x > 1.4 || p.y < -1.4 || p.y > 1.4) {
          particles[i] = spawnParticle(spd, false);
        }

        const base = i * STRIDE;
        pData[base]     = p.x;
        pData[base + 1] = p.y;
        pData[base + 2] = p.size;
        pData[base + 3] = p.alpha;
        pData[base + 4] = p.hue;
      }

      // ── Draw particles ────────────────────────────────────────────────────
      gl.useProgram(particleProg);
      gl.uniform1f(pLoc.uHue, h);
      gl.uniform1f(pLoc.uSat, sat);
      gl.uniform1f(pLoc.uBri, bri);

      gl.bindVertexArray(pVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, pData);
      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
      gl.bindVertexArray(null);

      // ── Update & upload arcs ──────────────────────────────────────────────
      for (let ai = 0; ai < ARC_COUNT; ai++) {
        const arc   = arcs[ai];
        arc.t += spd / arc.dur;
        if (arc.t < 0.15) arc.alpha = Math.min(arc.alpha + 0.05, 1.0);
        if (arc.t > 0.7)  arc.alpha = Math.max(arc.alpha - 0.04, 0.0);
        if (arc.t >= 1.0) { arcs[ai] = spawnArc(spd); continue; }

        const segStart = ai * (TRAIL_SEGMENTS + 1);
        for (let s = 0; s <= TRAIL_SEGMENTS; s++) {
          const frac = (s / TRAIL_SEGMENTS) * arc.t;
          const px   = bezier(arc.x0, arc.cx, arc.x1, frac);
          const py   = bezier(arc.y0, arc.cy, arc.y1, frac);
          const segAlpha = arc.alpha * (s / TRAIL_SEGMENTS);  // fade toward head
          const base  = (segStart + s) * ARC_STRIDE;
          arcData[base]     = px;
          arcData[base + 1] = py;
          arcData[base + 2] = segAlpha;
        }
      }

      // ── Draw arcs (line strips per arc) ───────────────────────────────────
      gl.useProgram(arcProg);
      gl.uniform1f(aLoc.uHue, h);
      gl.uniform1f(aLoc.uSat, sat);
      gl.uniform1f(aLoc.uBri, bri);

      gl.bindVertexArray(arcVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, arcData);

      for (let ai = 0; ai < ARC_COUNT; ai++) {
        const offset = ai * (TRAIL_SEGMENTS + 1);
        gl.drawArrays(gl.LINE_STRIP, offset, TRAIL_SEGMENTS + 1);
      }
      gl.bindVertexArray(null);
    }

    tick();

    // ── Context loss ──────────────────────────────────────────────────────────
    const onLost    = (e) => { e.preventDefault(); cancelAnimationFrame(raf); };
    const onRestored = () => tick();
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl.deleteBuffer(pBuf);
      gl.deleteBuffer(arcBuf);
      gl.deleteVertexArray(pVao);
      gl.deleteVertexArray(arcVao);
      gl.deleteProgram(particleProg);
      gl.deleteProgram(arcProg);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
}
