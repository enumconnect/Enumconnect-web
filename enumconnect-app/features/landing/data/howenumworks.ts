

export type Role = "researchers" | "enumerators";

export type Panel = {
  image: string;
  alt: string;
  card: "project" | "training";
  steps: { title: string; body: string }[];
  cta: { label: string; href: string };
};

export const tabs: { id: Role; label: string }[] = [
  { id: "researchers", label: "For researchers" },
  { id: "enumerators", label: "For enumerators" },
];

export const panels: Record<Role, Panel> = {
  researchers: {
    image: "/images/howenumconnectimage.svg",
    alt: "Students collaborating on research with a laptop",
    card: "project",
    steps: [
      {
        title: "Post your project",
        body: "Tell us about your research, the type of fieldwork you need, your location, required skills, budget, and project timeline.",
      },
      {
        title: "Find and Select Enumerators",
        body: "Discover field data collectors with relevant skills, experience, languages, and locations. Review their profiles and choose who is right for your project.",
      },
      {
        title: "Fieldwork and Review Responses",
        body: "Assign tasks, provide instructions and receive research submissions directly through EnumConnect.",
      },
      {
        title: "Approve Work and Make Payments",
        body: "Review submitted work against your project requirements. Approve accepted work and payments are processed according to the platform's payment terms.",
      },
    ],
    cta: { label: "Post a project", href: "/signup?role=researcher" },
  },
  enumerators: {
    image: "/images/howenumerator.svg",
    alt: "Field enumerators collecting data on a phone",
    card: "training",
    steps: [
      {
        title: "Create Your Account",
        body: "Sign up and build your profile with your skills, experience, qualifications, languages, and location.",
      },
      {
        title: "Complete Verification",
        body: "We review your ID, then you complete short training on ethics, consent and questionnaires.",
      },
      {
        title: "Apply and collect data",
        body: "Apply to projects near you. Once selected, collect responses on your phone.",
      },
      {
        title: "Get paid and grow",
        body: "Get paid to your bank account when work is approved, and build your rating with every project.",
      },
    ],
    cta: { label: "Join as an enumerator", href: "/signup?role=enumerator" },
  },
};
