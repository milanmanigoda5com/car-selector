<template>
  <div class="car-selector">
    <h1>Select a Vehicle</h1>

    <!-- Year Dropdown -->
    <div>
      <!-- <label for="year">Year:</label> -->
      <select
        v-model="selectedYear"
        @change="fetchMakes"
        :disabled="years.length === 0"
      >
        <option value="" disabled>Select Year</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year.year }}
        </option>
      </select>
    </div>

    <!-- Make Dropdown -->
    <div>
      <!-- <label for="make">Make:</label> -->
      <select
        v-model="selectedMake"
        @change="fetchModels"
        :disabled="makes.length === 0"
      >
        <option value="" disabled>Select Make</option>
        <option v-for="make in makes" :key="make" :value="make">
          {{ make.make }}
        </option>
      </select>
    </div>

    <!-- Model Dropdown -->
    <div>
      <!-- <label for="model">Model:</label> -->
      <select v-model="selectedModel" :disabled="models.length === 0">
        <option value="" disabled>Select Model</option>
        <option v-for="model in models" :key="model" :value="model">
          {{ model.model }}
        </option>
      </select>
    </div>

    <!-- Display the selection -->
    <div v-if="selectedYear && selectedMake && selectedModel">
      <p>
        You selected: {{ selectedYear.year }} {{ selectedMake.make }}
        {{ selectedModel.model }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      years: [],
      makes: [],
      models: [],
      selectedYear: "",
      selectedMake: "",
      selectedModel: "",
    };
  },
  mounted() {
    this.fetchYears();
    // this.fetchMakes();
    // this.fetchModels();
  },
  methods: {
    async fetchYears() {
      // "https://rateengine.ship.cars/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef",
      const isProduction = import.meta.env.PROD;
      const apiBaseURL = isProduction ? "https://rateengine.ship.cars" : "/api";

      const apiUrl = `${apiBaseURL}/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`;
      //  "api/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef",
      const newApi =
        "https://rateengine.ship.cars/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef";
      try {
        const response = await axios.get(newApi, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        this.years = response.data;
      } catch (error) {
        console.error("Error fetching years:", error);
        console.log("Error fetching years:", error);
        //  alert("Could not load years. Please try again later.");
      }
    },
    async fetchMakes() {
      try {
        console.log(this.selectedYear.year, "selected year");
        const response = await axios.get(
          `api/v2/vehicles/makes/?year=${this.selectedYear.year}&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        this.makes = response.data;
        this.models = []; // Reset models when make is updated
        this.selectedMake = "";
        this.selectedModel = "";
      } catch (error) {
        console.error("Error fetching makes:", error);
        //  alert("Could not load makes. Please try again later.");
      }
    },
    async fetchModels() {
      console.log(this.selectedMake, "selected make");

      try {
        const response = await axios.get(
          `api/v2/vehicles/models/?year=${this.selectedYear.year}&make=${this.selectedMake.make}&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        this.models = response.data;
        this.selectedModel = "";
      } catch (error) {
        console.error("Error fetching models:", error);
        // alert("Could not load models. Please try again later.");
      }
    },
  },
};
</script>

<style scoped>
.car-selector {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
select {
  display: block;
  margin-bottom: 1rem;
}
</style>
