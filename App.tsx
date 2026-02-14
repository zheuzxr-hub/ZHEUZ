
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToolForm from './components/ToolForm';
import CalendarView from './components/CalendarView';
import MaterialsView from './components/MaterialsView';
import CommunityView from './components/CommunityView';
import { WinFolderIcon } from './components/WinFolderIcon';
import { ToolId, User } from './types';
import { TOOLS } from './constants';
import { generateEduContent } from './geminiService';

const EduFlowSheep = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.8 5.2 5 5 4.2 5C2.4 5 1 6.4 1 8.2C1 9.5 1.7 10.6 2.8 11.1C2.3 12.3 2 13.6 2 15C2 18.9 5.1 22 9 22H15C18.9 22 22 18.9 22 15C22 13.6 21.7 12.3 21.2 11.1C22.3 10.6 23 9.5 23 8.2C23 6.4 21.6 5 19.8 5C19 5 18.2 5.2 17.5 5.5C16.5 3.5 14.5 2 12 2ZM8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10ZM16 10C16.6 10 17 10.4 17 11C17 11.6 16.6 12 16 12C15.4 12 15 11.6 15 11C15 10.4 15.4 10 16 10ZM12 13.5L10.5 15.5H13.5L12 13.5Z" />
  </svg>
);

const App: React.FC = () => {
  // Usuário fixo para manter a estética do dashboard sem login
  const [user] = useState<User>({
    id: 'guest',
    name: 'Professor Convidado',
    email: 'guest@eduflow.ai',
    avatar: 'https://i.pravatar.cc/150?u=guest'
  });

  const [view, setView] = useState<'home' | 'materials' | 'calendar' | 'tool' | 'classes' | 'community'>('home');
  const [activeToolId, setActiveToolId] = useState<ToolId>(TOOLS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [materials, setMaterials] = useState<any[]>([]);

  const currentTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  const handleToolSubmit = async (data: any) => {
    setLoading(true);
    setResult(null);
    try {
      const output = await generateEduContent(activeToolId, data);
      const newMaterial = {
        id: Date.now(),
        title: `${currentTool.title} - ${data.assunto || 'Atividade'}`,
        content: output,
        date: new Date().toLocaleDateString('pt-BR'),
        tool: currentTool.title
      };
      setMaterials(prev => [newMaterial, ...prev]);
      setResult(output || 'Desculpe, não consegui gerar o conteúdo no momento.');
    } catch (error) {
      console.error(error);
      setResult('Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden transition-colors ${darkMode ? 'bg-[#2C2C2C] text-gray-200' : 'bg-[#F8FAFD] text-[#1A1F36]'}`}>
      <nav className={`border-r flex flex-col py-10 shrink-0 transition-all duration-300 relative ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100'} ${isNavOpen ? 'w-[280px]' : 'w-[96px]'}`}>
        <div className={`px-6 mb-16 flex items-center transition-all ${isNavOpen ? 'gap-4 px-8' : 'justify-center'}`}>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-xl group overflow-hidden shrink-0 transition-all ${darkMode ? 'bg-neutral-700 shadow-none' : 'bg-[#1DA1F2] shadow-blue-200'}`}>
            <EduFlowSheep className="w-6 h-6" />
          </div>
          {isNavOpen && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <span className={`font-black text-xl tracking-tighter leading-none transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>EduFlow</span>
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] mt-1.5 transition-colors ${darkMode ? 'text-blue-400' : 'text-[#1DA1F2]'}`}>Ovelha Intelligence</span>
            </div>
          )}
        </div>

        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          {[
            { id: 'home', icon: 'fa-house', label: 'Início' },
            { id: 'materials', icon: 'fa-folder', label: 'Meus materiais' },
            { id: 'calendar', icon: 'fa-calendar-days', label: 'Calendário' },
            { id: 'classes', icon: 'fa-apple-whole', label: 'Turmas' },
            { id: 'community', icon: 'fa-users', label: 'Comunidade' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setView(item.id as any)} 
              className={`w-full flex items-center transition-all font-bold text-[14px] ${isNavOpen ? 'px-6 py-3.5 gap-4 rounded-2xl' : 'p-3.5 justify-center rounded-xl'} ${view === item.id ? (darkMode ? 'bg-[#454545] text-blue-400' : 'bg-[#F0F8FF] text-[#1DA1F2]') : (darkMode ? 'text-neutral-500 hover:bg-[#404040] hover:text-gray-200' : 'text-gray-400 hover:bg-gray-50 hover:text-[#1A1F36]')}`}
            >
              <i className={`fas ${item.icon} w-6 text-center text-lg shrink-0`}></i>
              {isNavOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className={`px-4 mt-auto transition-all ${isNavOpen ? 'px-6' : 'px-2'}`}>
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-center transition-colors flex items-center justify-center gap-2 ${darkMode ? 'text-neutral-600 hover:text-blue-400' : 'text-gray-300 hover:text-[#1DA1F2]'}`}
          >
            {isNavOpen ? <>FECHAR MENU <i className="fas fa-chevron-left text-[8px] opacity-40"></i></> : <i className="fas fa-chevron-right text-sm"></i>}
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className={`h-24 border-b flex items-center justify-between px-10 z-10 shrink-0 transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-center">
                <span className={`text-[8px] font-black uppercase tracking-widest mb-1.5 transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Modo Escuro</span>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full p-1 transition-all duration-300 shadow-inner ${darkMode ? 'bg-blue-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
             </div>
             <div className="flex flex-col">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Dashboard Principal</span>
                <span className={`text-lg font-black tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>
                  {view === 'home' ? `Bem-vindo ao EduFlow!` : view === 'materials' ? 'Biblioteca Digital' : view === 'calendar' ? 'Gestão de Tempo' : view === 'community' ? 'Rede Docente' : currentTool.title}
                </span>
             </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${darkMode ? 'bg-neutral-700 border-neutral-600 text-yellow-400' : 'bg-yellow-50 border-yellow-100 text-yellow-500'}`}>
                   <i className="fas fa-crown text-sm"></i>
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-black transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>VIP Plus</p>
                  <p className={`text-[8px] font-bold uppercase transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Acesso Ilimitado</p>
                </div>
             </div>
             <div className={`h-8 w-px transition-colors ${darkMode ? 'bg-neutral-700' : 'bg-gray-100'}`}></div>
             <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={user.avatar} className={`w-10 h-10 rounded-xl border-2 shadow-md ${darkMode ? 'border-neutral-600' : 'border-[#1DA1F2]/20'}`} alt="Avatar" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {(() => {
            if (result) {
              return (
                <div className="max-w-4xl mx-auto py-10 px-6 animate-fade-in">
                  <button onClick={() => setResult(null)} className={`mb-6 flex items-center gap-2 text-sm font-bold transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#1DA1F2] hover:text-blue-700'}`}>
                    <i className="fas fa-arrow-left"></i> Voltar para edição
                  </button>
                  <div className={`rounded-3xl border p-10 shadow-xl prose prose-slate max-w-none transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h1 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Conteúdo Gerado</h1>
                        <p className={`text-sm font-medium italic ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>EduFlow Ovelha AI v3.1</p>
                      </div>
                    </div>
                    <div className={`leading-relaxed text-lg whitespace-pre-wrap font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {result}
                    </div>
                  </div>
                </div>
              );
            }
            switch (view) {
              case 'materials': return <MaterialsView materials={materials} darkMode={darkMode} />;
              case 'calendar': return <CalendarView onGenerate={(data) => handleToolSubmit(data)} darkMode={darkMode} />;
              case 'community': return <CommunityView darkMode={darkMode} />;
              case 'tool': return <ToolForm tool={currentTool} onSubmit={handleToolSubmit} loading={loading} onBack={() => setView('home')} darkMode={darkMode} />;
              default:
                return (
                  <div className="p-10 max-w-5xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className={`text-2xl font-black transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Fluxo de Atividades</h2>
                      <button onClick={() => setView('tool')} className={`border rounded-full px-6 py-2 flex items-center gap-2 text-sm font-bold shadow-sm transition-all ${darkMode ? 'bg-[#363636] border-neutral-700 text-white hover:bg-[#404040]' : 'bg-white border-gray-200 text-[#1A1F36] hover:bg-[#1DA1F2] hover:text-white'}`}>
                        <i className="fas fa-plus text-[10px]"></i> Criar Nova
                      </button>
                    </div>
                    <div onClick={() => setView('tool')} className={`rounded-[2.5rem] p-8 flex items-center justify-between cursor-pointer transition-all border group overflow-hidden relative ${darkMode ? 'bg-[#323232] border-neutral-700 hover:shadow-xl' : 'bg-[#EBF5FF] border-blue-100 hover:shadow-2xl'}`}>
                      <div className="max-w-sm relative z-10">
                        <div className={`inline-flex items-center gap-2 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-md ${darkMode ? 'bg-neutral-600' : 'bg-[#1DA1F2]'}`}><i className="fas fa-bolt"></i> IA de Alta Velocidade</div>
                        <h3 className={`text-3xl font-black mb-3 leading-tight transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Voe alto em suas <br/>aulas hoje.</h3>
                        <p className={`font-semibold leading-relaxed text-sm mb-6 opacity-80 transition-colors ${darkMode ? 'text-gray-300' : 'text-[#5C6E91]'}`}>A ovelha do EduFlow traz a sabedoria necessária para você brilhar na sala de aula.</p>
                      </div>
                      <div className="relative z-10">
                        <div className={`w-48 h-48 backdrop-blur-xl rounded-[2rem] flex items-center justify-center relative transform transition-all duration-700 group-hover:rotate-6 group-hover:scale-105 shadow-inner border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white/40 border-white/50'}`}>
                           <WinFolderIcon variant="blue" icon="fa-brain" size="lg" className="drop-shadow-[0_15px_25px_rgba(29,161,242,0.3)]" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                      <button onClick={() => setView('calendar')} className={`p-8 rounded-[2rem] border transition-all text-left group relative overflow-hidden ${darkMode ? 'bg-[#363636] border-neutral-700 hover:border-neutral-500' : 'bg-[#FFFBEB] border-amber-100 hover:border-[#1DA1F2]'}`}>
                        <div className="mb-4 group-hover:scale-110 transition-transform"><WinFolderIcon variant="yellow" icon="fa-calendar-check" size="md" /></div>
                        <h3 className={`font-black text-lg mb-1 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Cronograma</h3>
                      </button>
                      <button onClick={() => setView('materials')} className={`p-8 rounded-[2rem] border transition-all text-left group relative overflow-hidden ${darkMode ? 'bg-[#363636] border-neutral-700 hover:border-neutral-500' : 'bg-[#FFFBEB] border-amber-100 hover:border-[#1DA1F2]'}`}>
                        <div className="mb-4 group-hover:scale-110 transition-transform"><WinFolderIcon variant="yellow" icon="fa-cloud-arrow-up" size="md" /></div>
                        <h3 className={`font-black text-lg mb-1 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Biblioteca</h3>
                      </button>
                    </div>
                  </div>
                );
            }
          })()}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-50 pointer-events-none">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`w-8 h-12 rounded-l-2xl flex items-center justify-center text-white transition-all shadow-xl pointer-events-auto ${darkMode ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-[#1A1F36] hover:bg-[#1DA1F2]'}`}>
             <i className={`fas ${isSidebarOpen ? 'fa-chevron-right' : 'fa-chevron-left'} text-[10px]`}></i>
           </button>
        </div>
      </main>

      <div className={`transition-all duration-300 ease-in-out border-l shrink-0 overflow-hidden ${darkMode ? 'border-neutral-700' : 'border-gray-100'} ${isSidebarOpen ? 'w-[320px]' : 'w-0'}`}>
        <div className="w-[320px] h-full">
          <Sidebar activeTool={activeToolId} darkMode={darkMode} onSelectTool={(id) => { setActiveToolId(id); setResult(null); setView('tool'); }} onOpenCommunity={() => setView('community')} />
        </div>
      </div>
    </div>
  );
};

export default App;
