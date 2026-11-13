import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from "three-mesh-bvh";
import { MAP_NODES } from "./data/temple.js";
import { POIS_BY_TEMPLE, POIS } from "./data/pois.js";

if (window.__isMobileBlocked) {
  throw new Error("Mobile device: virtual tour disabled.");
}

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

/* ============================================================
 * DOM
 * ============================================================ */
const $ = (id) => document.getElementById(id);
const canvas = $("c");
const stageTxt = $("stageTxt");
const errBox = $("errBox");
const entryScreen = $("entryScreen");
const btnSV = $("btnSV");
const btnOrbit = $("btnOrbit");
const poiLayer = $("poiLayer");
const poiModal = $("poiModal");
const poiClose = $("poiClose");
const poiImgEl = $("popup-img");
const poiImgFrame = $("poiImgFrame");
const poiDirEl = $("poiDir");
const poiTitleEl = $("poiTitle");
const poiDescEl = $("poiDesc");
const poiAudioEl = $("poiAudio");
const poiAudioBtn = $("poiAudioBtn");
const poiAudioIcon = $("poiAudioIcon");
const poiAudioLabel = $("poiAudioLabel");
const bgMusic = $("bgMusic");
const journeyLayer = $("journeyLayer");
const journeyTransition = $("journeyTransition");
const mapScreen = $("mapScreen");
const mapPinsLayer = $("mapPins");
const mapBtn = $("mapBtn");
const mapBackBtn = $("mapBackBtn");
const mmCanvas = $("mm");
const mmCtx = mmCanvas.getContext("2d");

/* ============================================================
 * Bahasa (i18n) & petunjuk tombol
 * ============================================================ */
let currentLang = "id";
let hintMode = "fly";

const I18N = {
  id: {
    loadModel: "Memuat model...",
    loadHeadphones: "Gunakan headphone untuk pengalaman terbaik",
    stageScaling: "⚙ Scaling...",
    loadError: "Error!",
    entrySubtitle: "IKUTI JEJAK MENUJU CANDI PRAMBANAN",
    entryCredit: "Warisan budaya · Tur virtual interaktif",
    entryCopyright: "© Candi Prambanan",
    entryButton: "Mulai Perjalanan",
    mapButton: "Lihat Peta",
    mapBack: "← Kembali",
    waypointEntrance: "Pintu masuk",
    waypointInterior: "Ruang dalam",
    topbarTitle: "Candi Prambanan",
    topbarLocation: "Sleman, D.I Yogyakarta",
    btnSV: "Street View",
    btnOrbit: "Jelajah",
    navBack: "Kembali",
    navMap: "Peta",
    panelKicker: "PANDUAN EKSPLORASI",
    panelTitle: "Temukan setiap candi",
    panelDesc: "Arahkan kursor pada model untuk melihat nama candi. Klik titik untuk memasuki tur virtual.",
    panelLegend: "Hotspot interaktif",
    journeyEnter: "Memasuki ",
    gateClick: "Klik untuk menjelajahi ",
    audioPlay: "Dengarkan",
    audioPause: "Jeda",
    poiImgEmpty: "Gambar arca belum tersedia",
    hintWalk: "Berjalan",
    hintLook: "Melihat",
    hintRun: "Berlari",
    hintKeyFloor: "Klik Lantai",
    hintClickFloor: "Jalan ke titik",
    hintJump: "Lompat",
    hintExit: "Keluar mode",
    hintFly: "Terbang",
    hintUpDown: "Naik / turun",
    hintFast: "Terbang cepat",
  },
  en: {
    loadModel: "Loading model...",
    loadHeadphones: "Put on your headphones for the best experience",
    stageScaling: "⚙ Scaling...",
    loadError: "Error!",
    entrySubtitle: "FOLLOW THE PATH THROUGH PRAMBANAN TEMPLE",
    entryCredit: "Cultural heritage · Interactive virtual tour",
    entryCopyright: "© Prambanan Temple",
    entryButton: "Begin Journey",
    mapButton: "View Map",
    mapBack: "← Back",
    waypointEntrance: "Temple entrance",
    waypointInterior: "Interior corridor",
    topbarTitle: "Prambanan Temple",
    topbarLocation: "Sleman, D.I Yogyakarta",
    btnSV: "Street View",
    btnOrbit: "Explore",
    navBack: "Back",
    navMap: "Map",
    panelKicker: "EXPLORATION GUIDE",
    panelTitle: "Discover every temple",
    panelDesc: "Hover over a model to see the temple's name. Click a dot to enter the virtual tour.",
    panelLegend: "Interactive hotspot",
    journeyEnter: "Entering ",
    gateClick: "Click to explore ",
    audioPlay: "Listen",
    audioPause: "Pause",
    poiImgEmpty: "Statue image not yet available",
    hintWalk: "Walk",
    hintLook: "Look",
    hintRun: "Run",
    hintKeyFloor: "Click Floor",
    hintClickFloor: "Walk to spot",
    hintJump: "Jump",
    hintExit: "Exit mode",
    hintFly: "Fly",
    hintUpDown: "Up / down",
    hintFast: "Fast fly",
  },
};

const HINT_SETS = {
  sv: [
    ["W A S D", "hintWalk"],
    ["Mouse", "hintLook"],
    ["hintKeyFloor", "hintClickFloor"],
    ["Shift", "hintRun"],
    ["Space", "hintJump"],
    ["ESC", "hintExit"],
  ],
  fly: [
    ["W A S D", "hintFly"],
    ["Mouse", "hintLook"],
    ["Q / E", "hintUpDown"],
    ["Shift", "hintFast"],
  ],
};

const T = (key) => I18N[currentLang][key];
const tr = (v) => (typeof v === "string" ? v : v[currentLang]);

function renderHints(mode = hintMode) {
  hintMode = mode;
  const box = document.querySelector("#hints .hrow");
  box.innerHTML = HINT_SETS[mode]
    .map(([k, key]) => `<span class="hk">${I18N[currentLang][k] ?? k}</span> <span>${I18N[currentLang][key]}</span>`)
    .join("<br />");
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = I18N[lang][el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });
  document.querySelectorAll(".langBtn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  poiImgFrame.dataset.emptyText = T("poiImgEmpty");
  try { localStorage.setItem("candiSiwaLang", lang); } catch {}
  refreshDotLabels();
  if (poiOpen && activePOIRef) refreshPOIText(activePOIRef);
  renderMapPins();
  renderHints();
}

/* ============================================================
 * Renderer, scene, lampu, lingkungan
 * ============================================================ */
const PR_ORBIT_MAX = 2;
const PR_SV_MAX = 1.0;
const setPixelRatioMax = (max) => renderer.setPixelRatio(Math.min(devicePixelRatio, max));

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
  });
} catch (err) {
  errBox.style.display = "block";
  errBox.innerHTML = "WebGL tidak tersedia di browser ini.<br>Gunakan Chrome/Firefox dengan akselerasi grafis aktif untuk memasuki tur 3D.";
  stageTxt.textContent = "WebGL diperlukan";
  throw err;
}
setPixelRatioMax(PR_ORBIT_MAX);
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;

const SKY = new THREE.Color(0xaebccb);
const ORBIT_BACKGROUND = new THREE.Color(0xe8e2d9);
const orbitFog = new THREE.FogExp2(0xe8e2d9, 0.004);
const streetViewFog = new THREE.Fog(SKY, 14, 45);

const scene = new THREE.Scene();
scene.background = ORBIT_BACKGROUND;
scene.fog = orbitFog;

scene.add(new THREE.AmbientLight(0xfff4e0, 0.9));
const sun = new THREE.DirectionalLight(0xffe8b0, 1.0);
sun.position.set(50, 80, 30);
scene.add(sun);
const fill = new THREE.DirectionalLight(0xfff0d8, 0.7);
fill.position.set(-50, 60, -30);
scene.add(fill);
const fill2 = new THREE.DirectionalLight(0xfff0d8, 0.5);
fill2.position.set(0, 20, -60);
scene.add(fill2);
scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc4b0, 0.5));

const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshLambertMaterial({ color: 0x5a7a4a }));
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const plaza = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshLambertMaterial({ color: 0x9c9890 }));
plaza.rotation.x = -Math.PI / 2;
plaza.position.y = 0.005;
scene.add(plaza);

/* ---------- Pohon prosedural ---------- */
const TREE_COUNT = 60;
const TREE_INNER_RADIUS = 8;
const TREE_OUTER_RADIUS = 32;
const TREE_PATH_HALF_WIDTH = 3.2;
const treeEnvironment = new THREE.Group();
treeEnvironment.name = "procedural-candi-siwa-trees";
scene.add(treeEnvironment);

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BLOB_BASE = (() => {
  const g = new THREE.IcosahedronGeometry(1, 2);
  g.deleteAttribute("normal");
  g.deleteAttribute("uv");
  return mergeVertices(g);
})();

function makeBlob(seed) {
  const g = BLOB_BASE.clone();
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const k = 1
      + 0.22 * Math.sin(v.x * 3.1 + seed) * Math.cos(v.z * 2.7 + seed * 1.7)
      + 0.12 * Math.sin(v.y * 5.3 + seed * 2.1);
    v.multiplyScalar(k);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function buildPart(geo, color, matrix, shade = false) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.deleteAttribute("uv");
  g.applyMatrix4(matrix);
  const n = g.attributes.position.count;
  const normal = g.attributes.normal;
  const arr = new Float32Array(n * 3);
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    c.copy(color);
    if (shade) c.multiplyScalar(0.65 + 0.45 * (normal.getY(i) * 0.5 + 0.5));
    arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(arr, 3));
  return g;
}

function buildTreeGeometry(type, seed) {
  const rnd = mulberry32(seed);
  const parts = [];
  const bark = new THREE.Color(0x4a3a2a);
  const greens = [0x2f5d27, 0x3b7a2e, 0x4c8c34, 0x2a5224].map((h) => new THREE.Color(h));
  const pickGreen = () => greens[Math.floor(rnd() * greens.length)];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), sc = new THREE.Vector3();

  const trunk = (h, rb, rt) => {
    m.makeTranslation(0, h / 2, 0);
    parts.push(buildPart(new THREE.CylinderGeometry(rt, rb, h, 7, 1), bark, m));
  };
  const blob = (x, y, z, sx, sy, sz) => {
    q.setFromEuler(new THREE.Euler(0, rnd() * Math.PI * 2, 0));
    m.compose(pos.set(x, y, z), q, sc.set(sx, sy, sz));
    parts.push(buildPart(makeBlob(rnd() * 20), pickGreen(), m, true));
  };

  if (type === "rain") {
    trunk(0.6, 0.045, 0.03);
    blob(0, 0.95, 0, 0.5, 0.3, 0.5);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + rnd();
      const r = 0.35 + rnd() * 0.2;
      const s = 0.38 + rnd() * 0.12;
      blob(Math.cos(a) * r, 0.75 + rnd() * 0.15, Math.sin(a) * r, s, s * 0.6, s);
    }
  } else if (type === "round") {
    trunk(0.45, 0.04, 0.028);
    blob(0, 0.85, 0, 0.34, 0.32, 0.34);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rnd();
      const s = 0.28 + rnd() * 0.1;
      blob(Math.cos(a) * 0.18, 0.6 + rnd() * 0.35, Math.sin(a) * 0.18, s, s * 0.9, s);
    }
  } else {
    const up = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);
    const dir = new THREE.Vector3(0, 1, 0);
    const p = new THREE.Vector3();
    for (let i = 0; i < 5; i++) {
      dir.applyAxisAngle(zAxis, 0.07);
      q.setFromUnitVectors(up, dir);
      m.compose(p.clone().addScaledVector(dir, 0.1), q, sc.set(1, 1, 1));
      parts.push(buildPart(new THREE.CylinderGeometry(0.022, 0.032 - i * 0.002, 0.2, 6, 1), bark, m));
      p.addScaledVector(dir, 0.2);
    }
    const frond = new THREE.BoxGeometry(0.55, 0.012, 0.09).translate(0.275, 0, 0);
    for (let i = 0; i < 9; i++) {
      const yaw = (i / 9) * Math.PI * 2 + rnd() * 0.3;
      m.makeTranslation(p.x, p.y, p.z)
        .multiply(new THREE.Matrix4().makeRotationY(yaw))
        .multiply(new THREE.Matrix4().makeRotationZ(-0.25 - rnd() * 0.3));
      parts.push(buildPart(frond, new THREE.Color(0x3f7f2b), m, true));
    }
  }
  return mergeGeometries(parts);
}

