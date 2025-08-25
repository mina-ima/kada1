export interface Era {
  name: string;
  abbr: string;
  start: Date;
  end: Date | null;
}

export const eras: Era[] = [
  {
    name: '昭和',
    abbr: 'S',
    start: new Date(1926, 11, 25), // Month is 0-indexed (December is 11)
    end: new Date(1989, 0, 7), // January is 0
  },
  {
    name: '平成',
    abbr: 'H',
    start: new Date(1989, 0, 8),
    end: new Date(2019, 3, 30), // April is 3
  },
  {
    name: '令和',
    abbr: 'R',
    start: new Date(2019, 4, 1), // May is 4
    end: null, // Current era
  },
];
