import eventBanner from "~/assets/images/event-banner.png"
import brandLogo from "~/assets/images/brand-logo.png"

const getEvents =  () => {
    const events = [];
    for (let i = 0; i < 100; i++) {
        events.push({
            title: "くらしの窓口名 " + i,
            description: "介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう介護施設などに演奏者を派遣。また、音楽葬などもやっていて、幅広く関われそう",
            eventBanner: eventBanner,       
            brandLogo: brandLogo,
            brandName: "河部さん",
            price: "¥1000"
        })
    }
    return events;
}

export { getEvents };