import React, { useEffect, useState } from "react";
import { Trash2, MessageSquare, Mail, AlertCircle, CheckCircle2, Eye, X, User, Settings, Globe, Phone, MapPin, Users, FileText, ShoppingCart, MessageCircle, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useConfirm } from "@/components/ConfirmModal";

export default function AdminContacts() {
    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [viewDetails, setViewDetails] = useState(null);
    const [userData, setUserData] = useState(null);
    const [globalSettings, setGlobalSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Dynamic data from all components
    const [dashboardData, setDashboardData] = useState({
        orders: [],
        enquiries: [],
        invoices: [],
        clients: [],
        users: [],
        contacts: []
    });

    const { confirm, ConfirmDialog } = useConfirm();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            
            // Fetch from all admin components
            const [contactRes, userRes, settingsRes, ordersRes, enquiriesRes, invoicesRes, clientsRes, usersRes] = await Promise.all([
                fetch("/api/contact"),
                fetch("/api/users/me"),
                fetch("/api/settings"),
                fetch("/api/orders").catch(() => ({ ok: false, json: () => [] })),
                fetch("/api/enquiries").catch(() => ({ ok: false, json: () => [] })),
                fetch("/api/invoices").catch(() => ({ ok: false, json: () => [] })),
                fetch("/api/clients").catch(() => ({ ok: false, json: () => [] })),
                fetch("/api/users").catch(() => ({ ok: false, json: () => [] }))
            ]);

            const msgData = await contactRes.json();
            setMessages(Array.isArray(msgData) ? msgData : []);

            if (userRes.ok) {
                const userData = await userRes.json();
                setUserData(userData);
            }

            if (settingsRes.ok) {
                const settingsData = await settingsRes.json();
                setGlobalSettings(settingsData);
            }

            // Get data from other components
            const ordersData = ordersRes.ok ? await ordersRes.json() : [];
            const enquiriesData = enquiriesRes.ok ? await enquiriesRes.json() : [];
            const invoicesData = invoicesRes.ok ? await invoicesRes.json() : [];
            const clientsData = clientsRes.ok ? await clientsRes.json() : [];
            const usersData = usersRes.ok ? await usersRes.json() : [];

            setDashboardData({
                orders: Array.isArray(ordersData) ? ordersData : [],
                enquiries: Array.isArray(enquiriesData) ? enquiriesData : [],
                invoices: Array.isArray(invoicesData) ? invoicesData : [],
                clients: Array.isArray(clientsData) ? clientsData : [],
                users: Array.isArray(usersData) ? usersData : [],
                contacts: Array.isArray(msgData) ? msgData : []
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/contact/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                fetchMessages();
                if (viewDetails?._id === id) {
                    setViewDetails({...viewDetails, status});
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        const ok = await confirm({
            title: "Delete Message?",
            message: "Are you sure you want to delete this message?",
        });
        if (!ok) return;

        await fetch(`/api/contact/${id}`, { method: "DELETE" });
        if (viewDetails?._id === id) setViewDetails(null);
        fetchMessages();
    };

    // Calculate stats from all components
    const contactStats = {
        total: messages.length,
        new: messages.filter(m => m.status === 'New').length,
        read: messages.filter(m => m.status === 'Read').length,
        replied: messages.filter(m => m.status === 'Replied').length,
    };

    // Calculate aggregate data
    const aggStats = {
        totalOrders: dashboardData.orders.length,
        ordersCompleted: dashboardData.orders.filter(o => o.order_status === 'Completed').length,
        ordersInProgress: dashboardData.orders.filter(o => o.order_status === 'In Progress').length,
        ordersBooked: dashboardData.orders.filter(o => o.order_status === 'Booked').length,
        
        totalEnquiries: dashboardData.enquiries.length,
        enquiriesNew: dashboardData.enquiries.filter(e => e.status === 'New').length,
        enquiriesBooked: dashboardData.enquiries.filter(e => e.status === 'Booked').length,
        
        totalInvoices: dashboardData.invoices.length,
        invoicesPaid: dashboardData.invoices.filter(i => i.status === 'Paid').length,
        invoicesOverdue: dashboardData.invoices.filter(i => i.status === 'Overdue').length,
        
        totalClients: dashboardData.clients.length,
        totalUsers: dashboardData.users.length,
        totalContacts: messages.length
    };

    // Filter messages
    const filteredMessages = filter === 'All' ? messages : messages.filter(m => m.status === filter);

    // --- insert ConfirmDialog just before return closure ---

    // Get status badge colors
    const getStatusBadgeColor = (status) => {
        switch(status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Read': return 'bg-slate-100 text-slate-800';
            case 'Replied': return 'bg-emerald-100 text-emerald-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="min-h-screen mb-6">
            {ConfirmDialog}
            <PageHeader
                title="Contact Messages"
                description="Manage website contact form messages"
            />

            {/* User & Settings Info Section */}
            {(userData || globalSettings) && (
                <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-6 py-8 mb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* User Info */}
                            {userData && (
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <User size={20} className="text-gold-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">Account Owner</h3>
                                    </div>
                                    <p className="text-2xl font-bold mb-1">{userData.name || 'Not Set'}</p>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} />
                                            <span>{userData.email || 'No email'}</span>
                                        </div>
                                        {userData.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} />
                                                <span>{userData.phone}</span>
                                            </div>
                                        )}
                                        {userData.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} />
                                                <span>{userData.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Global Settings */}
                            {globalSettings && (
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Settings size={20} className="text-gold-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">Organization Settings</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-slate-300 text-xs">Timezone</p>
                                            <p className="font-semibold">{globalSettings.timezone || 'Not Set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-300 text-xs">Currency</p>
                                            <p className="font-semibold">{globalSettings.currency || 'Not Set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-300 text-xs">Contract Template</p>
                                            <p className="font-semibold text-xs truncate">{globalSettings.contractTemplate || 'Standard'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Message Stats Summary */}
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <MessageSquare size={20} className="text-gold-400" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Messages Summary</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-slate-300 text-xs">Total</p>
                                        <p className="text-2xl font-bold">{contactStats.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-300 text-xs">Pending</p>
                                        <p className="text-2xl font-bold text-blue-400">{contactStats.new + contactStats.read}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Dashboard Section - Data from All Components */}
            <div className="max-w-7xl mx-auto">
                {/* Themed statistics header */}
                <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-6 py-8 mb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Total', value: contactStats.total },
                                { label: 'New', value: contactStats.new },
                                { label: 'Read', value: contactStats.read },
                                { label: 'Replied', value: contactStats.replied },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/10 rounded-lg p-4 text-center">
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-sm uppercase tracking-wide mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {['All', 'New', 'Read', 'Replied'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                filter === status
                                    ? 'bg-gold-600 text-white'
                                    : 'bg-charcoal-100 text-charcoal-900 hover:bg-charcoal-200'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Messages List */}
                <div className="space-y-3">
                    {filteredMessages.length === 0 ? (
                        <div className="text-center py-16 bg-charcoal-50 rounded-lg border border-gold-200">
                            <MessageSquare className="mx-auto h-12 w-12 text-gold-400 mb-3" />
                            <p className="text-charcoal-700 font-medium">No {filter !== 'All' ? filter.toLowerCase() : ''} messages yet.</p>
                        </div>
                    ) : (
                        filteredMessages.map((msg) => (
                            <div key={msg._id} className="bg-white border border-gold-200 rounded-xl p-5 hover:shadow-lg transition relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-50 to-transparent opacity-20 pointer-events-none" />
                                <div className="flex items-center justify-between gap-4">
                                    {/* Left Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-lg font-semibold text-charcoal-900 truncate">
                                                {msg.subject}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(msg.status)}`}>
                                                {msg.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-3">
                                            <span className="flex items-center gap-1">
                                                <User size={14} /> {msg.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Mail size={14} /> {msg.email}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <select
                                            value={msg.status}
                                            onChange={(e) => updateStatus(msg._id, e.target.value)}
                                            className={`text-xs py-1 px-2 rounded border-0 cursor-pointer font-medium focus:outline-none focus:ring-1 focus:ring-charcoal-600 ${
                                                msg.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                msg.status === 'Read' ? 'bg-amber-100 text-amber-700' :
                                                'bg-emerald-100 text-emerald-700'
                                            }`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Read">Read</option>
                                            <option value="Replied">Replied</option>
                                        </select>
                                        <button
                                            onClick={() => setViewDetails(msg)}
                                            className="p-1.5 text-slate-500 hover:text-charcoal-900 hover:bg-slate-100 rounded transition"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Message Details Modal */}
            {viewDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewDetails(null)}>
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-charcoal-900 text-white px-6 py-4 flex justify-between items-start border-b">
                            <div>
                                <h2 className="text-xl font-bold">{viewDetails.subject}</h2>
                                <p className="text-sm text-slate-300 mt-1">{viewDetails.name}</p>
                            </div>
                            <button
                                onClick={() => setViewDetails(null)}
                                className="text-slate-300 hover:text-white p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-500 font-medium block mb-1">Status</span>
                                    <span className={`inline-block px-3 py-1 rounded font-medium ${getStatusBadgeColor(viewDetails.status)}`}>
                                        {viewDetails.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 font-medium block mb-1">Date</span>
                                    <p className="text-charcoal-900 font-medium">{new Date(viewDetails.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-charcoal-900 mb-3">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Name:</span>
                                        <span className="font-medium">{viewDetails.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Email:</span>
                                        <span className="font-medium">{viewDetails.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div>
                                <h3 className="font-semibold text-charcoal-900 mb-2">Message</h3>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                                    {viewDetails.message}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t bg-slate-50 flex gap-3 justify-between">
                            <button
                                onClick={() => setViewDetails(null)}
                                className="px-4 py-2 bg-slate-200 text-charcoal-900 rounded font-medium hover:bg-slate-300 transition flex-1"
                            >
                                Close
                            </button>
                            <select
                                value={viewDetails.status}
                                onChange={(e) => {
                                    updateStatus(viewDetails._id, e.target.value);
                                    setViewDetails({...viewDetails, status: e.target.value});
                                }}
                                className={`flex-1 px-3 py-2 rounded font-medium border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-charcoal-600 ${
                                    viewDetails.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                    viewDetails.status === 'Read' ? 'bg-amber-100 text-amber-700' :
                                    'bg-emerald-100 text-emerald-700'
                                }`}
                            >
                                <option value="New">New</option>
                                <option value="Read">Read</option>
                                <option value="Replied">Replied</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
