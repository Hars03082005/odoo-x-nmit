import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://izgafihzdzrnwfflqadu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)
console.log('Supabase Key length:', supabaseAnonKey?.length || 0)

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing! Please create a .env file with your Supabase anon key.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)