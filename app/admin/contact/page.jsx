// "use client";
// import React, { useState, useEffect } from "react";

// // Icons import
// import {
//   Eye,
//   Reply,
//   Clock,
//   CheckCircle,
//   Mail,
//   Phone,
//   Calendar,
//   User,
//   MessageSquare,
//   ChevronRight,
//   ChevronLeft,
//   Search,
//   Filter,
//   Download,
//   Archive,
//   Trash2,
//   ExternalLink,
//   AlertTriangle,
//   X,
//   Send,
//   RefreshCw,
// } from "lucide-react";

// // Custom Modal Components
// const Modal = ({ show, onClose, children, size = "md" }) => {
//   if (!show) return null;

//   const sizeClasses = {
//     sm: "max-w-md",
//     md: "max-w-xl",
//     lg: "max-w-3xl",
//     xl: "max-w-5xl",
//     "2xl": "max-w-7xl",
//     "3xl": "max-w-[90rem]",
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div
//         className={`relative bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} mx-auto`}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
//         >
//           <X size={24} />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const ModalHeader = ({ children }) => (
//   <div className="border-b border-gray-200 p-6 sticky top-0 bg-white rounded-t-2xl z-10">
//     {children}
//   </div>
// );

// const ModalBody = ({ children, className = "" }) => (
//   <div className={`p-6 overflow-y-auto max-h-[80vh] ${className}`}>
//     {children}
//   </div>
// );

// // Spinner Component
// const Spinner = ({ size = "md" }) => {
//   const sizeClasses = {
//     sm: "h-4 w-4 border-2",
//     md: "h-6 w-6 border-3",
//     lg: "h-8 w-8 border-4",
//   };

//   return (
//     <div
//       className={`inline-block ${sizeClasses[size]} border-t-transparent border-blue-600 border-solid rounded-full animate-spin`}
//     />
//   );
// };

// const AdminContactPage = () => {
//   const [contactMessages, setContactMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [showReplyModal, setShowReplyModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [adminReply, setAdminReply] = useState("");
//   const [replying, setReplying] = useState(false);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const messagesPerPage = 5;

//   const fetchContactMessages = async () => {
//     setLoading(true);
//     try {
//       // Simulated API response
//       const mockData = [
//         {
//           _id: "65d3a9b7c8b4e62f8c1e5f3a",
//           name: "John Doe",
//           email: "john@example.com",
//           message: "I'm having issues with my account login. Can you help?",
//           status: "pending",
//           createdAt: new Date(Date.now() - 86400000).toISOString(),
//         },
//         {
//           _id: "65d3a9b7c8b4e62f8c1e5f3b",
//           name: "Jane Smith",
//           email: "jane@example.com",
//           message: "The payment system seems to be down. When will it be fixed?",
//           status: "answered",
//           adminReply: "We've identified the issue and are working on a fix.",
//           repliedAt: new Date(Date.now() - 43200000).toISOString(),
//           repliedBy: "Admin",
//           createdAt: new Date(Date.now() - 172800000).toISOString(),
//         },
//         {
//           _id: "65d3a9b7c8b4e62f8c1e5f3c",
//           name: "Robert Johnson",
//           email: "robert@example.com",
//           message: "Can you explain your premium features in more detail?",
//           status: "resolved",
//           adminReply: "I've sent you detailed documentation via email.",
//           repliedAt: new Date(Date.now() - 21600000).toISOString(),
//           repliedBy: "Admin",
//           createdAt: new Date(Date.now() - 259200000).toISOString(),
//         },
//       ];
      
//       setContactMessages(mockData);
//     } catch (error) {
//       console.error("Error fetching contact messages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContactMessages();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filter, searchTerm]);

//   const handleReply = async () => {
//     if (!adminReply.trim()) return;

//     setReplying(true);
//     setReplyMessage("");

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setReplyMessage("Reply sent successfully and customer notified!");
//       setAdminReply("");

