import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Carga del JSON generado por Mockaroo (puedes también usar fetch si lo tienes en public/)
    fetch('/mock-data.json') // asegúrate de colocarlo en /public
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error cargando datos:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas Médicas del Usuario</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl mb-2">Frecuencia Cardíaca</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[50, 130]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl mb-2">Saturación de Oxígeno</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[85, 105]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="oxygen_saturation" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Puedes seguir agregando más gráficas como temperatura o presión arterial */}
      </div>
    </div>
  );
};

export default Dashboard;
