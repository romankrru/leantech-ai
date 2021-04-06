import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import { Tabs } from "../index";
import { TabContent } from "../TabContent";
import { store } from "store";

describe("Tabs component", () => {
  it("should render without crashes", () => {
    const rttApi = render(
      <Provider store={store}>
        <Tabs tabs={[{ title: "Tab 1", to: "tab-1" }]}>
          <span>test</span>
        </Tabs>
      </Provider>
    );

    expect(rttApi.getByRole("button")).toBeInTheDocument();
    expect(rttApi.getByText("Tab 1")).toBeInTheDocument();
  });

  it("should switch tabs", () => {
    const rttApi = render(
      <Provider store={store}>
        <Tabs
          tabs={[
            { title: "Tab 1", to: "tab-one" },
            { title: "Tab 2", to: "tab-two" },
            { title: "Tab 3", to: "tab-three" },
            { title: "Tab 4", to: "tab-four" },
          ]}
        >
          <TabContent for="tab-one">tab 1 content</TabContent>
          <TabContent for="tab-two">tab 2 content</TabContent>
          <TabContent for="tab-three">tab 3 content</TabContent>
          <TabContent for="tab-four">tab 4 content</TabContent>
        </Tabs>
      </Provider>
    );

    expect(rttApi.getByText("Tab 1")).toBeInTheDocument();
    expect(rttApi.getByText("tab 1 content")).toBeInTheDocument();
    fireEvent.click(rttApi.getByText("Tab 2"));
    expect(rttApi.getByText("tab 2 content")).toBeInTheDocument();
    expect(screen.queryByText("tab 1 content")).not.toBeInTheDocument();
    fireEvent.click(rttApi.getByText("Tab 3"));
    expect(rttApi.getByText("tab 3 content")).toBeInTheDocument();
    expect(screen.queryByText("tab 2 content")).not.toBeInTheDocument();
    fireEvent.click(rttApi.getByText("Tab 4"));
    expect(rttApi.getByText("tab 4 content")).toBeInTheDocument();
  });
});
