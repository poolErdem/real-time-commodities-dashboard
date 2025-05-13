import asyncio
import websockets
import json
import random
import time

# Emtia fiyatları simülasyonu
def generate_commodity_data():
    commodities = ['Altın', 'Gümüş', 'Petrol', 'Bakır', 'Doğal Gaz']
    prices = [random.uniform(1000, 2000), random.uniform(10, 50), random.uniform(60, 100), random.uniform(4, 10), random.uniform(2, 6)]
    commodity_data = {commodities[i]: prices[i] for i in range(len(commodities))}
    return commodity_data

# WebSocket bağlantısını kabul etme ve işlem yapma
async def handle_connection(websocket, path):
    print("Yeni bağlantı var!")
    try:
        while True:
            # Emtia fiyatlarını oluştur
            data = generate_commodity_data()

            # Fiyat verisini JSON formatında gönder
            response = {"data": data}
            await websocket.send(json.dumps(response))
            
            # 5 saniye bekle
            await asyncio.sleep(10)
            
    except websockets.exceptions.ConnectionClosed:
        print("Bağlantı kapandı!")

# WebSocket sunucusunu başlatma
async def main():
    server = await websockets.serve(handle_connection, "localhost", 8765)
    print("Sunucu başlatıldı: ws://localhost:8765")
    await server.wait_closed()

# Asenkron başlatma
if __name__ == "__main__":
    asyncio.run(main())
