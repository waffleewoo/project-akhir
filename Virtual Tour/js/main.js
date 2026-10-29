import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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

const DEBUG = false;
const canvas = document.getElementById("c");
const stageTxt = document.getElementById("stageTxt");
const errBox = document.getElementById("errBox");
const entrySc = document.getElementById("entryScreen");
const joystick = document.getElementById("joystick");
const joystickKnob = document.getElementById("joystickKnob");
const btnSV = document.getElementById("btnSV");
const btnOrb = document.getElementById("btnOrbit");
const fpsEl = document.getElementById("fpsBox");
const poiLayer = document.getElementById("poiLayer");
const poiModal = document.getElementById("poiModal");
const poiClose = document.getElementById("poiClose");
const poiImgEl = document.getElementById("popup-img");
const poiImgFrame = document.getElementById("poiImgFrame");
const poiDirEl = document.getElementById("poiDir");
const poiTitleEl = document.getElementById("poiTitle");
const poiDescEl = document.getElementById("poiDesc");
const poiAudioEl = document.getElementById("poiAudio");
const poiAudioBtn = document.getElementById("poiAudioBtn");
const poiAudioIcon = document.getElementById("poiAudioIcon");
const poiAudioLabel = document.getElementById("poiAudioLabel");
const bgMusic = document.getElementById("bgMusic");
const BG_MUSIC_VOLUME = 0.15;
const journeyLayer = document.getElementById("journeyLayer");
const journeyTransition = document.getElementById("journeyTransition");
const mapSvg = document.getElementById("mapSvg");
const templeDialog = document.getElementById("templeDialog");
const templeDialogBackdrop = document.getElementById("templeDialogBackdrop");
const templeDialogClose = document.getElementById("templeDialogClose");
const templeDialogKicker = document.getElementById("templeDialogKicker");
const templeDialogTitle = document.getElementById("templeDialogTitle");
const templeDialogDesc = document.getElementById("templeDialogDesc");
const templeDialogFacts = document.getElementById("templeDialogFacts");
const mapScreen = document.getElementById("mapScreen");
const mapLabels = document.getElementById("mapLabels");
const mapBtn = document.getElementById("mapBtn");
const mapBackBtn = document.getElementById("mapBackBtn");
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
let hintMode = "fly";
let currentLang = "id";
const I18N = {
  id: {
    loadBrand: "CANDI SIWA · VIRTUAL HERITAGE",
    loadSubtitle: "Virtual Heritage · Prambanan",
    loadLocation: "PRAMBANAN",
    loadInit: "Menginisialisasi...",
    loadModel: "Memuat model...",
    loadHeadphones: "Gunakan headphone untuk pengalaman terbaik",
    loadWebgl: "Eksperimen virtual heritage · WebGL",
    stageScaling: "⚙ Scaling...",
    stageBVH: "⚙ Membangun BVH (pohon collision)...",
    stageChunks: "⚙ Membangun chunk visual...",
    loadError: "Error!",
    entryTitle: "CANDI PRAMBANAN",
    entrySubtitle: "IKUTI JEJAK MENUJU CANDI PRAMBANAN",
    entryCredit: "Warisan budaya · Tur virtual interaktif",
    entryCopyright: "© Candi Prambanan",
    entryButton: "Mulai Perjalanan",
    mapButton: "Lihat Peta",
    transitionLabel: "Memasuki Candi Prambanan",
    waypointEntrance: "Pintu masuk",
    waypointInterior: "Ruang dalam",
    topbarTitle: "Candi Prambanan",
    topbarLocation: "Sleman, D.I Yogyakarta",
    btnSV: "Street View",
    btnOrbit: "Jelajah",
    hintWalk: "Berjalan",
    hintLook: "Melihat",
    hintRun: "Berlari",
    hintKeyFloor: "Klik Lantai",
    hintJump: "Lompat",
    hintExit: "Keluar mode",
    poiImgEmpty: "Gambar arca belum tersedia",
    flyOn: "Mode jelajah aktif — WASD gerak, seret mouse untuk arah, Q/E naik-turun",
    flyOff: "Mode jelajah nonaktif",
    hintFly: "Terbang",
    hintUpDown: "Naik / turun",
    hintFast: "Terbang cepat",
    hintClickFloor: "Jalan ke titik",
    mapKicker: "PRAMBANAN",
    mapTagline: "Jelajahi sudut-sudut Prambanan",
    mapBack: "← Kembali",
    navBack: "Kembali",
    navMap: "Peta",
    panelKicker: "PANDUAN EKSPLORASI",
    panelTitle: "Temukan setiap candi",
    panelDesc: "Arahkan kursor pada model untuk melihat nama candi. Klik titik untuk memasuki tur virtual.",
    panelLegend: "Hotspot interaktif",
  },
  en: {
    loadBrand: "CANDI SIWA · VIRTUAL HERITAGE",
    loadSubtitle: "Virtual Heritage · Prambanan",
    loadLocation: "PRAMBANAN · CENTRAL JAVA",
    loadInit: "Initializing...",
    loadModel: "Loading model...",
    loadHeadphones: "Put on your headphones for the best experience",
    loadWebgl: "Virtual heritage experiment · WebGL",
    stageScaling: "⚙ Scaling...",
    stageBVH: "⚙ Building BVH (collision tree)...",
    stageChunks: "⚙ Building visual chunks...",
    loadError: "Error!",
    entryTitle: "PRAMBANAN TEMPLE",
    entrySubtitle: "FOLLOW THE PATH THROUGH PRAMBANAN TEMPLE",
    entryCredit: "Cultural heritage · Interactive virtual tour",
    entryCopyright: "© Prambanan Temple",
    entryButton: "Begin Journey",
    mapButton: "View Map",
    transitionLabel: "Entering Prambanan Temple",
    waypointEntrance: "Temple entrance",
    waypointInterior: "Interior corridor",
    topbarTitle: "Prambanan Temple",
    topbarLocation: "Sleman, D.I Yogyakarta",
    btnSV: "Street View",
    btnOrbit: "Explore",
    hintWalk: "Walk",
    hintLook: "Look",
    hintRun: "Run",
    hintKeyFloor: "Click Floor",
    hintJump: "Jump",
    hintExit: "Exit mode",
    poiImgEmpty: "Statue image not yet available",
    flyOn: "Free-fly on — WASD to move, drag to look, Q/E up/down",
    flyOff: "Free-fly off",
    hintFly: "Fly",
    hintUpDown: "Up / down",
    hintFast: "Fast fly",
    hintClickFloor: "Walk to spot",
    mapKicker: "PRAMBANAN · CENTRAL JAVA",
    mapTagline: "Explore the corners of Prambanan.",
    mapBack: "← Back",
    navBack: "Back",
    navMap: "Map",
    panelKicker: "EXPLORATION GUIDE",
    panelTitle: "Discover every temple",
    panelDesc: "Hover over a model to see the temple's name. Click a dot to enter the virtual tour.",
    panelLegend: "Interactive hotspot",
  },
};

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
  });
  document.querySelectorAll(".langBtn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  poiImgFrame.dataset.emptyText = I18N[lang].poiImgEmpty;
  try { localStorage.setItem("candiSiwaLang", lang); } catch {}
  refreshDotLabels();
  if (poiOpen && activePOIRef) refreshPOIText(activePOIRef);
  renderComplexMap();
  if (templeDialog.dataset.openId) {
    const n = MAP_NODES.find((x) => x.id === templeDialog.dataset.openId);
    if (n) openTempleDialog(n);
  }
  renderHints();
}

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
document.body.classList.toggle("is-mobile", isMobile);
const PR_ORBIT_MAX = isMobile ? 1.25 : 2;
const PR_SV_MAX = isMobile ? 0.75 : 1.0;

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
renderer.setPixelRatio(Math.min(devicePixelRatio, PR_ORBIT_MAX));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1.0;

const SKY = new THREE.Color(0xaebccb);
const ORBIT_BACKGROUND = new THREE.Color(0xe8e2d9);
const scene = new THREE.Scene();
scene.background = ORBIT_BACKGROUND;
const FOG_NEAR_SV = 14;
const FOG_FAR_SV = 45;
const FOG_NEAR_ORBIT = 30;
const FOG_FAR_ORBIT = 120;
const orbitFog = new THREE.FogExp2(0xe8e2d9, 0.004);
const streetViewFog = new THREE.Fog(SKY, FOG_NEAR_SV, FOG_FAR_SV);
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

const TREE_COUNT = 60;
const TREE_INNER_RADIUS = 8;
const TREE_OUTER_RADIUS = 32;
const TREE_PATH_HALF_WIDTH = 3.2;
const TREE_VARIANTS = 3;
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
  return treeEnvironment;
}

generateEnvironmentTrees();

const orbitCam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
orbitCam.near = 0.1;
orbitCam.far = 1000;
orbitCam.position.set(8, 5, 12);
const dedicatedOrbit = new OrbitControls(orbitCam, canvas);
dedicatedOrbit.enableDamping = true;
dedicatedOrbit.dampingFactor = 0.075;
dedicatedOrbit.enablePan = DEBUG;
dedicatedOrbit.screenSpacePanning = true;
dedicatedOrbit.panSpeed = 1.1;
dedicatedOrbit.maxDistance = 28;
dedicatedOrbit.minPolarAngle = 0.42;
dedicatedOrbit.maxPolarAngle = 1.38;
dedicatedOrbit.target.set(0, 1.5, 0);

const fpsCam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.01, 100);
fpsCam.near = 0.01;
fpsCam.far = 100;
scene.add(fpsCam);

let activeCamera = orbitCam;
let isSV = false,
  transitionActive = false,
  mapMode = false;

