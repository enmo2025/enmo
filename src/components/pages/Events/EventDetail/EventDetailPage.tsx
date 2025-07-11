import Image from "next/image";
import CardEventInfo from "~/components/shared/card-event-info";
import CardHostInfo from "~/components/shared/card-host-info";
import { Event } from "../events.service";

export default function EventDetailPage({ event }: { event: Event }) {
  return (
    <div className="max-w-200 lg:max-w-300 mx-auto flex gap-10 lg:gap-[100px] px-5 lg:px-10 pt-[60px]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-headline-md md:text-headline-lg font-bold text-red-700">{event.title}</span>
            <span className="text-body-md md:text-body-lg text-brown-700">{event.description}</span>
          </div>
          <div className="flex justify-center items-center sm:hidden">
            <CardEventInfo date={event.date} location={event.location} participantFee={event.participantFee} />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="w-full h-full">
            <Image src={event.eventDetailBanner} alt="host-info" width={700} height={390} />
          </div>
          <div className="flex flex-col gap-5 text-body-md md:text-body-lg text-brown-700" dangerouslySetInnerHTML={{ __html: event.content }}>
          </div>
          <div className="flex justify-center items-center sm:hidden">
            <CardHostInfo companyName={event.host.companyName} companyLogo={event.host.companyLogo} companyRole={event.host.companyRole} description={event.host.description} hostName={event.host.hostName} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 max-sm:hidden">
        <div>
          <CardEventInfo date={event.date} location={event.location} participantFee={event.participantFee} />
        </div>
        <div>
          <CardHostInfo companyName={event.host.companyName} companyLogo={event.host.companyLogo} companyRole={event.host.companyRole} description={event.host.description} hostName={event.host.hostName} />
        </div>
      </div>
    </div>
  );
}
