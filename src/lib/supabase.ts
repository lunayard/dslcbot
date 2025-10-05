import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          year_level: string;
          created_at: string;
          updated_at: string;
        };
      };
      courses: {
        Row: {
          id: string;
          code: string;
          name: string;
          teacher: string | null;
          hours: number;
          year_level: string;
          semester: number;
          option: string | null;
          created_at: string;
        };
      };
      timetable: {
        Row: {
          id: string;
          course_id: string | null;
          day: string;
          start_time: string;
          end_time: string;
          week_type: string;
          year_level: string;
          semester: number;
          option: string | null;
          created_at: string;
        };
      };
      advice: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          year_level: string | null;
          created_at: string;
        };
      };
      documents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          url: string;
          type: string;
          year_level: string | null;
          course_id: string | null;
          created_at: string;
        };
      };
      career_paths: {
        Row: {
          id: string;
          title: string;
          description: string;
          option: string;
          type: string;
          created_at: string;
        };
      };
    };
  };
};