const orb = { theta: -0.8, phi: 1.0, r: 12, tx: 0, ty: 2, tz: 0, drag: false, lx: 0, ly: 0 };

let freeFlyMode = false;
const freeFly = { yaw: 0, pitch: 0, dragging: false, lastX: 0, lastY: 0 };

function startFly(pos, target) {
  orbitCam.near = 0.03;
  orbitCam.far = 300;
  orbitCam.updateProjectionMatrix();
  if (pos) orbitCam.position.copy(pos);
  if (target) { orbitCam.up.set(0, 1, 0); orbitCam.lookAt(target); }
  const e = new THREE.Euler().setFromQuaternion(orbitCam.quaternion, "YXZ");
  freeFly.yaw = e.y;
  freeFly.pitch = e.x;
  freeFlyMode = true;
  dedicatedOrbit.enabled = false;
  renderHints("fly");
}

document.addEventListener("keydown", (e) => {
  if (e.code !== "Home" || isSV) return;
  orb.theta = -0.8; orb.phi = 1.0; orb.r = 12;
  orb.tx = 0; orb.ty = 4.7 * 0.35; orb.tz = 0;
  const resetPos = new THREE.Vector3(
    orb.tx + orb.r * Math.sin(orb.phi) * Math.sin(orb.theta),
    orb.ty + orb.r * Math.cos(orb.phi),
    orb.tz + orb.r * Math.sin(orb.phi) * Math.cos(orb.theta),
  );
  startFly(resetPos, new THREE.Vector3(orb.tx, orb.ty, orb.tz));
  showCalibToast("View direset ke posisi awal");
});

function updateOrbit() {
  if (dedicatedOrbit) {
    dedicatedOrbit.target.set(orb.tx, orb.ty, orb.tz);
    dedicatedOrbit.update();
    return;
  }
  orbitCam.position.set(orb.tx + orb.r * Math.sin(orb.phi) * Math.sin(orb.theta), orb.ty + orb.r * Math.cos(orb.phi), orb.tz + orb.r * Math.sin(orb.phi) * Math.cos(orb.theta));
  orbitCam.lookAt(orb.tx, orb.ty, orb.tz);
}
updateOrbit();

function levelOrbitCamera(position, target) {
  orbitCam.up.set(0, 1, 0);
  orbitCam.rotation.set(0, 0, 0);
  if (position) orbitCam.position.copy(position);
  orbitCam.lookAt(target.x ?? target[0], target.y ?? target[1], target.z ?? target[2]);
  dedicatedOrbit.target.set(target.x ?? target[0], target.y ?? target[1], target.z ?? target[2]);
  dedicatedOrbit.update();
}

const MAP_W = 1600, MAP_H = 900;
const tr = (v) => (typeof v === "string" ? v : v[currentLang]);
const mapPx = (p) => (p / 100) * MAP_W;
const mapPy = (p) => (p / 100) * MAP_H;


const mapPins = new Map();
function renderComplexMap() {
  mapSvg.innerHTML = "";
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
      mapLabels.appendChild(pin);
      mapPins.set(n.id, pin);
    }
    pin.querySelector(".mapPinLabel").textContent = tr(n.name);
    pin.setAttribute("aria-label", tr(n.name));
  });
}

function openTempleDialog(node) {
  templeDialog.dataset.openId = node.id;
  templeDialogKicker.textContent = tr(node.subtitle);
  templeDialogTitle.textContent = tr(node.name);
  templeDialogDesc.textContent = tr(node.desc);
  templeDialogFacts.innerHTML = node.facts.map((f) => `<div><dt>${tr(f.k)}</dt><dd>${tr(f.v)}</dd></div>`).join("");
  templeDialogBackdrop.classList.remove("hidden");
  templeDialog.classList.remove("hidden");
}
function closeTempleDialog() {
  templeDialog.dataset.openId = "";
  templeDialogBackdrop.classList.add("hidden");
  templeDialog.classList.add("hidden");
}
templeDialogClose.addEventListener("click", closeTempleDialog);
templeDialogBackdrop.addEventListener("click", closeTempleDialog);

let siwaColScene = null;
const MAP_BG = new THREE.Color(0xf3efe3); // sama dengan loader
const MAP_CAM = {
  pos: new THREE.Vector3(8.5, 5, 0),
  target: new THREE.Vector3(0, 4.7 * 0.35, 0),
};
const mapGroup = new THREE.Group();
mapGroup.visible = false;
scene.add(mapGroup);
const mapMat = new THREE.MeshLambertMaterial({
  color: 0x5f6b66,   // coklat tua
  transparent: true,
  opacity: 0.6,      // dinaikkan agar coklat tidak pucat di background krem
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
      if (o.isMesh) {
        o.material = mapMat;
        o.userData.templeId = id;                                   // TAMBAHKAN
        if (!o.geometry.boundsTree) o.geometry.computeBoundsTree(); // TAMBAHKAN
        holder.userData.meshes.push(o);
      }
    });
    holder.add(c);
    mapGroup.add(holder);
  });
}

let mapHoverId = null;

function setMapHover(id) {
  if (mapHoverId === id) return;
  mapHoverId = id;
  mapGroup.children.forEach((h) => {
    const mat = h.userData.id === id ? mapHoverMat : mapMat;
    h.userData.meshes?.forEach((m) => (m.material = mat));
  });
  mapPins.forEach((pin, pid) => pin.classList.toggle("is-hover", pid === id));
  canvas.style.cursor = id ? "pointer" : "default";
}

const mapRay = new THREE.Raycaster();
mapRay.firstHitOnly = true;
const mapPointer = new THREE.Vector2();
let mapPickT = 0;

window.addEventListener("mousemove", (e) => {
  if (!mapMode || transitionActive || !mapGroup.visible) return;
  const now = performance.now();
  if (now - mapPickT < 50) return;          // batasi 20x/detik
  mapPickT = now;
  mapPointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  mapRay.setFromCamera(mapPointer, orbitCam);
  const meshes = mapGroup.children.flatMap((h) => h.userData.meshes || []);
  const hit = mapRay.intersectObjects(meshes, false)[0];
  setMapHover(hit ? hit.object.userData.templeId : null);
});

const _pinV = new THREE.Vector3();
const MAP_PIN_Y = 2.0;
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
  mapScreen?.classList.remove("hidden");
  entrySc.classList.add("hidden");
  journeyLayer.classList.add("hidden");
  if (templeModel) templeModel.visible = false;
  extraModels.forEach((m) => (m.visible = false));
  ground.visible = false;
  plaza.visible = false;
  if (bvhMesh) bvhMesh.visible = false;
  buildMapModels();
  mapGroup.visible = true;
  scene.background = null;
  scene.fog = null;
  freeFlyMode = false;
  dedicatedOrbit.enabled = false;
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
  mapScreen?.classList.add("hidden");
  if (templeModel) templeModel.visible = true;
  extraModels.forEach((m) => (m.visible = true));
  ground.visible = true;
  plaza.visible = true;
  treeEnvironment.visible = true;
  if (bvhMesh) bvhMesh.visible = false;
  scene.background = ORBIT_BACKGROUND;
  scene.fog = orbitFog;
  activeCamera = orbitCam;
}
function transitionFromMap(id = "siwa") {
  if (!mapMode || transitionActive) return;
  transitionActive = true;
  document.querySelectorAll(".map-node").forEach((el) => el.classList.toggle("active", el.dataset.nodeId === id));
  mapScreen?.classList.add("map-transition-out");
  window.setTimeout(() => {
    transitionActive = false;
    mapScreen?.classList.remove("map-transition-out");
    leaveMap();
    beginJourney(id);
  }, 550);
}
mapBtn?.addEventListener("click", enterMap);
mapBackBtn?.addEventListener("click", () => {
  leaveMap();
  startFly(JOURNEY.overview.position, new THREE.Vector3(0, orb.ty, 0));
  entrySc.classList.remove("hidden");
  journeyLayer.classList.remove("hidden");
});
canvas.addEventListener("mousedown", (e) => {
  if (!isSV && !transitionActive && !dedicatedOrbit) {
    orb.drag = true;
    orb.lx = e.clientX;
    orb.ly = e.clientY;
  }
});
window.addEventListener("mouseup", () => (orb.drag = false));
window.addEventListener("mousemove", (e) => {
  if (!orb.drag || isSV || transitionActive || dedicatedOrbit) return;
  orb.theta -= (e.clientX - orb.lx) * 0.005;
  orb.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.01, orb.phi + (e.clientY - orb.ly) * 0.005));
  orb.lx = e.clientX;
  orb.ly = e.clientY;
  updateOrbit();
});
canvas.addEventListener(
  "wheel",
  (e) => {
    if (isSV || transitionActive || dedicatedOrbit) return;
    orb.r = Math.max(2, Math.min(80, orb.r + e.deltaY * 0.015));
    updateOrbit();
  },
  { passive: true },
);

