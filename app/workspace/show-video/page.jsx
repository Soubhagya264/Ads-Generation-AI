import { Suspense } from 'react';
import ShowVideoClient from './ShowVideoClient';

export default function Page() {
    return (
        <Suspense fallback={<div className="text-white p-10 text-center">Loading video...</div>}>
            <ShowVideoClient />
        </Suspense>
    );
}
