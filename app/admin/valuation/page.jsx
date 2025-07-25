"use client"
import { useState, useEffect } from "react"

// Icons import
import {
  Eye,
  Reply,
  Clock,
  CheckCircle,
  Mail,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Send,
  RefreshCw,
  Car,
  DollarSign,
} from "lucide-react"
import { MdCancel } from "react-icons/md"

// Custom Modal Components
const Modal = ({ show, onClose, children, size = "md" }) => {
  if (!show) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    "2xl": "max-w-7xl",
    "3xl": "max-w-[90rem]",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className={`relative w-full rounded-2xl bg-white shadow-xl ${sizeClasses[size]} mx-auto`}>
        <button onClick={onClose} className="absolute right-4 top-4 z-50 cursor-pointer text-black hover:text-gray-500">
          <MdCancel size={32} />
        </button>
        {children}
      </div>
    </div>
  )
}

const ModalHeader = ({ children }) => (
  <div className="sticky top-0 z-10 rounded-t-2xl border-b border-gray-200 bg-white p-6">{children}</div>
)

const ModalBody = ({ children, className = "" }) => (
  <div className={`max-h-[80vh] overflow-y-auto p-6 ${className}`}>{children}</div>
)

// Spinner Component
const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-3",
    lg: "h-8 w-8 border-4",
  }

  return (
    <div
      className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-solid border-blue-600 border-t-transparent`}
    />
  )
}

const DeleteConfirmModal = ({ show, onClose, onConfirm, loading }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="relative mx-auto w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Valuation</h3>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this valuation request? This will permanently remove it from your system.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Deleting...
                </>
              ) : (
                "Delete Valuation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminValuationPage = () => {
  const [valuations, setValuations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedValuation, setSelectedValuation] = useState(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [adminReply, setAdminReply] = useState("")
  const [estimatedValue, setEstimatedValue] = useState("")
  const [replying, setReplying] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const valuationsPerPage = 5
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [valuationToDelete, setValuationToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchValuations = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/valuation")
      if (!response.ok) {
        throw new Error("Failed to fetch valuations")
      }
      const data = await response.json()
      setValuations(data)
    } catch (error) {
      console.error("Error fetching valuations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchValuations()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, searchTerm])

  const handleReply = async () => {
    if (!adminReply.trim()) return

    setReplying(true)
    setReplyMessage("")

    try {
      const response = await fetch("/api/valuation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valuationId: selectedValuation._id,
          adminReply: adminReply,
          estimatedValue: estimatedValue,
          repliedBy: "Admin",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send reply")
      }

      setReplyMessage("Reply sent successfully and customer notified via email!")
      setAdminReply("")
      setEstimatedValue("")

      // Update the local state
      setValuations((prev) =>
        prev.map((val) =>
          val._id === selectedValuation._id
            ? {
                ...val,
                status: "responded",
                adminReply: adminReply,
                estimatedValue: estimatedValue,
                repliedAt: new Date().toISOString(),
                repliedBy: "Admin",
              }
            : val,
        ),
      )

      setTimeout(() => {
        setShowReplyModal(false)
        setReplyMessage("")
        setSelectedValuation(null)
        fetchValuations()
      }, 2000)
    } catch (error) {
      console.error("Reply error:", error)
      setReplyMessage(`Something went wrong: ${error.message}. Please try again.`)
    } finally {
      setReplying(false)
    }
  }

  const openReplyModal = (valuation) => {
    setSelectedValuation(valuation)
    setAdminReply(valuation.adminReply || "")
    setEstimatedValue(valuation.estimatedValue || "")
    setShowReplyModal(true)
  }

  const openViewModal = (valuation) => {
    setSelectedValuation(valuation)
    setShowViewModal(true)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
      },
      responded: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
      },
      completed: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: CheckCircle,
      },
    }

    const config = statusConfig[status] || statusConfig.pending
    const IconComponent = config.icon

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.color}`}
      >
        <IconComponent size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getValuationTypeBadge = (type) => {
    const typeConfig = {
      Selling: "bg-green-100 text-green-800 border-green-200",
      Buying: "bg-blue-100 text-blue-800 border-blue-200",
      Trading: "bg-purple-100 text-purple-800 border-purple-200",
    }

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${
          typeConfig[type] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {type}
      </span>
    )
  }

  // Filter and search logic
  const filteredValuations = valuations
    .filter((valuation) => {
      if (filter === "all") return true
      return valuation.status === filter
    })
    .filter((valuation) => {
      if (!searchTerm) return true
      const search = searchTerm.toLowerCase()
      return (
        valuation.name.toLowerCase().includes(search) ||
        valuation.email.toLowerCase().includes(search) ||
        valuation.make.toLowerCase().includes(search) ||
        valuation.model.toLowerCase().includes(search)
      )
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

  // Pagination calculations
  const totalPages = Math.ceil(filteredValuations.length / valuationsPerPage)
  const startIndex = (currentPage - 1) * valuationsPerPage
  const endIndex = startIndex + valuationsPerPage
  const currentValuations = filteredValuations.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const stats = {
    total: valuations.length,
    pending: valuations.filter((val) => val.status === "pending").length,
    responded: valuations.filter((val) => val.status === "responded").length,
    completed: valuations.filter((val) => val.status === "completed").length,
  }

  const handleDeleteValuation = async () => {
    setDeleting(true)
    try {
      const response = await fetch("/api/valuation", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valuationId: valuationToDelete }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete valuation")
      }

      setValuations((prev) => prev.filter((val) => val._id !== valuationToDelete))
      setShowDeleteModal(false)
      setValuationToDelete(null)
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="text-lg font-medium text-slate-600">Loading valuations...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Car Valuations</h1>
              <p className="mt-2 text-gray-600">Manage and respond to car valuation requests</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchValuations}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.015] hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.015] hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="rounded-xl bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.015] hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Responded</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.responded}</p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.015] hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search valuations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:w-80"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All", count: stats.total },
                { key: "pending", label: "Pending", count: stats.pending },
                { key: "responded", label: "Responded", count: stats.responded },
                { key: "completed", label: "Completed", count: stats.completed },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === tab.key
                      ? "border-2 border-blue-200 bg-blue-100 text-blue-700"
                      : "border-2 border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Valuations List */}
        <div className="space-y-4">
          {currentValuations.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Car className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No valuations found</h3>
              <p className="text-gray-500">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No valuation requests have been received yet."}
              </p>
            </div>
          ) : (
            currentValuations.map((valuation) => (
              <div
                key={valuation._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-lg"
              >
                <div className="p-6">
                  {/* Header Row */}
                  <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{valuation.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail size={14} />
                          {valuation.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(valuation.status)}
                      {getValuationTypeBadge(valuation.valuationType)}
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(valuation)}
                          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => openReplyModal(valuation)}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            valuation.status === "pending"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          <Reply size={14} />
                          {valuation.status === "pending" ? "Reply" : "Edit Reply"}
                        </button>
                        <button
                          onClick={() => {
                            setValuationToDelete(valuation._id)
                            setShowDeleteModal(true)
                          }}
                          className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <X size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Vehicle</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {valuation.make} {valuation.model}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Type</p>
                        <p className="text-sm text-gray-700">{valuation.valuationType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col justify-between gap-2 text-xs text-gray-500 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(valuation.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {valuation.repliedAt && (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={12} />
                          Replied {new Date(valuation.repliedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <span>ID: {valuation._id.slice(-8)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Showing {startIndex + 1}-{Math.min(endIndex, filteredValuations.length)} of {filteredValuations.length}{" "}
                valuations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        <Modal show={showReplyModal} onClose={() => setShowReplyModal(false)} size="lg">
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Reply className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedValuation?.status === "pending" ? "Reply to Valuation" : "Edit Reply"}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedValuation?.name} • {selectedValuation?.email}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Vehicle Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Vehicle:</span> {selectedValuation?.make} {selectedValuation?.model}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {selectedValuation?.valuationType}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Estimated Value (Optional)</label>
              <input
                type="text"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., $25,000 - $30,000"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Your Reply</label>
              <textarea
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Type your reply here..."
              />
              <p className="mt-1 text-xs text-gray-500">
                📧 The customer will be automatically notified via email when you send this reply.
              </p>
            </div>

            {replyMessage && (
              <div
                className={`mb-4 rounded-lg p-3 text-sm ${
                  replyMessage.includes("successfully")
                    ? "border border-green-200 bg-green-50 text-green-700"
                    : "border border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {replyMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReplyModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!adminReply.trim() || replying}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {replying ? (
                  <>
                    <Spinner size="sm" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </ModalBody>
        </Modal>

        {/* View Modal */}
        <Modal show={showViewModal} onClose={() => setShowViewModal(false)} size="3xl">
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Eye className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Valuation Details</h3>
                <p className="text-sm text-gray-500">ID: {selectedValuation?._id}</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="space-y-6">
            {selectedValuation && (
              <>
                {/* Customer & Vehicle Info */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="font-medium">{selectedValuation.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span>{selectedValuation.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">Valuation Status</h4>
                    <div className="space-y-2">
                      {getStatusBadge(selectedValuation.status)}
                      {getValuationTypeBadge(selectedValuation.valuationType)}
                      <div className="text-xs text-gray-500">
                        <div>Created: {new Date(selectedValuation.createdAt).toLocaleString()}</div>
                        {selectedValuation.repliedAt && (
                          <div>Replied: {new Date(selectedValuation.repliedAt).toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Vehicle Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                    <div>
                      <span className="font-medium text-gray-700">Make:</span>
                      <p className="text-gray-600">{selectedValuation.make}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Model:</span>
                      <p className="text-gray-600">{selectedValuation.model}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Valuation Type:</span>
                      <p className="text-gray-600">{selectedValuation.valuationType}</p>
                    </div>
                  </div>
                </div>

                {/* Admin Reply */}
                {selectedValuation.adminReply && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <h4 className="font-medium text-green-800">Admin Reply</h4>
                      {selectedValuation.repliedBy && (
                        <span className="text-xs text-green-600">by {selectedValuation.repliedBy}</span>
                      )}
                    </div>
                    {selectedValuation.estimatedValue && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-green-800">Estimated Value:</span>
                        <span className="text-sm text-green-700 ml-1">{selectedValuation.estimatedValue}</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap text-sm text-green-700">{selectedValuation.adminReply}</p>
                  </div>
                )}
              </>
            )}
          </ModalBody>
        </Modal>

        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false)
            setValuationToDelete(null)
          }}
          onConfirm={handleDeleteValuation}
          loading={deleting}
        />
      </div>
    </div>
  )
}

export default AdminValuationPage
