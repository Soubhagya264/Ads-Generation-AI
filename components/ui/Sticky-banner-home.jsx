import { StickyBanner } from "@/components/ui/sticky-banner";

export function StickyBannerDemo() {
    return (
        <div className="relative flex h-[10vh] w-full flex-col overflow-y-auto">
            <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
                <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
                    This is a learning project for AI-generated ads using HeyGen API — currently free, but may become paid in the future, which could affect video generation.{" "}
                </p>
            </StickyBanner>
            
        </div>
    );
}


