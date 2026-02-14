
import React, { useState } from 'react';

interface CalendarViewProps {
  onGenerate: (data: any) => void;
  darkMode?: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onGenerate, darkMode }) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [month] = useState("Março 2024");
  
  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={`h-full flex flex-col p-12 transition-colors ${darkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8FAFD]'}`}>
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className={`text-4xl font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Calendário Pedagógico</h2>
          <p className={`transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Selecione os dias para planejar atividades automáticas.</p>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={selectedDays.length === 0}
            onClick={() => onGenerate({ type: 'calendar_plan', days: selectedDays })}
            className={`px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-none' : 'bg-[#3D5AFE] text-white hover:bg-blue-700 shadow-blue-100'}`}
          >
            <i className="fas fa-magic"></i>
            Produzir para {selectedDays.length} {selectedDays.length === 1 ? 'dia' : 'dias'}
          </button>
        </div>
      </div>

      <div className={`border rounded-3xl overflow-hidden shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b flex items-center justify-between transition-colors ${darkMode ? 'bg-neutral-800/20 border-neutral-700' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className={`font-bold text-xl transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>{month}</h3>
          <div className="flex gap-2">
            <button className={`p-2 transition-colors ${darkMode ? 'text-neutral-500 hover:text-blue-400' : 'text-gray-400 hover:text-[#3D5AFE]'}`}><i className="fas fa-chevron-left"></i></button>
            <button className={`p-2 transition-colors ${darkMode ? 'text-neutral-500 hover:text-blue-400' : 'text-gray-400 hover:text-[#3D5AFE]'}`}><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
        <div className={`grid grid-cols-7 border-b transition-colors ${darkMode ? 'border-neutral-700 bg-[#363636]' : 'border-gray-200 bg-white'}`}>
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(d => (
            <div key={d} className={`py-4 text-center text-[10px] font-bold tracking-widest transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>{d}</div>
          ))}
        </div>
        <div className={`grid grid-cols-7 p-4 gap-4 transition-colors ${darkMode ? 'bg-[#363636]' : 'bg-white'}`}>
          {days.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`h-24 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group relative overflow-hidden ${
                selectedDays.includes(day)
                ? (darkMode ? 'bg-neutral-800 border-blue-400 text-blue-400' : 'bg-[#E8EFFF] border-[#3D5AFE] text-[#3D5AFE] shadow-sm')
                : (darkMode ? 'bg-[#363636] border-neutral-700 text-neutral-500 hover:border-neutral-500' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300')
              }`}
            >
              <span className={`text-xl font-bold transition-colors ${selectedDays.includes(day) ? (darkMode ? 'text-blue-400' : 'text-[#3D5AFE]') : (darkMode ? 'text-neutral-400' : 'text-gray-700')}`}>{day}</span>
              {selectedDays.includes(day) && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${darkMode ? 'bg-blue-400' : 'bg-[#3D5AFE]'}`}></div>}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none ${darkMode ? 'bg-blue-400' : 'bg-[#3D5AFE]'}`}></div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-3 gap-6">
         <div className={`p-6 rounded-2xl border flex items-center gap-4 shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${darkMode ? 'bg-neutral-800 text-orange-400 border-neutral-700' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
               <i className="fas fa-star"></i>
            </div>
            <div>
               <p className={`font-bold text-sm transition-colors ${darkMode ? 'text-white' : '#1A1F36'}`}>Feriados Próximos</p>
               <p className={`text-xs transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Nenhum feriado em Março</p>
            </div>
         </div>
         <div className={`p-6 rounded-2xl border flex items-center gap-4 shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${darkMode ? 'bg-neutral-800 text-green-400 border-neutral-700' : 'bg-green-50 text-green-500 border-green-100'}`}>
               <i className="fas fa-check-circle"></i>
            </div>
            <div>
               <p className={`font-bold text-sm transition-colors ${darkMode ? 'text-white' : '#1A1F36'}`}>Produtividade</p>
               <p className={`text-xs transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>80% do mês planejado</p>
            </div>
         </div>
         <div className={`p-6 rounded-2xl border flex items-center gap-4 shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${darkMode ? 'bg-neutral-800 text-purple-400 border-neutral-700' : 'bg-purple-50 text-purple-500 border-purple-100'}`}>
               <i className="fas fa-clock"></i>
            </div>
            <div>
               <p className={`font-bold text-sm transition-colors ${darkMode ? 'text-white' : '#1A1F36'}`}>Horas Aula</p>
               <p className={`text-xs transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Total: 42h previstas</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CalendarView;