function generateEnvironmentTrees() {
  const types = ["rain", "round", "palm"];
  const material = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const countPerType = Math.ceil(TREE_COUNT / types.length);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const quat = new THREE.Quaternion();

  let placedTotal = 0;
  types.forEach((type, v) => {
    const mesh = new THREE.InstancedMesh(buildTreeGeometry(type, 101 + v * 37), material, countPerType);
    mesh.name = `tree-${type}`;
    let placed = 0, attempts = 0;
    while (placed < countPerType && placedTotal < TREE_COUNT && attempts < countPerType * 30) {
      attempts++;
      const angle = Math.random() * Math.PI * 2;
      const radius = TREE_INNER_RADIUS + Math.random() * (TREE_OUTER_RADIUS - TREE_INNER_RADIUS);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (x > -2 && x < TREE_OUTER_RADIUS && Math.abs(z) < TREE_PATH_HALF_WIDTH) continue;

      const s = 0.8 + Math.random() * 0.5;
      position.set(x, 0, z);
      quat.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
      scale.set(s, s * (0.9 + Math.random() * 0.25), s);
      matrix.compose(position, quat, scale);
      mesh.setMatrixAt(placed++, matrix);
      placedTotal++;
    }
    mesh.count = placed;
    mesh.instanceMatrix.needsUpdate = true;
    treeEnvironment.add(mesh);
  });
}
generateEnvironmentTrees();

/* ============================================================
 * Kamera & status global
 * ============================================================ */
const orbitCam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
orbitCam.position.set(8, 5, 12); // posisi awal (menentukan chunk yang di-preload saat loading)

const fpsCam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.01, 100);
scene.add(fpsCam);

let activeCamera = orbitCam;
let isSV = false;
let transitionActive = false;
let mapMode = false;

const ORBIT_TARGET_Y = 4.7 * 0.35;
const ORBIT_TARGET = new THREE.Vector3(0, ORBIT_TARGET_Y, 0);
const HOME_POS = new THREE.Vector3(
  12 * Math.sin(1.0) * Math.sin(-0.8),
  ORBIT_TARGET_Y + 12 * Math.cos(1.0),
  12 * Math.sin(1.0) * Math.cos(-0.8),
);

/* ---------- Mode jelajah (free-fly) ---------- */
let freeFlyMode = false;
const freeFly = { yaw: 0, pitch: 0, dragging: false, lastX: 0, lastY: 0 };

function startFly(pos, target) {
  orbitCam.near = 0.03;
  orbitCam.far = 300;
  orbitCam.updateProjectionMatrix();
  orbitCam.position.copy(pos);
  orbitCam.up.set(0, 1, 0);
  orbitCam.lookAt(target);
  const e = new THREE.Euler().setFromQuaternion(orbitCam.quaternion, "YXZ");
  freeFly.yaw = e.y;
  freeFly.pitch = e.x;
  freeFlyMode = true;
  renderHints("fly");
}

/* ============================================================
 * Konfigurasi candi, perjalanan, pemain
 * ============================================================ */
const SPAWN_POS = new THREE.Vector3(2.6, 0.13, -0.02);
const SPAWN_YAW = 1.57;
let spawn = { id: "siwa", pos: SPAWN_POS.clone(), yaw: SPAWN_YAW };

const TEMPLE_FACING = { wisnu: "east", brahma: "east", garuda: "west", nandi: "west", angsa: "west" };
const TEMPLE_SPAWN_DIST = 0.7;
const TEMPLE_CENTERS = {
  wisnu:  [0.32, -4.0],
  brahma: [0.32, 4.05],
  garuda: [4.61, -3.97],
  nandi:  [4.61, 0.05],
  angsa:  [4.61, 4.12],
};
const GATE_CENTER = { siwa: [0, 0], ...TEMPLE_CENTERS };

const HALF = 1.3;
const TEMPLE_BOUNDS = {
  siwa: { minX: -2.0, maxX: 3.2, minZ: -2.0, maxZ: 2.0 },
};
for (const [id, c] of Object.entries(TEMPLE_CENTERS)) {
  TEMPLE_BOUNDS[id] = { minX: c[0] - HALF, maxX: c[0] + HALF, minZ: c[1] - HALF, maxZ: c[1] + HALF };
}

const JOURNEY = {
  overview: { position: new THREE.Vector3(4.5, 3.5, 6.5), target: new THREE.Vector3(0, 1.8, 0) },
  entrance: { position: new THREE.Vector3(3.7, 1.25, 0.15), target: new THREE.Vector3(1.3, 1.35, 0.05) },
  waypoints: [
    { id: "entrance", position: new THREE.Vector3(3.7, 1.25, 0.15) },
    { id: "interior", position: new THREE.Vector3(2.734, 0.65, -0.7) },
  ],
};

const goOverview = () => startFly(JOURNEY.overview.position, ORBIT_TARGET);

const extraModels = [];     // root chunk candi selain Siwa (disembunyikan di mode peta)
const modelById = {};       // model collision candi selain Siwa
const extraColliders = [];  // mesh collision candi selain Siwa

const gsap = window.gsap;

const NAV_EYE_HEIGHT = 0.13;
const P = {
  pos: SPAWN_POS.clone(),
  vel: new THREE.Vector3(),
  yaw: SPAWN_YAW,
  pitch: 0,
  onGround: false,
  jumpRequested: false,
  eyeH: NAV_EYE_HEIGHT,
  radius: 0.02,
  maxStepH: 0.04,
  walkSpd: 2.0 * 0.1,
  runSpd: 3.0 * 0.1,
  gravity: 1.8,
  jumpVel: 0.5,
  bobPhase: 0,
  bobY: 0,
  footRef: 0,
};

function syncFirstPersonCamera() {
  fpsCam.position.copy(P.pos);
  fpsCam.position.y += P.bobY;
  fpsCam.rotation.order = "YXZ";
  fpsCam.rotation.y = P.yaw;
  fpsCam.rotation.x = P.pitch;
}

function computeSpawn(id) {
  if (id === "siwa" || id === "entrance") return { id: "siwa", pos: SPAWN_POS.clone(), yaw: SPAWN_YAW };
  if (id === "interior") return { id: "siwa", pos: JOURNEY.waypoints[1].position.clone(), yaw: SPAWN_YAW };
  const c = TEMPLE_CENTERS[id];
  if (!c) return null;
  const east = TEMPLE_FACING[id] === "east";
  return {
    id,
    pos: new THREE.Vector3(c[0] + (east ? 1 : -1) * TEMPLE_SPAWN_DIST, 0.13, c[1]),
    yaw: east ? 1.57 : -1.57,
  };
}

/* ============================================================
 * Collision (BVH) & raycast
 * ============================================================ */
let templeModel = null;
let bvhMesh = null;
let rawGeoRef = null;
let bvhBuilding = false;
let siwaColScene = null;

const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });

function ensureBVHReady() {
  if (bvhMesh || bvhBuilding || !rawGeoRef) return;
  bvhBuilding = true;
  try {
    rawGeoRef.computeBoundsTree();
    bvhMesh = new THREE.Mesh(rawGeoRef, colliderMaterial);
    bvhMesh.visible = false;
    bvhMesh.matrixAutoUpdate = false;
    scene.add(bvhMesh);
  } catch (e) {
    console.error("Gagal membangun BVH. Model terlalu padat:", e);
    showCalibToast("Model terlalu padat, kecilkan jumlah segitiga.");
  } finally {
    bvhBuilding = false;
  }
}

function hitAll(ray) {
  const hits = [];
  if (bvhMesh) hits.push(...ray.intersectObjects([bvhMesh], false));
  if (extraColliders.length) hits.push(...ray.intersectObjects(extraColliders, false));
  return hits.sort((a, b) => a.distance - b.distance);
}

const allColliders = () => (bvhMesh ? [bvhMesh, ...extraColliders] : extraColliders);

const gRay = new THREE.Raycaster();
gRay.firstHitOnly = false;
const wRayX = new THREE.Raycaster();
wRayX.firstHitOnly = true;
const wRayZ = new THREE.Raycaster();
wRayZ.firstHitOnly = true;

const _DN = new THREE.Vector3(0, -1, 0);
const _PX = new THREE.Vector3(1, 0, 0), _NX = new THREE.Vector3(-1, 0, 0);
const _PZ = new THREE.Vector3(0, 0, 1), _NZ = new THREE.Vector3(0, 0, -1);
const _ro = new THREE.Vector3();

const STAIR_STEP_TOLERANCE = 0.16;

function groundY(pos) {
  const footY = pos.y - P.eyeH;
  _ro.set(pos.x, footY + STAIR_STEP_TOLERANCE + 0.01, pos.z);
  gRay.set(_ro, _DN);
  gRay.far = STAIR_STEP_TOLERANCE + 0.06;
  const limit = footY + STAIR_STEP_TOLERANCE + 0.002;
  const floorHit = hitAll(gRay).find((x) => x.point.y <= limit);
  if (floorHit) return floorHit.point.y;
  const h2 = gRay.intersectObjects([ground, plaza], false);
  return h2.length ? h2[0].point.y : null;
}

function wallBlocked(pos, mx, mz) {
  if (!bvhMesh && !extraColliders.length) return { bx: false, bz: false };
  const foot = P.onGround || walkTransitionActive ? pos.y - P.eyeH : P.footRef;
  const heights = [foot + 0.08, foot + P.eyeH - 0.01];
  const isWall = (h) => !h.face || Math.abs(h.face.normal.y) < 0.6;
  let bx = false, bz = false;
  for (const hy of heights) {
    _ro.set(pos.x, hy, pos.z);
    if (!bx && mx !== 0) {
      wRayX.set(_ro, mx > 0 ? _PX : _NX);
      wRayX.far = P.radius + 0.012;
      if (wRayX.intersectObjects(allColliders(), false).filter(isWall).length) bx = true;
    }
    if (!bz && mz !== 0) {
      wRayZ.set(_ro, mz > 0 ? _PZ : _NZ);
      wRayZ.far = P.radius + 0.012;
      if (wRayZ.intersectObjects(allColliders(), false).filter(isWall).length) bz = true;
    }
    if (bx && bz) break;
  }
  return { bx, bz };
}

function blockedByTemple(x, z) {
  if (!isSV) return false;
  const b = TEMPLE_BOUNDS[spawn.id];
  return Boolean(b) && (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ);
}

