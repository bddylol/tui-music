import { musicKitInstance, isMusicKitAuthenticated } from './stores/musickit';

export async function initializeMusicKit() {
	if (window.MusicKit) {
		try {
			const response = await fetch('/api/generate-token');
			const data = await response.json();

			if (data.token) {
				await window.MusicKit.configure({
					developerToken: data.token,
					app: {
						name: 'TUIMusic',
						build: '1.0.0'
					}
				});

				const instance = window.MusicKit.getInstance();
				musicKitInstance.set(instance);
				isMusicKitAuthenticated.set(instance.isAuthorized);

				if (!instance.isAuthorized) {
					instance
						.authorize()
						.then(() => isMusicKitAuthenticated.set(true))
						.catch((error) => {
							console.error('Authorization failed:', error);
						});
				}
			} else {
				console.error('No token received from server');
				alert('Failed to retrieve MusicKit token. Please try again later.');
			}
		} catch (e) {
			console.error('Error fetching token:', e);
			alert('An error occurred while trying to connect to MusicKit. Please try again later.');
		}
	}
}
