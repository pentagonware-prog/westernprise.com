"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type LogoEntry = { icon: React.ReactNode; name?: string; id?: string };
export type LogoCloudSwapProps = { logos: LogoEntry[]; title?: string; subtitle?: string; interval?: number; stagger?: number; className?: string };

const WIPE_DURATION = 0.92;

function LogoItem({ logo, index, isWaving, stagger, totalCount, onDone }: { logo: LogoEntry; index: number; isWaving: boolean; stagger: number; totalCount: number; onDone: () => void }) {
  return <div aria-label={logo.name ?? "Logo"} className={`logo-cloud-item ${isWaving?"is-waving":""}`} style={{animationDelay:`${index*stagger}s`,animationDuration:`${WIPE_DURATION}s`}} onAnimationEnd={()=>{if(isWaving&&index===totalCount-1)onDone()}}>
    <span>{logo.icon}</span>{logo.name&&<small>{logo.name}</small>}
  </div>;
}

export default function LogoCloudSwap({logos,title="Trusted by teams at leading companies",subtitle="Powering organised operations across ambitious teams.",interval=3200,stagger=.11,className}:LogoCloudSwapProps){
  const [waving,setWaving]=React.useState(false);
  React.useEffect(()=>{const id=setInterval(()=>setWaving(true),interval);return()=>clearInterval(id)},[interval]);
  return <section className={cn("logo-cloud",className)}><div className="logo-cloud-heading"><p>{title}</p>{subtitle&&<span>{subtitle}</span>}</div><div className="logo-cloud-row">{logos.map((logo,i)=><LogoItem key={logo.id??i} logo={logo} index={i} isWaving={waving} stagger={stagger} totalCount={logos.length} onDone={()=>setWaving(false)}/>)}</div></section>;
}
