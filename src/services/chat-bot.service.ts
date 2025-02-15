import {apiEndpoints} from '../constants/api-endpoints';
import instance from '../lib/axiosInstance';
import {ChatbotResponse, SendMessageInput} from '../types/ChatMessage';

export class ChatBotService {
  static async sendMessage(input: SendMessageInput) {
    const response = await instance.post<ChatbotResponse>(
      apiEndpoints.chatBot,
      input,
    );

    return response.data;
  }
}
