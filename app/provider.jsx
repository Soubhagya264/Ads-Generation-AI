"use client"
import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Provider = ({ children }) => {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
    return (
        <ConvexProvider client={convex}>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
            <>{children}</>
            </PayPalScriptProvider>
        </ConvexProvider>
    );
}

export default Provider;
