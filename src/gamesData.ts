import { Game, GameRate, FAQItem, ChartEntry } from './types';

export const ALL_GAMES: Game[] = [
  // MORNING GAMES
  {
    id: "kranti-morning",
    name: "KRANTI MORNING",
    openTime: "10:30 AM",
    closeTime: "11:30 AM",
    openPana: "237",
    jodiDigit1: "2",
    jodiDigit2: "8",
    closePana: "350",
    status: "closed",
    category: "morning"
  },
  {
    id: "sita-morning",
    name: "SITA MORNING",
    openTime: "10:45 AM",
    closeTime: "11:45 AM",
    openPana: "135",
    jodiDigit1: "9",
    jodiDigit2: "1",
    closePana: "290",
    status: "closed",
    category: "morning"
  },
  {
    id: "sridevi-morning",
    name: "SRIDEVI MORNING",
    openTime: "09:30 AM",
    closeTime: "10:30 AM",
    openPana: "148",
    jodiDigit1: "3",
    jodiDigit2: "4",
    closePana: "347",
    status: "closed",
    category: "morning"
  },
  {
    id: "karnataka-day",
    name: "KARNATAKA DAY",
    openTime: "10:00 AM",
    closeTime: "11:00 AM",
    openPana: "159",
    jodiDigit1: "5",
    jodiDigit2: "3",
    closePana: "157",
    status: "closed",
    category: "morning"
  },
  {
    id: "rudraksh-morning",
    name: "RUDRAKSH MORNING",
    openTime: "11:00 AM",
    closeTime: "12:00 PM",
    openPana: "379",
    jodiDigit1: "9",
    jodiDigit2: "7",
    closePana: "340",
    status: "closed",
    category: "morning"
  },
  {
    id: "kalyani-morning",
    name: "KALYANI MORNING",
    openTime: "11:15 AM",
    closeTime: "12:15 PM",
    openPana: "120",
    jodiDigit1: "3",
    jodiDigit2: "0",
    closePana: "190",
    status: "closed",
    category: "morning"
  },
  {
    id: "milan-morning",
    name: "MILAN MORNING",
    openTime: "10:15 AM",
    closeTime: "11:15 AM",
    openPana: "479",
    jodiDigit1: "0",
    jodiDigit2: "5",
    closePana: "168",
    status: "closed",
    category: "morning"
  },
  {
    id: "andhra-morning",
    name: "ANDHRA MORNING",
    openTime: "11:30 AM",
    closeTime: "12:30 PM",
    openPana: "125",
    jodiDigit1: "8",
    jodiDigit2: "4",
    closePana: "167",
    status: "closed",
    category: "morning"
  },
  {
    id: "kalyan-morning",
    name: "KALYAN MORNING",
    openTime: "11:00 AM",
    closeTime: "12:02 PM",
    openPana: "100",
    jodiDigit1: "1",
    jodiDigit2: "2",
    closePana: "390",
    status: "closed",
    category: "morning"
  },
  {
    id: "main-bazar-morning",
    name: "MAIN BAZAR MORNING",
    openTime: "11:45 AM",
    closeTime: "12:45 PM",
    openPana: "359",
    jodiDigit1: "7",
    jodiDigit2: "3",
    closePana: "238",
    status: "closed",
    category: "morning"
  },
  {
    id: "time-bazar-morning",
    name: "TIME BAZAR MORNING",
    openTime: "09:05 AM",
    closeTime: "10:05 AM",
    openPana: "130",
    jodiDigit1: "4",
    jodiDigit2: "9",
    closePana: "568",
    status: "closed",
    category: "morning"
  },
  {
    id: "nandini-morning",
    name: "NANDINI MORNING",
    openTime: "11:00 AM",
    closeTime: "12:00 PM",
    openPana: "249",
    jodiDigit1: "5",
    jodiDigit2: "6",
    closePana: "240",
    status: "closed",
    category: "morning"
  },
  {
    id: "madhur-morning",
    name: "MADHUR MORNING",
    openTime: "11:30 AM",
    closeTime: "12:30 PM",
    openPana: "139",
    jodiDigit1: "3",
    jodiDigit2: "2",
    closePana: "138",
    status: "closed",
    category: "morning"
  },
  {
    id: "sridevi",
    name: "SRIDEVI",
    openTime: "11:35 AM",
    closeTime: "12:35 PM",
    openPana: "250",
    jodiDigit1: "7",
    jodiDigit2: "7",
    closePana: "449",
    status: "closed",
    category: "morning"
  },
  {
    id: "time-bazar",
    name: "TIME BAZAR",
    openTime: "01:00 PM",
    closeTime: "02:00 PM",
    openPana: "145",
    jodiDigit1: "0",
    jodiDigit2: "9",
    closePana: "270",
    status: "closed",
    category: "morning"
  },
  {
    id: "madhur-day",
    name: "MADHUR DAY",
    openTime: "01:30 PM",
    closeTime: "02:30 PM",
    openPana: "340",
    jodiDigit1: "7",
    jodiDigit2: "1",
    closePana: "146",
    status: "closed",
    category: "morning"
  },

  // DAY GAMES
  {
    id: "sita-day",
    name: "SITA DAY",
    openTime: "01:45 PM",
    closeTime: "02:45 PM",
    openPana: "260",
    jodiDigit1: "8",
    jodiDigit2: "2",
    closePana: "129",
    status: "closed",
    category: "day"
  },
  {
    id: "rudraksh-day",
    name: "RUDRAKSH DAY",
    openTime: "02:00 PM",
    closeTime: "03:00 PM",
    openPana: "480",
    jodiDigit1: "2",
    jodiDigit2: "6",
    closePana: "358",
    status: "closed",
    category: "day"
  },
  {
    id: "nandini-day",
    name: "NANDINI DAY",
    openTime: "02:15 PM",
    closeTime: "03:15 PM",
    openPana: "168",
    jodiDigit1: "5",
    jodiDigit2: "4",
    closePana: "248",
    status: "closed",
    category: "day"
  },
  {
    id: "milan-day",
    name: "MILAN DAY",
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    openPana: "235",
    jodiDigit1: "0",
    jodiDigit2: "8",
    closePana: "125",
    status: "active",
    category: "day"
  },
  {
    id: "rajdhani-day",
    name: "RAJDHANI DAY",
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    openPana: "349",
    jodiDigit1: "6",
    jodiDigit2: "2",
    closePana: "390",
    status: "active",
    category: "day"
  },
  {
    id: "kranti-day",
    name: "KRANTI DAY",
    openTime: "03:15 PM",
    closeTime: "04:15 PM",
    openPana: "148",
    jodiDigit1: "3",
    jodiDigit2: "9",
    closePana: "450",
    status: "closed",
    category: "day"
  },
  {
    id: "andhra-day",
    name: "ANDHRA DAY",
    openTime: "03:30 PM",
    closeTime: "04:30 PM",
    openPana: "129",
    jodiDigit1: "2",
    jodiDigit2: "0",
    closePana: "280",
    status: "closed",
    category: "day"
  },
  {
    id: "supreme-day",
    name: "SUPREME DAY",
    openTime: "03:35 PM",
    closeTime: "05:35 PM",
    openPana: "360",
    jodiDigit1: "9",
    jodiDigit2: "1",
    closePana: "470",
    status: "active",
    category: "day"
  },
  {
    id: "kalyan",
    name: "KALYAN",
    openTime: "03:55 PM",
    closeTime: "05:55 PM",
    openPana: "478",
    jodiDigit1: "9",
    jodiDigit2: "2",
    closePana: "147",
    status: "active",
    category: "day"
  },
  {
    id: "kalyani-day",
    name: "KALYANI DAY",
    openTime: "04:15 PM",
    closeTime: "05:15 PM",
    openPana: "158",
    jodiDigit1: "4",
    jodiDigit2: "7",
    closePana: "250",
    status: "active",
    category: "day"
  },

  // NIGHT GAMES
  {
    id: "sita-night",
    name: "SITA NIGHT",
    openTime: "07:45 PM",
    closeTime: "08:45 PM",
    openPana: "179",
    jodiDigit1: "7",
    jodiDigit2: "8",
    closePana: "350",
    status: "upcoming",
    category: "night"
  },
  {
    id: "karnataka-night",
    name: "KARNATAKA NIGHT",
    openTime: "08:00 PM",
    closeTime: "09:00 PM",
    openPana: "230",
    jodiDigit1: "5",
    jodiDigit2: "4",
    closePana: "248",
    status: "upcoming",
    category: "night"
  },
  {
    id: "kranti-night",
    name: "KRANTI NIGHT",
    openTime: "08:15 PM",
    closeTime: "09:15 PM",
    openPana: "146",
    jodiDigit1: "1",
    jodiDigit2: "3",
    closePana: "256",
    status: "upcoming",
    category: "night"
  },
  {
    id: "sridevi-night",
    name: "SRIDEVI NIGHT",
    openTime: "08:30 PM",
    closeTime: "09:30 PM",
    openPana: "129",
    jodiDigit1: "2",
    jodiDigit2: "0",
    closePana: "280",
    status: "upcoming",
    category: "night"
  },
  {
    id: "rudraksh-night",
    name: "RUDRAKSH NIGHT",
    openTime: "08:45 PM",
    closeTime: "09:45 PM",
    openPana: "359",
    jodiDigit1: "7",
    jodiDigit2: "2",
    closePana: "237",
    status: "upcoming",
    category: "night"
  },
  {
    id: "madhur-night",
    name: "MADHUR NIGHT",
    openTime: "08:30 PM",
    closeTime: "10:30 PM",
    openPana: "148",
    jodiDigit1: "3",
    jodiDigit2: "5",
    closePana: "456",
    status: "upcoming",
    category: "night"
  },
  {
    id: "supreme-night",
    name: "SUPREME NIGHT",
    openTime: "08:35 PM",
    closeTime: "10:35 PM",
    openPana: "135",
    jodiDigit1: "9",
    jodiDigit2: "9",
    closePana: "289",
    status: "upcoming",
    category: "night"
  },
  {
    id: "andhra-night",
    name: "ANDHRA NIGHT",
    openTime: "08:45 PM",
    closeTime: "09:45 PM",
    openPana: "479",
    jodiDigit1: "0",
    jodiDigit2: "1",
    closePana: "344",
    status: "upcoming",
    category: "night"
  },
  {
    id: "milan-night",
    name: "MILAN NIGHT",
    openTime: "09:00 PM",
    closeTime: "11:00 PM",
    openPana: "340",
    jodiDigit1: "7",
    jodiDigit2: "6",
    closePana: "240",
    status: "upcoming",
    category: "night"
  },
  {
    id: "kalyani-night",
    name: "KALYANI NIGHT",
    openTime: "09:15 PM",
    closeTime: "11:15 PM",
    openPana: "158",
    jodiDigit1: "4",
    jodiDigit2: "4",
    closePana: "400",
    status: "upcoming",
    category: "night"
  },
  {
    id: "kalyan-night",
    name: "KALYAN NIGHT",
    openTime: "09:25 PM",
    closeTime: "11:30 PM",
    openPana: "359",
    jodiDigit1: "7",
    jodiDigit2: "5",
    closePana: "140",
    status: "upcoming",
    category: "night"
  },
  {
    id: "rajdhani-night",
    name: "RAJDHANI NIGHT",
    openTime: "09:15 PM",
    closeTime: "11:45 PM",
    openPana: "100",
    jodiDigit1: "1",
    jodiDigit2: "8",
    closePana: "288",
    status: "upcoming",
    category: "night"
  },
  {
    id: "main-bazar",
    name: "MAIN BAZAR",
    openTime: "09:40 PM",
    closeTime: "12:05 AM",
    openPana: "350",
    jodiDigit1: "8",
    jodiDigit2: "4",
    closePana: "149",
    status: "upcoming",
    category: "night"
  },
  {
    id: "nandini-night",
    name: "NANDINI NIGHT",
    openTime: "09:30 PM",
    closeTime: "10:30 PM",
    openPana: "140",
    jodiDigit1: "5",
    jodiDigit2: "2",
    closePana: "129",
    status: "upcoming",
    category: "night"
  }
];

