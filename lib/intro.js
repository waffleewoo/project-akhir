// Intro: kata-kata muncul acak lalu menyatu jadi satu kalimat
(function () {
  const SENTENCE = "NOTHING LASTS FOREVER EXCEPT THE STORIES WE LEAVE";
  const intro = document.getElementById("intro");
  const stage = document.getElementById("intro-stage");
  if (!intro || !stage) return;

  document.body.classList.add("intro-lock");

  const els = SENTENCE.split(" ").map((w) => {
    const s = document.createElement("span");
    s.className = "iw";
    s.textContent = w;
    stage.appendChild(s);
    return s;
  });

  const rand = (a, b) => a + Math.random() * (b - a);

  function finish() {
    // putar ulang animasi hero supaya kelihatan setelah intro
    document.querySelectorAll("#hero .fade-up").forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
    intro.classList.add("done");
    document.body.classList.remove("intro-lock");
    setTimeout(() => intro.remove(), 700);
  }

  // hitung posisi akhir tiap kata (kalimat rata tengah, otomatis turun baris)
  function layout() {
    const W = stage.clientWidth, H = stage.clientHeight;
    const mobile = W < 768;
    const gapX = mobile ? 10 : 22, gapY = mobile ? 6 : 14;
    const sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));

    const maxW = W * 0.88;
    const lines = [[]];
    let curW = 0;
    sizes.forEach((s, i) => {
      let add = s.w + (lines[lines.length - 1].length ? gapX : 0);
      if (curW + add > maxW && lines[lines.length - 1].length) {
        lines.push([]);
        curW = 0;
        add = s.w;
      }
      lines[lines.length - 1].push(i);
      curW += add;
    });

    const lineH = sizes[0].h;
    const totalH = lines.length * lineH + (lines.length - 1) * gapY;
    const startY = (H - totalH) / 2;
    const target = [];
    lines.forEach((line, li) => {
      const lw = line.reduce((a, i) => a + sizes[i].w, 0) + (line.length - 1) * gapX;
      let x = (W - lw) / 2;
      line.forEach((i) => {
        target[i] = { x, y: startY + li * (lineH + gapY) };
        x += sizes[i].w + gapX;
      });
    });
    return { W, H, sizes, target };
  }

  function play() {
    try {
      const L = layout();

      // 1) posisi acak
      els.forEach((el, i) => {
        const rx = rand(0.04, 0.96) * (L.W - L.sizes[i].w);
        const ry = rand(0.08, 0.88) * (L.H - L.sizes[i].h);
        el.style.transition = "none";
        el.style.transform = `translate(${rx}px,${ry}px)`;
      });

      // 2) muncul satu per satu
      const order = els.map((_, i) => i).sort(() => Math.random() - 0.5);
      void stage.offsetWidth;
      order.forEach((idx, n) => {
        setTimeout(() => {
          els[idx].style.transition = "opacity 0.8s ease";
          els[idx].classList.add("show");
        }, 250 + n * 220);
      });

      // 3) menyatu jadi kalimat
      const tShow = 250 + order.length * 220 + 1100;
      const tMerge = 1600, tHold = 2500;
      setTimeout(() => {
        els.forEach((el, i) => {
          el.style.transition = "transform 1.6s cubic-bezier(0.77,0,0.18,1), opacity 0.8s ease";
          el.style.transform = `translate(${L.target[i].x}px,${L.target[i].y}px)`;
        });
      }, tShow);

      // 4) tahan sebentar, lalu buka website
      setTimeout(finish, tShow + tMerge + tHold);
    } catch (e) {
      console.error("Intro error:", e);
      finish(); // jangan sampai website terkunci
    }
  }

  let started = false;
  const start = () => { if (!started) { started = true; play(); } };
  if (window.__loaderDone) setTimeout(start, 200);
  else window.addEventListener("loader-done", () => setTimeout(start, 300), { once: true });
})();
