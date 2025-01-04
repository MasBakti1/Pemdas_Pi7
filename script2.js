async function fetchHistoryData() {
    try {
      const response = await fetch('http://127.0.0.1:5000/history_data');
      const history = await response.json();
  
      const historyTable = document.querySelector('#historyTable tbody');
      historyTable.innerHTML = history.map(row => `
        <tr>
          <td>${row.temperature}&deg;C</td>
          <td>${row.humidity}%</td>
          <td>${row.gas_detected ? 'Ya' : 'Tidak'}</td>
          <td>${row.flame_detected ? 'Ya' : 'Tidak'}</td>
          <td>${row.timestamp}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Gagal mengambil riwayat data:', error);
    }
  }
  
  setInterval(fetchHistoryData, 5000);