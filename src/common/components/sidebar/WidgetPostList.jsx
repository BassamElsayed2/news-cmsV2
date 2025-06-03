"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../../services/apiNews";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const formatDate = (dateString, lang) => {
  const date = new Date(dateString);
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const WidgetPostList = () => {
  const { t, i18n } = useTranslation("common");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: dataPost = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  if (!isClient) {
    return <div suppressHydrationWarning>{t("loading")}</div>; // يمنع التحذير
  }

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error")}</div>;

  const currentLang = i18n.language || "en";
  const importantPosts = dataPost.filter((post) => post.status === "important");

  return (
    <div className="axil-single-widget widget widget_postlist mb--30 ">
      <h5 className="widget-title">{t("impTitle")}</h5>
      <div className="post-medium-block">
        {importantPosts.slice(0, 3).map((data) => (
          <div className="content-block post-medium mb--20" key={data.id}>
            {data.images?.length > 0 && (
              <div className="post-thumbnail ml--10">
                <Link href={`/post/${data.id}`}>
                  <a>
                    <Image
                      src={data.images[0]}
                      alt={currentLang === "ar" ? data.title_ar : data.title_en}
                      height={100}
                      width={100}
                      priority={true}
                    />
                  </a>
                </Link>
              </div>
            )}
            <div className="post-content">
              <h6 className="title">
                <Link href={`/post/${data.id}`}>
                  <a>{currentLang === "ar" ? data.title_ar : data.title_en}</a>
                </Link>
              </h6>
              <div className="post-meta">
                <ul className="post-meta-list">
                  <li>{formatDate(data.created_at, currentLang)}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {importantPosts.length === 0 && <p>{t("noImportantNews")}</p>}
      </div>
    </div>
  );
};

export default WidgetPostList;
