import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Resumen
      </Link>
      <Link
        to="/productos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Productos
      </Link>
      <Link
        to="/ordenes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ordenes
      </Link>
      <Link
        to="/configuraciones"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Configuraciones
      </Link>
    </nav>
  );
}
