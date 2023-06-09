<template>
  <v-dialog v-model="isOpen" width="780" persistent @keydown.esc="close">
    <template #activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title> Adicionar presença </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="gray" @click="close" right>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <v-form>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              Nome dele
              <p>CPF dele</p>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-menu v-model="menu1" close-on-content-click max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="null"
                    label="Data"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-col md="6" sm="12" xs="12" offset-md="5" offset-sm="4">
          <v-btn
            class="white--text text-none"
            @click="register"
            :loading="saving"
            :disabled="!formValid"
            >Salvar</v-btn
          >
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterAttendanceModal",
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
