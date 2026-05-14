import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './components/pages/Dashboard';
import { ProjectsPage, ProjectDetailPage } from './components/pages/ProjectsPage';
import {
  ProductsPage, EmployeesPage, VendorsPage, ConsultantsPage, LandPage,
  NgosPage, BusinessAssocPage, VolunteersPage, HospitalityPage,
  NurseryVendorsPage, FlowersPage, FruitsPage, BirdsPage, ReptilesPage
} from './components/pages/ResourcePages';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
          },
          success: { iconTheme: { primary: 'var(--accent)', secondary: 'var(--text-inverse)' } },
        }}
      />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="consultants" element={<ConsultantsPage />} />
          <Route path="land" element={<LandPage />} />
          <Route path="ngos" element={<NgosPage />} />
          <Route path="business-associates" element={<BusinessAssocPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="hospitality" element={<HospitalityPage />} />
          <Route path="nursery-vendors" element={<NurseryVendorsPage />} />
          <Route path="species/flowers" element={<FlowersPage />} />
          <Route path="species/fruits" element={<FruitsPage />} />
          <Route path="species/birds" element={<BirdsPage />} />
          <Route path="species/reptiles" element={<ReptilesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
