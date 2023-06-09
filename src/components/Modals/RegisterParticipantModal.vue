<template>
  <v-dialog v-model="isOpen" width="780" persistent @keydown.esc="close">
    <template #activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="title-header">
          {{
            participant && participant.id ? "Editar Participante" : "Cadastrar"
          }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon color="gray" @click="close" right>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <v-form>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-text-field
                label="Nome"
                placeholder="Nome: *"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-text-field
                label="CPF"
                placeholder="CPF *"
                outlined
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-text-field
                label="E-mail"
                placeholder="E-mail *"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-col md="6" sm="12" xs="12" offset-md="5" offset-sm="4">
          <v-btn class="white--text text-none" @click="register" :loading="saving" :disabled="!formValid">{{
            participant.id ? "Editar" : "Salvar"
          }}</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterParticipantModal",
  data() {
    return {
      isOpen: false,
      participant: {},
      saving: false,
      formValid: false,
    };
  },

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    dialog(newDialog) {
      this.isOpen = newDialog;
    },

    isOpen(newIsOpen) {
      if (!newIsOpen) {
        this.close();
      }
    },
  },

  methods: {
    close() {
      this.isOpen = false;
    },
  },
};
</script>
