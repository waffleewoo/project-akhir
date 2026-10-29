(function () {
  var MODEL_SRC = "./model/candi_siwa.glb"; // sesuaikan

  function leaf(root, re) {
    var els = root.querySelectorAll("*");
    for (var i = 0; i < els.length; i++) {
      if (els[i].children.length === 0 && re.test(els[i].textContent)) return els[i];
    }
    return null;
  }

  function copyFont(from, to) {
    var cs = getComputedStyle(from);
    to.style.fontFamily = cs.fontFamily;
    to.style.fontStyle = cs.fontStyle;
    to.style.fontWeight = cs.fontWeight;
    to.style.color = cs.color;
  }

  function initNav() {
    var link = leaf(document.body, /^\s*Pengenalan\s*$/);
    if (!link) return false;
    var group = link.parentElement;
    if (group.children.length < 3 && group.parentElement) group = group.parentElement;
    group.classList.add("nav-center");
    var hdr = group.closest("header, nav") || group.parentElement;
    if (getComputedStyle(hdr).position === "static") hdr.style.position = "relative";

    var items = hdr.querySelectorAll("a, button");
    for (var i = 0; i < items.length; i++) {
      if (/Buka\s*Peta/i.test(items[i].textContent)) { items[i].classList.add("nav-cta"); break; }
    }
    return true;
  }

  function initHero() {
    var hero = document.getElementById("hero");
    if (!hero) return false;
    if (hero.querySelector("#hero-center")) return true;
    var h1s = Array.prototype.slice.call(hero.querySelectorAll("h1"));
    if (!h1s.length) return false;
    if (getComputedStyle(hero).position === "static") hero.style.position = "relative";
    hero.classList.add("hero-centered");

    var ebSrc = leaf(hero, /WebGIS\s+Interaktif/i);

    var overlay = document.createElement("div");
    overlay.id = "hero-center";

    // label di atas judul
    var eb = document.createElement("div");
    eb.className = "hc-eyebrow";
    eb.textContent = ebSrc ? ebSrc.textContent.trim() : "WebGIS Interaktif · Proyek Akhir TSPD";
    overlay.appendChild(eb);

    // judul (salin font & warna tiap baris dari aslinya)
    var title = document.createElement("div");
    title.className = "hc-title";
    overlay.appendChild(title);
    h1s.forEach(function (h) {
        var line = document.createElement("span");
        line.className = "hc-line";
        line.textContent = h.textContent.trim();
        copyFont(h, line);
        title.appendChild(line);
    });

    // model 3D
    var mv = document.createElement("model-viewer");
    mv.id = "hero-3d";
    mv.setAttribute("src", MODEL_SRC);
    mv.setAttribute("alt", "Model 3D Candi Siwa");
    mv.setAttribute("auto-rotate", "");
    mv.setAttribute("rotation-per-second", "20deg");
    mv.setAttribute("camera-controls", "");
    mv.setAttribute("disable-zoom", "");
    mv.setAttribute("interaction-prompt", "none");
    mv.setAttribute("camera-orbit", "30deg 70deg auto");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("exposure", "0.9");
    mv.setAttribute("shadow-intensity", "0");
    mv.setAttribute("loading", "eager");
    mv.addEventListener("error", function (e) { console.error("model-viewer error:", e.detail || e); });
    mv.addEventListener("load", function () {
        var materials = mv.model.materials;
        for (var i = 0; i < materials.length; i++) {
            var pbr = materials[i].pbrMetallicRoughness;
            pbr.setBaseColorFactor([0.78, 0.62, 0.45, 1]); // coklat muda
            pbr.setMetallicFactor(0);
            pbr.setRoughnessFactor(0.9);
        }
    });

    overlay.appendChild(mv);

    if (!customElements.get("model-viewer")) console.warn("model-viewer belum ter-load, cek <script> di index.html");

    hero.appendChild(overlay);

    h1s.forEach(function (h) { h.classList.add("hero-orig-hide"); });

    if (ebSrc) ebSrc.classList.add("hero-orig-hide");
    return true;
  }

  function init() {
    var a = initHero();
    var b = initNav();
    return a && b;
  }

  var obs = new MutationObserver(function () { if (init()) obs.disconnect(); });
  obs.observe(document.body, { childList: true, subtree: true });
  if (init()) obs.disconnect();
})();