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
              {{ participant.name }}
              <p>CPF: {{ participant.cpf }}</p>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-5">
            <v-menu
              v-model="date"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Data do evento *"
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateEvent"
                :return-value.sync="minDate"
                :min="minDate"
              ></v-date-picker>
            </v-menu>
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
            @click="saveAttendance"
          >
            <span>Salvar</span>
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  name: "RegisterAttendanceModal",
  data() {
    return {
      isOpen: false,
      date: false,
      dateEvent: null,
      snackbar: {
        show: false,
        color: "",
        message: "default",
      },
      attendance: {
        participant_id: "",
        event_date: "",
      },
      parti: {},
      minDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },

    participant: {
      type: Object,
      default: () => {},
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
      return this.dateEvent !== "";
    },

    dateFormatted() {
      return moment(this.dateEvent).isValid()
        ? moment(this.dateEvent).format("DD/MM/YYYY")
        : "";
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },

    messsageSuccess() {
      this.snackbar.show = true;
      this.snackbar.color = "success";
      this.snackbar.message = "Evento cadastrado com sucesso!";
    },

    async saveAttendance() {
      this.attendance.participant_id = this.participant.id;
      this.attendance.event_date = this.dateEvent;

      try {
        await this.$axios.post("/attendance", this.attendance).then(() => {
          this.attendance = {
            participant_id: "",
            event_id: "",
          };
          this.isOpen = false;
        });
        this.messsageSuccess();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
