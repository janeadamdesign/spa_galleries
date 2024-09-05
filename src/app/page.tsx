// Use Client Declaration
"use client";

// Package Imports
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
  pantilesUrls,
  eventImageUrls,
  artistUrlsCombined,
} from "@/data/dataAndTypes";

export default function Home() {
  // Image Preloading Logic DOESN'T WORK IN NEXT.JS
  const storeNextImages = (
    srcArray: string[],
    stateSetter: React.Dispatch<React.SetStateAction<React.ReactElement[]>>
  ): void => {
    const handleImageLoad = (image: React.ReactElement): void => {
      stateSetter((prev: React.ReactElement[]): React.ReactElement[] => {
        if (
          prev.find(
            (extantImg: React.ReactElement): boolean =>
              extantImg.props.src === image.props.src
          )
        ) {
          return prev;
        } else return [...prev, image];
      });
    };
    srcArray.forEach((src: string): void => {
      const img: React.ReactElement = (
        <Image
          src={src}
          alt={`${src}-alt`}
          className="invisible-image"
          onLoad={() => handleImageLoad(<Image src={src} alt={`${src}-alt`} />)}
        />
      );
    });
  };
  const [nextImagesPreload, setNextImagesPreload]: [
    React.ReactElement[],
    React.Dispatch<React.SetStateAction<React.ReactElement[]>>
  ] = useState<React.ReactElement[]>([]);
  const allImageUrls: string[] = [
    ...pantilesUrls,
    ...eventImageUrls.flat(),
    ...artistUrlsCombined.flat(),
    "/pantiles.png",
  ];
  const [isLoaded, setIsLoaded]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): void => {
    if (nextImagesPreload.length >= allImageUrls.length) return;
    else {
      storeNextImages(allImageUrls, setNextImagesPreload);
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
      <div id="invisible-image-container">{...nextImagesPreload}</div>{" "}
      <div id="home">
        <Header nextImagesPreload={nextImagesPreload} />
        <SubHeader pageState={pageState} setPageState={setPageState} />
        {!introduction && isLoaded && (
          <>
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
      <WhiteScreen
        introduction={introduction}
        setIntroduction={setIntroduction}
      />
    </>
  );
}
