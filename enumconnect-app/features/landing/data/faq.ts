export type Role = "researchers" | "enumerators";
export type QA = [question: string, answer: string];

export const tabs: { id: Role; label: string }[] = [
  { id: "researchers", label: "For Researchers" },
  { id: "enumerators", label: "For Enumerators" },
];

export const questions: Record<Role, QA[]> = {
  researchers: [
    [
      "What is EnumConnect?",
      "Enumconnect is a research data collection platform in Nigeria that connects researchers with field professionals and manages projects and data submissions in one place.",
    ],
    [
      "Who can use EnumConnect?",
      "Undergraduate and postgraduate students, lecturers, independent academic researchers, research teams, NGOs and organisations that need support with field data collection.",
    ],
    [
      "What types of research projects can I create?",
      "You can create projects involving household surveys, health surveys, focus groups, phone interviews, market research, academic research, agriculture, education, and other approved research activities.",
    ],
    [
      "How do I find and hire enumerators?",
      "Create a project, specify the skills and location you need, then explore relevant enumerator profiles. You can review applications and invitations before selecting people for your project.",
    ],
    [
      "Can I review research submissions before approving payment?",
      "Yes. Researchers can review submissions against their project requirements and approve accepted work or request corrections before payment approval.",
    ],
  ],
  enumerators: [
    [
      "How do I become an enumerator on EnumConnect?",
      "Create an account, complete your profile, and submit the required information. Once your profile has been verified, you can explore and apply for suitable projects.",
    ],

    [
      "What do I need to get verified?",
      "You will need to provide your NIN, academic qualifications, and a passport photograph for review, as well as complete the required training. Additional information may be requested where necessary.",
    ],
    [
      "How can I find fieldwork opportunities?",
      "Browse available research projects, check their requirements and apply for opportunities that match your skills and experience.",
    ],
    [
      "How do I get paid for completed assignments?",
      "Once you submit your work, the researcher reviews it. Payment is released for approved assignments according to the agreed project terms.",
    ],
    [
      "Can I apply for projects outside my location?",
      "Yes. You can apply for projects in other locations, provided you meet the project requirements and can work in the specified area.",
    ],
  ],
};
