"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { School, MapPin, Phone, Mail, ImageIcon, Save, AlertCircle, CheckCircle2, Info, Cloud, HardDrive } from "lucide-react"

export default function AddSchoolPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  // Default school image - you can change this to any school image URL
  const defaultSchoolImage = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Add default image to the data
      const submissionData = {
        ...data,
        image: defaultSchoolImage
      }

      const response = await fetch("/api/schools", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "School added successfully!" })
        reset()

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000)
      } else {
        throw new Error(result.error || "Failed to add school")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus({
        type: "error",
        message: error.message || "An error occurred while adding the school",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputFields = [
    {
      name: "name",
      label: "School Name",
      type: "text",
      icon: School,
      placeholder: "Enter school name",
      validation: { required: "School name is required" },
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      icon: MapPin,
      placeholder: "Enter complete address",
      validation: { required: "Address is required" },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      icon: MapPin,
      placeholder: "Enter city",
      validation: { required: "City is required" },
    },
    {
      name: "state",
      label: "State",
      type: "text",
      icon: MapPin,
      placeholder: "Enter state",
      validation: { required: "State is required" },
    },
    {
      name: "contact",
      label: "Contact Number",
      type: "tel",
      icon: Phone,
      placeholder: "Enter contact number",
      validation: {
        required: "Contact number is required",
        pattern: {
          value: /^[0-9]{10,15}$/,
          message: "Please enter a valid contact number (10-15 digits)",
        },
      },
    },
    {
      name: "email_id",
      label: "Email Address",
      type: "email",
      icon: Mail,
      placeholder: "Enter email address",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please enter a valid email address",
        },
      },
    },
  ]

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 pointer-events-none z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <School className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 gradient-text px-4">
            Add New School
          </h1>
          <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed px-4">
            Fill in the details below to add a new school to the database
          </p>
        </div>

        {/* Image Upload Notice */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 mx-2 sm:mx-0"
        >
          <div className="alert alert-info shadow-lg glass-effect border-l-4 border-l-amber-500 bg-red-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-800 text-sm sm:text-base flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Image Upload Notice
                </h3>
                <div className="text-xs sm:text-sm text-amber-700 mt-1 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <HardDrive className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Practice Project:</strong> Cloud storage is not configured for production. 
                      All schools will use a default image. For local development, clone the repository 
                      to enable full image upload functionality.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Messages */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`alert ${submitStatus.type === "success" ? "alert-success" : "alert-error"} mb-4 sm:mb-6 shadow-lg glass-effect mx-2 sm:mx-0`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            )}
            <span className="text-sm sm:text-base">{submitStatus.message}</span>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card-modern shadow-2xl mx-2 sm:mx-0"
        >
          <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl">
            <div className="bg-white rounded-2xl">
              <div className="card-body p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {inputFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className={field.name === "address" ? "lg:col-span-2" : ""}
                      >
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2 text-slate-700 text-sm sm:text-base">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                                <field.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                              </div>
                              {field.label}
                            </span>
                          </label>
                          <div className="relative">
                            {field.type === "textarea" ? (
                              <textarea
                                {...register(field.name, field.validation)}
                                className={`textarea textarea-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base min-h-20 sm:min-h-24 ${
                                  errors[field.name] ? "textarea-error" : ""
                                }`}
                                placeholder={field.placeholder}
                                rows={3}
                              />
                            ) : (
                              <input
                                {...register(field.name, field.validation)}
                                type={field.type}
                                className={`input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base min-h-12 ${errors[field.name] ? "input-error" : ""}`}
                                placeholder={field.placeholder}
                              />
                            )}
                          </div>
                          {errors[field.name] && (
                            <label className="label">
                              <span className="label-text-alt text-error flex items-center gap-1 text-xs sm:text-sm">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                <span className="break-words">{errors[field.name].message}</span>
                              </span>
                            </label>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Default Image Preview */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + inputFields.length * 0.1, duration: 0.5 }}
                      className="lg:col-span-2"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center gap-2 text-slate-700 text-sm sm:text-base">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                              <ImageIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                            School Image (Default)
                          </span>
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          <div className="flex-1">
                            <div className="input input-bordered w-full bg-gray-50 text-gray-500 cursor-not-allowed text-sm sm:text-base min-h-12 flex items-center">
                              Default school image will be used automatically
                            </div>
                            <div className="label">
                              <span className="label-text-alt text-slate-500 text-xs sm:text-sm">
                                📝 Note: Custom image upload available in local development environment only
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center sm:justify-start">
                            <div className="avatar">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg p-1 bg-gradient-to-r from-blue-500 to-purple-600">
                                <div className="w-full h-full rounded-lg overflow-hidden">
                                  <img
                                    src={defaultSchoolImage}
                                    alt="Default school image"
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="form-control mt-6 sm:mt-8"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-lg w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-12 sm:min-h-14 text-sm sm:text-base ${
                        isSubmitting ? "loading" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm sm:loading-md"></span>
                          <span className="text-sm sm:text-base">Adding School...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          <span className="text-sm sm:text-base">Add School</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8 mx-2 sm:mx-0"
        >
          <div className="alert shadow-lg glass-effect border-l-4 border-l-blue-500">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-700 text-sm sm:text-base">Required Fields</h3>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All fields are required for proper school management and searchability.
              </div>
            </div>
          </div>
          
          <div className="alert shadow-lg glass-effect border-l-4 border-l-green-500">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center flex-shrink-0">
              <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-700 text-sm sm:text-base">Local Development</h3>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clone the repository to enable full image upload functionality locally.
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}