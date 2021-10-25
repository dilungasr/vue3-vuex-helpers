import { vuex } from ".";
import { computed } from "vue";

// mapState maps store state by returning the object with all the defined properties in form of key: value
function mapState(namespace = "") {
  const { store } = vuex;
  const state = namespace !== "" ? store.state[namespace] : store.state;

  return Object.fromEntries(
    Object.keys(state).map((key) => [key, computed(() => state[key])])
  );
}

export default mapState;
