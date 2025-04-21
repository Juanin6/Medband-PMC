"use client"

import { useState ,useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Save, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/app/firebase/config"
import { doc, updateDoc } from "firebase/firestore"

export default function MedicalForm() {
  const [activeTab, setActiveTab] = useState("personal")
  const [formProgress, setFormProgress] = useState(0)
  const router = useRouter();
  const [user] = useAuthState(auth)
  console.log(user)
  const [formData, setFormData] = useState({
    // Información personal
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Historial médico
    height: "",
    weight: "",
    bloodType: "",
    chronicConditions: [],
    surgeries: [],
    hospitalizations: [],

    // Historial familiar
    familyHistory: {
      diabetes: false,
      heartDisease: false,
      cancer: false,
      hypertension: false,
      stroke: false,
      mentalIllness: false,
      other: "",
    },

    // Medicamentos
    currentMedications: [],
    allergies: [],

    // Estilo de vida
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: "",
    diet: "",
    stress: "",


    // Vacunas
    vaccinations: {
      covid19: false,
      influenza: false,
      tetanus: false,
      hepatitisB: false,
      pneumonia: false,
      other: "",
    },

  
  })

  // Mapeo de pestañas a porcentaje de progreso
  const tabProgressMap = {
    personal: 0,
    medical: 20,
    family: 40,
    medications: 60,
    lifestyle: 80,
    vaccinations: 100,
    
  }

  

  // Función para manejar cambios en los campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Maneja campos anidados (como familyHistory.diabetes)
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (name, checked) => {
    // Maneja campos anidados (como familyHistory.diabetes)
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: checked,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      })
    }
  }

  // Función para manejar cambios en los campos de selección
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Función para manejar cambios en los campos de array (medicamentos, alergias, etc.)
  const handleArrayItemAdd = (field, value) => {
    if (value.trim() !== "") {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      })
      return true
    }
    return false
  }

  const handleArrayItemRemove = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    })
  }

  // Función para navegar a la siguiente pestaña
  const goToNextTab = () => {
    const tabs = ["personal", "medical", "family", "medications", "lifestyle",  "vaccinations"]
    const currentIndex = tabs.indexOf(activeTab)

    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1]
      setActiveTab(nextTab)
      setFormProgress(tabProgressMap[nextTab])
    }
  }

  // Función para navegar a la pestaña anterior
  const goToPrevTab = () => {
    const tabs = ["personal", "medical", "family", "medications", "lifestyle", "symptoms", "vaccinations", "insurance"]
    const currentIndex = tabs.indexOf(activeTab)

    if (currentIndex > 0) {
      const prevTab = tabs[currentIndex - 1]
      setActiveTab(prevTab)
      setFormProgress(tabProgressMap[prevTab])
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    await updateDoc(doc(db, "users", user.uid), {
      firstName: formData.firstName,
      height: formData.height,
      weight: formData.weight,
      bloodType: formData.bloodType,
      chronicConditions: formData.chronicConditions,
      surgeries: formData.surgeries,
      hospitalizations: formData.hospitalizations,
      familyHistory: formData.familyHistory,
      currentMedications: formData.currentMedications,
      allergies: formData.allergies,
      smokingStatus: formData.smokingStatus,
      alcoholConsumption: formData.alcoholConsumption,
      exerciseFrequency: formData.exerciseFrequency,
      diet: formData.diet,
      stress: formData.stress,
      vaccinations: formData.vaccinations,

      })
    // Aquí iría la lógica para enviar los datos a un servidor
    alert("Formulario enviado con éxito")
  }

  // Componente para campos de array (medicamentos, alergias, etc.)
  const ArrayField = ({ label, field, placeholder }) => {
    const [newItem, setNewItem] = useState("")

    const handleAdd = () => {
      if (handleArrayItemAdd(field, newItem)) {
        setNewItem("")
      }
    }

    
    
    useEffect(()=>{
      if(!user){
        router.push("/sign-in")
        return 
      }  
  
    })
    
    



    return (
      <div className="space-y-3">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="button" onClick={handleAdd} disabled={newItem.trim() === ""}>
            Agregar
          </Button>
        </div>

        {formData[field].length > 0 && (
          <div className="mt-2 space-y-2">
            {formData[field].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleArrayItemRemove(field, index)}
                  className="h-8 w-8 p-0"
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 space-y-2">
        <h2 className="text-3xl text-gradient">
          Formulario Médico Completo
        </h2>
        <p className="text-slate-600">Por favor complete toda la información médica solicitada</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progreso</span>
          <span>{formProgress}% completado</span>
        </div>
        <Progress value={formProgress} className="h-2" />
      </div>

      <form onSubmit={handleSubmit} >
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="border-b bg-white">
            <CardTitle>Información Médica</CardTitle>
            <CardDescription>
              Toda la información proporcionada es confidencial y está protegida por las leyes de privacidad médica
            </CardDescription>
          </CardHeader>

          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              setFormProgress(tabProgressMap[value])
            }}
          >
            <div className="px-6 pt-4 border-b">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2">
                <TabsTrigger value="personal" className="text-xs">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="medical" className="text-xs">
                  Historial
                </TabsTrigger>
                <TabsTrigger value="family" className="text-xs">
                  Familiar
                </TabsTrigger>
                <TabsTrigger value="medications" className="text-xs">
                  Medicamentos
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="text-xs">
                  Estilo de Vida
                </TabsTrigger>
                
                <TabsTrigger value="vaccinations" className="text-xs">
                  Vacunas
                </TabsTrigger>
                
              </TabsList>
            </div>

            <CardContent className="p-6">
              {/* Información Personal */}
              <TabsContent value="personal" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Apellidos <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      Fecha de Nacimiento <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">
                      Género <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Femenino</SelectItem>
                        <SelectItem value="non-binary">No binario</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefiero no decirlo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required type="number" />
                  </div>
                </div>

                

                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">
                      Contacto de Emergencia <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">
                      Teléfono de Emergencia <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      type="number"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Historial Médico */}
              <TabsContent value="medical" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Grupo Sanguíneo</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) => handleSelectChange("bloodType", value)}
                    >
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">No lo sé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ArrayField
                  label="Condiciones Crónicas"
                  field="chronicConditions"
                  placeholder="Ej: Diabetes, Hipertensión, etc."
                />

                <ArrayField label="Cirugías Previas" field="surgeries" placeholder="Ej: Apendicectomía 2018" />

                <ArrayField label="Hospitalizaciones" field="hospitalizations" placeholder="Ej: Neumonía 2020" />
              </TabsContent>

              {/* Historial Familiar */}
              <TabsContent value="family" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Historial Médico Familiar</Label>
                  <p className="text-sm text-gray-500">
                    Seleccione las condiciones que existen en su familia directa (padres, hermanos, abuelos)
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyDiabetes"
                          checked={formData.familyHistory.diabetes}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.diabetes", checked)}
                        />
                        <Label htmlFor="familyDiabetes">Diabetes</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyHeartDisease"
                          checked={formData.familyHistory.heartDisease}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.heartDisease", checked)}
                        />
                        <Label htmlFor="familyHeartDisease">Enfermedad Cardíaca</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyCancer"
                          checked={formData.familyHistory.cancer}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.cancer", checked)}
                        />
                        <Label htmlFor="familyCancer">Cáncer</Label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyHypertension"
                          checked={formData.familyHistory.hypertension}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.hypertension", checked)}
                        />
                        <Label htmlFor="familyHypertension">Hipertensión</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyStroke"
                          checked={formData.familyHistory.stroke}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.stroke", checked)}
                        />
                        <Label htmlFor="familyStroke">Accidente Cerebrovascular</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="familyMentalIllness"
                          checked={formData.familyHistory.mentalIllness}
                          onCheckedChange={(checked) => handleCheckboxChange("familyHistory.mentalIllness", checked)}
                        />
                        <Label htmlFor="familyMentalIllness">Enfermedad Mental</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyOther">Otras condiciones familiares</Label>
                  <Textarea
                    id="familyOther"
                    name="familyHistory.other"
                    value={formData.familyHistory.other}
                    onChange={handleInputChange}
                    placeholder="Describa otras condiciones médicas familiares relevantes"
                  />
                </div>
              </TabsContent>

              {/* Medicamentos y Alergias */}
              <TabsContent value="medications" className="space-y-4 mt-0">
                <ArrayField
                  label="Medicamentos Actuales"
                  field="currentMedications"
                  placeholder="Ej: Paracetamol 500mg, 2 veces al día"
                />

                <ArrayField
                  label="Alergias (medicamentos, alimentos, etc.)"
                  field="allergies"
                  placeholder="Ej: Penicilina, Maní, etc."
                />
              </TabsContent>

              {/* Estilo de Vida */}
              <TabsContent value="lifestyle" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="smokingStatus">¿Fuma?</Label>
                  <Select 
                    value={formData.smokingStatus}
                    onValueChange={(value) => handleSelectChange("smokingStatus", value)}
                  >
                    <SelectTrigger id="smokingStatus">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white ">
                      <SelectItem className="hover:bg-blue-100" value="never">Nunca he fumado</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="former">Ex-fumador</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="occasional">Fumador ocasional</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="regular">Fumador regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcoholConsumption">Consumo de Alcohol</Label>
                  <Select
                    value={formData.alcoholConsumption}
                    onValueChange={(value) => handleSelectChange("alcoholConsumption", value)}
                  >
                    <SelectTrigger id="alcoholConsumption">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent  className="bg-white ">
                      <SelectItem className="hover:bg-blue-100"value="none">No consumo alcohol</SelectItem>
                      <SelectItem className="hover:bg-blue-100"value="occasional">Ocasionalmente</SelectItem>
                      <SelectItem className="hover:bg-blue-100"value="moderate">Moderadamente</SelectItem>
                      <SelectItem className="hover:bg-blue-100"value="frequent">Frecuentemente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exerciseFrequency">Frecuencia de Ejercicio</Label>
                  <Select
                    value={formData.exerciseFrequency}
                    onValueChange={(value) => handleSelectChange("exerciseFrequency", value)}
                  >
                    <SelectTrigger id="exerciseFrequency">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white ">
                      <SelectItem className="hover:bg-blue-100" value="none">No hago ejercicio</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="rarely">Raramente</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="occasionally">Ocasionalmente</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="regularly">Regularmente</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="daily">Diariamente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diet">Dieta</Label>
                  <Select value={formData.diet} onValueChange={(value) => handleSelectChange("diet", value)}>
                    <SelectTrigger id="diet">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white ">
                      <SelectItem className="hover:bg-blue-100" value="regular">Regular/Omnívora</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="vegetarian">Vegetariana</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="vegan">Vegana</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="pescatarian">Pescetariana</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="keto">Cetogénica</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="paleo">Paleo</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="gluten-free">Sin Gluten</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="dairy-free">Sin Lácteos</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="other">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stress">Nivel de Estrés</Label>
                  <Select value={formData.stress} onValueChange={(value) => handleSelectChange("stress", value)}>
                    <SelectTrigger id="stress">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className={"bg-white "}>
                      <SelectItem className="hover:bg-blue-100" value="low">Bajo</SelectItem>
                      <SelectItem className="hover:bg-blue-100" value="moderate">Moderado</SelectItem>
                      <SelectItem  className="hover:bg-blue-100" value="high">Alto</SelectItem>
                      <SelectItem  className="hover:bg-blue-100" value="very-high">Muy Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              
              

              {/* Vacunas */}
              <TabsContent value="vaccinations" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Historial de Vacunación</Label>
                  <p className="text-sm text-gray-500">Seleccione las vacunas que ha recibido</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccineCovid19"
                          checked={formData.vaccinations.covid19}
                          onCheckedChange={(checked) => handleCheckboxChange("vaccinations.covid19", checked)}
                        />
                        <Label htmlFor="vaccineCovid19">COVID-19</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccineInfluenza"
                          checked={formData.vaccinations.influenza}
                          onCheckedChange={(checked) => handleCheckboxChange("vaccinations.influenza", checked)}
                        />
                        <Label htmlFor="vaccineInfluenza">Influenza (Gripe)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccineTetanus"
                          checked={formData.vaccinations.tetanus}
                          onCheckedChange={(checked) => handleCheckboxChange("vaccinations.tetanus", checked)}
                        />
                        <Label htmlFor="vaccineTetanus">Tétanos</Label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccineHepatitisB"
                          checked={formData.vaccinations.hepatitisB}
                          onCheckedChange={(checked) => handleCheckboxChange("vaccinations.hepatitisB", checked)}
                        />
                        <Label htmlFor="vaccineHepatitisB">Hepatitis B</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccinePneumonia"
                          checked={formData.vaccinations.pneumonia}
                          onCheckedChange={(checked) => handleCheckboxChange("vaccinations.pneumonia", checked)}
                        />
                        <Label htmlFor="vaccinePneumonia">Neumonía</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vaccineOther">Otras vacunas</Label>
                  <Textarea
                    id="vaccineOther"
                    name="vaccinations.other"
                    value={formData.vaccinations.other}
                    onChange={handleInputChange}
                    placeholder="Indique otras vacunas que haya recibido y cuándo"
                  />
                </div>
              </TabsContent>

          
              
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              <Button type="button" variant="outline" onClick={goToPrevTab} disabled={activeTab === "personal"}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              {activeTab !== "vaccinations" ? (
                <Button type="button" onClick={goToNextTab}>
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="bg-primary hover:bg-primary/90" >
                  <Save className="h-4 w-4 mr-2" />
                  Enviar Formulario
                </Button>
              )}
            </CardFooter>
          </Tabs>
        </Card>
      </form>

      
    </div>
  )
}

