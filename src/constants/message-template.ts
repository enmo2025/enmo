import { User } from '@prisma/client';

const messageTemplate = (existingUser: User) => {
  return {
    welcome: {
      text: `こんにちは ${existingUser.fullName || 'ユーザー'}さん！\n\n✨ ログインありがとうございます！\n\n🎉 あなたの参加をお待ちしております。何かご質問がございましたら、お気軽にお声かけください。`,
    },
  };
};

export default messageTemplate;
