import { useAppSelector } from "common/hooks";
import { ReactNode } from "react";

export function TabContent(props: { children: ReactNode; for: string }) {
  const activeTabId = useAppSelector((state) => state.tabs.active);

  if (activeTabId !== props.for) {
    return null;
  }

  return <div>{props.children}</div>;
}