//       setContactMessages((prev) =>
//         prev.map((msg) =>
//           msg._id === selectedMessage._id
//             ? { 
//                 ...msg, 
//                 status: "answered", 
//                 adminReply: adminReply, 
//                 repliedAt: new Date().toISOString(), 
//                 repliedBy: "Admin" 
//               }
//             : msg,
//         ),
//       );

//       setTimeout(() => {
//         setShowReplyModal(false);
//         setReplyMessage("");
//         setSelectedMessage(null);
//       }, 2000);
//     } catch (error) {
//       console.error("Reply error:", error);
//       setReplyMessage("Something went wrong. Please try again.");
//     } finally {
//       setReplying(false);
//     }
//   };

//   const openReplyModal = (message) => {
//     setSelectedMessage(message);
//     setAdminReply(message.adminReply || "");
//     setShowReplyModal(true);
//   };

//   const openViewModal = (message) => {
//     setSelectedMessage(message);
//     setShowViewModal(true);
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: {
//         color: "bg-amber-50 text-amber-700 border-amber-200",
//         icon: Clock,
//       },
//       answered: {
//         color: "bg-emerald-50 text-emerald-700 border-emerald-200",
//         icon: CheckCircle,
//       },
//       resolved: {
//         color: "bg-blue-50 text-blue-700 border-blue-200",
//         icon: CheckCircle,
//       },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     const IconComponent = config.icon;

//     return (
//       <span
//         className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.color}`}
//       >
//         <IconComponent size={12} />
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   // Filter and search logic
//   const filteredMessages = contactMessages
//     .filter((message) => {
//       if (filter === "all") return true;
//       return message.status === filter;
//     })
//     .filter((message) => {
//       if (!searchTerm) return true;
//       const search = searchTerm.toLowerCase();
//       return (
//         message.name.toLowerCase().includes(search) ||
//         message.email.toLowerCase().includes(search) ||
//         message.message.toLowerCase().includes(search)
//       );
//     })
//     .sort((a, b) => {
//       if (sortBy === "newest") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else if (sortBy === "oldest") {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else if (sortBy === "name") {
//         return a.name.localeCompare(b.name);
//       }
//       return 0;
//     });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
//   const startIndex = (currentPage - 1) * messagesPerPage;
//   const endIndex = startIndex + messagesPerPage;
//   const currentMessages = filteredMessages.slice(startIndex, endIndex);

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const stats = {
//     total: contactMessages.length,
//     pending: contactMessages.filter((msg) => msg.status === "pending").length,
//     answered: contactMessages.filter((msg) => msg.status === "answered").length,
//     resolved: contactMessages.filter((msg) => msg.status === "resolved").length,
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//         <div className="mx-auto max-w-7xl">
//           <div className="flex h-64 items-center justify-center">
//             <div className="text-center">
//               <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <span className="text-lg font-medium text-slate-600">
//                 Loading contact messages...
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Contact Messages
//               </h1>
//               <p className="mt-2 text-gray-600">
//                 Manage and respond to customer inquiries
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={fetchContactMessages}
//                 className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
//               <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
//                 <Download size={16} />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Total Messages</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//               </div>
//               <div className="rounded-xl bg-blue-100 p-3">
//                 <Mail className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Pending</p>
//                 <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
//               </div>
//               <div className="rounded-xl bg-amber-100 p-3">
//                 <Clock className="h-6 w-6 text-amber-600" />
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Answered</p>
//                 <p className="text-3xl font-bold text-emerald-600">{stats.answered}</p>
//               </div>
//               <div className="rounded-xl bg-emerald-100 p-3">
//                 <CheckCircle className="h-6 w-6 text-emerald-600" />
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Resolved</p>
//                 <p className="text-3xl font-bold text-blue-600">{stats.resolved}</p>
//               </div>
//               <div className="rounded-xl bg-blue-100 p-3">
//                 <Archive className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search messages..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="name">Sort by Name</option>
//               </select>
//             </div>

//             {/* Filter Tabs */}
//             <div className="flex flex-wrap gap-2">
//               {[
//                 { key: "all", label: "All", count: stats.total },
//                 { key: "pending", label: "Pending", count: stats.pending },
//                 { key: "answered", label: "Answered", count: stats.answered },
//                 { key: "resolved", label: "Resolved", count: stats.resolved },
//               ].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setFilter(tab.key)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     filter === tab.key
//                       ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
//                   }`}
//                 >
//                   {tab.label} ({tab.count})
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Messages List */}
//         <div className="space-y-4">
//           {currentMessages.length === 0 ? (
//             <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//                 <Mail className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="mb-2 text-lg font-semibold text-gray-900">
//                 No messages found
//               </h3>
//               <p className="text-gray-500">
//                 {searchTerm || filter !== "all" 
//                   ? "Try adjusting your search or filter criteria."
//                   : "No contact messages have been received yet."}
//               </p>
//             </div>
//           ) : (
//             currentMessages.map((message) => (
//               <div
//                 key={message._id}
//                 className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-gray-300"
//               >
//                 <div className="p-6">
//                   {/* Header Row */}
//                   <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
//                         <User className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {message.name}
//                         </h3>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <Mail size={14} />
//                           {message.email}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       {getStatusBadge(message.status)}
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => openViewModal(message)}
//                           className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <Eye size={14} />
//                           View
//                         </button>
//                         <button
//                           onClick={() => openReplyModal(message)}
//                           className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
//                             message.status === "pending"
//                               ? "bg-blue-600 text-white hover:bg-blue-700"
//                               : "bg-emerald-600 text-white hover:bg-emerald-700"
//                           }`}
//                         >
//                           <Reply size={14} />
//                           {message.status === "pending" ? "Reply" : "Edit Reply"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Preview */}
//                   <div className="mb-4 rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-700 line-clamp-2">
//                       {message.message}
//                     </p>
//                   </div>

