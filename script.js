async function fetchSensorData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/sensor_data");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data Sensor:", data);
      return data;
    } catch (error) {
      console.error("Terjadi kesalahan saat fetching data:", error);
    }
  }

  // Fungsi untuk menampilkan data ke dalam tabel
  async function tampildata() {
    const data = await fetchSensorData();
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Kosongkan tabel sebelum diisi ulang

    const rows = [
      { sensor: "Humidity", value: data.humidity, status: data.humidity > 70 ? "Bahaya" : "Aman" },
      { sensor: "Temperature", value: data.temperature, status: data.temperature > 50 ? "Bahaya" : "Aman" },
      { sensor: "Gas Detected", value: data.gas_detected, status: data.gas_detected == 1 ? "Bahaya" : "Aman" },
      { sensor: "Fire Detected", value: data.flame_detected, status: data.flame_detected == 1 ? "Bahaya" : "Aman" }
    ];

    rows.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.sensor}</td><td>${row.value}</td><td>${row.status}</td>`;
      tableBody.appendChild(tr);
    });
  }

  setInterval(tampildata, 1000);