import { Home, FilePlus2, File, Workflow, UserRoundPlus } from "lucide-react";

const sideNavStrokeWidth = 2;
const sideNavIconSize = 16;
export const sideNav = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={sideNavIconSize} strokeWidth={sideNavStrokeWidth} />,
  },
  {
    name: "Create Document",
    path: "/docs/create",
    icon: <FilePlus2 size={sideNavIconSize} strokeWidth={sideNavStrokeWidth} />,
  },
  {
    name: "My Docs",
    path: "/docs",
    icon: <File size={sideNavIconSize} strokeWidth={sideNavStrokeWidth} />,
  },
  {
    name: "Create Pipeline",
    path: "/pipeline/create",
    icon: (
      <UserRoundPlus size={sideNavIconSize} strokeWidth={sideNavStrokeWidth} />
    ),
  },
  {
    name: "My Pipeline",
    path: "/pipeline",
    icon: <Workflow size={sideNavIconSize} strokeWidth={sideNavStrokeWidth} />,
  },
];
