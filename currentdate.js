const today = new Date();
const formattedDate = today.toLocaleDateString().slice(0, 10);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = daysOfWeek[today.getDay()];

document.getElementById('current_date').textContent = `${formattedDate} (${dayName})`;