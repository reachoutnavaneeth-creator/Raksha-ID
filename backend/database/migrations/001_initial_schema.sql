-- Enable UUID generation
create extension if not exists pgcrypto;

----------------------------------------------------
-- Profiles
----------------------------------------------------
create table if not exists profiles (
    id uuid primary key default gen_random_uuid(),

    auth_id uuid unique not null,

    phone text unique not null,
    email text unique not null,

    full_name text,
    dob date,
    gender text,

    blood_group text,

    house_no text,
    street text,
    area text,
    city text,
    state text,
    country text,
    pincode text,

    profile_photo text,

    is_profile_completed boolean default false,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

----------------------------------------------------
-- Medical Information
----------------------------------------------------
create table if not exists medical_information (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid references profiles(id) on delete cascade,

    allergies text,

    medical_conditions text,

    medications text,

    organ_donor boolean default false,

    updated_at timestamptz default now()
);

----------------------------------------------------
-- Emergency Contacts
----------------------------------------------------
create table if not exists emergency_contacts (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid references profiles(id) on delete cascade,

    full_name text not null,

    relationship text not null,

    phone text not null,

    created_at timestamptz default now()
);

----------------------------------------------------
-- Documents
----------------------------------------------------
create table if not exists documents (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid references profiles(id) on delete cascade,

    document_type text not null,

    document_number text,

    file_url text,

    verified boolean default false,

    uploaded_at timestamptz default now()
);

----------------------------------------------------
-- QR Codes
----------------------------------------------------
create table if not exists qr_codes (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid references profiles(id) on delete cascade,

    qr_token text unique not null,

    active boolean default true,

    created_at timestamptz default now()
);

----------------------------------------------------
-- Activity Logs
----------------------------------------------------
create table if not exists activity_logs (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid references profiles(id) on delete cascade,

    activity text not null,

    created_at timestamptz default now()
);