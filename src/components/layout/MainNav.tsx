import { Link, useLocation } from "react-router-dom";
import { cn } from "~/utils/shadcn";

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
      <Link
        to="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          selected("/")
        )}
      >
        Overview
      </Link>
      <Link
        to="/assets"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          selected("/assets")
        )}
      >
        Assets
      </Link>
      <Link
        to="/spending"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          selected("/spending")
        )}
      >
        Spending
      </Link>
      <Link
        to="/simulation"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          selected("/assets")
        )}
      >
        Simulation
      </Link>
    </nav>
  );
}
