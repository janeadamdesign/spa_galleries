// Use Client Declaration
"use client";

// Package Imports
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Local Imports
import "../styling/spa.scss";
import "../styling/RTGTransitions.scss";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";
import HomeContent from "../SPAContent/HomeContent";
import Artists from "@/SPAContent/Artists";
import WhatsOn from "@/SPAContent/WhatsOn";
import Geometer from "../components/Geometer";
import WhiteScreen from "@/components/WhiteScreen";
import {
  SpaContentAnimation,
  storeImages,
  pantilesUrls,
  eventImageUrls,
} from "@/data/dataAndTypes";

export default function Home() {
  // Image Preloading Logic
  const [nextImagesPreload, setNextImagesPreload]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const allImageUrls: string[] = [...pantilesUrls, ...eventImageUrls.flat()];
  const [isLoaded, setIsLoaded]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  useEffect((): void => {
    if (nextImagesPreload.length >= allImageUrls.length) return;
    else {
      storeImages(allImageUrls, setNextImagesPreload);
      setIsLoaded(true);
    }
  }, [nextImagesPreload]);

  // Differential Rendering Logic
  const [pageState, setPageState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const spaContentAnimation: SpaContentAnimation = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  };
  const spaContentComponents: { [key: number]: React.ReactElement } = {
    0: <HomeContent />,
    1: <Artists />,
    2: <WhatsOn />,
  };

  // Loading Scene

  const [introduction, setIntroduction]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  useEffect((): void | (() => void) => {
    const preventScroll = (e: WheelEvent | TouchEvent): void =>
      e.preventDefault();
    if (introduction) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return (): void => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [introduction]);

  return (
    <>
      <div id="home">
        <Header />
        <SubHeader pageState={pageState} setPageState={setPageState} />
        {!introduction && isLoaded && (
          <>
            {" "}
            <div id="space">
              <AnimatePresence mode="wait">
                <motion.div key={pageState} {...spaContentAnimation}>
                  {spaContentComponents[pageState]}
                </motion.div>
              </AnimatePresence>
            </div>
            <div id="blank-space-container">
              <div id="blank-space" className="flex row center">
                <Geometer pageState={pageState} />
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
      <WhiteScreen introduction={introduction} setIntroduction={setIntroduction} />
    </>
  );
}
