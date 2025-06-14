import React from "react";
import HeaderOne from "../../common/elements/header/HeaderOne";
import HeadTitle from "../../common/elements/head/HeadTitle";

export default function page() {
  return (
    <div>
      <HeadTitle pageTitle="News" />
      <HeaderOne pClass="header-light header-sticky header-with-shadow" />
    </div>
  );
}
