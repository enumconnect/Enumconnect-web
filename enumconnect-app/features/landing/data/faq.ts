
export type Role = "researchers" | "enumerators";
export type QA = [question: string, answer: string];

export const tabs: { id: Role; label: string }[] = [
  { id: "researchers", label: "For researchers" },
  { id: "enumerators", label: "For enumerators" },
];

export const questions: Record<Role, QA[]> = {
  researchers: [
    [
      "How much does it cost?",
      "You set the fieldwork budget. Before you publish, you see the full cost, including the Enumconnect service fee. Posting a project is free.",
    ],
    ["When do I pay?", ""],
    ["How are enumerators checked?", ""],
    ["Can I use my own questionnaire?", ""],
    ["Who handles ethics approval?", ""],
    ["What if the work is not good enough?", ""],
  ],
  enumerators: [
    ["Does it cost anything to join?", ""],

    ["What do I need to sign up?", ""],
    ["Do I need fieldwork experience?", ""],
    ["When and how do I get paid?", ""],
    ["How long does verification take?", ""],
    ["What if a submission is rejected?", ""],
  ],
};