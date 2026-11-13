// Carousel foto arsip di section Pengenalan
(function () {
  const FOTO = [
    { nama: "De Prambanan · CA. 1915", img: "./css/assets/De Prambanan.jpg" },
    { nama: "Prambanan · CA. 1900", img: "./css/assets/Prambanan.jpg" },
    { nama: "Tjandi Prambanan · CA. 1889-1890", img: "./css/assets/Tjandi Prambanan.jpg" },
    { nama: "Tjandi Prambanan · CA. 1889-1890", img: "./css/assets/Tjandi Prambanan - Siwa.jpg" },
    { nama: "Prambanan bij Jogjakarta · CA. 1941-1953", img: "./css/assets/Prambanan bij Jogjakarta.jpg" },
  ];
  const n = FOTO.length;
  const stage = document.getElementById("ic-stage");
  const dotsBox = document.getElementById("ic-dots");
  let idx = 0;

  const cards = FOTO.map((f, i) => {
    const c = document.createElement("div");
    c.className = "ic-card";
    c.innerHTML = `<div class="ic-img" style="background-image:url('${f.img}')"></div>
      <div class="ic-name">${f.nama}<span class="ic-source">Source: Leiden University Libraries</span></div>`;
    c.addEventListener("click", () => { idx = i; render(); });
    stage.appendChild(c);
    return c;
  });
  const dots = FOTO.map((_, i) => {
    const d = document.createElement("span");
    d.addEventListener("click", () => { idx = i; render(); });
    dotsBox.appendChild(d);
    return d;
  });

  function render() {
    cards.forEach((c, i) => {
      let d = i - idx;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const abs = Math.abs(d);
      c.classList.toggle("active", d === 0);
      c.style.transform = `translateX(calc(-50% + ${d * 62}%)) scale(${d === 0 ? 1 : 0.82}) rotate(${d * 2}deg)`;
      c.style.opacity = abs > 1 ? 0 : d === 0 ? 1 : 0.55;
      c.style.zIndex = 10 - abs;
      c.style.pointerEvents = abs > 1 ? "none" : "auto";
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === idx));
  }

  const go = (d) => { idx = (idx + d + n) % n; render(); };
  document.getElementById("ic-prev").addEventListener("click", () => go(-1));
  document.getElementById("ic-next").addEventListener("click", () => go(1));
  render();
})();
