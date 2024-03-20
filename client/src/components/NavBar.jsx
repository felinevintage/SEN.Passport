import React from "react";
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth"

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

const navListMenuItems = [
  {
    title: "Settings",
    description: "Learn how we can help you achieve your goals.",
  },
  {
    title: "Sign Out",
    description: "Reach out to us for assistance or inquiries",
  }
];

function NavListMenu() {
  const renderItems = navListMenuItems.map(({ title, description }, key) => (
    <ListItem key={key} className="flex items-center gap-3 rounded-lg">
      <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-2">
        <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="paragraph" className="text-xs font-medium text-blue-gray-500">
          {description}
        </Typography>
      </div>
    </ListItem>
  ));

  return <React.Fragment>{renderItems}</React.Fragment>;
}

function logout() {
  localStorage.removeItem("token");
  signOut();
}
function NavList() {
  const {isLoggedIn, signOut} = useAuth()
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <NavListMenu />
      <ListItem className="text-black flex items-center gap-2 py-2 pr-4 cursor-pointer relative">
        <div className="flex"> {/* Ensure that flex class is applied here */}
          <div className="py-1">
            <div className="flex items-center gap-2">
              <Link to="/" className="block px-4 py-2 text-m text-gray-700 hover:bg-purple-100">
                Home
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-m text-gray-700 hover:bg-purple-100">
                    Dashboard
                  </Link>   
                  <Button onClick={signOut} className="block px-4 py-2 text-m text-gray-700 hover:bg-purple-100">
                    Log Out
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </ListItem>
    </List>
  );
}


export default function NavBarMenu() {
  const { isLoggedIn } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto px-4 py-2 w-full flex justify-between items-center">
      <NavList />
      {!isLoggedIn && (
        <Button className="bg-purple-500 py-2 px-4" variant="gradient" size="lg">
          Log In
        </Button>
      )}
      <IconButton
        variant="text"
        color="blue-gray"
        className="lg:hidden"
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <XMarkIcon className="h-6 w-6" strokeWidth={2} />
        ) : (
          <Bars3Icon className="h-6 w-6" strokeWidth={2} />
        )}
      </IconButton>
    </Navbar>
  );
}
