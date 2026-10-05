import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/casp-logo.png"
        alt="logo"
        width={150}
        height={150}
        className="w-auto h-18 lg:h-22 transition-all duration-300"
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;
