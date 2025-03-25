"use client";

import React from "react";
import CardPopularProducts from "./CardPopularProducts";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
    </div>
  );
};

export default page;
