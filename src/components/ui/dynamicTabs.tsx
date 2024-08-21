import { Label } from "@camped-ui/label";
import { Icon } from "../icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useActiveTabDetails } from "../../store";

export const DynamicTabs = ({
  tabsData,
  handleDeleteData = () => {},
  tabKey,
}: {
  tabsData: any;
  handleDeleteData: any;
  tabKey: string;
}) => {
  const tabs: any = useActiveTabDetails((state) => state);
  const currentPathName = window.location.pathname;
  const navigation = useNavigate();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentPathName]);

  return (
    <div
      className='flex flex-row gap-1 overflow-x-auto hide-scrollbar fixed mt-4 px-4 right-0 left-0 bg-secondary z-50' // Ensure it's overflow-x-auto for scrolling
      id='dynamicTabs'
      ref={tabsContainerRef}
    >
      {tabsData?.map((tabItem: any, index: number) => {
        const isActive = tabItem?.path === currentPathName;

        return (
          <div
            key={index}
            ref={isActive ? activeTabRef : null}
            className={`min-w-20 max-w-[100%] flex-none overflow-hidden flex flex-row pl-3 py-2 pr-8 ${
              tabItem?.path ? "cursor-pointer" : "text-primary bg-background"
            } relative ${
              isActive ? "bg-primary-foreground" : "bg-background"
            } gap-3 ${index === 0 ? "rounded-tl-md" : ""}`}
          >
            <div
              onClick={() => {
                if (tabItem.path) {
                  tabs.updateActiveTabs(tabKey, tabItem.path);
                  navigation(tabItem.path);
                }
              }}
              className='truncate flex-1'
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Label>{tabItem?.title}</Label>
            </div>
            {tabItem?.isClosable && (
              <div
                className={`absolute right-1 top-[30%] z-50 h-4 w-4 rounded-full ${
                  isActive ? "bg-background" : "bg-foreground"
                } flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  const path = handleDeleteData(index);
                  tabs.updateActiveTabs(tabKey, path);
                }}
              >
                <Icon.close className='h-3 w-3' />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
