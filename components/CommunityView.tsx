
import React, { useState } from 'react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  type: 'image' | 'video' | 'text';
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
}

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    author: "Prof. Marcos Silva",
    avatar: "https://i.pravatar.cc/150?u=marcos",
    type: 'video',
    content: "Dica rápida de como aplicar gamificação nas aulas de matemática do 6º ano utilizando o EduFlow AI!",
    mediaUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    likes: 124,
    comments: 18,
    time: "2h atrás",
    tags: ["Matemática", "Gamificação", "BNCC"]
  },
  {
    id: 2,
    author: "Ana Beatriz",
    avatar: "https://i.pravatar.cc/150?u=ana",
    type: 'image',
    content: "Olhem que incrível ficou o mapa mental sobre Revolução Francesa que a IA gerou hoje. Os alunos adoraram a clareza visual!",
    mediaUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    likes: 89,
    comments: 12,
    time: "5h atrás",
    tags: ["História", "Mapa Mental"]
  },
  {
    id: 3,
    author: "Ricardo Mendes",
    avatar: "https://i.pravatar.cc/150?u=ricardo",
    type: 'text',
    content: "Alguém tem sugestões de atividades práticas para o código BNCC (EF09CI13) de Ciências? Estou planejando a próxima semana.",
    likes: 45,
    comments: 32,
    time: "1d atrás",
    tags: ["Ciências", "Dúvida", "Planejamento"]
  }
];

const CommunityView: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const [posts] = useState<Post[]>(SAMPLE_POSTS);

  return (
    <div className={`h-full flex flex-col p-6 sm:p-10 overflow-y-auto transition-colors ${darkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8FAFD]'}`}>
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h2 className={`text-3xl font-black mb-1 transition-colors ${darkMode ? 'text-white' : 'text-[#1A1F36]'}`}>Comunidade EduFlow</h2>
            <p className={`font-medium transition-colors ${darkMode ? 'text-neutral-500' : 'text-gray-400'}`}>Conecte-se, compartilhe e evolua com outros educadores.</p>
          </div>
          <button className={`px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-none' : 'bg-[#3D5AFE] text-white hover:bg-blue-700 shadow-blue-100'}`}>
            <i className="fas fa-plus"></i> Novo Post
          </button>
        </div>

        {/* Post Composer */}
        <div className={`rounded-3xl p-6 mb-10 border shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex gap-4 mb-4">
            <img src="https://picsum.photos/40/40" className="w-12 h-12 rounded-2xl" alt="Eu" />
            <textarea 
              placeholder="O que você está criando hoje?"
              className={`flex-1 border-none rounded-2xl p-4 text-sm outline-none resize-none h-24 transition-colors ${darkMode ? 'bg-[#404040] text-white focus:ring-1 focus:ring-neutral-600' : 'bg-[#F8FAFD] focus:ring-2 focus:ring-blue-100'}`}
            ></textarea>
          </div>
          <div className={`flex justify-between items-center border-t pt-4 transition-colors ${darkMode ? 'border-neutral-700' : 'border-gray-50'}`}>
            <div className="flex gap-2">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-colors ${darkMode ? 'hover:bg-neutral-800 text-neutral-500' : 'hover:bg-gray-50 text-gray-500'}`}>
                <i className="fas fa-video text-red-400"></i> Vídeo
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-colors ${darkMode ? 'hover:bg-neutral-800 text-neutral-500' : 'hover:bg-gray-50 text-gray-500'}`}>
                <i className="fas fa-image text-green-400"></i> Imagem
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-colors ${darkMode ? 'hover:bg-neutral-800 text-neutral-500' : 'hover:bg-gray-50 text-gray-500'}`}>
                <i className="fas fa-paperclip text-blue-400"></i> Material
              </button>
            </div>
            <button className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-[#1A1F36] text-white hover:bg-black'}`}>
              Compartilhar
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className={`rounded-[2.5rem] overflow-hidden border shadow-sm transition-colors ${darkMode ? 'bg-[#363636] border-neutral-700' : 'bg-white border-gray-100'}`}>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img src={post.avatar} className={`w-12 h-12 rounded-2xl border-2 shadow-sm transition-colors ${darkMode ? 'border-neutral-700' : 'border-white'}`} alt={post.author} />
                    <div>
                      <h4 className={`font-black text-sm transition-colors ${darkMode ? 'text-white' : '#1A1F36'}`}>{post.author}</h4>
                      <p className={`text-[10px] font-bold transition-colors ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>{post.time}</p>
                    </div>
                  </div>
                  <button className={`transition-colors ${darkMode ? 'text-neutral-700 hover:text-gray-500' : 'text-gray-300 hover:text-gray-500'}`}><i className="fas fa-ellipsis-h"></i></button>
                </div>
                
                <p className={`text-sm leading-relaxed mb-6 font-medium transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>
                
                {post.mediaUrl && (
                  <div className={`relative rounded-3xl overflow-hidden mb-6 aspect-video border transition-colors ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-gray-100 border-gray-50'}`}>
                    <img src={post.mediaUrl} className="w-full h-full object-cover" alt="Post media" />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl border cursor-pointer hover:scale-110 transition-transform ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/20 border-white/30'}`}>
                          <i className="fas fa-play ml-1"></i>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider transition-colors ${darkMode ? 'bg-neutral-800 text-blue-400' : 'bg-blue-50 text-[#3D5AFE]'}`}>#{tag}</span>
                  ))}
                </div>

                <div className={`flex items-center justify-between border-t pt-6 transition-colors ${darkMode ? 'border-neutral-700' : 'border-gray-50'}`}>
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
                      <i className="far fa-heart font-bold"></i>
                      <span className="text-xs font-black">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                      <i className="far fa-comment font-bold"></i>
                      <span className="text-xs font-black">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors group">
                      <i className="far fa-share-square font-bold"></i>
                    </button>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/150?u=1" className="w-6 h-6 rounded-full border-2 border-white" alt="Like user" />
                    <img src="https://i.pravatar.cc/150?u=2" className="w-6 h-6 rounded-full border-2 border-white" alt="Like user" />
                    <img src="https://i.pravatar.cc/150?u=3" className="w-6 h-6 rounded-full border-2 border-white" alt="Like user" />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold transition-colors ${darkMode ? 'bg-neutral-800 border-neutral-900 text-neutral-600' : 'bg-gray-100 border-white text-gray-400'}`}>+5</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
