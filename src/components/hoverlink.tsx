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
  const uniqueId = `hover-link-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <style>{`
        .${uniqueId} {
          background: linear-gradient(to top, ${color}40 0%, ${color}40 100%);
          background-size: 100% 45%;
          background-repeat: no-repeat;
          background-position: bottom;
          transition: background-size 200ms ease;
        }
        .${uniqueId}:hover {
          background-size: 100% 100%;
        }
      `}</style>
      <Link
        href={href}
        target="_blank"
        className={`${uniqueId} ${className || ""}`}
      >
        {children}
      </Link>
    </>
  );
};