let orbTouchId = null;
let pinchDist = null;
function _touchDist(t0, t1) {
  return Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
}
canvas.addEventListener(
  "touchstart",
  (e) => {
    if (isSV || transitionActive || dedicatedOrbit) return;
    if (e.touches.length >= 2) {
      orb.drag = false;
      pinchDist = _touchDist(e.touches[0], e.touches[1]);
      return;
    }
    const t = e.changedTouches[0];
    orbTouchId = t.identifier;
    orb.drag = true;
    orb.lx = t.clientX;
    orb.ly = t.clientY;
  },
  { passive: true },
);
canvas.addEventListener(
  "touchmove",
  (e) => {
    if (isSV || transitionActive || dedicatedOrbit) return;
    if (e.touches.length >= 2) {
      const d = _touchDist(e.touches[0], e.touches[1]);
      if (pinchDist !== null) {
        orb.r = Math.max(2, Math.min(80, orb.r - (d - pinchDist) * 0.04));
        updateOrbit();
      }
      pinchDist = d;
      e.preventDefault();
      return;
    }
    if (!orb.drag) return;
    let t = null;
    for (const ct of e.changedTouches) if (ct.identifier === orbTouchId) t = ct;
    if (!t) return;
    orb.theta -= (t.clientX - orb.lx) * 0.005;
    orb.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.01, orb.phi + (t.clientY - orb.ly) * 0.005));
    orb.lx = t.clientX;
    orb.ly = t.clientY;
    updateOrbit();
    e.preventDefault();
  },
  { passive: false },
);
function orbTouchEnd(e) {
  if (e.touches.length < 2) pinchDist = null;
  for (const t of e.changedTouches) {
    if (t.identifier === orbTouchId) {
      orb.drag = false;
      orbTouchId = null;
    }
  }
}
canvas.addEventListener("touchend", orbTouchEnd);
canvas.addEventListener("touchcancel", orbTouchEnd);


const SPAWN_POS = new THREE.Vector3(2.6, 0.13, -0.02);
const SPAWN_YAW = 1.57;
let spawn = { id: "siwa", pos: SPAWN_POS.clone(), yaw: SPAWN_YAW };
const TEMPLE_FACING = { wisnu: "east", brahma: "east", garuda: "west", nandi: "west", angsa: "west"};
const TEMPLE_SPAWN_DIST = 0.7;
const TEMPLE_CENTERS = {
  wisnu:  [0.32, -4.0],
  brahma: [0.32, 4.05],
  garuda: [4.61, -3.97],
  nandi:  [4.61, 0.05],
  angsa:  [4.61, 4.12],
};
const HALF = 1.3;
const TEMPLE_BOUNDS = {
  siwa: { minX: -2.0, maxX: 3.2, minZ: -2.0, maxZ: 2.0 },
};
for (const [id, c] of Object.entries(TEMPLE_CENTERS)) {
  TEMPLE_BOUNDS[id] = { minX: c[0] - HALF, maxX: c[0] + HALF, minZ: c[1] - HALF, maxZ: c[1] + HALF }
};
const extraModels = [];
const modelById = {};
const extraColliders = [];
const templeBlockers = [];
const JOURNEY = {
  overview: { position: new THREE.Vector3(4.5, 3.5, 6.5), target: new THREE.Vector3(0, 1.8, 0) },
  entrance: { position: new THREE.Vector3(3.7, 1.25, 0.15), target: new THREE.Vector3(1.3, 1.35, 0.05) },
  interior: { position: SPAWN_POS.clone(), target: new THREE.Vector3(SPAWN_POS.x - 1, SPAWN_POS.y, SPAWN_POS.z) },
  waypoints: [
    { id: "entrance", position: new THREE.Vector3(3.7, 1.25, 0.15) },
    { id: "interior", position: new THREE.Vector3(2.734, 0.65, -0.7) },
  ],
};
const gsap = window.gsap;

const P = {
  pos: SPAWN_POS.clone(),
  vel: new THREE.Vector3(),
  yaw: SPAWN_YAW,
  pitch: 0,
  onGround: false,
  jumpRequested: false,
  eyeH: 0.13,
  radius: 0.02,
  maxStepH: 0.04,
  walkSpd: 2.0 * 0.1,
  runSpd: 3.0 * 0.1,
  gravity: 1.8,
  jumpVel: 0.5,
  bobPhase: 0,
  bobY: 0,
  footRef:0,
};

let walkTransitionActive = false;
let arrowHovered = false;
const floorArrowRay = new THREE.Raycaster();
const floorArrowPointer = new THREE.Vector2();
const floorForwardRay = new THREE.Raycaster();
const floorDownRay = new THREE.Raycaster();
const floorClickRay = new THREE.Raycaster();
const navigationWallRay = new THREE.Raycaster();
const floorNavDirection = new THREE.Vector3();
const floorNavOrigin = new THREE.Vector3();
const floorNavPoint = new THREE.Vector3();
const floorNavTarget = new THREE.Vector3();
const floorArrowPosition = new THREE.Vector3();
const navigationWallOrigin = new THREE.Vector3();
const navigationWallDirection = new THREE.Vector3();
const controls = { target: new THREE.Vector3() };
const activeMinimapPosition = new THREE.Vector3();
let floorNavReady = false;
let floorNavDistance = 0;
const NAV_EYE_HEIGHT = 0.13;
const MODEL_UNITS_PER_METER = 4.7 / 47;
const NAV_WALL_CLEARANCE = 0.12 * MODEL_UNITS_PER_METER;
const NAV_HEADROOM_CLEARANCE = NAV_EYE_HEIGHT * 0.55;
const TEMPLE_DOORWAYS = [
  { x: 1.088, z: -0.022, halfDepth: 0.14, halfWidth: 0.07 },
  { x: 0.78,  z: -0.02,  halfDepth: 0.14, halfWidth: 0.07 },
  { x: 0.007,  z: 1.296,  halfDepth: 0.14, halfWidth: 0.07, axis: "z" },
  { x: 0.01,  z: 0.78,   halfDepth: 0.14, halfWidth: 0.07, axis: "z" },
];

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

const WALK_WAYPOINTS = [
  { id: "step-forward", position: new THREE.Vector3(0.42, 0.515, -0.017), yaw: 1.57 },
];
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
floorArrow.userData.waypoint = WALK_WAYPOINTS[0];
floorArrow.visible = false;
scene.add(floorArrow);

function syncFirstPersonCamera() {
  fpsCam.position.copy(P.pos);
  fpsCam.position.y += P.bobY;
  fpsCam.rotation.order = "YXZ";
  fpsCam.rotation.y = P.yaw;
  fpsCam.rotation.x = P.pitch;
}

function getFloorAt(x, z, originY = P.pos.y + 0.1) {
  floorDownRay.set(floorNavOrigin.set(x, originY, z), _DN);
  floorDownRay.far = 3;
  const hits = [];
  if (bvhMesh) hits.push(...hitAll(floorDownRay));
  hits.push(...floorDownRay.intersectObjects([ground, plaza], false));
  hits.sort((a, b) => a.distance - b.distance);
  return hits.length ? hits[0].point : null;
}

const _floorArrowTarget = new THREE.Vector3();
let floorArrowMissStreak = 0;
const FLOOR_ARROW_MISS_TOLERANCE = 8;

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
  floorForwardRay.far  = 0.35;
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
  floorNavDistance = Math.hypot(x - P.pos.x, z - P.pos.z);
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

const NAV_PATH_STEP = 0.08;
const MAX_CLICK_WALK = 0.3;
const NAV_PATH_MARGIN = 0.35;
const NAV_PATH_MAX_NODES = 9000;
const NAV_PATH_DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
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
      navigationWallRay.set(
        _navigationProbe.set(position.x, y, position.z),
        direction,
      );
      navigationWallRay.near = 0.001;
      navigationWallRay.far = far;
      if (hitAll(navigationWallRay).length) return false;
    }
  }
  navigationWallRay.set(
    _navigationProbe.set(position.x, position.y - P.eyeH + 0.01, position.z),
    _navigationUp,
  );
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
      candidates.push({
        x: x + Math.cos(angle) * radius,
        z: z + Math.sin(angle) * radius,
      });
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

const STAIR_STEP_TOLERANCE = 0.16;

