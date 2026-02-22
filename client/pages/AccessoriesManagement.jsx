import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";


const conditionStyles = {
  Excellent: "bg-emerald-50 text-emerald-700",
  Great: "bg-blue-50 text-blue-700",
  Fair: "bg-amber-50 text-amber-700",
  "Needs Service": "bg-rose-50 text-rose-600",
};

// asset types can be extended by the user
// moved into component state later

const emptyAsset = {
  id: null,
  type: "Camera",
  name: "",
  purchaseDate: "",
  nextService: "",
  quantity: "",
  condition: "Excellent",
  mm: "",
  section: "",
};

export default function AccessoriesManagement() {
  // start with empty list - remove static sample data
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [assetTypes, setAssetTypes] = useState(["Camera", "Lens", "Battery", "Other"]);
  const filterOptions = useMemo(() => ["all", ...assetTypes], [assetTypes]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyAsset);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  // for new asset type modal
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const stats = useMemo(() => {
    const total = assets.reduce((sum, a) => sum + Number(a.quantity || 0), 0);
    const needsService = assets.filter((a) => a.condition === "Needs Service").length;
    return { total, needsService };
  }, [assets]);

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchesSearch = [a.name, a.type, a.id]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : a.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [assets, search, filter]);

  // optional: compute counts per type
  const typeOverview = useMemo(() => {
    return assets.reduce((map, a) => {
      map[a.type] = (map[a.type] || 0) + Number(a.quantity || 0);
      return map;
    }, {});
  }, [assets]);

  function openModal(asset = null) {
    if (asset) {
      setForm({
        ...asset,
        quantity: asset.quantity?.toString() || "",
      });
      setEditingId(asset.id);
    } else {
      setForm({ ...emptyAsset });
      setEditingId(null);
    }
    setModalOpen(true);
  }

  async function saveAsset() {
    if (!form.name.trim()) return;

    setIsSaving(true);

    const payload = {
      ...form,
      quantity: Number(form.quantity) || 0,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingId) {
        setAssets((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...payload } : a)));
      } else {
        const id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `ASSET-${Date.now()}`;
        setAssets((prev) => [{ ...payload, id }, ...prev]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save asset", error);
    } finally {
      setIsSaving(false);
    }
  }

  function toggleServiceFlag(id) {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, condition: a.condition === "Needs Service" ? "Great" : "Needs Service" }
          : a
      )
    );
  }

  function createNewType() {
    if (newTypeName.trim() && !assetTypes.includes(newTypeName.trim())) {
      setAssetTypes((prev) => [...prev, newTypeName.trim()]);
      setFilter(newTypeName.trim());
      setNewTypeName("");
      setTypeModalOpen(false);
    }
  }

  return (
    <section className="mt-0 container mx-auto px-0 pt-0 pb-6 animate-in fade-in duration-500 space-y-6">
      <PageHeader
        title="Asset Management"
        description="Store and track cameras, lenses, batteries and other gear with custom fields."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-all"
            onClick={() => openModal()}
          >
            <Plus size={18} />
            Add Item
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <Stat label="Total units" value={stats.total} hint="" accent="from-amber-50" />
        <Stat label="Needs service" value={stats.needsService} hint="" accent="from-slate-100" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2.1fr,1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="text-lg font-semibold text-charcoal-900">Inventory Grid</h2>
              <p className="text-xs text-slate-500">{filteredAssets.length} items • Live inventory</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, type, ID"
                  className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-gold-500 focus:outline-none"
                />
                <span className="pointer-events-none absolute right-3 top-2.5 text-xs text-slate-400">⌕</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3 text-xs font-semibold">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`rounded-full border px-3 py-1 capitalize transition ${filter === option ? "border-gold-500 bg-gold-50 text-gold-600" : "border-transparent bg-slate-100 text-slate-600"
                  }`}
                onClick={() => setFilter(option)}
              >
                {option === "all" ? "All" : option}
              </button>
            ))}
            <button
              className="ml-2 rounded-full border border-gold-500 px-3 py-1 text-gold-600 hover:bg-gold-50 flex items-center gap-1"
              onClick={() => setTypeModalOpen(true)}
              title="Add type"
            >
              <Plus size={14} />
              Type
            </button>
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Type / Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                  <th className="px-4 py-3 text-left font-semibold">Condition</th>
                  <th className="px-4 py-3 text-left font-semibold">Purchase</th>
                  <th className="px-4 py-3 text-left font-semibold">Next Service</th>
                  <th className="px-4 py-3 text-left font-semibold">MM</th>
                  <th className="px-4 py-3 text-left font-semibold">Section</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                      No items match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((acc) => (
                    <tr key={acc.id} className="odd:bg-white even:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-charcoal-900">{acc.type} {acc.name && `– ${acc.name}`}</p>
                        <p className="text-xs text-slate-500">{acc.id}</p>
                      </td>
                      <td className="px-4 py-3 text-charcoal-900">{acc.quantity || "—"}</td>
                      <td className="px-4 py-3">
                        {acc.condition && (
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${conditionStyles[acc.condition] || "bg-slate-100 text-slate-600"}`}>
                            {acc.condition}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{acc.purchaseDate || "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{acc.nextService || "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{acc.mm || "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{acc.section || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                            onClick={() => openModal(acc)}
                          >
                            Edit
                          </button>
                          {acc.condition && (
                            <button
                              className="rounded-md border border-amber-100 px-3 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                              onClick={() => toggleServiceFlag(acc.id)}
                            >
                              {acc.condition === "Needs Service" ? "Clear Flag" : "Flag"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 px-4 py-5 md:hidden">
            {filteredAssets.length === 0 ? (
              <p className="text-center text-sm text-slate-500">No items match your filters.</p>
            ) : (
              filteredAssets.map((acc) => {
                return (
                  <div key={acc.id} className="space-y-3 rounded-2xl border border-slate-100 p-4 shadow-sm">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold text-charcoal-900">{acc.type} {acc.name && `– ${acc.name}`}</p>
                      <p className="text-xs text-slate-500">{acc.id}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                      <div className="font-semibold text-charcoal-900">Qty {acc.quantity || "—"}</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {acc.condition && (
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${conditionStyles[acc.condition] || "bg-slate-100 text-slate-600"}`}>
                            {acc.condition}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{acc.purchaseDate ? `Purchased ${formatDate(acc.purchaseDate)}` : ""}</span>
                      <div className="flex gap-2 text-xs">
                        <button className="rounded-md border border-slate-200 px-3 py-1 font-semibold text-slate-700" onClick={() => openModal(acc)}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-charcoal-900">Type Summary</h3>
                <p className="text-xs text-slate-500">Total quantity by asset type</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {Object.keys(typeOverview).length}
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {Object.entries(typeOverview).map(([type, qty]) => {
                return (
                  <li key={type} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-charcoal-900">
                      <span>{type}</span>
                      <span>{qty} pcs</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-charcoal-900">Maintenance Tickets</h3>
            <p className="text-xs text-slate-500">Latest diagnostics</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">RS4 gimbal drift</p>
                <p className="text-xs text-slate-500">Booked with MotionFix • ETA 12 Jan</p>
              </li>
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">Pavotube cracked sleeve</p>
                <p className="text-xs text-slate-500">Awaiting spare diffuser</p>
              </li>
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">Wireless mic foam replacements</p>
                <p className="text-xs text-slate-500">Bulk order queued</p>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-charcoal-900">Run Sheet Notes</h3>
            <ul className="mt-3 space-y-3 text-xs text-slate-600">
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">Charge cycle ritual</p>
                <p>Label charged batteries nightly with neon bands.</p>
              </li>
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">Weatherproof bins</p>
                <p>Keep rain shells + silica gel inside Docu kits.</p>
              </li>
              <li className="rounded-xl bg-slate-50 p-3">
                <p className="font-semibold text-charcoal-900">QR tags</p>
                <p>Attach dynamic QR codes for quick check-outs.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-500">Item</p>
                <h2 className="text-2xl font-semibold text-charcoal-900">{editingId ? "Edit Item" : "Add Item"}</h2>
              </div>
              <button className="text-slate-400 hover:text-slate-600" onClick={() => setModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Asset Type" required>
                <select
                  value={form.type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      type: newType,
                      // clear fields not relevant for new type
                      purchaseDate: newType === "Camera" ? prev.purchaseDate : "",
                      nextService: newType === "Camera" ? prev.nextService : "",
                      condition: newType === "Camera" ? prev.condition : "",
                      mm: newType === "Lens" ? prev.mm : "",
                      section: newType === "Lens" ? prev.section : "",
                    }));
                  }}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                >
                  {assetTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Name / Description">
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </Field>
              <Field label="Quantity" required>
                <input
                  type="number"
                  min={0}
                  value={form.quantity}
                  onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </Field>

              {/* conditional fields based on type */}
              {form.type === "Camera" && (
                <>
                  <Field label="Purchase Date">
                    <input
                      type="date"
                      value={form.purchaseDate}
                      onChange={(e) => setForm((prev) => ({ ...prev, purchaseDate: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    />
                  </Field>
                  <Field label="Next Service">
                    <input
                      type="date"
                      value={form.nextService}
                      onChange={(e) => setForm((prev) => ({ ...prev, nextService: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    />
                  </Field>
                  <Field label="Condition">
                    <select
                      value={form.condition}
                      onChange={(e) => setForm((prev) => ({ ...prev, condition: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    >
                      <option>Excellent</option>
                      <option>Great</option>
                      <option>Fair</option>
                      <option>Needs Service</option>
                    </select>
                  </Field>
                </>
              )}

              {form.type === "Lens" && (
                <>
                  <Field label="Focal Length (mm)">
                    <input
                      value={form.mm}
                      onChange={(e) => setForm((prev) => ({ ...prev, mm: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    />
                  </Field>
                  <Field label="Section">
                    <input
                      value={form.section}
                      onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    />
                  </Field>
                </>
              )}

              {/* battery and other types currently have no extra fields */}
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button
                className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-white flex items-center gap-2"
                onClick={saveAsset}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingId ? "Update" : "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating new asset type */}
      {typeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setTypeModalOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-500">New Type</p>
                <h2 className="text-2xl font-semibold text-charcoal-900">Create Asset Type</h2>
              </div>
              <button className="text-slate-400 hover:text-slate-600" onClick={() => { setTypeModalOpen(false); setNewTypeName(""); }}>
                ✕
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <Field label="Type Name" required>
                <input
                  type="text"
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  placeholder="e.g. Microphone, Tripod, Lighting"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  onKeyDown={(e) => e.key === "Enter" && createNewType()}
                />
              </Field>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={() => { setTypeModalOpen(false); setNewTypeName(""); }}>
                Cancel
              </button>
              <button
                className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600 disabled:opacity-50"
                onClick={createNewType}
                disabled={!newTypeName.trim()}
              >
                Create Type
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, hint, accent }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${accent} to-white p-4 shadow-inner`}>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-charcoal-900">{value}</p>
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-rose-500"> *</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "--";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(dateStr));
}
