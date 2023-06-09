<template>
  <v-row class="pt-8">
    <v-col md="6" sm="12" xs="12" offset-md="3">
      <v-text-field
        v-model="event.name"
        label="Nome *"
        outlined
        dense
      ></v-text-field>
    </v-col>
    <v-col md="6" offset-md="3">
      <v-menu
        v-model="startEvent"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startEventFormatted"
            label="Data inicial *"
            readonly
            dense
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="event.start_event"
          :return-value.sync="event.start_event"
          :min="minDate"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col md="6" sm="12" xs="12" offset-md="3">
      <v-menu
        v-model="endEvent"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endEventFormatted"
            label="Data Final *"
            readonly
            dense
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="event.end_event"
          :return-value.sync="event.end_event"
          :min="minDate"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col md="6" sm="12" xs="12" offset-md="5" offset-sm="4">
      <v-snackbar v-model="snackbar.show" :timeout="3000">
        {{ snackbar.message }}
      </v-snackbar>

      <v-btn
        :disabled="!isFilled"
        class="white--text text-none"
        color="green"
        @click="saveEvent"
      >
        <span>Salvar</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  name: "RegisterEvent",

  data() {
    return {
      startEvent: false,
      endEvent: false,
      snackbar: {
        show: false,
        color: "",
        message: "default",
      },
      event: {
        name: "",
        start_event: "",
        end_event: "",
      },
      minDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },

  computed: {
    isFilled() {
      return (
        (this.event.name &&
          this.event.start_event &&
          this.event.end_event &&
          moment(this.event.end_event).isAfter(this.event.start_event)) ||
        moment(this.event.end_event).isSame(this.event.start_event)
      );
    },

    startEventFormatted() {
      return this.event.start_event
        ? moment(this.event.start_event).format("DD/MM/YYYY")
        : "";
    },

    endEventFormatted() {
      return this.event.end_event
        ? moment(this.event.end_event).format("DD/MM/YYYY")
        : "";
    },
  },

  methods: {
    messsageSuccess() {
      this.snackbar.show = true;
      this.snackbar.color = "success";
      this.snackbar.message = "Evento cadastrado com sucesso!";
    },

    async saveEvent() {
      try {
        await this.$axios.post("/events", this.event).then(() => {
          this.event = {
            name: "",
            start_event: "",
            end_event: "",
          };
        });
        this.messsageSuccess();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
