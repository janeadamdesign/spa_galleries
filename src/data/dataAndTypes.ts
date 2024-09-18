// Types
export interface ArtistData {
  [key: number]: ArtistDatum;
}
export interface ArtistDatum {
  artistName: string;
  link?: string;
  urls: string[];
}
export interface ContactDetails {
  name: string;
  number: string;
  email: string;
  address: string[];
  socials: string[];
}
export interface EventData {
  [key: number]: EventDataContent;
}
export interface EventDataContent {
  title: string;
  italicisedWords?: string;
  dateVector: [number, number];
  description: {
    [key: string]: string;
  };
}
export interface ModularContentBlockProps {
  isOdd: boolean;
  imageUrlArray: string[];
  rightHandContent: JSX.Element;
}
export interface OpeningTimes {
  monSun: string;
  tuesSat: string;
}
export interface ParagraphAnimate {
  initial: { opacity: number };
  animate: { opacity: number };
  transition: { ease: string; duration: number; delay: number };
}
export interface SpaContentAnimation {
  [key: string]: { opacity: number; x: number };
}


// Functions
export const storeImages = (
  srcArray: string[],
  stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
): void => {
  const handleImageLoad = (image: HTMLImageElement): void => {
    stateSetter((prev: HTMLImageElement[]): HTMLImageElement[] => {
      if (
        prev.find(
          (extantImg: HTMLImageElement): boolean => extantImg.src === image.src
        )
      ) {
        return prev;
      } else return [...prev, image];
    });
  };
  srcArray.forEach((src: string): void => {
    const img: HTMLImageElement = new Image();
    img.src = src;
    img.onload = (): void => handleImageLoad(img);
  });
};

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

export const pantilesUrls: string[] = ["/g1.jpeg", "/g3.jpeg", "/g2.jpg"];
export const spaGalleriesPantiles: { [key: number]: string } = {
  0: "Philip Bret-Day at The Spa Galleries is a small general dealer specialising in the buying and selling of inexpensive, easily collectable prints and pictures. He currently represents a number of local contemporary painters.",
  1: "A keen researcher, Philip’s particular area of expertise is Georgian optical views and Deco fashion, but he has a wide knowledge of many pre-1930s works on paper. Additional knowledge of Russian and French art history, as well as military history in general, gives Philip a well-rounded yet paradoxically niche view of the art world.",
  2: "Philip is also a regular contributor to arts appreciation events, delivering talks on Coco Chanel, Casanova in London, and the history of the camera obscura in the development of painting.",
  3: "When space allows, the gallery can sometimes accommodate small exhibitions.",
};

export const civilWarUrls: string[] = [
  "/civil_war/cw1.png",
  "/civil_war/cw2.png",
  "/civil_war/cw3.png",
  "/civil_war/cw4.png",
];
export const historyUrls: string[] = [
  "/history/h1.jpg",
  "/history/h2.jpg",
  "/history/h3.jpeg",
  "/history/h4.jpeg",
];
export const metropolisUrls: string[] = [
  "/metropolis/m1.png",
  "/metropolis/m2.png",
  "/metropolis/m3.png",
  "/metropolis/m4.png",
];
export const nibelungenUrls: string[] = [
  "/nibelungen/n1.jpg",
  "/nibelungen/n2.jpg",
  "/nibelungen/n3.png",
  "/nibelungen/n4.png",
];
export const ponUrls: string[] = [
  "/pon/p1.jpg",
  "/pon/p2.jpg",
  "/pon/p3.jpg",
  "/pon/p4.jpg",
];
export const riefenstahlUrls: string[] = [
  "/riefenstahl/r1.png",
  "/riefenstahl/r2.png",
  "/riefenstahl/r3.jpg",
  "/riefenstahl/r4.jpg",
];
export const eventImageUrls: string[][] = [
  nibelungenUrls,
  ponUrls,
  civilWarUrls,
  historyUrls,
  riefenstahlUrls,
  metropolisUrls,
];

