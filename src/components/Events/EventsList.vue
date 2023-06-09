<template>
  <v-container>
    <v-card>
      <v-row class="pl-4">
        <v-col cols="3">
          <h1>Eventos</h1>
        </v-col>
        <v-col cols="9" align-self="center">
          <v-btn class="white--text text-none" color="green" to="/create">
            <span class="ml-2">Cadastrar novo</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-card class="ml-3 mt-3 mr-3 mb-3">
        <v-row no-gutters>
          <v-col cols="12" class="fixture-names pl-4 pt-2"> Filtros </v-col>
        </v-row>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Nome do convidado"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-menu v-model="menu1" close-on-content-click max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="null"
                    label="Data inicial"
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
            <v-col cols="3">
              <v-menu v-model="menu1" close-on-content-click max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="null"
                    label="Data Final"
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
            <v-col cols="3">
              <v-text-field
                v-model="search"
                label="Pesquisar"
                append-icon="mdi-magnify"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row no-gutters>
        <v-container>
          <v-row no-gutters>
            <v-col cols="5" class="fixture-names pl-4 pt-2"> Nome </v-col>
            <v-col cols="2" class="fixture-names pl-4 pt-2">
              Data inicio
            </v-col>
            <v-col cols="2" class="fixture-names pl-4 pt-2">
              Data inicio
            </v-col>
            <v-col cols="1" class="fixture-names pl-4 pt-2"> Duração </v-col>
            <v-col cols="1" class="fixture-names pl-4 pt-2"> Editar </v-col>
            <v-col cols="1" class="fixture-names pl-4 pt-2"> Excluir </v-col>
          </v-row>
          <div v-for="event in events" :key="event.id">
            <v-row no-gutters class="item-text">
              <v-col cols="5" class="pl-4 pt-4">
                {{ event.name }}
              </v-col>
              <v-col cols="2" class="pl-5 pt-4">
                {{ formatedDate(event.start_event) }}
              </v-col>
              <v-col cols="2" class="pl-5 pt-4">
                {{ formatedDate(event.end_event) }}
              </v-col>
              <v-col cols="1" class="pl-5 pt-4">
                {{ calculateDuration(event.start_event, event.end_event) }} dias
              </v-col>
              <v-col cols="1" class="pl-2 pt-4">
                <v-btn color="primary" text @click="editEvent(event)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1" class="pl-3 pt-4">
                <v-btn color="error" text @click="openDeleteModal">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider color="grey" class="divider-point"></v-divider>
          </div>
        </v-container>
      </v-row>
    </v-card>
    <confirmation-modal
      :dialog="deleteModal"
      :title-modal="'Deletar participante'"
      :text-description-modal="'Deseja realmente deletar este evento? Essa ação não poderá ser desfeita.'"
      @confirm="deleteEvent"
    ></confirmation-modal>
  </v-container>
</template>

<script>
import moment from "moment";
import ConfirmationModal from "@/components/Modals/ConfirmationModal.vue";
export default {
  name: "EventsList",

  data() {
    return {
      deleteModal: false,
      events: [],
      search: "",
      menu1: false,
      date: null,
    };
  },

  components: {
    ConfirmationModal,
  },

  created() {
    this.getEvents();
  },

  methods: {
    openDeleteModal() {
      this.deleteModal = true;
    },

    async getEvents() {
      try {
        const response = await this.$axios.get("events");
        this.events = response.data;
      } catch (error) {
        console.error(error);
      }
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

    // FIXME: Action and route not solicited in the test
    editEvent() {
      alert(
        "Action not solicited in the test!, You will be redirected but it will not be the id of the event that will be passed"
      );
      this.$router.push({ name: "registers" });
    },

    // FIXME: Action not solicited in the test
    async deleteEvent() {
      alert("Action not solicited in the test!");
      this.deleteModal = false;
      this.getEvents();
      // try {
      //   await this.$axios.delete(`events/${this.event.id}`);
      //   this.deleteModal = false;
      //   this.getEvents();
      // } catch (error) {
      //   this.getEvents();
      //   console.error(error);
      // }
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
