<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" class="pb-5 pt-5">
        <v-btn
          class="white--text text-none"
          color="green"
          @click="openRegisterOrEditParticipantModal('create')"
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
    <div v-for="participant in participants" :key="participant.id">
      <v-row no-gutters class="item-text">
        <v-col cols="3" class="pl-4 pt-4">
          {{ participant.name }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ participant.cpf }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ participant.email }}
        </v-col>
        <v-col cols="2" class="pl-5 pt-4">
          {{ participant.event }}
        </v-col>
        <v-col cols="1" class="pl-2 pt-4">
          <v-btn
            color="primary"
            text
            @click="openRegisterOrEditParticipantModal('edit')"
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
          <v-btn
            color="green"
            text
            @click="openRegisterAttendanceModal(participant)"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
        <v-divider color="grey" class="divider-point"></v-divider>
      </v-row>
    </div>
    <register-participant-modal
      :dialog="registerOrEditParticipantModal"
      @update="getParticipants"
      @close="registerOrEditParticipantModal = false"
    ></register-participant-modal>
    <register-attendance-modal
      :dialog="registerAttendanceModal"
      :participant="participant"
      @close="registerAttendanceModal = false"
    ></register-attendance-modal>
    <confirmation-modal
      :dialog="deleteModal"
      :title-modal="'Deletar participante'"
      :text-description-modal="'Deseja realmente deletar o participante? Essa ação não poderá ser desfeita.'"
      @close="deleteModal = false"
    ></confirmation-modal>
  </div>
</template>

<script>
import moment from "moment";
import RegisterParticipantModal from "@/components/Modals/RegisterParticipantModal.vue";
import RegisterAttendanceModal from "@/components/Modals/RegisterAttendanceModal.vue";
import ConfirmationModal from "@/components/Modals/ConfirmationModal.vue";
export default {
  name: "ParticipantList",

  data() {
    return {
      registerOrEditParticipantModal: false,
      registerAttendanceModal: false,
      deleteModal: false,
      participants: [],
      participant: {},
    };
  },

  components: {
    RegisterParticipantModal,
    RegisterAttendanceModal,
    ConfirmationModal,
  },

  created() {
    this.getParticipants();
  },

  computed: {
    evendId() {
      return this.$route.query && this.$route.query.event_id;
    },
  },

  methods: {
    async getParticipants() {
      console.log(this.$route.query.event_id);
      try {
        const response = await this.$axios.get(
          "/participants/" + "?event_id=" + this.$route.query.event_id
        );
        this.participants = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    openRegisterOrEditParticipantModal(action) {
      if (action === "edit") {
        // FIXME: Action not solicited in the test
        alert(
          "Unsolicited action on test!, the edit modal will open, but it will not be possible to edit."
        );
      }

      this.registerOrEditParticipantModal = true;
    },

    openRegisterAttendanceModal(participant) {
      this.participant = participant;
      this.registerAttendanceModal = true;
    },

    openDeleteModal() {
      this.deleteModal = true;
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
