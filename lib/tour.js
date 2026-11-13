// Virtual tour: denah isometrik candi + popup deskripsi
(function () {
  const TOUR_CANDI = {
    siwa: { nama: "Candi Siwa", sub: "Candi Utama · Trimurti", img: "./css/assets/candi/a_siwa.jpg", desc: "Di dalam candi utama ini terdapat empat bilik yang menyimpan arca Siwa Mahadewa, Durga Mahisasuramardini, Ganesha, dan Agastya. Relief Ramayana menghiasi bagian dalam pagar langkan, menghadirkan kisah epik Hindu melalui pahatan batu." },
    brahma: { nama: "Candi Brahma", sub: "Candi Utama · Trimurti", img: "./css/assets/candi/a_brahma.jpg", desc: "Ruang utama candi ini menyimpan arca Dewa Brahma dengan empat wajah yang melambangkan kemampuannya melihat ke segala arah. Relief Ramayana pada pagar langkannya melanjutkan kisah perjalanan Rama hingga pertempuran melawan Rahwana." },
    wisnu: { nama: "Candi Wisnu", sub: "Candi Utama · Trimurti", img: "./css/assets/candi/a_wisnu.jpg", desc: "Arca Dewa Wisnu bertangan empat menjadi pusat ruang utama candi ini. Pada pagar langkannya terdapat relief Kresnayana yang mengisahkan kehidupan dan kepahlawanan Kresna, salah satu awatara Dewa Wisnu." },
    angsa: { nama: "Candi Angsa", sub: "Candi Wahana · Brahma", img: "./css/assets/candi/angsa.jpg", desc: "Angsa atau Hamsa dikenal sebagai kendaraan Dewa Brahma dan dikaitkan dengan kebijaksanaan dalam tradisi Hindu. Candi ini merupakan bagian dari kelompok candi wahana yang berhadapan dengan candi-candi utama Trimurti." },
    nandi: { nama: "Candi Nandi", sub: "Candi Wahana · Siwa", img: "./css/assets/candi/a_nandi.jpg", desc: "Di ruang utama candi terdapat arca Nandi dalam posisi berbaring, melambangkan lembu suci yang menjadi kendaraan Dewa Siwa. Pada bagian dalamnya juga terdapat arca Surya dan Candra yang merepresentasikan matahari dan bulan." },
    garuda: { nama: "Candi Garuda", sub: "Candi Wahana · Wisnu", img: "./css/assets/candi/garuda.jpg", desc: "Garuda merupakan makhluk mitologi yang menjadi kendaraan Dewa Wisnu dan dikenal melalui kisah pengorbanan serta kesetiaannya dalam mitologi Hindu. Candi ini melengkapi susunan candi wahana yang berhadapan dengan tiga candi utama." },
  };

  // ===== gambar denah (SVG dibuat lewat kode) =====
  function buatDenah() {
    const iso = (u, v) => [448 + (u - v) * 95, 150 + (u + v) * 55];
    const pts = (a) => a.map((p) => p.join(",")).join(" ");

    // balok isometrik: cx,cy = titik tengah dasar, w = setengah lebar, h = tinggi
    function box(cx, cy, w, h, shade) {
      const kiri = `hsl(30,18%,${14 + shade}%)`, kanan = `hsl(30,18%,${9 + shade}%)`, atas = `hsl(30,15%,${21 + shade}%)`;
      return `<polygon points="${pts([[cx - w, cy], [cx, cy + w / 2], [cx, cy + w / 2 - h], [cx - w, cy - h]])}" fill="${kiri}"/>` +
             `<polygon points="${pts([[cx + w, cy], [cx, cy + w / 2], [cx, cy + w / 2 - h], [cx + w, cy - h]])}" fill="${kanan}"/>` +
             `<polygon points="${pts([[cx, cy - h - w / 2], [cx + w, cy - h], [cx, cy - h + w / 2], [cx - w, cy - h]])}" fill="${atas}"/>`;
    }

    // [lebar, tinggi] tiap tingkat candi dari bawah ke atas
    const TINGKAT = [[44, 8], [38, 6], [30, 26], [24, 14], [19, 14], [14, 14], [10, 12], [6, 10], [3, 8]];

    function candi(id, nama, u, v, skala) {
      const [cx, cy0] = iso(u, v);
      let cy = cy0, out = "";
      TINGKAT.forEach(([w, h], i) => {
        out += box(cx, cy, w * skala, h * skala, i * 1.5);
        cy -= h * skala;
      });
      const ly = cy - 16, tw = nama.length * 7.2 + 22;
      out += `<rect x="${cx - tw / 2}" y="${ly - 14}" width="${tw}" height="24" rx="12" fill="#fff"/>` +
             `<text x="${cx}" y="${ly + 3}" text-anchor="middle" font-size="12" font-weight="800" fill="#111">${nama}</text>`;
      return `<g class="fp-temple" data-candi="${id}">${out}</g>`;
    }

    // pohon: x,y = pangkal, s = skala
    const pohon = (x, y, s) =>
      `<ellipse cx="${x}" cy="${y + 1}" rx="${9 * s}" ry="${4 * s}" fill="rgba(0,0,0,.18)"/>` +
      `<rect x="${x - 1.6 * s}" y="${y - 9 * s}" width="${3.2 * s}" height="${10 * s}" fill="#5a4330"/>` +
      `<circle cx="${x}" cy="${y - 20 * s}" r="${11 * s}" fill="#3f7d4a"/>` +
      `<circle cx="${x - 6 * s}" cy="${y - 15 * s}" r="${8 * s}" fill="#4f9559"/>` +
      `<circle cx="${x + 6 * s}" cy="${y - 16 * s}" r="${8 * s}" fill="#357040"/>`;

    // random dengan seed tetap supaya posisi pohon tidak berubah tiap dimuat
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const sisi = [
      () => [-0.75, -0.6 + rnd() * 3.6],  // kiri
      () => [2.15, -0.6 + rnd() * 3.6],   // kanan
      () => [-0.4 + rnd() * 2.4, -0.75],  // belakang
      () => [-0.4 + rnd() * 2.4, 3.15],   // depan
    ];
    const JUMLAH_POHON = 9;
    const titikPohon = [];
    for (let i = 0; i < JUMLAH_POHON; i++) titikPohon.push(sisi[Math.floor(rnd() * 4)]());
    const trees = titikPohon
      .sort((p, q) => p[0] + p[1] - (q[0] + q[1]))
      .map(([u, v]) => { const [x, y] = iso(u, v); return pohon(x, y, 0.75 + rnd() * 0.3); })
      .join("");

    // alas halaman candi
    const A = iso(-0.9, -0.9), B = iso(2.3, -0.9), C = iso(2.3, 3.3), D = iso(-0.9, 3.3);
    const a = iso(-0.6, -0.6), b = iso(2.0, -0.6), c = iso(2.0, 3.0), d = iso(-0.6, 3.0);
    const T = 18;
    const alas =
      `<polygon points="${pts([D, C, [C[0], C[1] + T], [D[0], D[1] + T]])}" fill="#7d7364"/>` +
      `<polygon points="${pts([C, B, [B[0], B[1] + T], [C[0], C[1] + T]])}" fill="#5f574b"/>` +
      `<polygon points="${pts([A, B, C, D])}" fill="#b5a791"/>` +
      `<polygon points="${pts([a, b, c, d])}" fill="#9a8c76"/>`;

    const awan = (x, y, s) =>
      `<g fill="#fff" opacity=".92" transform="translate(${x} ${y}) scale(${s})">` +
      `<circle cx="0" cy="0" r="26"/><circle cx="30" cy="-12" r="32"/><circle cx="64" cy="0" r="26"/><circle cx="32" cy="12" r="26"/></g>`;

    // id, label, u, v, skala  (digambar dari belakang ke depan)
    const daftar = [
      ["wisnu", "CANDI WISNU", 0, 0, 0.62], ["siwa", "CANDI SIWA", 0, 1.2, 1], ["brahma", "CANDI BRAHMA", 0, 2.4, 0.62],
      ["garuda", "CANDI GARUDA", 1.4, 0, 0.5], ["nandi", "CANDI NANDI", 1.4, 1.2, 0.5], ["angsa", "CANDI ANGSA", 1.4, 2.4, 0.5],
    ].sort((p, q) => p[2] + p[3] - (q[2] + q[3]));

    return `<svg viewBox="0 0 800 500" class="floorplan-svg" xmlns="http://www.w3.org/2000/svg">` +
      awan(40, 70, 1.1) + awan(640, 120, 0.9) + awan(560, 470, 1.2) +
      alas + trees + daftar.map((t) => candi(...t)).join("") + `</svg>`;
  }

  document.getElementById("fp-svg").innerHTML = buatDenah();

  // ===== popup deskripsi candi =====
  const card = document.getElementById("floorplan");
  const POP_W = 300, POP_H = 400;

  function tutup() {
    const p = card.querySelector(".tour-pop");
    if (p) p.remove();
  }

  card.addEventListener("click", (e) => {
    const g = e.target.closest("[data-candi]");
    if (!g) { if (!e.target.closest(".tour-pop")) tutup(); return; }

    const data = TOUR_CANDI[g.dataset.candi];
    const cr = card.getBoundingClientRect();
    const lbl = g.querySelector("rect").getBoundingClientRect(); // pil putih = label nama

    let x = lbl.right - cr.left + 12;                                  // default: di kanan label
    if (x + POP_W > cr.width) x = lbl.left - cr.left - 12 - POP_W;     // kalau tidak muat, ke kiri
    const y = Math.max(10, Math.min(lbl.top - cr.top, cr.height - POP_H - 10));

    tutup();
    const pop = document.createElement("div");
    pop.className = "tour-pop";
    pop.style.left = x + "px";
    pop.style.top = y + "px";
    pop.innerHTML =
      `<button class="tour-pop-close" aria-label="Tutup">×</button>
       <div class="tour-pop-img" style="background-image:url('${data.img}')"></div>
       <div class="label tour-pop-sub">${data.sub}</div>
       <h4 class="tour-pop-title">${data.nama}</h4>
       <p class="tour-pop-text">${data.desc}</p>`;
    pop.querySelector(".tour-pop-close").addEventListener("click", tutup);
    card.appendChild(pop);
  });

  window.addEventListener("resize", tutup);
})();
