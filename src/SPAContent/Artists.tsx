//package imports
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// local imports
import { artistData, ArtistDatum } from "@/data/dataAndTypes";

interface ArtistPortraitProps {
  urls: string[];
  name: string;
  href: string;
  even: boolean;
}

function ArtistPortrait(props: ArtistPortraitProps): React.ReactElement {
  // Destructure props
  const {
    urls,
    name,
    href,
    even,
  }: {
    urls: string[];
    name: string;
    href: string;
    even: boolean;
  } = props;

  // Image carousel logic
  const [urlState, setUrlState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [firstTransition, setFirstTransition]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  useEffect((): (() => void) => {
    const numberOfImages: number = urls.length;
    const timerConstant: number = even && firstTransition ? 6000 : 5000;
    const imageUrlTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (urlState === numberOfImages - 1) {
        setUrlState(0);
      } else {
        setUrlState((prev: number): number => prev + 1);
        setFirstTransition(false);
      }
    }, timerConstant);
    return (): void => {
      clearTimeout(imageUrlTimer);
    };
  }, [urlState]);

  return (
    <div className="artist-portrait flex column around" key={name}>
      <div className="artist-photo-container">
        <AnimatePresence>
          {" "}
          <motion.img
            key={`url-${urls[urlState]}`}
            initial={{ clipPath: `inset(0 0 100% 0)` }}
            animate={{ clipPath: `inset(0 0 0 0)` }}
            exit={{ clipPath: `inset(0 0 0 0)`, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={urls[urlState]}
            className="artist-photo full-dims"
          />
        </AnimatePresence>
      </div>
      <div className="artist-name-wrapper">
        <a className="inter artist-name" href={href} target="_blank">
          {name.toUpperCase()}
        </a>
      </div>
    </div>
  );
}

interface ArtistsProps {
  isDoubles: boolean
}

export default function Artists(props: ArtistsProps): React.ReactElement {
  // Destructuring Props
  const {isDoubles} : {isDoubles: boolean} = props;

  // Portrait generation logic
  const numberOfArtists: number = Object.values(artistData).length;
  const lengthyArray: number[] = Array.from(
    { length: numberOfArtists },
    (_: undefined, index: number): number => {
      return index;
    }
  );
  const generatedPortraits: React.ReactElement[] = lengthyArray.map(
    (_: number, index: number): React.ReactElement => {
      const artistDatum: ArtistDatum = artistData[index];
      const even: boolean = index % 2 === 1;
      return (
        <ArtistPortrait
          key={`AP-${index}`}
          urls={artistDatum.urls}
          name={artistDatum.artistName}
          href={artistDatum.link ? artistDatum.link : ""}
          even={even}
        />
      );
    }
  );

  // Portrait organisation logic

  const generateOrganisedPortraits = (
    generatedPortraits: React.ReactElement[]
  ): JSX.Element[] => {
    if (!isDoubles) {
      return generatedPortraits.map(
        (portrait: React.ReactElement, index: number): JSX.Element => {
          return (
            <div key={`portrait-${index}`} className="single-portrait">
              {portrait}
            </div>
          );
        }
      );
    } else {
      const chunkArray = (array: any[], chunkSize: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          result.push(chunk);
        }
        return result;
      };
      const chunkedPortraits: React.ReactElement[][] = chunkArray(
        generatedPortraits,
        2
      );
      const wrappedDoubles: JSX.Element[] = chunkedPortraits.map(
        (double: React.ReactElement[], index: number): JSX.Element => {
          if (index % 2 !== 0) {
            double = double.slice().reverse();
          }
          return (
            <div key={`double-${index}`} className="double-portrait flex row around">
              {double}
            </div>
          );
        }
      );
      return wrappedDoubles;
    }
  };

  return (
    <div id="artist-content-container" className="full-dims flex column center">
      {generateOrganisedPortraits(generatedPortraits)}
    </div>
  );
}
