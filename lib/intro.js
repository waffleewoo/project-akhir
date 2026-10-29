(function () {
    var SENTENCE = "NOTHING LASTS FOREVER EXCEPT THE STORIES WE LEAVE";
    var intro = document.getElementById("intro");
    var stage = document.getElementById("intro-stage");
    if (!intro || !stage) return;

    document.body.classList.add("intro-lock");

    var words = SENTENCE.split(" ");
    var els = words.map(function (w) {
        var s = document.createElement("span");
        s.className = "iw";
        s.textContent = w;
        stage.appendChild(s);
        return s;
    });

    function finish() {
        document.querySelectorAll("#hero .animate-fade-up").forEach(function (el) {
            el.style.animation = "none";
            void el.offsetWidth;
            el.style.animation = "";
        });
        intro.classList.add("done");
        document.body.classList.remove("intro-lock");
        setTimeout(function () { intro.remove(); }, 700);
    }

    function layout() {
        var W = stage.clientWidth;
        var H = stage.clientHeight;
        var mobile = W < 768;
        var gapX = mobile ? 10 : 22;
        var gapY = mobile ? 6 : 14;

        var sizes = els.map(function (el) {
            return { w: el.offsetWidth, h: el.offsetHeight };
        });

        var maxW = W * 0.88;
        var lines = [[]];
        var curW = 0;
        sizes.forEach(function (s, i) {
            var add = s.w + (lines[lines.length - 1].length ? gapX : 0);
            if (curW + add > maxW && lines[lines.length - 1].length) {
                lines.push([]);
                curW = 0;
                add = s.w;
            }
            lines[lines.length - 1].push(i);
            curW += add;
        });

        var lineH = sizes[0].h;
        var totalH = lines.length * lineH + (lines.length - 1) * gapY;
        var startY = (H - totalH) / 2;

        var target = [];
        lines.forEach(function (line, li) {
            var lw = line.reduce(function (a, i) { return a + sizes[i].w; }, 0) + (line.length - 1) * gapX;
            var x = (W - lw) / 2;
            line.forEach(function (i) {
                target[i] = { x: x, y: startY + li * (lineH + gapY) };
                x += sizes[i].w + gapX;
            });
        });

        return { W: W, H: H, sizes: sizes, target: target };
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function play() {
        try {
            var L = layout();

            // 1) Posisi acak
            els.forEach(function (el, i) {
                var rx = rand(0.04, 0.96) * (L.W - L.sizes[i].w);
                var ry = rand(0.08, 0.88) * (L.H - L.sizes[i].h);
                el.style.transition = "none";
                el.style.transform = "translate(" + rx + "px," + ry + "px)";
            });

            // 2) Muncul satu per satu
            var order = els.map(function (_, i) { return i; })
            .sort(function () { return Math.random() - 0.5; });
            void stage.offsetWidth;
            order.forEach(function (idx, n) {
                setTimeout(function () {
                    els[idx].style.transition = "opacity 0.8s ease";
                    els[idx].classList.add("show");
                }, 250 + n * 220);
            });

            // 3) Menyatu jadi satu kalimat
            var tShow  = 250 + order.length * 220 + 1100;
            var tMerge = 1600;
            var tHold  = 2500;   // jeda kalimat ditahan (ms)

            setTimeout(function () {
                els.forEach(function (el, i) {
                    el.style.transition =
                        "transform 1.6s cubic-bezier(0.77,0,0.18,1), opacity 0.8s ease";
                    el.style.transform =
                        "translate(" + L.target[i].x + "px," + L.target[i].y + "px)";
                });
            }, tShow);

            // 4) Tahan, lalu buka website
            setTimeout(finish, tShow + tMerge + tHold);
        } catch (e) {
            console.error("Intro error:", e);
            finish(); // jangan sampai website terkunci
        }
    }

    var started = false;
    function start() {
        if (started) return;
        started = true;
        play();
    }
    if (window.__loaderDone) setTimeout(start, 200);
    else window.addEventListener("loader-done", function () { setTimeout(start, 300); }, { once: true });
})();