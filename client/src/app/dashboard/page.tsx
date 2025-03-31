"use client";

import React from "react";
import CardPopularProducts from "./CardPopularProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StatCard from "./StatCard";
import { Package, TrendingDown, TrendingUp } from "lucide-react";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default page;
