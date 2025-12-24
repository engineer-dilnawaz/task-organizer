export type Task = {
  _id: string;
  title: string;
  completed: boolean;
  category: Category;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  _id: string;
  name: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};
