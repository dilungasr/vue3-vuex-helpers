import { vuex } from ".";
import { computed } from "vue";

// mapGetters maps store getters by returning the object with all the defined properties in form of key: value
function mapGetters(namespace = "") {
  const { store } = vuex;
  const getters = store.getters;

  //WORKING WITH GLOBAL GETTERS
  if (!namespace) {
    const filteredKeys = Object.keys(getters).filter(
      (key) => !key.includes("/")
    );
    // if no global getters.. then return empty object
    if (!filteredKeys.length) return Object.fromEntries([]);

    // create entries
    const entries = filteredKeys.map((key) => [
      key,
      computed(() => getters[key]),
    ]);

    //convert entries to key: value object
    return Object.fromEntries(entries);
  }

  //WORKING WITH NAMESPACED GETTERS
  const filteredKeys = Object.keys(getters).filter(
    (key) => key.split("/")[0] === namespace
  );

  //if no any mutation in the namespaced module ...then return empty object
  if (!filteredKeys.length) return Object.fromEntries([]);

  // expose getters names
  return Object.fromEntries(
    filteredKeys.map((key) => {
      const keyArr = key.split("/");
      const keyName = keyArr[keyArr.length - 1];

      return [keyName, computed(() => getters[key])];
    })
  );
}

export default mapGetters;
