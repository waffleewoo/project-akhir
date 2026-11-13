// Navbar + animasi reveal saat scroll
(function () {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // navbar
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("nav-burger").addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll(".nav-menu a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  // reveal
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
