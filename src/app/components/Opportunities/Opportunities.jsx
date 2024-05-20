"use client";

import css from "./Opportunities.module.css";
import Image from "next/image";
import CarExample from "../../../../public/images/CarExample.png";
import CarExample2 from "../../../../public/images/CarExample2.png";
import CarExample3 from "../../../../public/images/CarExample3.png";

export default function Opportunities() {
  const opportunitiesArray = [
    {
      id: 1,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: CarExample,
    },
    {
      id: 2,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: CarExample2,
    },
    {
      id: 3,
      title: "Lorem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: CarExample3,
    },
  ];
  return (
    <>
      <section className={css.opportunitiesSection}>
        <h2 className={css.opportunitiesTitle}>Opportunities</h2>
        <p className={css.opportunitiesDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
          ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus
          amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus
          tempor, ac nunc libero urna, feugiat.
        </p>
        <ul className={css.opportunitiesList}>
          {opportunitiesArray.map((opportunity) => (
            <li className={css.opportunitiesItem}>
              <div className={css.opportunitiesImageThumb}>
                <Image
                  className={css.opportunitiesIcon}
                  alt="opportunities for dealers"
                  src={opportunity.icon}
                />
              </div>
              <div className={css.opportunitiesTextThumb}>
                <p className={css.opportunityTitle}>{opportunity.title}</p>
                <p className={css.opportunityDescriptiob}>
                  {opportunity.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
