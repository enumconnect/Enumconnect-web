import Image from "next/image";

const audiences = [
  { icon: "/icons/icon-cap.svg", label: "Undergraduate students" },
  { icon: "/icons/icon-book.svg", label: "Postgraduate students" },
  { icon: "/icons/icon-fgd.svg", label: "Lecturers and supervisors" },
  { icon: "/icons/icon-uni.svg", label: "University research groups" },
];

export function AudienceSection() {
  return (
    <section
      className="bg-[#000080] text-white py-[22px] pb-[25px]"
      aria-label="Who Enumconnect serves"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)]">
        <p className="m-0 mb-[17px] text-[#B6B6EC] text-center text-base">
          Built for academic research in Nigeria
        </p>
        <ul className="grid grid-cols-4 gap-6 m-0 p-0 list-none max-[640px]:grid-cols-2 max-[640px]:gap-x-[10px] max-[640px]:gap-y-[15px]">
          {audiences.map(({ icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 text-base text-white font-bold max-[640px]:justify-start max-[640px]:gap-2 max-[640px]:text-[10px]"
            >
              <span
                className="grid place-items-center w-11 h-11 shrink-0 rounded-lg bg-[#2F9D63] max-[640px]:w-[30px] max-[640px]:h-[30px] max-[640px]:basis-[30px]"
                aria-hidden="true"
              >
                <Image src={icon} alt="" width={20} height={20} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