function navigationSegmentClear(from, to) {
  if (!bvhMesh) return true;
  if (segmentCrossesTempleDoorway(from, to)) return true;
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const distance = Math.hypot(dx, dz);
  if (distance < 0.001) return true;
  navigationWallDirection.set(dx, 0, dz).normalize();
  _navigationSide.set(-navigationWallDirection.z, 0, navigationWallDirection.x);
  const heights = [
    from.y - P.eyeH + STAIR_STEP_TOLERANCE + 0.01,
    from.y,
  ];
  const offsets = [-NAV_WALL_CLEARANCE, 0, NAV_WALL_CLEARANCE];
  for (const offset of offsets) {
    for (const y of heights) {
      navigationWallRay.set(
        _navigationProbe.set(
          from.x + _navigationSide.x * offset,
          y,
          from.z + _navigationSide.z * offset,
        ),
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

function findWalkablePath(destination) {
  const target = walkablePointNear(destination.x, destination.z, P.pos.y);
  if (!target) return null;
  if (Math.hypot(target.x - P.pos.x, target.z - P.pos.z) < 0.001) return [];

  const bounds = spawn.id == "siwa"
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

function moveToFloorPoint(point, { relock = false, usePath = false, onComplete = null } = {}) {
  if (!isSV || walkTransitionActive || !gsap || poiOpen || !point) return;
  const destination = point.clone();
  if (!usePath) {
  const rx = destination.x - P.pos.x;
  const rz = destination.z - P.pos.z;
  const rd = Math.hypot(rx, rz);
  if (rd > MAX_CLICK_WALK) {
    destination.x = P.pos.x + (rx / rd) * MAX_CLICK_WALK;
    destination.z = P.pos.z + (rz / rd) * MAX_CLICK_WALK;
  }}
  const groundPoint = getFloorAt(destination.x, destination.z, Math.max(P.pos.y, destination.y) + 0.1);
  if (!groundPoint) return;
  destination.y = groundPoint.y + NAV_EYE_HEIGHT;
  let safeDestination = getCollisionSafePoint(destination);
  let navigationPath = null;
  if (usePath) {
    navigationPath = findWalkablePath(destination);
    if (!navigationPath?.length) return;
    safeDestination = navigationPath[navigationPath.length - 1].clone();
  }
  if (!safeDestination) return;
  const safeGroundPoint = getFloorAt(safeDestination.x, safeDestination.z, Math.max(P.pos.y, safeDestination.y) + 0.1);
  if (!safeGroundPoint) return;
  if (templeSegmentBlocked(P.pos, safeDestination)) return;
  safeDestination.y = safeGroundPoint.y + NAV_EYE_HEIGHT;
  const dx = destination.x - P.pos.x;
  const dz = destination.z - P.pos.z;
  if (Math.hypot(dx, dz) < 0.12) return;

  walkTransitionActive = true;
  floorArrow.visible = false;
  gsap.killTweensOf(P.pos);
  gsap.killTweensOf(P);
  gsap.killTweensOf(controls.target);
  if (document.pointerLockElement === canvas) document.exitPointerLock();
  controls.target.set(P.pos.x, P.pos.y, P.pos.z);
  const travelPath = navigationPath || [safeDestination];
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      walkTransitionActive = false;
      activeMinimapPosition.set(P.pos.x, 0, P.pos.z);
      syncFirstPersonCamera();
      if (onComplete) onComplete();
    },
  });
  let segmentStart = P.pos.clone();
  travelPath.forEach((segmentEnd) => {
    const safeDx = segmentEnd.x - segmentStart.x;
    const safeDz = segmentEnd.z - segmentStart.z;
    const segmentDistance = Math.hypot(safeDx, safeDz);
    if (segmentDistance < 0.001) return;
    const yaw = Math.atan2(-safeDx, -safeDz);
    const moveDirection = new THREE.Vector3(safeDx, 0, safeDz).normalize();
    const targetLook = new THREE.Vector3(
      segmentEnd.x + moveDirection.x * 0.8,
      segmentEnd.y,
      segmentEnd.z + moveDirection.z * 0.8,
    );
    const duration = Math.max(0.12, segmentDistance / P.walkSpd);
    let lastX = P.pos.x, lastZ = P.pos.z;
    tl.to(P.pos, {
      x: segmentEnd.x,
      z: segmentEnd.z,
      duration,
      onUpdate: () => {
        const mx = P.pos.x - lastX, mz = P.pos.z - lastZ;
        if (!isInsideTempleDoorway(P.pos) && (mx || mz)) {
          const { bx, bz } = wallBlocked({ x: lastX, y: P.pos.y, z: lastZ}, mx, mz);
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
        fpsCam.position.copy(P.pos);
        activeMinimapPosition.set(P.pos.x, 0, P.pos.z);
        syncFirstPersonCamera();
      },
    });
    tl.to(controls.target, {
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration,
      onUpdate: () => {
        const stepFloor = groundY(P.pos);
        if (stepFloor !== null) controls.target.y = stepFloor + NAV_EYE_HEIGHT;
      },
    }, "<");
    tl.to(P, { yaw, pitch: 0, duration, onUpdate: syncFirstPersonCamera }, "<");
    segmentStart = segmentEnd.clone();
  });
}

function stepToWaypoint(waypoint, { relock = true, usePath = false, onComplete = null } = {}) {
  if (!waypoint) return;
  moveToFloorPoint(waypoint.position, { relock, usePath, onComplete });
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
    return true;
  }
  const clickedFloor = floorPointFromPointer(clientX, clientY);
  if (clickedFloor) {
    moveToFloorPoint(clickedFloor);
    return true;
  }
  return false;
}

let _calOrigin = null,
  _calForward = null;

function _calFrame() {
  if (!_calOrigin || !_calForward) return null;
  const fwd = _calForward.clone().sub(_calOrigin);
  fwd.y = 0;
  fwd.normalize();
  const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
  return { fwd, right };
}

document.addEventListener("keydown", (e) => {
  if (!DEBUG) return;
  if (!isSV) return;
  if (e.code === "Digit1") {
    _calOrigin = P.pos.clone();
    console.log(`ORIGIN (gerbang timur): pos=(${P.pos.x.toFixed(3)}, ${P.pos.y.toFixed(3)}, ${P.pos.z.toFixed(3)})  yaw=${P.yaw.toFixed(3)}`);
  }
  if (e.code === "Digit2") {
    _calForward = P.pos.clone();
    console.log("FORWARD (arah pusat):", _calForward);
  }

  const names = { Digit3: "mahadewa", Digit4: "agastya", Digit5: "ganesha", Digit6: "durga" };
  if (names[e.code]) {
    const f = _calFrame();
    if (!f) {
      console.warn("Set origin (1) & forward (2) dulu.");
      return;
    }
    const rel = P.pos.clone().sub(_calOrigin);
    console.log(`${names[e.code]} → local: right=${rel.dot(f.right).toFixed(3)} forward=${rel.dot(f.fwd).toFixed(3)} up=${rel.y.toFixed(3)}`);
  }
});

let poiOpen = false;
const poiDots = new Map();

function createPOIDot(p) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "poiDot";
  dot.setAttribute("aria-label", `${p.name[currentLang]}`);
  dot.title = p.name[currentLang];
  dot.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!poiOpen) openPOI(p);
  });
  dot.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  const label = document.createElement("div");
  label.className = "poiLabel";
  label.textContent = p.name[currentLang];
  dot.appendChild(label);
  poiLayer.appendChild(dot);
  poiDots.set(p.uid, dot);
}
POIS.forEach(createPOIDot);

const GATE_CENTER = { siwa: [0, 0], ...TEMPLE_CENTERS };
const GATE_MAX_DIST = 8;
const GATE_TOL = { siwa: 4.0 };
const GATE_TOL_DEFAULT = 1.8;
const gateDots = new Map();
const _gateRay = new THREE.Raycaster();
_gateRay.firstHitOnly = true;
const _gateDir = new THREE.Vector3();
const _gateTarget = new THREE.Vector3();

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

    const text = (currentLang === "id" ? "Klik untuk menjelajahi " : "Click to explore ") + tr(n.name);
    if (dot.dataset.t !== text) {
      dot.dataset.t = text;
      dot.firstChild.textContent = text;
    }
    dot.style.display = "block";
    dot.style.left = (_poiProj.x * 0.5 + 0.5) * innerWidth + "px";
    dot.style.top = (1 - (_poiProj.y * 0.5 + 0.5)) * innerHeight + "px";
  }
}

const _poiProj = new THREE.Vector3();
const _poiCamera = new THREE.Vector3();
const _poiToPoint = new THREE.Vector3();
const _poiOcclusionRay = new THREE.Raycaster();
_poiOcclusionRay.firstHitOnly = true;

