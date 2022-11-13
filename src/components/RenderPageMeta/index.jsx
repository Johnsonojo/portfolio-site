import React from "react";
import { Helmet } from "react-helmet-async";

const PageMeta = ({ metalTitle, metaName, metaContent }) => {
  return (
    <Helmet>
      <title>{metalTitle}</title>
      <meta name={metaName} content={metaContent} />
    </Helmet>
  );
};

export default PageMeta;