function templeSegmentBlocked(a, b) {
  const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.03));
  for (let i = 0; i <= n; i++) {
    const k = i / n;
    if (blockedByTemple(a.x + (b.x - a.x) * k, a.z + (b.z - a.z) * k)) return true;
  }
  return false;
}

function resolveStreetViewSpawn(preferred) {
  if (!bvhMesh) return preferred.clone();
  const ray = new THREE.Raycaster(new THREE.Vector3(preferred.x, 50, preferred.z), _DN, 0, 100);
  const floors = hitAll(ray).filter((h) => h.face && h.face.normal.y > 0.6);
  if (floors.length) {
    const wantY = preferred.y - P.eyeH;
    floors.sort((a, b) => Math.abs(a.point.y - wantY) - Math.abs(b.point.y - wantY));
    return new THREE.Vector3(preferred.x, floors[0].point.y + P.eyeH, preferred.z);
  }
  return walkablePointNear(preferred.x, preferred.z, preferred.y, 1.6) || preferred.clone();
}

/* ============================================================
 * Navigasi lantai (panah, klik lantai, pathfinding)
 * ============================================================ */
const MODEL_UNITS_PER_METER = 4.7 / 47;
const NAV_WALL_CLEARANCE = 0.12 * MODEL_UNITS_PER_METER;
const NAV_HEADROOM_CLEARANCE = NAV_EYE_HEIGHT * 0.55;
const NAV_PATH_STEP = 0.08;
const MAX_CLICK_WALK = 0.3;
const NAV_PATH_MARGIN = 0.35;
const NAV_PATH_MAX_NODES = 9000;
const NAV_PATH_DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const FLOOR_ARROW_MISS_TOLERANCE = 8;

const TEMPLE_DOORWAYS = [
  { x: 1.088, z: -0.022, halfDepth: 0.14, halfWidth: 0.07 },
  { x: 0.78,  z: -0.02,  halfDepth: 0.14, halfWidth: 0.07 },
  { x: 0.007, z: 1.296,  halfDepth: 0.14, halfWidth: 0.07, axis: "z" },
  { x: 0.01,  z: 0.78,   halfDepth: 0.14, halfWidth: 0.07, axis: "z" },
];

const WALK_WAYPOINTS = [
  { id: "step-forward", position: new THREE.Vector3(0.42, 0.515, -0.017) },
];

let walkTransitionActive = false;
let arrowHovered = false;
let floorNavReady = false;
let floorArrowMissStreak = 0;

const floorArrowRay = new THREE.Raycaster();
const floorArrowPointer = new THREE.Vector2();
const floorForwardRay = new THREE.Raycaster();
const floorDownRay = new THREE.Raycaster();
const floorClickRay = new THREE.Raycaster();
const navigationWallRay = new THREE.Raycaster();
const floorNavDirection = new THREE.Vector3();
const floorNavOrigin = new THREE.Vector3();
const floorNavPoint = new THREE.Vector3();
const floorArrowPosition = new THREE.Vector3();
const navigationWallOrigin = new THREE.Vector3();
const navigationWallDirection = new THREE.Vector3();
const _floorArrowTarget = new THREE.Vector3();
const _navigationProbe = new THREE.Vector3();
const _navigationCandidate = new THREE.Vector3();
const _navigationRayDirections = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1),
];
const _navigationUp = new THREE.Vector3(0, 1, 0);
const _navigationSide = new THREE.Vector3();

function doorExtents(d) {
  return d.axis === "z"
    ? { hx: d.halfWidth, hz: d.halfDepth }
    : { hx: d.halfDepth, hz: d.halfWidth };
}

function isInsideTempleDoorway(p) {
  return TEMPLE_DOORWAYS.some((d) => {
    const { hx, hz } = doorExtents(d);
    return Math.abs(p.x - d.x) <= hx && Math.abs(p.z - d.z) <= hz;
  });
}

function segmentCrossesTempleDoorway(from, to) {
  const dist = Math.hypot(to.x - from.x, to.z - from.z);
  const n = Math.max(1, Math.ceil(dist / 0.02));
  for (let i = 0; i <= n; i++) {
    const k = i / n;
    if (isInsideTempleDoorway({ x: from.x + (to.x - from.x) * k, z: from.z + (to.z - from.z) * k })) return true;
  }
  return false;
}

function isInDoorCorridor(p) {
  return TEMPLE_DOORWAYS.some((d) => {
    const { hx, hz } = doorExtents(d);
    return d.axis === "z"
      ? Math.abs(p.x - d.x) <= hx + 0.03 && Math.abs(p.z - d.z) <= hz + 0.5
      : Math.abs(p.z - d.z) <= hz + 0.03 && Math.abs(p.x - d.x) <= hx + 0.5;
  });
}

function loadFloorArrowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 128, 128);
    ctx.save();
    ctx.translate(64, 64);
    ctx.shadowColor = "rgba(0,0,0,.35)";
    ctx.shadowBlur = 12;
    ctx.drawImage(img, -44, -44, 88, 88);
    ctx.restore();
    texture.needsUpdate = true;
  };
  img.onerror = () => console.warn("Gagal memuat navigation-arrow.svg — cek path asetnya.");
  img.src = "./assets/navigation-arrow.svg";
  return texture;
}

const floorArrow = new THREE.Mesh(
  new THREE.PlaneGeometry(0.06, 0.06),
  new THREE.MeshBasicMaterial({
    map: loadFloorArrowTexture(),
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  }),
);
floorArrow.rotation.x = -Math.PI / 2;
floorArrow.position.copy(WALK_WAYPOINTS[0].position);
floorArrow.renderOrder = 4;
floorArrow.visible = false;
scene.add(floorArrow);

function getFloorAt(x, z, originY = P.pos.y + 0.1) {
  floorDownRay.set(floorNavOrigin.set(x, originY, z), _DN);
  floorDownRay.far = 3;
  const hits = [];
  if (bvhMesh) hits.push(...hitAll(floorDownRay));
  hits.push(...floorDownRay.intersectObjects([ground, plaza], false));
  hits.sort((a, b) => a.distance - b.distance);
  return hits.length ? hits[0].point : null;
}

function updateFloorArrowTarget() {
  if (!isSV || walkTransitionActive || !bvhMesh) {
    floorArrow.visible = false;
    floorNavReady = false;
    floorArrowMissStreak = 0;
    return;
  }

  floorNavDirection.set(-Math.sin(P.yaw), 0, -Math.cos(P.yaw));
  floorForwardRay.set(fpsCam.position, floorNavDirection);
  floorForwardRay.near = 0.03;
  floorForwardRay.far = 0.35;
  const forwardHits = hitAll(floorForwardRay);
  const probeDistance = forwardHits.length
    ? Math.min(0.3, Math.max(0.12, forwardHits[0].distance * 0.6))
    : 0.2;
  const x = P.pos.x + floorNavDirection.x * probeDistance;
  const z = P.pos.z + floorNavDirection.z * probeDistance;
  floorArrowPosition.set(x, P.pos.y + 0.1, z);
  floorDownRay.set(floorArrowPosition, _DN);
  floorDownRay.near = 0;
  floorDownRay.far = 3;
  const floorHits = hitAll(floorDownRay);
  const floorHit = floorHits.length ? floorHits[0].point : getFloorAt(x, z, P.pos.y + 0.1);
  const validHit = floorHit && floorHit.y <= P.pos.y + 0.4 && Math.hypot(x - P.pos.x, z - P.pos.z) >= 0.1;

  if (!validHit) {
    floorArrowMissStreak++;
    if (floorArrowMissStreak > FLOOR_ARROW_MISS_TOLERANCE) {
      floorArrow.visible = false;
      floorNavReady = false;
    }
    return;
  }
  floorArrowMissStreak = 0;

  floorNavPoint.set(x, floorHit.y, z);
  _floorArrowTarget.set(x, floorHit.y + 0.03, z);
  floorArrow.position.lerp(_floorArrowTarget, 0.35);
  floorArrow.rotation.set(-Math.PI / 2, 0, Math.atan2(floorNavDirection.x, floorNavDirection.z) + Math.PI);
  floorArrow.visible = true;
  floorNavReady = true;
}

function getCollisionSafePoint(destination) {
  const dx = destination.x - P.pos.x;
  const dz = destination.z - P.pos.z;
  const distance = Math.hypot(dx, dz);
  if (distance < 0.001 || !bvhMesh) return destination.clone();
  if (segmentCrossesTempleDoorway(P.pos, destination)) return destination.clone();
  if (isInDoorCorridor(P.pos) || isInDoorCorridor(destination)) return destination.clone();

  navigationWallOrigin.set(P.pos.x, P.pos.y - NAV_EYE_HEIGHT + P.maxStepH + 0.01, P.pos.z);
  navigationWallDirection.set(dx, 0, dz).normalize();
  navigationWallRay.set(navigationWallOrigin, navigationWallDirection);
  navigationWallRay.near = 0.06;
  navigationWallRay.far = distance;
  const wallHit = hitAll(navigationWallRay).find((h) => !isInsideTempleDoorway(h.point));
  if (!wallHit) return destination.clone();
  const safeDistance = wallHit.distance - NAV_WALL_CLEARANCE;
  if (safeDistance < 0.12) return null;
  return new THREE.Vector3(
    P.pos.x + navigationWallDirection.x * Math.min(distance, safeDistance),
    destination.y,
    P.pos.z + navigationWallDirection.z * Math.min(distance, safeDistance),
  );
}

function isPlayerSpaceClear(position) {
  if (blockedByTemple(position.x, position.z)) return false;
  if (!bvhMesh) return true;
  if (isInsideTempleDoorway(position)) return true;
  const clearance = P.radius + NAV_WALL_CLEARANCE;
  const stepClearance = P.radius + 0.01;
  const heightChecks = [
    { y: position.y - P.eyeH + 0.08 + 0.01, far: stepClearance },
    { y: position.y, far: clearance },
  ];
  for (const { y, far } of heightChecks) {
    for (const direction of _navigationRayDirections) {
      navigationWallRay.set(_navigationProbe.set(position.x, y, position.z), direction);
      navigationWallRay.near = 0.001;
      navigationWallRay.far = far;
      if (hitAll(navigationWallRay).length) return false;
    }
  }
  navigationWallRay.set(_navigationProbe.set(position.x, position.y - P.eyeH + 0.01, position.z), _navigationUp);
  navigationWallRay.near = 0.001;
  navigationWallRay.far = NAV_HEADROOM_CLEARANCE - 0.02;
  if (hitAll(navigationWallRay).length) return false;
  return true;
}

function walkablePointNear(x, z, referenceY = P.pos.y, maxRadius = 0.48) {
  const candidates = [{ x, z }];
  for (let radius = 0.04; radius <= maxRadius; radius += 0.04) {
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      candidates.push({ x: x + Math.cos(angle) * radius, z: z + Math.sin(angle) * radius });
    }
  }

  let best = null;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const floor = groundY(_navigationProbe.set(candidate.x, referenceY, candidate.z));
    if (floor === null) continue;
    const walkable = _navigationCandidate.set(candidate.x, floor + P.eyeH, candidate.z);
    if (!isPlayerSpaceClear(walkable)) continue;
    const distance = Math.hypot(candidate.x - x, candidate.z - z);
    if (distance < bestDistance) {
      best = walkable.clone();
      bestDistance = distance;
    }
  }
  return best;
}

