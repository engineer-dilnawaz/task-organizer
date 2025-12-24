export type NavbarItem = {
  to: `/${string}`;
  title: string;
  isNew?: boolean;
};

export const navbarList: NavbarItem[] = [
  {
    to: "/all",
    title: "All",
  },
  {
    to: "/add-task",
    title: "Add Task",
    isNew: true,
  },
  {
    to: "/completed",
    title: "Completed",
  },
  {
    to: "/incompleted",
    title: "Incompleted",
  },
  {
    to: "/counter",
    title: "Counter",
  },
  {
    to: "/category",
    title: "Category",
  },
  {
    to: "/dragdrop",
    title: "Drag & Drop",
    isNew: true,
  },
];
