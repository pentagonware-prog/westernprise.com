"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: new (options: Record<string, unknown>, elementId: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

const languages = [
  { label: "United Kingdom · English", code: "en", htmlLang: "en-GB" },
  { label: "United States · English", code: "en", htmlLang: "en-US" },
  { label: "France · Français", code: "fr", htmlLang: "fr-FR" },
  { label: "Spain · Español", code: "es", htmlLang: "es-ES" },
];

function applyLanguage(code: string) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo) {
    combo.value = code === "en" ? "" : code;
    combo.dispatchEvent(new Event("change"));
    return true;
  }
  return false;
}

function setTranslationCookie(code: string) {
  const host = window.location.hostname;
  const expired = "Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=;path=/;expires=${expired}`;
  document.cookie = `googtrans=;path=/;domain=${host};expires=${expired}`;
  document.cookie = `googtrans=;path=/;domain=.${host};expires=${expired}`;
  document.cookie = `googtrans=/en/${code};path=/;SameSite=Lax`;
  document.cookie = `googtrans=/en/${code};path=/;domain=${host};SameSite=Lax`;
}

export function LanguageSelector() {
  const [selected, setSelected] = useState("United Kingdom · English");

  useEffect(() => {
    const storedLabel = localStorage.getItem("westernprise-language-label");
    const savedOption = languages.find((item) => item.label === storedLabel) || languages[0];
    const savedLabel = savedOption.label;
    const savedCode = savedOption.code;
    setSelected(savedLabel);
    localStorage.setItem("westernprise-language-label", savedLabel);
    localStorage.setItem("westernprise-language-code", savedCode);
    document.documentElement.lang = savedOption.htmlLang;
    setTranslationCookie(savedCode);

    const syncLanguage = (event: Event) => {
      const label = (event as CustomEvent<string>).detail;
      const option = languages.find((item) => item.label === label);
      if (option) setSelected(option.label);
    };
    window.addEventListener("westernprise-language-change", syncLanguage);

    if (!document.getElementById("westernprise_google_translate")) {
      const container = document.createElement("div");
      container.id = "westernprise_google_translate";
      container.setAttribute("aria-hidden", "true");
      document.body.appendChild(container);
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      const container = document.getElementById("westernprise_google_translate");
      if (container && !container.dataset.ready) {
        container.dataset.ready = "true";
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,fr,es", autoDisplay: false },
          "westernprise_google_translate"
        );
      }
      let attempts = 0;
      const translationTimer = window.setInterval(() => {
        attempts += 1;
        if (applyLanguage(savedCode) || attempts >= 20) window.clearInterval(translationTimer);
      }, 250);
    };

    if (!document.querySelector('script[data-westernprise-translate="true"]')) {
      const script = document.createElement("script");
      script.dataset.westernpriseTranslate = "true";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
    return () => window.removeEventListener("westernprise-language-change", syncLanguage);
  }, []);

  const changeLanguage = (label: string) => {
    const option = languages.find((item) => item.label === label) || languages[0];
    setSelected(option.label);
    window.dispatchEvent(new CustomEvent("westernprise-language-change", { detail: option.label }));
    localStorage.setItem("westernprise-language-label", option.label);
    localStorage.setItem("westernprise-language-code", option.code);
    document.documentElement.lang = option.htmlLang;
    setTranslationCookie(option.code);
    if (option.code === "en") {
      applyLanguage("en");
      window.location.reload();
      return;
    }
    if (!applyLanguage(option.code)) window.location.reload();
  };

  const current = languages.find((item) => item.label === selected) || languages[0];
  const flag = current.htmlLang === "en-US" ? "🇺🇸" : current.code === "fr" ? "🇫🇷" : current.code === "es" ? "🇪🇸" : "🇬🇧";

  return <>
    <label className="language-select">
      <span className="language-flag" aria-hidden="true">{flag}</span>
      <select value={selected} onChange={(event) => changeLanguage(event.target.value)} aria-label="Country and language">
        {languages.map((language) => <option key={language.label}>{language.label}</option>)}
      </select>
    </label>
  </>;
}
