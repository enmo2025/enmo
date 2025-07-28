import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PATH } from '~/constants/routes';
import { EventDetail } from '~/services/clientService/event/event.interface';
import TruncatedText from '../ui/truncated-text';

export default function EventCard({ title, description, eventBanner, participantFee, id, partner }: EventDetail) {
  const router = useRouter();

  const handleClick = () => {
    router.push(PATH.EVENT.DETAIL(id));
  };

  return (
    <div
      className="flex h-[350px] w-full min-w-[150px] cursor-pointer flex-col justify-between overflow-hidden rounded-[5.81px] border border-red-600 max-sm:h-60 sm:rounded-xl lg:min-w-56"
      onClick={handleClick}
    >
      <div className="w-full flex-1 overflow-hidden">
        <Image src={eventBanner} alt="Event Card" width={288} height={180} className="h-full w-full object-cover" />
      </div>
      <div className="h-28 px-3 py-2 sm:h-[160px] sm:p-3">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-1 text-left">
            <TruncatedText maxLines={1}>
              <span className="text-title-sm font-bold text-brown-900 sm:text-title-lg">{title}</span>
            </TruncatedText>
            <span className="line-clamp-3 text-body-xs text-brown-700 sm:text-body-md">{description}</span>
          </div>
          <div className="flex justify-between border-t border-grey-100 pt-3">
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-full border border-red-800 sm:h-6 sm:w-6">
                <Image src={partner.companyLogo} alt="Event Card" fill className="object-cover" />
              </span>
              <TruncatedText maxLines={1} className="min-w-0 flex-1">
                <span className="text-body-xs text-red-800 sm:text-body-lg">{partner.companyName}</span>
              </TruncatedText>
            </span>
            <span className="flex-shrink-0 text-body-xs text-brown-900 sm:text-body-lg">¥{participantFee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
