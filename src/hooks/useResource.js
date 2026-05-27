import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useResource(apiObj, defaultFilters = {}) {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] =
    useState(defaultFilters);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  // ─────────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────────
  const fetch = useCallback(async (p = page) => {
    setLoading(true);
    try {
      const res =
        await apiObj.list({
          page: p,
          limit: 20,
          ...filters
        });
      console.log('API RESPONSE =>', res);
      
      // API returns array directly
      if (Array.isArray(res)) {

        setData(res);

        setTotal(res.length);

      }

      // API returns object
      else {

        setData(res.data || []);

        setTotal(
          res.total ||
          res.data?.length ||
          0
        );

      }

    } catch (e) {

      console.error(e);

      toast.error(
        e?.message ||
        e?.error ||
        'Failed to load data'
      );

    } finally {

      setLoading(false);

    }

  }, [page, filters, apiObj]);

  // ─────────────────────────────────────────────
  // AUTO LOAD
  // ─────────────────────────────────────────────
  useEffect(() => {

    fetch(page);

  }, [page, filters, fetch]);

  // ─────────────────────────────────────────────
  // MODAL
  // ─────────────────────────────────────────────
  const openCreate = () => {

    setEditing(null);

    setModalOpen(true);

  };

  const openEdit = (row) => {

    setEditing(row);

    setModalOpen(true);

  };

  const closeModal = () => {

    setModalOpen(false);

    setEditing(null);

  };

  // ─────────────────────────────────────────────
  // SAVE
  // ─────────────────────────────────────────────
  const save = async (formData) => {

    try {

      if (editing) {

        await apiObj.update(
          editing.id,
          formData
        );

        toast.success(
          'Updated successfully'
        );

      } else {

        await apiObj.create(formData);

        toast.success(
          'Created successfully'
        );

      }

      closeModal();

      fetch(page);

    } catch (e) {

      console.error(e);

      toast.error(
        e?.message ||
        e?.error ||
        'Save failed'
      );

    }

  };

  // ─────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────
  const remove = async (id) => {

    if (
      !window.confirm(
        'Delete this record?'
      )
    ) return;

    try {

      await apiObj.delete(id);

      toast.success('Deleted');

      fetch(page);

    } catch (e) {

      console.error(e);

      toast.error(
        e?.message ||
        e?.error ||
        'Delete failed'
      );

    }

  };

  return {

    data,
    total,

    page,
    setPage,

    loading,

    filters,
    setFilters,

    modalOpen,
    editing,

    openCreate,
    openEdit,
    closeModal,

    save,
    remove,

    refresh: fetch

  };

}