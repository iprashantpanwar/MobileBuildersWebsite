// The Founding Ambassadors, cohort 01, in the order of the announcement carousel.
// Photos live in public/ambassadors/ as 640×640 JPEGs, cut from that carousel.

export type Ambassador = {
  name: string;
  role: string;
  linkedin: string;
  /** Path inside public/, without a leading slash. */
  photo: string;
};

export const AMBASSADOR_PROGRAM = {
  cohort: "Cohort 01",
  term: "Six months",
  /** What the cohort does together over its term. */
  commitments: [
    "Monthly brainstorms with the Mobile Builders leadership",
    "Growing the community with new active mobile developers",
    "Representing Mobile Builders across the ecosystem",
  ],
};

export const AMBASSADORS: Ambassador[] = [
  {
    name: "Priyanka Sharma",
    role: "Mobile App Developer · OSS Contributor",
    linkedin: "https://www.linkedin.com/in/lassiecoder/",
    photo: "ambassadors/priyanka-sharma.jpg",
  },
  {
    name: "Ryan Gordon",
    role: "Senior Android Developer at RyeGordo Technologies",
    linkedin: "https://www.linkedin.com/in/ryegordo/",
    photo: "ambassadors/ryan-gordon.jpg",
  },
  {
    name: "Maryam Masood",
    role: "Flutter Developer",
    linkedin: "https://www.linkedin.com/in/maryam-masood-7c3a9/",
    photo: "ambassadors/maryam-masood.jpg",
  },
  {
    name: "Nyerhovwo (Nero) Adjekughene",
    role: "Senior Android Engineer at Raenest",
    linkedin: "https://www.linkedin.com/in/nerojust/",
    photo: "ambassadors/nero-adjekughene.jpg",
  },
  {
    name: "Romit Sharma",
    role: "Founder of Sync360 at Liftley",
    linkedin: "https://www.linkedin.com/in/romit-sharma-18b521329/",
    photo: "ambassadors/romit-sharma.jpg",
  },
  {
    name: "Parth Patel",
    role: "Senior Mobile Application Engineer at PocketMint.ai",
    linkedin: "https://www.linkedin.com/in/parth-patel-06a1baa2/",
    photo: "ambassadors/parth-patel.jpg",
  },
  {
    name: "Luciano Santos",
    role: "Senior Android Engineer",
    linkedin: "https://www.linkedin.com/in/luciano-santos-dev/",
    photo: "ambassadors/luciano-santos.jpg",
  },
  {
    name: "Mudasir Mukhtar",
    role: "Senior Mobile Engineer",
    linkedin: "https://www.linkedin.com/in/mudasir-mukhtar-8a4a76125/",
    photo: "ambassadors/mudasir-mukhtar.jpg",
  },
];
