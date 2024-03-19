import React from 'react'

export default function DashboardLayout({ children }) {
    return (
        <div>
            <div>SideNav</div>

            <div>{children}</div>
        </div>
    )
}
