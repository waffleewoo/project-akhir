// Loading screen: progress bar naik pelan sampai font + halaman siap
(function () {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("ld-fill");
  if (!loader || !fill) { window.__loaderDone = true; return; }

  const MIN_TIME = 2200; // durasi minimum (ms)
  const t0 = performance.now();
  let progress = 0, target = 25;
  let fontsOk = false, pageOk = false;

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { fontsOk = true; target = Math.max(target, 60); });
  } else fontsOk = true;

  const onLoad = () => { pageOk = true; target = Math.max(target, 90); };
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);
  setTimeout(() => { fontsOk = pageOk = true; }, 6000); // cadangan kalau ada yg macet

  function finish() {
    window.__loaderDone = true;
    loader.classList.add("done");
    window.dispatchEvent(new Event("loader-done"));
    setTimeout(() => loader.remove(), 800);
  }

  function tick() {
    if (fontsOk && pageOk && performance.now() - t0 >= MIN_TIME) target = 100;
    progress += (target - progress) * 0.06;
    fill.style.width = progress + "%";
    if (progress > 99.5) { fill.style.width = "100%"; setTimeout(finish, 250); return; }
    requestAnimationFrame(tick);
  }
  tick();
})();
