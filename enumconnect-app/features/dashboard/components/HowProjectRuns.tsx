const steps = [
  {
    title: "Create a project",
    body: "Topic, sites, team size, dates and budget.",
  },
  { title: "Choose your team", body: "Enumerators apply. You pick who works." },
  {
    title: "Fund and start",
    body: "See the full cost, then fund the project.",
  },
  {
    title: "Review and approve",
    body: "Check each response. Approved work gets paid.",
  },
];

export function HowProjectRuns() {
  return (
    <section>
      <h2 className="mb-4 mt-0 text-[22px] font-extrabold text-[#000080]">
        How a project runs
      </h2>
      <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-[20px] border border-[#D9DEE8] bg-white p-5"
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-full text-[15px] font-bold ${
                i === 0
                  ? "bg-[#2F9D63] text-white"
                  : "bg-[#EEF0FF] text-[#000080]"
              }`}
            >
              {i + 1}
            </span>
            <h3 className="mb-1.5 mt-4 text-[18px] font-bold text-[#1a1a1a]">
              {step.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.5] text-[#575757]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
