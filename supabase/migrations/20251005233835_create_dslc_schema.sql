/*
  # DSLC Assistant - Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `year_level` (text) - L1, L2, or L3
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `code` (text) - Course code like "1LNG 1162"
      - `name` (text) - Course name
      - `teacher` (text) - Teacher name
      - `hours` (integer) - Volume horaire
      - `year_level` (text) - L1, L2, or L3
      - `semester` (integer) - 1 to 6
      - `option` (text, nullable) - For L3: Description Linguistique, Didactique, etc.
      - `created_at` (timestamptz)
    
    - `timetable`
      - `id` (uuid, primary key)
      - `course_id` (uuid, references courses)
      - `day` (text) - Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi
      - `start_time` (text) - e.g., "07h-10h"
      - `end_time` (text) - e.g., "10h-13h"
      - `week_type` (text) - "morning" or "afternoon"
      - `year_level` (text)
      - `semester` (integer)
      - `option` (text, nullable)
      - `created_at` (timestamptz)
    
    - `advice`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text) - study, organization, methodology
      - `year_level` (text, nullable) - Specific to year or null for all
      - `created_at` (timestamptz)
    
    - `documents`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, nullable)
      - `url` (text)
      - `type` (text) - pdf, link, video
      - `year_level` (text, nullable)
      - `course_id` (uuid, nullable, references courses)
      - `created_at` (timestamptz)
    
    - `career_paths`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `option` (text) - L3 option
      - `type` (text) - formation_objective, career_profile, professional_outlet, internship
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their relevant data
    - Add policies for reading public data (courses, timetable, advice, documents, career_paths)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  year_level text DEFAULT 'L1',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  name text NOT NULL,
  teacher text,
  hours integer DEFAULT 0,
  year_level text NOT NULL,
  semester integer NOT NULL,
  option text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Create timetable table
CREATE TABLE IF NOT EXISTS timetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  day text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  week_type text NOT NULL,
  year_level text NOT NULL,
  semester integer NOT NULL,
  option text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read timetable"
  ON timetable FOR SELECT
  TO authenticated
  USING (true);

-- Create advice table
CREATE TABLE IF NOT EXISTS advice (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  year_level text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advice ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read advice"
  ON advice FOR SELECT
  TO authenticated
  USING (true);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  type text DEFAULT 'pdf',
  year_level text,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read documents"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

-- Create career_paths table
CREATE TABLE IF NOT EXISTS career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  option text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read career paths"
  ON career_paths FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_year_semester ON courses(year_level, semester);
CREATE INDEX IF NOT EXISTS idx_timetable_year_semester ON timetable(year_level, semester);
CREATE INDEX IF NOT EXISTS idx_advice_year ON advice(year_level);
CREATE INDEX IF NOT EXISTS idx_documents_year ON documents(year_level);