export const eventData: EventData = {
  0: {
    title: "Film Screening: Die Niebelungen (1924)",
    italicisedWords: "Die Niebelungen",
    dateVector: [0, 0],
    description: {
      0: "A monumental silent film epic directed by Fritz Lang, first released in 1924, that adapts the Germanic myth of Siegfried and the epic tale from the Nibelungenlied, blending heroic legend with expressive visual storytelling.",
      1: "Lang’s masterpiece is celebrated for its ambitious scale and the groundbreaking use of special effects, which were innovative for the 1920s, and the film’s visual style showcases the influence of German Expressionism.",
      2: "The narrative of Die Nibelungen delves deeply into themes of loyalty, betrayal, and vengeance. Siegfried’s murder and Kriemhild’s subsequent quest for revenge echo the operatic intensity of Wagnerian drama, to which Lang added a distinct layer of visual symbolism.",
      3: "The film’s legacy can be seen in the works of directors ranging from Cecil B. DeMille to Peter Jackson, particularly in the ways they approach saga storytelling and integrate practical effects with narrative depth.",
    },
  },
  1: {
    title: "Pon de Pantiles",
    italicisedWords: "Pon de Pantiles",
    dateVector: [5, 0],
    description: {
      0: "A vibrant annual street festival held in Tunbridge Wells, celebrating the rich tapestry of carnival culture. Organised by The Spa Galleries, this event transforms the historic Pantiles area into a bustling hub of music, dance, and colourful festivities each summer, drawing locals and tourists alike to experience its lively atmosphere.",
      1: " Attendees can enjoy live music ranging from samba to calypso, spectacular dance displays, and workshops that invite participation from all ages. Art installations and local artisan booths line the streets, offering unique crafts and cultural artefacts.",
      2: "Pon de Pantiles enriches the local community by bringing together diverse groups to celebrate and appreciate global carnival traditions, serving as a platform for cultural exchange by fostering a sense of community and inclusivity.",
      3: " Since its inception, the festival has grown significantly, becoming a key highlight of the summer season.",
    },
  },
  2: {
    title: "Film Screening: Civil War (2024)",
    italicisedWords: "Civil War",
    dateVector: [0, 1],
    description: {
      0: "Set in a future America on the verge of collapse, A24's Civil War follows a team of journalists embedded with the military as they race to Washington, D.C. amid escalating conflicts, capturing their perilous journey through a nation gripped by division and unrest.",
      1: "Visually, the film distinguishes itself with a stark portrayal of a dystopian world that resembles a post-apocalyptic horror film. Directed with a keen eye for tension, the film utilises daylight to enhance the haunting atmosphere, making each scene a grim reflection of a divided society.",
      2: "This stark narrative is punctuated by moments of intense personal and societal reflection, revealing the deep scars of a nation and of individuals grappling with the consequences of their choices. The director, Alex Garland, challenges the audience to consider the realities of war, not through its usual glorification, but by exposing the raw and often unsettling truth of its impact on human lives and society.",
      3: "Civil War features standout performances by Kirsten Dunst, Wagner Moura, and Stephen McKinley Henderson.",
    },
  },

  3: {
    title: "Military History Society Meeting",
    italicisedWords: "The Amelia",
    dateVector: [3, 0],
    description: {
      0: "Hosted by Philip Bret-Day, owner of Spa Galleries, the local military history society in Tunbridge Wells is a dedicated group committed to exploring the extensive military history of the British Isles.",
      1: "This society gathers weekly at Spa Galleries, providing a regular forum for enthusiasts and historians to engage with the past through a shared interest in military events and legacies.",
      2: "Each week, the society offers a range of activities that may include expert-led discussions, documentary viewings, and interactive sessions, often co-hosted by archive staff from The Amelia Library.",
      3: "The society invites anyone interested in military history, providing a welcoming environment for both seasoned historians and new enthusiasts. The consistent weekly meetings help cultivate a strong community bond and a dynamic forum for discussion and discovery.",
    },
  },
  4: {
    title: "Riefenstahl, Cinematography, and Genocide",
    dateVector: [4, 1],
    description: {
      0: "Join us for an enlightening lecture by Philip Bret-Day, delving into the complex legacy of Leni Riefenstahl, a filmmaker whose work during the Nazi era has sparked intense debate and scrutiny, prompted by new revelations suggesting Riefenstahl was not only a witness to Nazi atrocities but an active participant in them.",
      1: "Damning new evidence from her estate reveals her continued admiration for Nazi ideology until her death in 2003, exposing her presence at a massacre of Polish Jews in 1939, challenging her previous denials and suggesting her directions during filming may have inspired the violence.",
      2: "The talk will cover her role as a propagandist who used her cinematographic skills to craft compelling yet deeply problematic propaganda for the Nazis, juxtaposing her acclaimed visuals against the grim realities they endorsed.",
      3: "By examining Riefenstahl's legacy, the talk will also touch on broader themes of memory, guilt, and the portrayal of history through film, inviting attendees to reflect on how history is remembered and on the figures we choose to celebrate.",
    },
  },
  5: {
    title: "Film Screening: Metropolis (1927)",
    italicisedWords: "Metropolis",
    dateVector: [0, 2],
    description: {
      0: "Set in a futuristic urban dystopia, Fritz Lang's Metropolis is a pioneering science fiction film that explores the sharp social divisions between workers and the city's elite. The film's narrative revolves around Freder, the wealthy son of the city’s mastermind, who becomes disillusioned with the societal inequality and champions the cause of the oppressed workers after falling in love with Maria, a prophetic figure among the laborers.",
      1: "Metropolis is known for its groundbreaking special effects and set design that vividly capture the mechanised cityscape. Its towering skyscrapers and complex machinery served as early blueprints for cinematic depictions of futuristic cities.",
      2: "Lang's narrative in Metropolis is rich with themes of class struggle, love, and redemption, interwoven with religious and mythological references that enhance its philosophical depth.",
      3: "The film challenges viewers with its depiction of technology and industrialisation impacting human relations and social order, posing enduring questions about progress and humanity.",
    },
  },
};

