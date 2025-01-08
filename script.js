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
  // Fungsi untuk menampilkan data ke dalam tabel dan elemen tertentu
async function tampildata() {
  const data = await fetchSensorData();

  // Cek apakah data berhasil di-fetch
  if (!data) {
      console.error("Data tidak tersedia.");
      return;
  }

   // Menentukan kondisi "Aman" atau "Bahaya" untuk setiap sensor
   const isTemperatureDangerous = data.temperature > 50;
   const isHumidityDangerous = data.humidity > 70;
   const isGasDetectedDangerous = data.gas_detected == 1;
   const isFlameDetectedDangerous = data.flame_detected == 1;
 
   // Gabungkan semua kondisi untuk menentukan status keseluruhan
   const overallStatus = (isTemperatureDangerous || isHumidityDangerous || isGasDetectedDangerous || isFlameDetectedDangerous) ? "Bahaya" : "Aman";

  const rows = [
      { sensor: "Humidity", value: data.humidity, status: data.humidity > 70 ? "Bahaya" : "Aman" },
      { sensor: "Temperature", value: data.temperature, status: data.temperature > 50 ? "Bahaya" : "Aman" },
      { sensor: "Gas Detected", value: data.gas_detected, status: data.gas_detected == 1 ? "Bahaya" : "Aman" },
      { sensor: "Fire Detected", value: data.flame_detected, status: data.flame_detected == 1 ? "Bahaya" : "Aman" }
  ];


  // Perbarui elemen dengan ID temperatureVal
  const temperatureElement = document.getElementById("temperatureVal");
  const humidityElement = document.getElementById("humidityVal");
  const gasElement = document.getElementById("gasVal");
  const flameElement = document.getElementById("flameVal");
  const statusElement = document.getElementById("overallStatus");
  if (statusElement) {
    statusElement.textContent = overallStatus;
  }
  if (temperatureElement) {
      temperatureElement.textContent = `${data.temperature || "N/A"}°C`;
  }
  if (humidityElement) {
      humidityElement.textContent = `${data.humidity || "N/A"}%`;
  }
  if (gasElement) {
      gasElement.textContent = `${data.gas_detected || "false"}`;
  }
  if (flameElement) {
      flameElement.textContent = `${data.flame_detected || "false"}`;
  }
}

  setInterval(tampildata, 1000);