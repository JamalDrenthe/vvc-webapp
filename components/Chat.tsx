import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send } from 'lucide-react';
import { Card, Button } from './UI';
import { User } from '../types';

interface ChatProps {
    user?: User;
    context?: string;
}

const Chat: React.FC<ChatProps> = ({ user, context }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: `Hoi ${user?.firstName || 'vriend'}! ${context ? `Ik zie dat je bezig bent met: ${context}. ` : ''}Waarmee kan ik helpen?` }
    ]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        const txt = input;
        setInput('');
        setLoading(true);
        setMessages(p => [...p, { role: 'user', text: txt }]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Build a conversation history roughly
            // For simple chat, we just send the new prompt with context. 
            // In a real app, we would use chat.sendMessage from ai.chats.create
            
            const systemInstruction = `Je bent een behulpzame VVC assistent. Je helpt gebruikers met onboarding, sales vragen en platform navigatie. Context: ${context || 'Algemeen dashboard'}.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-09-2025',
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: txt }]
                    }
                ],
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            const responseText = response.text || "Sorry, ik kon geen antwoord genereren.";
            setMessages(p => [...p, { role: 'model', text: responseText }]);

        } catch (error) {
            console.error(error);
            setMessages(p => [...p, { role: 'model', text: "Er is een fout opgetreden bij het verbinden met de assistent." }]);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-[500px] w-full">
            <h1 className="text-xl font-bold mb-4 flex gap-2 items-center text-slate-800">
                <Sparkles className="text-brand-600" size={20} /> 
                VVC Assistent
            </h1>
            <Card className="flex-1 flex flex-col overflow-hidden relative border border-slate-200 shadow-sm">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-xl max-w-[85%] text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-brand-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                             <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-bl-none text-xs text-slate-400 italic">
                                Aan het typen...
                             </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
                <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                    <input
                        className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Stel je vraag..."
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading} size="sm" className="w-12">
                        <Send size={16} />
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Chat;