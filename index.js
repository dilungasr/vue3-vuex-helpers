import mapGetters from "./getters";
import mapMutations from "./mutations";
import mapActions from "./actions";
import mapState from "./state";
import mapNamespace from "./namespace";

export { mapGetters, mapMutations, mapActions, mapState, mapNamespace };

// interfacing vuex store
export const vuex = { store: null };

// vuex plugin for accessing the store as soon as the store loads
export default (store) => {
  vuex.store = store;
};
