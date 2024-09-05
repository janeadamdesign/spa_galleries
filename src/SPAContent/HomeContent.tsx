// Local imports
import { spaGalleriesPantiles, pantilesUrls } from "@/data/dataAndTypes";
import ModularContentBlock from "@/components/ModularContentBlock";

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
    <div  className="flex column wrapped">
      {injectedPantiles}
    </div>
  );
  const homeText: JSX.Element = (
    <div className="flex column home-text-container">
      <p className="copy-title">About us</p>
      {wrappedPantiles}
    </div>
  );

  return (
    <ModularContentBlock
      isOdd={false}
      isHome
      imageUrlArray={pantilesUrls}
      rightHandContent={homeText}
    />
  );
}

