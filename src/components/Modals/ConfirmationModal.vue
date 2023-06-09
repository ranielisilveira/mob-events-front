<template>
  <v-dialog v-model="isOpen" width="400" persistent @keydown.esc="close">
    <template #activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>{{ titleModal }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="gray" @click="close" right>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <v-row no-gutters class="pt-5">
          <v-col cols="12">
            {{ textDescriptionModal }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn class="black--text text-none" color="gray" button @click="close"
          >Não
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text text-none"
          color="green"
          button
          @click="confirm"
          >Sim</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationModal",
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

    titleModal: {
      type: String,
      default: "",
    },

    textDescriptionModal: {
      type: String,
      default: "",
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

    confirm() {
      this.$emit("confirm");
      this.close();
    },
  },
};
</script>
