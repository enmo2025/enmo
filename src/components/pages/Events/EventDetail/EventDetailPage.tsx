import Image from 'next/image';
import CardEventInfo from '~/components/shared/card-event-info';
import CardHostInfo from '~/components/shared/card-host-info';
import { Event } from '../events.service';

export default function EventDetailPage({ event }: { event: Event }) {
  return (
    <div className="mx-auto flex max-w-200 gap-10 px-5 pt-[60px] lg:max-w-300 lg:gap-[100px] lg:px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-headline-md font-bold text-red-700 md:text-headline-lg">{event.title}</span>
            <span className="text-body-md text-brown-700 md:text-body-lg">{event.description}</span>
          </div>
          <div className="flex items-center justify-center sm:hidden">
            <CardEventInfo date={event.date} location={event.location} participantFee={event.participantFee} />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="h-full w-full">
            <Image src={event.eventBanner} alt="host-info" width={700} height={390} />
          </div>
          <div
            className="flex flex-col gap-5 text-body-md text-brown-700 md:text-body-lg"
            dangerouslySetInnerHTML={{ __html: event.content }}
          ></div>
          <div className="flex items-center justify-center sm:hidden">
            <CardHostInfo
              companyName={event.host.companyName}
              companyLogo={event.host.companyLogo}
              companyRole={event.host.companyRole}
              description={event.host.description}
              hostName={event.host.hostName}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 max-sm:hidden">
        <div>
          <CardEventInfo date={event.date} location={event.location} participantFee={event.participantFee} />
        </div>
        <div>
          <CardHostInfo
            companyName={event.host.companyName}
            companyLogo={event.host.companyLogo}
            companyRole={event.host.companyRole}
            description={event.host.description}
            hostName={event.host.hostName}
          />
        </div>
      </div>
    </div>
  );
}
