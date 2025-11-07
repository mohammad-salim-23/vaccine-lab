import DashboardLayout from '@/components/dashboard-layout'
import React from 'react'

const PageDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    )
}

export default PageDashboardLayout
