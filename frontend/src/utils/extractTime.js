export function extractTime(dateString) {
	const date = new Date(dateString);
	let hours = padZero(date.getHours());
	if(hours > 12){
		hours =  `${hours-12}`;
	}
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
