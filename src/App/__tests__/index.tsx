import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { App } from "../index";
import { store, initStore } from "store";
import { sleep } from "common/tests";
// import { sleep } from "common/tests";

describe("App component", () => {
  it("should render without crashes", () => {
    const rttApi = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      rttApi.getByText("add an item", { exact: false })
    ).toBeInTheDocument();
  });

  it("should persist list cooldown state upon tabs switch", async () => {
    const rttApi = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const $listItems = ".listContainer li";
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(0);
    fireEvent.click(rttApi.getByText("add an item", { exact: false }));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(1);
    fireEvent.click(rttApi.getByText("add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("add an item", { exact: false }));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(1);
    // Switch to tab 2
    fireEvent.click(rttApi.getByText("Tab #2"));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(0);
    // Switch back to tab 1
    fireEvent.click(rttApi.getByText("Tab #1"));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(1);
    // Assert that Add btn still on cooldown
    fireEvent.click(rttApi.getByText("add an item", { exact: false }));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(1);
    await sleep(300);
    fireEvent.click(rttApi.getByText("add an item", { exact: false }));
    expect(rttApi.container.querySelectorAll($listItems)).toHaveLength(2);
  });
});
