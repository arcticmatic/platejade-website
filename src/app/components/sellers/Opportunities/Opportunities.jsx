"use client";

import { useState, useEffect } from "react";
import css from "./Opportunities.module.css";
import Image from "next/image";

export default function Opportunities() {
  const [opportunitiesArray, setOpportunitiesArray] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          "/api/dealers/opportunities/get-opportunities"
        );
        if (response.ok) {
          const data = await response.json();
          const filteredItems = data.data.filter(
            (item) => item.page === "sellers"
          );
          setOpportunitiesArray(filteredItems);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <>
      <section className={css.opportunitiesSection}>
        <h2 className={css.opportunitiesTitle}>Opportunities</h2>
        <p className={css.opportunitiesDescription}>
          {opportunitiesArray[0] && opportunitiesArray[0].mainText}
        </p>
        <ul className={css.opportunitiesList}>
          {opportunitiesArray.map((opportunity) => (
            <li key={opportunity._id} className={css.opportunitiesItem}>
              <div className={css.opportunitiesImageThumb}>
                <Image
                  width="500"
                  height="50"
                  quality={100}
                  className={css.opportunitiesIcon}
                  alt="opportunities for dealers"
                  src={opportunity.icon}
                />
              </div>
              <div className={css.opportunitiesTextThumb}>
                <p className={css.opportunityTitle}>{opportunity.title}</p>
                <p className={css.opportunityDescriptiob}>{opportunity.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
