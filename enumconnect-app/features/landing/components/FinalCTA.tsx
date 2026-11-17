import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="pb-[72px] bg-[#f4fffb] max-[640px]:pb-[52px]">
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* cta box */}
        <div className="relative grid grid-cols-[1fr_0.58fr] items-center min-h-[290px] overflow-hidden rounded-[22px] bg-[#2F9D63] px-12 py-9 text-white max-[640px]:grid-cols-1 max-[640px]:gap-6 max-[640px]:px-[23px] max-[640px]:py-[27px]">
          {/* copy */}
          <div className="z-10 max-w-[520px]">
            <h2 className="m-0 text-[clamp(29px,3.2vw,44px)] font-extrabold leading-[1.12] max-[640px]:text-[31px]">
              Ready when your
              <br />
              fieldwork is.
            </h2>
            <p className="max-w-[390px] mt-3 mb-[18px] font-[400px] text-[#E3F5EB] text-[18px] leading-[1.5]">
              Post your project in minutes, or join to find paid research work
              near you.
            </p>
            <div className="flex flex-wrap gap-[10px]">
              <Link
                className="inline-flex min-h-[42px] items-center justify-center rounded-[7px] border border-transparent bg-white px-[18px] text-base font-bold text-[#000080] no-underline transition-colors hover:bg-[#eef0ff]"
                href="/signup?role=researcher"
              >
                Post a project
              </Link>
              <Link
                className="inline-flex min-h-[42px] items-center justify-center rounded-[7px] border border-[#b8e4c9] bg-transparent px-[18px] text-base font-bold text-white no-underline transition-colors hover:bg-white/10"
                href="/signup?role=enumerator"
              >
                Join as an enumerator
              </Link>
            </div>
          </div>

          {/* image */}
          <div className="z-10 w-full  overflow-hidden rounded-[14px] ">
            <Image
              src="/images/Rectangle.svg"
              alt="A researcher interviewing a community member"
              width={548}
              height={672}
              className="block w-full h-full object-cover object-[center_45%]"
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
