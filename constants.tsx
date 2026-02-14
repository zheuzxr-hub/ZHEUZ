
import { ToolDefinition } from './types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'slides',
    title: 'Apresentação de Slides',
    icon: 'fa-person-chalkboard',
    description: 'Crie roteiros e estruturas para apresentações de impacto.',
    fields: [
      { id: 'disciplina', label: 'Disciplina', type: 'text', placeholder: 'Ex: Matemática, História...' },
      { id: 'ano', label: 'Ano de Escolaridade', type: 'select', options: ['1º ano', '2º ano', '3º ano', '4º ano', '5º ano', '6º ano', '7º ano', '8º ano', '9º ano', 'Ensino Médio'] },
      { id: 'assunto', label: 'Assunto', type: 'text', placeholder: 'Tema principal da aula' },
      { id: 'duracao', label: 'Duração da Aula', type: 'select', options: ['30 minutos', '50 minutos', '100 minutos'] },
      { id: 'bncc', label: 'BNCC (Opcional)', type: 'text', placeholder: 'Habilidades específicas', optional: true },
      { id: 'idioma', label: 'Idioma', type: 'select', options: ['Português', 'Inglês', 'Espanhol'] },
      { id: 'temas', label: 'Temas/Detalhes Adicionais', type: 'textarea', placeholder: 'Mais informações...' },
      { id: 'web_search', label: 'Buscar na Web', type: 'switch', description: 'Permite que a IA pesquise assuntos atuais.' }
    ]
  },
  {
    id: 'aula_magica',
    title: 'Aula Mágica',
    icon: 'fa-wand-magic-sparkles',
    description: 'Aulas interativas e envolventes com metodologias ativas.',
    fields: [
      { id: 'disciplina', label: 'Disciplina', type: 'text' },
      { id: 'ano', label: 'Ano de Escolaridade', type: 'select', options: ['Fund. I', 'Fund. II', 'Ensino Médio'] },
      { id: 'assunto', label: 'Assunto', type: 'text' },
      { id: 'duracao', label: 'Duração', type: 'select', options: ['30 min', '50 min', '100 min'] },
      { id: 'metodologia', label: 'Metodologia', type: 'select', options: ['Ativa', 'Expositiva', 'Híbrida'] },
      { id: 'bncc', label: 'BNCC (Opcional)', type: 'text', optional: true }
    ]
  },
  {
    id: 'planejar_aulas',
    title: 'Planejar Aulas',
    icon: 'fa-calendar-check',
    description: 'Organize seu cronograma semanal ou semestral.',
    fields: [
      { id: 'periodo', label: 'Período', type: 'select', options: ['Próximas 2 semanas', 'Próximo trimestre', 'Próximo semestre'] },
      { id: 'ano', label: 'Ano de Escolaridade', type: 'text' },
      { id: 'disciplina', label: 'Disciplina', type: 'text' },
      { id: 'multidisciplinar', label: 'Planejamento Multidisciplinar', type: 'switch' },
      { id: 'dias', label: 'Dias da semana', type: 'days_selector' },
      { id: 'escolha_assunto', label: 'Como escolher assuntos?', type: 'radio', options: ['Lara escolhe por mim', 'Personalizar'] }
    ]
  },
  {
    id: 'prova',
    title: 'Gerador de Provas',
    icon: 'fa-file-signature',
    description: 'Crie exames objetivos e discursivos rapidamente.',
    fields: [
      { id: 'disciplina', label: 'Disciplina', type: 'text' },
      { id: 'ano', label: 'Ano de Escolaridade', type: 'text' },
      { id: 'assunto', label: 'Assunto', type: 'text' },
      { id: 'num_questoes', label: 'Nº de questões', type: 'select', options: ['5', '10', '15', '20', 'Personalizado'] },
      { id: 'dificuldade', label: 'Dificuldade', type: 'select', options: ['Fácil', 'Médio', 'Difícil'] },
      { id: 'tipo', label: 'Tipo de Questões', type: 'select', options: ['Discursiva', 'Objetiva', 'Mista'] },
      { id: 'bncc', label: 'BNCC', type: 'text' }
    ]
  },
  {
    id: 'mapa_mental',
    title: 'Mapa Mental',
    icon: 'fa-diagram-project',
    description: 'Estruture visualmente o conteúdo para seus alunos.',
    fields: [
      { id: 'disciplina', label: 'Disciplina', type: 'text' },
      { id: 'assunto', label: 'Assunto', type: 'text' },
      { id: 'tipo_mapa', label: 'Tipo de Mapa', type: 'select', options: ['Conceitual', 'Irradiante', 'Cronológico'] },
      { id: 'web_search', label: 'Buscar na Web', type: 'switch' }
    ]
  },
  {
    id: 'corretor_redacao',
    title: 'Corretor de Redação',
    icon: 'fa-pen-nib',
    description: 'Avalie redações com critérios claros e feedbacks instantâneos.',
    fields: [
      { id: 'turma', label: 'Selecionar Turma', type: 'text' },
      { id: 'proposta', label: 'Nome da Proposta', type: 'text' },
      { id: 'arquivos', label: 'Redações dos Alunos', type: 'file' }
    ]
  },
  {
    id: 'saeb',
    title: 'Gerador SAEB',
    icon: 'fa-chart-line',
    description: 'Questões no modelo das avaliações nacionais.',
    fields: [
      { id: 'qtd', label: 'Quantidade', type: 'select', options: ['1', '3', '5', '10', 'Personalizado'] },
      { id: 'ano', label: 'Ano de Escolaridade', type: 'text' },
      { id: 'disciplina', label: 'Disciplina', type: 'text' },
      { id: 'contexto', label: 'Contexto', type: 'textarea' }
    ]
  },
  {
    id: 'caca_palavras',
    title: 'Caça-Palavras',
    icon: 'fa-table-cells',
    description: 'Atividades lúdicas para fixação de vocabulário.',
    fields: [
      { id: 'dificuldade', label: 'Dificuldade', type: 'select', options: ['Fácil', 'Médio', 'Difícil'] },
      { id: 'num_palavras', label: 'Nº de Palavras', type: 'select', options: ['5', '10', '15', '20', 'Personalizado'] },
      { id: 'ia_fill', label: 'Preencher com IA', type: 'switch' },
      { id: 'palavras', label: 'Palavras Específicas', type: 'textarea', placeholder: 'Separe por vírgula' }
    ]
  }
];
