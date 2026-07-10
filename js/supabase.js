const SUPABASE_URL = "https://stbngetpiepssbharwaa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Ym5nZXRwaWVwc3NiaGFyd2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzM2NTksImV4cCI6MjA5OTIwOTY1OX0.sgqgqJa69V90t2Uqm8DD24AURtxoBb-KO3rskg4buB0";

export const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);