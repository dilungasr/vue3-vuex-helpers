import mapState from "./state";
import mapMutations from "./mutations";
import mapActions from "./actions";
import mapGetters from "./getters";

// MappedNamespace exposes state, mutations, getters and actions of the namespaced module
class MappedNamespace {
  constructor(state, getters, mutations, actions) {
    this.getters = getters;
    this.state = state;
    this.mutations = mutations;
    this.actions = actions;
  }
}

// mapNamespace returns namespace's  getters, mutations, state and actions helper objects with all the defined properties in the form of
// key : value
function mapNamespace(namespace = "") {
  // prevent empty namespace
  if (!namespace) {
    const errorStr = "namespace string cannot be empty";
    throw new Error(errorStr);
  }

  return new MappedNamespace(
    mapState(namespace),
    mapGetters(namespace),
    mapMutations(namespace),
    mapActions(namespace)
  );
}

export default mapNamespace;
