import OpenAI from 'openai';
import { supabase } from './supabase';

let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
} catch (error) {
  console.error('Error initializing OpenAI:', error);
}

export async function getChatResponse(message: string, userId: string | undefined) {
  try {
    // Store user message
    if (userId) {
      await supabase.from('chat_history').insert({
        user_id: userId,
        message,
        is_bot: false
      });
    }

    if (!openai) {
      const fallbackResponse = "I apologize, but I'm currently operating in limited mode. Please contact support to enable AI features.";
      
      // Store fallback response
      if (userId) {
        await supabase.from('chat_history').insert({
          user_id: userId,
          message: fallbackResponse,
          is_bot: true
        });
      }
      
      return fallbackResponse;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for MotionFleet, an AI-powered outdoor advertising platform using dynamic LED panels on commercial vehicles. Help users with registration, advertising campaigns, and general inquiries."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";

    // Store bot response
    if (userId) {
      await supabase.from('chat_history').insert({
        user_id: userId,
        message: response,
        is_bot: true
      });
    }

    return response;
  } catch (error) {
    console.error('Error getting chat response:', error);
    return "I'm sorry, I encountered an error processing your request.";
  }
}