function navigationSegmentClear(from, to) {
  if (!bvhMesh) return true;
  if (segmentCrossesTempleDoorway(from, to)) return true;
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const distance = Math.hypot(dx, dz);
  if (distance < 0.001) return true;
  navigationWallDirection.set(dx, 0, dz).normalize();
  _navigationSide.set(-navigationWallDirection.z, 0, navigationWallDirection.x);
  const heights = [from.y - P.eyeH + STAIR_STEP_TOLERANCE + 0.01, from.y];
  const offsets = [-NAV_WALL_CLEARANCE, 0, NAV_WALL_CLEARANCE];
  for (const offset of offsets) {
    for (const y of heights) {
      navigationWallRay.set(
        _navigationProbe.set(from.x + _navigationSide.x * offset, y, from.z + _navigationSide.z * offset),
        navigationWallDirection,
      );
      navigationWallRay.near = 0.001;
      navigationWallRay.far = distance;
      const hit = hitAll(navigationWallRay)[0];
      if (hit && hit.distance < distance - NAV_WALL_CLEARANCE) return false;
    }
  }
  return true;
}

// BFS pada grid untuk mencari jalur jalan kaki ke titik tujuan
function findWalkablePath(destination) {
  const target = walkablePointNear(destination.x, destination.z, P.pos.y);
  if (!target) return null;
  if (Math.hypot(target.x - P.pos.x, target.z - P.pos.z) < 0.001) return [];

  const bounds = spawn.id === "siwa"
    ? rawGeoRef?.boundingBox
    : new THREE.Box3().setFromPoints([P.pos, destination]).expandByScalar(1.2);
  if (!bounds) return null;
  const minIX = Math.floor((bounds.min.x - NAV_PATH_MARGIN - P.pos.x) / NAV_PATH_STEP);
  const maxIX = Math.ceil((bounds.max.x + NAV_PATH_MARGIN - P.pos.x) / NAV_PATH_STEP);
  const minIZ = Math.floor((bounds.min.z - NAV_PATH_MARGIN - P.pos.z) / NAV_PATH_STEP);
  const maxIZ = Math.ceil((bounds.max.z + NAV_PATH_MARGIN - P.pos.z) / NAV_PATH_STEP);

  const start = { ix: 0, iz: 0, x: P.pos.x, y: P.pos.y, z: P.pos.z };
  const queue = [start];
  const visited = new Set(["0,0"]);
  const previous = new Map();
  const nodes = new Map([["0,0", start]]);
  let goalKey = null;

  for (let cursor = 0; cursor < queue.length && cursor < NAV_PATH_MAX_NODES; cursor++) {
    const node = queue[cursor];
    const nodeKey = `${node.ix},${node.iz}`;
    if (Math.hypot(node.x - target.x, node.z - target.z) <= NAV_PATH_STEP * 0.8) {
      if (navigationSegmentClear(node, target) && isPlayerSpaceClear(target)) {
        goalKey = nodeKey;
        break;
      }
    }

    for (const [dx, dz] of NAV_PATH_DIRECTIONS) {
      const ix = node.ix + dx;
      const iz = node.iz + dz;
      if (ix < minIX || ix > maxIX || iz < minIZ || iz > maxIZ) continue;
      const key = `${ix},${iz}`;
      if (visited.has(key)) continue;

      const x = P.pos.x + ix * NAV_PATH_STEP;
      const z = P.pos.z + iz * NAV_PATH_STEP;
      const floor = groundY(_navigationProbe.set(x, node.y, z));
      if (floor === null || Math.abs(floor - (node.y - P.eyeH)) > P.maxStepH + 0.025) continue;

      const next = { ix, iz, x, y: floor + P.eyeH, z };
      if (!isPlayerSpaceClear(next) || !navigationSegmentClear(node, next)) continue;
      visited.add(key);
      previous.set(key, nodeKey);
      nodes.set(key, next);
      queue.push(next);
    }
  }

  if (!goalKey) return null;
  const path = [];
  let key = goalKey;
  while (key !== "0,0") {
    const node = nodes.get(key);
    path.push(new THREE.Vector3(node.x, node.y, node.z));
    key = previous.get(key);
  }
  path.reverse();
  const last = path[path.length - 1] || start;
  if (Math.hypot(last.x - target.x, last.z - target.z) > 0.001) path.push(target);
  return path;
}

function moveToFloorPoint(point, { usePath = false, onComplete = null } = {}) {
  if (!isSV || walkTransitionActive || !gsap || poiOpen || !point) return;
  const destination = point.clone();
  if (!usePath) {
    const rx = destination.x - P.pos.x;
    const rz = destination.z - P.pos.z;
    const rd = Math.hypot(rx, rz);
    if (rd > MAX_CLICK_WALK) {
      destination.x = P.pos.x + (rx / rd) * MAX_CLICK_WALK;
      destination.z = P.pos.z + (rz / rd) * MAX_CLICK_WALK;
    }
  }
  const groundPoint = getFloorAt(destination.x, destination.z, Math.max(P.pos.y, destination.y) + 0.1);
  if (!groundPoint) return;
  destination.y = groundPoint.y + NAV_EYE_HEIGHT;

  let safeDestination;
  let navigationPath = null;
  if (usePath) {
    navigationPath = findWalkablePath(destination);
    if (!navigationPath?.length) return;
    safeDestination = navigationPath[navigationPath.length - 1].clone();
  } else {
    safeDestination = getCollisionSafePoint(destination);
  }
  if (!safeDestination) return;

  const safeGroundPoint = getFloorAt(safeDestination.x, safeDestination.z, Math.max(P.pos.y, safeDestination.y) + 0.1);
  if (!safeGroundPoint) return;
  if (templeSegmentBlocked(P.pos, safeDestination)) return;
  safeDestination.y = safeGroundPoint.y + NAV_EYE_HEIGHT;
  if (Math.hypot(destination.x - P.pos.x, destination.z - P.pos.z) < 0.12) return;

  walkTransitionActive = true;
  floorArrow.visible = false;
  gsap.killTweensOf(P.pos);
  gsap.killTweensOf(P);

  const travelPath = navigationPath || [safeDestination];
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      walkTransitionActive = false;
      syncFirstPersonCamera();
      onComplete?.();
    },
  });

  let segmentStart = P.pos.clone();
  travelPath.forEach((segmentEnd) => {
    const dx = segmentEnd.x - segmentStart.x;
    const dz = segmentEnd.z - segmentStart.z;
    const segmentDistance = Math.hypot(dx, dz);
    if (segmentDistance < 0.001) return;
    const yaw = Math.atan2(-dx, -dz);
    const duration = Math.max(0.12, segmentDistance / P.walkSpd);
    let lastX = P.pos.x, lastZ = P.pos.z;

    tl.to(P.pos, {
      x: segmentEnd.x,
      z: segmentEnd.z,
      duration,
      onUpdate: () => {
        const mx = P.pos.x - lastX, mz = P.pos.z - lastZ;
        if (!isInsideTempleDoorway(P.pos) && (mx || mz)) {
          const { bx, bz } = wallBlocked({ x: lastX, y: P.pos.y, z: lastZ }, mx, mz);
          if (bx || bz) {
            tl.kill();
            P.pos.x = lastX; P.pos.z = lastZ;
            walkTransitionActive = false;
            syncFirstPersonCamera();
            return;
          }
        }
        lastX = P.pos.x; lastZ = P.pos.z;
        const stepFloor = groundY(P.pos);
        if (stepFloor !== null) P.pos.y = stepFloor + NAV_EYE_HEIGHT;
        syncFirstPersonCamera();
      },
    });
    tl.to(P, { yaw, pitch: 0, duration, onUpdate: syncFirstPersonCamera }, "<");
    segmentStart = segmentEnd.clone();
  });
}

function floorPointFromPointer(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  floorArrowPointer.set(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1,
  );
  floorClickRay.setFromCamera(floorArrowPointer, fpsCam);
  const hits = [];
  if (bvhMesh) hits.push(...hitAll(floorClickRay));
  hits.push(...floorClickRay.intersectObjects([ground, plaza], false));
  for (const hit of hits.sort((a, b) => a.distance - b.distance)) {
    const floor = getFloorAt(hit.point.x, hit.point.z, P.pos.y + 0.1);
    if (floor && floor.y <= P.pos.y + 0.03) return floor.clone();
  }
  return null;
}

function updateFloorArrowPointer(clientX, clientY) {
  if (!isSV || walkTransitionActive || !floorArrow.visible) {
    arrowHovered = false;
    return;
  }
  const rect = canvas.getBoundingClientRect();
  floorArrowPointer.set(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1,
  );
  floorArrowRay.setFromCamera(floorArrowPointer, fpsCam);
  arrowHovered = floorArrowRay.intersectObjects([floorArrow], false).length > 0;
}

function triggerFloorNavigation(clientX, clientY) {
  updateFloorArrowPointer(clientX, clientY);
  if (arrowHovered && floorNavReady) {
    moveToFloorPoint(floorNavPoint);
    return;
  }
  const clickedFloor = floorPointFromPointer(clientX, clientY);
  if (clickedFloor) moveToFloorPoint(clickedFloor);
}

/* ============================================================
 * POI & hotspot gerbang candi
 * ============================================================ */
let poiOpen = false;
let activePOIRef = null;
const poiDots = new Map();
const INFO_POIS = POIS.filter((p) => p.noOcclusion);
const STATUE_IDS = new Set(["mahadewa", "agastya", "ganesha", "durga"]);

function createPOIDot(p) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "poiDot";
  dot.setAttribute("aria-label", p.name[currentLang]);
  dot.title = p.name[currentLang];
  dot.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!poiOpen) openPOI(p);
  });
  dot.addEventListener("click", (e) => e.stopPropagation());
  const label = document.createElement("div");
  label.className = "poiLabel";
  label.textContent = p.name[currentLang];
  dot.appendChild(label);
  poiLayer.appendChild(dot);
  poiDots.set(p.uid, dot);
}
POIS.forEach(createPOIDot);

function refreshDotLabels() {
  POIS.forEach((p) => {
    const dot = poiDots.get(p.uid);
    if (!dot) return;
    const label = dot.querySelector(".poiLabel");
    dot.title = p.name[currentLang];
    if (label) label.textContent = p.name[currentLang];
  });
}

const GATE_MAX_DIST = 8;
const GATE_TOL = { siwa: 4.0 };
const GATE_TOL_DEFAULT = 1.8;
const gateDots = new Map();
const _gateRay = new THREE.Raycaster();
_gateRay.firstHitOnly = true;
const _gateDir = new THREE.Vector3();
const _gateTarget = new THREE.Vector3();
const _poiProj = new THREE.Vector3();
const _poiCamera = new THREE.Vector3();
const _poiToPoint = new THREE.Vector3();
const _poiOcclusionRay = new THREE.Raycaster();
_poiOcclusionRay.firstHitOnly = true;

function createGateDot(node) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "poiDot gateDot";
  const label = document.createElement("div");
  label.className = "poiLabel";
  dot.appendChild(label);
  dot.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (poiOpen || transitionActive) return;
    stopTourMotion();
    beginJourney(node.id);
  });
  poiLayer.appendChild(dot);
  gateDots.set(node.id, dot);
}
MAP_NODES.forEach(createGateDot);

