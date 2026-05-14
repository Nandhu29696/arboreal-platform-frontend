import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Eye, Pencil, Trash2, Calendar, MapPin, Building2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { projectsApi } from '../../utils/api';
import {
  PageHeader, Card, Btn, Modal, Loading, Empty, Pagination,
  FormRow, Field, SelectField
} from '../ui';
import { PROJECT_TYPES, PROJECT_STATUSES, INDUSTRIAL_VERTICALS, STATUS_BADGE } from '../../utils/constants';

// ── Project Form ──────────────────────────────────────────────
function ProjectForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Project Name" required><input {...register('project_name', { required: true })} /></Field>
        <Field label="Project Type" required>
          <SelectField options={PROJECT_TYPES.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
            {...register('project_type', { required: true })} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Organization Name"><input {...register('organization_name')} /></Field>
        <Field label="Status">
          <SelectField options={PROJECT_STATUSES} {...register('status')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Industrial Vertical">
          <SelectField options={INDUSTRIAL_VERTICALS} {...register('industrial_vertical')} />
        </Field>
        <Field label="Estimated Completion">
          <input type="date" {...register('estimated_completion')} />
        </Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Address Details"><textarea rows={2} {...register('address_details')} /></Field>
      </FormRow>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <Btn variant="secondary" onClick={onCancel} type="button">Cancel</Btn>
        <Btn type="submit">Save Project</Btn>
      </div>
    </form>
  );
}

