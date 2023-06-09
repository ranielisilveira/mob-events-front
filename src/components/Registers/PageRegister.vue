<template>
  <v-container>
    <v-card>
      <v-row class="pl-4">
        <v-col cols="12">
          <v-fab-transition>
            <v-btn bottom top color="blue" to="/">
              <v-icon> mdi-home-circle </v-icon>
            </v-btn>
          </v-fab-transition>
          <h1>Detalhes do Evento</h1>
        </v-col>
      </v-row>
      <tabs-fixtures />
    </v-card>
  </v-container>
</template>

<script>
import TabsFixtures from "../Tabs/TabsFixtures.vue";
export default {
  name: "PageRegister",
  components: {
    TabsFixtures,
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
