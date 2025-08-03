import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getAboutUs } from "../../../../services/apiAboutUs";
import { useLocale } from "next-intl";

const HeadTitle = () => {
  const locale = useLocale();

  const { data: pageTitle } = useQuery({
    queryKey: ["site_settings"],
    queryFn: getAboutUs,
  });

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {locale === "ar" ? pageTitle?.site_name_ar : pageTitle?.site_name_en}
      </title>
      
      <meta name="robots" content="noindex, follow" />
      <meta name="description" content="Personal Blog Next JS Template" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      </link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap" rel="stylesheet"></link>
      <link
        rel="icon"
        type="image/x-icon"
        href={`${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
            : ""
        }/favicon.ico`}
      />
    </Head>
  );
};

export default HeadTitle;
