// src/models/articleModel.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento Article
export interface IArticle extends Document {
    title: string;
    description: string;
    category: string;
    author: string;
    images: string[]; // URLs ou paths para até 3 imagens
    textSections: string[]; // Até 3 sessões de texto
}

// Esquema do Article
const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },               // Título do artigo
    description: { type: String, required: true },         // Descrição do artigo
    category: { type: String, required: true },            // Categoria do artigo
    author: { type: String, required: true },
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 3'], default: [] },  // Até 3 URLs de imagens
    textSections: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 3'], default: [] } // Até 3 sessões de texto
});

// Validação para garantir que as imagens e textSections tenham no máximo 3 itens
function arrayLimit(val: string[]) {
    return val.length <= 3;
}

// Exporta o modelo de Article
export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
