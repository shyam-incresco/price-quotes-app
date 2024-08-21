import { useFrappeAuth } from "frappe-react-sdk";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileIcon from "../assets/profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@camped-ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@camped-ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@camped-ui/avatar";
import { Icon } from "./icons";
import { DynamicTabs } from "./ui/dynamicTabs";

const MainLayout = ({
  children,
  tabsData,
  tabKey,
  handleDeleteData = () => {},
}: any) => {
  const { logout } = useFrappeAuth();
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleLogout = async () => {
    try {
      await logout(); // Attempt to log out from Frappe backend

      // Proceed to clear session data and redirect regardless of API success or failure
      localStorage.removeItem("authToken"); // Clear the auth token from localStorage
      localStorage.removeItem("currentUser"); // Clear the currentUser from localStorage
      navigate("/login"); // Redirect to the login page
    } catch (error: any) {
      // Use 'any' type for error
      const httpStatus = error?.httpStatus;
      const exception = error?.exception;

      if (
        httpStatus === 401 ||
        exception === "frappe.exceptions.AuthenticationError"
      ) {
        // Handle session expiration gracefully
        console.warn("Session expired. Proceeding with local logout.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        navigate("/login"); // Redirect to login
      } else {
        console.error("Failed to logout:", error); // Log any other errors
      }
    }
  };

  const headerMenu = [
    {
      title: "Quotes",
      pathName: "/quotes",
      secondaryPathName: "/quote",
    },
    {
      title: "Customers",
      pathName: "/customers",
      secondaryPathName: "/customer",
    },
    {
      title: "Items",
      pathName: "/items",
      secondaryPathName: "/item",
    },
    {
      title: "Item Group",
      pathName: "/item-group"
    },
  ];

  return (
    <div className='bg-background h-screen w-full'>
      {currentLocation?.pathname !== "/login" && (
        <div className='fixed left-0 right-0 bg-background'>
          <div className='flex items-center justify-between border-b px-7 py-1'>
            <div className='flex items-center'>
              <span
                style={{
                  color: "#D43F37",
                  fontWeight: "bold",
                  fontSize: "xx-large",
                }}
              >
                Incresco
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={profileIcon} />
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <DropdownMenuContent
                  asChild
                  onClick={handleLogout}
                  className='cursor-pointer'
                >
                  <div className='flex flex-row gap-2 p-3 mr-3'>
                    <Icon.LogOut /> Log out
                  </div>
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <NavigationMenu className='px-6'>
            <NavigationMenuList className='gap-6'>
              {headerMenu?.map((item, index) => {
                return (
                  <NavigationMenuItem
                    key={index}
                    className={`p-4 ${
                      currentLocation?.pathname === item?.pathName ||
                      currentLocation?.pathname === item?.secondaryPathName
                      
                        ? "border-b-2 border-primary text-primary"
                        : "text-secondary-foreground"
                    }`}
                  >
                    <Link to={item?.pathName}>{item?.title}</Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <DynamicTabs
            handleDeleteData={handleDeleteData}
            tabsData={
              tabsData || [
                {
                  title: "Items",
                  path: currentLocation?.pathname,
                  isClosable: false,
                },
              ]
            }
            tabKey={tabKey || "customers"}
          />
        </div>
      )}
      <div
        className={`${
          currentLocation?.pathname === "/login"
            ? ""
            : "pt-[172px] bg-secondary"
        } flex h-screen px-4 w-full hide-scrollbar`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
