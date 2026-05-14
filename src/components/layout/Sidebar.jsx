import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, Truck, FlaskConical,
  MapPin, Building2, Briefcase, UserCheck, Hotel,
  Sprout, Leaf, FolderOpen, TreePine, ChevronDown, ChevronRight
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',    path: '/',                icon: LayoutDashboard },
  { label: 'Projects',     path: '/projects',        icon: FolderOpen },
  {
    label: 'Masters', icon: TreePine, children: [
      { label: 'Products',           path: '/products',    icon: Package },
      { label: 'Employees',          path: '/employees',   icon: Users },
      { label: 'Vendors',            path: '/vendors',     icon: Truck },
      { label: 'Consultants',        path: '/consultants', icon: FlaskConical },
      { label: 'Land Resources',     path: '/land',        icon: MapPin },
      { label: 'NGOs',               path: '/ngos',        icon: Building2 },
      { label: 'Business Associates',path: '/business-associates', icon: Briefcase },
      { label: 'Volunteers',         path: '/volunteers',  icon: UserCheck },
      { label: 'Hospitality',        path: '/hospitality', icon: Hotel },
      { label: 'Nursery Vendors',    path: '/nursery-vendors', icon: Sprout },
    ]
  },
  {
    label: 'Tree Species', icon: Leaf, children: [
      { label: 'Flowers',  path: '/species/flowers' },
      { label: 'Fruits',   path: '/species/fruits' },
      { label: 'Birds',    path: '/species/birds' },
      { label: 'Reptiles', path: '/species/reptiles' },
    ]
  },
];

export default function Sidebar({ open }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState({ Masters: true, 'Tree Species': false });

  const toggle = (label) => setExpanded(p => ({ ...p, [label]: !p[label] }));

  const isGroupActive = (children) =>
    children?.some(c => location.pathname.startsWith(c.path));

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      height: '100vh',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: open ? 0 : 'calc(-1 * var(--sidebar-w))',
      top: 0,
      zIndex: 200,
      transition: 'left 0.25s ease',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.25rem 1.25rem 1rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.6rem'
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--accent)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <TreePine size={20} color="var(--text-inverse)" />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1 }}>ARBOREAL</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tree Platform</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem 0.6rem' }}>
        {NAV.map((item) => {
          if (item.children) {
            const active = isGroupActive(item.children);
            const open2 = expanded[item.label];
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggle(item.label)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.6rem', padding: '0.55rem 0.75rem',
                    background: active ? 'var(--accent-bg)' : 'transparent',
                    border: 'none', borderRadius: 8,
                    color: active ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
                    justifyContent: 'space-between', marginBottom: 2
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <item.icon size={16} />
                    {item.label}
                  </span>
                  {open2 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {open2 && (
                  <div style={{ marginLeft: 12, borderLeft: '1px solid var(--border)', paddingLeft: 8, marginBottom: 4 }}>
                    {item.children.map(c => (
                      <NavLink key={c.path} to={c.path} style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.45rem 0.65rem', borderRadius: 7, marginBottom: 1,
                        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        background: isActive ? 'var(--accent-bg)' : 'transparent',
                        fontSize: '0.82rem', fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none', transition: 'all 0.15s'
                      })}>
                        {c.icon && <c.icon size={13} />}
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.55rem 0.75rem', borderRadius: 8, marginBottom: 2,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-bg)' : 'transparent',
              fontSize: '0.85rem', fontWeight: isActive ? 600 : 400,
              textDecoration: 'none', transition: 'all 0.15s',
              border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent'
            })}>
              <item.icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
