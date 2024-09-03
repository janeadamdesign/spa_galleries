// Package Imports
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Local imports
import { spaGalleriesPantiles, pantilesUrls, SpaContentAnimation } from "@/data/dataAndTypes";


export default function HomeContent(): React.ReactElement {
  // Content generation logic
  const paragraphArray: number[] = [0, 1, 2, 3];
  const injectedPantiles: JSX.Element[] = paragraphArray.map(
    (element: number): JSX.Element => {
      return (
        <p key={element} className="inter copy">
          {spaGalleriesPantiles[element]}
        </p>
      );
    }
  );
  const wrappedPantiles: JSX.Element = (
    <div id="wrapped" className="flex column">
      {injectedPantiles}
    </div>
  );

  // Image loading

  const nextImages: JSX.Element[] = pantilesUrls.map(
    (url: string, index: number): JSX.Element => {
      return (
        <CSSTransition key={url} timeout={500} classNames="photo-fade">
          <Image
            key={url}
            src={url}
            alt={`${url}-pantiles-photo`}
            fill
            sizes="100%"
            className="spa-content-photo"
          />
        </CSSTransition>
      );
    }
  );
  const [imageState, setImageState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): (() => void) => {
    const photoTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (imageState === 2) {
        setImageState(0);
      } else {
        setImageState((prev: number): number => prev + 1);
      }
    }, 7500);

    return (): void => {
      clearTimeout(photoTimer);
    };
  }, [imageState]);

  return (
    <div className="spa-content full-dims">
      <div className="spa-content-container flex row center">
        <div className="photo-container">
          <TransitionGroup>{nextImages[imageState]}</TransitionGroup>
        </div>
        <div id="home-text-container" className="flex column">
          <p className="copy-title">About us</p>
          {wrappedPantiles}
        </div>
      </div>
    </div>
  );
}
