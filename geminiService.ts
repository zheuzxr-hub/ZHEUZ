
import { GoogleGenAI } from "@google/genai";
import { ToolId } from "./types";

export const generateEduContent = async (toolId: ToolId, data: any) => {
  // Inicialização tardia para garantir que o processo de injeção de variáveis de ambiente do bundler tenha ocorrido
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Você é um assistente de produtividade para professores chamado EduFlow.
Sua missão é criar conteúdos educacionais de alta qualidade, sempre fundamentados nas normas da BNCC (Base Nacional Comum Curricular).

FERRAMENTA: ${toolId.toUpperCase()}
DADOS DO USUÁRIO:
${JSON.stringify(data, null, 2)}

INSTRUÇÕES:
1. Responda em Português do Brasil.
2. Seja pedagógico, inspirador e extremamente claro.
3. SEMPRE inclua os códigos de habilidades da BNCC relacionados ao tema.
4. Formate a saída usando Markdown elegante com títulos e listas.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 1,
        topP: 0.95,
        topK: 64
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erro na chamada do Gemini:", error);
    throw error;
  }
};

export const startChat = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Você é EduFlow, um assistente especializado em BNCC e produtividade docente. Ajude professores a planejar, criar e revisar materiais de forma rápida e lúdica.',
    }
  });
  return chat;
};
