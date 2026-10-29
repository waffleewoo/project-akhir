(function () {
  var loader = document.getElementById("loader");
  var fill = document.getElementById("ld-fill");
  if (!loader || !fill) { window.__loaderDone = true; return; }
  if (window.__isMobileBlocked) return;

  var MIN_TIME = 2200;               // durasi minimum loading (ms)
  var t0 = performance.now();
  var progress = 0, target = 25;
  var fontsOk = false, pageOk = false;

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { fontsOk = true; target = Math.max(target, 60); });
  } else { fontsOk = true; }

  function onLoad() { pageOk = true; target = Math.max(target, 90); }
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);
  setTimeout(function () { fontsOk = pageOk = true; }, 6000); // cadangan

  function finish() {
    window.__loaderDone = true;
    loader.classList.add("done");
    window.dispatchEvent(new Event("loader-done"));
    setTimeout(function () { loader.remove(); }, 800);
  }

  function tick() {
    if (fontsOk && pageOk && window.__modelReady && performance.now() - t0 >= MIN_TIME) target = 100;
    progress += (target - progress) * 0.06;
    fill.style.width = progress + "%";
    if (progress > 99.5) { fill.style.width = "100%"; setTimeout(finish, 250); return; }
    requestAnimationFrame(tick);
  }
  tick();
})();