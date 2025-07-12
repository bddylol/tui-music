import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, KEY_ID, TEAM_ID } from '$env/static/private';

export async function GET() {
	try {
		const token = jwt.sign({}, PRIVATE_KEY, {
			algorithm: 'ES256',
			expiresIn: '1h',
			issuer: TEAM_ID,
			header: {
				kid: KEY_ID,
				alg: 'ES256'
			}
		});

		return new Response(JSON.stringify({ token }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (e) {
		console.error('MusicKit token error:', e);
		return new Response('Error generating token', { status: 500 });
	}
}
