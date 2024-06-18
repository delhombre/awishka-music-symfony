export function extractUrl(url) {
	if (url.includes("http")) {
		return "https://" + url.split("://")[1];
	}
	return url;
}
