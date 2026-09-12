(function () {
  "use strict";

  /* ---------------------------------------------------------
     Photo marquee in "Glimpse of Us" — the endless scroll is a
     plain CSS animation (see .glimpse-track in style.css); this
     just hides any photo file that fails to load so a broken-
     image icon doesn't show while photos are still being added.
     --------------------------------------------------------- */
  var glimpseTrack = document.getElementById("glimpseTrack");
  if (glimpseTrack) {
    Array.prototype.slice.call(glimpseTrack.querySelectorAll("img")).forEach(function (img) {
      img.addEventListener("error", function () { img.style.visibility = "hidden"; });
    });
  }

  /* ---------------------------------------------------------
     Countdown to the wedding (26 January 2027, India time)
     --------------------------------------------------------- */
  var cdDays = document.getElementById("cdDays");
  var cdHours = document.getElementById("cdHours");
  var cdMins = document.getElementById("cdMins");
  var cdSecs = document.getElementById("cdSecs");

  if (cdDays && cdHours && cdMins && cdSecs) {
    var weddingDate = new Date("2027-01-26T00:00:00+05:30").getTime();

    function pad(n) { return String(n).length < 2 ? "0" + n : String(n); }

    function updateCountdown() {
      var now = Date.now();
      var diff = weddingDate - now;

      if (diff <= 0) {
        cdDays.textContent = "00";
        cdHours.textContent = "00";
        cdMins.textContent = "00";
        cdSecs.textContent = "00";
        window.clearInterval(countdownTimer);
        return;
      }

      var totalSeconds = Math.floor(diff / 1000);
      var days = Math.floor(totalSeconds / 86400);
      var hours = Math.floor((totalSeconds % 86400) / 3600);
      var mins = Math.floor((totalSeconds % 3600) / 60);
      var secs = totalSeconds % 60;

      cdDays.textContent = pad(days);
      cdHours.textContent = pad(hours);
      cdMins.textContent = pad(mins);
      cdSecs.textContent = pad(secs);
    }

    updateCountdown();
    var countdownTimer = window.setInterval(updateCountdown, 1000);
  }

  /* ---------------------------------------------------------
     Scroll-reveal: fade/slide elements in as they enter view
     --------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* ---------------------------------------------------------
     Venue — "Add to Calendar" downloads a small .ics file
     covering both wedding days, so it works with any calendar
     app without needing an external service.
     --------------------------------------------------------- */
  var addToCalendarBtn = document.getElementById("addToCalendarBtn");
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener("click", function () {
      var ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Tina and Sahitya//Wedding//EN",
        "BEGIN:VEVENT",
        "UID:tina-sahitya-wedding-2027@wedding",
        "DTSTAMP:20270101T000000Z",
        "DTSTART;VALUE=DATE:20270126",
        "DTEND;VALUE=DATE:20270128",
        "SUMMARY:Tina & Sahitya's Wedding Celebrations",
        "LOCATION:JMD Resort\\, Mandu\\, Madhya Pradesh\\, India",
        "DESCRIPTION:Two days of celebrations in Mandu — from the welcome lunch to the midnight pheras.",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "Tina-and-Sahitya-Wedding.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    });
  }

  /* ---------------------------------------------------------
     Background music — starts once the envelope is opened
     (a real user tap), rather than trying to autoplay before
     the visitor has interacted with the page at all. Most
     browsers block sound-on autoplay anyway, so tying it to the
     envelope's open tap means it reliably starts right away
     instead of needing a second, unrelated tap somewhere on the
     page. The floating button still lets them pause/resume at
     any time.
     --------------------------------------------------------- */
  var music = document.getElementById("bgMusic");
  var musicToggle = document.getElementById("musicToggle");

  function markPlaying(isPlaying) {
    if (!musicToggle) return;
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  }

  if (music) {
    music.volume = 0.5;

    var armed = false;
    function armFirstInteractionPlay() {
      if (armed) return;
      armed = true;
      var start = function () {
        music.play().then(function () { markPlaying(true); }).catch(function () {});
        ["click", "touchstart", "keydown", "scroll"].forEach(function (evt) {
          document.removeEventListener(evt, start);
        });
      };
      ["click", "touchstart", "keydown", "scroll"].forEach(function (evt) {
        document.addEventListener(evt, start, { once: true, passive: true });
      });
    }

    document.addEventListener("envelope:open", function () {
      var p = music.play();
      if (p && typeof p.then === "function") {
        p.then(function () { markPlaying(true); }).catch(function () {
          // Browser still blocked it (e.g. reduced-motion auto-open with
          // no real tap) — fall back to starting on the next interaction.
          armFirstInteractionPlay();
        });
      }
    });

    music.addEventListener("pause", function () { markPlaying(false); });
    music.addEventListener("play", function () { markPlaying(true); });
  }

  if (musicToggle && music) {
    musicToggle.addEventListener("click", function () {
      if (music.paused) {
        music.play().catch(function () {});
      } else {
        music.pause();
      }
    });
  }
})();
