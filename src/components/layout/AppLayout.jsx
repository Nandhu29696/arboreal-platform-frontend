import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} />
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0,
        transition: 'margin-left 0.25s ease',
        display: 'flex', flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1, padding: '1.75rem', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
