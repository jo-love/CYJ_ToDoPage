export interface Board {
  id: string;
  title: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  content: string;
}
