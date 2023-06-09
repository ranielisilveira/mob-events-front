<template>
  <v-row no-gutters>
    <v-col cols="12" class="fixture-names pl-4 pt-2">
      <v-tabs v-model="tab" slider-color="blue">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <v-card-text>
              <template v-if="item.tab === 'Evento'">
                <register-event />
              </template>
              <template v-else-if="item.tab === 'Participantes'">
                <participant-list />
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import RegisterEvent from "@/components/Registers/RegisterEvent.vue";
import ParticipantList from "@/components/Participant/ParticipantList.vue";
export default {
  name: "TabsFixtures",
  components: {
    RegisterEvent,
    ParticipantList,
  },

  data() {
    return {
      tab: null,
      items: [
        { tab: "Evento", content: "Tab 1 Content" },
        { tab: "Participantes", content: "Tab 2 Content" },
      ],
    };
  },
};
</script>
