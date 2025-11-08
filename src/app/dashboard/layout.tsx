import DashboardLayout from '@/components/dashboard-layout'
import { Route } from '@/components/nav-main';
import React from 'react'
import { CalendarDaysIcon, ChartColumnStackedIcon, HomeIcon, UsersIcon, WarehouseIcon } from 'lucide-react';

const PageDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dashboardRoutes: Route[] = [
        {
            id: "home",
            title: "Home",
            icon: <HomeIcon className="size-4" />,
            link: "/dashboard",
        },
        {
            id: "appointment",
            title: "Appointment",
            icon: <CalendarDaysIcon className="size-4" />,
            link: "/dashboard/appointment/"
        },
        {
            id: "users",
            title: "Stuff",
            icon: <UsersIcon className="size-4" />,
            link: "/dashboard/users",
            subs: [
                { title: "All Stuff", link: "/dashboard/users" },
                { title: "Add Stuff", link: "/dashboard/users/create" },
            ],
        },
        {
            id: "inventory",
            title: "Inventory",
            icon: <WarehouseIcon className="size-4" />,
            link: "/dashboard/inventory",
            subs: [
                { title: "Inventory", link: "/dashboard/inventory" },
                { title: "Add Item", link: "/dashboard/inventory/create" },
            ],
        },
        {
            id: "analytics",
            title: "Analytics",
            icon: <ChartColumnStackedIcon className="size-4" />,
            link: "#",
            subs: [
                { title: "Analytics", link: "/dashboard/analytics" },
                { title: "Reports", link: "/dashboard/report" },
            ],
        },
    ];


    return (
        <DashboardLayout sidebarRoutes={dashboardRoutes}>{children}</DashboardLayout>
    )
}

export default PageDashboardLayout
