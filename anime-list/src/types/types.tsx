export interface Filters {
  genres?: number[];
  excludedGenres?: number[];
  studios?: number[];
  rating?: Rating | string | number;
  type?: Type | string | number;
  status?: Status | string | number;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export enum Rating {
  G = 'G',
  PG = 'PG - Children',
  PG13 = 'PG-13 - Teens 13 or older',
  R = 'R - 17+ (violence & profanity)',
  RPlus = 'R+ - Mild Nudity'
}

export enum Type {
  TV = 'TV',
  Movie = 'Movie',
  OVA = 'OVA',
  Special = 'Special',
}

export enum Status {
  Finished = 'Finished Airing',
  Ongoing = 'Currently Airing',
}

export interface Studios {
  mal_id: number;
  name: string;
}

export interface Genre {
  mal_id: number;
  name: string;
}