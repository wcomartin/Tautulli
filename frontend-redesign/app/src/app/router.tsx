import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../pages/DashboardPage'
import { GraphsPage } from '../pages/GraphsPage'
import { HistoryPage } from '../pages/HistoryPage'
import { LibrariesPage } from '../pages/LibrariesPage'
import { LogsPage } from '../pages/LogsPage'
import { RecentlyAddedPage } from '../pages/RecentlyAddedPage'
import { SettingsPage } from '../pages/SettingsPage'
import { SyncPage } from '../pages/SyncPage'
import { UsersPage } from '../pages/UsersPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/libraries', element: <LibrariesPage /> },
      { path: '/graphs', element: <GraphsPage /> },
      { path: '/recently-added', element: <RecentlyAddedPage /> },
      { path: '/sync', element: <SyncPage /> },
      { path: '/logs', element: <LogsPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
])
