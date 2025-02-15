export enum MessageAuthor {
  Human = 'human',
  AI = 'ai',
}

export interface ChatbotMessage {
  author: MessageAuthor;
  message: string;
}

export interface SendMessageInput {
  message: string;
  history: ChatbotMessage[];
}

export interface ChatbotResponse {
  historyMessages: ChatbotMessage[];
  response: ChatbotMessage;
  message: string;
}
