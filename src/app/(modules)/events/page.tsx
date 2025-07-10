import eventBanner from "~/assets/images/event-banner.png"
import brandLogo from "~/assets/images/brand-logo.png"
import EventList from "~/components/shared/event-list";

export default function EventsPage() {
    const eventList = [
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
        {
            title: "くらしの窓口名",
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        },
    ]
    return (
        <div className="mx-auto max-w-[1200px] pt-[60px] px-5 md:px-10 flex flex-col gap-10 md:gap-[60px] lg:gap-10">
            <span className="text-headline-lg font-bold text-red-700">くらしの窓口リスト</span>
            <EventList
                eventList={eventList}
            />
        </div>
    );
}
