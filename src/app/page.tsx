// Use Client Declaration
"use client";

// Package Imports
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// Local Imports
import "../styling/spa.scss";
import "../styling/RTGTransitions.scss";

import Artists from "@/SPAContent/Artists";
import Footer from "../components/Footer";
import Geometer from "../components/Geometer";
import Header from "../components/Header";
import HomeContent from "../SPAContent/HomeContent";
import SubHeader from "../components/SubHeader";
import WhatsOn from "@/SPAContent/WhatsOn";
import WhiteScreen from "@/components/WhiteScreen";

import {
  SpaContentAnimation,
  pantilesUrls,
  eventImageUrls,
  artistUrlsCombined,
  storeImages,
} from "@/data/dataAndTypes";

export default function Home() {
  //Image preloading logic
  const [imagesPreload, setImagesPreload]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const allImageUrls: string[] = [
    ...pantilesUrls,
    ...eventImageUrls.flat(),
    ...artistUrlsCombined.flat(),
    "/pantiles.png",
    "/ui_close_red.png",
    "/ui_close_black.png",
  ];
  const [isLoaded, setIsLoaded]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  <div className=".0"></div>;
  useEffect((): void => {
    if (imagesPreload.length >= allImageUrls.length) return;
    else {
      storeImages(allImageUrls, setImagesPreload);
      setIsLoaded(true);
    }
  }, [imagesPreload]);

  // Doubles checking

  const [isDoubles, setIsDoubles]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  useEffect((): (() => void) => {
    const checkWidth = (): void => {
      const width: number = window.innerWidth;
      if (width > 1000) {
        setIsDoubles(true);
      } else setIsDoubles(false);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return (): void => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

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
    0: <HomeContent isDoubles={isDoubles} />,
    1: <Artists isDoubles={isDoubles} />,
    2: <WhatsOn isDoubles={isDoubles} />,
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

  // Scroll to top logic
  useEffect((): (() => void) => {
    const scrollTimer: NodeJS.Timeout | number = setTimeout((): void => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1);

    return (): void => {
      clearTimeout(scrollTimer);
    };
  }, [pageState]);

  // Submission state
  const [submission, setSubmission]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  // Horizontalis
  const [isHorizontal, setIsHorizontal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  useEffect((): (() => void) => {
    const checkHorizontal = (): void => {
      if (window.innerWidth > window.innerHeight) {
        setIsHorizontal(true);
      } else setIsHorizontal(false);
    };
    checkHorizontal();
    window.addEventListener("resize", checkHorizontal);
    return (): void => {
      window.removeEventListener("resize", checkHorizontal);
    };
  }, []);

  return (
    <>
      <div
        id="home"
        className={`full-dims home-${submission ? "small" : "large"}-offset`}
      >
        {" "}
        <Header />
        <SubHeader pageState={pageState} setPageState={setPageState} />
        {!introduction && isLoaded && (
          <>
            {
              <div id="space">
                <AnimatePresence mode="wait">
                  <motion.div key={pageState} {...spaContentAnimation}>
                    {spaContentComponents[pageState]}
                  </motion.div>
                </AnimatePresence>
              </div>
            }
            <div id="blank-space-container">
              <div id="blank-space" className="flex row center">
                <Geometer pageState={pageState} isHorizontal={isHorizontal} />
              </div>
            </div>
            <Footer
              submission={submission}
              setSubmission={setSubmission}
              isHorizontal={isHorizontal}
            />
          </>
        )}
      </div>
      {
        <WhiteScreen
          introduction={introduction}
          setIntroduction={setIntroduction}
          isHorizontal={isHorizontal}
        />
      }
    </>
  );
}
