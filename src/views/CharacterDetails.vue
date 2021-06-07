<template>
  <div>
    <div class="mb-4">
      <a v-if="showHistoryBack" @click.prevent="$router.back()">
        <i class="fas fa-arrow-left"></i> back to {{ historyBackTo }}
      </a>
    </div>
    <div class="columns" v-if="character">
      <div class="column is-one-third">
        <div class="box has-text-centered">
          <img :alt="character.name" :src="character.image" />
        </div>
      </div>
      <div class="column">
        <div class="box content">
          <h1>{{ character.name }}</h1>
          <p v-if="character.type">
            Type: <strong>{{ character.type }}</strong>
          </p>
          <p>
            Species: <strong>{{ character.species }}</strong>
          </p>
          <p>
            Gender: <strong>{{ character.gender }}</strong>
          </p>
          <p v-if="character.origin">
            Location of origin:
            <strong
              ><router-link :to="'/locations/' + character.origin.id"
                >{{ character.origin.name }}
              </router-link>
            </strong>
          </p>
          <p v-if="character.location">
            Last known location:
            <strong
              ><router-link :to="'/locations/' + character.location.id"
                >{{ character.location.name }}
              </router-link>
            </strong>
          </p>
          <div v-if="character.location">
            <p>Episodes:</p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in character.episode" :key="e.id">
                  <td>
                    <router-link :to="'/episodes/' + e.id">{{
                      e.episode
                    }}</router-link>
                  </td>
                  <td>{{ e.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="has-text-centered">
      <img
        alt="Loading... Please wait."
        src="../assets/loading.gif"
        v-if="isLoading"
      />
    </div>
  </div>
</template>

<script>
import repository from "@/repositories/characters.js";

export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
      character: null,
      showHistoryBack: false,
      historyBackTo: "",
    };
  },
  methods: {
    async loadCharacter() {
      try {
        this.isLoading = true;
        const response = await repository.fetchCharacter(this.id);
        this.character = response.data.data.character;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadCharacter();
  },
  beforeRouteEnter(_, from, next) {
    next((vm) => {
      vm.historyBackTo = "";
      vm.showHistoryBack =
        from &&
        (from.name === "characters" ||
          from.name === "episode" ||
          from.name === "location");
      if (vm.showHistoryBack) {
        vm.historyBackTo = from.name;
      }
    });
  },
};
</script>
