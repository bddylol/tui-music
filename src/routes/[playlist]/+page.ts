import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		playlist: params.playlist || null
	};
};
