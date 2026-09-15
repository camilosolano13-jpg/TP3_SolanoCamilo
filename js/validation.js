/**
 * RPM Québec — validation.js
 * Validation JavaScript personnalisée du formulaire de contact.
 * La validation HTML5 native est désactivée via l'attribut `novalidate`
 * sur le formulaire (voir contact.html) ; toutes les règles ci-dessous
 * sont écrites à la main, sans s'appuyer sur les messages du navigateur.
 */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var status = document.getElementById("formStatus");

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;

  /**
   * Chaque règle reçoit le FormData et retourne true si le champ est valide.
   */
  var rules = {
    prenom: function () {
      return form.prenom.value.trim().length >= 2;
    },
    nom: function () {
      return form.nom.value.trim().length >= 2;
    },
    courriel: function () {
      return EMAIL_RE.test(form.courriel.value.trim());
    },
    telephone: function () {
      var val = form.telephone.value.trim();
      return val === "" || PHONE_RE.test(val);
    },
    ville: function () {
      return form.ville.value.trim().length >= 2;
    },
    sujet: function () {
      return form.sujet.value !== "";
    },
    message: function () {
      return form.message.value.trim().length >= 10;
    },
    conditions: function () {
      return form.conditions.checked;
    },
  };

  function setFieldValidity(fieldName, isValid) {
    var group = form.querySelector('[data-field="' + fieldName + '"]');
    if (!group) return;
    group.classList.toggle("form__group--invalid", !isValid);
  }

  function validateField(fieldName) {
    var rule = rules[fieldName];
    if (!rule) return true;
    var isValid = rule();
    setFieldValidity(fieldName, isValid);
    return isValid;
  }

  function validateAll() {
    var isFormValid = true;
    var firstInvalid = null;

    Object.keys(rules).forEach(function (fieldName) {
      var valid = validateField(fieldName);
      if (!valid) {
        isFormValid = false;
        if (!firstInvalid) {
          firstInvalid = form.querySelector('[data-field="' + fieldName + '"] input, [data-field="' + fieldName + '"] select, [data-field="' + fieldName + '"] textarea');
        }
      }
    });

    return { isFormValid: isFormValid, firstInvalid: firstInvalid };
  }

  /* Validation "live" à la sortie du champ (blur) pour un retour immédiat */
  Object.keys(rules).forEach(function (fieldName) {
    var field = form.elements[fieldName];
    if (!field) return;
    var el = field.length ? field[0] : field; // radio group -> premier élément
    var eventName = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "blur";
    form.addEventListener(
      eventName,
      function (e) {
        if (e.target.name === fieldName) validateField(fieldName);
      },
      true
    );
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var result = validateAll();
    status.className = "form__status";

    if (!result.isFormValid) {
      status.textContent = "Le formulaire contient des erreurs. Veuillez corriger les champs surlignés en rouge.";
      status.classList.add("form__status--error");
      if (result.firstInvalid) result.firstInvalid.focus();
      return;
    }

    /* Aucun serveur pour ce projet scolaire : on simule un envoi réussi */
    status.textContent = "Merci ! Votre message a bien été reçu, je vous répondrai dès que possible.";
    status.classList.add("form__status--success");
    form.reset();
    Object.keys(rules).forEach(function (fieldName) {
      setFieldValidity(fieldName, true);
    });
  });

  form.addEventListener("reset", function () {
    Object.keys(rules).forEach(function (fieldName) {
      setFieldValidity(fieldName, true);
    });
    status.className = "form__status";
    status.textContent = "";
  });
})();
