import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { List } from "../index";
import { store, initStore } from "store";
import { sleep } from "common/tests";

describe("List component", () => {
  it("should render without crashes", () => {
    const rttApi = render(
      <Provider store={store}>
        <List />
      </Provider>
    );

    expect(
      rttApi.getByText("add an item", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render list items", () => {
    const rttApi = render(
      <Provider
        store={initStore({
          list: [
            { id: "1", description: "item 1" },
            { id: "2", description: "item 2" },
          ],
        })}
      >
        <List />
      </Provider>
    );

    expect(rttApi.getByText("item 1")).toBeInTheDocument();
    expect(rttApi.getByText("item 2")).toBeInTheDocument();
  });

  it("should wait for cooldown", async () => {
    const rttApi = render(
      <Provider store={initStore()}>
        <List />
      </Provider>
    );

    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(0);
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(1);
    await sleep(300);
    fireEvent.click(rttApi.getByText("Add an item", { exact: false }));
    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(2);
  });

  it("should show empty message", () => {
    const rttApi = render(
      <Provider store={initStore()}>
        <List />
      </Provider>
    );

    expect(rttApi.getByText("List is empty")).toBeInTheDocument();
  });

  it("should handle item remove", () => {
    const rttApi = render(
      <Provider
        store={initStore({
          list: [
            { id: "1", description: "desc1" },
            { id: "2", description: "desc2" },
            { id: "3", description: "desc3" },
          ],
        })}
      >
        <List />
      </Provider>
    );

    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(3);
    const removeRandomBtn = rttApi.getByText("Remove random item");
    expect(removeRandomBtn).toBeInTheDocument();
    fireEvent.click(removeRandomBtn);
    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(2);
    fireEvent.click(removeRandomBtn);
    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(1);
    const removeSingleTextBtn = "Remove the item";
    fireEvent.click(rttApi.getByText("Remove the item"));
    expect(rttApi.container.querySelector("ul")?.children).toHaveLength(0);
    expect(rttApi.queryByText(removeSingleTextBtn)).not.toBeInTheDocument();
    expect(rttApi.getByText("List is empty")).toBeInTheDocument();
  });
});
