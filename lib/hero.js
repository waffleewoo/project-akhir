// Hero: ubah warna material model 3D jadi coklat muda
(function () {
  const mv = document.getElementById("hero-3d");
  if (!mv) return;
  mv.addEventListener("load", () => {
    if (!mv.model) return;
    mv.model.materials.forEach((mat) => {
      const pbr = mat.pbrMetallicRoughness;
      pbr.setBaseColorFactor([0.78, 0.62, 0.45, 1]);
      pbr.setMetallicFactor(0);
      pbr.setRoughnessFactor(0.9);
    });
  });
})();
