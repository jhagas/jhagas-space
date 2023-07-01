type CommentType = {
  max: number;
  pagination: number;
  data: {
    name: string;
    comment: string;
    time: string;
  }[];
};

export default CommentType;
