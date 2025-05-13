const socket = new WebSocket('ws://localhost:8765');

socket.onopen = () => {
  console.log('WebSocket bağlantısı kuruldu.');
  socket.send('Merhaba Backend!');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Gelen veri:', data);
};

socket.onerror = (error) => {
  console.error('WebSocket hatası:', error);
  // Burada yeniden bağlantı kurmayı düşünebilirsiniz
};

socket.onclose = () => {
  console.log('WebSocket bağlantısı kapandı.');
  // Bağlantı kapanırsa yeniden bağlanmayı deneyebilirsiniz
};

export default socket;