function updatePOIs() {
  if (mapMode || transitionActive || (!isSV && !entrySc.classList.contains("hidden"))) {
    poiLayer.style.display = "none";
    return;
  }
  poiLayer.style.display = "block";
  const hotspotCamera = isSV ? fpsCam : orbitCam;
  hotspotCamera.updateMatrixWorld();
  _poiCamera.copy(hotspotCamera.position);
  const infoPOIs = POIS.filter((p) => p.noOcclusion);
  const activePOIs = isSV ? [...(POIS_BY_TEMPLE[spawn.id] || []), ...infoPOIs] : infoPOIs;
  const inactivePOIs = POIS.filter((p) => !activePOIs.includes(p));
  for (const p of inactivePOIs) poiDots.get(p.uid).style.display = "none";

  for (const p of activePOIs) {
    const dot = poiDots.get(p.uid);
    _poiProj.copy(p.pos).project(hotspotCamera);
    const inView = _poiProj.z < 1 && _poiProj.z > -1 &&
      _poiProj.x >= -1.15 && _poiProj.x <= 1.15 &&
      _poiProj.y >= -1.15 && _poiProj.y <= 1.15;
    _poiToPoint.copy(p.pos).sub(_poiCamera);
    const distance = _poiToPoint.length();
    let occluded = false;
    const isStatuePOI = ["mahadewa", "agastya", "ganesha", "durga"].includes(p.id);
    if (inView && bvhMesh && distance > 0.01 && !p.noOcclusion) {
      _poiOcclusionRay.set(_poiCamera, _poiToPoint.normalize());
      _poiOcclusionRay.near = 0.03;
      _poiOcclusionRay.far = distance;
      const occlusionHit = hitAll(_poiOcclusionRay)[0];
      const surfaceTolerance = isStatuePOI ? 0.25 : Math.max(0.08, (p.radius || 0.12) * 0.8);
      occluded = Boolean(occlusionHit && distance - occlusionHit.distance > surfaceTolerance);
    }
    const visible = inView && !occluded;

    if (visible) {
      dot.style.display = "block";
      dot.style.left = (_poiProj.x * 0.5 + 0.5) * innerWidth + "px";
      dot.style.top = (1 - (_poiProj.y * 0.5 + 0.5)) * innerHeight + "px";
      dot.style.opacity = "1";
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

const JOY_MAX_R = 42;
const JOY_DEAD = 0.42;
const JOY_EASE = 0.14;
let joyTouchId = null,
  joyCenterX = 0,
  joyCenterY = 0,
  joyTargetX = 0,
  joyTargetY = 0,
  joyVisualX = 0,
  joyVisualY = 0;

function joyReset() {
  joyTargetX = 0;
  joyTargetY = 0;
}
function joyUpdate(clientX, clientY) {
  let dx = clientX - joyCenterX,
    dy = clientY - joyCenterY;
  const dist = Math.hypot(dx, dy);
  if (dist > JOY_MAX_R) {
    dx = (dx / dist) * JOY_MAX_R;
    dy = (dy / dist) * JOY_MAX_R;
  }
  joyTargetX = dx;
  joyTargetY = dy;
}

function joyTick() {
  if (!isMobile) return;
  joyVisualX += (joyTargetX - joyVisualX) * JOY_EASE;
  joyVisualY += (joyTargetY - joyVisualY) * JOY_EASE;
  joystickKnob.style.transform = `translate(calc(-50% + ${joyVisualX.toFixed(1)}px), calc(-50% + ${joyVisualY.toFixed(1)}px))`;
  const nx = joyVisualX / JOY_MAX_R,
    ny = joyVisualY / JOY_MAX_R;
  K.KeyW = ny < -JOY_DEAD;
  K.KeyS = ny > JOY_DEAD;
  K.KeyA = nx < -JOY_DEAD;
  K.KeyD = nx > JOY_DEAD;
}
joystick.addEventListener(
  "touchstart",
  (e) => {
    if (joyTouchId !== null) return;
    const t = e.changedTouches[0];
    joyTouchId = t.identifier;
    const r = joystick.getBoundingClientRect();
    joyCenterX = r.left + r.width / 2;
    joyCenterY = r.top + r.height / 2;
    joyUpdate(t.clientX, t.clientY);
    e.preventDefault();
  },
  { passive: false },
);
joystick.addEventListener(
  "touchmove",
  (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyTouchId) joyUpdate(t.clientX, t.clientY);
    }
    e.preventDefault();
  },
  { passive: false },
);
function joyEnd(e) {
  for (const t of e.changedTouches) {
    if (t.identifier === joyTouchId) {
      joyTouchId = null;
      joyReset();
    }
  }
}
joystick.addEventListener("touchend", joyEnd);
joystick.addEventListener("touchcancel", joyEnd);

let activePOIRef = null;

function refreshPOIText(p) {
  poiDirEl.textContent = p.dir?.[currentLang] ?? "";
  poiDirEl.style.display = p.dir ? "" : "none";
  poiTitleEl.textContent = p.name[currentLang];
  poiDescEl.textContent = p.desc[currentLang];
  poiImgEl.alt = p.name[currentLang];

  if (!poiAudioEl || !poiAudioBtn) return;
  poiAudioEl.pause();
  poiAudioEl.currentTime = 0;
  const src = p.audio && p.audio[currentLang];
  if (src) {
    poiAudioEl.src = src;
    poiAudioBtn.style.display = "";
    poiAudioIcon.textContent = "▶";
    poiAudioLabel.textContent = currentLang === "id" ? "Dengarkan" : "Listen";
  } else {
    poiAudioEl.removeAttribute("src");
    poiAudioBtn.style.display = "none";
  }
}

function refreshDotLabels() {
  POIS.forEach((p) => {
    const dot = poiDots.get(p.uid);
    if (!dot) return;
    const label = dot.querySelector(".poiLabel");
    dot.title = p.name[currentLang];
    if (label) label.textContent = p.name[currentLang];
  });
}

function openPOI(p) {
  if (gsap) {
    gsap.killTweensOf(P.pos);
    gsap.killTweensOf(P);
    gsap.killTweensOf(controls.target);
  }
  walkTransitionActive = false;
  floorArrow.visible = false;
  poiOpen = true;
  activePOIRef = p;
  refreshPOIText(p);
  poiImgEl.onerror = () => poiImgFrame.classList.add("empty");
  poiImgFrame.classList.toggle("empty", !p.img);
  if (p.img) poiImgEl.src = p.img;
  else poiImgEl.removeAttribute("src")
  poiModal.classList.remove("hidden");
  if (document.pointerLockElement === canvas) document.exitPointerLock();
}
function closePOI() {
  poiOpen = false;
  activePOIRef = null;
  poiModal.classList.add("hidden");
  if (poiAudioEl) poiAudioEl.pause();
}
poiClose.addEventListener("click", closePOI);
poiModal.addEventListener("click", (e) => {
  if (e.target === poiModal) closePOI();
});

document.querySelectorAll(".langBtn").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

if (poiAudioBtn && poiAudioEl) {
  poiAudioBtn.addEventListener("click", () => {
    if (poiAudioEl.paused) poiAudioEl.play().catch((err) => console.warn("Gagal memutar audio:", err));
    else poiAudioEl.pause();
  });
  poiAudioEl.addEventListener("play", () => {
  poiAudioIcon.textContent = "⏸";
  poiAudioLabel.textContent = currentLang === "id" ? "Jeda" : "Pause";
  bgMusic.volume = BG_MUSIC_VOLUME * 0.3;
  });
  poiAudioEl.addEventListener("pause", () => {
  poiAudioIcon.textContent = "▶";
  poiAudioLabel.textContent = currentLang === "id" ? "Dengarkan" : "Listen";
  bgMusic.volume = BG_MUSIC_VOLUME;
  });
  poiAudioEl.addEventListener("ended", () => {
    poiAudioIcon.textContent = "▶";
    poiAudioLabel.textContent = currentLang === "id" ? "Dengarkan" : "Listen";
  });
} else {
  console.warn("Elemen audio POI tidak ditemukan — cek id #poiAudio dan #poiAudioBtn di index.html.");
}

document.addEventListener("keydown", (e) => {
  if (!DEBUG) return;
  if (e.code === "KeyL" && isSV) {
    console.log(`POI coord → x: ${P.pos.x.toFixed(3)}, y: ${P.pos.y.toFixed(3)}, z: ${P.pos.z.toFixed(3)}`);
  }
});


let svDragging = false, svLastX = 0, svLastY = 0, svDownX = 0, svDownY = 0, svMoved = false;
const SV_DRAG_CLICK_THRESHOLD = 5;

canvas.addEventListener("mousedown", (e) => {
  if (!freeFlyMode) return;
  freeFly.dragging = true;
  freeFly.lastX = e.clientX;
  freeFly.lastY = e.clientY;
});
window.addEventListener("mouseup", () => {
  freeFly.dragging = false;
});
window.addEventListener("mousemove", (e) => {
  if (!freeFlyMode || !freeFly.dragging) return;
  const dx = e.clientX - freeFly.lastX;
  const dy = e.clientY - freeFly.lastY;
  freeFly.lastX = e.clientX;
  freeFly.lastY = e.clientY;
  freeFly.yaw -= dx * 0.0025;
  freeFly.pitch = Math.max(-1.5, Math.min(1.5, freeFly.pitch - dy * 0.0025));
});

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
  const dx = e.clientX - svLastX;
  const dy = e.clientY - svLastY;
  P.yaw -= dx * 0.0022;
  P.pitch = Math.max(-1.3, Math.min(1.3, P.pitch - dy * 0.0022));
  svLastX = e.clientX;
  svLastY = e.clientY;
});

window.addEventListener("mouseup", (e) => {
  if (!svDragging) return;
  svDragging = false;
  if (!isSV || walkTransitionActive || poiOpen) return;
  if (!svMoved) triggerFloorNavigation(e.clientX, e.clientY);
});

let touchLookId = null,
  lastTouchX = 0,
  lastTouchY = 0;
canvas.addEventListener(
  "touchstart",
  (e) => {
    if (!isMobile || !isSV || poiOpen) return;
    const t = e.changedTouches[0];
    touchLookId = t.identifier;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
  },
  { passive: true },
);
canvas.addEventListener(
  "touchmove",
  (e) => {
    if (!isMobile || !isSV || poiOpen || touchLookId === null) return;
    let t = null;
    for (const ct of e.changedTouches) if (ct.identifier === touchLookId) t = ct;
    if (!t) return;
    const dx = t.clientX - lastTouchX,
      dy = t.clientY - lastTouchY;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
    P.yaw -= dx * 0.0032;
    P.pitch = Math.max(-1.3, Math.min(1.3, P.pitch - dy * 0.0032));
    e.preventDefault();
  },
  { passive: false },
);
canvas.addEventListener(
  "touchend",
  (e) => {
    let stillDown = false;
    for (const t of e.touches) if (t.identifier === touchLookId) stillDown = true;
    if (!stillDown) touchLookId = null;
  },
  { passive: true },
);

const K = {};
document.addEventListener("keydown", (e) => {
  K[e.code] = true;
  if (e.code === "Escape") {
    if (!templeDialog.classList.contains("hidden")) closeTempleDialog();
    else if (poiOpen) closePOI();
    else if (isSV) exitSV();
  }
  if (e.code === "Space" && isSV) {
    P.jumpRequested = true;
    e.preventDefault();
  }
});
document.addEventListener("keyup", (e) => (K[e.code] = false));

function beginJourney(id = "siwa") {
  if (transitionActive) return;
  freeFlyMode = false;
  ensureBVHReady();
  spawn = computeSpawn(id) || computeSpawn("siwa");
  if (!gsap) {
    enterSV({ skipTransition: true });
    return;
  }
  transitionActive = true;
  dedicatedOrbit.enabled = false;
  isSV = false;
  activeCamera = orbitCam;
  journeyLayer.classList.add("hidden");
  entrySc.classList.add("hidden");
  journeyTransition.classList.remove("hidden");

  const tNode = MAP_NODES.find((n) => n.id === spawn.id);
  journeyTransition.firstElementChild.textContent = (currentLang === "id" ? "Memasuki " : "Entering ") + tr(tNode.name);

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
      enterSV({ skipTransition: true });
    },
  });

  if (spawn.id === "siwa") {
    tl.to(orbitCam.position, {
      x: JOURNEY.entrance.position.x, y: JOURNEY.entrance.position.y, z: JOURNEY.entrance.position.z,
      duration: 2.4, onUpdate: () => orbitCam.lookAt(lookAt),
    });
    tl.to(lookAt, {
      x: JOURNEY.entrance.target.x, y: JOURNEY.entrance.target.y, z: JOURNEY.entrance.target.z,
      duration: 1.1, onUpdate: () => orbitCam.lookAt(lookAt),
    }, "<");
  } else {
    // terbang ke titik di belakang & di atas spawn, sambil memandang candi
    const approach = resolvedSpawn.clone().addScaledVector(fwd, -1.0);
    approach.y += 0.8;
    const templeLook = resolvedSpawn.clone().addScaledVector(fwd, 1.5);
    tl.to(orbitCam.position, {
      x: approach.x, y: approach.y, z: approach.z,
      duration: 2.4, onUpdate: () => orbitCam.lookAt(lookAt),
    });
    tl.to(lookAt, {
      x: templeLook.x, y: templeLook.y, z: templeLook.z,
      duration: 1.8, onUpdate: () => orbitCam.lookAt(lookAt),
    }, "<");
  }

  tl.to(orbitCam.position, {
    x: resolvedSpawn.x, y: resolvedSpawn.y, z: resolvedSpawn.z,
    duration: 1.5, onUpdate: () => orbitCam.lookAt(lookAt),
  });
  tl.to(lookAt, {
    x: finalTarget.x, y: finalTarget.y, z: finalTarget.z,
    duration: 1.4, onUpdate: () => orbitCam.lookAt(lookAt),
  }, "<");
}

