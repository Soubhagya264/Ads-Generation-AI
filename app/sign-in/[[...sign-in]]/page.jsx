// app/sign-in/page.tsx
'use client'

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] via-[#1E1E2F] to-[#0F2027]">
            <div className="backdrop-blur-md   p-6 sm:p-12 w-full max-w-md mx-auto">
                <SignIn
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            card: 'bg-transparent shadow-none',
                            headerTitle: 'text-white text-2xl font-bold',
                            headerSubtitle: 'text-gray-300',
                            socialButtonsBlockButton: 'bg-white text-black hover:bg-gray-100',
                            dividerLine: 'bg-white/20',
                            formButtonPrimary:
                                'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
                            footerActionText: 'text-white',
                            footerActionLink: 'text-blue-400 hover:underline',
                            formFieldInput: 'bg-white/10 border border-white/20 text-white placeholder:text-white/40',
                            formFieldLabel: 'text-white',
                        },
                    }}
                />
            </div>
        </div>
    )
}
