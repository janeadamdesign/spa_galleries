// Package imports
import React, { useState, useEffect } from "react";

// Local imports
import {
  eventImageUrls,
  eventData,
  EventDataContent,
} from "@/data/dataAndTypes";

import ModularContentBlock from "@/components/ModularContentBlock";



export default function Artists(): React.ReactElement {


  // Generation main
  const generateContentModules = (
    eventImageUrls: string[][]
  ): JSX.Element[] => {
    return eventImageUrls.map(
      (imageUrlArray: string[], index: number): JSX.Element => {
        const isOdd = (num: number): boolean => {
          return num % 2 !== 0;
        };

        return (
          <ModularContentBlock
            isOdd={isOdd(index)}
            isHome={false}
            imageUrlArray={imageUrlArray}
            rightHandContent={generateTextContent(index)}
          />
        );
      }
    );
  };

  // Generate right side
  const generateTextContent = (index: number): JSX.Element => {
    const generateDate = (values: [number, number]): string => {
      const days: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months: string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const desiredDayNumerical: number = values[0];
      const desiredDayString: string = days[desiredDayNumerical];
      const weeksAdjuster: number = values[1] * 7;
      const currentDate: Date = new Date();
      const currentDay = currentDate.getDay();

      let daysToNext: number = desiredDayNumerical - currentDay;
      if (daysToNext < 0) {
        daysToNext += 7;
      }
      daysToNext += weeksAdjuster;
      const resultantDate: Date = new Date(
        currentDate.setDate(currentDate.getDate() + daysToNext)
      );
      const calendarDay: number = resultantDate.getDate();
      const calendarMonth: number = resultantDate.getMonth();

      const stringMonth: string = months[calendarMonth];
      const calendarYear: number = resultantDate.getFullYear();
      return `${desiredDayString} ${calendarDay} ${stringMonth}, ${calendarYear}`;
    };
    const event: EventDataContent = eventData[index];
    const title: string = event.title;
    const description: string[] = Object.values(event.description);
    const dateString: string = generateDate(event.dateVector);
    const generateBody = (): JSX.Element[] => {
      return description.map(
        (paragraph: string, index: number): JSX.Element => {
          return (
            <p key={index} className="inter copy">
              {paragraph}
            </p>
          );
        }
      );
    };
    const wrappedBody: JSX.Element = (
      <div className="flex column wrapped">{generateBody()}</div>
    );

    return (
      <div className="flex column home-text-container">
        <p className="copy-title">{title}</p>
        <p className="inter copy date">{dateString}</p>
        {wrappedBody}
      </div>
    );
  };

  //Modular Content State
  const [generatedModules, setGeneratedModules]: [
    JSX.Element[] | null,
    React.Dispatch<React.SetStateAction<JSX.Element[] | null>>
  ] = useState<JSX.Element[] | null>(null);

  useEffect((): void => {
    if (generatedModules) return;
    setGeneratedModules(generateContentModules(eventImageUrls));
  }, [generatedModules, eventImageUrls]);

  return <>{generatedModules}</>;
}
