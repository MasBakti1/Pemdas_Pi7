async function fetchminmax() {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-min-max");
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

async function maxmin() {
    const data = await fetchminmax();

    // Cek apakah data berhasil di-fetch
    if (!data) {
        console.error("Data tidak tersedia.");
        return;
    }

    // Update the DOM elements with the fetched data
    const temperatureMax = document.getElementById("max_value");
    const temperatureMin = document.getElementById("min_value");
    const humidityMax = document.getElementById("max_hum");
    const humidityMin = document.getElementById("min_hum");

    if (temperatureMax && temperatureMin) {
        temperatureMax.textContent = data.max !== undefined ? data.max : "N/A";
        temperatureMin.textContent = data.min !== undefined ? data.min : "N/A";
    }

    if (humidityMax && humidityMin){
        humidityMax.textContent = data.max_hum !== undefined ? data.max_hum : "N/A";
        humidityMin.textContent = data.min_hum !== undefined ? data.min_hum : "N/A";
    }
} 


// Fetch data every 5 seconds
setInterval(maxmin, 5000);
