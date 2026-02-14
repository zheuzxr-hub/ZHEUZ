
export type ToolId = 
  | 'slides' 
  | 'aula_magica' 
  | 'planejar_aulas' 
  | 'resumo' 
  | 'prova' 
  | 'corretor_redacao' 
  | 'saeb' 
  | 'mapa_mental' 
  | 'tutor' 
  | 'gramatica' 
  | 'reescritor' 
  | 'caca_palavras' 
  | 'cruzadinha' 
  | 'eja' 
  | 'bncc_descomplicada'
  | 'chat';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'file' | 'checkbox' | 'radio' | 'switch' | 'days_selector';
  placeholder?: string;
  options?: string[];
  description?: string;
  optional?: boolean;
}

export interface ToolDefinition {
  id: ToolId;
  title: string;
  icon: string;
  description: string;
  fields: FormField[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text?: string; inlineData?: { mimeType: string; data: string } }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // Added isVerified property to match Supabase user mapping in authService.ts
  isVerified?: boolean;
}