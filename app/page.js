"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, List, School, Users, MapPin, Award } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Plus,
      title: "Add Schools",
      description: "Easily add new schools to the database with comprehensive information",
      href: "/addSchool",
      color: "text-blue-500",
    },
    {
      icon: List,
      title: "View Schools",
      description: "Browse through all registered schools in an organized grid layout",
      href: "/showSchools",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Manage Data",
      description: "Efficient data management with validation and secure storage",
      color: "text-purple-500",
    },
    {
      icon: MapPin,
      title: "Location Tracking",
      description: "Track schools by city and state for better organization",
      color: "text-red-500",
    },
  ]

  const stats = [
    { label: "Schools Registered", value: "150+", icon: School },
    { label: "Cities Covered", value: "25+", icon: MapPin },
    { label: "User Satisfaction", value: "98%", icon: Award },
  ]

  return (
    <div className="min-h-screen px-2 sm:px-4">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl sm:rounded-3xl mb-8 sm:mb-16 glass-effect relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400/20 rounded-full"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="hero-content text-center px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-xs sm:max-w-md lg:max-w-4xl"
          >
            <div className="mb-6 sm:mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
                className="inline-block"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <School className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 mx-auto mb-4" />
                </motion.div>
              </motion.div>
            </div>
            <motion.h1
              className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              School Management System
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-xs sm:max-w-3xl mx-auto mb-6 sm:mb-8 px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Streamline your school data management with our comprehensive platform. Add, view, and manage school
              information with ease and efficiency.
            </motion.p>
            <motion.div
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/addSchool"
                  className="btn btn-primary btn-lg btn-modern w-full xs:w-auto min-h-12 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Add School</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/showSchools"
                  className="btn btn-outline btn-lg btn-modern w-full xs:w-auto min-h-12 hover:shadow-lg"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">View Schools</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-8 sm:mb-16"
      >
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 gradient-text px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="card-modern group cursor-pointer"
            >
              <div className="card-body items-center text-center p-4 sm:p-6">
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} mb-3 sm:mb-4`} />
                </motion.div>
                <motion.h3
                  className="font-heading text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                {feature.href && (
                  <div className="card-actions justify-end mt-3 sm:mt-4 w-full">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={feature.href}
                        className="btn btn-sm btn-primary btn-modern w-full xs:w-auto shadow-md hover:shadow-lg"
                      >
                        <span className="text-xs sm:text-sm">Get Started</span>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mb-8 sm:mb-16"
      >
        <div className="stats stats-vertical sm:stats-horizontal shadow-xl w-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 glass-effect">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 1.2 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="stat place-items-center p-4 sm:p-6 group cursor-pointer"
            >
              <motion.div
                className="stat-figure"
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </motion.div>
              <div className="stat-title text-slate-600 font-medium text-xs sm:text-sm">{stat.label}</div>
              <motion.div
                className="stat-value text-blue-600 font-heading font-bold text-2xl sm:text-3xl lg:text-4xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {stat.value}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          className="card bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl relative overflow-hidden"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="card-body p-6 sm:p-8 lg:p-12 relative z-10">
            <motion.h2
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-xs sm:max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              Join hundreds of institutions already using our platform to manage their school data efficiently.
            </motion.p>
            <motion.div
              className="card-actions justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/addSchool"
                  className="btn btn-neutral btn-lg btn-modern w-full xs:w-auto min-h-12 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Add Your First School</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}
