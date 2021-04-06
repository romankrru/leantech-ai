import { List } from "./List";
import { Tabs, TabType, TabContent } from "./Tabs";
import styles from "./styles/index.module.css";

const tabs: Array<TabType> = [
  { title: "Tab #1", to: "tab-one" },
  { title: "Tab #2", to: "tab-two" },
  { title: "Tab #3", to: "tab-three" },
];

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>Header</header>

      <main className={styles.main}>
        <Tabs tabs={tabs}>
          <TabContent for="tab-one">
            <List />
          </TabContent>

          <TabContent for="tab-two">Tab 2</TabContent>
          <TabContent for="tab-three">Tab 3</TabContent>
        </Tabs>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
