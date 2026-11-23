import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="pb-[72px] bg-[#f4fffb] max-[640px]:pb-[52px]">
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* cta box */}
        <div className="relative grid grid-cols-[1fr_0.58fr] items-center min-h-[290px] overflow-hidden rounded-[22px] bg-[#2F9D63] px-12 py-9 text-white max-[640px]:grid-cols-1 max-[640px]:gap-0 max-[640px]:rounded-[28px] max-[640px]:px-0 max-[640px]:py-0">
          {/* copy */}
          <div className="z-10 max-w-[520px] max-[640px]:order-2 max-[640px]:max-w-none max-[640px]:px-5 max-[640px]:pt-6 max-[640px]:pb-6">
            <h2 className="m-0 text-[clamp(29px,3.2vw,44px)] font-extrabold leading-[1.12] max-[640px]:text-[31px]">
              <span className="max-[640px]:hidden">
                Your Next Research Project
                <br />
                Starts Here.
              </span>
              <span className="hidden max-[640px]:block">
                Your Next Research
                <br />
                Project Starts Here
              </span>
            </h2>
            <p className="max-w-[390px] mt-3 mb-[18px] font-[400px] text-[#E3F5EB] text-[18px] leading-[1.5] max-[640px]:max-w-none max-[640px]:text-[16px]">
              <span className="max-[640px]:hidden">
                Planning a research project or looking for your next fieldwork
                opportunity? EnumConnect helps you make the right connection.
              </span>
              <span className="hidden max-[640px]:block">
                Planning a research project or looking for your next fieldwork
                opportunity? EnumConnect helps you make the right connection.
              </span>
            </p>
            <div className="flex flex-wrap gap-[10px] max-[640px]:flex-col">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[7px] border border-transparent bg-white px-[18px] text-base font-bold text-[#000080] no-underline transition-colors hover:bg-[#eef0ff] max-[640px]:w-full"
                href="/sign-up/researcher"
              >
                Post a project
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[7px] border border-[#b8e4c9] bg-transparent px-[18px] text-base font-bold text-white no-underline transition-colors hover:bg-white/10 max-[640px]:w-full"
                href="/sign-up/enumerator"
              >
                Join as an enumerator
              </Link>
            </div>
          </div>

          {/* image */}
          <div className="z-10 w-full overflow-hidden rounded-[14px] max-[640px]:order-1 max-[640px]:h-[240px] max-[640px]:rounded-[24px_24px_14px_14px]">
            <Image
              src="/images/Rectangle.svg"
              alt="A researcher interviewing a community member"
              width={548}
              height={672}
              className="block h-full w-full object-cover object-[center_45%]"
            />
          </div>

          <span
            className="absolute right-[23%] bottom-[-190px] w-[320px] h-[320px] rounded-full border-[10px] border-white/15"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
