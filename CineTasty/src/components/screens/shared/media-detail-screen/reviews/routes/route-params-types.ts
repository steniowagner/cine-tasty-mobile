type Review = {
  content: string;
  author: string;
};

export type ReviewsExternalParams = {
  mediaTitle: string;
  reviews: Review[];
};

export type MovieDetailInternalternalParams = {
  REVIEWS: ReviewsExternalParams;
};
