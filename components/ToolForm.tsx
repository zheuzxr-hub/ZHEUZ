
import React, { useState } from 'react';
import { ToolDefinition, FormField } from '../types';

interface ToolFormProps {
  tool: ToolDefinition;
  onSubmit: (data: any) => void;
  loading: boolean;
  onBack?: () => void;
  darkMode?: boolean;
}

const THEMES = [
  { id: 'giz', name: 'Giz Clássico', preview: 'bg-white border-blue-500', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-gray-800' },
  { id: 'dark', name: 'Modo Escuro', preview: 'bg-slate-900 border-gray-700', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-white' },
  { id: 'deep', name: 'Conhecimento Profundo', preview: 'bg-blue-600 border-blue-400', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-white' },
  { id: 'sky', name: 'Céu Suave', preview: 'bg-blue-100 border-blue-200', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-blue-900' },
  { id: 'nature', name: 'Natureza Gentil', preview: 'bg-teal-50 border-teal-100', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-teal-900' },
  { id: 'fun', name: 'Aprendizado Divertido', preview: 'bg-white border-blue-200', text: 'Um grande título vem aqui', sub: 'Lorem ipsum dolor sit amet', color: 'text-gray-800', accent: 'border-t-4 border-l-4 rounded-tl-xl border-blue-400' },
];

const ToolForm: React.FC<ToolFormProps> = ({ tool, onSubmit, loading, onBack, darkMode }) => {
  const [formData, setFormData] = useState<any>({ tema: 'giz' });

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';

    return (
      <div key={field.id} className="mb-8">
        <label className={`block text-sm font-bold mb-3 flex items-center gap-1 transition-colors ${darkMode ? 'text-gray-200' : 'text-[#1A1F36]'}`}>
          {field.label} {field.optional ? <span className={`font-normal ml-1 transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>(Opcional)</span> : <span className="text-red-500 font-bold ml-1">*</span>}
        </label>
        
        {field.type === 'text' && (
          <input
            type="text"
            className={`w-full border rounded-xl px-5 py-3.5 text-sm outline-none transition-all placeholder:text-gray-300 shadow-sm ${darkMode ? 'bg-[#404040] border-neutral-700 text-white focus:border-blue-400 focus:ring-neutral-700' : 'bg-white border-gray-200 text-[#1A1F36] focus:border-[#3D5AFE] focus:ring-4 focus:ring-blue-50'}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        )}

        {field.type === 'select' && (
          <div className="flex flex-wrap gap-3">
            {field.options?.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange(field.id, opt)}
                className={`px-6 py-2.5 rounded-full border text-xs font-bold transition-all ${
                  value === opt 
                  ? (darkMode ? 'bg-[#454545] border-blue-400 text-white shadow-sm' : 'bg-[#E8EFFF] border-[#3D5AFE] text-[#3D5AFE] shadow-sm') 
                  : (darkMode ? 'bg-[#404040] border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:bg-[#454545]' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:bg-gray-50')
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {field.type === 'textarea' && (
          <textarea
            className={`w-full border rounded-xl px-5 py-4 text-sm h-36 outline-none transition-all resize-none placeholder:text-gray-300 shadow-sm ${darkMode ? 'bg-[#404040] border-neutral-700 text-white focus:border-blue-400 focus:ring-neutral-700' : 'bg-white border-gray-200 text-[#1A1F36] focus:border-[#3D5AFE] focus:ring-4 focus:ring-blue-50'}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        )}

        {field.type === 'switch' && (
          <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${darkMode ? 'bg-neutral-800/50 border-neutral-700' : 'bg-[#F3F7FF] border-blue-50'}`}>
            <span className={`text-xs font-bold transition-colors ${darkMode ? 'text-neutral-400' : 'text-[#1A1F36]'}`}>{field.description}</span>
            <button
              type="button"
              onClick={() => handleChange(field.id, !value)}
              className={`w-12 h-6 rounded-full transition-all relative p-1 ${value ? (darkMode ? 'bg-blue-400' : 'bg-[#3D5AFE]') : 'bg-gray-400'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-all shadow-sm ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full relative transition-colors ${darkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8FAFD]'}`}>
      <div className="flex-1 overflow-y-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl mx-auto rounded-[2.5rem] shadow-2xl overflow-hidden min-h-full relative flex flex-col border transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100'}`}>
          
          <div className="p-10 flex-1 overflow-y-auto">
            <button 
              onClick={onBack}
              className={`text-xs font-black flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all ${darkMode ? 'text-blue-400 hover:bg-neutral-800' : 'text-[#3D5AFE] hover:bg-blue-50'}`}
            >
              <i className="fas fa-plus rotate-45"></i> Voltar
            </button>

            <div className="flex items-center gap-6 mb-12">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${darkMode ? 'bg-neutral-800 text-blue-400' : 'bg-[#F3F7FF] text-[#3D5AFE]'}`}>
                <i className={`fas ${tool.icon} text-2xl`}></i>
              </div>
              <div>
                <h2 className={`text-2xl font-black tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>{tool.title}</h2>
                <p className={`text-sm font-medium transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>{tool.description}</p>
              </div>
            </div>

            <form className="space-y-6 pb-20">
              {tool.fields.map(field => renderField(field))}

              <div className={`mt-14 border-t pt-12 transition-colors ${darkMode ? 'border-neutral-700' : 'border-gray-50'}`}>
                <h3 className={`text-lg font-black mb-8 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Escolha um Tema Visual</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {THEMES.map((theme) => (
                    <div 
                      key={theme.id}
                      onClick={() => handleChange('tema', theme.id)}
                      className="cursor-pointer group"
                    >
                      <div className="flex justify-between items-center mb-3 px-1">
                        <span className={`text-xs font-black tracking-wide uppercase transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-700'}`}>{theme.name}</span>
                        {formData.tema === theme.id && (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] animate-bounce shadow-lg ${darkMode ? 'bg-blue-400 shadow-none' : 'bg-[#3D5AFE] shadow-blue-200'}`}>
                            <i className="fas fa-check"></i>
                          </div>
                        )}
                      </div>
                      <div className={`aspect-video rounded-3xl border-4 p-6 flex flex-col justify-center transition-all relative overflow-hidden shadow-lg ${theme.preview} ${formData.tema === theme.id ? (darkMode ? 'border-blue-400 ring-8 ring-neutral-800 scale-[1.02]' : 'border-[#3D5AFE] ring-8 ring-blue-50/50 scale-[1.02]') : 'border-transparent hover:border-gray-100 hover:scale-[1.01]'}`}>
                         {theme.accent && <div className={`absolute top-0 left-0 w-full h-full pointer-events-none ${theme.accent}`}></div>}
                         <p className={`text-xs font-black mb-2 ${theme.color}`}>{theme.text}</p>
                         <p className={`text-[8px] font-medium opacity-60 ${theme.color}`}>{theme.sub}</p>
                         <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-white opacity-10 border border-gray-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          <div className={`p-8 border-t backdrop-blur-md flex flex-col items-center transition-colors ${darkMode ? 'bg-[#363636]/80 border-neutral-700' : 'bg-white/80 border-gray-50'}`}>
             <div className="w-full max-w-sm">
                <button
                  onClick={() => onSubmit(formData)}
                  disabled={loading}
                  className={`w-full font-bold py-3.5 rounded-full transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 border-b-4 ${darkMode ? 'bg-neutral-800 text-white hover:bg-neutral-700 shadow-none border-neutral-900' : 'bg-[#FFCB32] hover:bg-[#FFD54F] text-[#1A1F36] shadow-amber-200/50 border-amber-500/20'}`}
                >
                  {loading ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-bold tracking-tight">
                      Criar <i className="fas fa-bolt text-xs"></i> 150
                    </span>
                  )}
                </button>
                <p className={`text-center mt-2.5 text-[9px] font-black uppercase tracking-widest opacity-80 transition-colors ${darkMode ? 'text-neutral-700' : 'text-gray-400'}`}>Processamento AI EduFlow</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolForm;
