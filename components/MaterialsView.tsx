
import React from 'react';

interface Material {
  id: number;
  title: string;
  content: string;
  date: string;
  tool: string;
}

interface MaterialsViewProps {
  materials: Material[];
  darkMode?: boolean;
}

const MaterialsView: React.FC<MaterialsViewProps> = ({ materials, darkMode }) => {
  return (
    <div className={`h-full flex flex-col p-12 overflow-y-auto transition-colors ${darkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8FAFD]'}`}>
      <div className="mb-12">
        <h2 className={`text-4xl font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Meus Materiais</h2>
        <p className={`transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Histórico de todas as atividades e conteúdos produzidos por você.</p>
      </div>

      {materials.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
          <i className={`fas fa-box-open text-8xl mb-6 transition-colors ${darkMode ? 'text-neutral-700' : 'text-gray-200'}`}></i>
          <p className={`text-xl font-medium transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-500'}`}>Você ainda não produziu nenhum material.</p>
          <p className={`text-sm transition-colors ${darkMode ? 'text-neutral-700' : 'text-gray-400'}`}>Selecione uma ferramenta para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(mat => (
            <div key={mat.id} className={`border rounded-3xl p-8 transition-all group flex flex-col shadow-sm ${darkMode ? 'bg-[#363636] border-neutral-700 hover:border-blue-400' : 'bg-white border-gray-200 hover:border-[#3D5AFE] hover:shadow-lg'}`}>
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${darkMode ? 'bg-neutral-800 text-blue-400 border-neutral-700' : 'bg-[#F3F7FF] text-[#3D5AFE] border-blue-50'}`}>
                    <i className="fas fa-file-alt"></i>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className={`p-2 transition-colors ${darkMode ? 'text-neutral-500 hover:text-blue-400' : 'text-gray-400 hover:text-[#3D5AFE]'}`}><i className="fas fa-share-alt"></i></button>
                    <button className={`p-2 transition-colors ${darkMode ? 'text-neutral-500 hover:text-red-500' : 'text-gray-400 hover:text-red-500'}`}><i className="fas fa-trash"></i></button>
                 </div>
              </div>
              <h3 className={`font-bold text-lg mb-2 leading-tight transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>{mat.title}</h3>
              <p className={`text-xs mb-6 uppercase tracking-widest font-bold transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>{mat.tool} • {mat.date}</p>
              <button className={`mt-auto w-full py-3 border font-bold rounded-xl transition-all text-sm ${darkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-500 hover:bg-blue-400 hover:text-white hover:border-blue-400' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-[#3D5AFE] hover:text-white hover:border-[#3D5AFE]'}`}>
                Visualizar Conteúdo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsView;
