// WebGIS: peta Leaflet, layer candi & titik pemantauan
(function () {
  const CENTER = [-7.751987051093749, 110.49123740813083];

  const BASEMAP = {
    osm: { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
    satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: "Tiles &copy; Esri" },
    topo: { url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: "Map data: &copy; OpenStreetMap contributors, SRTM | &copy; OpenTopoMap" },
  };

  const CANDI = [
    { nama: "Candi Siwa", jenis: "utama", latlng: [-7.75200253, 110.49118332], img: "./css/assets/candi/siwa.jpg", desc: "Candi tertinggi di Prambanan (±47 m), dengan empat bilik yang menyimpan arca Siwa Mahadewa, Durga, Ganesha, dan Agastya." },
    { nama: "Candi Brahma", jenis: "utama", latlng: [-7.75233992, 110.49117791], img: "./css/assets/candi/brahma.png", desc: "Didedikasikan untuk Dewa Brahma, dewa pencipta dalam Trimurti, dengan arca Brahma berwajah empat di ruang utamanya." },
    { nama: "Candi Wisnu", jenis: "utama", latlng: [-7.75167350, 110.49116986], img: "./css/assets/candi/wisnu.jpg", desc: "Didedikasikan untuk Dewa Wisnu, pemelihara alam semesta, dengan arca Wisnu bertangan empat di ruang utamanya." },
    { nama: "Candi Angsa", jenis: "wahana", latlng: [-7.75233726, 110.49162542], img: "./css/assets/candi/angsa.jpg", desc: "Melambangkan Angsa (Hamsa), kendaraan Dewa Brahma yang dalam tradisi Hindu dikaitkan dengan kebijaksanaan." },
    { nama: "Candi Nandi", jenis: "wahana", latlng: [-7.75200306, 110.49161871], img: "./css/assets/candi/nandi.png", desc: "Menyimpan arca Nandi, lembu suci yang menjadi kendaraan Dewa Siwa, serta arca Surya dan Candra." },
    { nama: "Candi Garuda", jenis: "wahana", latlng: [-7.75166562, 110.49162114], img: "./css/assets/candi/garuda.jpg", desc: "Berkaitan dengan Garuda, makhluk mitologi yang menjadi kendaraan Dewa Wisnu dan melambangkan kesetiaan serta pengabdian." },
  ];

  const TITIK_BASE = [{ nama: "BASE 1", latlng: [-7.7510, 110.4905] }];
  const TITIK_ROVER = [
    { nama: "ROVER 1", latlng: [-7.7511, 110.4914] },
    { nama: "ROVER 2", latlng: [-7.7525, 110.4916] },
    { nama: "ROVER 3", latlng: [-7.7530, 110.4912] },
  ];
  // titik prisma per candi (penomoran mulai dari 1 lagi di tiap kelompok)
  const PRISMA_GRUP = [
    [[-7.75162117, 110.49107148], [-7.75159725, 110.49109430], [-7.75157333, 110.49111744], [-7.75157300, 110.49121942], [-7.75159493, 110.49124625], [-7.75161785, 110.49126772],
     [-7.75171951, 110.49126776], [-7.75174343, 110.49124696], [-7.75176701, 110.49122280], [-7.75176867, 110.49112249], [-7.75174608, 110.49109700], [-7.75172216, 110.49107318]],
    [[-7.75160755, 110.49156404], [-7.75160722, 110.49167642], [-7.75172582, 110.49167810], [-7.75172449, 110.49156505]],
    [[-7.75193478, 110.49155601], [-7.75193378, 110.49167811], [-7.75207464, 110.49168005], [-7.75207331, 110.49155460]],
    [[-7.75227696, 110.49156668], [-7.75227463, 110.49168241], [-7.75240021, 110.49168208], [-7.75239888, 110.49156634]],
    [[-7.75228593, 110.49108122], [-7.75226101, 110.49110201], [-7.75223842, 110.49112852], [-7.75223809, 110.49123075], [-7.75226068, 110.49125490], [-7.75228294, 110.49127637],
     [-7.75238360, 110.49127673], [-7.75240818, 110.49125761], [-7.75243277, 110.49123379], [-7.75243443, 110.49113181], [-7.75241084, 110.49110464], [-7.75238659, 110.49108021]],
    [[-7.75192348, 110.49103359], [-7.75188993, 110.49106478], [-7.75185771, 110.49109934], [-7.75185571, 110.49125935], [-7.75188727, 110.49129491], [-7.75192182, 110.49132712],
     [-7.75208062, 110.49132703], [-7.75211417, 110.49129683], [-7.75214474, 110.49126228], [-7.75214773, 110.49110232], [-7.75211550, 110.49106676], [-7.75208428, 110.49103556]],
  ];
  const TITIK_PRISMA = PRISMA_GRUP.flatMap((g) => g.map((latlng, i) => ({ nama: "PRISMA " + (i + 1), latlng })));

  const AREA = [[-7.75121752, 110.49063025], [-7.75119493, 110.49227070], [-7.75282809, 110.49228678], [-7.75284090, 110.49063742]];

  // ----- icon marker -----
  const CANDI_STYLE = { utama: { bg: "#2a2119", border: "#ffda3d" }, wahana: { bg: "#3d6b65", border: "#ffffff" } };
  const candiIcon = (jenis) => L.divIcon({
    html: `<div style="width:22px;height:22px;border-radius:50%;background:${CANDI_STYLE[jenis].bg};border:3px solid ${CANDI_STYLE[jenis].border};box-shadow:0 2px 8px rgba(0,0,0,.35)"></div>`,
    className: "", iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12],
  });

  const TITIK_STYLE = {
    base: { color: "#c0392b", extra: "border-radius:2px;" },
    rover: { color: "#2563eb", extra: "border-radius:50%;" },
    prisma: { color: "#d97706", extra: "transform:rotate(45deg);" },
  };
  const titikIcon = (jenis) => L.divIcon({
    html: `<div style="width:12px;height:12px;background:${TITIK_STYLE[jenis].color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);${TITIK_STYLE[jenis].extra}"></div>`,
    className: "", iconSize: [12, 12], iconAnchor: [6, 6],
  });

  const popupCandi = (c) => `<div class="candi-popup"><img src="${c.img}" alt="${c.nama}" onerror="this.style.display='none'"/><strong>${c.nama}</strong><p>${c.desc}</p></div>`;
  const titikLayer = (arr, jenis, label) =>
    L.layerGroup(arr.map((t) =>
      L.marker(t.latlng, { icon: titikIcon(jenis) }).bindPopup(
        `<div class="titik-popup"><strong>${t.nama}</strong><br/>${label}<br/><small>${t.latlng[0].toFixed(5)}°, ${t.latlng[1].toFixed(5)}°</small></div>`
      )
    ));
  const candiLayer = (jenis) =>
    L.layerGroup(CANDI.filter((c) => c.jenis === jenis).map((c) =>
      L.marker(c.latlng, { icon: candiIcon(jenis) }).bindPopup(popupCandi(c), { maxWidth: 260, minWidth: 220 })
    ));

  // ----- inisialisasi peta -----
  const map = L.map("map", { center: CENTER, zoom: 16, zoomControl: false });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  const tile = (key) => L.tileLayer(BASEMAP[key].url, { attribution: BASEMAP[key].attribution, maxZoom: 22, maxNativeZoom: 19 });
  let basemap = tile("osm").addTo(map);

  const layers = {
    candi: candiLayer("utama"),
    wahana: candiLayer("wahana"),
    area: L.polygon(AREA, { color: "#7d5b83", weight: 1.5, opacity: 0.7, fillColor: "#7d5b83", fillOpacity: 0.05 })
      .bindPopup('<div class="titik-popup">Area Kompleks Prambanan</div>'),
    base: titikLayer(TITIK_BASE, "base", "Titik Base (Deformasi)"),
    rover: titikLayer(TITIK_ROVER, "rover", "Titik Rover (Deformasi)"),
    prisma: titikLayer(TITIK_PRISMA, "prisma", "Titik Prisma (Deformasi)"),
  };
  Object.values(layers).forEach((l) => l.addTo(map));

  // ----- koordinat kursor -----
  const coordBox = document.getElementById("peta-coords");
  const coordText = document.getElementById("peta-coords-text");
  map.on("mousemove", (e) => {
    coordBox.hidden = false;
    coordText.textContent = `${e.latlng.lat.toFixed(5)}°, ${e.latlng.lng.toFixed(5)}°`;
  });

  // ----- ganti basemap -----
  document.querySelectorAll("#basemap-tabs .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#basemap-tabs .tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
      map.removeLayer(basemap);
      basemap = tile(btn.dataset.basemap).addTo(map);
    });
  });

  // ----- on/off layer -----
  document.querySelectorAll(".layer-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const layer = layers[btn.dataset.layer];
      const nyala = btn.classList.toggle("on");
      nyala ? map.addLayer(layer) : map.removeLayer(layer);
    });
  });
})();
