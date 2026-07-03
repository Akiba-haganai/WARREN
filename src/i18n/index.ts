import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bemba from "./bemba.json";
import chinyanja from "./chinyanja.json";

i18n.use(initReactI18next).init({
  resources: {
    bem: { translation: bemba },
    nya: { translation: chinyanja },
  },
  lng: "en", // default English
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;