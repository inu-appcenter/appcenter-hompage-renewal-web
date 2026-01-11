'use client';
import { SectionTitle } from './Components';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Script from 'next/script';
import { MapPin } from 'lucide-react';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
const POSITION = { lat: 37.37658, lng: 126.6358 };

export const LocationSection = () => {
  return (
    <section id="location" className="flex min-h-screen flex-col gap-16 py-20">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />

      <SectionTitle title="Location" description="위치정보" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="relative h-150 flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Map center={POSITION} style={{ width: '100%', height: '100%' }} level={3}>
            <CustomOverlayMap position={POSITION}>
              <div className="relative flex flex-col items-center">
                <div className="bg-brand-primary-cta mb-2 rounded-lg px-4 py-2 shadow-lg ring-1 ring-black/5">
                  <span className="text-sm font-bold whitespace-nowrap text-black">인천대학교 앱센터</span>
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="bg-brand-primary-cta absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></div>
                  <div className="bg-brand-primary-cta relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-md">
                    <MapPin size={18} className="text-black" />
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          </Map>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5">
          <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex w-34 justify-center rounded-[40px] border py-2.5 text-[28px]">주소</div>
          <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex w-34 justify-center rounded-[40px] border py-2.5 text-[28px]">오시는 길</div>
          <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex w-34 justify-center rounded-[40px] border py-2.5 text-[28px]">대표번호</div>
        </div>
      </div>
    </section>
  );
};
