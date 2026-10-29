(function () {
  var CREDITS = [
    ["Dikembangkan oleh", "Azha Yuniati"],
    ["Dosen pembimbing", "Ir. Erlyna Nour Arrofiqoh, S.T., M.Eng."],
    ["Program studi", "Teknologi Survei dan Pemetaan Dasar"],
    ["Institusi", "Sekolah Vokasi, UGM"]
  ];

  function buildFooter() {
    var f = document.createElement("footer");
    f.id = "credit-footer";
    f.classList.add("credit-footer");
        f.innerHTML =
      '<div class="cf-main">' +
        '<div class="cf-left">' +
          '<p class="cf-tag">Nothing lasts forever except the stories we leave</p>' +
          '<div class="cf-credits">' +
            CREDITS.map(function (c) {
              return '<div class="cf-item"><span class="cf-label">' + c[0] + '</span><span class="cf-name">' + c[1] + "</span></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="cf-bottom"><span>WebGIS Candi Prambanan</span><span>© 2026. Proyek Akhir — Sekolah Vokasi UGM</span><a href="#hero">Kembali ke atas ↑</a></div>';
    return f;
  }

  function hideInfoCard() {
    var els = document.querySelectorAll("#root *");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0 && /^\s*informasi proyek\s*$/i.test(el.textContent)) {
        var c = el;
        while (c && c !== document.body) {
          var cs = getComputedStyle(c);
          if (cs.backgroundColor === "rgb(31, 41, 55)" && parseFloat(cs.borderTopLeftRadius) > 0) {
            c.setAttribute("data-hide", "1");
            return true;
          }
          c = c.parentElement;
        }
      }
    } return false;
  }

  var obs = new MutationObserver(run);
  function run() {
    var root = document.getElementById("root");
    if (!root || !root.children.length) return;
    var hidden = hideInfoCard();
    if (!document.getElementById("credit-footer")) {
      root.insertAdjacentElement("afterend", buildFooter());
    }
    if (hidden) obs.disconnect();
  }

  obs.observe(document.body, { childList: true, subtree: true });
  run();
})();