<template>
  <v-dialog v-model="isOpen" width="400" persistent @keydown.esc="close">
    <template #activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Deletar participante</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="gray" @click="close" right>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <v-row no-gutters class="pt-5">
          <v-col md="6" sm="12" xs="12" offset-md="3">
            Você deseja mesmo deletar o participante?
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn class="black--text text-none" color="gray" button @click="close"
          >Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="white--text text-none" color="red" button @click="confirm"
          >Deletar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteModal",
  data() {
    return {
      isOpen: false,
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
