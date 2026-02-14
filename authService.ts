
import { User } from './types';
import { supabase } from './supabaseClient';

export const authService = {
  // Mapeia o objeto do Supabase para o nosso tipo User interno
  mapSupabaseUser: (sbUser: any): User => {
    return {
      id: sbUser.id,
      name: sbUser.user_metadata?.full_name || 'Usuário',
      email: sbUser.email || '',
      isVerified: !!sbUser.email_confirmed_at,
      avatar: sbUser.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${sbUser.id}`
    };
  },

  signup: async (name: string, email: string, password?: string): Promise<User> => {
    if (!password) throw new Error("Senha é obrigatória.");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          avatar_url: `https://i.pravatar.cc/150?u=${email}`
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("Não foi possível criar o usuário.");

    return authService.mapSupabaseUser(data.user);
  },

  login: async (email: string, password?: string): Promise<User> => {
    if (!password) throw new Error("Senha é obrigatória.");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("Usuário não encontrado.");

    return authService.mapSupabaseUser(data.user);
  },

  verifyOtp: async (email: string, token: string): Promise<boolean> => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    
    if (error) throw error;
    return true;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async (): Promise<User | null> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return authService.mapSupabaseUser(user);
  },

  onAuthStateChange: (callback: (user: User | null) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        callback(authService.mapSupabaseUser(session.user));
      } else {
        callback(null);
      }
    });
  }
};
