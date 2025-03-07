// Local imports
import {
  spaGalleriesPantiles,
  pantilesUrls,
  ModularContentBlockProps,
} from "@/data/dataAndTypes";

import HalfModules from "@/components/HalfModules";
import ModularContentBlock from "@/components/ModularContentBlock";

interface HomeContentProps {
  isDoubles: boolean;
}

export default function HomeContent(
  props: HomeContentProps
): React.ReactElement {
  // Destructuring Props
  const { isDoubles }: { isDoubles: boolean } = props;

  // Content generation logic
  const paragraphArray: number[] = [0, 1, 2, 3];
  const injectedPantiles: JSX.Element[] = paragraphArray.map(
    (element: number): JSX.Element => {
      return (
        <p key={element} className="inter copy-home">
          {spaGalleriesPantiles[element]}
        </p>
      );
    }
  );
  const wrappedPantiles: JSX.Element = (
    <div className="flex column wrapped">{injectedPantiles}</div>
  );
  const homeText: JSX.Element = (
    <div className="flex column home-text-container">
      <p className="copy-title">About us</p>
      {wrappedPantiles}
    </div>
  );

  const modularProps: ModularContentBlockProps = {
    isOdd: false,
    imageUrlArray: pantilesUrls,
    rightHandContent: homeText,
  };

  return !isDoubles ? (
    <HalfModules {...modularProps} />
  ) : (
    <ModularContentBlock {...modularProps} />
  );
}
