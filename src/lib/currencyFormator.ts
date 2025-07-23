import i18n from "@/app/i18n";




export function NumbertoPrice(
    price = 0,
    currency = "THB",
) {
    return new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: currency,
    }).format(price);
}