function enterSV(options = {}) {
  if (!options.skipTransition) {
    beginJourney();
    return;
  }
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
  activeMinimapPosition.set(P.pos.x, 0, P.pos.z);
  activeCamera = fpsCam;
  dedicatedOrbit.enabled = false;
  floorArrow.visible = true;
  btnSV.classList.add("active");
  btnOrb.classList.remove("active");
  if (isMobile) {
    joystick.style.display = "block";
    document.getElementById("hints").style.display = "none";
  } else {
    document.getElementById("hints").style.display = "";
  }
  entrySc.classList.add("hidden");
  renderer.setPixelRatio(Math.min(devicePixelRatio, PR_SV_MAX));
  scene.fog = streetViewFog;
  scene.background = SKY;
  fpsCam.near = 0.01;
  fpsCam.far = 100;
  fpsCam.updateProjectionMatrix();
}
function exitSV() {
  if (poiOpen) closePOI();
  isSV = false;
  floorArrow.visible = false;
  walkTransitionActive = false;
  activeCamera = orbitCam;
  startFly(JOURNEY.overview.position, new THREE.Vector3(0, orb.ty, 0));
  btnOrb.classList.add("active");
  btnSV.classList.remove("active");
  joystick.style.display = "none";
  joyTouchId = null;
  joyTargetX = joyTargetY = joyVisualX = joyVisualY = 0;
  K.KeyW = false;
  K.KeyS = false;
  K.KeyA = false;
  K.KeyD = false;
  joystickKnob.style.transform = "translate(-50%, -50%)";
  renderer.setPixelRatio(Math.min(devicePixelRatio, PR_ORBIT_MAX));
  scene.fog = orbitFog;
  scene.background = ORBIT_BACKGROUND;
}
btnSV.addEventListener("click", () => { if (!isSV) beginJourney(); });
btnOrb.addEventListener("click", exitSV);
document.getElementById("enterBtn").addEventListener("click", () => beginJourney());
function stopTourMotion() {
  if (poiOpen) closePOI();
  if (gsap) gsap.killTweensOf([P.pos, P, controls.target]);
  walkTransitionActive = false;
}

function backToEntry() {
  if (transitionActive || mapMode) return;
  stopTourMotion();
  if (isSV) exitSV();
  else startFly(JOURNEY.overview.position, new THREE.Vector3(0, orb.ty, 0));
  entrySc.classList.remove("hidden");
  journeyLayer.classList.remove("hidden");
}

function openMapFromTour() {
  if (transitionActive || mapMode) return;
  stopTourMotion();
  if (isSV) exitSV();
  enterMap();
}

document.getElementById("btnBack").addEventListener("click", backToEntry);
document.getElementById("btnMap").addEventListener("click", openMapFromTour);
document.querySelectorAll(".journeyWaypoint").forEach((button) => {
  button.addEventListener("click", () => beginJourney(button.dataset.waypoint));
});

let templeModel = null;
let bvhMesh = null;
let rawGeoRef = null;
let bvhBuilding = false;

function ensureBVHReady() {
  if (bvhMesh || bvhBuilding || !rawGeoRef) return;
  bvhBuilding = true;
  try {
    rawGeoRef.computeBoundsTree();
    bvhMesh = new THREE.Mesh(rawGeoRef, new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
    bvhMesh.visible = false;
    bvhMesh.matrixAutoUpdate = false;
    scene.add(bvhMesh);
  } catch (e) {
    console.error ("Gagal membangun BVH. Model terlalu padat:", e);
    showCalibToast("Model terlalu padat, kecilkan jumlah segitiga.");
  } finally {
    bvhBuilding = false;
  }
}

const gRay = new THREE.Raycaster();
gRay.firstHitOnly = false;
const stpRay = new THREE.Raycaster();
stpRay.firstHitOnly = true;
const wRayX = new THREE.Raycaster();
wRayX.firstHitOnly = true;
const wRayZ = new THREE.Raycaster();
wRayZ.firstHitOnly = true;
const poiPickRay = new THREE.Raycaster();
document.addEventListener("keydown", (e) => {
  if (e.code !== "KeyK") return;
  if (mapMode || transitionActive) return;
  if (!isSV && (!templeModel || !templeModel.visible)) return;

  ensureBVHReady();
  if (!bvhMesh) {
    showCalibToast("Model/BVH belum selesai dimuat — tunggu sebentar lalu coba lagi.");
    return;
  }

  const camera = isSV ? fpsCam : orbitCam;
  const pointer = new THREE.Vector2(0, 0);
  poiPickRay.setFromCamera(pointer, camera);
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
        : "Tidak kena permukaan — arahkan kursor mouse ke bagian candi."
    );
  }
});

let _toastTimer = null;
function showCalibToast(text) {
  let el = document.getElementById("calibToast");
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
const _DN = new THREE.Vector3(0, -1, 0);
const _PX = new THREE.Vector3(1, 0, 0),
  _NX = new THREE.Vector3(-1, 0, 0);
const _PZ = new THREE.Vector3(0, 0, 1),
  _NZ = new THREE.Vector3(0, 0, -1);
const _ro = new THREE.Vector3();

function groundY(pos) {
  const footY = pos.y - P.eyeH;
  _ro.set(pos.x, footY + STAIR_STEP_TOLERANCE + 0.01, pos.z);
  gRay.set(_ro, _DN);
  gRay.far = STAIR_STEP_TOLERANCE + 0.06;
  {
    const limit = footY + STAIR_STEP_TOLERANCE + 0.002;
    const floorHit = hitAll(gRay).find((x) => x.point.y <= limit);
    if (floorHit) return floorHit.point.y;
  }
  const h2 = gRay.intersectObjects([ground, plaza], false);
  return h2.length ? h2[0].point.y : null;
}

const allColliders = () => (bvhMesh ? [bvhMesh, ...extraColliders] : extraColliders);

function wallBlocked(pos, mx, mz) {
  if (!bvhMesh && !extraColliders.length) return { bx: false, bz: false };
  const foot = (P.onGround || walkTransitionActive) ? pos.y - P.eyeH : P.footRef;
  const heights = [foot + 0.08, foot + P.eyeH - 0.01];
  const isWall = (h) => !h.face || Math.abs(h.face.normal.y) < 0.6;
  let bx = false, bz = false;
  for (const hy of heights) {
    _ro.set(pos.x, hy, pos.z);
    if (!bx && mx !== 0) {
      wRayX.set(_ro, mx > 0 ? _PX : _NX);
      wRayX.far = P.radius + 0.012;
      const hx = wRayX.intersectObjects(allColliders(), false).filter(isWall);
      if (hx.length) bx = true;
    }
    if (!bz && mz !== 0) {
      wRayZ.set(_ro, mz > 0 ? _PZ : _NZ);
      wRayZ.far = P.radius + 0.012;
      const hz = wRayZ.intersectObjects(allColliders(), false).filter(isWall);
      if (hz.length) bz = true;
    }
    if (bx && bz) break;
  }
  return { bx, bz };
}

document.addEventListener("keydown", (e) => {
  if (!DEBUG || e.code !== "KeyB" || !isSV || !bvhMesh) return;
  const foot = P.pos.y - P.eyeH;
  const heights = { "pinggang(+0.08)": foot + 0.08, "mata": P.pos.y, "1.7m(lama)": foot + 0.17 };
  const dirs = { "-X": _NX, "+X": _PX, "-Z": _NZ, "+Z": _PZ };
  console.log(`POS ${P.pos.x.toFixed(3)}, ${P.pos.y.toFixed(3)}, ${P.pos.z.toFixed(3)} yaw=${P.yaw.toFixed(2)}`);
  for (const [hn, hy] of Object.entries(heights)) {
    for (const [dn, d] of Object.entries(dirs)) {
      const r = new THREE.Raycaster(new THREE.Vector3(P.pos.x, hy, P.pos.z), d, 0, 0.5);
      r.firstHitOnly = true;
      const h = hitAll(r)[0];
      console.log(`${hn} → ${dn}: ${h ? `${h.distance.toFixed(3)} (y=${h.point.y.toFixed(3)}, normal.y=${h.face.normal.y.toFixed(2)})` : "-"}`);
    }
  }
  const g = groundY(P.pos);
  console.log("groundY:", g, "| kaki-ke-lantai:", g === null ? "TIDAK ADA LANTAI" : (P.pos.y - g).toFixed(3));
});

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

const _f = new THREE.Vector3(),
  _r = new THREE.Vector3(),
  _mv = new THREE.Vector3();
function updatePlayer(dt) {
  if (!isSV || poiOpen || walkTransitionActive) return;
  dt = Math.min(dt, 0.05);
  const spd = K.ShiftLeft || K.ShiftRight ? P.runSpd : P.walkSpd;
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
    const inDoor = isInsideTempleDoorway(P.pos) || (DEBUG && K.KeyN);
    const { bx, bz } = inDoor ? { bx: false, bz: false } : wallBlocked(P.pos, _mv.x, _mv.z);
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

  const moving = _mv.lengthSq() > 0 && P.onGround;
  const bobRate = K.ShiftLeft || K.ShiftRight ? 12 : 6;
  if (moving) {
    P.bobPhase = (P.bobPhase + bobRate * dt) % (Math.PI * 2);
    P.bobY = Math.sin(P.bobPhase) * 0.004;
  } else {
    P.bobY *= 0.8;
  }

  P.pos.x = Math.max(-50, Math.min(50, P.pos.x));
  P.pos.z = Math.max(-50, Math.min(50, P.pos.z));
  syncFirstPersonCamera();
}

const _flyDir = new THREE.Vector3(), _flyRight = new THREE.Vector3(), _flyMove = new THREE.Vector3();
const _flyRay = new THREE.Raycaster();
_flyRay.firstHitOnly = true;
const _flyAxis = new THREE.Vector3();
const FLY_RADIUS = 0.12;
const FLY_SPEED = 0.8;
const FLY_SPEED_FAST = 2.0;

const _cp = { point: new THREE.Vector3(), distance: 0, faceIndex: 0};
const _flyTry = new THREE.Vector3();
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
    if (bvhMesh && !(DEBUG && K.KeyN)) {
      _flyTry.copy(orbitCam.position);
      _flyTry[axis] += d;
      const nd = surfaceDist(_flyTry, FLY_RADIUS);
      if (nd < FLY_RADIUS && nd < surfaceDist(orbitCam.position, FLY_RADIUS)) continue;
    }
    orbitCam.position[axis] += d;
  }
  orbitCam.position.y = Math.max(0.05, orbitCam.position.y);
}

