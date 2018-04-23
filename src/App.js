import React, { Fragment, Component } from "react";

import { Provider, Consumer, getTodoById } from "./store";

const toggleDone = mutate => () =>
  mutate(todo => {
    todo.done = !todo.done;
  });

const setText = mutate => e =>
  mutate(todo => {
    todo.text = e.target.value;
  });

const Todo = ({ id }) => (
  <Consumer selector={({ todos }) => todos[id]}>
    {(todo, mutate) => (
      <div
        style={{
          margin: "1em",
          backgroundColor: todo.done ? "coral" : "lightgrey"
        }}
      >
        {todo.loading ? (
          "loading..."
        ) : (
          <Fragment>
            <div
              onClick={() =>
                mutate(draft => {
                  draft.todos[id].done = !draft.todos[id].done;
                })
              }
            >
              {todo.done ? "done" : "not done"}
            </div>
            <input
              onChange={e =>
                mutate(draft => {
                  draft.todos[id].text = e.target.value;
                })
              }
              value={todo.text}
            />
          </Fragment>
        )}
      </div>
    )}
  </Consumer>
);

class App extends Component {
  componentDidMount() {
    getTodoById(1);
    getTodoById(2);
    getTodoById(3);
  }

  render() {
    return (
      <Provider>
        <div style={{ backgroundColor: "red", padding: "1em" }}>
          <Consumer selector={({ todos }) => todos}>
            {todos => Object.keys(todos).map(id => <Todo key={id} id={id} />)}
          </Consumer>
        </div>
      </Provider>
    );
  }
}

export default App;
