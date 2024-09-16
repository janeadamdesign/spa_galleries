// Package imports
import { motion, AnimatePresence, easeInOut, easeOut } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import validator from "validator";

// Local imports
import { ParagraphAnimate } from "@/data/dataAndTypes";

interface FooterProps {
  submission: boolean;
  setSubmission: React.Dispatch<React.SetStateAction<boolean>>;
  isHorizontal: boolean;
}

export default function Footer(props: FooterProps): React.ReactElement {
  // Destructuring props
  const {
    submission,
    setSubmission,
    isHorizontal,
  }: {
    submission: boolean;
    setSubmission: React.Dispatch<React.SetStateAction<boolean>>;
    isHorizontal: boolean;
  } = props;

  // Controlled component
  const [email, setEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value !== email) {
      setEmail(value);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleEmailSubmit();
    }
  };

  // Checking validity
  const [isInvalidCounter, setIsInvalidCounter]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const isValid = (): boolean => {
    return validator.isEmail(email);
  };

  const handleEmailSubmit = (): void => {
    if (!isValid()) {
      setIsInvalidCounter((prev: number): number => prev + 1);
    } else {
      setEmail("");
      setSubmission(true);
    }
  };
  const paragraphAnimate: ParagraphAnimate = {
    initial: { opacity: 1 },
    animate: submission ? { opacity: 0 } : { opacity: 1 },
    transition: { ease: "easeInOut", duration: 0.25, delay: 0.5 },
  };

  // Shake it
  const shakeRef: React.RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);
  useEffect((): void | (() => void) => {
    if (isInvalidCounter === 0 || !shakeRef.current) return;
    shakeRef.current.className = `shake flex column center`;
    const shakeTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (!shakeRef.current) return;
      shakeRef.current.className = "flex column center";
    }, 200);
    return (): void => {
      clearTimeout(shakeTimer);
    };
  }, [isInvalidCounter]);

  // Dialog Logic
  const [dialog, setDialog]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): (() => void) => {
    const dialogTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (submission) {
        setDialog(true);
      } else setDialog(false);
    }, 250);
    return (): void => {
      clearTimeout(dialogTimer);
    };
  }, [submission]);
  useEffect((): (() => void) => {
    const dialogTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (dialog) {
        setDialog(false);
      }
    }, 2000);
    return (): void => {
      clearTimeout(dialogTimer);
    };
  }, [dialog]);

  // Differential logic to disable scroll
  useEffect((): void | (() => void) => {
    const preventScroll = (e: WheelEvent | TouchEvent): void =>
      e.preventDefault();
    if (dialog) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return (): void => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [dialog]);

  return (
    <>
      <div id={submission ? "footer-small" : "footer"}>
        <div id="email-subscription" className="flex column around">
          <motion.p className="inter footer-text" {...paragraphAnimate}>
            REGISTER FOR EMAIL UPDATES
          </motion.p>
          <motion.p className="inter footer-text" {...paragraphAnimate}>
            Be the first to hear about the latest Spa Galleries events and news{" "}
          </motion.p>

          <div
            className="flex column center"
            id="shake-ref-container"
            ref={shakeRef as React.RefObject<HTMLInputElement>}
          >
            <motion.input
              id="email-input"
              initial={{ width: "50%", transform: "translateY(0%)" }}
              animate={
                submission
                  ? {
                      width: "0",
                      transform: "translateY(-75%)",
                    }
                  : {
                      width: "50%",
                      transform: "translateY(0%",
                    }
              }
              transition={{
                width: {
                  type: "spring",
                  stiffness: 400,
                  damping: 50,
                },
                transform: {
                  ease: easeInOut,
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              placeholder={submission ? "" : "type your email"}
              className="footer-text inter"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            id={submission ? "subscribed-button" : "subscribe-button"}
            className="flex column center"
            onClick={handleEmailSubmit}
          >
            <p className="footer-text inter">
              {submission ? "Subscribed" : "Subscribe"}
            </p>
          </button>
        </div>
        <div id="copyright" className="flex row center inter footer-text">
          {" "}
          <p>© 2024 THE SPA GALLERIES</p>
        </div>
      </div>
      <AnimatePresence>
        {dialog && (
          <motion.div
            key="screen"
            id="screen"
            className="full-dims"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.25, ease: easeInOut },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0, ease: "linear" },
            }}
          >
            <div id="screen-dim" />
            <motion.div
              id="compulsory-dialog"
              className={`flex column around ${
                isHorizontal ? "cd-horizontal" : "cd-vertical"
              }`}
              initial={{ maxHeight: "0%" }}
              animate={{ maxHeight: "100%" }}
              transition={{
                ease: easeOut,
                duration: 0.5,
                delay: 0.25,
              }}
            >
              {" "}
              <p className="header-title">Thank you !</p>
              <p className="inter dialog-text">
                Keep an eye on your inbox, we&apos;ll be in touch soon
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
