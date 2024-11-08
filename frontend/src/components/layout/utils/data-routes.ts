import {
    BookOpen,
    Box,
    LayoutDashboard,
    Settings2,
    Warehouse,
  } from "lucide-react"

export const data = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard/overview",
          },
          {
            title: "Analytics",
            url: "/dashboard/analytics",
          },
        ],
      },
      {
        title: "Inventory",
        url: "/inventory",
        icon: Warehouse,
        items: [
          {
            title: "View Inventory",
            url: "/inventory/view",
          },
          {
            title: "Categories",
            url: "/inventory/categories",
          },
        ],
      },
      {
        title: "Products",
        url: "/products",
        icon: Box,
        items: [
          {
            title: "All Products",
            url: "/products/all",
          },
          {
            title: "Low Stock",
            url: "/products/low-stock",
          },
          {
            title: "Add New Product",
            url: "/products/add",
          },
        ],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: BookOpen,
        items: [
          {
            title: "All Orders",
            url: "/orders/all",
          },
          {
            title: "Pending Orders",
            url: "/orders/pending",
          },
          {
            title: "Order History",
            url: "/orders/history",
          },
          {
            title: "Returns",
            url: "/orders/returns",
          },
        ],
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
  }