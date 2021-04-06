import styles from "./styles/index.module.css";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { randomString } from "common/helpers";
import { actions } from "./slice";
export { reducer } from "./slice";

export const List = () => {
  const list = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();
  const addListItem = () => dispatch(actions.addDebounced(randomString(10)));
  const removeRandomItem = () => dispatch(actions.removeRandomItem());

  return (
    <div className={styles.listContainer}>
      <div className={styles.listControls}>
        <button onClick={addListItem}>
          Add an item with 5 seconds cooldown
        </button>

        {Boolean(list.length) && (
          <button onClick={removeRandomItem}>
            {list.length > 1 ? "Remove random item" : "Remove the item"}
          </button>
        )}
      </div>

      {!list.length && <i>List is empty</i>}

      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
