new Vue({
    el: '#app',
    data: {
      description: '',
      amount: 0,
      type: 'ingreso',
      transactions: [],
      balance: 0
    },
    methods: {
      addTransaction() {
        if (this.description && this.amount) {
          this.transactions.push({
            id: Date.now(),
            description: this.description,
            amount: this.amount,
            type: this.type
          });
          this.updateBalance();
          this.updateChart();
          this.description = '';
          this.amount = 0;
          this.type = 'ingreso';
        }
      },
      updateBalance() {
        this.balance = this.transactions.reduce((total, transaction) => {
          return transaction.type === 'ingreso' ? total + transaction.amount : total - transaction.amount;
        }, 0);
      },
      updateChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        if (this.chart) {
          this.chart.destroy();
        }
  
        const labels = [...new Set(this.transactions.map(t => t.description))];
        const ingresos = labels.map(label => {
          const transaction = this.transactions.find(t => t.description === label && t.type === 'ingreso');
          return transaction ? transaction.amount : 0;
        });
        const gastos = labels.map(label => {
          const transaction = this.transactions.find(t => t.description === label && t.type === 'gasto');
          return transaction ? transaction.amount : 0;
        });
  
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Ingresos',
                data: ingresos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              },
              {
                label: 'Gastos',
                data: gastos,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    },
    mounted() {
      this.chart = null;
    }
  });
    