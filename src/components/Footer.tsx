// Package imports
import React, { useState, useEffect, useRef } from "react";
import validator from "validator";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

// Local imports
import { ParagraphAnimate } from "@/data/dataAndTypes";

export default function Footer(): React.ReactElement {
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
  const [submission, setSubmission]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
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
    shakeRef.current.className = `footer-text inter shake`;
    const shakeTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (!shakeRef.current) return;
      shakeRef.current.className = "footer-text inter";
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

  return (
    <div id={submission ? "footer-small" : "footer"}>
      <motion.div id="email-subscription" className="flex column around">
        <motion.p className="inter footer-text" {...paragraphAnimate}>
          REGISTER FOR EMAIL UPDATES
        </motion.p>
        <motion.p className="inter footer-text" {...paragraphAnimate}>
          Be the first to hear about the latest Spa Galleries events and news{" "}
        </motion.p>

        <motion.input
          ref={shakeRef as React.RefObject<HTMLInputElement>}
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
        <button
          id={submission ? "subscribed-button" : "subscribe-button"}
          className="flex column center"
          onClick={handleEmailSubmit}
        >
          <p className="footer-text inter">
            {submission ? "Subscribed" : "Subscribe"}
          </p>
        </button>
      </motion.div>
      <div id="copyright" className="flex row center inter footer-text">
        {" "}
        <p>© 2024 THE SPA GALLERIES</p>
      </div>
      <AnimatePresence>
        {dialog && (
          <motion.div
            key="screen"
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
            <div id="compulsory-dialog" className="flex column around">
              {" "}
              <p className="header-title">Thank you !</p>
              <p className="inter dialog-text">
                Keep an eye on your inbox, we'll be in touch soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
