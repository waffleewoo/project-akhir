// Riwayat penelitian: foto menggantung di tali miring, menumpuk ke kanan-atas
(function () {
  const HISTORY = [
    { year: "2020", title: "Pengukuran Awal", desc: "Pengukuran Prambanan dengan LiDAR dan UAV (tampak atas)", img: "./css/assets/history/2020.jpg", link: "https://ugm.ac.id/id/berita/19987-sv-ugm-buat-dokumentasi-digital-3d-candi-prambanan/", linkText: "Baca selengkapnya" },
    { year: "2021", title: "Titik Pemantauan", desc: "Penetapan persebaran titik pemantauan deformasi", img: "./css/assets/history/2021.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
    { year: "2022", title: "Deformasi Kala 1", desc: "Pemantauan deformasi kala 1", img: "./css/assets/history/2022.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
    { year: "2023", title: "Deformasi Kala 2", desc: "Pemantauan deformasi kala 2", img: "./css/assets/history/2023-a.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
    { year: "2023", title: "UAV Oblique", desc: "Pengukuran dengan UAV (oblique)", img: "./css/assets/history/2023-b.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
    { year: "2023", title: "Pengukuran TLS", desc: "Pengukuran menggunakan Terrestrial Laser Scanner (TLS)", img: "./css/assets/history/2023-c.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
    { year: "2024", title: "Deformasi Kala 3", desc: "Pemantauan deformasi kala 3", img: "./css/assets/history/2024-a.jpg", link: "https://tsp.sv.ugm.ac.id/2024/10/14/prodi-teknologi-survei-dan-pemetaan-dasar-melakukan-penelitian-pemantauan-deformasi-di-candi-prambanan/", linkText: "Baca selengkapnya" },
    { year: "2024", title: "Pembuatan Model 3D", desc: "Pembuatan model 3D Candi Siwa", img: "./css/assets/history/2024-b.jpg", link: "https://tsp.sv.ugm.ac.id/2024/10/15/penelitian-pemodelan-3d-candi-prambanan-oleh-program-studi-sarjana-terapan-teknologi-survei-dan-pemetaan-dasar-ugm/", linkText: "Baca selengkapnya" },
    { year: "2025", title: "Deformasi Kala 4", desc: "Pemantauan deformasi kala 4", img: "./css/assets/history/2025-a.jpg", link: "https://tsp.sv.ugm.ac.id/2025/10/31/studi-deformasi-candi-prambanan-untuk-menjaga-warisan-budaya-unesco/", linkText: "Baca selengkapnya" },
    { year: "2025", title: "Pembuatan Virtual Tour", desc: "Pembuatan virtual tour", img: "./css/assets/history/2025-b.jpg", link: "https://tsp.sv.ugm.ac.id/category/info-tspd/", linkText: "Baca selengkapnya" },
  ];
  const n = HISTORY.length;
  const VIS = 4;            // jumlah kartu di belakang kartu depan saat scroll selesai
  const MAXI = n - 1 - VIS; // scroll berhenti saat kartu 2025 terakhir sampai di posisi paling belakang

  // ===== pengaturan tampilan (ubah di sini kalau perlu) =====
  const R = 0.9;      // rasio mengecil per kartu ke belakang (makin kecil = makin cepat mengecil)
  const SKEW = 9;     // kemiringan sisi atas kartu (derajat)
  const STEP_X = 0.27; // jarak geser ke kanan per kartu (x lebar kartu)
  const STEP_Y = 0.5;  // naiknya relatif terhadap geser kanan (0.5 = tali sekitar 26°)

  const stack = document.getElementById("hx-stack");
  const scene = document.getElementById("hx-scene");
  const string = document.getElementById("hx-string");
  const wrap = document.getElementById("hx-wrap");
  const detail = document.getElementById("hx-detail");
  const elYear = document.getElementById("hx-d-year");
  const elTitle = document.getElementById("hx-d-title");
  const elLink = document.getElementById("hx-d-link");
  const elDesc = document.getElementById("hx-d-desc");
  const elImg = document.getElementById("hx-d-img");
  const elCount = document.getElementById("hx-count");
  const NAV_H = 72;
  let idx = 0;

  // ===== buat kartu =====
  stack.innerHTML = HISTORY.map((h, i) =>
    `<div class="hx-card" data-i="${i}" style="z-index:${n - i}">
      <div class="hx-face" style="background-image:url('${h.img}')"></div>
      <span class="hx-clip"></span>
      <span class="hx-note">${h.year}</span>
    </div>`).join("");
  const cards = [...stack.querySelectorAll(".hx-card")];

  // ===== posisi kartu =====
  let W = 0, H = 0, cw = 0, ch = 0, x0 = 0, y0 = 0, ax = 0, ay = 0;
  let cur = 0, target = 0, raf = null;

  function layout() {
    W = scene.clientWidth;
    H = scene.clientHeight;
    cw = W < 768 ? W * 0.72 : Math.min(W * 0.36, 640);
    ch = cw * 0.625;
    x0 = W < 768 ? W * 0.04 : W * 0.24;   // makin besar = makin ke kanan
    y0 = W < 768 ? H * 0.55 : H * 0.42;   // makin kecil = makin naik
    ax = cw * STEP_X;
    ay = -ax * STEP_Y;

    cards.forEach((c) => { c.style.width = cw + "px"; c.style.height = ch + "px"; });

    // tali lurus melewati semua penjepit
    const deg = Math.atan2(ay, ax) * 180 / Math.PI;
    // tali: memanjang ke kiri-bawah (kartu keluar), berhenti tepat di kartu paling belakang
    const rad = deg * Math.PI / 180;
    const kEnd = (1 - Math.pow(R, VIS)) / (1 - R);
    const LL = 2000;                                        // panjang ke kiri-bawah
    const LR = Math.hypot(ax * kEnd, ay * kEnd) + 40;       // panjang ke kanan-atas
    string.style.transformOrigin = "0 0";
    string.style.width = LL + LR + "px";
    string.style.left = x0 - LL * Math.cos(rad) + "px";
    string.style.top = y0 - LL * Math.sin(rad) + "px";
    string.style.transform = `rotate(${deg}deg)`;

    wrap.style.height = MAXI * window.innerHeight * 0.5 + window.innerHeight - NAV_H + "px";
  }

  function draw() {
    cur += (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.001) cur = target;

    cards.forEach((c, i) => {
      const d = i - cur;                               // 0 = kartu paling depan
      const k = (1 - Math.pow(R, d)) / (1 - R);        // jarak sepanjang tali (perspektif)
      const s = Math.pow(R, d);
      c.style.transform = `translate(${x0 + ax * k}px, ${y0 + ay * k}px) scale(${s}) skewY(${SKEW}deg)`;

      let o = 1;
      if (d < -0.4) o = Math.max(0, 1 + (d + 0.4) * 1.4);   // keluar ke kiri-bawah
      if (d > 7) o = Math.max(0, (9 - d) / 2);             // menghilang di kejauhan
      c.style.opacity = o;
      c.style.pointerEvents = o > 0.5 ? "auto" : "none";
    });

    raf = cur !== target ? requestAnimationFrame(draw) : null;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

  // ===== scroll -> posisi =====
  function onScroll() {
    const total = wrap.offsetHeight - (window.innerHeight - NAV_H) || 1;
    const p = Math.min(Math.max((NAV_H - wrap.getBoundingClientRect().top) / total, 0), 1);
    target = p * MAXI;
    kick();
  }
  function onResize() { layout(); onScroll(); kick(); }

  layout();
  cur = target = 0;
  draw();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", onResize);

  // ===== detail full section =====
  function fill(i) {
    const h = HISTORY[i];
    elYear.textContent = h.year;
    elTitle.textContent = h.title;
    if (h.link) {
      elLink.href = h.link;
      elLink.textContent = (h.linkText || "Baca berita penelitian") + " ↗";
      elLink.hidden = false;
    } else {
      elLink.hidden = true;
    }
    elDesc.textContent = h.desc;
    elImg.style.backgroundImage = `url('${h.img}')`;
    elCount.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  }
  function open(i) {
    idx = i;
    fill(i);
    detail.classList.add("open");
    detail.setAttribute("aria-hidden", "false");
    document.body.classList.add("hx-lock");
  }
  function close() {
    detail.classList.remove("open");
    detail.setAttribute("aria-hidden", "true");
    document.body.classList.remove("hx-lock");
  }
  function go(d) {
    idx = (idx + d + n) % n;
    detail.classList.add("swap");
    setTimeout(() => { fill(idx); detail.classList.remove("swap"); }, 250);
  }

  stack.addEventListener("click", (e) => {
    const c = e.target.closest(".hx-card");
    if (c) open(+c.dataset.i);
  });
  document.getElementById("hx-close").addEventListener("click", close);
  document.getElementById("hx-prev").addEventListener("click", () => go(-1));
  document.getElementById("hx-next").addEventListener("click", () => go(1));
  window.addEventListener("keydown", (e) => {
    if (!detail.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
})();