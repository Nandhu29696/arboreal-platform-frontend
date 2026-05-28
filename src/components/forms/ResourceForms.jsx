import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn, FormRow, Field, SelectField } from '../ui';
import {
  VENDOR_TYPES, CONSULTANCY_TYPES, OPERATING_ZONES, LAND_TYPES, OWNER_TYPES,
  HOSPITALITY_TYPES, BLOOD_GROUPS, BUSINESS_TYPES, SOIL_TEST_STATUSES,
  SAPLING_SPECIES_TYPES, SPECIES_CATEGORIES, PRODUCT_TYPES, SEASON_CATEGORIES
} from '../../utils/constants';

function FormFooter({ onCancel }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
      <Btn variant="secondary" onClick={onCancel} type="button">Cancel</Btn>
      <Btn type="submit">Save</Btn>
    </div>
  );
}

// ── PRODUCT FORM ──────────────────────────────────────────────
export function ProductForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow cols={1}>
        <Field label="Product Type" required>
          <SelectField options={PRODUCT_TYPES} {...register('product_type', { required: true })} />
        </Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Name" required><input {...register('name', { required: true })} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Description"><textarea rows={3} {...register('description')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── EMPLOYEE FORM ─────────────────────────────────────────────
export function EmployeeForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Employee ID" required><input {...register('employee_id', { required: true })} /></Field>
        <Field label="Name" required><input {...register('name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Designation"><input {...register('designation')} /></Field>
        <Field label="Mobile Number"><input {...register('mobile_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('email_id')} /></Field>
        <Field label="Location"><input {...register('location')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Education Qualification"><input {...register('education_qualification')} /></Field>
        <Field label="Blood Group">
          <SelectField options={BLOOD_GROUPS} {...register('blood_group')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Emergency Contact"><input {...register('emergency_contact')} /></Field>
        <Field label="Language Skills (comma-sep)"><input {...register('language_skills')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Permanent Address"><textarea rows={2} {...register('permanent_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── VENDOR FORM ───────────────────────────────────────────────
export function VendorForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });
  // IMPORTANT FOR EDIT
  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Vendor Type" required>
          <SelectField options={VENDOR_TYPES} {...register('vendor_type', { required: true })} />
        </Field>
        <Field label="Company Name" required><input {...register('company_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
        <Field label="Operating Zone">
          <SelectField options={OPERATING_ZONES} {...register('operating_zone')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="GST Details"><input {...register('gst_details')} /></Field>
        <Field label="Credit Period (days)"><input type="number" {...register('credit_period')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Employee Strength"><input type="number" {...register('employee_strength')} /></Field>
        <Field label="Pin Code"><input {...register('pin_code')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Communication Address"><textarea rows={2} {...register('communication_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── CONSULTANT FORM ───────────────────────────────────────────
export function ConsultantForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Consultancy Type" required>
          <SelectField options={CONSULTANCY_TYPES} {...register('consultancy_type', { required: true })} />
        </Field>
        <Field label="Company Name" required><input {...register('company_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
        <Field label="Operating Zone">
          <SelectField options={OPERATING_ZONES} {...register('operating_zone')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="GST Details"><input {...register('gst_details')} /></Field>
        <Field label="Credit Period (days)"><input type="number" {...register('credit_period')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Communication Address"><textarea rows={2} {...register('communication_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── LAND FORM ─────────────────────────────────────────────────
export function LandForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Land Type" required>
          <SelectField options={LAND_TYPES} {...register('land_type', { required: true })} />
        </Field>
        <Field label="Owner Type">
          <SelectField options={OWNER_TYPES} {...register('owner_type')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Owner/POC Name"><input {...register('owner_poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
        <Field label="Location"><input {...register('location')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Land Size (acres)"><input type="number" step="0.01" {...register('land_size_acres')} /></Field>
        <Field label="Pin Code"><input {...register('pin_code')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Water Resource"><input {...register('water_resource')} /></Field>
        <Field label="Soil Test Status">
          <SelectField options={SOIL_TEST_STATUSES} {...register('soil_test_status')} />
        </Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Suggested Plantations"><textarea rows={2} {...register('suggested_plantations')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Communication Address"><textarea rows={2} {...register('communication_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── NGO FORM ──────────────────────────────────────────────────
export function NgoForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="NGO Name" required><input {...register('ngo_name', { required: true })} /></Field>
        <Field label="Registration Number"><input {...register('registration_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
        <Field label="Operating Zone">
          <SelectField options={OPERATING_ZONES} {...register('operating_zone')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Employee Strength"><input type="number" {...register('employee_strength')} /></Field>
        <Field label="Credit Period (days)"><input type="number" {...register('credit_period')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Specialization"><textarea rows={2} {...register('specialization')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Communication Address"><textarea rows={2} {...register('communication_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── BUSINESS ASSOCIATE FORM ───────────────────────────────────
export function BusinessAssocForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Business Type" required>
          <SelectField options={BUSINESS_TYPES} {...register('business_type', { required: true })} />
        </Field>
        <Field label="Company Name" required><input {...register('company_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
        <Field label="Operating Zone">
          <SelectField options={OPERATING_ZONES} {...register('operating_zone')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="GST Details"><input {...register('gst_details')} /></Field>
        <Field label="Credit Period (days)"><input type="number" {...register('credit_period')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Specialization"><textarea rows={2} {...register('specialization')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── VOLUNTEER FORM ────────────────────────────────────────────
export function VolunteerForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Name" required><input {...register('name', { required: true })} /></Field>
        <Field label="Aadhar ID"><input {...register('aadhar_id')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Mobile Number"><input {...register('mobile_number')} /></Field>
        <Field label="Email"><input type="email" {...register('email_id')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Location"><input {...register('location')} /></Field>
        <Field label="Blood Group">
          <SelectField options={BLOOD_GROUPS} {...register('blood_group')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Education Qualification"><input {...register('education_qualification')} /></Field>
        <Field label="Employed">
          <SelectField options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} {...register('employed')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Specialization"><input {...register('specialization')} /></Field>
        <Field label="Language Skills (comma-sep)"><input {...register('language_skills')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Emergency Contact"><input {...register('emergency_contact')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Permanent Address"><textarea rows={2} {...register('permanent_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── HOSPITALITY FORM ──────────────────────────────────────────
export function HospitalityForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Hospitality Type" required>
          <SelectField options={HOSPITALITY_TYPES} {...register('hospitality_type', { required: true })} />
        </Field>
        <Field label="Name of Place" required><input {...register('name_of_place', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="POC Details"><input {...register('poc_details')} /></Field>
        <Field label="Mobile Number"><input {...register('mobile_number')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Email"><input type="email" {...register('email_id')} /></Field>
        <Field label="Location"><input {...register('location')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Specialization"><input {...register('specialization')} /></Field>
        <Field label="Pin Code"><input {...register('pin_code')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Address"><textarea rows={2} {...register('address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── NURSERY VENDOR FORM ───────────────────────────────────────
export function NurseryVendorForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Company Name" required><input {...register('company_name', { required: true })} /></Field>
        <Field label="POC Name"><input {...register('poc_name')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Contact Number"><input {...register('contact_number')} /></Field>
        <Field label="Email"><input type="email" {...register('mail_id')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Sapling Species Type">
          <SelectField options={SAPLING_SPECIES_TYPES} {...register('sapling_species_type')} />
        </Field>
        <Field label="Species Category">
          <SelectField options={SPECIES_CATEGORIES} {...register('species_category')} />
        </Field>
      </FormRow>
      <FormRow>
        <Field label="Name of Saplings"><input {...register('name_of_saplings')} /></Field>
        <Field label="Size of Saplings"><input {...register('size_of_saplings')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Qty Available"><input type="number" {...register('qty_available')} /></Field>
        <Field label="Operating Zone">
          <SelectField options={OPERATING_ZONES} {...register('operating_zone')} />
        </Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Communication Address"><textarea rows={2} {...register('communication_address')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

// ── TREE SPECIES FLOWER FORM ──────────────────────────────────
export function FlowerForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Category">
          <SelectField options={SEASON_CATEGORIES} {...register('category')} />
        </Field>
        <Field label="Flower Name" required><input {...register('flower_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Sapling Name"><input {...register('sapling_name')} /></Field>
        <Field label="Qty Available"><input type="number" {...register('qty_available')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

export function FruitForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Category">
          <SelectField options={SEASON_CATEGORIES} {...register('category')} />
        </Field>
        <Field label="Fruit Name" required><input {...register('fruit_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Sapling Name"><input {...register('sapling_name')} /></Field>
        <Field label="Environment"><input {...register('environment')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Soil Type"><input {...register('soil_type')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

export function BirdForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Category">
          <SelectField options={SEASON_CATEGORIES} {...register('category')} />
        </Field>
        <Field label="Species Name" required><input {...register('species_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Bird Types (comma-sep)"><input {...register('bird_types')} /></Field>
        <Field label="Environment"><input {...register('environment')} /></Field>
      </FormRow>
      <FormRow cols={1}>
        <Field label="Soil Type"><input {...register('soil_type')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}

export function ReptileForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Field label="Category">
          <SelectField options={SEASON_CATEGORIES} {...register('category')} />
        </Field>
        <Field label="Species Name" required><input {...register('species_name', { required: true })} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Reptile Name"><input {...register('reptile_name')} /></Field>
        <Field label="Surface Type"><input {...register('surface_type')} /></Field>
      </FormRow>
      <FormRow>
        <Field label="Environment"><input {...register('environment')} /></Field>
        <Field label="Soil Type"><input {...register('soil_type')} /></Field>
      </FormRow>
      <FormFooter onCancel={onCancel} />
    </form>
  );
}
