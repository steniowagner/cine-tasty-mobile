type Review = {
  content: string;
  author: string;
};

export type ReviewsExternalParams = {
  reviews: Review[];
};

export type MovieDetailInternalternalParams = {
  REVIEWS: Review[];
};
