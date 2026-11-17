export const TrainingCard = () => {
  function Check() {
    return (
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#E3F5EB] text-[#2A9D6A]">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    );
  }
  return (
    <div className="w-[300px] rounded-2xl bg-white px-4 py-4 shadow-[0_12px_30px_-10px_rgba(0,0,128,0.25)] max-[640px]:w-[210px]">
      <div className="flex items-center justify-between">
        <p className="m-0 text-base font-bold text-[#212121]">Your training</p>
        <span className="rounded-full bg-[#E3F5EB]  px-2 py-0.5 text-[12px] font-bold text-[#1B6A40]">
          Complete
        </span>
      </div>
      <ul className="m-0 mt-3 grid list-none gap-2 p-0">
        {["Research ethics", "Consent", "Questionnaires"].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 font-[400px] text-[14px] text-[#424242]"
          >
            <Check />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