function updateGateDots() {
  for (const n of MAP_NODES) {
    const dot = gateDots.get(n.id);
    const c = GATE_CENTER[n.id];
    if (!isSV || poiOpen || n.id === spawn.id || !c) { dot.style.display = "none"; continue; }

    _poiProj.set(c[0], P.pos.y + 0.3, c[1]);
    const dist = Math.hypot(c[0] - P.pos.x, c[1] - P.pos.z);
    _poiProj.project(fpsCam);
    const visible = dist < GATE_MAX_DIST && _poiProj.z > -1 && _poiProj.z < 1 &&
      Math.abs(_poiProj.x) <= 1.15 && Math.abs(_poiProj.y) <= 1.15;
    if (!visible) { dot.style.display = "none"; continue; }

    _gateTarget.set(c[0], P.pos.y + 0.6, c[1]);
    _gateDir.copy(_gateTarget).sub(fpsCam.position);
    const gateDist = _gateDir.length();
    _gateRay.set(fpsCam.position, _gateDir.normalize());
    _gateRay.near = 0.03;
    _gateRay.far = gateDist;
    const gateHit = hitAll(_gateRay)[0];
    const tol = GATE_TOL[n.id] ?? GATE_TOL_DEFAULT;
    if (gateHit && gateDist - gateHit.distance > tol) { dot.style.display = "none"; continue; }

    const text = T("gateClick") + tr(n.name);
    if (dot.dataset.t !== text) {
      dot.dataset.t = text;
      dot.firstChild.textContent = text;
    }
    dot.style.display = "block";
    dot.style.left = (_poiProj.x * 0.5 + 0.5) * innerWidth + "px";
    dot.style.top = (1 - (_poiProj.y * 0.5 + 0.5)) * innerHeight + "px";
  }
}

function updatePOIs() {
  if (mapMode || transitionActive || (!isSV && !entryScreen.classList.contains("hidden"))) {
    poiLayer.style.display = "none";
    return;
  }
  poiLayer.style.display = "block";
  const hotspotCamera = isSV ? fpsCam : orbitCam;
  hotspotCamera.updateMatrixWorld();
  _poiCamera.copy(hotspotCamera.position);
  const activePOIs = isSV ? [...(POIS_BY_TEMPLE[spawn.id] || []), ...INFO_POIS] : INFO_POIS;
  for (const p of POIS) {
    if (!activePOIs.includes(p)) poiDots.get(p.uid).style.display = "none";
  }

  for (const p of activePOIs) {
    const dot = poiDots.get(p.uid);
    _poiProj.copy(p.pos).project(hotspotCamera);
    const inView = _poiProj.z < 1 && _poiProj.z > -1 &&
      _poiProj.x >= -1.15 && _poiProj.x <= 1.15 &&
      _poiProj.y >= -1.15 && _poiProj.y <= 1.15;
    _poiToPoint.copy(p.pos).sub(_poiCamera);
    const distance = _poiToPoint.length();
    let occluded = false;
    if (inView && bvhMesh && distance > 0.01 && !p.noOcclusion) {
      _poiOcclusionRay.set(_poiCamera, _poiToPoint.normalize());
      _poiOcclusionRay.near = 0.03;
      _poiOcclusionRay.far = distance;
      const occlusionHit = hitAll(_poiOcclusionRay)[0];
      const surfaceTolerance = STATUE_IDS.has(p.id) ? 0.25 : Math.max(0.08, (p.radius || 0.12) * 0.8);
      occluded = Boolean(occlusionHit && distance - occlusionHit.distance > surfaceTolerance);
    }

    if (inView && !occluded) {
      dot.style.display = "block";
      dot.style.left = (_poiProj.x * 0.5 + 0.5) * innerWidth + "px";
      dot.style.top = (1 - (_poiProj.y * 0.5 + 0.5)) * innerHeight + "px";
    } else {
      dot.style.display = "none";
    }
  }
}

const _journeyProj = new THREE.Vector3();
function updateJourneyWaypoints() {
  if (transitionActive || isSV || journeyLayer.classList.contains("hidden")) return;
  for (const waypoint of JOURNEY.waypoints) {
    const button = journeyLayer.querySelector(`[data-waypoint="${waypoint.id}"]`);
    if (!button) continue;
    _journeyProj.copy(waypoint.position).project(orbitCam);
    const visible = _journeyProj.z < 1 && _journeyProj.z > -1 &&
      _journeyProj.x >= -1 && _journeyProj.x <= 1 &&
      _journeyProj.y >= -1 && _journeyProj.y <= 1;
    button.style.display = visible ? "flex" : "none";
    if (visible) {
      button.style.left = `${(_journeyProj.x * 0.5 + 0.5) * innerWidth}px`;
      button.style.top = `${(1 - (_journeyProj.y * 0.5 + 0.5)) * innerHeight}px`;
    }
  }
}

/* ---------- Kartu info POI ---------- */
function refreshPOIText(p) {
  poiDirEl.textContent = p.dir?.[currentLang] ?? "";
  poiDirEl.style.display = p.dir ? "" : "none";
  poiTitleEl.textContent = p.name[currentLang];
  poiDescEl.textContent = p.desc[currentLang];
  poiImgEl.alt = p.name[currentLang];

  poiAudioEl.pause();
  poiAudioEl.currentTime = 0;
  const src = p.audio && p.audio[currentLang];
  if (src) {
    poiAudioEl.src = src;
    poiAudioBtn.style.display = "";
    poiAudioIcon.textContent = "▶";
    poiAudioLabel.textContent = T("audioPlay");
  } else {
    poiAudioEl.removeAttribute("src");
    poiAudioBtn.style.display = "none";
  }
}

function openPOI(p) {
  if (gsap) gsap.killTweensOf([P.pos, P]);
  walkTransitionActive = false;
  floorArrow.visible = false;
  poiOpen = true;
  activePOIRef = p;
  refreshPOIText(p);
  poiImgEl.onerror = () => poiImgFrame.classList.add("empty");
  poiImgFrame.classList.toggle("empty", !p.img);
  if (p.img) poiImgEl.src = p.img;
  else poiImgEl.removeAttribute("src");
  poiModal.classList.remove("hidden");
}

function closePOI() {
  poiOpen = false;
  activePOIRef = null;
  poiModal.classList.add("hidden");
  poiAudioEl.pause();
}

poiClose.addEventListener("click", closePOI);
poiModal.addEventListener("click", (e) => {
  if (e.target === poiModal) closePOI();
});

const BG_MUSIC_VOLUME = 0.15;
poiAudioBtn.addEventListener("click", () => {
  if (poiAudioEl.paused) poiAudioEl.play().catch((err) => console.warn("Gagal memutar audio:", err));
  else poiAudioEl.pause();
});
poiAudioEl.addEventListener("play", () => {
  poiAudioIcon.textContent = "⏸";
  poiAudioLabel.textContent = T("audioPause");
  bgMusic.volume = BG_MUSIC_VOLUME * 0.3;
});
poiAudioEl.addEventListener("pause", () => {
  poiAudioIcon.textContent = "▶";
  poiAudioLabel.textContent = T("audioPlay");
  bgMusic.volume = BG_MUSIC_VOLUME;
});
poiAudioEl.addEventListener("ended", () => {
  poiAudioIcon.textContent = "▶";
  poiAudioLabel.textContent = T("audioPlay");
});

document.querySelectorAll(".langBtn").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

/* ============================================================
 * Mode peta
 * ============================================================ */
const MAP_CAM = {
  pos: new THREE.Vector3(8.5, 5, 0),
  target: new THREE.Vector3(0, ORBIT_TARGET_Y, 0),
};
const MAP_PIN_Y = 2.0;

const mapGroup = new THREE.Group();
mapGroup.visible = false;
scene.add(mapGroup);

const mapMat = new THREE.MeshLambertMaterial({
  color: 0x5f6b66,
  transparent: true,
  opacity: 0.6,
  depthWrite: false,
  side: THREE.DoubleSide,
});
const mapHoverMat = new THREE.MeshLambertMaterial({
  color: 0xf5f5dc,
  transparent: true,
  opacity: 0.75,
  depthWrite: false,
  side: THREE.DoubleSide,
});

const mapPins = new Map();
let mapHoverId = null;

function renderMapPins() {
  MAP_NODES.forEach((n) => {
    let pin = mapPins.get(n.id);
    if (!pin) {
      pin = document.createElement("button");
      pin.type = "button";
      pin.className = "mapPin";
      pin.innerHTML = '<span class="mapPinDot"></span><span class="mapPinLabel"></span>';
      pin.addEventListener("click", () => transitionFromMap(n.id));
      pin.addEventListener("focus", () => setMapHover(n.id));
      pin.addEventListener("blur", () => setMapHover(null));
      mapPinsLayer.appendChild(pin);
      mapPins.set(n.id, pin);
    }
    pin.querySelector(".mapPinLabel").textContent = tr(n.name);
    pin.setAttribute("aria-label", tr(n.name));
  });
}

function buildMapModels() {
  const src = { siwa: siwaColScene, ...modelById };
  const ids = Object.keys(src).filter((k) => src[k]);
  if (mapGroup.children.length === ids.length) return;
  mapGroup.clear();
  ids.forEach((id, i) => {
    const holder = new THREE.Group();
    holder.userData.phase = i * 1.3;
    holder.userData.id = id;
    holder.userData.meshes = [];
    const c = src[id].clone(true);
    c.traverse((o) => {
      if (!o.isMesh) return;
      o.material = mapMat;
      o.userData.templeId = id;
      if (!o.geometry.boundsTree) o.geometry.computeBoundsTree();
      holder.userData.meshes.push(o);
    });
    holder.add(c);
    mapGroup.add(holder);
  });
}

function setMapHover(id) {
  if (mapHoverId === id) return;
  mapHoverId = id;
  mapGroup.children.forEach((h) => {
    const mat = h.userData.id === id ? mapHoverMat : mapMat;
    h.userData.meshes?.forEach((m) => (m.material = mat));
  });
  mapPins.forEach((pin, pid) => pin.classList.toggle("is-hover", pid === id));
}

const mapRay = new THREE.Raycaster();
mapRay.firstHitOnly = true;
const mapPointer = new THREE.Vector2();
let mapPickT = 0;

window.addEventListener("mousemove", (e) => {
  if (!mapMode || transitionActive || !mapGroup.visible) return;
  const now = performance.now();
  if (now - mapPickT < 50) return; // batasi 20x/detik
  mapPickT = now;
  mapPointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  mapRay.setFromCamera(mapPointer, orbitCam);
  const meshes = mapGroup.children.flatMap((h) => h.userData.meshes || []);
  const hit = mapRay.intersectObjects(meshes, false)[0];
  setMapHover(hit ? hit.object.userData.templeId : null);
});

const _pinV = new THREE.Vector3();
function updateMapPins() {
  orbitCam.updateMatrixWorld();
  for (const n of MAP_NODES) {
    const pin = mapPins.get(n.id);
    const c = GATE_CENTER[n.id];
    if (!pin || !c) continue;
    _pinV.set(c[0], MAP_PIN_Y, c[1]).project(orbitCam);
    pin.style.left = (_pinV.x * 0.5 + 0.5) * innerWidth + "px";
    pin.style.top = (1 - (_pinV.y * 0.5 + 0.5)) * innerHeight + "px";
  }
}

