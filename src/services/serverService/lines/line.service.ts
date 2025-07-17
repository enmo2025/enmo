interface LineMessage {
  type: 'text' | 'sticker' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'imagemap' | 'template' | 'flex';
  text?: string;
  stickerId?: string;
  packageId?: string;
  originalContentUrl?: string;
  previewImageUrl?: string;
  duration?: number;
  address?: string;
  title?: string;
  latitude?: number;
  longitude?: number;
  altText?: string;
  template?: unknown;
  contents?: unknown;
}

interface LineMessageRequest {
  to: string;
  messages: LineMessage[];
}

interface LineErrorResponse {
  message: string;
  details?: Array<{
    property: string;
    message: string;
  }>;
}

export class LineService {
  private readonly accessToken: string;
  private readonly channelSecret: string;
  private readonly baseUrl = 'https://api.line.me/v2/bot';

  constructor() {
    this.accessToken = process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN!;
    this.channelSecret = process.env.LINE_BOT_CHANNEL_SECRET!;

    if (!this.accessToken || !this.channelSecret) {
      throw new Error('LINE Bot credentials are not configured');
    }
  }

  async sendMessage(lineUserId: string, messages: LineMessage[]): Promise<boolean> {
    try {
      const requestBody: LineMessageRequest = {
        to: lineUserId,
        messages,
      };

      const response = await fetch(`${this.baseUrl}/message/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData: LineErrorResponse = await response.json();
        console.error('LINE messaging error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to send LINE message:', error);
      return false;
    }
  }
}

export const lineService = new LineService();
