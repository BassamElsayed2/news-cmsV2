import { useRouter } from "next/router";
import PostAuthor from "../../common/components/post/format/element/PostAuthor";
import SidebarTwo from "../../common/components/sidebar/SidebarTwo";
import PostMetaTwo from "../../common/components/post/format/element/PostMetaTwo";
import PostComment from "../../common/components/post/format/element/PostComment";
import PostTagShare from "../../common/components/post/format/element/PostTagShare";

import { getNewsById } from "../../../services/apiNews";

const NewsDetailsPage = ({ postData = {}, allData = [] }) => {
  const { query, locale } = useRouter();
  const { id } = query;

  const basePathLink =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
      : "";

  const postContent =
    postData?.content?.replaceAll("/images/", basePathLink + "/images/") || "";

  console.log("ID:", id);

  return (
    <>
    {postData.featureImg ? <PostMetaOne metaData={postData} /> : ""}

      <div className="post-single-wrapper axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
            <PostMetaTwo metaData={postData} />
            <div className="axil-post-details">
              {postData?.videoLink ? (
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    src={postData.videoLink}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}

              <div
                className="post-details-content"
                dangerouslySetInnerHTML={{ __html: postContent }}
              ></div>

              <PostTagShare postTags={postData} />
              <PostAuthor dataAuthor={postData} />
              <PostComment />
            </div>
          </div>
          <div className="col-lg-4">
            <SidebarTwo dataPost={allData} tagData={postData} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsDetailsPage;
