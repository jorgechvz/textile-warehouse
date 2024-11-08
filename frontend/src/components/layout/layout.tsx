import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search } from "../dashboard/components/search-bar";
import { AppSidebar } from "./components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";
interface BreadcrumbPath {
  name: string;
  href: string;
}
export default function Layout({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbPath[]>([]);

  useEffect(() => {
    const path = window.location.pathname;
    const pathSegments = path.split("/").filter(Boolean);

    const breadcrumbPaths: BreadcrumbPath[] = pathSegments.map(
      (segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const name =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
        return { name, href };
      }
    );

    setBreadcrumbs(breadcrumbPaths);
  }, [window.location.pathname]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator decorative orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return isLast ? (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <Fragment key={index}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.name}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator
                        key={`sep-${index}`}
                        className="hidden md:block"
                      />
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Search />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
