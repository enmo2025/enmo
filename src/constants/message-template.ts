import { User } from '@prisma/client';

const messageTemplate = (existingUser?: User) => {
  return {
    welcome: {
      text: `こんにちは ${existingUser?.fullName || 'ユーザー'}さん！\n✨ ログインありがとうございます！\n🎉 あなたの参加をお待ちしております。何かご質問がございましたら、お気軽にお声かけください。`,
    },
    confirmPurchase: {
      text: 'ご購入ありがとうございます！\nご注文を確認いたしました。\nお支払いが完了しましたら、お手続きが完了いたします。',
    },
  };
};

export default messageTemplate;
