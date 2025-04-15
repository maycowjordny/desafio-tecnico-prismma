export const MEAL_IMAGE_ANALYSIS_PROMPT = `
Analise a imagem da comida e forneça as seguintes informações:

1. O nome da refeição.
2. Uma descrição detalhada dos alimentos visíveis.
3. Uma estimativa aproximada da quantidade total de calorias.

Formato da resposta (exatamente como abaixo):

NOME: [nome da refeição] | DESCRIÇÃO: [descrição aqui] | CALORIAS: [número aqui]
`.trim();
