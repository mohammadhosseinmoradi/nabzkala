"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={clsx("flex items-center justify-center", className)}>
      {/*{mounted && (*/}
      {/*  <Menu>*/}
      {/*    <Menu.Button className="w-full max-w-full">*/}
      {/*      /!*{theme === "light" && <Icon name="sun" />}*!/*/}
      {/*      /!*{theme === "dark" && <Icon name="moon" />}*!/*/}
      {/*      /!*{theme === "system" && <Icon name="laptop" />}*!/*/}
      {/*    </Menu.Button>*/}
      {/*    <Menu.Items>*/}
      {/*      <Menu.ItemGroup>*/}
      {/*        <Menu.Item*/}
      {/*          // icon={<Icon name="sun" />}*/}
      {/*          name="روشن"*/}
      {/*          onClick={() => {*/}
      {/*            setTheme("light");*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <Menu.Item*/}
      {/*          // icon={<Icon name="moon" />}*/}
      {/*          name="تاریک"*/}
      {/*          onClick={() => {*/}
      {/*            setTheme("dark");*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <Menu.Item*/}
      {/*          // icon={<Icon name="laptop" />}*/}
      {/*          name="سیستم"*/}
      {/*          onClick={() => {*/}
      {/*            setTheme("system");*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </Menu.ItemGroup>*/}
      {/*    </Menu.Items>*/}
      {/*  </Menu>*/}
      {/*)}*/}
    </div>
  );
}