export const artistData: ArtistData = {
  0: {
    artistName: "Julian Gordon-Mitchell",
    link: "https://juliangordonmitchell.com/",
    urls: [
      "/artists/julian_gordon/jg1.jpg",
      "/artists/julian_gordon/jg2.jpg",
      "/artists/julian_gordon/jg3.jpg",
    ],
  },
  1: {
    artistName: "Penny Goring",
    link: "https://arcadiamissa.com/penny-goring/",
    urls: [
      "/artists/penny_goring/pg1.jpg",
      "/artists/penny_goring/pg2.jpg",
      "/artists/penny_goring/pg3.jpg",
    ],
  },
  3: {
    artistName: "David Tibet",
    link: "https://www.davidtibet.com/",
    urls: [
      "/artists/david_tibet/dt1.jpg",
      "/artists/david_tibet/dt2.jpg",
      "/artists/david_tibet/dt3.jpg",
    ],
  },
  2: {
    artistName: "Maja Čule",
    link: "https://arcadiamissa.com/maja-cule/",
    urls: [
      "/artists/maja_cule/mc1.jpg",
      "/artists/maja_cule/mc2.jpg",
      "/artists/maja_cule/mc3.jpg",
    ],
  },
  4: {
    artistName: "Frances Featherstone",
    link: "https://www.francesfeatherstone.co.uk/",
    urls: [
      "/artists/frances_featherstone/ff1.jpg",
      "/artists/frances_featherstone/ff2.jpeg",
      "/artists/frances_featherstone/ff3.jpeg",
    ],
  },

  5: {
    artistName: "Helen Sinclair",
    link: "https://www.helensinclair.co.uk/",
    urls: [
      "/artists/helen_sinclair/hs1.jpeg",
      "/artists/helen_sinclair/hs2.jpeg",
      "/artists/helen_sinclair/hs3.png",
    ],
  },
  7: {
    artistName: "Martin Wells",
    link: "https://www.mwportraits.com/",
    urls: [
      "/artists/martin_wells/mw1.jpg",
      "/artists/martin_wells/mw2.jpg",
      "/artists/martin_wells/mw3.jpg",
    ],
  },
  6: {
    artistName: "Ben Stone",
    link: "https://westernexhibitions.com/artist/ben-stone/",
    urls: ["/artists/ben_stone/bs1.jpg", "/artists/ben_stone/bs2.jpg"],
  },
};

export const artistUrlsCombined: string[][] = Object.values(artistData).map(
  (artistDatum: ArtistDatum): string[] => {
    return artistDatum.urls;
  }
);
