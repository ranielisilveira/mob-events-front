<template>
  <v-row class="pt-8">
    <v-col md="6" sm="12" xs="12" offset-md="3">
      <v-text-field label="Nome*" outlined dense></v-text-field>
    </v-col>
    <v-col md="6" offset-md="3">
      <v-menu v-model="menu1" close-on-content-click max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="null"
            label="Data inicial*"
            readonly
            dense
            outlined
            v-bind="attrs"
            v-on="on"
            @click:clear="date = null"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col md="6" sm="12" xs="12" offset-md="3">
      <v-menu v-model="menu1" close-on-content-click max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="null"
            label="Data Final*"
            readonly
            dense
            outlined
            v-bind="attrs"
            v-on="on"
            @click:clear="date = null"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col md="6" sm="12" xs="12" offset-md="5" offset-sm="4">
      <v-btn class="white--text text-none" color="green">
        <span>Salvar</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RegisterEvent",

  data() {
    return {
      menu1: false,
      date: new Date().toISOString().substr(0, 10),
    };
  },
};
</script>