//                   {/* Footer */}
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
//                     <div className="flex items-center gap-4">
//                       <span className="flex items-center gap-1">
//                         <Calendar size={12} />
//                         {new Date(message.createdAt).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       {message.repliedAt && (
//                         <span className="flex items-center gap-1">
//                           <CheckCircle size={12} />
//                           Replied {new Date(message.repliedAt).toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                     <span>ID: {message._id.slice(-8)}</span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm gap-4">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>
//                 Showing {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of{" "}
//                 {filteredMessages.length} messages
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={goToPreviousPage}
//                 disabled={currentPage === 1}
//                 className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 <ChevronLeft size={16} />
//                 Previous
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   const page = i + 1;
//                   return (
//                     <button
//                       key={page}
//                       onClick={() => goToPage(page)}
//                       className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                         currentPage === page
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   );
//                 })}
//                 {totalPages > 5 && currentPage < totalPages - 2 && (
//                   <span className="px-2 text-gray-500">...</span>
//                 )}
//               </div>
//               <button
//                 onClick={goToNextPage}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Next
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Reply Modal */}
//         <Modal show={showReplyModal} onClose={() => setShowReplyModal(false)} size="lg">
//           <ModalHeader>
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
//                 <Reply className="h-5 w-5 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {selectedMessage?.status === "pending" ? "Reply to Message" : "Edit Reply"}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {selectedMessage?.name} • {selectedMessage?.email}
//                 </p>
//               </div>
//             </div>
//           </ModalHeader>
//           <ModalBody>
//             <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
//               <h4 className="mb-2 text-sm font-medium text-gray-700">Original Message</h4>
//               <p className="text-sm text-gray-600">
//                 {selectedMessage?.message}
//               </p>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Your Reply
//               </label>
//               <textarea
//                 value={adminReply}
//                 onChange={(e) => setAdminReply(e.target.value)}
//                 rows={6}
//                 className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 placeholder="Type your reply here..."
//               />
//             </div>

