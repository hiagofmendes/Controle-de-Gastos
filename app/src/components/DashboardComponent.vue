<template>
  <div class="bg-white">
    <div class="p-6 w-full max-h-[800px]">
      <div
        class="max-w-4xl max-h-[746px] mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h1 class="text-2xl font-bold mb-6 text-black">Formulário</h1>

        <!-- Totais -->
        <div
          class="flex justify-between items-center bg-gray-100 p-4 rounded mb-6"
        >
          <div>
            <p class="text-gray-600 text-lg">Total de Receitas</p>
            <p class="text-xl font-bold text-green-600">
              R$ {{ totalRevenue }}
            </p>
          </div>
          <div>
            <p class="text-gray-600 text-lg">Total de Despesas</p>
            <p class="text-xl font-bold text-red-600">R$ {{ totalExpense }}</p>
          </div>
          <div>
            <p class="text-gray-600 text-lg">Saldo</p>
            <p
              class="text-xl font-bold"
              :class="balance >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              R$ {{ balance }}
            </p>
          </div>
        </div>

        <!-- Formulário para adicionar transações -->
        <form @submit.prevent="handleAddTransaction" class="mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              v-model="novaTransacao.description"
              type="text"
              placeholder="Descrição"
              class="border rounded p-2 text-gray-600"
              required
            />
            <input
              v-model.number="novaTransacao.value"
              step="0.01"
              type="number"
              placeholder="Valor (R$)"
              class="border rounded p-2 text-gray-600"
              required
            />
            <select
              v-model="novaTransacao.type"
              class="border rounded p-2 text-gray-600"
              required
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>
          <button
            type="submit"
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
          >
            Adicionar Transação
          </button>
        </form>

        <!-- Tabela de Transações -->
        <div class="max-h-96 overflow-y-auto">
          <table class="w-full text-left border border-gray-300">
            <thead class="bg-gray-300">
              <tr class="text-gray-600">
                <th class="p-2 border-b">Descrição</th>
                <th class="p-2 border-b">Valor</th>
                <th class="p-2 border-b">Tipo</th>
                <th class="p-2 border-b text-black w-20"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transacao, id) in transacoes"
                :key="id"
                class="hover:bg-gray-50"
              >
                <!-- Campos editáveis -->
                <td class="p-2 border-b text-black">
                  <input
                    v-if="transacao.isEditing"
                    v-model="transacao.description"
                    class="border rounded p-1 text-gray-600 w-full"
                  />
                  <span v-else>{{ transacao.description }}</span>
                </td>

                <td class="p-2 border-b">
                  <input
                    v-if="transacao.isEditing"
                    v-model.number="transacao.value"
                    type="number"
                    class="border rounded p-1 text-gray-600 w-full"
                  />
                  <span
                    v-else
                    :class="
                      transacao.type === 'receita'
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                  >
                    R$ {{ transacao.value }}
                  </span>
                </td>

                <td class="p-2 border-b capitalize text-black">
                  <select
                    v-if="transacao.isEditing"
                    v-model="transacao.type"
                    class="border rounded p-1 text-gray-600"
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                  <span v-else>{{ transacao.type }}</span>
                </td>

                <!-- Botões de ação -->
                <td
                  class="p-2 border-b capitalize text-black flex gap-4 text-base"
                >
                  <button @click="toggleEdit(transacao)">
                    <q-icon
                      :name="transacao.isEditing ? 'save' : 'edit'"
                      class="hover:scale-125"
                    ></q-icon>
                  </button>
                  <button @click="handleDeleteTransactions(transacao.id)">
                    <q-icon name="delete" class="hover:scale-125"></q-icon>
                  </button>
                </td>
              </tr>
              <tr v-if="transacoes.length === 0">
                <td colspan="3" class="p-2 text-center text-gray-600">
                  Nenhuma transação registrada
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { api } from "boot/axios";

export default {
  name: "ExpensesForm",

  data() {
    return {
      novaTransacao: { description: "", value: null, type: "receita" },
      transacoes: [],
    };
  },

  computed: {
    totalRevenue() {
      return this.transacoes.filter(t => t.type === "receita").reduce((acc, t) => acc + Number(t.value), 0).toFixed(2);
    },
    totalExpense() {
      return this.transacoes.filter(t => t.type === "despesa").reduce((acc, t) => acc + Number(t.value), 0).toFixed(2);
    },
    balance() {
      return (Number(this.totalRevenue) - Number(this.totalExpense)).toFixed(2);
    },
  },

  methods: {
    async handleAddTransaction() {
      if (!this.novaTransacao.description || !this.novaTransacao.value) return;

      const response = await api.post("http://localhost:3000/transactions", this.novaTransacao);
      this.transacoes.push({ ...response.data, isEditing: false });
      this.novaTransacao = { description: "", value: null, type: "receita" };
      await this.listTransactions();
    },

    async listTransactions() {
      const response = await api.get("http://localhost:3000/listTransactions");
      this.transacoes = response.data.map(transacao => ({ ...transacao, isEditing: false }));
    },

    toggleEdit(transacao) {
      if (transacao.isEditing) {
        this.handleUpdateTransactions(transacao.id);
      }
      transacao.isEditing = !transacao.isEditing;
    },

    async handleUpdateTransactions(id) {
      const transactionToUpdate = this.transacoes.find(t => t.id === id);
      if (!transactionToUpdate) return;

      const updatedTransaction = {
        description: transactionToUpdate.description,
        value: Number(transactionToUpdate.value),
        type: transactionToUpdate.type
      };

      await api.put(`http://localhost:3000/updateTransactions/${id}`, updatedTransaction);
      this.transacoes = this.transacoes.map(t => (t.id === id ? { ...t, ...updatedTransaction, isEditing: false } : t));
    },

    async handleDeleteTransactions(id) {
      await api.delete(`http://localhost:3000/deleteTransactions/${id}`);
      this.transacoes = this.transacoes.filter(t => t.id !== id);
    },
  },

  mounted() {
    this.listTransactions();
  },
};
</script>
