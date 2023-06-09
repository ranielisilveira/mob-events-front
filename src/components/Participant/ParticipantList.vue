<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" class="pb-5 pt-5">
        <v-btn
          class="white--text text-none"
          color="green"
          @click="openRegisterOrEditParticipantModal"
        >
          <span>Adicionar participante</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3" class="fixture-names pl-4 pt-2">Nome</v-col>
      <v-col cols="2" class="fixture-names pl-4 pt-2">CPF</v-col>
      <v-col cols="2" class="fixture-names pl-4 pt-2">E-mail</v-col>
      <v-col cols="2" class="fixture-names pl-4 pt-2">% participação</v-col>
      <v-col cols="1" class="fixture-names pl-4 pt-2">Editar</v-col>
      <v-col cols="1" class="fixture-names pl-4 pt-2">Excluir</v-col>
      <v-col cols="1" class="fixture-names pl-4 pt-2">Adc. Presença</v-col>
    </v-row>
    <div v-for="event in events" :key="event.id">
      <v-row no-gutters class="item-text">
        <v-col cols="3" class="pl-4 pt-4">
          {{ event.title }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ formatedDate(event.start_event) }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ formatedDate(event.end_event) }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ calculateDuration(event.start_event, event.end_event) }} dias
        </v-col>
        <v-col cols="1" class="pl-2 pt-4">
          <v-btn
            color="primary"
            text
            @click="openRegisterOrEditParticipantModal"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="pl-3 pt-4">
          <v-btn color="error" text @click="openDeleteModal">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="pl-3 pt-4">
          <v-btn color="green" text @click="openRegisterAttendanceModal">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider color="grey" class="divider-point"></v-divider>
    </div>
    <register-participant-modal
      :dialog="registerOrEditParticipantModal"
    ></register-participant-modal>
    <register-attendance-modal
      :dialog="registerAttendanceModal"
    ></register-attendance-modal>
    <delete-modal :dialog="deleteModal"></delete-modal>
  </div>
</template>

<script>
import moment from "moment";
import RegisterParticipantModal from "@/components/Modals/RegisterParticipantModal.vue";
import RegisterAttendanceModal from "@/components/Modals/RegisterAttendanceModal.vue";
import DeleteModal from "@/components/Modals/DeleteModal.vue";
export default {
  name: "ParticipantList",

  data() {
    return {
      registerOrEditParticipantModal: false,
      registerAttendanceModal: false,
      deleteModal: false,
      events: [
        {
          id: 1,
          title: "Evento 1",
          start_event: "2021-08-01 00:00:00",
          end_event: "2021-08-03 00:00:00",
        },
        {
          id: 2,
          title: "Evento 2",
          start_event: "2021-07-01",
          end_event: "2021-08-01",
        },
        {
          id: 3,
          title: "Evento 3",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 4,
          title: "Evento 4",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 5,
          title: "Evento 5",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 6,
          title: "Evento 6",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 7,
          title: "Evento 7",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 8,
          title: "Evento 8",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 9,
          title: "Evento 9",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 10,
          title: "Evento 10",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
        {
          id: 11,
          title: "Evento 11",
          start_event: "2021-08-01",
          end_event: "2021-08-01",
        },
      ],
    };
  },

  components: {
    RegisterParticipantModal,
    RegisterAttendanceModal,
    DeleteModal,
  },

  methods: {
    openRegisterOrEditParticipantModal() {
      this.registerOrEditParticipantModal = true;
    },

    openRegisterAttendanceModal() {
      this.registerAttendanceModal = true;
    },

    openDeleteModal() {
      this.deleteModal = true;
    },

    computedDateFormattedMomentjs(date) {
      const dateFormated = moment(date).format("DD/MM/YYYY");
      return dateFormated;
    },

    calculateDuration(start, end) {
      const startEvent = moment(start);
      const endEvent = moment(end);
      const duration = moment.duration(endEvent.diff(startEvent));
      const days = duration.asDays();
      return days;
    },

    formatedDate(date) {
      const dateFormated = moment(date).format("DD/MM/YYYY");
      return dateFormated;
    },
  },
};
</script>

<style scoped>
.fixture-names {
  font-size: 1.2rem;
  font-weight: 500;
  color: #060452;
}

.divider-point {
  margin: 10px;
  margin-bottom: 15px;
}

.item-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #69686e;
}
</style>
