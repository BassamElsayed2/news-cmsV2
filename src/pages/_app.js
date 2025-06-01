import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.scss";
import "../styles/elements/_language-switcher.css"
import ColorSwitcher from "../common/elements/color-switcher/ColorSwitcher";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import { IntlProvider } from "next-intl";
function MyApp({ Component, pageProps }) {
  const {locale} = useRouter();
  
  useEffect(() => {
    // ضبط الاتجاه بناءً على اللغة
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [locale]);

  return (
    <>
    <IntlProvider locale={locale} messages={pageProps.messages}>
      <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