export const GAME_RATES: GameRate[] = [
  {
    id: "single-digit",
    title: "Single Digit (Ank)",
    payout: "10 Ka 95",
    ratio: "1 : 9.5",
    description: "Bet on any single digit from 0 to 9. If your chosen digit appears, you get 9.5x of your point value."
  },
  {
    id: "jodi",
    title: "Jodi (Double Digit)",
    payout: "10 Ka 950",
    ratio: "1 : 95",
    description: "Bet on any pair from 00 to 99. Correct selection awards a return of 95 times your point value."
  },
  {
    id: "single-pana",
    title: "Single Pana (Patti)",
    payout: "10 Ka 1400",
    ratio: "1 : 140",
    description: "Bet on a three-digit sequence representing an open or close panel with unrepeated numbers. High payout of 140x."
  },
  {
    id: "double-pana",
    title: "Double Pana",
    payout: "10 Ka 2800",
    ratio: "1 : 280",
    description: "Bet on a panel containing a pair of repeating digits (e.g. 112, 556). Correct guesses receive a massive 280x return."
  },
  {
    id: "triple-pana",
    title: "Triple Pana",
    payout: "10 Ka 7000",
    ratio: "1 : 700",
    description: "Bet on all outer digits being identical (e.g., 111, 222, 999). Extremely rare, yielding 700 times points return."
  },
  {
    id: "half-sangam",
    title: "Sangam Half",
    payout: "10 Ka 10000",
    ratio: "1 : 1000",
    description: "Combines one correct single digit with a correct single pana, or a correct jodi with a pana. Phenomenal 1000x return."
  },
  {
    id: "full-sangam",
    title: "Sangam Full",
    payout: "10 Ka 100000",
    ratio: "1 : 10000",
    description: "Guess both Open Pana and Close Pana correctly! The ultimate Satta Matka combination with an astronomical 10,000x jackpot return."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What are the Minimum Deposit and Withdrawal limits?",
    answer: "To offer complete convenience, our Minimum Deposit is only ₹100 (न्यूनतम जमा मात्र ₹100/-), and the Minimum Withdrawal is only ₹500 (न्यूनतम निकासी मात्र ₹500/-) with absolutely zero extra transactional fees."
  },
  {
    question: "What is the Withdrawal processing time?",
    answer: "We provide an ultra-fast 24-Hour Withdrawal service (24 घंटे निकासी सेवा)! Once you request your points cash-out on our App or via WhatsApp, the admin completes the transfer instantly to your PhonePe, Paytm, Google Pay, or Bank account."
  },
  {
    question: "What are the Satta play rates/payouts?",
    answer: "Our payouts are transparent and the best in the market! For instance, Single Digit yields 1:9.5 (10 का 95), Jodi offers 1:95 (10 का 950), Single Pana offers 1:140 (10 का 1400), and Full Sangam gives 1:10000 (10 का 100,000)."
  },
  {
    question: "How do I download the Official Main Bazar Android App?",
    answer: "You can download our 100% safe, verified, and free Main Bazar app by clicking the 'Download App' button on our webpage. It connects you directly with instant live result tickers, full game charts, and play screens."
  },
  {
    question: "Is there customer support available?",
    answer: "Yes, we provide 24/7 Professional Live Customer Support! Our dedicated assistance panel is online round-the-clock on WhatsApp to register your profile, load points, or resolve any payment queries immediately."
  }
];

// Helper to generate a simulated history of results for a game
export const generateHistory = (gameName: string): ChartEntry[] => {
  const dates = [
    "2026-05-31",
    "2026-05-30",
    "2026-05-29",
    "2026-05-28",
    "2026-05-27",
    "2026-05-26",
    "2026-05-25",
    "2026-05-24",
    "2026-05-23"
  ];

  return dates.map((date) => {
    // Generate a deterministically random result per date/game to keep it consistent but variable
    const seed = date.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + gameName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const openPana = String(((seed * 3) % 900) + 100);
    const closePana = String(((seed * 7) % 900) + 100);
    const j1 = String(seed % 10);
    const j2 = String((seed * 3) % 10);
    return {
      date,
      openPana,
      jodi: `${j1}${j2}`,
      closePana
    };
  });
};
