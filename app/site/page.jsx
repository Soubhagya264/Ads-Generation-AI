import React from 'react';
import { HeroSectionOne } from '@/components/ui/Background';
import { Spotlight } from '@/components/ui/spotlight';
import { StickyBannerDemo } from '@/components/ui/Sticky-banner-home';
const page = () => {
  return (
    <>
      <StickyBannerDemo />
      <Spotlight position="left" className="top-0 left-0" />
      <Spotlight position="right" className="top-0 right-0" />

      <div className=' mt-[10px] flex justify-center items-center text-center'>
       
        <HeroSectionOne />
      </div>
    </>
  );
}

export default page;
