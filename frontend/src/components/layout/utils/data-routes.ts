import { decodeToken } from "@/components/auth/utils/utils";
import {
  BookOpen,
  Box,
  ChartColumn,
  LayoutDashboard,
  Settings2,
  Warehouse,
} from "lucide-react";

const userName = decodeToken();

export const data = {
  user: {
    name: userName?.name || "",
    email: userName?.email || "",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartColumn,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: Warehouse,
    },
    {
      title: "Products",
      url: "/products",
      icon: Box,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "User Management",
          url: "/settings/users",
        },
        {
          title: "Role Permissions",
          url: "/settings/permissions",
        },
      ],
    },
  ],
};
