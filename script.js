// Fungsi untuk melakukan fetching data dari endpoint
async function fetchSensorData() {
  try {
    // Kirim permintaan GET ke endpoint
    const response = await fetch("http://127.0.0.1:5000/sensor_data");

    // Periksa apakah respons berhasil
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parsing data ke format JSON
    const data = await response.json();

    // Menampilkan data di console
    console.log("Data Sensor:", data);

    // Mengembalikan data untuk diproses lebih lanjut
    return data;
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("Terjadi kesalahan saat fetching data:", error);
  }
}
let a = document.createElement("h1");
let b = document.querySelector("body");
let c = document.createElement("h1");
b.appendChild(a);
b.appendChild(c);
async function tampildata() {
  const data = await fetchSensorData();
  a.textContent = `humidity : ${data.humidity}`;
  c.textContent = `temperatur : ${data.temperature}`;
}

setInterval(tampildata, 1000);
