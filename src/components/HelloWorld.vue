<template>
  <v-container>
    <v-row class="text-center">
      
      



    </v-row>
    <v-row>
      <v-col >
        <v-text-field
      label="Nombre"
      :rules="rules"
      v-model="nombre"
      hide-details="auto"
    ></v-text-field>

     <v-text-field
      label="Ciudad"
      :rules="rules"
      v-model="ciudad"
      hide-details="auto"
    ></v-text-field>
    <br>
        <v-btn @click="addUser()">Agregar una persona</v-btn>
      </v-col>
    </v-row>
    <v-row >

      <v-data-table
    
      :headers="headers"
      :items="datos"
      class="elevation-1"
     > <template slot="item.borrar" slot-scope="props">
            <v-btn class="mx-2" icon @click="deleteUser(props.item.nombre)">
                <v-icon dark>mdi-delete</v-icon>
               
            </v-btn>
        </template>
    </v-data-table>
     
    </v-row>
  </v-container>
</template>

<script>
import {dbApi} from "../db";

  export default {
    name: 'HelloWorld',

    data: () => ({
      nombre:"",
      ciudad:"",
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      datos:[],
        headers: [
          {
            text: 'nombre',
            value: 'nombre',
          },
          { text: 'ciudad', value: 'ciudad' },
          {value: 'borrar',text: 'borrar'},
        ],
    }),
    created(){
      this.getDocuments()
    
  },
  methods:{
    getDocuments(){
      this.datos=  dbApi.getDocs()
    },
    addUser(){
      dbApi.addPerson(this.nombre,this.ciudad)
      this.getDocuments()
      this.contador++
    
    },
    async deleteUser(nombre){
      await dbApi.delete(nombre)
      this.getDocuments()
    }
  },
 
  }
</script>
