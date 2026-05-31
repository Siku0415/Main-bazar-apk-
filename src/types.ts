export interface Game {
  id: string;
  name: string;
  openTime: string; // e.g. "11:00 AM"
  closeTime: string; // e.g. "12:02 PM"
  openPana: string; // e.g. "123"
  jodiDigit1: string; // e.g. "6"
  jodiDigit2: string; // e.g. "7"
  closePana: string; // e.g. "890"
  status: 'active' | 'closed' | 'upcoming';
  category: 'morning' | 'day' | 'night';
}

export interface GameRate {
  id: string;
  title: string;
  payout: string; // e.g. "10 Ka 95"
  ratio: string; // e.g. "1:9.5"
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChartEntry {
  date: string;
  openPana: string;
  jodi: string;
  closePana: string;
}
