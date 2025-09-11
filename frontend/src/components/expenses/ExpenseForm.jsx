"use client"

import { useState, useEffect } from "react"
import Button from "../ui/Button"
import { CalendarIcon, DollarSignIcon, FileTextIcon, XIcon, UploadIcon, RepeatIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useExpenseActions } from "../../api/expenses/expenseContext"
import CategoryDropdown from "../category/categoryDropdown"

// Helper function to format date to the required YYYY-MM-DDTHH:mm format
const formatToDatetimeLocal = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  // Check if date is valid
  if (isNaN(date.getTime())) return ""
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const ExpenseForm = ({ initialData = null, onClose, isOpen }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    date: formatToDatetimeLocal(new Date()),
    categoryId: "",
    description: "",
    type: "one-time",
    startDate: "",
    endDate: "",
    receipt: null,
    existingReceipt: null,
  })
  const [errors, setErrors] = useState({})
  const [submissionError, setSubmissionError] = useState("")

  const { handleCreateExpense, handleUpdateExpense } = useExpenseActions()

  useEffect(() => {
    if (!isOpen) return
    if (initialData) {
      setFormData({
        amount: initialData.amount || "",
        date: formatToDatetimeLocal(initialData.date),
        categoryId: initialData.category?.id || initialData.categoryId || "",
        description: initialData.description || "",
        type: initialData.type || "one-time",
        startDate: formatToDatetimeLocal(initialData.startDate),
        endDate: formatToDatetimeLocal(initialData.endDate),
        receipt: null,
        existingReceipt: initialData.receipt || null,
      })
      setErrors({})
      setSubmissionError("")
    } else {
      setFormData({
        amount: "",
        date: formatToDatetimeLocal(new Date()),
        categoryId: "",
        description: "",
        type: "one-time",
        startDate: "",
        endDate: "",
        receipt: null,
        existingReceipt: null,
      })
    }
  }, [initialData, isOpen])

  const validateForm = () => {
    const newErrors = {}

    // Amount is always required
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    }

    // Category is always required
    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category"
    }

    // Type-specific validation
    if (formData.type === "one-time") {
      // Date is required for one-time expenses
      if (!formData.date) {
        newErrors.date = "Please select a date for one-time expenses"
      }
    } else if (formData.type === "recurring") {
      // Start date is required for recurring expenses
      if (!formData.startDate) {
        newErrors.startDate = "Start date is required for recurring expenses"
      }
      // End date is optional for recurring expenses (ongoing if not provided)
      // But if both dates are provided, validate the relationship
      if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    setSubmissionError("")
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, receipt: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setSubmissionError("")

    try {
      const expenseData = {
        amount: Number(formData.amount),
        categoryId: formData.categoryId,
        description: formData.description || undefined,
        type: formData.type,
        receipt: formData.receipt || undefined,
      }

      // Add type-specific fields
      if (formData.type === "one-time") {
        expenseData.date = new Date(formData.date).toISOString()
      } else if (formData.type === "recurring") {
        expenseData.startDate = new Date(formData.startDate).toISOString()
        if (formData.endDate) {
          expenseData.endDate = new Date(formData.endDate).toISOString()
        }
      }

      if (initialData) {
        await handleUpdateExpense(initialData.id, expenseData)
      } else {
        await handleCreateExpense(expenseData)
      }
      console.log("Expense payload:", expenseData)

      if (onClose) onClose()
    } catch (error) {
      console.error("Error submitting expense:", error)
      setSubmissionError("Failed to save expense. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseClick = () => {
    if (onClose) onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 p-4"
        onClick={handleCloseClick}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseClick}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:hover:text-gray-200 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>

          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {initialData ? "Update Expense" : "Add Expense"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your spending efficiently</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {submissionError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{submissionError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.amount
                            ? "border-red-300 bg-red-50 dark:bg-red-900/10"
                            : "border-gray-300 dark:border-gray-600"
                        } dark:bg-gray-800 dark:text-white`}
                      />
                    </div>
                    {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                    <div className="relative">
                      <RepeatIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-800 dark:text-white transition-colors"
                      >
                        <option value="one-time">One-time</option>
                        <option value="recurring">Recurring</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.type === "one-time" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.date
                            ? "border-red-300 bg-red-50 dark:bg-red-900/10"
                            : "border-gray-300 dark:border-gray-600"
                        } dark:bg-gray-800 dark:text-white`}
                      />
                    </div>
                    {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                  </div>
                )}

                <div>
                  <CategoryDropdown value={formData.categoryId} onChange={(e) => handleChange(e)} errors={errors} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="description"
                      placeholder="Add a description..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {formData.type === "recurring" && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <RepeatIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Recurring Schedule</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="datetime-local"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.startDate
                              ? "border-red-300 bg-red-50 dark:bg-red-900/10"
                              : "border-gray-300 dark:border-gray-600"
                          } dark:bg-gray-800 dark:text-white`}
                        />
                      </div>
                      {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Leave empty for ongoing expenses</p>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="datetime-local"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.endDate
                              ? "border-red-300 bg-red-50 dark:bg-red-900/10"
                              : "border-gray-300 dark:border-gray-600"
                          } dark:bg-gray-800 dark:text-white`}
                        />
                      </div>
                      {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Receipt <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <UploadIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/20 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
                  />
                </div>
                {formData.receipt && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    New receipt uploaded
                  </p>
                )}
                {formData.existingReceipt && !formData.receipt && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Existing receipt will be retained</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 100-16 8 8 0 000 16h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : initialData ? (
                    "Update Expense"
                  ) : (
                    "Add Expense"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExpenseForm
