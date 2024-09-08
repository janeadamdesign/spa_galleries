// Package imports
import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// local imports
import Geometer from "./Geometer";

interface WhiteScreenProps {
  introduction: boolean;
  setIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
  isHorizontal: boolean;
}

export default function WhiteScreen(
  props: WhiteScreenProps
): React.ReactElement {
  // destructruing props
  const {
    introduction,
    setIntroduction,
    isHorizontal,
  }: {
    introduction: boolean;
    setIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
    isHorizontal: boolean;
  } = props;




  // Clickable logic
  const [isClickable, setIsClickable]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): void | (() => void) => {
    if (isClickable) return;
    const clickTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setIsClickable(true);
    }, 4000);
    return (): void => {
      clearTimeout(clickTimer)
    };
  }, []);
  const isClickableAttributes: {} = {
    className: "clickable",
    onClick: (): void => {
      setIntroduction(false);
    },
  };

  return (
    <motion.div
      id="white-screen"
      className="full-dims"
      initial={{
        y: 0,
      }}
      animate={{
        y: !introduction ? "-100%" : 0,
      }}
      transition={{
        ease: easeInOut,
        duration: 0.25,
      }}
    >
      <motion.div
        className="full-dims"
        initial={{
          opacity: 0,
          scale: 2.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          scale: { ease: "easeOut", duration: 4 },
          opacity: { ease: "easeOut", duration: 2 },
        }}
      >
        <div
          id="intro-geometry-container"
          {...(isClickable && isClickableAttributes)}
        >
          <Geometer pageState={3} isHorizontal={isHorizontal} />
        </div>
      </motion.div>
    </motion.div>
  );
}
