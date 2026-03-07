import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Video, PlayCircle, AlertCircle, Search, Filter } from "lucide-react";
import PageHeader from "../components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminFilms() {
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ id: null, title: "", videoUrl: "", category: "Wedding", status: "Active" });
    const [deleteId, setDeleteId] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const { data: films = [], isLoading } = useQuery({
        queryKey: ["films"],
        queryFn: async () => {
            const res = await fetch("/api/films");
            if (!res.ok) throw new Error("Failed to fetch films");
            return res.json();
        },
    });

    const { data: eventTypes = [] } = useQuery({
        queryKey: ["eventTypes"],
        queryFn: async () => {
            const res = await fetch("/api/event-types");
            if (!res.ok) throw new Error("Failed to fetch event types");
            return res.json();
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            const url = data.id ? `/api/films/${data.id}` : "/api/films";
            const method = data.id ? "PUT" : "POST";
            const { id, ...body } = data;
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error("Failed to save film");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["films"] });
            toast.success(form.id ? "Film updated" : "Film created");
            setModalOpen(false);
            setForm({ id: null, title: "", videoUrl: "", category: "Wedding", status: "Active" });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (err) => toast.error(err.message),
        onSettled: () => setIsSaving(false),
    });

    const handleSave = () => {
        if (isSaving) return;
        setIsSaving(true);
        // send field under youtubeUrl for backward compatibility
        mutation.mutate({ ...form, youtubeUrl: form.videoUrl });
    };

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`/api/films/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete film");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["films"] });
            toast.success("Film deleted");
            setDeleteId(null);
        },
    });

    // Extract YouTube ID helper (same as frontend)
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const getVideoPlatform = (url) => {
        if (!url) return null;
        if (/youtu/.test(url)) return 'youtube';
        return null;
    };

    // Statistics calculation
    const stats = useMemo(() => {
        const total = films.length;
        const active = films.filter(f => f.status === "Active").length;
        const inactive = films.filter(f => f.status === "Inactive").length;
        const categories = [...new Set(films.map(f => f.category))].length;
        return { total, active, inactive, categories };
    }, [films]);

    // Filtered films based on search and filters
    const filteredFilms = useMemo(() => {
        return films.filter(film => {
            const matchesSearch = film.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                film.category?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || film.status === statusFilter;
            const matchesCategory = categoryFilter === "All" || film.category === categoryFilter;
            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [films, searchTerm, statusFilter, categoryFilter]);

    // Get unique categories for filter dropdown
    const uniqueCategories = useMemo(() => {
        return ["All", ...new Set(films.map(f => f.category).filter(Boolean))];
    }, [films]);

    return (
        <div className="container mx-auto mt-0 px-0 pt-0 pb-6 animate-in fade-in duration-500">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Video className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                            <p className="text-sm text-slate-600">Total Films</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <PlayCircle className="text-emerald-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
                            <p className="text-sm text-slate-600">Active</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <Video className="text-slate-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.inactive}</p>
                            <p className="text-sm text-slate-600">Inactive</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Filter className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.categories}</p>
                            <p className="text-sm text-slate-600">Categories</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <PageHeader
                title="Films"
                description="Manage and showcase video content and films"
                action={
                    <button
                        onClick={() => { setForm({ id: null, title: "", videoUrl: "", category: "Wedding", status: "Active" }); setModalOpen(true); }}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-lg"
                    >
                        <Plus size={18} /> Add Film
                    </button>
                }
            />

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search films by title or category..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueCategories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Films Grid */}
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading films...</div>
            ) : filteredFilms.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    {films.length === 0 ? "No films found. Add your first masterpiece!" : "No films match your search criteria."}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredFilms.map((item) => {
                        const platform = getVideoPlatform(item.youtubeUrl);
                        let thumbnail = null;
                        if (platform === 'youtube') {
                            const videoId = getYouTubeId(item.youtubeUrl);
                            thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
                        }

                        return (
                            <div key={item._id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {thumbnail ? (
                                        <img src={thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <Video className="text-gray-400" />
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => { setForm({ id: item._id, title: item.title, videoUrl: item.youtubeUrl, category: item.category, status: item.status }); setModalOpen(true); }}
                                            className="p-2 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(item._id)}
                                            className="p-2 bg-white text-red-600 rounded-full hover:scale-110 transition-transform"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    {thumbnail && (
                                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 group-hover:opacity-0 transition-opacity">
                                            <PlayCircle size={12} /> YouTube
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate" title={item.title}>{item.title || "Untitled"}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 truncate max-w-[100px]">{item.category}</span>
                                        <span className={`w-2 h-2 rounded-full ${item.status === "Active" ? "bg-green-500" : "bg-gray-300"}`}></span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">{form.id ? "Edit Film" : "New Film"}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-shadow"
                                    placeholder="Film title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Video URL</label>
                                <div className="flex gap-2">
                                        <input
                                        type="text"
                                        value={form.videoUrl}
                                        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-shadow"
                                        placeholder="YouTube link"
                                    />
                                </div>
                                {form.videoUrl && (
                                    <p className="text-xs mt-1 flex items-center gap-1">
                                        {getVideoPlatform(form.videoUrl) === 'youtube' ? <Video size={12} /> : <AlertCircle size={12} />}
                                        Preview: {getVideoPlatform(form.videoUrl) ? `${getVideoPlatform(form.videoUrl)} link detected` : "Invalid link"}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                                    <Select
                                        value={form.category}
                                        onValueChange={(value) => setForm({ ...form, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Wedding">Wedding</SelectItem>
                                            {eventTypes.map((type) => (
                                                <SelectItem key={type._id} value={type.name}>
                                                    {type.label || type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                                    <Select
                                        value={form.status}
                                        onValueChange={(value) => setForm({ ...form, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                            <button onClick={handleSave} disabled={isSaving} className="px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400">
                                {isSaving ? "Saving..." : (form.id ? "Update Film" : "Create Film")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDeleteId(null)}>
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Film?</h3>
                        <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete this film? This action cannot be undone.</p>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">Cancel</button>
                            <button onClick={() => deleteMutation.mutate(deleteId)} className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed bottom-10 right-10 z-[100] animate-bounce">
                    <div className="flex items-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 shadow-2xl text-white">
                        <span className="text-2xl">👉</span>
                        <div className="font-bold">Film saved successfully</div>
                    </div>
                </div>
            )}
        </div>
    );
}
