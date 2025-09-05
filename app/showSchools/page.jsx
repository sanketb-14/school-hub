"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { School, MapPin, Search, Filter, Grid3X3, ListIcon, AlertCircle, Loader2 } from "lucide-react"

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCity, setFilterCity] = useState("")
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'

  // Default school image - same as used in AddSchoolPage
  const defaultSchoolImage = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop"

  // Function to get the correct image URL
  const getSchoolImage = (school) => {
    if (school.image) {
      return `/api/schools/images/${school.image}`; // Your uploaded image
    } else {
      return defaultSchoolImage; // Default image for schools without uploads
    }
  }

  // Fetch schools data
  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/schools")

      if (!response.ok) {
        throw new Error("Failed to fetch schools")
      }

      const data = await response.json()
      setSchools(data)
    } catch (err) {
      console.error("Error fetching schools:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter schools based on search and city filter
  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCity = filterCity === "" || school.city.toLowerCase() === filterCity.toLowerCase()

    return matchesSearch && matchesCity
  })

  // Get unique cities for filter dropdown
  const uniqueCities = [...new Set(schools.map((school) => school.city))].sort()

  const SchoolCard = ({ school, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <div className="p-1 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <div className="bg-white rounded-2xl overflow-hidden">
          <figure className="px-4 pt-4">
            <motion.div
              className="w-full h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-lg overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={getSchoolImage(school)}
                alt={school.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onError={(e) => {
                  // Fallback to default image if the image fails to load
                  e.target.src = defaultSchoolImage;
                }}
              />
              {!school.image && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs text-white font-medium">Default Image</span>
                  </div>
                </div>
              )}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          </figure>

          <div className="card-body p-4">
            <motion.h2
              className="card-title text-lg font-heading font-bold gradient-text line-clamp-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {school.name}
            </motion.h2>

            <div className="space-y-2 text-sm">
              <motion.div
                className="flex items-start gap-2 text-slate-600"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <span className="line-clamp-2">{school.address}</span>
              </motion.div>

              <motion.div className="flex items-center gap-2" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-slate-700">
                  {school.city}, {school.state}
                </span>
              </motion.div>
            </div>

            <div className="card-actions justify-end mt-4">
              <motion.div
                className="badge bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {school.city}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const SchoolListItem = ({ school, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      whileHover={{
        x: 4,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
      className="group cursor-pointer"
    >
      <div className="border-l-4 border-l-gradient-to-b from-blue-500 to-purple-600 shadow-md group-hover:shadow-xl transition-all duration-300">
        <div className="card-body p-4 bg-gradient-to-r from-blue-50/30 to-purple-50/30 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-lg overflow-hidden relative"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={getSchoolImage(school)}
                  alt={school.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    // Fallback to default image if the image fails to load
                    e.target.src = defaultSchoolImage;
                  }}
                />
                {!school.image && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-white/30 backdrop-blur-sm rounded px-1">
                      <span className="text-xs text-white font-medium">Default</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-lg font-heading font-bold gradient-text mb-1 truncate"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {school.name}
              </motion.h3>
              <p className="text-slate-600 text-sm mb-2 line-clamp-2">{school.address}</p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-700">
                  {school.city}, {school.state}
                </span>
                <motion.div
                  className="badge bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none badge-sm ml-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {school.city}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-white" />
          </motion.div>
          <motion.p
            className="text-lg font-medium text-slate-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading schools...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="alert alert-error shadow-lg max-w-md glass-effect"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: 2 }}>
            <AlertCircle className="w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="font-bold">Error loading schools</h3>
            <div className="text-xs">{error}</div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgb(239 246 255 / 0.5), rgb(238 242 255 / 0.3), rgb(250 245 255 / 0.5))",
            "linear-gradient(to bottom right, rgb(219 234 254 / 0.5), rgb(224 231 255 / 0.3), rgb(243 232 255 / 0.5))",
            "linear-gradient(to bottom right, rgb(239 246 255 / 0.5), rgb(238 242 255 / 0.3), rgb(250 245 255 / 0.5))",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="inline-block mb-4"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <School className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="font-heading text-4xl lg:text-5xl font-bold mb-2 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            All Schools
          </motion.h1>
          <motion.p
            className="text-slate-600 text-lg lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Browse through {schools.length} registered schools
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="card-modern shadow-lg mb-8"
        >
          <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl">
            <div className="bg-white rounded-2xl">
              <div className="card-body p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  {/* Search Input */}
                  <motion.div
                    className="form-control flex-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2 text-slate-700">
                        <motion.div
                          className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Search className="w-3 h-3 text-white" />
                        </motion.div>
                        Search Schools
                      </span>
                    </label>
                    <motion.input
                      type="text"
                      placeholder="Search by name, city, or address..."
                      className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {/* City Filter */}
                  <motion.div
                    className="form-control lg:w-48"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2 text-slate-700">
                        <motion.div
                          className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Filter className="w-3 h-3 text-white" />
                        </motion.div>
                        Filter by City
                      </span>
                    </label>
                    <motion.select
                      className="select select-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <option value="">All Cities</option>
                      {uniqueCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </motion.select>
                  </motion.div>

                  {/* View Mode Toggle */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-700">View Mode</span>
                    </label>
                    <div className="join">
                      <motion.button
                        className={`btn join-item transition-all ${viewMode === "grid" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none" : "btn-outline hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-none"}`}
                        onClick={() => setViewMode("grid")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className={`btn join-item transition-all ${viewMode === "list" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none" : "btn-outline hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-none"}`}
                        onClick={() => setViewMode("list")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ListIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Results Count */}
                <motion.div
                  className="mt-4 text-sm text-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  Showing {filteredSchools.length} of {schools.length} schools
                  {searchTerm && ` matching "${searchTerm}"`}
                  {filterCity && ` in ${filterCity}`}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schools Display */}
        <AnimatePresence mode="wait">
          {filteredSchools.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <School className="w-12 h-12 text-white" />
              </motion.div>
              <motion.h3
                className="text-2xl font-heading font-bold text-slate-700 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                No Schools Found
              </motion.h3>
              <motion.p
                className="text-slate-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {searchTerm || filterCity
                  ? "Try adjusting your search or filter criteria"
                  : "No schools have been added yet"}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="popLayout">
                {viewMode === "grid" ? (
                  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" layout>
                    {filteredSchools.map((school, index) => (
                      <SchoolCard key={school.id} school={school} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div className="space-y-4" layout>
                    {filteredSchools.map((school, index) => (
                      <SchoolListItem key={school.id} school={school} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}