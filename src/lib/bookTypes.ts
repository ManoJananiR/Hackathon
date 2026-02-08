export type SimilarBook = {
  title: string;
  rating?: number;
};

export type BookProfile = {
  title: string;
  description: string;
  rating?: number;
  popularityScore?: number;
  similar?: SimilarBook[];
};
