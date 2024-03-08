"use client";

import { useEffect } from "react";
import Catalog from "progress-catalog";

const CatalogComponent = () => {
  useEffect(() => {
    new Catalog({
      contentEl: "blog-detail",
      catalogEl: "catalog-content-wrapper",
      selector: ["h2", "h3", "h4", "h5"],
      topMargin: 70,
    });
  }, []);
  return <div id="catalog-content-wrapper" />;
};

export default CatalogComponent;
