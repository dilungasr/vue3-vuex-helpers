import { vuex } from ".";

// mapMutations maps store mutations by returning the object with all the defined properties in form of key:value
function mapMutations(namespace = "") {
  const { store } = vuex;

  const mutations = store._mutations;

  //WORKING WITH GLOBAL MUTATIONS
  if (!namespace) {
    const filteredKeys = Object.keys(mutations).filter(
      (key) => !key.includes("/")
    );
    // if no global mutations.. then return empty object
    if (!filteredKeys.length) return {};

    // create entries
    const entries = filteredKeys.map((key) => [
      key,
      (payload) => store.commit(key, payload),
    ]);

    //convert entries to key: value object
    return Object.fromEntries(entries);
  }

  // WORKING WITH NAMESPACED MUTATIONS
  //filter module mutations
  const filteredKeys = Object.keys(mutations).filter(
    (key) => key.split("/")[0] === namespace
  );

  //if no any mutation in the named module
  if (!filteredKeys) return {};

  // expose mutations names as a way to fire them
  return Object.fromEntries(
    filteredKeys.map((key) => {
      const keyArr = key.split("/");
      const keyName = keyArr[keyArr.length - 1];

      return [keyName, (payload) => store.commit(key, payload)];
    })
  );
}

export default mapMutations;