//             {replyMessage && (
//               <div className={`rounded-lg p-3 text-sm mb-4 ${
//                 replyMessage.includes("successfully") 
//                   ? "bg-green-50 text-green-700 border border-green-200" 
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}>
//                 {replyMessage}
//               </div>
//             )}

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowReplyModal(false)}
//                 className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReply}
//                 disabled={!adminReply.trim() || replying}
//                 className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {replying ? (
//                   <>
//                     <Spinner size="sm" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send size={16} />
//                     Send Reply
//                   </>
//                 )}
//               </button>
//             </div>
//           </ModalBody>
//         </Modal>

//         {/* View Modal */}
//         <Modal show={showViewModal} onClose={() => setShowViewModal(false)} size="3xl">
//           <ModalHeader>
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                 <Eye className="h-5 w-5 text-gray-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
//                 <p className="text-sm text-gray-500">ID: {selectedMessage?._id}</p>
//               </div>
//             </div>
//           </ModalHeader>
//           <ModalBody className="space-y-6">
//             {selectedMessage && (
//               <>
//                 {/* Customer Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
//                     <h4 className="mb-2 font-medium text-gray-900">Customer Information</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center gap-2">
//                         <User size={14} className="text-gray-400" />
//                         <span className="font-medium">{selectedMessage.name}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail size={14} className="text-gray-400" />
//                         <span>{selectedMessage.email}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
//                     <h4 className="mb-2 font-medium text-gray-900">Message Status</h4>
//                     <div className="space-y-2">
//                       {getStatusBadge(selectedMessage.status)}
//                       <div className="text-xs text-gray-500">
//                         <div>Created: {new Date(selectedMessage.createdAt).toLocaleString()}</div>
//                         {selectedMessage.repliedAt && (
//                           <div>Replied: {new Date(selectedMessage.repliedAt).toLocaleString()}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Original Message */}
//                 <div className="rounded-lg border border-gray-200 bg-white p-4">
//                   <h4 className="mb-3 font-medium text-gray-900">Original Message</h4>
//                   <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                     {selectedMessage.message}
//                   </p>
//                 </div>

//                 {/* Admin Reply */}
//                 {selectedMessage.adminReply && (
//                   <div className="rounded-lg border border-green-200 bg-green-50 p-4">
//                     <div className="mb-3 flex items-center gap-2">
//                       <h4 className="font-medium text-green-800">Admin Reply</h4>
//                       {selectedMessage.repliedBy && (
//                         <span className="text-xs text-green-600">
//                           by {selectedMessage.repliedBy}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-green-700 whitespace-pre-wrap">
//                       {selectedMessage.adminReply}
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//           </ModalBody>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default AdminContactPage;



"use client";
import React, { useState, useEffect } from "react";

// Icons import
import {
  Eye,
  Reply,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Download,
  Archive,
  Trash2,
  ExternalLink,
  AlertTriangle,
  X,
  Send,
  RefreshCw,
} from "lucide-react";

// Custom Modal Components
const Modal = ({ show, onClose, children, size = "md" }) => {
  if (!show) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    "2xl": "max-w-7xl",
    "3xl": "max-w-[90rem]",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} mx-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => (
  <div className="border-b border-gray-200 p-6 sticky top-0 bg-white rounded-t-2xl z-10">
    {children}
  </div>
);

const ModalBody = ({ children, className = "" }) => (
  <div className={`p-6 overflow-y-auto max-h-[80vh] ${className}`}>
    {children}
  </div>
);

// Spinner Component
const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-3",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-t-transparent border-blue-600 border-solid rounded-full animate-spin`}
    />
  );
};

