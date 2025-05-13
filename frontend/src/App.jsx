import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [commodityData, setCommodityData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // WebSocket bağlantısını kurma
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = () => {
      console.log("WebSocket bağlantısı kuruldu.");
      setLoading(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCommodityData(data.data);  // Sunucudan gelen emtia fiyatlarını state'e kaydediyoruz
    };

    socket.onerror = (error) => {
      console.error("WebSocket hatası: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket bağlantısı kapandı.");
    };

    return () => {
      socket.close(); // Component unmount olduğunda bağlantıyı kapat
    };
  }, []);

  // Grafik için veri hazırlama
  const plotData = Object.entries(commodityData).map(([commodity, price]) => ({
    x: [commodity],
    y: [price],
    type: 'bar',  // Bar chart için
    name: commodity,
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛢️ Gerçek Zamanlı Emtia Fiyatları</h1>
      {loading ? (
        <p>Veri yükleniyor...</p>
      ) : (
        <div>
          <Plot
            data={plotData}
            layout={{
              title: 'Emtia Fiyatları',
              barmode: 'group', // Bar grafik modunu grupla
              xaxis: { title: 'Emtia' },
              yaxis: { title: 'Fiyat (USD)' },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
