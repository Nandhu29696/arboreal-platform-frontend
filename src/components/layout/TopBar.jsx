import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';

const TITLES = {
  '/':                    'Dashboard',
  '/projects':            'Projects',
  '/products':            'Products',
  '/employees':           'Employees',
  '/vendors':             'Vendors',
  '/consultants':         'Technical Consultants',
  '/land':                'Land Resources',
  '/ngos':                'NGOs',
  '/business-associates': 'Business Associates',
  '/volunteers':          'Volunteers',
  '/hospitality':         'Hospitality Verticals',
  '/nursery-vendors':     'Nursery Vendors',
  '/species/flowers':     'Tree Species — Flowers',
  '/species/fruits':      'Tree Species — Fruits',
  '/species/birds':       'Tree Species — Birds',
  '/species/reptiles':    'Tree Species — Reptiles',
};

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = TITLES[pathname] || 'Arboreal';

  return (
    <header style={{
      height: 'var(--topbar-h)',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 1.5rem', gap: '1rem',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <button
        onClick={onMenuClick}
        style={{
          background: 'transparent', border: 'none',
          color: 'var(--text-secondary)', padding: 4,
          display: 'flex', alignItems: 'center', borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        <Menu size={20} />
      </button>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem', fontWeight: 700,
        color: 'var(--text-primary)', flex: 1
      }}>
        {title}
      </h1>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: 'var(--bg-input)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '0.35rem 0.75rem',
        color: 'var(--text-muted)', fontSize: '0.82rem'
      }}>
        <Search size={14} />
        <span>Search…</span>
      </div>

      <button style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '0.4rem', color: 'var(--text-secondary)',
        display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative'
      }}>
        <Bell size={16} />
        <span style={{
          position: 'absolute', top: 3, right: 3, width: 7, height: 7,
          background: 'var(--accent)', borderRadius: '50%'
        }} />
      </button>

      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), #16a34a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '0.8rem', color: 'var(--text-inverse)'
      }}>
        A
      </div>
    </header>
  );
}
