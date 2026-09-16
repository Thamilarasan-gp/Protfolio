import * as THREE from 'three';

// Generate procedural textures in memory using HTML Canvas
// This guarantees zero HTTP roundtrips, instant loading, and 60fps performance

export function createCloudTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(null as any);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 256, 256);

  // Multi-layered soft puffy cloud sprite
  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.3, 'rgba(240, 248, 255, 0.7)');
  gradient.addColorStop(0.65, 'rgba(220, 235, 250, 0.3)');
  gradient.addColorStop(0.85, 'rgba(200, 220, 245, 0.08)');
  gradient.addColorStop(1, 'rgba(200, 220, 245, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  // Add smaller overlapping puffs for natural cloud silhouette
  const puffs = [
    { x: 95, y: 110, r: 65, a: 0.6 },
    { x: 160, y: 115, r: 70, a: 0.6 },
    { x: 130, y: 145, r: 60, a: 0.5 },
    { x: 80, y: 135, r: 50, a: 0.4 },
    { x: 175, y: 135, r: 55, a: 0.4 },
  ];

  puffs.forEach((p) => {
    const puffGrad = ctx.createRadialGradient(p.x, p.y, 5, p.x, p.y, p.r);
    puffGrad.addColorStop(0, `rgba(255, 255, 255, ${p.a})`);
    puffGrad.addColorStop(0.5, `rgba(230, 242, 255, ${p.a * 0.5})`);
    puffGrad.addColorStop(1, 'rgba(200, 220, 245, 0)');
    ctx.fillStyle = puffGrad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

export function createRockNormalTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(null as any);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(512, 512);
  const data = imgData.data;

  // Simple cellular / Voronoi style normal computation for sharp craggy rock fissures
  const points: [number, number][] = [];
  const numPoints = 80;
  for (let i = 0; i < numPoints; i++) {
    points.push([Math.random() * 512, Math.random() * 512]);
  }

  // Precompute height map
  const heights = new Float32Array(512 * 512);
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      let d1 = 99999;
      let d2 = 99999;
      for (let i = 0; i < numPoints; i++) {
        const dx = points[i][0] - x;
        const dy = points[i][1] - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < d1) {
          d2 = d1;
          d1 = d;
        } else if (d < d2) {
          d2 = d;
        }
      }
      // F2 - F1 gives Voronoi cell ridges (crags)
      const edge = Math.min(1, (d2 - d1) / 25);
      // Add subtle high-frequency noise
      const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.15;
      heights[y * 512 + x] = edge + noise;
    }
  }

  // Calculate normals from height map
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      const left = heights[y * 512 + ((x - 1 + 512) % 512)];
      const right = heights[y * 512 + ((x + 1) % 512)];
      const up = heights[((y - 1 + 512) % 512) * 512 + x];
      const down = heights[((y + 1) % 512) * 512 + x];

      const dx = (right - left) * 2.0;
      const dy = (down - up) * 2.0;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = (dx / len) * 0.5 + 0.5;
      const ny = (dy / len) * 0.5 + 0.5;
      const nz = (dz / len) * 0.5 + 0.5;

      data[idx] = Math.floor(nx * 255);
      data[idx + 1] = Math.floor(ny * 255);
      data[idx + 2] = Math.floor(nz * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}

export function createDustParticleTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(null as any);

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 250, 235, 1)');
  grad.addColorStop(0.3, 'rgba(220, 200, 170, 0.7)');
  grad.addColorStop(0.7, 'rgba(180, 160, 130, 0.25)');
  grad.addColorStop(1, 'rgba(150, 140, 120, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createRopeTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(null as any);

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Braided fibers pattern
  ctx.fillStyle = '#b89468';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#6e5132';
  ctx.lineWidth = 4;
  for (let i = -128; i < 256; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 128, 128);
    ctx.stroke();
  }

  ctx.strokeStyle = '#e0c498';
  ctx.lineWidth = 2;
  for (let i = -128; i < 256; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i + 4, 0);
    ctx.lineTo(i + 132, 128);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 20);
  texture.needsUpdate = true;
  return texture;
}
