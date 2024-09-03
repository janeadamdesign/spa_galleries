// Package Imports
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Local Imports
import SideContent from "./SideContent";

export default function Header(): React.ReactElement {
  // Navlink Function
  const [sideContentState, setSideContentState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  // Navlink content
  const navlinks: string[] = ["Get in Touch", "Opening Times"];
  const injectNavlinks = (navlinkTextArray: string[]) => {
    const navJSXArray: JSX.Element[] = navlinkTextArray.map(
      (navlinkText: string): JSX.Element => {
        let number: number = 0;
        switch (navlinkText.split(" ")[0]) {
          case "Get":
            number = 1;
            break;
          case "Opening":
            number = 2;
            break;
        }
        const classname: string =
          sideContentState === number ? "navlink inter green" : "navlink inter";

        return (
          <a
            key={navlinkText}
            className={classname}
            onClick={handleNavlinkClick}
            id={navlinkText.split(" ")[0]}
          >
            {navlinkText}
          </a>
        );
      }
    );
    return (
      <nav id="spa-nav" className="flex row">
        {navJSXArray}
      </nav>
    );
  };
  const handleNavlinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
    const id: string = target.id;
    switch (id) {
      case "Get":
        setSideContentState(1);
        break;
      case "Opening":
        setSideContentState(2);
        break;
    }
  };

  // Event Listener to Deselect
  useEffect((): (() => void) => {
    const deselect = (e: MouseEvent): void => {
      const target: HTMLElement = e.target as HTMLElement;
      const id: string = target.id;
      const isClickInsideSidePane = target.closest("#side-pane") !== null;
      if (id !== "get" && id !== "opening" && !isClickInsideSidePane) {
        setSideContentState(0);
      }
    };
    window.addEventListener("mousedown", deselect);
    return (): void => {
      window.removeEventListener("mousedown", deselect);
    };
  }, []);

  // Logo rotation
  const [logoRotateActive, setLogoRotateActive]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  const [logoRotate, setLogoRotate]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): void | (() => void) => {
    if (!logoRotateActive) return;
    const rotateTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setLogoRotate((prev: boolean): boolean => !prev);
    }, 5000);
    return (): void => {
      clearTimeout(rotateTimer);
    };
  }, [logoRotate, logoRotateActive]);

  return (
    <>
      <div
        id="spa-header"
        className="flex row full-dims"
        onMouseEnter={(): void => {
          setLogoRotateActive(false);
        }}
        onMouseLeave={(): void => {
          setLogoRotateActive(true);
        }}
      >
        <p className="header-title">The Spa Galleries</p>
        {injectNavlinks(navlinks)}
      </div>
      <div id="logo-header-overlay" className="full-dims flex row center">
        <div
          id="logo-container"
          className={logoRotate ? "rotate-logo" : "unrotate-logo"}
        >
          {" "}
          <Image src="/pantiles.png" alt="spa-logo" fill sizes="100%" />
        </div>
      </div>

      <SideContent state={sideContentState} />
    </>
  );
}
