// Inisialisasi Chart.js
let historyChart;

// Fungsi untuk memformat timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp); // Parsing format RFC 1123
  const day = date.getUTCDate().toString().padStart(2, '0'); // Hari
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Bulan
  const year = date.getUTCFullYear(); // Tahun
  const hours = date.getUTCHours().toString().padStart(2, '0'); // Jam UTC
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Menit UTC
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};



const initializeChart = (labels, data) => {
    const ctx = document.getElementById('historyChart').getContext('2d');
    historyChart = new Chart(ctx, {
        type: 'line', // Jenis chart (line, bar, pie, dll.)
        data: {
            labels: labels, // Label untuk sumbu x (waktu)
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: data.temperature, // Data suhu
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1,
                    tension: 0.4, // Membuat garis halus
                },
                {
                    label: 'Humidity (%)',
                    data: data.humidity, // Data kelembapan
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Timestamp',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value',
                    },
                    beginAtZero: true,
                },
            },
        },
    });
};

// Fungsi untuk memperbarui chart
const updateChart = (labels, data) => {
    historyChart.data.labels = labels; // Perbarui label
    historyChart.data.datasets[0].data = data.temperature; // Perbarui suhu
    historyChart.data.datasets[1].data = data.humidity; // Perbarui kelembapan
    historyChart.update(); // Terapkan perubahan
};

// Ambil data dan perbarui chart
async function fetchHistoryDataForChart() {
    try {
        const response = await fetch('http://127.0.0.1:5000/history_data');
        const history = await response.json();

        // Filter 10 data terbaru
        const recentData = history.slice(0, 10);

        // Pisahkan data untuk chart
        const labels = recentData.map(row => formatTimestamp(row.timestamp));
        const data = {
            temperature: recentData.map(row => row.temperature),
            humidity: recentData.map(row => row.humidity),
        };

        // Jika chart belum diinisialisasi, buat baru
        if (!historyChart) {
            initializeChart(labels, data);
        } else {
            // Jika sudah ada, perbarui datanya
            updateChart(labels, data);
        }
    } catch (error) {
        console.error('Gagal mengambil riwayat data untuk chart:', error);
    }
}

// Perbarui chart setiap 5 detik
setInterval(fetchHistoryDataForChart, 5000);
