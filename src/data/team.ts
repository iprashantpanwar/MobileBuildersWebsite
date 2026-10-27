// The people who run Mobile Builders. Photos live in public/team/ as 640×640 WebP.

export type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  /** Path inside public/, without a leading slash. */
  photo: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Selen Demir",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/selen-demir/",
    photo: "team/selen-demir.webp",
  },
  {
    name: "Prashant Panwar",
    role: "Community Manager",
    linkedin: "https://www.linkedin.com/in/iprashantpanwar/",
    photo: "team/prashant-panwar.webp",
  },
];
