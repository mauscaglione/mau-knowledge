<template>
    <div class="category-admin">
        <b-form>
            <input type="hidden" id="category-id" v-model="category.id"/>
            <b-form-group label="Nome:" label-for="category-name">
                <b-form-input id="category-name" type="text" 
                    placeholder="Informe o nome da categoria:"
                    v-model="category.name" required :readonly="mode==='remove'">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Categoria Pai" laber-for="category-parentId">
                <b-form-select v-if="mode === 'save'" 
                    v-model="category.parentId" id="category-parentId" 
                    :options="categories"/>
                <b-form-input v-else id="category-parentId" type="text"
                    v-model="category.path" readonly />
            </b-form-group>
            <b-button variant="primary" v-if="mode==='save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode=== 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item,'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "CategoryAdmin",
    data: () => {
        return {
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'path', label: 'Caminho', sortable: true},
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
               // this.categories = res.data
               //add two more keys to the category received in the requisition
               this.categories = res.data.map(category => {
                   return { ...category, value: category.id, text: category.path}
               })
            })
        },
        reset(){
            this.mode = 'save',
            this.category = {},
            this.loadCategories()

        },
        save(){
            const method = this.category.id ? 'put' : 'post';
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
                .then(()=> {
                    this.$toasted.global.defaultSuccess();
                    this.reset()
                })
                .catch(showError)
        },
        remove(){
            axios.delete(`${baseApiUrl}/categories/${this.category.id}`)
                .then(()=> {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCategory(category, mode='save'){
            this.mode = mode
            this.category = { ...category }
        }
    },
    mounted(){
        this.loadCategories()
    }
}
</script>

<style>

</style>