// ===== MINIMAP (berbasis MAP_NODES) =====
const MM_W = 280, MM_H = 350;                       // harus sama dengan <canvas id="mm">
const MM_BG = "rgba(107, 79, 59, 0.15)";            // biru transparan 15%
const _mmDir = new THREE.Vector3();
const mmClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const MM_SVG_W = 1080;
const MM_SVG_PX = 145;          // kembalikan ke nilai awal (untuk gambar & nama candi)
const MM_ADJ = { x: 4, y: 13 };          // nilai asli (cocok untuk 5 candi lain)
const MM_TEMPLE_ADJ = {
  siwa: { x: 5, y: -13 },
  brahma: {x: -3, y: -33},
  wisnu: {x: -3, y: 5},
  nandi: {x: -30, y: -13},
  garuda:{x: -30, y: 5},
  angsa: {x: -30, y: -35}
};
const MM_ORIGIN = { x: 296, y: 672 };
const MM_K = MM_W / MM_SVG_W;
const MM_RES = 2;

let minimapLayer = null;
const minimapImg = new Image();
minimapImg.onload = () => {
  minimapLayer = document.createElement("canvas");
  minimapLayer.width = MM_W * MM_RES;
  minimapLayer.height = MM_H * MM_RES;
  minimapLayer.getContext("2d").drawImage(minimapImg, 0, 0, minimapLayer.width, minimapLayer.height);
};
minimapImg.src = "./assets/minimap_fiks.svg";

const worldToCanvas = (wx, wz, id = null, px = MM_SVG_PX) => {
  const t = MM_TEMPLE_ADJ[id] || { x: 0, y: 0 };
  return {
    x: (MM_ORIGIN.x + wx * px) * MM_K + MM_ADJ.x + t.x,
    y: (MM_ORIGIN.y + wz * px) * MM_K + MM_ADJ.y + t.y,
  };
};

function nearestTempleId(x, z) {
  let best = "siwa", bd = Infinity;
  for (const [id, c] of Object.entries(GATE_CENTER)) {
    const d = Math.hypot(x - c[0], z - c[1]);
    if (d < bd) { bd = d; best = id; }
  }
  return best;
}
// satu-satunya proyeksi dunia → minimap, dipakai candi, hotspot, dan pemain
const worldToCanvasLocal = (wx, wz, id) => worldToCanvas(wx, wz, id, MM_SVG_PX);

function drawMinimap() {
  const mmCanvas = document.getElementById("mm");
  if (!mmCanvas) return;
  const ctx = mmCanvas.getContext("2d");
  const width = mmCanvas.width, height = mmCanvas.height;

  let camX, camZ, camYaw;
  if (isSV) {
    camX = P.pos.x; camZ = P.pos.z; camYaw = P.yaw;
  } else {
    orbitCam.getWorldDirection(_mmDir);
    camX = orbitCam.position.x; camZ = orbitCam.position.z;
    camYaw = Math.atan2(-_mmDir.x, -_mmDir.z);
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = MM_BG;
  ctx.fillRect(0, 0, width, height);
  if (minimapLayer) ctx.drawImage(minimapLayer, 0, 0, width, height);

  // semua candi selalu tampil (termasuk yang sedang dijelajahi)
  ctx.font = "600 11px 'Instrument Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  for (const node of MAP_NODES) {
    const c = GATE_CENTER[node.id];
    if (!c) continue;
    const p = worldToCanvas(c[0], c[1], node.id);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(31,41,55,0.55)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.strokeText(tr(node.name), p.x, p.y - 8);
    ctx.fillStyle = "#1f2937";
    ctx.fillText(tr(node.name), p.x, p.y - 8);
  }

  // hotspot candi yang sedang dijelajahi
  if (isSV) {
    (POIS_BY_TEMPLE[spawn.id] || []).forEach((poi) => {
      const p = worldToCanvasLocal(poi.pos.x, poi.pos.z, spawn.id);
      const isMain = !poi.id.startsWith("panel_");
      ctx.beginPath();
      ctx.arc(p.x, p.y, isMain ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isMain ? "#c9a24a" : "#2d7d5a";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });
  }

  // posisi & arah pemain
  const MM_PAD = 14;
  const pp = worldToCanvasLocal(camX, camZ, isSV ? spawn.id : nearestTempleId(camX, camZ));
  pp.x = mmClamp(pp.x, MM_PAD, width - MM_PAD);
  pp.y = mmClamp(pp.y, MM_PAD, height - MM_PAD);

  const fovAngle = Math.atan2(-Math.cos(camYaw), -Math.sin(camYaw));
  ctx.save();
  ctx.translate(pp.x, pp.y);
  ctx.rotate(fovAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, 30, -0.42, 0.42);
  ctx.closePath();
  ctx.fillStyle = "rgba(45,125,90,0.55)";
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(pp.x, pp.y);
  ctx.rotate(-camYaw);
  ctx.beginPath();
  ctx.moveTo(0, -10); ctx.lineTo(8, 6); ctx.lineTo(0, 2); ctx.lineTo(-8, 6);
  ctx.closePath();
  ctx.fillStyle = "#e53935";
  ctx.fill();
  ctx.restore();
}

// klik minimap -> koordinat dunia (kebalikan worldToCanvas)
function minimapWorldPoint(clientX, clientY) {
  const mmCanvas = document.getElementById("mm");
  const rect = mmCanvas.getBoundingClientRect();
  const t = (isSV && MM_TEMPLE_ADJ[spawn.id]) || { x: 0, y: 0 };
  const px = (clientX - rect.left) * (mmCanvas.width / rect.width) - MM_ADJ.x - t.x;
  const py = (clientY - rect.top) * (mmCanvas.height / rect.height) - MM_ADJ.y - t.y;
  return {
    x: (px / MM_K - MM_ORIGIN.x) / MM_SVG_PX,
    z: (py / MM_K - MM_ORIGIN.y) / MM_SVG_PX,
  };
}

document.getElementById("mm")?.addEventListener("click", (e) => {
  if (!isSV || walkTransitionActive) return;
  const point = minimapWorldPoint(e.clientX, e.clientY);
  let nearest = null;
  let nearestDist = Infinity;
  for (const waypoint of WALK_WAYPOINTS) {
    const d = Math.hypot(point.x - waypoint.position.x, point.z - waypoint.position.z);
    if (d < nearestDist) {
      nearest = waypoint;
      nearestDist = d;
    }
  }
  (POIS_BY_TEMPLE[spawn.id] || []).forEach((poi) => {
    const d = Math.hypot(point.x - poi.pos.x, point.z - poi.pos.z);
    if (d < nearestDist) {
      const dx = poi.pos.x - P.pos.x;
      const dz = poi.pos.z - P.pos.z;
      nearest = {
        id: poi.id,
        position: new THREE.Vector3(poi.pos.x, P.pos.y - P.eyeH, poi.pos.z),
        yaw: Math.atan2(-dx, -dz),
        poi,
      };
      nearestDist = d;
    }
  });
  if (!nearest || nearestDist > 0.8) {
    nearest = {
      id: "free-navigation",
      position: new THREE.Vector3(point.x, P.pos.y - P.eyeH, point.z),
    };
  }
  e.stopPropagation();
  if (nearest.poi) {
      stepToWaypoint(nearest, {
        relock: false,
        usePath: true,
        onComplete: () => openPOI(nearest.poi),
      });
  } else {
    stepToWaypoint(nearest, { relock: false, usePath: true });
  }
});

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

// ===== SISTEM CHUNK (SEMUA CANDI) =====
const CHUNK_BASE = "assets/chunks/";  // candi lain: assets/chunks/<id>/
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

// ref = model collision yang sudah diposisikan (lihat addModel)
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
        if (!m.map && m.color) m.color.set(0x8a8a8c);
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

  (async () => {
    try {
    const siwaSet = await initSiwaChunks();
    stageTxt.textContent = I18N[currentLang].stageScaling;

    const model = siwaSet.root;
    templeModel = model;
    scene.add(model);

    const cgltf = await loader.loadAsync("assets/model/siwa_collision.glb");
    const colModel = cgltf.scene;
    colModel.updateMatrixWorld(true);
    const cb = new THREE.Box3().setFromObject(colModel);
    colModel.scale.copy(model.scale);
    colModel.updateMatrixWorld(true);
    colModel.position.copy(model.position);
    siwaColScene = colModel;
    colModel.updateMatrixWorld(true)

    const collisionGeometries = [];
    colModel.traverse((o) => {
      if (!o.isMesh) return;
      const geometry = o.geometry.clone();
      geometry.applyMatrix4(o.matrixWorld);
      collisionGeometries.push(geometry);
    });

    model.traverse((o) => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
        m.side = THREE.DoubleSide;
        if (m.color) m.color.set(0x8a8a8c);
      });
    });

    let rawGeo = null;
    if (collisionGeometries.length) {
      const hasNormals = collisionGeometries.every((geometry) => geometry.attributes.normal);
      const hasUvs = collisionGeometries.every((geometry) => geometry.attributes.uv);
      const vertexCount = collisionGeometries.reduce(
        (total, geometry) => total + geometry.attributes.position.count,
        0,
      );
      const indexCount = collisionGeometries.reduce(
        (total, geometry) => total + (geometry.index ? geometry.index.count : geometry.attributes.position.count),
        0,
      );
      const positions = new Float32Array(vertexCount * 3);
      const normals = hasNormals ? new Float32Array(vertexCount * 3) : null;
      const uvs = hasUvs ? new Float32Array(vertexCount * 2) : null;
      const indices = new Uint32Array(indexCount);
      let vertexOffset = 0;
      let indexOffset = 0;
      for (const geometry of collisionGeometries) {
        const position = geometry.attributes.position;
        const normal = geometry.attributes.normal;
        const uv = geometry.attributes.uv;
        for (let i = 0; i < position.count; i++) {
          const positionOffset = (vertexOffset + i) * 3;
          positions[positionOffset] = position.getX(i);
          positions[positionOffset + 1] = position.getY(i);
          positions[positionOffset + 2] = position.getZ(i);
          if (hasNormals) {
            normals[positionOffset] = normal.getX(i);
            normals[positionOffset + 1] = normal.getY(i);
            normals[positionOffset + 2] = normal.getZ(i);
          }
          if (hasUvs) {
            const uvOffset = (vertexOffset + i) * 2;
            uvs[uvOffset] = uv.getX(i);
            uvs[uvOffset + 1] = uv.getY(i);
          }
        }
        if (geometry.index) {
          for (let i = 0; i < geometry.index.count; i++) {
            indices[indexOffset + i] = geometry.index.getX(i) + vertexOffset;
          }
        } else {
          for (let i = 0; i < position.count; i++) {
            indices[indexOffset + i] = vertexOffset + i;
          }
        }
        vertexOffset += position.count;
        indexOffset += geometry.index ? geometry.index.count : position.count;
        geometry.dispose();
      }
      rawGeo = new THREE.BufferGeometry();
      rawGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      if (hasNormals) rawGeo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
      if (hasUvs) rawGeo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      rawGeo.setIndex(new THREE.BufferAttribute(indices, 1));
    }
    if (!rawGeo) {
      errBox.style.display = "block";
      errBox.textContent = "Geometry error";
      return;
    }

    if (!rawGeo.attributes.normal) {
      rawGeo.computeVertexNormals();
    }
    console.log("Segitiga Collision:", (rawGeo.index ? rawGeo.index.count : rawGeo.attributes.position.count)/3)
    rawGeo.computeBoundingBox();

    rawGeoRef = rawGeo;

    orb.ty = 4.7 * 0.35;
    orb.r = 12;
    updateOrbit();

    stageTxt.textContent = "";

    const showEntry = () => {
      entrySc.classList.remove("hidden");
      journeyLayer.classList.remove("hidden");
      startFly(JOURNEY.overview.position, new THREE.Vector3(0, orb.ty, 0));
    };
    window.__modelReady = true;
    if (window.__loaderDone) showEntry();
    else window.addEventListener("loader-done", showEntry, { once: true });
  } catch (e) {
    console.error(e);
    errBox.style.display = "block";
    errBox.textContent = "Error: " + e.message;
    stageTxt.textContent = I18N[currentLang].loadError;
  }
})();

