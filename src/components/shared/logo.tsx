
import Image from "next/image";
import Link from "next/link";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  size?: number;
  showName?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  size = 70,
  showName = true,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${content.brand.name} home`}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-2.5 ",
        className,
      )}
    >
      {/* <Image
        src="/dreamvally_header_logo.png"
        alt={`${content.brand.name} logo`}
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain "
      /> */}

      {showName && (
        <span className="text-lg text-primary font-bold tracking-tight ">
          {content.brand.name}
        </span>
      )}
    </Link>
  );
}
