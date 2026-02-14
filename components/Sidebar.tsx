
import React from 'react';
import { TOOLS } from '../constants';
import { ToolId, ToolDefinition } from '../types';
import { WinFolderIcon, FolderVariant } from './WinFolderIcon';

interface SidebarProps {
  activeTool: ToolId;
  darkMode?: boolean;
  onSelectTool: (id: ToolId) => void;
  onOpenCommunity?: () => void;
}

const toolColorMap: Record<ToolId, FolderVariant> = {
  slides: 'purple',
  aula_magica: 'blue',
  planejar_aulas: 'grey',
  prova: 'orange',
  mapa_mental: 'teal',
  corretor_redacao: 'yellow',
  saeb: 'light-blue',
  caca_palavras: 'yellow',
  resumo: 'grey',
  tutor: 'blue',
  gramatica: 'grey',
  reescritor: 'teal',
  cruzadinha: 'yellow',
  eja: 'orange',
  bncc_descomplicada: 'blue',
  chat: 'blue'
};

const Sidebar: React.FC<SidebarProps> = ({ activeTool, darkMode, onSelectTool, onOpenCommunity }) => {
  return (
    <div className={`w-full h-full flex flex-col shadow-sm border-l transition-colors ${darkMode ? 'bg-[#363636] text-gray-300 border-neutral-700' : 'bg-[#F3F7FF] text-[#1A1F36] border-gray-100'}`}>
      <div className={`p-8 border-b h-16 flex items-center transition-colors ${darkMode ? 'border-neutral-700' : 'border-gray-200'}`}>
        <h1 className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Biblioteca de IA</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-6 mb-8">
           <div className="relative">
              <i className={`fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-300'}`}></i>
              <input 
                type="text" 
                placeholder="Buscar ferramenta..." 
                className={`w-full border rounded-xl pl-12 pr-4 py-3 text-xs outline-none transition-all placeholder:text-gray-300 shadow-sm ${darkMode ? 'bg-[#404040] border-neutral-600 text-white focus:border-blue-400' : 'bg-white border-gray-200 focus:border-[#3D5AFE]'}`}
              />
           </div>
        </div>

        <div className="space-y-1">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`w-full text-left px-8 py-3.5 flex items-center gap-4 transition-all group ${
                activeTool === tool.id 
                  ? (darkMode ? 'bg-[#454545] text-blue-400 border-l-4 border-blue-400' : 'bg-[#E8EFFF] text-[#3D5AFE] border-l-4 border-[#3D5AFE]') 
                  : (darkMode ? 'text-neutral-500 hover:bg-[#404040] hover:text-gray-200' : 'text-gray-500 hover:bg-white hover:text-[#3D5AFE]')
              }`}
            >
              <WinFolderIcon 
                variant={toolColorMap[tool.id] || 'yellow'} 
                icon={tool.icon} 
                className="transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col overflow-hidden">
                <span className={`text-sm font-bold leading-tight transition-colors ${activeTool === tool.id ? (darkMode ? 'text-blue-400' : 'text-[#3D5AFE]') : ''}`}>{tool.title}</span>
                <span className={`text-[10px] mt-1 truncate max-w-[140px] transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>{tool.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className={`p-8 border-t transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-200'}`}>
         <div 
           onClick={onOpenCommunity}
           className={`p-5 rounded-3xl border relative overflow-hidden group cursor-pointer transition-all border-dashed border-2 ${darkMode ? 'bg-[#404040]/50 border-neutral-600 hover:border-blue-400' : 'bg-[#E8EFFF] border-blue-100 hover:shadow-xl hover:shadow-blue-50 hover:border-[#3D5AFE]'}`}
         >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?u=1" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="U" />
                <img src="https://i.pravatar.cc/100?u=2" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="U" />
                <img src="https://i.pravatar.cc/100?u=3" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="U" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${darkMode ? 'text-blue-400' : 'text-[#3D5AFE]'}`}>+1.2k Ativos</span>
            </div>
            
            <h4 className={`font-black text-sm mb-1 transition-colors ${darkMode ? 'text-white' : '#1A1F36'}`}>Rede Social EduFlow</h4>
            <p className={`text-[10px] font-bold mb-4 transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Vídeos, fotos e discussões sobre a BNCC.</p>
            
            <div className="flex justify-between items-center">
               <div className={`flex gap-2 transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>
                  <i className="fas fa-video text-[10px] hover:text-blue-400"></i>
                  <i className="fas fa-image text-[10px] hover:text-blue-400"></i>
                  <i className="fas fa-comment-dots text-[10px] hover:text-blue-400"></i>
               </div>
               <button className={`p-2 rounded-xl text-[10px] font-black transition-all px-4 ${darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-[#3D5AFE] text-white hover:bg-blue-700'}`}>
                  Entrar na Rede
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
