// Section Data: scroll vertikal digeser jadi gerak horizontal
(function () {
  const DATA = [
    { nama: "LiDAR", imgs: ["./css/assets/sensor/uav-lidar.jpg", "./css/assets/sensor/closerange-lidar.jpg"] },
    { nama: "Fotogrametri", imgs: ["./css/assets/sensor/frame_camera_fotogrametri.jpg", "./css/assets/sensor/360_fotogrametri.jpg"] },
    { nama: "GNSS / RTK", imgs: ["./css/assets/sensor/gnss-statik.jpeg", "./css/assets/sensor/gnss-rtk.jpeg"] },
    { nama: "TLS", imgs: ["./css/assets/sensor/tls.png", "./css/assets/sensor/tls2.png"] },
    { nama: "Drone UAV", imgs: ["./css/assets/sensor/closerange_uav.jpg", "./css/assets/sensor/cr-uav2.jpeg"] },
  ];
  const wrap = document.getElementById("hs-wrap");
  const track = document.getElementById("hs-track");
  const NAV_H = 72;

  // kartu + slideshow foto (ganti tiap 3 detik, mulai bergantian)
  DATA.forEach((d, i) => {
    const card = document.createElement("div");
    card.className = "hs-card";
    card.innerHTML =
      `<span class="hs-num">${String(i + 1).padStart(2, "0")}</span>
       <div class="hs-img">${d.imgs.map((src, k) => `<div class="hs-slide${k === 0 ? " on" : ""}" style="background-image:url('${src}')"></div>`).join("")}</div>
       <div class="hs-name">${d.nama}</div>`;
    track.appendChild(card);

    const slides = card.querySelectorAll(".hs-slide");
    let cur = 0;
    setTimeout(() => setInterval(() => {
      slides[cur].classList.remove("on");
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add("on");
    }, 3000), i * 500);
  });

  let dist = 0;
  function hitung() {
    dist = Math.max(0, track.scrollWidth - window.innerWidth);
    wrap.style.height = dist + window.innerHeight - NAV_H + "px";
  }
  function geser() {
    const total = wrap.offsetHeight - (window.innerHeight - NAV_H) || 1;
    const p = Math.min(Math.max((NAV_H - wrap.getBoundingClientRect().top) / total, 0), 1);
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
  }
  const onResize = () => { hitung(); geser(); };

  hitung();
  geser();
  window.addEventListener("scroll", geser, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", onResize);
})();
