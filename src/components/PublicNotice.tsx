import type { Locale } from "../types";
import { translate } from "../i18n";

export function PublicNotice({ locale }: { locale: Locale }) {
  return (
    <footer className="public-notice" aria-label={locale === "pt-BR" ? "Avisos legais" : "Legal notices"}>
      <p>{translate(locale, "legalIndependent")}</p>
      <p>
        {translate(locale, "legalAttribution")} {" "}
        <a href="https://github.com/nastaso/cloudcertprep" target="_blank" rel="noreferrer">
          {translate(locale, "legalSource")}
        </a>
      </p>
    </footer>
  );
}
