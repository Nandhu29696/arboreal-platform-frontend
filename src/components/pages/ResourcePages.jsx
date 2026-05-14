import React from 'react';
import GenericListPage from './GenericListPage';
import {
  productsApi, employeesApi, vendorsApi, consultantsApi, landApi,
  ngosApi, businessAssocApi, volunteersApi, hospitalityApi,
  nurseryVendorsApi, treeSpeciesApi
} from '../../utils/api';
import {
  ProductForm, EmployeeForm, VendorForm, ConsultantForm, LandForm,
  NgoForm, BusinessAssocForm, VolunteerForm, HospitalityForm,
  NurseryVendorForm, FlowerForm, FruitForm, BirdForm, ReptileForm
} from '../forms/ResourceForms';

// ── Products ──────────────────────────────────────────────────
export function ProductsPage() {
  return (
    <GenericListPage
      apiObj={productsApi}
      title="Products"
      subtitle="Equipment and product catalogue"
      FormComponent={ProductForm}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'product_type', label: 'Type' },
        { key: 'description', label: 'Description', render: v => v ? v.substring(0, 60) + (v.length > 60 ? '…' : '') : '—' },
      ]}
    />
  );
}

// ── Employees ─────────────────────────────────────────────────
export function EmployeesPage() {
  return (
    <GenericListPage
      apiObj={employeesApi}
      title="Employees"
      subtitle="Internal staff directory"
      FormComponent={EmployeeForm}
      formWidth={680}
      columns={[
        { key: 'employee_id', label: 'Emp ID' },
        { key: 'name', label: 'Name' },
        { key: 'designation', label: 'Designation' },
        { key: 'location', label: 'Location' },
        { key: 'mobile_number', label: 'Mobile' },
        { key: 'blood_group', label: 'Blood Group', render: v => v ? <span className="badge badge-blue">{v}</span> : '—' },
      ]}
    />
  );
}

// ── Vendors ───────────────────────────────────────────────────
export function VendorsPage() {
  return (
    <GenericListPage
      apiObj={vendorsApi}
      title="Vendors"
      subtitle="External service providers"
      FormComponent={VendorForm}
      formWidth={680}
      columns={[
        { key: 'company_name', label: 'Company' },
        { key: 'vendor_type', label: 'Type', render: v => <span className="badge badge-yellow">{v}</span> },
        { key: 'poc_name', label: 'POC' },
        { key: 'contact_number', label: 'Contact' },
        { key: 'operating_zone', label: 'Zone' },
        { key: 'credit_period', label: 'Credit (days)' },
      ]}
    />
  );
}

// ── Consultants ───────────────────────────────────────────────
export function ConsultantsPage() {
  return (
    <GenericListPage
      apiObj={consultantsApi}
      title="Technical Consultants"
      subtitle="Environmental and sustainability consultants"
      FormComponent={ConsultantForm}
      formWidth={680}
      columns={[
        { key: 'company_name', label: 'Company' },
        { key: 'consultancy_type', label: 'Type', render: v => v ? v.substring(0, 45) + (v.length > 45 ? '…' : '') : '—' },
        { key: 'poc_name', label: 'POC' },
        { key: 'contact_number', label: 'Contact' },
        { key: 'operating_zone', label: 'Zone' },
      ]}
    />
  );
}

// ── Land Resources ────────────────────────────────────────────
export function LandPage() {
  return (
    <GenericListPage
      apiObj={landApi}
      title="Land Resources"
      subtitle="Available land parcels for plantation activities"
      FormComponent={LandForm}
      formWidth={680}
      columns={[
        { key: 'location', label: 'Location' },
        { key: 'land_type', label: 'Land Type', render: v => <span className="badge badge-green">{v}</span> },
        { key: 'owner_poc_name', label: 'Owner/POC' },
        { key: 'land_size_acres', label: 'Size (acres)' },
        { key: 'soil_test_status', label: 'Soil Test', render: v => {
          const cls = v === 'Completed' ? 'badge-green' : v === 'Pending' ? 'badge-yellow' : 'badge-gray';
          return <span className={`badge ${cls}`}>{v || 'Not Done'}</span>;
        }},
      ]}
    />
  );
}

// ── NGOs ──────────────────────────────────────────────────────
export function NgosPage() {
  return (
    <GenericListPage
      apiObj={ngosApi}
      title="NGOs"
      subtitle="Non-governmental organization registry"
      FormComponent={NgoForm}
      formWidth={680}
      columns={[
        { key: 'ngo_name', label: 'NGO Name' },
        { key: 'registration_number', label: 'Reg. Number' },
        { key: 'poc_name', label: 'POC' },
        { key: 'operating_zone', label: 'Zone' },
        { key: 'employee_strength', label: 'Strength' },
        { key: 'specialization', label: 'Specialization', render: v => v ? v.substring(0, 50) + '…' : '—' },
      ]}
    />
  );
}

