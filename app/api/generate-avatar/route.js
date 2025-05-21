import { avatars } from '@/lib/avatarData';

export async function GET(req) {
    try {
        return new Response(JSON.stringify({ avatars }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching avatars', { status: 500 });
    }
}