function enterMap() {
  if (transitionActive || isSV) return;
  mapMode = true;
  treeEnvironment.visible = false;
  document.body.classList.add("map-mode");
  mapScreen.classList.remove("hidden");
  entryScreen.classList.add("hidden");
  journeyLayer.classList.add("hidden");
  if (templeModel) templeModel.visible = false;
  extraModels.forEach((m) => (m.visible = false));
  ground.visible = false;
  plaza.visible = false;
  buildMapModels();
  mapGroup.visible = true;
  scene.background = null;
  scene.fog = null;
  freeFlyMode = false;
  activeCamera = orbitCam;
  orbitCam.near = 0.1;
  orbitCam.far = 1000;
  orbitCam.updateProjectionMatrix();
  orbitCam.up.set(0, 1, 0);
  orbitCam.position.copy(MAP_CAM.pos);
  orbitCam.lookAt(MAP_CAM.target);
}

function leaveMap() {
  setMapHover(null);
  mapGroup.visible = false;
  mapMode = false;
  document.body.classList.remove("map-mode");
  mapScreen.classList.add("hidden");
  if (templeModel) templeModel.visible = true;
  extraModels.forEach((m) => (m.visible = true));
  ground.visible = true;
  plaza.visible = true;
  treeEnvironment.visible = true;
  scene.background = ORBIT_BACKGROUND;
  scene.fog = orbitFog;
  activeCamera = orbitCam;
}

function transitionFromMap(id = "siwa") {
  if (!mapMode || transitionActive) return;
  transitionActive = true;
  mapScreen.classList.add("map-transition-out");
  window.setTimeout(() => {
    transitionActive = false;
    mapScreen.classList.remove("map-transition-out");
    leaveMap();
    beginJourney(id);
  }, 550);
}

mapBtn.addEventListener("click", enterMap);
mapBackBtn.addEventListener("click", () => {
  leaveMap();
  goOverview();
  entryScreen.classList.remove("hidden");
  journeyLayer.classList.remove("hidden");
});

/* ============================================================
 * Input
 * ============================================================ */
const K = {};
document.addEventListener("keydown", (e) => {
  K[e.code] = true;
  switch (e.code) {
    case "Escape":
      if (poiOpen) closePOI();
      else if (isSV) exitSV();
      break;
    case "Space":
      if (isSV) {
        P.jumpRequested = true;
        e.preventDefault();
      }
      break;
    case "Home": // reset tampilan mode jelajah
      if (isSV) break;
      startFly(HOME_POS, ORBIT_TARGET);
      showCalibToast("View direset ke posisi awal");
      break;
    case "KeyK": // alat bantu: tampilkan koordinat titik yang dibidik
      pickSurfacePoint();
      break;
  }
});
document.addEventListener("keyup", (e) => (K[e.code] = false));

/* ---------- Mode jelajah: seret mouse untuk melihat ---------- */
canvas.addEventListener("mousedown", (e) => {
  if (!freeFlyMode) return;
  freeFly.dragging = true;
  freeFly.lastX = e.clientX;
  freeFly.lastY = e.clientY;
});
window.addEventListener("mouseup", () => { freeFly.dragging = false; });
window.addEventListener("mousemove", (e) => {
  if (!freeFlyMode || !freeFly.dragging) return;
  const dx = e.clientX - freeFly.lastX;
  const dy = e.clientY - freeFly.lastY;
  freeFly.lastX = e.clientX;
  freeFly.lastY = e.clientY;
  freeFly.yaw -= dx * 0.0025;
  freeFly.pitch = Math.max(-1.5, Math.min(1.5, freeFly.pitch - dy * 0.0025));
});

/* ---------- Street View: seret untuk melihat, klik untuk berjalan ---------- */
const SV_DRAG_CLICK_THRESHOLD = 5;
let svDragging = false, svLastX = 0, svLastY = 0, svDownX = 0, svDownY = 0, svMoved = false;

canvas.addEventListener("mousedown", (e) => {
  if (!isSV || walkTransitionActive || poiOpen) return;
  svDragging = true;
  svMoved = false;
  svLastX = svDownX = e.clientX;
  svLastY = svDownY = e.clientY;
});

window.addEventListener("mousemove", (e) => {
  if (!isSV || walkTransitionActive || poiOpen) {
    arrowHovered = false;
    canvas.style.cursor = "default";
    return;
  }

  updateFloorArrowPointer(e.clientX, e.clientY);
  canvas.style.cursor = arrowHovered ? "pointer" : "default";
  if (!svDragging) return;

  if (Math.hypot(e.clientX - svDownX, e.clientY - svDownY) > SV_DRAG_CLICK_THRESHOLD) svMoved = true;
  P.yaw -= (e.clientX - svLastX) * 0.0022;
  P.pitch = Math.max(-1.3, Math.min(1.3, P.pitch - (e.clientY - svLastY) * 0.0022));
  svLastX = e.clientX;
  svLastY = e.clientY;
});

window.addEventListener("mouseup", (e) => {
  if (!svDragging) return;
  svDragging = false;
  if (!isSV || walkTransitionActive || poiOpen) return;
  if (!svMoved) triggerFloorNavigation(e.clientX, e.clientY);
});

/* ---------- Alat bantu koordinat (tombol K) ---------- */
const poiPickRay = new THREE.Raycaster();
let _toastTimer = null;

function showCalibToast(text) {
  let el = $("calibToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "calibToast";
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function pickSurfacePoint() {
  if (mapMode || transitionActive) return;
  if (!isSV && (!templeModel || !templeModel.visible)) return;

  ensureBVHReady();
  if (!bvhMesh) {
    showCalibToast("Model/BVH belum selesai dimuat — tunggu sebentar lalu coba lagi.");
    return;
  }

  poiPickRay.setFromCamera(new THREE.Vector2(0, 0), isSV ? fpsCam : orbitCam);
  const hit = hitAll(poiPickRay);
  if (hit.length) {
    const pt = hit[0].point;
    const msg = `x:${pt.x.toFixed(3)} y:${pt.y.toFixed(3)} z:${pt.z.toFixed(3)}`;
    console.log(msg);
    showCalibToast(msg);
  } else {
    console.warn("Tidak kena permukaan — arahkan kursor/crosshair ke bagian candi.");
    showCalibToast(
      isSV
        ? "Tidak kena permukaan — arahkan crosshair ke bagian candi."
        : "Tidak kena permukaan — arahkan kursor mouse ke bagian candi.",
    );
  }
}

/* ============================================================
 * Alur perjalanan (masuk / keluar Street View)
 * ============================================================ */
function beginJourney(id = "siwa") {
  if (transitionActive) return;
  freeFlyMode = false;
  ensureBVHReady();
  spawn = computeSpawn(id) || computeSpawn("siwa");
  if (!gsap) {
    enterSV();
    return;
  }
  transitionActive = true;
  isSV = false;
  activeCamera = orbitCam;
  journeyLayer.classList.add("hidden");
  entryScreen.classList.add("hidden");
  journeyTransition.classList.remove("hidden");

  const tNode = MAP_NODES.find((n) => n.id === spawn.id);
  journeyTransition.firstElementChild.textContent = T("journeyEnter") + tr(tNode.name);

  const resolvedSpawn = resolveStreetViewSpawn(spawn.pos);
  const fwd = new THREE.Vector3(-Math.sin(spawn.yaw), 0, -Math.cos(spawn.yaw));
  const finalTarget = resolvedSpawn.clone().addScaledVector(fwd, 1);
  const lookAt = JOURNEY.overview.target.clone();
  orbitCam.position.copy(JOURNEY.overview.position);
  orbitCam.lookAt(lookAt);

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      journeyTransition.classList.add("hidden");
      transitionActive = false;
      enterSV();
    },
  });
  const look = () => orbitCam.lookAt(lookAt);

  if (spawn.id === "siwa") {
    tl.to(orbitCam.position, {
      x: JOURNEY.entrance.position.x, y: JOURNEY.entrance.position.y, z: JOURNEY.entrance.position.z,
      duration: 2.4, onUpdate: look,
    });
    tl.to(lookAt, {
      x: JOURNEY.entrance.target.x, y: JOURNEY.entrance.target.y, z: JOURNEY.entrance.target.z,
      duration: 1.1, onUpdate: look,
    }, "<");
  } else {
    // terbang ke titik di belakang & di atas spawn, sambil memandang candi
    const approach = resolvedSpawn.clone().addScaledVector(fwd, -1.0);
    approach.y += 0.8;
    const templeLook = resolvedSpawn.clone().addScaledVector(fwd, 1.5);
    tl.to(orbitCam.position, {
      x: approach.x, y: approach.y, z: approach.z,
      duration: 2.4, onUpdate: look,
    });
    tl.to(lookAt, {
      x: templeLook.x, y: templeLook.y, z: templeLook.z,
      duration: 1.8, onUpdate: look,
    }, "<");
  }

  tl.to(orbitCam.position, {
    x: resolvedSpawn.x, y: resolvedSpawn.y, z: resolvedSpawn.z,
    duration: 1.5, onUpdate: look,
  });
  tl.to(lookAt, {
    x: finalTarget.x, y: finalTarget.y, z: finalTarget.z,
    duration: 1.4, onUpdate: look,
  }, "<");
}

function enterSV() {
  isSV = true;
  renderHints("sv");
  freeFlyMode = false;
  ensureBVHReady();
  P.pos.copy(resolveStreetViewSpawn(spawn.pos));
  P.footRef = P.pos.y - P.eyeH;
  P.yaw = spawn.yaw;
  P.pitch = 0;
  P.vel.set(0, 0, 0);
  P.onGround = groundY(P.pos) !== null;
  activeCamera = fpsCam;
  floorArrow.visible = true;
  btnSV.classList.add("active");
  btnOrbit.classList.remove("active");
  entryScreen.classList.add("hidden");
  setPixelRatioMax(PR_SV_MAX);
  scene.fog = streetViewFog;
  scene.background = SKY;
}

function exitSV() {
  if (poiOpen) closePOI();
  isSV = false;
  floorArrow.visible = false;
  walkTransitionActive = false;
  activeCamera = orbitCam;
  goOverview();
  btnOrbit.classList.add("active");
  btnSV.classList.remove("active");
  setPixelRatioMax(PR_ORBIT_MAX);
  scene.fog = orbitFog;
  scene.background = ORBIT_BACKGROUND;
}

function stopTourMotion() {
  if (poiOpen) closePOI();
  if (gsap) gsap.killTweensOf([P.pos, P]);
  walkTransitionActive = false;
}

function backToEntry() {
  if (transitionActive || mapMode) return;
  stopTourMotion();
  if (isSV) exitSV();
  else goOverview();
  entryScreen.classList.remove("hidden");
  journeyLayer.classList.remove("hidden");
}

function openMapFromTour() {
  if (transitionActive || mapMode) return;
  stopTourMotion();
  if (isSV) exitSV();
  enterMap();
}

btnSV.addEventListener("click", () => { if (!isSV) beginJourney(); });
btnOrbit.addEventListener("click", exitSV);
$("enterBtn").addEventListener("click", () => beginJourney());
$("btnBack").addEventListener("click", backToEntry);
$("btnMap").addEventListener("click", openMapFromTour);
document.querySelectorAll(".journeyWaypoint").forEach((button) => {
  button.addEventListener("click", () => beginJourney(button.dataset.waypoint));
});

/* ============================================================
 * Update per frame: pemain & kamera jelajah
 * ============================================================ */
const _f = new THREE.Vector3(), _r = new THREE.Vector3(), _mv = new THREE.Vector3();

