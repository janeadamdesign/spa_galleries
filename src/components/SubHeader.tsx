interface SideHeaderProps {
  pageState: number;
  setPageState: React.Dispatch<React.SetStateAction<number>>;
}

export default function SideHeader(props: SideHeaderProps): React.ReactElement {
  // Destructuring props
  const {
    pageState,
    setPageState,
  }: {
    pageState: number;
    setPageState: React.Dispatch<React.SetStateAction<number>>;
  } = props;

  // Motion links
  const motionLinks: string[] = ["Home", "Artists", "What's On"];
  const injectedMotionLinks: JSX.Element[] = motionLinks.map(
    (text: string, index: number): JSX.Element => {
      const stateConst: number = index;
      const classNameContent: string = `inter ${
        stateConst === pageState ? "motion-link-selected" : "motion-link"
      }`;

      return (
        <p
          key={text}
          className={classNameContent}
          onClick={(): void => {
            setPageState(stateConst);
          }}
        >
          {text}
        </p>
      );
    }
  );

  return (
    <div id="subheader" className="flex row">
      <div id="motion-link-container" className="flex row full-dims between">
        {injectedMotionLinks}
      </div>
    </div>
  );
}
