"use client"

import { Button } from "~/components/ui/button";
import { useIsBreakpoint } from "~/hooks/use-breakpoint";

export interface CardEventInfoProps {
    date: string;
    location: string;
    participantFee: string;
}

export default function CardEventInfo({ date, location, participantFee }: CardEventInfoProps) {
    const isTablet = useIsBreakpoint(1024);
    return (
        <div className="max-w-100 w-full border border-brown-300 bg-yellow-50 p-5 flex flex-col gap-7 rounded-xl">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5">
                    <span className="text-body-md md:text-body-lg text-brown-700">時間:</span>
                    <span className="text-body-lg md:text-body-xl text-brown-900">{date}</span>
                </div>
                <div className="flex items-center gap-5">
                    <span className="text-body-md md:text-body-lg text-brown-700">地域:</span>
                    <span className="text-body-lg md:text-body-xl text-brown-900">{location}</span>
                </div>
                <div className="flex items-center gap-5">
                    <span className="text-body-md md:text-body-lg text-brown-700">参加費:</span>
                    <span className="text-body-lg md:text-body-xl text-brown-900">{participantFee}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button typeStyle="round" className="font-bold" size={isTablet ? "lg" : "xl"}>このくらしの窓口に参加する</Button>
            </div>
        </div>
    );
}
