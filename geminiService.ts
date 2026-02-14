
import { GoogleGenAI } from "@google/genai";
import { ToolId } from "./types";

// Always use the process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEduContent = async (toolId: ToolId, data: any) => {
  const model = 'gemini-3-flash-preview';
  
  let prompt = `Você é um assistente de produtividade para professores chamado EduFlow.
Sua missão é criar conteúdos educacionais de alta qualidade, sempre fundamentados nas normas da BNCC (Base Nacional Comum Curricular).

FERRAMENTA: ${toolId.toUpperCase()}
DADOS DO USUÁRIO:
${JSON.stringify(data, null, 2)}

INSTRUÇÕES:
1. Responda em Português do Brasil.
2. Seja pedagógico e claro.
3. Se aplicável, inclua códigos de habilidades da BNCC.
4. Formate a saída usando Markdown elegante.
`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });

  return response.text;
};

export const startChat = async (history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Você é EduFlow, um assistente especializado em BNCC e produtividade docente. Ajude professores a planejar, criar e revisar materiais.',
    }
  });
  return chat;
};
