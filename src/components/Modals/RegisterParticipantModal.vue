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
                v-model="participant.name"
                label="Nome *"
                placeholder="Nome:"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-text-field
                v-model="participant.cpf"
                label="CPF *"
                placeholder="CPF"
                outlined
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-col md="6" sm="12" xs="12" offset-md="3">
              <v-text-field
                v-model="participant.email"
                label="E-mail *"
                placeholder="E-mail"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col md="6" sm="12" xs="12" offset-md="5" offset-sm="4">
          <v-snackbar v-model="snackbar.show" :timeout="3000">
            {{ snackbar.message }}
          </v-snackbar>

          <v-btn
            :disabled="!isFilled"
            class="white--text text-none"
            color="green"
            @click="register"
            >{{ participant && participant.id ? "Editar" : "Salvar" }}</v-btn
          >
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
      saving: false,
      formValid: false,
      participant: {
        name: "",
        cpf: "",
        email: "",
        event_id: "",
      },
      snackbar: {
        show: false,
        color: "",
        message: "default",
      },
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

  computed: {
    isFilled() {
      return (
        this.participant.name &&
        this.participant.cpf.length == 11 &&
        this.participant.email
      );
    },

    eventId() {
      return this.$route.query.event_id;
    },
  },

  methods: {
    messsageSuccess() {
      this.snackbar.show = true;
      this.snackbar.color = "success";
      this.snackbar.message = "Participante cadastrado com sucesso!";
    },

    close() {
      this.$emit("close");
    },

    async register() {
      console.log(this.participant);
      console.log(this.eventId);
      this.participant.event_id = this.eventId;
      try {
        await this.$axios.post("/participants", this.participant);
        this.participant = {
          name: "",
          cpf: "",
          email: "",
        };
        this.messsageSuccess();
        this.$emit("update");
        this.close();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
