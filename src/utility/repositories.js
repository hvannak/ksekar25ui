import { ref } from 'vue'
import { useStore } from "vuex";

export default function useRepositories() {
    const store = useStore();
    const sortIcon = ref('sort-up');
    const pageObj = {
        pageSize: 2,
        page: 1,
        sortBy: "_id",
        sortType: "asc",
        searchObjby: "0",
        searchObj: "",
      };
    return {
        sortIcon,
        pageObj,
        store
    }
}