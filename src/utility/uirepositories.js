import { useStore } from "vuex";

export default function useRepositories(actions) {
    const store = useStore();
    actions.forEach(element => {
        store.dispatch(element.action,element.param);
    });

    const findData = async (action,objdata) => {
        store.dispatch(action, objdata);
    };

    const watchData = async (actions) => {
        actions.forEach(element => {
            store.dispatch(element.action,element.param);
        });
    }

    return {
        store,
        findData,
        watchData
    }
}