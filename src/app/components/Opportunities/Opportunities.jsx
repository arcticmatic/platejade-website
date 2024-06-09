"use client";

import { useState, useEffect } from "react";
import css from "./Opportunities.module.css";
import Image from "next/image";
import CarExample from "../images/CarExample.png";
import CarExample2 from "../images/CarExample2.png";
import CarExample3 from "../images/CarExample3.png";

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
          console.log("data:", data);
          setOpportunitiesArray(data.data);
        } else {
          console.error("Failed to fetch work items");
        }
      } catch (error) {
        console.error("Error occurred while fetching work items:", error);
      }
    };

    fetchOpportunities();
  }, []);

  //  const opportunitiesArray = [
  //   {
  //     id: 1,
  //     title: "Lorem",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     icon: CarExample,
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     icon: CarExample2,
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     icon: CarExample3,
  //   },
  // ];

  return (
    <>
      <section className={css.opportunitiesSection}>
        <h2 className={css.opportunitiesTitle}>Opportunities</h2>
        <p className={css.opportunitiesDescription}>
          {/* {opportunitiesArray[0].mainText} */}
        </p>
        <ul className={css.opportunitiesList}>
          {opportunitiesArray.map((opportunity) => (
            <li className={css.opportunitiesItem}>
              <div className={css.opportunitiesImageThumb}>
                <Image
                  width="50"
                  height="80"
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