function updatePlayer(dt) {
  if (!isSV || poiOpen || walkTransitionActive) return;
  dt = Math.min(dt, 0.05);
  const running = K.ShiftLeft || K.ShiftRight;
  const spd = running ? P.runSpd : P.walkSpd;
  _mv.set(0, 0, 0);
  if (K.KeyW) {
    _f.set(Math.sin(P.yaw), 0, Math.cos(P.yaw));
    _mv.addScaledVector(_f, -spd * dt);
  }
  if (K.KeyS) {
    _f.set(Math.sin(P.yaw), 0, Math.cos(P.yaw));
    _mv.addScaledVector(_f, spd * dt);
  }
  if (K.KeyA) {
    _r.set(Math.cos(P.yaw), 0, -Math.sin(P.yaw));
    _mv.addScaledVector(_r, -spd * dt);
  }
  if (K.KeyD) {
    _r.set(Math.cos(P.yaw), 0, -Math.sin(P.yaw));
    _mv.addScaledVector(_r, spd * dt);
  }

  if (_mv.lengthSq() > 0) {
    const { bx, bz } = isInsideTempleDoorway(P.pos) ? { bx: false, bz: false } : wallBlocked(P.pos, _mv.x, _mv.z);
    if (!bx && !blockedByTemple(P.pos.x + _mv.x, P.pos.z)) P.pos.x += _mv.x;
    if (!bz && !blockedByTemple(P.pos.x, P.pos.z + _mv.z)) P.pos.z += _mv.z;
  }

  if (!P.onGround) P.vel.y -= P.gravity * dt;
  P.vel.y = Math.max(P.vel.y, -8.0);
  P.pos.y += P.vel.y * dt;

  P.onGround = false;
  const fy = groundY(P.pos);
  if (fy !== null && P.pos.y <= fy + P.eyeH + 0.002) {
    const targetY = fy + P.eyeH;
    const maxRise = 0.6 * dt;
    const dy = targetY - P.pos.y;
    P.pos.y += Math.abs(dy) > maxRise ? Math.sign(dy) * maxRise : dy;
    P.vel.y = 0;
    P.onGround = true;
    P.footRef = fy;
  } else if (P.pos.y < -5) {
    P.pos.copy(resolveStreetViewSpawn(spawn.pos));
    P.vel.y = 0;
    P.onGround = true;
  }

  if (P.jumpRequested) {
    P.jumpRequested = false;
    if (P.onGround) {
      P.vel.y = P.jumpVel;
      P.pos.y += 0.01;
      P.onGround = false;
    }
  }

  if (_mv.lengthSq() > 0 && P.onGround) {
    P.bobPhase = (P.bobPhase + (running ? 12 : 6) * dt) % (Math.PI * 2);
    P.bobY = Math.sin(P.bobPhase) * 0.004;
  } else {
    P.bobY *= 0.8;
  }

  P.pos.x = Math.max(-50, Math.min(50, P.pos.x));
  P.pos.z = Math.max(-50, Math.min(50, P.pos.z));
  syncFirstPersonCamera();
}

const FLY_RADIUS = 0.12;
const FLY_SPEED = 0.8;
const FLY_SPEED_FAST = 2.0;
const _flyDir = new THREE.Vector3(), _flyRight = new THREE.Vector3(), _flyMove = new THREE.Vector3();
const _flyTry = new THREE.Vector3();
const _cp = { point: new THREE.Vector3(), distance: 0, faceIndex: 0 };

function surfaceDist(p, maxD) {
  let best = Infinity;
  for (const m of allColliders()) {
    const bt = m.geometry.boundsTree;
    if (!bt) continue;
    const r = bt.closestPointToPoint(p, _cp, 0, maxD);
    if (r && r.distance < best) best = r.distance;
  }
  return best;
}

function updateFreeFly(dt) {
  if (!freeFlyMode) return;
  ensureBVHReady();

  orbitCam.up.set(0, 1, 0);
  orbitCam.rotation.set(freeFly.pitch, freeFly.yaw, 0, "YXZ");
  orbitCam.getWorldDirection(_flyDir);
  _flyRight.crossVectors(_flyDir, orbitCam.up).normalize();

  const speed = poiOpen ? 0 : (K.ShiftLeft || K.ShiftRight ? FLY_SPEED_FAST : FLY_SPEED) * dt;
  _flyMove.set(0, 0, 0);
  if (K.KeyW) _flyMove.addScaledVector(_flyDir, speed);
  if (K.KeyS) _flyMove.addScaledVector(_flyDir, -speed);
  if (K.KeyA) _flyMove.addScaledVector(_flyRight, -speed);
  if (K.KeyD) _flyMove.addScaledVector(_flyRight, speed);
  if (K.KeyE) _flyMove.y += speed * 0.6;
  if (K.KeyQ) _flyMove.y -= speed * 0.6;

  for (const axis of ["x", "y", "z"]) {
    const d = _flyMove[axis];
    if (d === 0) continue;
    if (bvhMesh) {
      _flyTry.copy(orbitCam.position);
      _flyTry[axis] += d;
      const nd = surfaceDist(_flyTry, FLY_RADIUS);
      if (nd < FLY_RADIUS && nd < surfaceDist(orbitCam.position, FLY_RADIUS)) continue;
    }
    orbitCam.position[axis] += d;
  }
  orbitCam.position.y = Math.max(0.05, orbitCam.position.y);
}

/* ============================================================
 * Minimap
 * ============================================================ */
const MM_W = 280;
const MM_BG = "rgba(107, 79, 59, 0.15)";
const MM_SVG_W = 1080;
const MM_SVG_PX = 145; // piksel SVG per satuan dunia
const MM_ADJ = { x: 4, y: 13 };
const MM_TEMPLE_ADJ = {
  siwa:   { x: 5,   y: -13 },
  brahma: { x: -3,  y: -33 },
  wisnu:  { x: -3,  y: 5 },
  nandi:  { x: -30, y: -13 },
  garuda: { x: -30, y: 5 },
  angsa:  { x: -30, y: -35 },
};
const MM_ORIGIN = { x: 296, y: 672 };
const MM_K = MM_W / MM_SVG_W;
const MM_RES = 2;
const MM_PAD = 14;

const _mmDir = new THREE.Vector3();
const mmClamp = (v, a, b) => Math.max(a, Math.min(b, v));

let minimapLayer = null;
const minimapImg = new Image();
minimapImg.onload = () => {
  minimapLayer = document.createElement("canvas");
  minimapLayer.width = mmCanvas.width * MM_RES;
  minimapLayer.height = mmCanvas.height * MM_RES;
  minimapLayer.getContext("2d").drawImage(minimapImg, 0, 0, minimapLayer.width, minimapLayer.height);
};
minimapImg.src = "./assets/minimap_fiks.svg";

function worldToCanvas(wx, wz, id = null) {
  const t = MM_TEMPLE_ADJ[id] || { x: 0, y: 0 };
  return {
    x: (MM_ORIGIN.x + wx * MM_SVG_PX) * MM_K + MM_ADJ.x + t.x,
    y: (MM_ORIGIN.y + wz * MM_SVG_PX) * MM_K + MM_ADJ.y + t.y,
  };
}

function nearestTempleId(x, z) {
  let best = "siwa", bd = Infinity;
  for (const [id, c] of Object.entries(GATE_CENTER)) {
    const d = Math.hypot(x - c[0], z - c[1]);
    if (d < bd) { bd = d; best = id; }
  }
  return best;
}

function drawMinimap() {
  const width = mmCanvas.width, height = mmCanvas.height;

  let camX, camZ, camYaw;
  if (isSV) {
    camX = P.pos.x; camZ = P.pos.z; camYaw = P.yaw;
  } else {
    orbitCam.getWorldDirection(_mmDir);
    camX = orbitCam.position.x; camZ = orbitCam.position.z;
    camYaw = Math.atan2(-_mmDir.x, -_mmDir.z);
  }

  mmCtx.clearRect(0, 0, width, height);
  mmCtx.fillStyle = MM_BG;
  mmCtx.fillRect(0, 0, width, height);
  if (minimapLayer) mmCtx.drawImage(minimapLayer, 0, 0, width, height);

  // semua candi selalu tampil (termasuk yang sedang dijelajahi)
  mmCtx.font = "600 11px 'Instrument Sans', sans-serif";
  mmCtx.textAlign = "center";
  mmCtx.textBaseline = "middle";
  mmCtx.lineJoin = "round";
  for (const node of MAP_NODES) {
    const c = GATE_CENTER[node.id];
    if (!c) continue;
    const p = worldToCanvas(c[0], c[1], node.id);
    mmCtx.beginPath();
    mmCtx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    mmCtx.fillStyle = "rgba(31,41,55,0.55)";
    mmCtx.fill();
    mmCtx.lineWidth = 3;
    mmCtx.strokeStyle = "rgba(255,255,255,0.85)";
    mmCtx.strokeText(tr(node.name), p.x, p.y - 8);
    mmCtx.fillStyle = "#1f2937";
    mmCtx.fillText(tr(node.name), p.x, p.y - 8);
  }

  // hotspot candi yang sedang dijelajahi
  if (isSV) {
    (POIS_BY_TEMPLE[spawn.id] || []).forEach((poi) => {
      const p = worldToCanvas(poi.pos.x, poi.pos.z, spawn.id);
      const isMain = !poi.id.startsWith("panel_");
      mmCtx.beginPath();
      mmCtx.arc(p.x, p.y, isMain ? 4 : 2.5, 0, Math.PI * 2);
      mmCtx.fillStyle = isMain ? "#c9a24a" : "#2d7d5a";
      mmCtx.fill();
      mmCtx.lineWidth = 1;
      mmCtx.strokeStyle = "#fff";
      mmCtx.stroke();
    });
  }

  // posisi & arah pemain
  const pp = worldToCanvas(camX, camZ, isSV ? spawn.id : nearestTempleId(camX, camZ));
  pp.x = mmClamp(pp.x, MM_PAD, width - MM_PAD);
  pp.y = mmClamp(pp.y, MM_PAD, height - MM_PAD);

  const fovAngle = Math.atan2(-Math.cos(camYaw), -Math.sin(camYaw));
  mmCtx.save();
  mmCtx.translate(pp.x, pp.y);
  mmCtx.rotate(fovAngle);
  mmCtx.beginPath();
  mmCtx.moveTo(0, 0);
  mmCtx.arc(0, 0, 30, -0.42, 0.42);
  mmCtx.closePath();
  mmCtx.fillStyle = "rgba(45,125,90,0.55)";
  mmCtx.fill();
  mmCtx.restore();

  mmCtx.save();
  mmCtx.translate(pp.x, pp.y);
  mmCtx.rotate(-camYaw);
  mmCtx.beginPath();
  mmCtx.moveTo(0, -10); mmCtx.lineTo(8, 6); mmCtx.lineTo(0, 2); mmCtx.lineTo(-8, 6);
  mmCtx.closePath();
  mmCtx.fillStyle = "#e53935";
  mmCtx.fill();
  mmCtx.restore();
}

// klik minimap -> koordinat dunia (kebalikan worldToCanvas)
function minimapWorldPoint(clientX, clientY) {
  const rect = mmCanvas.getBoundingClientRect();
  const t = (isSV && MM_TEMPLE_ADJ[spawn.id]) || { x: 0, y: 0 };
  const px = (clientX - rect.left) * (mmCanvas.width / rect.width) - MM_ADJ.x - t.x;
  const py = (clientY - rect.top) * (mmCanvas.height / rect.height) - MM_ADJ.y - t.y;
  return {
    x: (px / MM_K - MM_ORIGIN.x) / MM_SVG_PX,
    z: (py / MM_K - MM_ORIGIN.y) / MM_SVG_PX,
  };
}

