import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { slugify } from "../../utils";
import { useTranslation } from "next-i18next";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../../services/apiNews";

const PostSectionTen = () => {
  const { data: postData = [], isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  const [activeNav, setActiveNav] = useState("");
  const [tabPostData, setTabPostData] = useState([]);
  const [categories, setCategories] = useState([]);

  const locale = useLocale();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!Array.isArray(postData) || postData.length === 0) return;

    const extracted = [...new Set(postData.map((post) => post.status).filter(Boolean))];
    setCategories(["all", "normal", ...extracted]);

    if (!activeNav) {
      setActiveNav("all");
    }
  }, [postData]);

  useEffect(() => {
    if (!Array.isArray(postData) || postData.length === 0) return;

    let filtered = [];

    if (activeNav === "all") {
      filtered = postData;
    } else if (activeNav === "normal") {
      filtered = postData.filter((post) => !post.status || post.status === "");
    } else {
      filtered = postData.filter(
        (post) => post.status && slugify(post.status) === activeNav
      );
    }

    setTabPostData(filtered);
  }, [postData, activeNav]);

  if (isLoading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("loadingerror")}</p>;
  if (!tabPostData.length) return <p>{t("noData")}</p>;

  const firstPost = tabPostData[0];

  const getImageSrc = (img) => {
    if (Array.isArray(img)) return img[0] || "";
    if (typeof img === "string") return img;
    return "";
  };
console.log ("all", postData);

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-white">
      <div className="container">
        <SectionTitleOne title={t("sectionTitle")} />
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container id="axilTab" activeKey={activeNav} onSelect={(k) => setActiveNav(k)}>
              <Nav className="axil-tab-button nav nav-tabs mt--20">
                {categories.map((cate) => (
                  <Nav.Item key={slugify(cate)}>
                    <Nav.Link eventKey={slugify(cate)}>
                      {cate === "all"
                        ? "All"
                        : cate === "normal"
                        ? "Normal"
                        : cate}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={activeNav}>
                  <div className="row mt--40">
                    {/* الصورة الكبيرة */}
                    <div
                      className="col-xl-7 col-lg-7 col-md-12 col-12 mb-4"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="content-block content-block post-grid post-grid-transparent"
                        style={{
                          boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                          borderRadius: "8px",
                          overflow: "hidden",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="post-thumbnail mb-3"
                          style={{ position: "relative", height: "400px", width: "100%" }}
                        >
                          <Link href={`/post/${firstPost.slug}`}>
                            <a style={{ display: "block", height: "100%", width: "100%" }}>
                              {getImageSrc(firstPost.images) ? (
                                <Image
                                  src={getImageSrc(firstPost.images)}
                                  alt={locale === "en" ? firstPost.title_en : firstPost.title_ar}
                                  layout="fill"
                                  objectFit="cover"
                                  priority={true}
                                  style={{ borderRadius: "8px 8px 0 0" }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#ccc",
                                  }}
                                />
                              )}
                            </a>
                          </Link>
                        </div>
                        <div
                          className="post-content px-3 pb-3"
                          style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
                        >
                          <div className="post-cat mb-2">
                            <Link href={`/category/${slugify(firstPost.status || "")}`}>
                              <a
                                className="hover-flip-item-wrapper text-muted small"
                                style={{ textTransform: "capitalize", fontWeight: "600" }}
                              >
                                <span>{firstPost.status || "Normal"}</span>
                              </a>
                            </Link>
                          </div>
                          <h3 className="title" style={{ fontWeight: "700", fontSize: "1.8rem" }}>
                            <Link href={`/post/${firstPost.slug}`}>
                              <a style={{ color: "#222", textDecoration: "none" }}>
                                {locale === "en" ? firstPost.title_en : firstPost.title_ar}
                              </a>
                            </Link>
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* باقي الأخبار */}
                    <div
                      className="col-xl-5 col-lg-5 col-md-12 col-12"
                      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    >
                      {tabPostData.slice(1, 5).map((data) => (
                        <div
                          className="content-block post-small d-flex align-items-center"
                          key={data.slug}
                          style={{
                            boxShadow: "0 1px 6px rgb(0 0 0 / 0.1)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            padding: "10px",
                            gap: "12px",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <div
                            className="post-thumbnail"
                            style={{
                              flexShrink: 0,
                              width: "120px",
                              height: "90px",
                              position: "relative",
                              borderRadius: "6px",
                              overflow: "hidden",
                            }}
                          >
                            <Link href={`/post/${data.slug}`}>
                              <a>
                                {getImageSrc(data.images) ? (
                                  <Image
                                    src={getImageSrc(data.images)}
                                    alt={locale === "en" ? data.title_en : data.title_ar}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      backgroundColor: "#ddd",
                                    }}
                                  />
                                )}
                              </a>
                            </Link>
                          </div>
                          <div className="post-content" style={{ flex: 1 }}>
                            <div className="post-cat mb-1">
                              <Link href={`/category/${slugify(data.status || "")}`}>
                                <a
                                  className="text-muted small"
                                  style={{ textTransform: "capitalize", fontWeight: "600" }}
                                >
                                  {data.status || "Normal"}
                                </a>
                              </Link>
                            </div>
                            <h5
                              className="title mb-0"
                              style={{
                                fontWeight: "600",
                                fontSize: "1.1rem",
                                lineHeight: "1.3",
                                color: "#333",
                              }}
                            >
                              <Link href={`/post/${data.slug}`}>
                                <a style={{ color: "#333", textDecoration: "none" }}>
                                  {locale === "en" ? data.title_en : data.title_ar}
                                </a>
                              </Link>
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTen;
