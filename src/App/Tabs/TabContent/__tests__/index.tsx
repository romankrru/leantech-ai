import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { TabContent } from "../index";
import { initStore } from "store";

describe("Tab Content component", () => {
  it("should render without crashes", () => {
    render(
      <Provider store={initStore()}>
        <TabContent for="tab-one">content</TabContent>
      </Provider>
    );
  });

  it("should render active tab", () => {
    const rttApi = render(
      <Provider store={initStore({ tabs: { active: "1" } })}>
        <TabContent for="1">content</TabContent>
      </Provider>
    );

    expect(rttApi.getByText("content")).toBeInTheDocument();
  });

  it("should not render inactive tab", () => {
    render(
      <Provider store={initStore({ tabs: { active: "1" } })}>
        <TabContent for="2">content</TabContent>
      </Provider>
    );

    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });
});
