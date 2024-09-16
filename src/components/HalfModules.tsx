// package imports
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// local imports
import { ModularContentBlockProps } from "@/data/dataAndTypes";

export default function ModularContentBlock(
  props: ModularContentBlockProps
): React.ReactElement {
  // destructuring props
  const {
    isOdd,
    imageUrlArray,
    rightHandContent,
  }: {
    isOdd: boolean;
    imageUrlArray: string[];
    rightHandContent: JSX.Element;
  } = props;

  // Differential rendering state control
  const [imageState, setImageState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    const imageArrayLength: number = imageUrlArray.length;
    if (imageArrayLength < 1) return;
    const adjustedArrayLength: number = imageArrayLength - 1;
    const delayConst: number = 5000;
    const photoTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (imageState === adjustedArrayLength) {
        setImageState(0);
      } else {
        setImageState((prev: number): number => prev + 1);
      }
    }, delayConst);

    return (): void => {
      clearTimeout(photoTimer);
    };
  }, [imageState, imageUrlArray]);

  const evenInitial: { clipPath: string } = {
    clipPath: "inset(0 0 0 100%)",
  };
  const oddInitial: { clipPath: string } = {
    clipPath: "inset(0 100% 0 0)",
  };
  const photoSide: JSX.Element = (
    <div className="half-photo-container">
      <AnimatePresence>
        <motion.img
          alt={imageUrlArray[imageState]}
          src={imageUrlArray[imageState]}
          key={`key-${imageUrlArray[imageState]}`}
          className="spa-content-photo full-dims"
          initial={isOdd ? { ...oddInitial } : { ...evenInitial }}
          animate={{ clipPath: `inset(0 0 0 0)` }}
          exit={{ clipPath: `inset(0 0 0 0)`, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
  const textSide: JSX.Element = rightHandContent;
  const parentClassName: string = !isOdd
    ? "spa-content full-dims fill-grey-right"
    : "spa-content full-dims fill-grey-left";

  return (
    <div className={parentClassName}>
      <div
        className="half-content-container flex column between"
        style={isOdd ? { marginLeft: "auto" } : {}}
      >
        {photoSide}
        {textSide}
      </div>
    </div>
  );
}
