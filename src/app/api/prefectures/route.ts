import { NextResponse } from "next/server";

interface Prefecture {
  id: number;
  name: string;
  nameJP: string;
  region: string;
}

const prefectures: Prefecture[] = [
    { id: 1, name: "Hokkaido", nameJP: "北海道", region: "Hokkaido" },
    { id: 2, name: "Aomori", nameJP: "青森県", region: "Tohoku" },
    { id: 3, name: "Iwate", nameJP: "岩手県", region: "Tohoku" },
    { id: 4, name: "Miyagi", nameJP: "宮城県", region: "Tohoku" },
    { id: 5, name: "Akita", nameJP: "秋田県", region: "Tohoku" },
    { id: 6, name: "Yamagata", nameJP: "山形県", region: "Tohoku" },
    { id: 7, name: "Fukushima", nameJP: "福島県", region: "Tohoku" },
    { id: 8, name: "Ibaraki", nameJP: "茨城県", region: "Kanto" },
    { id: 9, name: "Tochigi", nameJP: "栃木県", region: "Kanto" },
    { id: 10, name: "Gunma", nameJP: "群馬県", region: "Kanto" },
    { id: 11, name: "Saitama", nameJP: "埼玉県", region: "Kanto" },
    { id: 12, name: "Chiba", nameJP: "千葉県", region: "Kanto" },
    { id: 13, name: "Tokyo", nameJP: "東京都", region: "Kanto" },
    { id: 14, name: "Kanagawa", nameJP: "神奈川県", region: "Kanto" },
    { id: 15, name: "Niigata", nameJP: "新潟県", region: "Chubu" },
    { id: 16, name: "Toyama", nameJP: "富山県", region: "Chubu" },
    { id: 17, name: "Ishikawa", nameJP: "石川県", region: "Chubu" },
    { id: 18, name: "Fukui", nameJP: "福井県", region: "Chubu" },
    { id: 19, name: "Yamanashi", nameJP: "山梨県", region: "Chubu" },
    { id: 20, name: "Nagano", nameJP: "長野県", region: "Chubu" },
    { id: 21, name: "Gifu", nameJP: "岐阜県", region: "Chubu" },
    { id: 22, name: "Shizuoka", nameJP: "静岡県", region: "Chubu" },
    { id: 23, name: "Aichi", nameJP: "愛知県", region: "Chubu" },
    { id: 24, name: "Mie", nameJP: "三重県", region: "Kinki" },
    { id: 25, name: "Shiga", nameJP: "滋賀県", region: "Kinki" },
    { id: 26, name: "Kyoto", nameJP: "京都府", region: "Kinki" },
    { id: 27, name: "Osaka", nameJP: "大阪府", region: "Kinki" },
    { id: 28, name: "Hyogo", nameJP: "兵庫県", region: "Kinki" },
    { id: 29, name: "Nara", nameJP: "奈良県", region: "Kinki" },
    { id: 30, name: "Wakayama", nameJP: "和歌山県", region: "Kinki" },
    { id: 31, name: "Tottori", nameJP: "鳥取県", region: "Chugoku" },
    { id: 32, name: "Shimane", nameJP: "島根県", region: "Chugoku" },
    { id: 33, name: "Okayama", nameJP: "岡山県", region: "Chugoku" },
    { id: 34, name: "Hiroshima", nameJP: "広島県", region: "Chugoku" },
    { id: 35, name: "Yamaguchi", nameJP: "山口県", region: "Chugoku" },
    { id: 36, name: "Tokushima", nameJP: "徳島県", region: "Shikoku" },
    { id: 37, name: "Kagawa", nameJP: "香川県", region: "Shikoku" },
    { id: 38, name: "Ehime", nameJP: "愛媛県", region: "Shikoku" },
    { id: 39, name: "Kochi", nameJP: "高知県", region: "Shikoku" },
    { id: 40, name: "Fukuoka", nameJP: "福岡県", region: "Kyushu" },
    { id: 41, name: "Saga", nameJP: "佐賀県", region: "Kyushu" },
    { id: 42, name: "Nagasaki", nameJP: "長崎県", region: "Kyushu" },
    { id: 43, name: "Kumamoto", nameJP: "熊本県", region: "Kyushu" },
    { id: 44, name: "Oita", nameJP: "大分県", region: "Kyushu" },
    { id: 45, name: "Miyazaki", nameJP: "宮崎県", region: "Kyushu" },
    { id: 46, name: "Kagoshima", nameJP: "鹿児島県", region: "Kyushu" },
    { id: 47, name: "Okinawa", nameJP: "沖縄県", region: "Kyushu" }
];

export async function GET() {
  return NextResponse.json(prefectures);
}