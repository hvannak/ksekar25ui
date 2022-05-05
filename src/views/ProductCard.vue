<template>
    <div class="container-fluid my-3">
        <div class="card p-3" ref="cardui">
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
                    <p>Note: Click pdf to create file and click order to open telegram send us with attach file</p>
                </div>
                <div class="col">
                    <button @click="createPdf()" type="button" class="btn btn-success mx-3">PDF</button>
                    <a href="https://t.me/vannakmedivet" target="_blank">                       
                        <button type="button" class="btn btn-success mx-3"><i class="fab fa-telegram fa-1x iconline"></i>{{localizeProperty(localizationList,'quotation')}}</button>
                    </a>                  
                </div>               
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed } from "vue";
import useRepositories from "../utility/uirepositories";
import {localizeProperty} from "../utility/helper";
// import axios from 'axios';
// import * as apihelper from '../store/modules/api-helper';

export default ({
    setup() {
        const { store,addRemoveCard } = useRepositories([],[]);
        const email = "";
        const cardui = ref(null);
        const removeProduct = (item) =>{
            addRemoveCard("removeProductCard",item)
        };
        const createPdf = async() => {
            let popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
            popupWin.document.open();
            popupWin.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Test Print</title>
                </head>
                <body>

                <h1>My First Heading</h1>
                <p>My first paragraph.</p>

                </body>
                </html>
            `);
            popupWin.document.close();
            popupWin.print();
            popupWin.close();
            // window.print();
            // await axios.post(`${apihelper.api_url}/product/sendemail`,{
            //     'pdf': cardui.value.toString(),
            //     'products': item
            // });
        };
        return {
            productList: computed(() => store.getters.getproductCardList),
            localizationList: computed(() => store.getters.getlocalizationList),
            localizeProperty,
            removeProduct,
            email,
            cardui,
            createPdf           
        }
    },
})
</script>
