export const ProjectCard = () => {
    
  const avatars = [
    { t: "AB", c: "bg-[#2A9D6A]" },
    { t: "TO", c: "bg-[#000080]" },
    { t: "NI", c: "bg-[#6C63D9]" },
    { t: "FM", c: "bg-[#E0A100]" },
    { t: "+4", c: "bg-[#2A9D6A]" },
  ];
  return (
    <div className="w-[300px] rounded-2xl bg-white px-4 py-4 shadow-[0_12px_30px_-10px_rgba(0,0,128,0.25)] max-[640px]:w-[210px]">
      <div className="flex items-start justify-between">
        <p className="m-0 text-base font-bold text-[#212121]">
          Household survey · Kano
        </p>
        <span className="text-[12px] font-bold tracking-wide text-[#8E8E8E]">
          SAMPLE
        </span>
      </div>
      <p className="m-0 mt-0.5 text-[14px] font-[400px] text-[#575757]">
        8 enumerators applied
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-1">
          {avatars.map((a) => (
            <span
              key={a.t}
              className={`grid h-[26px] w-[26px] place-items-center rounded-full text-[9px] font-bold text-white ring-2 ring-white ${a.c}`}
            >
              {a.t}
            </span>
          ))}
        </div>
        <span className="rounded-md bg-[#000080] px-3 py-1.5 text-[14px] font-bold text-white">
          Review
        </span>
      </div>
    </div>
  );
};
