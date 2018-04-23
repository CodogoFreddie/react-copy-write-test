import createState from "react-copy-write";

const { Provider, Consumer, createMutator } = createState({
  todos: {},
  users: {}
});

export { Provider, Consumer };

const getTodoData = id => {
  fetch(`https://www.example.com/get-todo/${id}`);

  return new Promise(done => {
    setTimeout(done, 500 + Math.random() * 1000, {
      done: id === 2,
      text: `this is the text for todo ${id}`,
      authorId: id > 3 ? null : id % 2 ? "aaa" : "bbb"
    });
  });
};

const getUserData = id => {
  fetch(`https://www.example.com/get-user/${id}`);

  return new Promise(done => {
    setTimeout(done, 500 + Math.random() * 1000, {
      name: id === "aaa" ? "Freddie" : "Marcelo"
    });
  });
};

export const getUserById = id => {
  const mutator = createMutator((state, user) => {
    state.users[id] = user;
  });

  mutator({
    loading: true
  });

  getUserData(id).then(mutator);
};

export const getTodoById = id => {
  const mutator = createMutator((state, todo) => {
    state.todos[id] = todo;
  });

  mutator({
    loading: true
  });

  getTodoData(id)
    .then(todo => {
      getUserById(todo.authorId);
      return todo;
    })
    .then(mutator);
};
