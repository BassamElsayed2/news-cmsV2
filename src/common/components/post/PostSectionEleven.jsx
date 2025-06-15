import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const PostLayoutThree = ({ dataPost = [], postStart = 0, show = 3, bgColor = "" }) => {
  const locale = useLocale();
  
  console.log('Current locale:', locale);
  console.log('Data being passed:', dataPost);

  const getImageSrc = (img) => {
    if (Array.isArray(img)) return img[0] || "";
    if (typeof img === "string") return img;
    return "";
  };

  return (
    <div className={`axil-content axil-post-list-view ${bgColor}`}>
      {dataPost.slice(postStart, postStart + show).map((data) => (
        <div className="content-block post-list-view mt--30" key={data.id}>
          <div className="post-thumbnail">
            <Link href={`/${locale}/post/${data.id}`}>
              <a>
                <Image
                  src={getImageSrc(data.images)}
                  alt={locale === "en" ? data.title_en : data.title_ar}
                  width={300}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </a>
            </Link>
          </div>

          <div className="post-content">
            <div className="post-cat">
              <div className="post-cat-list">
                <Link href={`/${locale}/news?category=${data.category?.id}`}>
                  <a className="hover-flip-item-wrapper">
                    <span className="hover-flip-item">
                      <span
                        data-text={
                          locale === "en"
                            ? data.category?.name_en
                            : data.category?.name_ar
                        }
                      >

                        {locale === "en"
                          ? data.category?.name_en
                          : data.category?.name_ar}
                      </span>
                    </span>
                  </a>
                </Link>
              </div>
            </div>



            <h5 className="title">
              <Link href={`/${locale}/post/${data.id}`}>
                <a>{locale === "en" ? data.title_en : data.title_ar}</a>
              </Link>
            </h5>

            {/* وصف الخبر */}
            {console.log('Description check:', {
              description_en: data.description_en,
              description_ar: data.description_ar,
              locale: locale
            })}
            {(locale === "en" ? data.description_en : data.description_ar) && (
              <p className="post-excerpt mt--10">
                {locale === "en"
                  ? data.description_en
                  : data.description_ar}
              </p>
            )}

            {/* زر اقرأ المزيد */}
            <div className="mt--5">
              <Link href={`/${locale}/post/${data.id}`}>
                <a className="hover-flip-item-wrapper d-inline-block">
                  <span className="hover-flip-item">
                    <span
                      data-text={locale === "ar" ? "اقرأ المزيد" : "Read more"}
                    >
                      {locale === "ar" ? "اقرأ المزيد" : "Read more"}
                    </span>
                  </span>
                </a>
              </Link>

        {thirdHomeAd && (
          <div className="row">
            <div className="col-lg-12">
              <AddBanner
                img={thirdHomeAd.image_url}
                height="200"
                width="1230"
                pClass="mt--30"
              />

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostLayoutThree;