mmCanvas.addEventListener("click", (e) => {
  if (!isSV || walkTransitionActive) return;
  const point = minimapWorldPoint(e.clientX, e.clientY);
  const footY = P.pos.y - P.eyeH;

  // tujuan terdekat: waypoint, atau hotspot candi bila lebih dekat
  const wp = WALK_WAYPOINTS[0].position;
  let dest = wp;
  let nearestDist = Math.hypot(point.x - wp.x, point.z - wp.z);
  let nearestPOI = null;
  for (const poi of POIS_BY_TEMPLE[spawn.id] || []) {
    const d = Math.hypot(point.x - poi.pos.x, point.z - poi.pos.z);
    if (d < nearestDist) {
      nearestDist = d;
      nearestPOI = poi;
      dest = new THREE.Vector3(poi.pos.x, footY, poi.pos.z);
    }
  }
  if (nearestDist > 0.8) {
    nearestPOI = null;
    dest = new THREE.Vector3(point.x, footY, point.z);
  }

  e.stopPropagation();
  moveToFloorPoint(dest, {
    usePath: true,
    onComplete: nearestPOI ? () => openPOI(nearestPOI) : null,
  });
});

/* ============================================================
 * Memuat model: loader glTF & sistem chunk
 * ============================================================ */
const draco = new DRACOLoader();
draco.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/");
draco.setDecoderConfig({ type: "js" });
const ktx2 = new KTX2Loader()
  .setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/")
  .detectSupport(renderer);
const loader = new GLTFLoader();
loader.setDRACOLoader(draco);
loader.setKTX2Loader(ktx2);
loader.setMeshoptDecoder(MeshoptDecoder);

const CHUNK_BASE = "assets/chunks/"; // tiap candi: assets/chunks/<id>/
const LOAD_DIST = 10;
const UNLOAD_DIST = 14;
const MAX_PARALLEL = 2;
const chunkSets = [];

async function createChunkSet(dir, name) {
  const manifest = await (await fetch(dir + "manifest.json")).json();
  const root = new THREE.Group();
  root.name = name;
  const set = { dir, manifest, root, chunks: [], loading: 0 };
  chunkSets.push(set);
  return set;
}

function finalizeChunkSet(set) {
  set.root.updateMatrixWorld(true);
  const s = set.root.scale.x;
  set.chunks = set.manifest.chunks.map((c) => ({
    ...c,
    state: "idle",
    object: null,
    center: new THREE.Vector3(...c.center_three).applyMatrix4(set.root.matrixWorld),
    radius: c.radius_three * s,
  }));
}

async function initSiwaChunks() {
  const set = await createChunkSet(`${CHUNK_BASE}siwa/`, "siwa-chunks");
  const { min, max } = set.manifest.full_bbox_three;
  const sf = 4.7 / (max[1] - min[1]);
  set.root.scale.setScalar(sf);
  set.root.position.set(
    -sf * (min[0] + max[0]) / 2,
    -sf * min[1],
    -sf * (min[2] + max[2]) / 2,
  );
  finalizeChunkSet(set);
  return set;
}

// ref = model collision yang sudah diposisikan (lihat addTempleCollision)
async function attachTempleChunks(id, ref) {
  try {
    const set = await createChunkSet(`${CHUNK_BASE}${id}/`, `${id}-chunks`);
    set.root.scale.copy(ref.scale);
    set.root.position.copy(ref.position);
    set.root.rotation.copy(ref.rotation);
    finalizeChunkSet(set);
    set.root.visible = !mapMode;
    scene.add(set.root);
    extraModels.push(set.root);
  } catch (e) {
    console.error("Gagal menyiapkan chunk", id, e);
  }
}

function disposeObject(root) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.geometry.dispose();
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      for (const k in m) if (m[k]?.isTexture) m[k].dispose();
      m.dispose();
    });
  });
}

async function loadChunk(set, c) {
  c.state = "loading";
  set.loading++;
  try {
    const gltf = await loader.loadAsync(set.dir + c.file);
    gltf.scene.traverse((o) => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        m.side = THREE.DoubleSide;
        if (!m.map && m.color) m.color.set(0xb5b5b7);
      });
    });
    c.object = gltf.scene;
    set.root.add(c.object);
    c.state = "loaded";
  } catch (e) {
    console.error("Gagal memuat chunk", c.file, e);
    c.state = "failed";
  } finally {
    set.loading--;
  }
}

function updateChunks(camPos) {
  for (const set of chunkSets) {
    for (const c of set.chunks) {
      const d = Math.max(0, camPos.distanceTo(c.center) - c.radius);
      if (c.state === "idle" && d < LOAD_DIST && set.loading < MAX_PARALLEL) loadChunk(set, c);
      else if (c.state === "loaded" && d > UNLOAD_DIST) {
        set.root.remove(c.object);
        disposeObject(c.object);
        c.object = null;
        c.state = "idle";
      }
    }
  }
}
setInterval(() => updateChunks(activeCamera.position), 500);

// Gabungkan semua mesh collision menjadi satu geometri (posisi + index) untuk BVH
function mergeCollisionGeometries(geometries) {
  const vertexCount = geometries.reduce((n, g) => n + g.attributes.position.count, 0);
  const indexCount = geometries.reduce((n, g) => n + (g.index ? g.index.count : g.attributes.position.count), 0);
  const positions = new Float32Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vOffset = 0;
  let iOffset = 0;
  for (const g of geometries) {
    const position = g.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const o = (vOffset + i) * 3;
      positions[o] = position.getX(i);
      positions[o + 1] = position.getY(i);
      positions[o + 2] = position.getZ(i);
    }
    const count = g.index ? g.index.count : position.count;
    for (let i = 0; i < count; i++) {
      indices[iOffset + i] = (g.index ? g.index.getX(i) : i) + vOffset;
    }
    vOffset += position.count;
    iOffset += count;
    g.dispose();
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  merged.setIndex(new THREE.BufferAttribute(indices, 1));
  return merged;
}

// Candi Siwa: chunk visual + collision
(async () => {
  try {
    const siwaSet = await initSiwaChunks();
    stageTxt.textContent = T("stageScaling");

    const model = siwaSet.root;
    templeModel = model;
    scene.add(model);

    const cgltf = await loader.loadAsync("assets/model/siwa_collision.glb");
    const colModel = cgltf.scene;
    colModel.scale.copy(model.scale);
    colModel.position.copy(model.position);
    colModel.updateMatrixWorld(true);
    siwaColScene = colModel;

    const collisionGeometries = [];
    colModel.traverse((o) => {
      if (!o.isMesh) return;
      const geometry = o.geometry.clone();
      geometry.applyMatrix4(o.matrixWorld);
      collisionGeometries.push(geometry);
    });
    if (!collisionGeometries.length) {
      errBox.style.display = "block";
      errBox.textContent = "Geometry error";
      return;
    }

    const rawGeo = mergeCollisionGeometries(collisionGeometries);
    rawGeo.computeBoundingBox();
    rawGeoRef = rawGeo;

    stageTxt.textContent = "";

    const showEntry = () => {
      entryScreen.classList.remove("hidden");
      journeyLayer.classList.remove("hidden");
      goOverview();
    };
    window.__modelReady = true;
    if (window.__loaderDone) showEntry();
    else window.addEventListener("loader-done", showEntry, { once: true });
  } catch (e) {
    console.error(e);
    errBox.style.display = "block";
    errBox.textContent = "Error: " + e.message;
    stageTxt.textContent = T("loadError");
  }
})();

// Candi lain: collision (+ chunk visual)
function bodyCenter(m, box) {
  const h = box.max.y - box.min.y;
  const y0 = box.min.y + h * 0.3;
  const y1 = box.min.y + h * 0.5;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  const v = new THREE.Vector3();
  m.traverse((o) => {
    if (!o.isMesh) return;
    const p = o.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
      if (v.y < y0 || v.y > y1) continue;
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.z < minZ) minZ = v.z;
      if (v.z > maxZ) maxZ = v.z;
    }
  });
  if (minX === Infinity) return box.getCenter(new THREE.Vector3());
  return { x: (minX + maxX) / 2, z: (minZ + maxZ) / 2 };
}

function addTempleCollision(id) {
  const url = `assets/model/${id}_collision.glb`;
  loader.load(url, (gltf) => {
    const m = gltf.scene;
    m.scale.setScalar(0.1);
    m.updateMatrixWorld(true);

    const center = TEMPLE_CENTERS[id];
    const b = new THREE.Box3().setFromObject(m);
    const c = bodyCenter(m, b);
    m.position.x += center[0] - c.x;
    m.position.z += center[1] - c.z;
    m.position.y -= b.min.y;
    m.updateMatrixWorld(true);

    modelById[id] = m;

    m.traverse((o) => {
      if (!o.isMesh) return;
      const g = o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      g.computeBoundsTree();
      const col = new THREE.Mesh(g, colliderMaterial);
      col.matrixAutoUpdate = false;
      scene.add(col);
      extraColliders.push(col);
    });

    attachTempleChunks(id, m);
  }, undefined, (err) => console.error("Gagal memuat", url, err));
}
Object.keys(TEMPLE_CENTERS).forEach(addTempleCollision);

/* ============================================================
 * Loop render & inisialisasi
 * ============================================================ */
const clock = new THREE.Clock();
let frame = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const slowTick = frame++ % 3 === 0;

  updateFreeFly(dt);
  updatePlayer(dt);
  if (slowTick) {
    updatePOIs();
    updateGateDots();
  }
  updateJourneyWaypoints();

  if (mapMode) {
    const t = performance.now() / 1000;
    mapGroup.children.forEach((h) => {
      h.position.y = Math.sin(t * 0.5 + h.userData.phase) * 0.1; // mengambang pelan
    });
    updateMapPins();
  }

  updateFloorArrowTarget();
  if (floorArrow.visible) {
    const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.07 + (arrowHovered ? 0.08 : 0);
    floorArrow.scale.set(pulse, pulse, pulse);
    floorArrow.material.opacity = arrowHovered ? 1 : 0.9;
  }
  if (slowTick) drawMinimap();

  renderer.render(scene, activeCamera);
}

bgMusic.volume = BG_MUSIC_VOLUME;
function startBackgroundMusic() {
  if (!bgMusic.paused) return;
  bgMusic.play().catch(() => {});
}
startBackgroundMusic();
["pointerdown", "keydown", "touchstart"].forEach((evt) => {
  window.addEventListener(evt, startBackgroundMusic, { once: true, passive: true });
});

window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  orbitCam.aspect = fpsCam.aspect = innerWidth / innerHeight;
  orbitCam.updateProjectionMatrix();
  fpsCam.updateProjectionMatrix();
});

animate();

let savedLang = "id";
try { savedLang = localStorage.getItem("candiSiwaLang") || "id"; } catch {}
applyLanguage(savedLang);

// judul layar masuk bergantian: Latin <-> aksara Jawa
const entryTitleWords = document.querySelectorAll(".entry-title-word");
let entryTitleIndex = 0;
if (entryTitleWords.length > 1) {
  window.setInterval(() => {
    entryTitleWords[entryTitleIndex].classList.remove("active");
    entryTitleIndex = (entryTitleIndex + 1) % entryTitleWords.length;
    entryTitleWords[entryTitleIndex].classList.add("active");
  }, 3000);
}
