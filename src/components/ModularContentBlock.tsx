// package imports
import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";

interface ModularContentBlockProps {
  isOdd: boolean;
  isHome: boolean;
  imageUrlArray: string[];
  rightHandContent: JSX.Element;
  imagesPreload: HTMLImageElement[];
}

export default function ModularContentBlock(
  props: ModularContentBlockProps
): React.ReactElement {
  // destructuring props
  const {
    isOdd,
    imageUrlArray,
    rightHandContent,
    imagesPreload,
    
  }: {
    isOdd: boolean;
    imageUrlArray: string[];
    rightHandContent: JSX.Element;
    imagesPreload: HTMLImageElement[];
  } = props;

  // Image JSX Array Generation function
  const generateImagesCSSTransition = (
    imageUrlArray: string[]
  ): JSX.Element[] => {
    return imageUrlArray.map((url: string): JSX.Element => {
      const classNameCSS: string = isOdd ? "photo-fade-odd" : "photo-fade";
      const storedImage: HTMLImageElement | undefined = imagesPreload.find(
        (image: HTMLImageElement): boolean => {
          return image.src.endsWith(url);
        }
      );
      let statefulUrl: string = "";
      if (!storedImage) return <></>;
      else statefulUrl = storedImage.src;

      return (
        <CSSTransition key={url} timeout={250} classNames={classNameCSS}>
          <img
            key={url}
            src={statefulUrl}
            alt={`${url}-photo`}
            className="spa-content-photo full-dims"
          />
        </CSSTransition>
      );
    });
  };
  const [storedNextImages, setStoredNextImages]: [
    JSX.Element[] | null,
    React.Dispatch<React.SetStateAction<JSX.Element[] | null>>
  ] = useState<JSX.Element[] | null>(null);
  useEffect((): void => {
    if (storedNextImages) return;
    else {
      setStoredNextImages(generateImagesCSSTransition(imageUrlArray));
    }
  }, [imageUrlArray, storedNextImages]);

  // Differential rendering state control
  const [imageState, setImageState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);

  useEffect((): void | (() => void) => {
    const imageArrayLength: number = imageUrlArray.length;
    if (imageArrayLength < 1) return;
    const adjustedArrayLength: number = imageArrayLength - 1;
    const delayConst: number = 4000;
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

  const photoSide: JSX.Element = (
    <div className="photo-container">
      {storedNextImages &&
      <SwitchTransition>
        { storedNextImages[imageState]}
      </SwitchTransition>}
    </div>
  );
  const textSide: JSX.Element = rightHandContent;

  const parentClassName: string = !isOdd
    ? "spa-content full-dims fill-grey-right"
    : "spa-content full-dims fill-grey-left";

  return (
    <div className={parentClassName}>
      <div
        className="spa-content-container flex row center"
        style={isOdd ? { marginLeft: "auto" } : {}}
      >
        {!isOdd ? (
          <>
            {photoSide}
            {textSide}
          </>
        ) : (
          <>
            {textSide}
            {photoSide}
          </>
        )}
      </div>
    </div>
  );
}
