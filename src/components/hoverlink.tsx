import Link from "next/link";

interface HoverLinkProps {
  className?: string;
  children: React.ReactNode;
  color?: string;
  opacity?: string;
  href: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}

export const HoverLink = ({
  className,
  children,
  color = "#000000",
  opacity = "40",
  href,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}: HoverLinkProps) => {
  const uniqueId = `hover-link-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <style>{`
        .${uniqueId} {
          background: linear-gradient(to top, ${color}${opacity} 0%, ${color}${opacity} 100%);
          background-size: 100% 40%;
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
        className={`${uniqueId} font-medium ${className || ""}`}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    </>
  );
};
