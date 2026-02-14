
import { createClient } from '@supabase/supabase-js';

// NOTA: Em produção, estas chaves devem estar no process.env. 
// Como engenheiro sênior, assumo que estas chaves são injetadas corretamente.
const supabaseUrl = (process.env.SUPABASE_URL as string) || 'https://seu-projeto.supabase.co';
const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY as string) || 'sua-chave-anon-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
