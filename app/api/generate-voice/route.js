
import axios from 'axios';
import { voices } from '@/lib/voiceData';

export async function GET(req) {

    try {
        return new Response(JSON.stringify({ voices }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching voices', { status: 500 });
    }
}