import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

export interface EventCardProps {
    title: string;
    description: string;
    eventBanner: StaticImageData;
    brandLogo: StaticImageData;
    brandName: string;
    participantFee: string;
    id: string;
}

export default function EventCard({ title, description, eventBanner, brandLogo, brandName, participantFee, id }: EventCardProps) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/events/${id}`);
    }

    return (
        <div className="min-w-[150px] w-full border border-red-600 rounded-[5.81px] overflow-hidden max-xs:h-60 sm:min-w-60 sm:rounded-xl cursor-pointer" onClick={handleClick}>
            <div className="w-full overflow-hidden">
                <Image src={eventBanner} alt="Event Card" width={288} height={180} className="object-cover w-full h-full" />
            </div>
            <div className="p-3 sm:h-[160px]">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col text-left gap-1 pb-3 border-b border-grey-100">
                        <span className="text-title-sm font-bold text-brown-900 line-clamp-1 sm:text-title-lg">{title}</span>
                        <span className="text-body-xs text-brown-700 line-clamp-3 sm:text-body-md">{description}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 sm:w-6 sm:h-6 border border-red-800 rounded-full overflow-hidden">
                                <Image src={brandLogo} alt="Event Card" width={24} height={24} className="object-cover" />
                            </span>
                            <span className="text-body-xs text-red-800 sm:text-body-lg">{brandName}</span>
                        </span>
                        <span className="text-body-xs text-brown-900 sm:text-body-lg">
                            {participantFee}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
