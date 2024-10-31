// src/models/emojiModel.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento Emoji
export interface IEmoji extends Document {
    name: string;         // Nome do emoji
    code: string;
    isClicked: boolean;   // Indica se o emoji foi clicado ou não
}

// Esquema do Emoji
const EmojiSchema: Schema = new Schema({
    name: { type: String, required: true },       // Nome do emoji, exemplo: "smile", "heart"
    code: { type: String, required: true},
    isClicked: { type: Boolean, default: false }, // Estado inicial é "não foi clicado"
});

// Exporta o modelo de Emoji
export const Emoji = mongoose.model<IEmoji>('Emoji', EmojiSchema);
