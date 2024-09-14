// Package Imports
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

// Local Imports

import {
  ContactDetails,
  OpeningTimes,
  contactDetails,
  openingTimes,
} from "@/data/dataAndTypes";

interface SideContentProps {
  sideContentState: number;
  setSideContentState: React.Dispatch<React.SetStateAction<number>>;
}

export default function SideContent(
  props: SideContentProps
): React.ReactElement {
  // Destructuring props
  const {
    sideContentState,
    setSideContentState,
  }: {
    sideContentState: number;
    setSideContentState: React.Dispatch<React.SetStateAction<number>>;
  } = props;
  const [animateValue, setAnimateValue]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(100);

  // Injection Argument
  const [paneInjectionArgument, setPaneInjectionArgument]: [
    ContactDetails | OpeningTimes | null,
    React.Dispatch<React.SetStateAction<ContactDetails | OpeningTimes | null>>
  ] = useState<ContactDetails | OpeningTimes | null>(null);

  // Pane animation logic
  const initial: { transform: string } = {
    transform: `translateX(100%)`,
  };
  const animate: { transform: string } = {
    transform: `translateX(${animateValue}%)`,
  };
  const openingTransition: { [key: string]: number | string } = {
    type: "spring",
    stiffness: 300,
    damping: 15,
    mass: 1,
  };
  const closingTransition: { [key: string]: number | string } = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  };

  useEffect((): void => {
    if (sideContentState === 0) {
      setAnimateValue(100);
    } else setAnimateValue(50);
    switch (sideContentState) {
      case 0:
        setPaneInjectionArgument(null);
        break;
      case 1:
        setPaneInjectionArgument(contactDetails);
        break;
      case 2:
        setPaneInjectionArgument(openingTimes);
        break;
    }
  }, [sideContentState]);

  // Injected Pane Data
  const injectPaneData = (
    data: ContactDetails | OpeningTimes | null
  ): JSX.Element => {
    if (data === null) return <></>;
    let fields: JSX.Element[] = [];
    if (JSON.stringify(data) === JSON.stringify(openingTimes)) {
      const typedData: OpeningTimes = data as OpeningTimes;
      const tuesSatArray: string[] = ["Tues", "Weds", "Thurs", "Fri", "Sat"];
      const tuesSatFields: JSX.Element[] = tuesSatArray.map(
        (day: string): JSX.Element => {
          return (
            <p key={day} className="fields-content inter  flex row between">
              <span style={{ marginRight: `1em`, fontWeight: 400 }}>{day}</span>
              <span style={{ marginLeft: `1em` }}>{typedData.tuesSat}</span>
            </p>
          );
        }
      );
      fields.push(
        <p key="mon" className="fields-content inter flex row between">
          <span style={{ fontWeight: 400 }}>Mon</span>
          <span className="italic">{typedData.monSun}</span>
        </p>
      );
      tuesSatFields.forEach((field: JSX.Element): void => {
        fields.push(field);
      });
      fields.push(
        <p key="sun" className="fields-content inter  flex row between">
          <span style={{ fontWeight: 400 }}>Sun</span>
          <span className="italic">{typedData.monSun}</span>
        </p>
      );
    } else {
      const typedData: ContactDetails = data as ContactDetails;
      const simpleFields: string[] = [
        typedData.name,
        typedData.number,
        typedData.email,
      ];
      simpleFields.forEach((datum: string): void => {
        let fieldClass: string = "";
        if (datum === typedData.email) {
          fieldClass = "fields-content inter email";
          fields.push(
            <a key="email" href={`mailto:${datum}`} className={fieldClass}>
              {datum}
            </a>
          );
          return;
        } else if (datum === typedData.name) {
          fieldClass = "fields-content inter italic";
        } else fieldClass = "fields-content inter";

        fields.push(
          <p
            key={datum}
            className={fieldClass}
            style={{ fontWeight: datum === typedData.number ? 400 : "default" }}
          >
            {datum}
          </p>
        );
      });
      const complexFields: JSX.Element[][] = [
        typedData.address.map((addressField: string): JSX.Element => {
          return (
            <span key={addressField} className="address-span">
              {addressField}
            </span>
          );
        }),
      ];
      fields.push(
        <p key="address-thing" className="flex column fields-content inter">
          {complexFields[0]}
        </p>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5, delay: 0.25 }}
        className="fields-container"
      >
        <div className="fields-container"> {fields}</div>
      </motion.div>
    );
  };

  // Circle Logic
  // Circle Refs
  const sidebarRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const circle1Ref: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const circle2Ref: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const blackCircle1Ref: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const blackCircle2Ref: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  // Circle States
  const [circleLeft, setCircleLeft]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [circleTop, setCircleTop]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [circleLeft2, setCircleLeft2]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [circleTop2, setCircleTop2]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [blackCircleLeft, setBlackCircleLeft]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [blackCircleTop, setBlackCircleTop]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [blackCircleLeft2, setBlackCircleLeft2]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [blackCircleTop2, setBlackCircleTop2]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  // Circle UE for iteration
  useEffect((): void | (() => void) => {
    if (
      !sidebarRef.current ||
      !circle1Ref.current ||
      !circle2Ref.current ||
      !blackCircle1Ref.current ||
      !blackCircle2Ref.current
    )
      return;
    const headerHeight: number = 0;
    const sidebarWidth: number = sidebarRef.current.clientWidth;
    const sidebarHeight: number =
      sidebarRef.current.clientHeight - headerHeight;
    const circleDiameter: number = circle1Ref.current.clientWidth;
    const circle2Diameter: number = circle2Ref.current.clientWidth;
    const blackCircleDiameter: number = blackCircle1Ref.current.clientWidth;
    const blackCircle2Diameter: number = blackCircle2Ref.current.clientWidth;
    const circleTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setCircleLeft(Math.random() * (sidebarWidth / 2 - circleDiameter));
      setCircleTop(
        Math.random() * (sidebarHeight - circleDiameter) + headerHeight
      );
      setCircleLeft2(Math.random() * (sidebarWidth / 2 - circle2Diameter));
      setCircleTop2(
        Math.random() * (sidebarHeight - circle2Diameter) + headerHeight
      );
      setBlackCircleLeft(
        Math.random() * (sidebarWidth / 2 - blackCircleDiameter)
      );
      setBlackCircleTop(
        Math.random() * (sidebarHeight - blackCircleDiameter) + headerHeight
      );
      setBlackCircleLeft2(
        Math.random() * (sidebarWidth / 2 - blackCircle2Diameter)
      );
      setBlackCircleTop2(
        Math.random() * (sidebarHeight - blackCircle2Diameter) + headerHeight
      );
    }, 2000);

    return (): void => {
      clearTimeout(circleTimer);
    };
  }, [circleLeft, circleTop, circleLeft2, circleTop2]);
  // Animation values for Framer Motion
  const circleTransition = { type: "spring", stiffness: 1000, damping: 200 };

  // Close UI Logic
  const [crossHovered, setCrossHovered]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={
        sideContentState === 0
          ? { ...closingTransition }
          : { ...openingTransition }
      }
      id="side-pane"
    >
      <div
        id="circle-container"
        ref={sidebarRef as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          ref={circle1Ref as React.RefObject<HTMLDivElement>}
          className="moving-circle"
          id="circle-1"
          initial={{ top: 0, left: 0 }}
          animate={{ top: circleTop, left: circleLeft }}
          transition={circleTransition}
        />
        <motion.div
          ref={circle2Ref as React.RefObject<HTMLDivElement>}
          className="moving-circle"
          id="circle-2"
          initial={{ top: 0, left: 0 }}
          animate={{ top: circleTop2, left: circleLeft2 }}
          transition={circleTransition}
        />
        <motion.div
          ref={blackCircle1Ref as React.RefObject<HTMLDivElement>}
          className="black-circle"
          id="black-circle-1"
          initial={{ top: 0, left: 0 }}
          animate={{ top: blackCircleTop, left: blackCircleLeft }}
          transition={circleTransition}
        />
        <motion.div
          ref={blackCircle2Ref as React.RefObject<HTMLDivElement>}
          className="black-circle"
          id="black-circle-2"
          initial={{ top: 0, left: 0 }}
          animate={{ top: blackCircleTop2, left: blackCircleLeft2 }}
          transition={circleTransition}
        />
      </div>
      <div id="injected-pane" className="full-dims">
        <div id="ui-cross-container">
          <div id="ui-relative-layer" className="full-dims flex column center">
            <motion.img
              id="ui-cross"
              src="/ui_close_black.png"
              className="full-dims"
              onMouseOver={(): void => {
                setCrossHovered(true);
              }}
              onMouseLeave={(): void => {
                setCrossHovered(false);
              }}
              initial={{ transform: `scale(0.9)` }}
              animate={{ transform: `scale(${crossHovered ? 1 : 0.9})` }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 15,
                mass: 2,
              }}
              onClick={(): void => {
                setSideContentState(0);
              }}
            />
          </div>
        </div>
        <div id="fifty-container" className="flex column">
          {injectPaneData(paneInjectionArgument)}
        </div>
      </div>
    </motion.div>
  );
}
