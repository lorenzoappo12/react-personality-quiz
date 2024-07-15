export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}
