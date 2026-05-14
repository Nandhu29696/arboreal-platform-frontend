import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  FolderOpen, Users, Truck, UserCheck, TreePine,
  ArrowRightLeft, Leaf, ScanSearch
} from 'lucide-react';
import { dashboardApi } from '../../utils/api';
import { StatCard, Card, Loading, PageHeader } from '../../components/ui';
import { STATUS_BADGE } from '../../utils/constants';

const PIE_COLORS = ['#4ade80','#22c55e','#60a5fa','#fbbf24','#f87171','#a78bfa','#94a3b8'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.summary()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!stats) return (
    <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '3rem' }}>
      Could not load dashboard. Make sure the backend is running.
    </div>
  );

  const { totals, projects_by_status, projects_by_type, recent_projects } = stats;

  return (
    <div>
      <PageHeader
        title="Platform Overview"
        subtitle="Real-time summary of all arboreal activities"
      />

      {/* Stat Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <StatCard label="Total Projects"     value={totals.projects}           icon={FolderOpen}     color="var(--accent)" />
        <StatCard label="Employees"          value={totals.employees}          icon={Users}          color="#60a5fa" />
        <StatCard label="Vendors"            value={totals.vendors}            icon={Truck}          color="#fbbf24" />
        <StatCard label="Volunteers"         value={totals.volunteers}         icon={UserCheck}      color="#a78bfa" />
        <StatCard label="Trees Censused"     value={totals.trees_censused}     icon={ScanSearch}     color="#f97316" />
        <StatCard label="Transplanted"       value={totals.trees_transplanted} icon={ArrowRightLeft} color="#f87171" />
        <StatCard label="Planted"            value={totals.trees_planted}      icon={Leaf}           color="#4ade80" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Projects by Type
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projects_by_type} margin={{ left: -20 }}>
              <XAxis dataKey="project_type" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-display)' }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                cursor={{ fill: 'rgba(74,222,128,0.06)' }}
              />
              <Bar dataKey="count" fill="var(--accent)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={projects_by_status} dataKey="count" nameKey="status"
                cx="50%" cy="50%" outerRadius={80} innerRadius={45}
                paddingAngle={3}>
                {projects_by_status.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend iconSize={10} wrapperStyle={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Recent Projects
        </h3>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {recent_projects.map((p, i) => (
              <tr key={i}>
                <td>{p.project_name}</td>
                <td><span style={{ textTransform: 'capitalize' }}>{p.project_type}</span></td>
                <td><span className={`badge ${STATUS_BADGE[p.status] || 'badge-gray'}`}>{p.status}</span></td>
                <td style={{ color: 'var(--text-muted)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {!recent_projects.length && (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
