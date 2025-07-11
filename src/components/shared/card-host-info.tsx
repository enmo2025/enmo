import brandLogo from "~/assets/images/brand-logo.png";
import Image, { StaticImageData } from "next/image";

export interface CardHostInfoProps {
    companyName: string;
    companyLogo: StaticImageData;
    companyRole: string;
    description: string;
    hostName: string;
}

export default function CardHostInfo({ companyName, companyLogo, companyRole, description, hostName }: CardHostInfoProps) {
    return (
        <div className="max-w-100 w-full border border-brown-300 bg-yellow-50 p-5 flex flex-col gap-7 rounded-xl">
            <span className="text-title-lg md:text-title-md lg:text-title-lg font-bold text-red-700">くらしパートナーについて</span>
            <div className="flex max-lg:flex-col items-start gap-5">
                <div className="w-20 h-20 border-2 border-red-500 rounded-full overflow-hidden">
                    <Image src={companyLogo} alt="host-info" width={80} height={80} className="object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-headline-lg max-lg:text-headline-md font-bold text-red-700">{companyName}</span>
                    <span className="text-title-md md:text-title-sm lg:text-title-md font-bold text-black">{companyRole}</span>
                </div>
            </div>
            <div className="text-body-md max-lg:text-body-sm text-brown-900">{description}</div>
            <div className="flex items-center gap-5">
                <span className="text-body-lg max-lg:text-body-md text-brown-700">担当者名:</span>
                <span className="text-body-lg text-brown-900">{hostName}</span>
            </div>
        </div>
    );
}
