const baseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("🚀 ~ file: userService.js:2 ~ baseUrl", baseUrl);

const GenericService = {
  add: async function (customer, apiEntity) {
    const res = await fetch(`${baseUrl}/${apiEntity}`, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    const user = result.data;

    return user;
  },

  getAll: async function (apiEntity) {
    const res = await fetch(`${baseUrl}/${apiEntity}`);
    const result = await res.json();
    const users = result.data.content;

    return users;
  },

  getById: async function (id, apiEntity) {
    const res = await fetch(`${baseUrl}/${apiEntity}/${id}`);
    const result = await res.json();
    const user = result.data;

    return user;
  },

  delete: async function (id, apiEntity) {
    const res = await fetch(`${baseUrl}/${apiEntity}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // const idx = todos.findIndex((todo) => todo.id === id)
      // const copy = [...todos]
      // copy.splice(idx, 1)
      // setTodos(copy)
    }
  },
};

export default GenericService;