// ── Projects List Page ────────────────────────────────────────
export function ProjectsPage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const fetch = async (p = page) => {
    setLoading(true);
    try {
      const params = { page: p, limit: 20 };
      if (filterType) params.project_type = filterType;
      if (filterStatus) params.status = filterStatus;
      const res = await projectsApi.list(params);
      setData(res.data || []); setTotal(res.total || 0);
    } catch (e) { toast.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(page); }, [page, filterType, filterStatus]); // eslint-disable-line

  const save = async (fd) => {
    try {
      if (editing) { await projectsApi.update(editing.id, fd); toast.success('Updated'); }
      else { await projectsApi.create(fd); toast.success('Created'); }
      setModalOpen(false); setEditing(null); fetch(page);
    } catch (e) { toast.error(e); }
  };

  const remove = async (id) => {
    if (!window.confirm('Cancel this project?')) return;
    try { await projectsApi.delete(id); toast.success('Cancelled'); fetch(page); }
    catch (e) { toast.error(e); }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Tree census, transplantation, plantation and maintenance projects"
        action={<Btn onClick={() => { setEditing(null); setModalOpen(true); }}><Plus size={15} /> New Project</Btn>}
      />

      {/* Filters */}
      <Card style={{ marginBottom: '1rem', padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, fontFamily: 'var(--font-display)' }}>FILTER:</span>
          <select style={{ width: 160 }} value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }}>
            <option value="">All Types</option>
            {PROJECT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
          <select style={{ width: 160 }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="">All Statuses</option>
            {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(filterType || filterStatus) && (
            <Btn variant="ghost" size="sm" onClick={() => { setFilterType(''); setFilterStatus(''); }}>Clear</Btn>
          )}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? <Loading /> : !data.length ? <Empty message="No projects yet. Create your first project." /> : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Type</th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>POC</th>
                    <th>Est. Completion</th>
                    <th style={{ width: 110 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(row => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.project_name}</td>
                      <td><span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{row.project_type}</span></td>
                      <td>{row.organization_name || '—'}</td>
                      <td><span className={`badge ${STATUS_BADGE[row.status] || 'badge-gray'}`}>{row.status}</span></td>
                      <td>{row.poc_name || '—'}</td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {row.estimated_completion ? new Date(row.estimated_completion).toLocaleDateString() : '—'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Btn variant="ghost" size="sm" onClick={() => navigate(`/projects/${row.id}`)}>
                            <Eye size={13} />
                          </Btn>
                          <Btn variant="ghost" size="sm" onClick={() => { setEditing(row); setModalOpen(true); }}>
                            <Pencil size={13} />
                          </Btn>
                          <Btn variant="danger" size="sm" onClick={() => remove(row.id)}>
                            <Trash2 size={13} />
                          </Btn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)' }}>
              <Pagination page={page} total={total} limit={20} onPage={setPage} />
            </div>
          </>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}
        title={editing ? 'Edit Project' : 'New Project'} width={640}>
        <ProjectForm defaultValues={editing || {}} onSubmit={save} onCancel={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>
    </div>
  );
}

// ── Project Detail Page ───────────────────────────────────────
export function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [updateText, setUpdateText] = useState('');
  const navigate = useNavigate();

  // Get project ID from URL
  const id = window.location.pathname.split('/').pop();

  useEffect(() => {
    projectsApi.get(id)
      .then(setProject)
      .catch(e => { toast.error(e); navigate('/projects'); })
      .finally(() => setLoading(false));
  }, [id]); // eslint-disable-line

  const postUpdate = async () => {
    if (!updateText.trim()) return;
    try {
      await projectsApi.addUpdate(id, { description: updateText });
      toast.success('Update posted');
      setUpdateText('');
      const fresh = await projectsApi.get(id);
      setProject(fresh);
    } catch (e) { toast.error(e); }
  };

  if (loading) return <Loading />;
  if (!project) return null;

  const TABS = ['overview', 'details', 'volunteers', 'updates'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
        <Btn variant="secondary" size="sm" onClick={() => navigate('/projects')}>← Back</Btn>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              {project.project_name}
            </h2>
            <span className={`badge ${STATUS_BADGE[project.status] || 'badge-gray'}`}>{project.status}</span>
            <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{project.project_type}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            {project.organization_name && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Building2 size={13} /> {project.organization_name}
              </span>
            )}
            {project.address_details && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={13} /> {project.address_details.substring(0, 60)}
              </span>
            )}
            {project.estimated_completion && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} /> Due: {new Date(project.estimated_completion).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: 'none', border: 'none', padding: '0.65rem 1.25rem',
            color: activeTab === t ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: activeTab === t ? '2px solid var(--accent)' : '2px solid transparent',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem',
            textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.15s'
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Project Info</h3>
            {[
              ['Organization', project.organization_name],
              ['POC Name', project.poc_name],
              ['Contact', project.contact_number],
              ['Industrial Vertical', project.industrial_vertical],
              ['Address', project.address_details],
            ].map(([k, v]) => v ? (
              <div key={k} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 130 }}>{k}</span>
                <span style={{ color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ) : null)}
          </Card>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Summary</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <p>Created: {new Date(project.created_at).toLocaleString()}</p>
              <p style={{ marginTop: 6 }}>Volunteers assigned: {project.volunteers?.length || 0}</p>
              <p style={{ marginTop: 6 }}>Daily updates logged: {project.recent_updates?.length || 0}</p>
            </div>
          </Card>
        </div>
      )}

      {/* Details Tab */}
      {activeTab === 'details' && (
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
            {project.project_type?.charAt(0).toUpperCase() + project.project_type?.slice(1)} Details
          </h3>
          {project.detail && Object.keys(project.detail).length ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {Object.entries(project.detail)
                .filter(([k]) => !['id', 'project_id', 'created_at', 'updated_at'].includes(k))
                .map(([k, v]) => (
                  <div key={k} style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}: </span>
                    <span style={{ color: 'var(--text-primary)' }}>{String(v ?? '—')}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No {project.project_type} details saved yet. Use the API to add details.
            </p>
          )}
        </Card>
      )}

      {/* Volunteers Tab */}
      {activeTab === 'volunteers' && (
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Assigned Volunteers</h3>
          {project.volunteers?.length ? (
            <table>
              <thead><tr><th>Name</th><th>Mobile</th><th>Specialization</th><th>Role</th></tr></thead>
              <tbody>
                {project.volunteers.map(v => (
                  <tr key={v.id}>
                    <td>{v.name}</td>
                    <td>{v.mobile_number || '—'}</td>
                    <td>{v.specialization || '—'}</td>
                    <td>{v.role || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <Empty message="No volunteers assigned yet" />}
        </Card>
      )}

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Post Daily Update</h3>
            <textarea
              value={updateText}
              onChange={e => setUpdateText(e.target.value)}
              rows={3}
              placeholder="Describe today's field activities…"
              style={{ marginBottom: '0.75rem' }}
            />
            <Btn onClick={postUpdate} disabled={!updateText.trim()}>Post Update</Btn>
          </Card>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', marginBottom: '1rem' }}>Recent Updates</h3>
            {project.recent_updates?.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.recent_updates.map(u => (
                  <div key={u.id} style={{
                    padding: '0.85rem', background: 'var(--bg-surface)',
                    borderRadius: 8, border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                      {new Date(u.update_date).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{u.description}</div>
                  </div>
                ))}
              </div>
            ) : <Empty message="No updates yet" />}
          </Card>
        </div>
      )}
    </div>
  );
}
