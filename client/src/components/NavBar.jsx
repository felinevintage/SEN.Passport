import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  CogIcon,
} from "@heroicons/react/24/solid";

const LogoutIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

const navListMenuItems = [
  {
    title: "Settings",
    description: "Learn how we can help you achieve your goals.",
    icon: CogIcon,
  },
  {
    title: "Sign Out",
    description: "Reach out to us for assistance or inquiries",
 icon: LogoutIcon,
  }
];



function NavListMenu() {
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <ListItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {" "}
<svg>{React.createElement(icon, { strokeWidth: 2, className: "h-6 text-gray-900 w-6" })}</svg>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
              {title}
            </Typography>
            <Typography variant="paragraph" className="text-xs font-medium text-blue-gray-500">
              {description}
            </Typography>
          </div>
        </ListItem>
      </a>
    ),
  );

  return (
    <React.Fragment>
      {renderItems}
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="text-black flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
    </List>
  );
}

export default function NavBarMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button className="text-black" variant="text" size="sm" color="blue-gray">
            Log In
          </Button>
          <Button className="bg-gray-700" variant="gradient" size="sm">
            Sign In
          </Button>
        </div>
        <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
    </Navbar>
  );
}
