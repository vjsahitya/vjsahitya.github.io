(function () {
  "use strict";

  // Respect people who've asked for reduced motion — skip the whole feature.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var BUTTERFLY_COUNT = 3;

  // [main wing colour, accent/lower-wing colour] — pulled from the site palette
  var COLOR_PAIRS = [
    ["#c9a24b", "#f3c9a0"], // gold / peach
    ["#8e6bab", "#c9bde0"], // wine-purple / soft lavender
    ["#c97b8b", "#f0d7d7"]  // dusty rose / blush
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  var layer = document.createElement("div");
  layer.className = "butterfly-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  function butterflySvg(main, accent, id) {
    var gradId = "bfly-grad-" + id;
    return (
      '<svg class="butterfly-svg" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">' +
        "<defs>" +
          '<linearGradient id="' + gradId + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="' + main + '" />' +
            '<stop offset="100%" stop-color="' + accent + '" />' +
          "</linearGradient>" +
        "</defs>" +
        '<g class="wing wing-left">' +
          '<path d="M30,20 C16,0 -2,4 4,16 C7,25 20,25 30,20 Z" fill="url(#' + gradId + ')" />' +
          '<path d="M30,20 C20,28 10,36 15,38 C22,39 28,29 30,20 Z" fill="' + accent + '" opacity="0.85" />' +
          '<circle cx="13" cy="14" r="2" fill="#fff" opacity="0.5" />' +
        "</g>" +
        '<g class="wing wing-right">' +
          '<path d="M30,20 C44,0 62,4 56,16 C53,25 40,25 30,20 Z" fill="url(#' + gradId + ')" />' +
          '<path d="M30,20 C40,28 50,36 45,38 C38,39 32,29 30,20 Z" fill="' + accent + '" opacity="0.85" />' +
          '<circle cx="47" cy="14" r="2" fill="#fff" opacity="0.5" />' +
        "</g>" +
        '<path d="M30 10 C28 6 25 4 23 5 M30 10 C32 6 35 4 37 5" stroke="#3d2a1a" stroke-width="1" fill="none" stroke-linecap="round" />' +
        '<ellipse cx="30" cy="20" rx="1.6" ry="11" fill="#3d2a1a" />' +
        '<circle cx="30" cy="8" r="2.2" fill="#3d2a1a" />' +
      "</svg>"
    );
  }

  function createButterfly(i) {
    var pair = COLOR_PAIRS[i % COLOR_PAIRS.length];
    var b = document.createElement("button");
    b.type = "button";
    b.className = "butterfly";
    b.setAttribute("aria-label", "Butterfly — tap it");
    b.innerHTML = butterflySvg(pair[0], pair[1], i);
    layer.appendChild(b);
    return b;
  }

  function flyTo(b) {
    var x = rand(4, 92);
    var y = rand(6, 88);
    var duration = rand(5, 9);
    b.style.transitionDuration = duration + "s";
    b.style.left = x + "vw";
    b.style.top = y + "vh";
    b._flightTimer = window.setTimeout(function () { flyTo(b); }, duration * 1000);
  }

  function spawnFirework(x, y, colors) {
    var fw = document.createElement("div");
    fw.className = "firework";
    fw.style.left = x + "px";
    fw.style.top = y + "px";

    var count = 14;
    for (var i = 0; i < count; i++) {
      var particle = document.createElement("span");
      particle.className = "fw-particle";
      var angle = (Math.PI * 2 * i) / count;
      var dist = rand(36, 88);
      particle.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      particle.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      particle.style.background = colors[i % colors.length];
      fw.appendChild(particle);
    }

    document.body.appendChild(fw);
    window.setTimeout(function () { fw.remove(); }, 850);
  }

  function popButterfly(b, colors) {
    var rect = b.getBoundingClientRect();
    spawnFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, colors);

    if (b._flightTimer) window.clearTimeout(b._flightTimer);
    b.classList.add("is-gone");

    // Reappear elsewhere after a little while, so the garden never empties out
    window.setTimeout(function () {
      b.classList.remove("is-gone");
      flyTo(b);
    }, rand(7000, 12000));
  }

  for (var i = 0; i < BUTTERFLY_COUNT; i++) {
    (function (i) {
      var pair = COLOR_PAIRS[i % COLOR_PAIRS.length];
      var b = createButterfly(i);
      b.style.left = rand(4, 92) + "vw";
      b.style.top = rand(6, 88) + "vh";
      b.addEventListener("click", function () { popButterfly(b, pair); });
      window.setTimeout(function () { flyTo(b); }, rand(300, 1800));
    })(i);
  }
})();
