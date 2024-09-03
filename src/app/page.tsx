// Use Client Declaration
"use client";

// Package Imports
import React, { useState } from "react";
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
import { SpaContentAnimation } from "@/data/dataAndTypes";

export default function Home() {
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

  return (
    <div id="home">
      <Header />
      <SubHeader pageState={pageState} setPageState={setPageState} />
      <div id="space">
        <AnimatePresence mode="wait">
          <motion.div key={pageState} {...spaContentAnimation}>
            {spaContentComponents[pageState]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div id="blank-space" className="flex row center">
        <Geometer pageState={pageState}/>
      </div>
      <Footer />
    </div>
  );
}
