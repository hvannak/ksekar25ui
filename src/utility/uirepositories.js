import { useStore } from "vuex";

export default function useRepositories(actions) {
    const store = useStore();
    const searchObj = {
        pageSize: 2,
        page: 1
    };
    actions.forEach(element => {
        store.dispatch(element);
    });
    const findData = async (action) => {
        console.log(searchObj);
        searchObj.page = 1;
        store.dispatch(action, searchObj);
    };
    const nextData = async (totaldoc,action) => {
        if (searchObj.page < totaldoc) {
            searchObj.page = searchObj.page + 1;
            store.dispatch(action, searchObj);
        }
    };
    const prevData = async (action) => {
        if (searchObj.page > 1) {
            searchObj.page = searchObj.page - 1;
            store.dispatch(action, searchObj);
        }
    };
    return {
        store,
        searchObj,
        findData,
        nextData,
        prevData
    }
}