for (const id of Object.keys(TEMPLE_CENTERS)) {
  addModel(`assets/model/${id}_collision.glb`, { id, center: TEMPLE_CENTERS[id], scale: 0.1 });
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
    yaw:east ? 1.57 : -1.57
  }
}

function blockedByTemple(x, z) {
  if (isSV) {
    const b = TEMPLE_BOUNDS[spawn.id];
    if (b && (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ)) return true;
  }
  return templeBlockers.some((b) => x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ);
}
function templeSegmentBlocked(a, b) {
  const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.03));
  for (let i = 0; i <= n; i++) {
    const k = i / n;
    if (blockedByTemple(a.x + (b.x - a.x) * k, a.z + (b.z - a.z) * k)) return true;
  }
  return false;
}

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

function addModel(collisionUrl, { id = null, center = null, scale = 1, rotY = 0 } = {}) {
  loader.load(collisionUrl, (gltf) => {
    const m = gltf.scene;
    m.scale.setScalar(scale);
    m.rotation.y = rotY;
    m.updateMatrixWorld(true);

    if (center) {
      const b = new THREE.Box3().setFromObject(m);
      const c = bodyCenter(m, b);
      m.position.x += center[0] - c.x;
      m.position.z += center[1] - c.z;
      m.position.y -= b.min.y;
      m.updateMatrixWorld(true);
    }

    // HAPUS: m.traverse(... o.material = ghostMat ...), scene.add(m), extraModels.push(m)
    if (id) modelById[id] = m;

    m.traverse((o) => {
      if (!o.isMesh) return;
      const g = o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      g.computeBoundsTree();
      const col = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
      col.matrixAutoUpdate = false;
      scene.add(col);
      extraColliders.push(col);
    });

    if (id) attachTempleChunks(id, m);
  }, undefined, (err) => console.error("Gagal memuat", collisionUrl, err));
}

function hitAll(ray) {
  const hits = [];
  if (bvhMesh) hits.push(...ray.intersectObjects([bvhMesh], false));
  if (extraColliders.length) hits.push(...ray.intersectObjects(extraColliders, false));
  return hits.sort((a, b) => a.distance - b.distance);
}

function renderHints(mode = hintMode) {
  hintMode = mode;
  const box = document.querySelector("#hints .hrow");
  if (!box) return;
  box.innerHTML = HINT_SETS[mode]
    .map(([k, key]) => `<span class="hk">${I18N[currentLang][k] ?? k}</span> <span>${I18N[currentLang][key]}</span>`)
    .join("<br />");
}

const clock = new THREE.Clock();
let fc = 0,
  lastT = performance.now(),
  avgFps = 60;

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  if (!isSV && !mapMode && dedicatedOrbit.enabled) dedicatedOrbit.update();
  updateFreeFly(dt);
  updatePlayer(dt);
  joyTick();
  if (fc % 3 === 0) { updatePOIs(); updateGateDots(); }
  updateJourneyWaypoints();
  if (mapMode) {
    const t = performance.now() / 1000;
    mapGroup.children.forEach((h) => {
      h.position.y = Math.sin(t * 0.5 + h.userData.phase) * 0.1; // pelan: ±12 detik/siklus
    });
    updateMapPins();
  }
  updateFloorArrowTarget();
  if (floorArrow.visible) {
    const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.07 + (arrowHovered ? 0.08 : 0);
    floorArrow.scale.set(pulse, pulse, pulse);
    floorArrow.material.opacity = arrowHovered ? 1 : 0.9;
  }
  if (fc++ % 3 === 0) drawMinimap();
  renderer.render(scene, activeCamera);

  const now = performance.now(),
    ft = now - lastT;
  lastT = now;
  if (ft > 0 && ft < 500) avgFps = avgFps * 0.95 + (1000 / ft) * 0.05;

  if (fc % 20 === 0) {
    fpsEl.textContent = `FPS: ${Math.round(avgFps)} | Tri: ${(renderer.info.render.triangles / 1e6).toFixed(1)}M`;
    if (!DEBUG) fpsEl.style.display = "none";
  }
}

bgMusic.volume = BG_MUSIC_VOLUME;

function startBackgroundMusic() {
  if (!bgMusic.paused) return;
  bgMusic.play().catch(() => {
  });
}

startBackgroundMusic();

["pointerdown", "keydown", "touchstart"].forEach((evt) => {
  window.addEventListener(evt, startBackgroundMusic, { once: true, passive: true });
});
animate();

window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  orbitCam.aspect = fpsCam.aspect = innerWidth / innerHeight;
  orbitCam.updateProjectionMatrix();
  fpsCam.updateProjectionMatrix();
});

let savedLang = "id";
try { savedLang = localStorage.getItem("candiSiwaLang") || "id"; } catch {}
applyLanguage(savedLang);

const entryTitleWords = document.querySelectorAll(".entry-title-word");
let entryTitleIndex = 0;
if (entryTitleWords.length > 1) {
  window.setInterval(() => {
    entryTitleWords[entryTitleIndex].classList.remove("active");
    entryTitleIndex = (entryTitleIndex + 1) % entryTitleWords.length;
    entryTitleWords[entryTitleIndex].classList.add("active");
  }, 3000);
}