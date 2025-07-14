import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

export interface EventCardProps {
  title: string;
  description: string;
  eventBanner: StaticImageData;
  brandLogo: StaticImageData;
  brandName: string;
  participantFee: string;
  id: string;
}

export default function EventCard({
  title,
  description,
  eventBanner,
  brandLogo,
  brandName,
  participantFee,
  id,
}: EventCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <div
      className="w-full min-w-[150px] cursor-pointer overflow-hidden rounded-[5.81px] border border-red-600 max-xs:h-60 sm:min-w-60 sm:rounded-xl"
      onClick={handleClick}
    >
      <div className="w-full overflow-hidden">
        <Image src={eventBanner} alt="Event Card" width={288} height={180} className="h-full w-full object-cover" />
      </div>
      <div className="p-3 sm:h-[160px]">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-1 border-b border-grey-100 pb-3 text-left">
            <span className="line-clamp-1 text-title-sm font-bold text-brown-900 sm:text-title-lg">{title}</span>
            <span className="line-clamp-3 text-body-xs text-brown-700 sm:text-body-md">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 overflow-hidden rounded-full border border-red-800 sm:h-6 sm:w-6">
                <Image src={brandLogo} alt="Event Card" width={24} height={24} className="object-cover" />
              </span>
              <span className="text-body-xs text-red-800 sm:text-body-lg">{brandName}</span>
            </span>
            <span className="text-body-xs text-brown-900 sm:text-body-lg">{participantFee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
