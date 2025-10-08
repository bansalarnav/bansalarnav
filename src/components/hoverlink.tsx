import Link from "next/link";

interface HoverLinkProps {
  className?: string;
  children: React.ReactNode;
  color?: string;
  href: string;
}
export const HoverLink = ({
  className,
  children,
  color = "#000000",
  href,
}: HoverLinkProps) => {
  return (
    <Link href={href} target="_blank" className="relative group">
      <span className={`${className} z-10`}>{children}</span>
      <span
        className={`absolute bottom-0 left-[-1px] w-[calc(100%+2px)] h-[35%] z-[1] group-hover:h-[100%] transition-all duration-200`}
        style={{ backgroundColor: color, opacity: 0.2 }}
      />
    </Link>
  );
};
