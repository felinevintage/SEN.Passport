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
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  
} from "@heroicons/react/24/outline";


const navListMenuItems = [
  {
    title: "Settings",
    description: "Learn how we can help you achieve your goals.",
    // icon: CogIcon,
  },
  {
    title: "Sign Out",
    description: "Reach out to us for assistance or inquiries",
    //  icon: LogoutIcon,
  }
];

function NavListMenu() {
  const renderItems = navListMenuItems.map(({ title, description }, key) => (
    <a href="#" key={key}>
      <ListItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {/* Render the title as a child of the Typography component */}
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
            {title}
          </Typography>
        </div>
        <div>
          {/* Render the description as a child of the Typography component */}
          <Typography variant="paragraph" className="text-xs font-medium text-blue-gray-500">
            {description}
          </Typography>
        </div>
      </ListItem>
    </a>
  ));

  return <React.Fragment>{renderItems}</React.Fragment>;
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
       <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className="text-black flex items-center gap-2 py-2 pr-4">
                Home
              </ListItem>
            </Typography>
            <NavListMenu />
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            ></Typography>
            <Typography>
        <ListItem className="text-black flex items-center gap-2 py-2 pr-4 cursor-pointer">
          Dashboard
          <ChevronDownIcon className="h-4 w-4" />
        </ListItem>
        <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log Out
            </a>
          </div>
        </div>
      </Typography>

    </List>
  );
}

export default function NavBarMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">

        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        ></Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button className="bg-gray-700" variant="gradient" size="sm">
            Log In
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
