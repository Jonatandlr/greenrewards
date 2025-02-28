"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { UserRound, Phone, CheckCircle2, ArrowRight, MessageCircle, XCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FormState = "idle" | "submitting" | "checking" | "success" | "retry" | "complete"

export default function PhoneForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState({ name: "", phone: "" })
  const [formState, setFormState] = useState<FormState>("idle")

  const validateForm = () => {
    const newErrors = { name: "", phone: "" }
    let isValid = true

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio"
      isValid = false
    }

    if (!phone.trim()) {
      newErrors.phone = "El número de teléfono es obligatorio"
      isValid = false
    } else if (!/^\+?[0-9]{8,15}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ingrese un número de teléfono válido"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setFormState("submitting")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormState("checking")
    }
  }

  const handleWhatsAppResponse = (received: boolean) => {
    if (received) {
      setFormState("success")
      setTimeout(() => {
        setFormState("complete")
      }, 2000)
    } else {
      setFormState("retry")
    }
  }

  const handleReset = () => {
    setName("")
    setPhone("")
    setFormState("idle")
  }

  const renderFormState = () => {
    switch (formState) {
      case "submitting":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-violet-600 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-800">Enviando mensaje...</h2>
              <p className="text-gray-600">Estamos procesando tu información</p>
            </div>
          </motion.div>
        )

      case "checking":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">¿Recibiste nuestro mensaje de WhatsApp?</h2>
                <p className="text-gray-600">Deberías haber recibido un mensaje en el número {phone}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleWhatsAppResponse(true)} className="bg-green-500 hover:bg-green-600">
                  Sí, lo recibí
                </Button>
                <Button onClick={() => handleWhatsAppResponse(false)} variant="outline">
                  No lo he recibido
                </Button>
              </div>
            </div>
          </motion.div>
        )

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">¡Perfecto!</h2>
              <p className="text-gray-600">Nos pondremos en contacto contigo pronto</p>
            </div>
          </motion.div>
        )

      case "retry":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">No te preocupes</h2>
                <p className="text-gray-600">Intentaremos enviarte el mensaje nuevamente</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleReset} className="bg-violet-600 hover:bg-violet-700">
                  Intentar nuevamente
                </Button>
              </div>
            </div>
          </motion.div>
        )

      case "complete":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-2 -right-2 bg-violet-600 rounded-full p-2"
                >
                  <MessageCircle className="h-5 w-5 text-white" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">¡Todo listo!</h2>
                <p className="text-gray-600">Ya estás registrado y conectado por WhatsApp</p>
              </div>
              <Button onClick={handleReset} variant="outline" className="mt-4">
                Volver al inicio
              </Button>
            </div>
          </motion.div>
        )

      default:
        return (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Ingresa tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 h-12 border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 transition-all ${
                      errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-200" : ""
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    id="name-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Número de Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 612 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`pl-10 h-12 border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 transition-all ${
                      errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-200" : ""
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    id="phone-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>
            </CardContent>

            <CardFooter className="pb-6 pt-2">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Enviar información</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardFooter>
          </form>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                {formState === "idle" ? (
                  <UserRound className="h-8 w-8 text-white" />
                ) : (
                  <MessageCircle className="h-8 w-8 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-violet-700 to-fuchsia-700 text-transparent bg-clip-text">
                {formState === "idle" ? "Formulario de Contacto" : "Verificación de WhatsApp"}
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                {formState === "idle"
                  ? "Completa tus datos para ponernos en contacto"
                  : "Confirma la recepción del mensaje"}
              </CardDescription>
            </CardHeader>
            {renderFormState()}
          </Card>
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  )
}

