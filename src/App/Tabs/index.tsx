import styles from "./styles/index.module.css";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { actions } from "./slice";
import { ReactNode } from "react";
export { reducer } from "./slice";
export { TabContent } from "./TabContent";
export type TabType = { to: string; title: string };

export function Tabs(props: { children: ReactNode; tabs: Array<TabType> }) {
  const activeTabId = useAppSelector((state) => state.tabs.active);
  const dispatch = useAppDispatch();
  const changeTab = (tabId: string) => dispatch(actions.changeTab(tabId));

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabsLinks}>
        {props.tabs.map((tab) => (
          <li
            key={tab.to}
            className={cn(styles.tabLink, {
              [styles.tabLinkActive]: activeTabId === tab.to,
            })}
          >
            <button onClick={() => changeTab(tab.to)}>{tab.title}</button>
          </li>
        ))}
      </ul>

      <div>{props.children}</div>
    </div>
  );
}
