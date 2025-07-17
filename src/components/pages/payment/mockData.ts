import eventBanner from '~/assets/images/event-banner.png';
import eventDetailBanner from '~/assets/images/event-detail-banner.png';
import brandLogo from '~/assets/images/brand-logo.png';

export const mockEventData = {
  id: '1',
  title: 'くらしの窓口名',
  description:
    'カラオケ好きさん、集まれ！！ 懐メロやアニメソングなど、ジャンルは問いません。 歌だけでなく、まったりトークも楽しみましょう🎤✨ くらしの窓口開催は平日、場所は春日部駅近辺のカラオケボックスを予定(駐車場あり) 入会希望の方は、承認後みんなの話題からカキコミしてくださいね！ 歌を愛する方のご参加を',
  eventBanner,
  brandLogo,
  brandName: '河部さん',
  participantFee: 1000,
  date: '2025/02/25',
  location: 'オンライン',
  serviceCharge: 100,
  eventDetailBanner,
  content: `
    <span class="text-headline-xs md:text-headline-sm font-bold text-brown-700">動けるうちに移り住みを決断</span>
    <p>新井さんご夫婦が「グッドタイム リビング」にご入居されたのは半年前。2年前に智子さんは病気を患い、車椅子が必要な生活に。一方の守さんはお元気で、掃除、洗濯、食事作りと、智子さんに代わって家事をこなす日々が続いていました。守さんは智子さんの身の回りのお世話をできる状態ではあったものの、お子さんたちは2人の生活に不安を感じていたそうです。「子どもたちからは『お父さんも、もう85歳を越えているのだから何かあってからでは遅いよ、と。元気なうちに住まいを変えたほうがいい』と会うたびに言われましてね・・・」（守さん）</p>
    <p>まだ入居するのには早いと迷っていた守さんが、一番の優先事項としてあげたのは智子さんの意思でした。</p>
    <p>「もし家内が『入居するのは嫌だ』と言ったら、こちらにお世話になってはいませんでした。2人で話をして、この先のことを考えたら『移り住むのがいいだろう』という結論に。そうと決まれば、子どもたちが言うように、まだいろいろ動けるうちに入居したほうがいいと思い、決断しました」（守さん）</p>
  `,
  host: {
    companyName: 'アルファ株式会社',
    companyLogo: brandLogo,
    companyRole: 'くらしの窓口会社',
    description:
      'こんにちは、川辺です！自然豊かな場所でのんびり過ごすこと、そして美味しいものを食べることが大好きです。この場所を訪れる皆さんが、心からリラックスして、忘れられない思い出を作れるよう、心を込めておもてなしさせていただきます。地元の隠れた名所や、とっておきのグルメ情報などもお気軽にお声がけくださいね。',
    hostName: '斎藤 昭夫',
  },
  summary: '介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう',
};