// ── Business Associates ───────────────────────────────────────
export function BusinessAssocPage() {
  return (
    <GenericListPage
      apiObj={businessAssocApi}
      title="Business Associates"
      subtitle="Business associate and partner registry"
      FormComponent={BusinessAssocForm}
      formWidth={680}
      columns={[
        { key: 'company_name', label: 'Company' },
        { key: 'business_type', label: 'Type', render: v => <span className="badge badge-blue">{v}</span> },
        { key: 'poc_name', label: 'POC' },
        { key: 'contact_number', label: 'Contact' },
        { key: 'operating_zone', label: 'Zone' },
      ]}
    />
  );
}

// ── Volunteers ────────────────────────────────────────────────
export function VolunteersPage() {
  return (
    <GenericListPage
      apiObj={volunteersApi}
      title="Volunteers"
      subtitle="Volunteer pool for field activities"
      FormComponent={VolunteerForm}
      formWidth={680}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'mobile_number', label: 'Mobile' },
        { key: 'location', label: 'Location' },
        { key: 'specialization', label: 'Specialization' },
        { key: 'employed', label: 'Employed', render: v => <span className={`badge ${v ? 'badge-green' : 'badge-gray'}`}>{v ? 'Yes' : 'No'}</span> },
        { key: 'blood_group', label: 'Blood Group' },
      ]}
    />
  );
}

// ── Hospitality ───────────────────────────────────────────────
export function HospitalityPage() {
  return (
    <GenericListPage
      apiObj={hospitalityApi}
      title="Hospitality Verticals"
      subtitle="Farm houses, resorts, and nature stays"
      FormComponent={HospitalityForm}
      columns={[
        { key: 'name_of_place', label: 'Name' },
        { key: 'hospitality_type', label: 'Type', render: v => <span className="badge badge-blue">{v}</span> },
        { key: 'poc_details', label: 'POC' },
        { key: 'mobile_number', label: 'Mobile' },
        { key: 'location', label: 'Location' },
      ]}
    />
  );
}

// ── Nursery Vendors ───────────────────────────────────────────
export function NurseryVendorsPage() {
  return (
    <GenericListPage
      apiObj={nurseryVendorsApi}
      title="Nursery Vendors"
      subtitle="Sapling and nursery suppliers"
      FormComponent={NurseryVendorForm}
      formWidth={680}
      columns={[
        { key: 'company_name', label: 'Company' },
        { key: 'sapling_species_type', label: 'Species Type', render: v => <span className="badge badge-green">{v}</span> },
        { key: 'species_category', label: 'Category' },
        { key: 'name_of_saplings', label: 'Sapling Name' },
        { key: 'qty_available', label: 'Qty Available' },
        { key: 'transport_option', label: 'Transport', render: v => <span className={`badge ${v ? 'badge-green' : 'badge-gray'}`}>{v ? 'Yes' : 'No'}</span> },
      ]}
    />
  );
}

// ── Tree Species ──────────────────────────────────────────────
export function FlowersPage() {
  return (
    <GenericListPage
      apiObj={treeSpeciesApi.flowers}
      title="Tree Species — Flowers"
      FormComponent={FlowerForm}
      columns={[
        { key: 'flower_name', label: 'Flower Name' },
        { key: 'category', label: 'Category', render: v => <span className="badge badge-blue">{v}</span> },
        { key: 'sapling_name', label: 'Sapling Name' },
        { key: 'qty_available', label: 'Qty Available' },
      ]}
    />
  );
}

export function FruitsPage() {
  return (
    <GenericListPage
      apiObj={treeSpeciesApi.fruits}
      title="Tree Species — Fruits"
      FormComponent={FruitForm}
      columns={[
        { key: 'fruit_name', label: 'Fruit Name' },
        { key: 'category', label: 'Category', render: v => <span className="badge badge-yellow">{v}</span> },
        { key: 'sapling_name', label: 'Sapling Name' },
        { key: 'environment', label: 'Environment' },
        { key: 'soil_type', label: 'Soil Type' },
      ]}
    />
  );
}

export function BirdsPage() {
  return (
    <GenericListPage
      apiObj={treeSpeciesApi.birds}
      title="Tree Species — Birds"
      FormComponent={BirdForm}
      columns={[
        { key: 'species_name', label: 'Species Name' },
        { key: 'category', label: 'Category', render: v => <span className="badge badge-blue">{v}</span> },
        { key: 'environment', label: 'Environment' },
        { key: 'soil_type', label: 'Soil Type' },
      ]}
    />
  );
}

export function ReptilesPage() {
  return (
    <GenericListPage
      apiObj={treeSpeciesApi.reptiles}
      title="Tree Species — Reptiles"
      FormComponent={ReptileForm}
      columns={[
        { key: 'species_name', label: 'Species Name' },
        { key: 'reptile_name', label: 'Reptile Name' },
        { key: 'category', label: 'Category', render: v => <span className="badge badge-yellow">{v}</span> },
        { key: 'surface_type', label: 'Surface Type' },
        { key: 'environment', label: 'Environment' },
      ]}
    />
  );
}
