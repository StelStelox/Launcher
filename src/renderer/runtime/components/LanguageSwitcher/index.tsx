import { useTranslation } from "react-i18next";
import classes from './index.module.sass'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: "en-US" | "ru-RU") => {
    await i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button
        className={classes.ru}
        onClick={() => changeLanguage("en-US")}
      >
        EN
      </button>

      <button
      className={classes.en}
        onClick={() => changeLanguage("ru-RU")}
      >
        RU
      </button>
    </div>
  );
}