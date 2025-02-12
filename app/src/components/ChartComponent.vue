<template>
  <q-card class="q-pa-md bg-white rounded-lg shadow-md">
    <canvas ref="chartCanvas" class=""></canvas>
  </q-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "ChartComponent",

  setup() {
    const chartCanvas = ref(null);

    onMounted(() => {
      const ctx = chartCanvas.value.getContext("2d");
      new Chart(ctx, {
        type: "bar", // Tipo de gráfico: bar, line, pie, etc.
        data: {
          labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          datasets: [
            {
              label: "Valores",
              data: [10, 20, 30, 85],
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#EF5350"],
              borderColor: ["#1E88E5", "#43A047", "#FB8C00", "#E53935"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "GRÁFICO DESPESAS",
            },
          },
        },
      });
    });

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
.q-card {
  max-width: 848px;
  max-height: none;
  margin: auto;
}
</style>
