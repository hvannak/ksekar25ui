<template>
    <div class="container-fluid my-3">
        <div class="card p-3">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">{{localizeProperty(localizationList,'title')}}</th>
                    <th scope="col">{{localizeProperty(localizationList,'currency')}}</th>
                    <th scope="col">{{localizeProperty(localizationList,'price')}}</th>
                    <th scope="col">{{localizeProperty(localizationList,'quantity')}}</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in productList" :key="item">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{item.title}}</td>
                    <td>{{item.currency.symbol}}</td>
                    <td>{{item.price}}</td>
                    <td><input v-model="item.qty" class="form-control form-control-sm" type="number"></td>
                    <td><button @click="removeProduct(item)" type="button" class="btn btn-success">X</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="row py-3">
                <div class="col">
                    <input v-model="email" class="form-control" type="text" placeholder="email">
                </div>
                <div class="col">
                    <button type="button" class="btn btn-success mx-3">{{localizeProperty(localizationList,'quotation')}}</button>
                    
                    <button type="button" class="btn btn-success mx-auto"><i class="fab fa-telegram fa-1x iconline"></i></button>
                </div>               
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import useRepositories from "../utility/uirepositories";
import {localizeProperty} from "../utility/helper";

export default ({
    setup() {
        const { store,addRemoveCard } = useRepositories([],[]);
        const email = "";
        const removeProduct = (item) =>{
            addRemoveCard("removeProductCard",item)
        }
        return {
            productList: computed(() => store.getters.getproductCardList),
            localizationList: computed(() => store.getters.getlocalizationList),
            localizeProperty,
            removeProduct,
            email
        }
    },
})
</script>
