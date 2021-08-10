import { useStore } from "vuex";

export default function useRepositories(initaction,actions) {
    const store = useStore();
    store.dispatch(initaction.action,initaction.param);
    actions.forEach(element => {
        store.dispatch(element);
    });

    const findData = async (action,objdata) => {
        store.dispatch(action, objdata);
    };

    return {
        store,
        findData
    }
}