import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sky/5">
      <div className="relative animate-spin duration-2000 linear">
        <Image
          src="/images/logo/casp-logo.png"
          alt="CASP Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

