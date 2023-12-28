export type AuthorRequest = {
  name: string;
};

export type Author = AuthorRequest & {
  id: string;
};

export type AuthorResponse = {
  successful: boolean;
  result: Author;
};

export type AllAuthorsResponse = {
  successful: boolean;
  result: Author[];
};
