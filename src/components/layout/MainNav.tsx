import { Link, useLocation } from "react-router-dom";
import { cn } from "~/utils/shadcn";

const paths: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Overview",
  },
  {
    path: "/assets",
    label: "Assets",
  },
  {
    path: "/spending",
    label: "Spending",
  },
  {
    path: "/simulation",
    label: "Simulation",
  },
];

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  const selected = (path: string) => {
    return location.pathname === path ? "" : "text-muted-foreground";
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {paths.map(({ path, label }) => (
        <Link
          to={path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            selected(path)
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
