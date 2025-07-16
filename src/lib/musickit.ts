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

				// Set the player volume to the stored value
				let storedVolume = 0.5;
				if (typeof localStorage !== 'undefined') {
					const saved = localStorage.getItem('musicKitVolume');
					if (saved !== null) storedVolume = parseFloat(saved);
				}
				instance.player.volume = storedVolume;

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
