"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Papa from "papaparse"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Activity,
  Droplets,
  Moon,
  Utensils,
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
} from "lucide-react"

// Componente para mostrar estadísticas de salud de un usuario
export default function HealthStatsDashboard({ userData }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    Papa.parse("public/health_data.csv", {
      download: true,
      header: true, // asumiendo que sí tienes encabezados
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          // Tomamos la PRIMERA fila como ejemplo
          const firstRow = results.data[0]

          // Mapeamos esa fila a la estructura anidada
          const transformed = transformRowToHealthData(firstRow)

          setUserData(transformed)
        }
      },
    })
  }, [])

  if (!userData) {
    return <p>Cargando datos...</p>
  }

  return <HealthStatsDashboard userData={userData} />
}

// Aquí definimos la función que recibe el objeto 'row' (una fila del CSV)
// y retorna un objeto con la forma EXACTA que espera el componente:
function transformRowToHealthData(row) {
  return {
    name: row.name,
    age: Number(row.age),
    weight: Number(row.weight),
    height: Number(row.height),
    bmi: Number(row.bmi),
    bloodPressure: {
      systolic: Number(row.bloodPressure_systolic),
      diastolic: Number(row.bloodPressure_diastolic),
      history: [
        {
          date: row.bp_hist_1_date,
          systolic: Number(row.bp_hist_1_systolic),
          diastolic: Number(row.bp_hist_1_diastolic),
        },
        {
          date: row.bp_hist_2_date,
          systolic: Number(row.bp_hist_2_systolic),
          diastolic: Number(row.bp_hist_2_diastolic),
        },
        {
          date: row.bp_hist_3_date,
          systolic: Number(row.bp_hist_3_systolic),
          diastolic: Number(row.bp_hist_3_diastolic),
        },
        {
          date: row.bp_hist_4_date,
          systolic: Number(row.bp_hist_4_systolic),
          diastolic: Number(row.bp_hist_4_diastolic),
        },
      ],
    },
    heartRate: {
      current: Number(row.heartRate_current),
      resting: Number(row.heartRate_resting),
      max: Number(row.heartRate_max),
      history: [
        Number(row.hr_history_1),
        Number(row.hr_history_2),
        Number(row.hr_history_3),
        Number(row.hr_history_4),
        Number(row.hr_history_5),
        Number(row.hr_history_6),
      ],
    },
    sleep: {
      average: Number(row.sleep_average),
      deep: Number(row.sleep_deep),
      light: Number(row.sleep_light),
      rem: Number(row.sleep_rem),
      history: [
        Number(row.sleep_hist_1),
        Number(row.sleep_hist_2),
        Number(row.sleep_hist_3),
        Number(row.sleep_hist_4),
        Number(row.sleep_hist_5),
        Number(row.sleep_hist_6),
        Number(row.sleep_hist_7),
      ],
    },
    activity: {
      steps: Number(row.activity_steps),
      stepsGoal: Number(row.activity_stepsGoal),
      caloriesBurned: Number(row.activity_caloriesBurned),
      caloriesGoal: Number(row.activity_caloriesGoal),
      activeMinutes: Number(row.activity_activeMinutes),
      activeMinutesGoal: Number(row.activity_activeMinutesGoal),
    },
    hydration: {
      current: Number(row.hydration_current),
      goal: Number(row.hydration_goal),
      history: [
        Number(row.hydration_hist_1),
        Number(row.hydration_hist_2),
        Number(row.hydration_hist_3),
        Number(row.hydration_hist_4),
        Number(row.hydration_hist_5),
        Number(row.hydration_hist_6),
        Number(row.hydration_hist_7),
      ],
    },
    nutrition: {
      calories: Number(row.nutrition_calories),
      caloriesGoal: Number(row.nutrition_caloriesGoal),
      protein: Number(row.nutrition_protein),
      proteinGoal: Number(row.nutrition_proteinGoal),
      carbs: Number(row.nutrition_carbs),
      carbsGoal: Number(row.nutrition_carbsGoal),
      fat: Number(row.nutrition_fat),
      fatGoal: Number(row.nutrition_fatGoal),
    },
    medicalConditions: [
      row.medicalCondition_1,
      row.medicalCondition_2,
    ],
    medications: [
      {
        name: row.meds_1_name,
        dosage: row.meds_1_dosage,
        frequency: row.meds_1_frequency,
      },
      {
        name: row.meds_2_name,
        dosage: row.meds_2_dosage,
        frequency: row.meds_2_frequency,
      },
    ],
    recentMeasurements: [
      {
        date: row.recentMeas_1_date,
        type: row.recentMeas_1_type,
        value: row.recentMeas_1_value,
      },
      {
        date: row.recentMeas_2_date,
        type: row.recentMeas_2_type,
        value: row.recentMeas_2_value,
      },
      {
        date: row.recentMeas_3_date,
        type: row.recentMeas_3_type,
        value: row.recentMeas_3_value,
      },
    ],
  }


  // Calcular el porcentaje para las barras de progreso
  const calculatePercentage = (current, goal) => {
    return Math.min(Math.round((current / goal) * 100), 100)
  }

  // Determinar el color basado en el valor y los rangos saludables
  const getHealthStatusColor = (type, value) => {
    switch (type) {
      case "bloodPressure":
        // Sistólica
        if (value < 120) return "text-green-500"
        if (value < 130) return "text-blue-500" // Elevada
        if (value < 140) return "text-yellow-500" // Hipertensión Etapa 1
        return "text-red-500" // Hipertensión Etapa 2+
      case "heartRate":
        if (value < 60) return "text-yellow-500" // Bradicardia
        if (value <= 100) return "text-green-500" // Normal
        return "text-red-500" // Taquicardia
      case "bmi":
        if (value < 18.5) return "text-yellow-500" // Bajo peso
        if (value < 25) return "text-green-500" // Normal
        if (value < 30) return "text-yellow-500" // Sobrepeso
        return "text-red-500" // Obesidad
      default:
        return "text-blue-500"
    }
  }

  // Determinar si un valor está mejorando, empeorando o estable
  const getTrend = (history, lowerIsBetter = false) => {
    if (!history || history.length < 2) return "stable"

    const latest =
      typeof history[history.length - 1] === "object"
        ? history[history.length - 1].systolic
        : history[history.length - 1]

    const previous =
      typeof history[history.length - 2] === "object"
        ? history[history.length - 2].systolic
        : history[history.length - 2]

    if (lowerIsBetter) {
      return latest < previous ? "improving" : latest > previous ? "worsening" : "stable"
    } else {
      return latest > previous ? "improving" : latest < previous ? "worsening" : "stable"
    }
  }

  // Componente para mostrar el indicador de tendencia
  const TrendIndicator = ({ trend, lowerIsBetter = false }) => {
    // Invertir la lógica si valores más bajos son mejores
    if (lowerIsBetter) {
      trend = trend === "improving" ? "worsening" : trend === "worsening" ? "improving" : trend
    }

    return (
      <div
        className={`flex items-center ${
          trend === "improving" ? "text-green-500" : trend === "worsening" ? "text-red-500" : "text-gray-500"
        }`}
      >
        {trend === "improving" && <TrendingUp className="h-4 w-4 mr-1" />}
        {trend === "worsening" && <TrendingDown className="h-4 w-4 mr-1" />}
        {trend === "stable" && <div className="h-4 w-4 mr-1 border-t-2 border-gray-400"></div>}
        <span className="text-xs font-medium">
          {trend === "improving" ? "Mejorando" : trend === "worsening" ? "Empeorando" : "Estable"}
        </span>
      </div>
    )
  }

  // Componente para mostrar una métrica con su valor y tendencia
  const MetricCard = ({ icon, title, value, unit, trend, lowerIsBetter, color, subValue, subLabel }) => (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">{icon}</div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {trend && <TrendIndicator trend={trend} lowerIsBetter={lowerIsBetter} />}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-end gap-1">
          <span className={`text-2xl font-bold ${color || "text-slate-900"}`}>{value}</span>
          {unit && <span className="text-sm text-slate-500 mb-1">{unit}</span>}
        </div>
        {subValue && (
          <div className="mt-1 text-xs text-slate-500">
            {subLabel}: {subValue}
          </div>
        )}
      </CardContent>
    </Card>
  )

  // Componente para mostrar el progreso hacia un objetivo
  const GoalProgressCard = ({ icon, title, current, goal, unit, color }) => {
    const percentage = calculatePercentage(current, goal)

    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">{icon}</div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <span className="text-xs font-medium text-slate-500">{percentage}%</span>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="space-y-2">
            <Progress value={percentage} className="h-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>
                {current} {unit}
              </span>
              <span>
                Meta: {goal} {unit}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
          Dashboard de Salud
        </h2>
        <p className="text-slate-600">Monitorea tus estadísticas de salud y progreso hacia tus objetivos</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center text-white text-xl font-bold">
              {healthData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{healthData.name}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{healthData.age} años</span>
                <span>{healthData.height} cm</span>
                <span>{healthData.weight} kg</span>
                <span className={`font-medium ${getHealthStatusColor("bmi", healthData.bmi)}`}>
                  IMC: {healthData.bmi}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button variant="outline" size="sm" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Historial
            </Button>
            <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
              <Activity className="h-3 w-3 mr-1" />
              Nueva medición
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-100">
            <TabsList className="p-0 h-12 bg-transparent border-b border-transparent w-full justify-start rounded-none">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-12"
              >
                Resumen
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-12"
              >
                Signos Vitales
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-12"
              >
                Actividad
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-12"
              >
                Nutrición
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-12"
              >
                Historial Médico
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                icon={<Heart className="h-5 w-5 text-primary" />}
                title="Presión Arterial"
                value={`${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`}
                unit="mmHg"
                trend={getTrend(healthData.bloodPressure.history, true)}
                lowerIsBetter={true}
                color={getHealthStatusColor("bloodPressure", healthData.bloodPressure.systolic)}
              />

              <MetricCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                title="Ritmo Cardíaco"
                value={healthData.heartRate.current}
                unit="bpm"
                trend={getTrend(healthData.heartRate.history, true)}
                lowerIsBetter={true}
                color={getHealthStatusColor("heartRate", healthData.heartRate.current)}
                subValue={healthData.heartRate.resting}
                subLabel="En reposo"
              />

              <MetricCard
                icon={<Moon className="h-5 w-5 text-primary" />}
                title="Sueño"
                value={healthData.sleep.average}
                unit="horas"
                trend={getTrend(healthData.sleep.history)}
                subValue={`${healthData.sleep.deep}h sueño profundo`}
              />

              <GoalProgressCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                title="Pasos Diarios"
                current={healthData.activity.steps}
                goal={healthData.activity.stepsGoal}
                unit="pasos"
              />

              <GoalProgressCard
                icon={<Droplets className="h-5 w-5 text-primary" />}
                title="Hidratación"
                current={healthData.hydration.current}
                goal={healthData.hydration.goal}
                unit="L"
              />

              <GoalProgressCard
                icon={<Utensils className="h-5 w-5 text-primary" />}
                title="Calorías"
                current={healthData.nutrition.calories}
                goal={healthData.nutrition.caloriesGoal}
                unit="kcal"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Mediciones Recientes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500">
                      <th className="pb-2 font-medium">Fecha</th>
                      <th className="pb-2 font-medium">Tipo</th>
                      <th className="pb-2 font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthData.recentMeasurements.map((measurement, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-3 text-sm">{measurement.date}</td>
                        <td className="py-3 text-sm">{measurement.type}</td>
                        <td className="py-3 text-sm font-medium">{measurement.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-right">
                  <Button variant="link" size="sm" className="text-primary h-auto p-0">
                    Ver todo el historial <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Heart className="h-5 w-5 text-primary mr-2" />
                      Presión Arterial
                    </CardTitle>
                    <span
                      className={`text-sm font-medium ${getHealthStatusColor("bloodPressure", healthData.bloodPressure.systolic)}`}
                    >
                      {healthData.bloodPressure.systolic < 120
                        ? "Normal"
                        : healthData.bloodPressure.systolic < 130
                          ? "Elevada"
                          : healthData.bloodPressure.systolic < 140
                            ? "Hipertensión Etapa 1"
                            : "Hipertensión Etapa 2"}
                    </span>
                  </div>
                  <CardDescription>Historial de los últimos 30 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de presión arterial</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Sistólica</div>
                      <div className="text-2xl font-bold">
                        {healthData.bloodPressure.systolic} <span className="text-sm text-gray-500">mmHg</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Diastólica</div>
                      <div className="text-2xl font-bold">
                        {healthData.bloodPressure.diastolic} <span className="text-sm text-gray-500">mmHg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Activity className="h-5 w-5 text-primary mr-2" />
                      Ritmo Cardíaco
                    </CardTitle>
                    <span
                      className={`text-sm font-medium ${getHealthStatusColor("heartRate", healthData.heartRate.current)}`}
                    >
                      {healthData.heartRate.current < 60
                        ? "Bradicardia"
                        : healthData.heartRate.current <= 100
                          ? "Normal"
                          : "Taquicardia"}
                    </span>
                  </div>
                  <CardDescription>Historial de los últimos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de ritmo cardíaco</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Actual</div>
                      <div className="text-2xl font-bold">
                        {healthData.heartRate.current} <span className="text-sm text-gray-500">bpm</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">En reposo</div>
                      <div className="text-2xl font-bold">
                        {healthData.heartRate.resting} <span className="text-sm text-gray-500">bpm</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Máximo</div>
                      <div className="text-2xl font-bold">
                        {healthData.heartRate.max} <span className="text-sm text-gray-500">bpm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <GoalProgressCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                title="Pasos Diarios"
                current={healthData.activity.steps}
                goal={healthData.activity.stepsGoal}
                unit="pasos"
              />

              <GoalProgressCard
                icon={<Dumbbell className="h-5 w-5 text-primary" />}
                title="Minutos Activos"
                current={healthData.activity.activeMinutes}
                goal={healthData.activity.activeMinutesGoal}
                unit="min"
              />

              <GoalProgressCard
                icon={<Activity className="h-5 w-5 text-primary" />}
                title="Calorías Quemadas"
                current={healthData.activity.caloriesBurned}
                goal={healthData.activity.caloriesGoal}
                unit="kcal"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 text-primary mr-2" />
                  Actividad Semanal
                </CardTitle>
                <CardDescription>Resumen de tu actividad física en los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Gráfico de actividad semanal</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Utensils className="h-5 w-5 text-primary mr-2" />
                    Consumo Calórico
                  </CardTitle>
                  <CardDescription>Calorías y macronutrientes de hoy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Calorías</span>
                      <span className="text-sm font-medium">
                        {healthData.nutrition.calories} / {healthData.nutrition.caloriesGoal} kcal
                      </span>
                    </div>
                    <Progress
                      value={calculatePercentage(healthData.nutrition.calories, healthData.nutrition.caloriesGoal)}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Proteínas</span>
                        <span className="text-sm font-medium">{healthData.nutrition.protein}g</span>
                      </div>
                      <Progress
                        value={calculatePercentage(healthData.nutrition.protein, healthData.nutrition.proteinGoal)}
                        className="h-2 bg-blue-100"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Carbohidratos</span>
                        <span className="text-sm font-medium">{healthData.nutrition.carbs}g</span>
                      </div>
                      <Progress
                        value={calculatePercentage(healthData.nutrition.carbs, healthData.nutrition.carbsGoal)}
                        className="h-2 bg-green-100"
                        indicatorClassName="bg-green-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Grasas</span>
                        <span className="text-sm font-medium">{healthData.nutrition.fat}g</span>
                      </div>
                      <Progress
                        value={calculatePercentage(healthData.nutrition.fat, healthData.nutrition.fatGoal)}
                        className="h-2 bg-yellow-100"
                        indicatorClassName="bg-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6 h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de distribución de macronutrientes</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Droplets className="h-5 w-5 text-primary mr-2" />
                    Hidratación
                  </CardTitle>
                  <CardDescription>Consumo de agua en los últimos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Hoy</span>
                      <span className="text-sm font-medium">
                        {healthData.hydration.current} / {healthData.hydration.goal} L
                      </span>
                    </div>
                    <Progress
                      value={calculatePercentage(healthData.hydration.current, healthData.hydration.goal)}
                      className="h-2 bg-blue-100"
                      indicatorClassName="bg-blue-500"
                    />
                  </div>

                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de hidratación semanal</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Condiciones Médicas</CardTitle>
                </CardHeader>
                <CardContent>
                  {healthData.medicalConditions.length > 0 ? (
                    <ul className="space-y-2">
                      {healthData.medicalConditions.map((condition, index) => (
                        <li key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center p-6 text-gray-500">No hay condiciones médicas registradas</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Medicamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  {healthData.medications.length > 0 ? (
                    <ul className="space-y-2">
                      {healthData.medications.map((medication, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {medication.dosage} - {medication.frequency}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center p-6 text-gray-500">No hay medicamentos registrados</div>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Historial de Mediciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-slate-500">
                          <th className="pb-2 font-medium">Fecha</th>
                          <th className="pb-2 font-medium">Hora</th>
                          <th className="pb-2 font-medium">Tipo</th>
                          <th className="pb-2 font-medium">Valor</th>
                          <th className="pb-2 font-medium">Notas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthData.recentMeasurements.map((measurement, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="py-3 text-sm">{measurement.date}</td>
                            <td className="py-3 text-sm">09:30</td>
                            <td className="py-3 text-sm">{measurement.type}</td>
                            <td className="py-3 text-sm font-medium">{measurement.value}</td>
                            <td className="py-3 text-sm text-gray-500">-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-3 text-right">
                      <Button variant="link" size="sm" className="text-primary h-auto p-0">
                        Ver historial completo <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

