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
                      {cate === "all" ? "All" : cate === "normal" ? "Normal" : cate}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={activeNav}>
                  <div className="row mt--40">
                    <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                      {tabPostData.slice(1, 5).map((data) => (
                        <div className="content-block post-medium post-medium-border border-thin" key={data.slug}>
                          <div className="post-thumbnail">
                            <Link href={`/post/${data.slug}`}>
                              <a>
                                {getImageSrc(data.images) ? (
                                  <Image
                                    src={getImageSrc(data.images)}
                                    alt={locale === "en" ? data.title_en : data.title_ar}
                                    height={100}
                                    width={100}
                                    priority={true}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      backgroundColor: "#ccc",
                                    }}
                                  />
                                )}
                              </a>
                            </Link>
                          </div>
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                <Link href={`/category/${slugify(data.status || "")}`}>
                                  <a className="hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                      <span data-text={data.status || "Normal"}>{data.status || "Normal"}</span>
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <h4 className="title">
                              <Link href={`/post/${data.slug}`}>
                                <a>{locale === "en" ? data.title_en : data.title_ar}</a>
                              </Link>
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-xl-7 col-lg-6 col-md-12 col-12 mt_md--40 mt_sm--40">
                      <div className="content-block content-block post-grid post-grid-transparent">
                        {getImageSrc(firstPost.images) && (
                          <div className="post-thumbnail">
                            <Link href={`/post/${firstPost.slug}`}>
                              <a>
                                <Image
                                  src={getImageSrc(firstPost.images)}
                                  alt={locale === "en" ? firstPost.title_en : firstPost.title_ar}
                                  height={660}
                                  width={705}
                                  priority={true}
                                />
                              </a>
                            </Link>
                          </div>
                        )}
                        <div className="post-grid-content">
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                <Link href={`/category/${slugify(firstPost.status || "")}`}>
                                  <a className="hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                      <span data-text={firstPost.status || "Normal"}>{firstPost.status || "Normal"}</span>
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <h3 className="title">
                              <Link href={`/post/${firstPost.slug}`}>
                                <a>{locale === "en" ? firstPost.title_en : firstPost.title_ar}</a>
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
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