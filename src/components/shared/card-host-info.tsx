import Image, { StaticImageData } from 'next/image';

export interface CardHostInfoProps {
  companyName: string;
  companyLogo: StaticImageData;
  companyRole: string;
  description: string;
  hostName: string;
}

export default function CardHostInfo({
  companyName,
  companyLogo,
  companyRole,
  description,
  hostName,
}: CardHostInfoProps) {
  return (
    <div className="flex w-full max-w-100 flex-col gap-7 rounded-xl border border-brown-300 bg-yellow-50 p-5">
      <span className="text-title-lg font-bold text-red-700 md:text-title-md lg:text-title-lg">
        くらしパートナーについて
      </span>
      <div className="flex items-start gap-5 max-lg:flex-col">
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-red-500">
          <Image src={companyLogo} alt="host-info" width={80} height={80} className="object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-headline-lg font-bold text-red-700 max-lg:text-headline-md">{companyName}</span>
          <span className="text-title-md font-bold text-black md:text-title-sm lg:text-title-md">{companyRole}</span>
        </div>
      </div>
      <div className="text-body-md text-brown-900 max-lg:text-body-sm">{description}</div>
      <div className="flex items-center gap-5">
        <span className="text-body-lg text-brown-700 max-lg:text-body-md">担当者名:</span>
        <span className="text-body-lg text-brown-900">{hostName}</span>
      </div>
    </div>
  );
}
