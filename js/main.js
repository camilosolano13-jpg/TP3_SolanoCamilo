/**
 * RPM Québec — main.js
 * Regroupe : menu mobile, révélation au défilement (IntersectionObserver),
 * accordéon FAQ, filtre de tutoriels par catégorie, et enregistrement du
 * Service Worker (PWA) + invite d'installation.
 *
 * Technique de révélation au défilement inspirée de l'article
 * "Animate elements as they scroll into view" (web.dev) :
 * https://web.dev/articles/intersectionobserver-v2 (source documentée dans README.md)
 */
(function () {
  "use strict";

  /* ---------------- Menu mobile ---------------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("navbar__menu--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------------- Révélation au défilement (animation #1) ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("reveal--visible");
    });
  }

  /* ---------------- Accordéon FAQ (animation #2 : transition CSS grid-template-rows) ---------------- */
  var accordionButtons = document.querySelectorAll(".accordion__button");
  accordionButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var icon = btn.querySelector(".accordion__icon");

      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("accordion__panel--open", !expanded);
      if (icon) icon.classList.toggle("accordion__icon--open", !expanded);
    });
  });

  /* ---------------- Filtre de tutoriels par catégorie ---------------- */
  var tagButtons = document.querySelectorAll(".tag[data-filter]");
  var tutoCards = document.querySelectorAll("#tutoGrid [data-category]");
  var tutoEmpty = document.getElementById("tutoEmpty");
  tagButtons.forEach(function (tag) {
    tag.addEventListener("click", function () {
      tagButtons.forEach(function (t) {
        t.classList.remove("tag--active");
        t.setAttribute("aria-pressed", "false");
      });
      tag.classList.add("tag--active");
      tag.setAttribute("aria-pressed", "true");

      var filter = tag.getAttribute("data-filter");
      var visibleCount = 0;
      tutoCards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("hidden", !match);
        if (match) visibleCount++;
      });
      if (tutoEmpty) tutoEmpty.classList.toggle("hidden", visibleCount !== 0);
    });
  });

  /* ---------------- PWA : enregistrement du Service Worker ---------------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function (err) {
        console.warn("Échec de l'enregistrement du Service Worker :", err);
      });
    });
  }

  /* ---------------- PWA : invite d'installation personnalisée ---------------- */
  var deferredPrompt = null;
  var installBtn = document.getElementById("installBtn");
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove("hidden");
  });
  if (installBtn) {
    installBtn.addEventListener("click", function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        installBtn.classList.add("hidden");
      });
    });
  }
})();
