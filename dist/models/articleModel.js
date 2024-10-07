"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
// src/models/articleModel.ts
const mongoose_1 = __importStar(require("mongoose"));
// Esquema do Article
const ArticleSchema = new mongoose_1.Schema({
    title: { type: String, required: true }, // Título do artigo
    description: { type: String, required: true }, // Descrição do artigo
    category: { type: String, required: true }, // Categoria do artigo
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 3'], default: [] }, // Até 3 URLs de imagens
    textSections: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 3'], default: [] } // Até 3 sessões de texto
});
// Validação para garantir que as imagens e textSections tenham no máximo 3 itens
function arrayLimit(val) {
    return val.length <= 3;
}
// Exporta o modelo de Article
exports.Article = mongoose_1.default.model('Article', ArticleSchema);
