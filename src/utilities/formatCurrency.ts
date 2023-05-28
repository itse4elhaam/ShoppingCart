// this function is created to format the currency symbol

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
	currency: "USD",
	style: "currency",
});

export function formatCurrency(number: number) {
	return CURRENCY_FORMATTER.format(number);
}
