import { ref } from 'vue'
import { useStore } from "vuex";

export default function useRepositories(initaction,actions) {
    const store = useStore();
    const sortIcon = ref('sort-up');
    const pageObj = {
        pageSize: 30,
        page: 1,
        sortBy: "_id",
        sortType: "asc",
        searchObjby: "0",
        searchObj: "",
      };
    store.dispatch(initaction,pageObj);
    actions.forEach(element => {
        store.dispatch(element);
    });
    const sortData = async (prop,action) => {
        pageObj.sortBy = prop;
        pageObj.sortType = (pageObj.sortType == 'asc') ? 'desc' : 'asc';
        sortIcon.value = (sortIcon.value == 'sort-down') ? 'sort-up' : 'sort-down';
        store.dispatch(action, pageObj);
    };
    const deleteData = async (_id,action) => {
        store.dispatch(action, _id);
    };
    const findData = async (action) => {
        pageObj.page = 1;
        store.dispatch(action, pageObj);
    };
    const nextData = async (totaldoc,action) => {
        if (pageObj.page < totaldoc) {
            pageObj.page = pageObj.page + 1;
            store.dispatch(action, pageObj);
        }
    };
    const prevData = async (action) => {
        if (pageObj.page > 1) {
            pageObj.page = pageObj.page - 1;
            store.dispatch(action, pageObj);
        }
    };
    const saveData = async (obj,action) => {
        store.dispatch(action, obj);
    }
    return {
        sortIcon,
        pageObj,
        store,
        sortData,
        deleteData,
        findData,
        nextData,
        prevData,
        saveData
    }
}