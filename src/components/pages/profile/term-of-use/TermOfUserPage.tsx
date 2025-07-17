import React from 'react';

enum TypeFormatContent {
  DESC = 'desc',
  ORDER_LIST = 'orderList',
  UN_ORDER_LIST = 'unOrderList',
}

export default function TermOfUsePage() {
  const renderContent = (content: string, typeFormatContent: TypeFormatContent) => {
    if (typeFormatContent === TypeFormatContent.ORDER_LIST) {
      return (
        <ol className="list-decimal space-y-1 pl-6 leading-7">
          {content.split('\n').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      );
    }
    if (typeFormatContent === TypeFormatContent.UN_ORDER_LIST) {
      return (
        <ul className="list-disc space-y-1 pl-6 leading-7">
          {content.split('\n').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <div className="leading-7">
        {content.split('\n').map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  };
  const contentList = [
    {
      title: '利用規約',
      content: renderContent(
        '本サービス（以下「本サービス」といいます）は、[サービス提供者名]（以下「当社」といいます）が提供するものです。本サービスをご利用になる前に、以下の利用規約をよくお読みください。本サービスを利用された場合、お客様は本規約のすべての条項に同意したものとみなされます。第1条（本規約の適用）\n本規約は、本サービスの利用に関する当社と利用者（以下「お客様」といいます）との間のあらゆる関係に適用されます。',
        TypeFormatContent.DESC
      ),
    },
    {
      title: '第2条（利用者登録）',
      content: renderContent(
        '本サービスの一部または全部を利用するためには、利用者登録が必要となる場合があります。\n真実かつ正確な情報を提供しなければなりません。虚偽の情報を提供した場合、当社はお客様の登録を取り消すことができるものとします。',
        TypeFormatContent.UN_ORDER_LIST
      ),
    },
    {
      title: '第3条（利用者の責任）',
      content: renderContent(
        'お客様は、本サービスの利用にあたり、関連するすべての法令を遵守するものとします。\nお客様は、自己の責任においてIDおよびパスワードを管理するものとし、これらの管理不十分、使用上の過誤、第三者による不正使用等によって生じた損害に関する責任は、お客様が負うものとします。',
        TypeFormatContent.ORDER_LIST
      ),
    },
    {
      title: '第4条（禁止事項）',
      desc: 'お客様は、本サービスの利用にあたり、以下の行為を行ってはなりません',
      content: renderContent(
        '法令または公序良俗に違反する行為\n犯罪行為に関連する行為\n当社、他の利用者またはその他の第三者の著作権、商標権その他の権利を侵害する行為\n当社、他の利用者またはその他の第三者に不利益、損害、不快感を与える行為\n本サービスの運営を妨害するおそれのある行為\nその他、当社が不適切と判断する行為',
        TypeFormatContent.UN_ORDER_LIST
      ),
    },
    {
      title: '第5条（サービスの停止・中断）',
      desc: '当社は、以下のいずれかの事由があると判断した場合、お客様に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。',
      content: renderContent(
        '本サービスにかかるコンピュータシステムの保守点検または更新を行う場合\n地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合\nコンピュータまたは通信回線等が事故により停止した場合\nその他、当社が本サービスの提供が困難と判断した場合',
        TypeFormatContent.UN_ORDER_LIST
      ),
    },
    {
      title: '第6条（免責事項）',
      content: renderContent(
        '当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。\n当社は、本サービスに起因してお客様に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。',
        TypeFormatContent.ORDER_LIST
      ),
    },
    {
      title: '第7条（著作権）',
      content: renderContent(
        '本サービスに関する著作権その他一切の権利は、当社または正当な権利を有する第三者に帰属します。\n第8条（規約の変更）\n当社は、必要と判断した場合には、お客様に通知することなくいつでも本規約を変更することができるものとします。\n第9条（準拠法・管轄裁判所）\n本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。',
        TypeFormatContent.DESC
      ),
    },
  ];
  return (
    <>
      <h1 className="mb-8 text-display-sm font-bold text-red-900">利用規約</h1>
      <div className="space-y-7">
        {contentList.map((item) => (
          <div className="text-body-lg font-medium" key={item.title}>
            <h2 className="mb-2 font-bold text-brown-900">{item.title}</h2>
            {item.desc && <p className="mb-2">{item.desc}</p>}
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}
