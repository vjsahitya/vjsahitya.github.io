/* ============================================================
   Envelope intro overlay behavior — Tina & Sahitya wedding site
   Exact port of the open/fade/unmount state machine from the
   "wedding-invite" (Repo 1) React build (src/routes/index.tsx):
     - locks scroll while the envelope is showing
     - tap seal / hint / skip -> adds "is-open" (flap opens,
       seal shrinks away)
     - 950ms later -> adds "is-gone" (700ms cross-fade out)
     - 1700ms later -> overlay is fully removed from the DOM
       and scroll is unlocked, revealing the site underneath
     - respects prefers-reduced-motion by skipping straight
       to the opened/removed state
   Vanilla JS, no build step required. Safe to load as a plain
   <script> tag; does not touch the React bundle in /assets.
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.getElementById("wed-envelope-overlay");
    if (!overlay) return;

    var seal = overlay.querySelector(".wed-envelope-seal");
    var hint = overlay.querySelector(".wed-envelope-hint");
    var skip = overlay.querySelector(".wed-envelope-skip");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var opened = false;

    function lockScroll() {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll() {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    function removeOverlay() {
      overlay.setAttribute("aria-hidden", "true");
      unlockScroll();
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }

    function openEnvelope() {
      if (opened) return;
      opened = true;
      overlay.classList.add("is-open");

      // Let the rest of the site know the invitation has been opened,
      // so background music can start now instead of autoplaying
      // before the visitor has done anything.
      document.dispatchEvent(new CustomEvent("envelope:open"));

      var fadeAt = reduce ? 20 : 950;
      var goneAt = reduce ? 40 : 1700;

      window.setTimeout(function () {
        overlay.classList.add("is-gone");
      }, fadeAt);

      window.setTimeout(removeOverlay, goneAt);
    }

    lockScroll();

    if (reduce) {
      openEnvelope();
    }

    if (seal) seal.addEventListener("click", openEnvelope);
    if (hint) hint.addEventListener("click", openEnvelope);
    if (skip) skip.addEventListener("click", openEnvelope);
  });
})();