const AdminContactPage = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [adminReply, setAdminReply] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const messagesPerPage = 5;

  const fetchContactMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      const data = await response.json();
      setContactMessages(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const handleReply = async () => {
    if (!adminReply.trim()) return;

    setReplying(true);
    setReplyMessage("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setReplyMessage("Reply sent successfully and customer notified!");
      setAdminReply("");

      setContactMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id
            ? { 
                ...msg, 
                status: "answered", 
                adminReply: adminReply, 
                repliedAt: new Date().toISOString(), 
                repliedBy: "Admin" 
              }
            : msg,
        ),
      );

      setTimeout(() => {
        setShowReplyModal(false);
        setReplyMessage("");
        setSelectedMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Reply error:", error);
      setReplyMessage("Something went wrong. Please try again.");
    } finally {
      setReplying(false);
    }
  };

  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setAdminReply(message.adminReply || "");
    setShowReplyModal(true);
  };

  const openViewModal = (message) => {
    setSelectedMessage(message);
    setShowViewModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
      },
      answered: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
      },
      resolved: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.color}`}
      >
        <IconComponent size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Filter and search logic
  const filteredMessages = contactMessages
    .filter((message) => {
      if (filter === "all") return true;
      return message.status === filter;
    })
    .filter((message) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        message.name.toLowerCase().includes(search) ||
        message.email.toLowerCase().includes(search) ||
        message.message.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const stats = {
    total: contactMessages.length,
    pending: contactMessages.filter((msg) => msg.status === "pending").length,
    answered: contactMessages.filter((msg) => msg.status === "answered").length,
    resolved: contactMessages.filter((msg) => msg.status === "resolved").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-4"></div>
              <span className="text-lg font-medium text-slate-600">
                Loading contact messages...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Messages
              </h1>
              <p className="mt-2 text-gray-600">
                Manage and respond to customer inquiries
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchContactMessages}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
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

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Answered</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.answered}</p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.015]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-3xl font-bold text-blue-600">{stats.resolved}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Archive className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                { key: "answered", label: "Answered", count: stats.answered },
                { key: "resolved", label: "Resolved", count: stats.resolved },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === tab.key
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {currentMessages.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Mail className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No messages found
              </h3>
              <p className="text-gray-500">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "No contact messages have been received yet."}
              </p>
            </div>
          ) : (
            currentMessages.map((message) => (
              <div
                key={message._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-gray-300"
              >
                <div className="p-6">
                  {/* Header Row */}
                  <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {message.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail size={14} />
                          {message.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(message.status)}
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(message)}
                          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => openReplyModal(message)}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            message.status === "pending"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          <Reply size={14} />
                          {message.status === "pending" ? "Reply" : "Edit Reply"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {message.message}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(message.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {message.repliedAt && (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={12} />
                          Replied {new Date(message.repliedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <span>ID: {message._id.slice(-8)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Showing {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of{" "}
                {filteredMessages.length} messages
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  {selectedMessage?.status === "pending" ? "Reply to Message" : "Edit Reply"}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedMessage?.name} • {selectedMessage?.email}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Original Message</h4>
              <p className="text-sm text-gray-600">
                {selectedMessage?.message}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Reply
              </label>
              <textarea
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Type your reply here..."
              />
            </div>

            {replyMessage && (
              <div className={`rounded-lg p-3 text-sm mb-4 ${
                replyMessage.includes("successfully") 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {replyMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReplyModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!adminReply.trim() || replying}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                <p className="text-sm text-gray-500">ID: {selectedMessage?._id}</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="space-y-6">
            {selectedMessage && (
              <>
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="font-medium">{selectedMessage.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span>{selectedMessage.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">Message Status</h4>
                    <div className="space-y-2">
                      {getStatusBadge(selectedMessage.status)}
                      <div className="text-xs text-gray-500">
                        <div>Created: {new Date(selectedMessage.createdAt).toLocaleString()}</div>
                        {selectedMessage.repliedAt && (
                          <div>Replied: {new Date(selectedMessage.repliedAt).toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Original Message */}
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Original Message</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Admin Reply */}
                {selectedMessage.adminReply && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <h4 className="font-medium text-green-800">Admin Reply</h4>
                      {selectedMessage.repliedBy && (
                        <span className="text-xs text-green-600">
                          by {selectedMessage.repliedBy}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-green-700 whitespace-pre-wrap">
                      {selectedMessage.adminReply}
                    </p>
                  </div>
                )}
              </>
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default AdminContactPage;