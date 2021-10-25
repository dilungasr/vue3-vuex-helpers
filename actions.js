import { vuex } from ".";

// mapActions maps store actions by returning all the actions
function mapActions(namespace = "") {
  const {store} = vuex;

  const actions = store._actions;

  //WORKING WITH GLOBAL ACTIONS
  if (!namespace) {
    const filteredKeys = Object.keys(actions).filter(
      (key) => !key.includes("/")
    );
    // if no global mutations.. then return empty object
    if (!filteredKeys.length) return {};

    // create entries
    const entries = filteredKeys.map((key) => [
      key,
      (payload) => store.dispatch(key, payload),
    ]);

    //convert entries to key: value object
    return Object.fromEntries(entries);
  }

  // WORKING WITH NAMESPACED ACTIONS
  //filter module actionss
  const filteredKeys = Object.keys(actions).filter(
    (key) => key.split("/")[0] === namespace
  );

  //if no any mutation in the named module
  if (!filteredKeys) return {};

  // expose mutations names as a way to fire them
  return Object.fromEntries(
    filteredKeys.map((key) => {
      const keyArr = key.split("/");
      const keyName = keyArr[keyArr.length - 1];

      return [keyName, (payload) => store.dispatch(key, payload)];
    })
  );
}

export default mapActions;
