const remoteURL = "http://localhost:5002";
// const remoteURL = "https://swishlist-json.bryannilsen.com"

const APIManager = {
  // edit fetch variables to match swishlist data needed

  getEntry(resource, id, ...search) {
    return fetch(`${remoteURL}/${resource}/${id}${search}`).then(data =>
      data.json()
    );
  },

  getAllEntries(resource, ...search) {
    return fetch(`${remoteURL}/${resource}${search}`).then(data => data.json());
  },

  deleteEntry(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`, { method: "DELETE" }).then(
      data => data.json()
    );
  },

  addEntry(resource, newThing) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newThing)
    }).then(data => data.json());
  },

  editEntry(resource, id, editedThing) {
    return fetch(`${remoteURL}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedThing)
    });
  },
  userLogin(email, password) {
    return fetch(`${remoteURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    });
  }
};

export default APIManager;
