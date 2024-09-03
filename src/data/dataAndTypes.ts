// Types

export interface ContactDetails {
  name: string;
  number: string;
  email: string;
  address: string[];
  socials: string[];
}

export interface OpeningTimes {
  monSun: string;
  tuesSat: string;
}

export interface ParagraphAnimate {
  initial: {opacity: number},
  animate: {opacity: number},
  transition: {ease: string, duration: number, delay: number}
}

export interface SpaContentAnimation {
  [key: string]: {opacity: number, x: number},

}

// Data

export const contactDetails: ContactDetails = {
  name: "Philip Bret-Day",
  number: "01892 542 647",
  email: "pbretday@hotmail.co.uk",
  address: ["24, The Pantiles", "Royal Tunbridge Wells", "KENT", "TN2 5TN"],
  socials: [],
};
export const openingTimes: OpeningTimes = {
  monSun: "Closed",
  tuesSat: "10:30 - 17:30",
};


export const spaGalleriesPantiles: {[key: number]: string} = {
    0: "Philip Bret-Day at The Spa Galleries is a small general dealer specialising in the buying and selling of inexpensive, easily collectable prints and pictures. He currently represents a number of local contemporary painters.",
    1: "A keen researcher, Philip’s particular area of expertise is Georgian optical views and Deco fashion, but he has a wide knowledge of many pre-1930s works on paper. Additional knowledge of Russian and French art history (as well military history in general) gives Philip a well-rounded yet paradoxically niche view on the art world.",
    2: "Philip is also a regular contributor to arts appreciation events, delivering talks on Coco Chanel, Casanova in London and the History of the camera obscura in the development of painting.",
    3: "When space allows the gallery can sometimes accommodate small exhibitions.",
}

export const pantilesUrls: string[] = ["/g1.jpeg", "/g3.jpeg", "/g2.jpeg"]