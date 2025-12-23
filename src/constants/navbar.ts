export type NavbarItem = {
  to: `/${string}`;
  title: string;
};

export const navbarList: NavbarItem[] = [
  {
    to: "/all",
    title: "All",
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
  },
];
