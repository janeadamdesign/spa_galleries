//package imports
import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";

// local imports
import { artistData, ArtistDatum } from "@/data/dataAndTypes";

interface ArtistPortraitProps {
  urls: string[];
  name: string;
  href: string;
  even: boolean;
  imagesPreload: HTMLImageElement[];
}

function ArtistPortrait(props: ArtistPortraitProps): React.ReactElement {
  // Destructure props
  const {
    urls,
    name,
    href,
    even,
    imagesPreload,
  }: {
    urls: string[];
    name: string;
    href: string;
    even: boolean;
    imagesPreload: HTMLImageElement[];
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

  const [currentStoredImage, setCurrentStoredImage]: [
    HTMLImageElement | null,
    React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
  ] = useState<HTMLImageElement | null>(null);
  useEffect((): void => {
    const storedLogo: HTMLImageElement | undefined = imagesPreload.find(
      (image: HTMLImageElement): boolean => {
        return image.src.endsWith(urls[urlState]);
      }
    );
    if (storedLogo) {
      setCurrentStoredImage(storedLogo);
    } else alert("Could not find image");
  }, [imagesPreload, currentStoredImage, urlState]);


  return (
    <div className="artist-portrait flex column around" key={name}>
      <div className="artist-photo-container">
        <SwitchTransition >
          <CSSTransition
            key={urls[urlState]}
            timeout={250}
            classNames="fade-simple"
            in={false}
          
          >
            <React.Fragment key={urls[urlState]}>
              {currentStoredImage && (
                <img
                  src={currentStoredImage.src}
                  className="artist-photo full-dims"
                />
              )}
            </React.Fragment>
          </CSSTransition>
        </SwitchTransition>
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
  imagesPreload: HTMLImageElement[];
}

export default function Artists(props: ArtistsProps): React.ReactElement {
  // Destructuring props
  const { imagesPreload }: { imagesPreload: HTMLImageElement[] } = props;

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
          key={index}
          urls={artistDatum.urls}
          name={artistDatum.artistName}
          href={artistDatum.link ? artistDatum.link : ""}
          even={even}
          imagesPreload={imagesPreload}
        />
      );
    }
  );

  // Portrait organisation logic
  const [isDoubles, setIsDoubles]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  useEffect((): (() => void) => {
    const checkWidth = (): void => {
      const width: number = window.innerWidth;
      if (width > 900) {
        setIsDoubles(true);
      } else setIsDoubles(false);
    };
    checkWidth();

    window.addEventListener("resize", checkWidth);

    return (): void => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const generateOrganisedPortraits = (
    generatedPortraits: React.ReactElement[]
  ): JSX.Element[] => {
    if (!isDoubles) {
      return generatedPortraits.map(
        (portrait: React.ReactElement, index: number): JSX.Element => {
          return (
            <div key={index} className="single-portrait">
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
            <div key={index} className="double-portrait flex row around">
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
