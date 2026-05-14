import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  PageHeader, Card, Btn, Modal, Loading, Empty, Pagination
} from '../ui';
import { useResource } from '../../hooks/useResource';

/**
 * GenericListPage
 * Props:
 *   apiObj       – { list, get, create, update, delete }
 *   columns      – [{ key, label, render? }]
 *   FormComponent – React component receiving { defaultValues, onSubmit }
 *   title, subtitle
 *   filters?      – JSX filter controls
 */
export default function GenericListPage({
  apiObj, columns, FormComponent,
  title, subtitle, formWidth,
  filterSlot
}) {
  const {
    data, total, page, setPage, loading,
    modalOpen, editing, openCreate, openEdit, closeModal, save, remove
  } = useResource(apiObj);

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          <Btn onClick={openCreate}>
            <Plus size={15} /> Add New
          </Btn>
        }
      />

      {filterSlot && (
        <Card style={{ marginBottom: '1rem', padding: '0.85rem 1rem' }}>
          {filterSlot}
        </Card>
      )}

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? <Loading /> : !data.length ? <Empty /> : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    {columns.map(c => <th key={c.key}>{c.label}</th>)}
                    <th style={{ width: 90 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(row => (
                    <tr key={row.id}>
                      {columns.map(c => (
                        <td key={c.key}>
                          {c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—')}
                        </td>
                      ))}
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Btn variant="ghost" size="sm" onClick={() => openEdit(row)}>
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

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? `Edit ${title}` : `New ${title}`}
        width={formWidth || 560}
      >
        <FormComponent
          defaultValues={editing || {}}
          onSubmit={save}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
