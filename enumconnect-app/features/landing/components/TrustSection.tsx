import Image from "next/image";



export function TrustSection() {
  return (
    <section
      className="py-[76px_80px] bg-[#F8FFFC] max-[640px]:py-[54px]"
      id="trust"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* section heading — centered */}
        <div className="mb-[30px] text-center font-extrabold max-[640px]:mb-6">
          <h2 className="m-0 text-[#000080] text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-1.2px] max-[640px]:text-[28px]">
            Trust, built in
          </h2>
          <p className="mt-[9px] mb-0 font-[400px] text-[#424242] text-[18px] max-[640px]:text-[13px] max-[640px]:leading-[1.5]">
            How we check every enumerator, and how money moves from researcher
            to field.
          </p>
        </div>

        {/* trust grid */}
        <div className="grid grid-cols-2 gap-[22px] max-[640px]:grid-cols-1 max-[640px]:gap-4">
          <Image
            src="/images/Card-Verification.svg"
            alt="verify"
            width={588}
            height={620}
          />
          <Image
            src="/images/Card-Payments.svg"
            alt="payment"
            width={588}
            height={620}
          />
        </div>
      </div>
    </section>
  );
}
