import * as React from "react"
import { NavMain } from "@/components/layout/components/nav-main"
import { NavUser } from "@/components/layout/components/nav-user"
import { SidebarHeaderLogo } from "@/components/layout/components/header-sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { data } from "../utils/data-routes"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user } />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
