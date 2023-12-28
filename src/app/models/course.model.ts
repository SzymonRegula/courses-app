import { Author, AuthorRequest } from './author.model';

export type CourseRequest = {
  title: string;
  description: string;
  duration: number;
  authors: string[];
};

export type Course = CourseRequest & {
  authors: Author[];
  creationDate: Date;
  id: string;
};

export type CourseResponse = {
  successful: boolean;
  result: Course & { creationDate: string };
};

export type AllCoursesResponse = {
  successful: boolean;
  result: (Course & { creationDate: string })[];
};
