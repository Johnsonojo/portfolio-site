import React from "react";
import { Helmet } from "react-helmet-async";

const PageMeta = ({ pageTitle, contentDescription, canonicalLink }) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={contentDescription} />
      <link rel="canonical" href={canonicalLink} />
    </Helmet>
  );
};

export default PageMeta;
