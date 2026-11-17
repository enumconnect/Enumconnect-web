export type Skill = {
  title: string;
  description: string;
  icon: string;
  href: string;
  tone: "navy" | "green";
};

export const skills: Skill[] = [
  {
    title: "Household Surveys",
    description:
      "Reach households and collect information for community, social, and development research.",
    icon: "/icons/house.svg",
    href: "/skills/household-surveys",
    tone: "navy",
  },
  {
    title: "Health Surveys",
    description:
      "Support approved health-related research through structured questionnaires and field data collection.",
    icon: "/icons/health.svg", // was agriculture.svg by mistake
    href: "/skills/health-surveys",
    tone: "green",
  },
  {
    title: "Focus Groups",
    description:
      "Find people with relevant experience to support group discussions and qualitative research.",
    icon: "/icons/groups.svg",
    href: "/skills/focus-groups",
    tone: "navy",
  },
  {
    title: "Phone Interviews",
    description:
      "Connect with field data collectors who can help administer questionnaires and conduct interviews remotely.",
    icon: "/icons/phone.svg",
    href: "/skills/phone-interviews",
    tone: "green",
  },
  {
    title: "Market Research",
    description:
      "Gather information about customers, products, markets, and consumer experiences.",
    icon: "/icons/market.svg",
    href: "/skills/market-research",
    tone: "navy",
  },
  {
    title: "Agriculture",
    description:
      "Support agricultural research, farm surveys, and rural community data collection.",
    icon: "/icons/agriculture.svg",
    href: "/skills/agriculture",
    tone: "green",
  },
  {
    title: "Education",
    description:
      "Find field data collectors for school-based research, educational surveys, and academic studies.",
    icon: "/icons/education.svg",
    href: "/skills/education",
    tone: "navy",
  },
  {
    title: "Data Entry",
    description:
      "Get support with organising, entering, and managing collected research information.",
    icon: "/icons/data.svg",
    href: "/skills/data-entry",
    tone: "green",
  },
];
