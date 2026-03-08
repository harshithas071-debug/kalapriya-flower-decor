import { useState, useEffect, useRef } from "react";
import { useNavigate, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { galleryAPI, enquiryAPI } from "../services/api";

const CATEGORIES = ["Reception","Mantapa","Door Decoration","Name Board","Ramp Decoration","Jade","Hara","Chapra Decoration","Naming Ceremony"];
const STATUS_COLORS = { new: "#C9963F", contacted: "#6B7C5C", confirmed: "#3D8B37", closed: "#8A7A6A" };

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 400,
      background: "#1A0D00", color: "#E8C97A",
      padding: "0.8rem 1.5rem", borderLeft: "3px solid #C9963F",
      fontSize: "0.85rem", maxWidth: "280px",
      animation: "fadeIn 0.3s ease"
    }}>{msg}</div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ onLogout }) {
  const links = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/upload", label: "Upload Images" },
    { to: "/admin/manage", label: "Manage Gallery" },
    { to: "/admin/enquiries", label: "Enquiries" },
  ];
  return (
    <aside style={{
      width: 240, background: "#1A0D00", position: "fixed", top: 0, left: 0, bottom: 0,
      overflowY: "auto", zIndex: 50, display: "flex", flexDirection: "column"
    }}>
      <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(201,150,63,0.2)", marginBottom: "0.5rem" }}>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.2rem", color: "#E8C97A", margin: 0 }}>Kalapriya Admin</h2>
        <p style={{ fontSize: "0.65rem", color: "#8A7A6A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0.2rem 0 0" }}>Management Portal</p>
      </div>
      {links.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
          display: "block", padding: "0.8rem 1.5rem",
          color: isActive ? "#C9963F" : "rgba(251,243,224,0.6)",
          background: isActive ? "rgba(201,150,63,0.15)" : "transparent",
          borderLeft: isActive ? "3px solid #C9963F" : "3px solid transparent",
          textDecoration: "none", fontSize: "0.85rem", transition: "all 0.2s"
        })}>
          {label}
        </NavLink>
      ))}
      <div style={{ marginTop: "auto", padding: "1.5rem", borderTop: "1px solid rgba(201,150,63,0.15)" }}>
        <a href="/" style={{ display: "block", color: "rgba(251,243,224,0.4)", fontSize: "0.75rem", textDecoration: "none", marginBottom: "0.8rem" }}>
          ← View Website
        </a>
        <button onClick={onLogout} style={{
          background: "rgba(181,69,75,0.15)", border: "1px solid rgba(181,69,75,0.3)",
          color: "#B5454B", padding: "0.5rem 1rem", cursor: "pointer",
          fontFamily: "inherit", fontSize: "0.8rem", width: "100%"
        }}>Logout</button>
      </div>
    </aside>
  );
}

// ── Stats Overview ────────────────────────────────────────────────────────────
function DashboardHome() {
  const [stats, setStats] = useState([]);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([galleryAPI.getStats(), enquiryAPI.getAll({ limit: 1 })])
      .then(([gRes, eRes]) => {
        setStats(gRes.data.data);
        setTotal(gRes.data.total);
        setEnquiryCount(eRes.data.pagination.total);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#8A7A6A" }}>Loading stats...</p>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { num: total, label: "Total Images" },
          { num: CATEGORIES.length, label: "Categories" },
          { num: enquiryCount, label: "Enquiries" },
        ].map(({ num, label }) => (
          <div key={label} style={{ background: "white", padding: "1.5rem", borderBottom: "3px solid #C9963F", border: "1px solid rgba(201,150,63,0.2)" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "2.5rem", color: "#C9963F" }}>{num}</div>
            <div style={{ fontSize: "0.75rem", color: "#8A7A6A", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 300, color: "#1A0D00", marginBottom: "1rem" }}>Images per Category</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1rem" }}>
        {CATEGORIES.map(cat => {
          const s = stats.find(x => x._id === cat);
          return (
            <div key={cat} style={{ background: "white", padding: "1rem", border: "1px solid rgba(201,150,63,0.2)" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "#C9963F" }}>{s?.count || 0}</div>
              <div style={{ fontSize: "0.8rem", color: "#3D1F00", marginTop: "0.2rem" }}>{cat}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Upload ────────────────────────────────────────────────────────────────────
function UploadImages({ showToast }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setImageUrl("");
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleUrlChange = (v) => {
    setImageUrl(v);
    setFile(null);
    setPreview(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || (!file && !imageUrl)) {
      showToast("Please provide caption and image"); return;
    }
    setUploading(true);
    try {
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("category", category);
        fd.append("caption", caption);
        await galleryAPI.upload(fd);
      } else {
        await galleryAPI.uploadByUrl({ category, caption, imageUrl });
      }
      showToast("✅ Image uploaded to " + category);
      setCaption(""); setFile(null); setImageUrl(""); setPreview("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      showToast("❌ " + (err.response?.data?.message || "Upload failed"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(201,150,63,0.2)", maxWidth: 600 }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 300, color: "#1A0D00", marginBottom: "1.5rem", borderBottom: "1px solid rgba(201,150,63,0.2)", paddingBottom: "0.75rem" }}>
        Upload New Image
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ padding: "0.75rem 1rem", border: "1px solid rgba(201,150,63,0.3)", background: "white", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Upload from Device</label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{ border: "2px dashed rgba(201,150,63,0.4)", padding: "2rem", textAlign: "center", cursor: "pointer", background: "rgba(251,243,224,0.5)" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📁</div>
          <p style={{ color: "#8A7A6A", fontSize: "0.85rem" }}>{file ? file.name : "Click to select image (JPG, PNG, WebP — max 10MB)"}</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>

        <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Or Paste Image URL</label>
        <input
          value={imageUrl} onChange={e => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          style={{ padding: "0.75rem 1rem", border: "1px solid rgba(201,150,63,0.3)", background: "white", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}
        />

        {preview && (
          <img src={preview} alt="preview"
            onError={() => setPreview("")}
            style={{ width: 140, height: 100, objectFit: "cover", border: "1px solid rgba(201,150,63,0.3)" }} />
        )}

        <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Caption *</label>
        <input
          value={caption} onChange={e => setCaption(e.target.value)}
          placeholder="Describe this image..."
          required
          style={{ padding: "0.75rem 1rem", border: "1px solid rgba(201,150,63,0.3)", background: "white", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}
        />

        <button type="submit" disabled={uploading}
          style={{
            padding: "1rem 2rem", background: uploading ? "#8A7A6A" : "#1A0D00", color: "#E8C97A",
            border: "none", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: "600",
            letterSpacing: "0.15em", textTransform: "uppercase", cursor: uploading ? "not-allowed" : "pointer",
            alignSelf: "flex-start"
          }}>
          {uploading ? "Uploading to Cloudinary..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}

// ── Manage Gallery ────────────────────────────────────────────────────────────
function ManageGallery({ showToast }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  const loadImages = () => {
    setLoading(true);
    galleryAPI.getAll()
      .then(res => setImages(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadImages(); }, []);

  const handleDelete = async (id, cat) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    try {
      await galleryAPI.delete(id);
      setImages(prev => ({ ...prev, [cat]: prev[cat].filter(i => i.id !== id) }));
      showToast("Image deleted");
    } catch (err) {
      showToast("❌ " + (err.response?.data?.message || "Delete failed"));
    }
  };

  const catImages = images[category] || [];

  return (
    <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(201,150,63,0.2)" }}>
      <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 300, color: "#1A0D00", marginBottom: "1.5rem", borderBottom: "1px solid rgba(201,150,63,0.2)", paddingBottom: "0.75rem" }}>
        Manage Gallery
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{
              padding: "0.4rem 1rem", border: "1px solid rgba(201,150,63,0.4)",
              background: category === cat ? "#C9963F" : "transparent",
              color: category === cat ? "#1A0D00" : "#3D1F00",
              fontFamily: "inherit", fontSize: "0.8rem", cursor: "pointer",
              fontWeight: category === cat ? 600 : 400
            }}>
            {cat} ({(images[cat] || []).length})
          </button>
        ))}
      </div>
      {loading ? (
        <p style={{ color: "#8A7A6A" }}>Loading images...</p>
      ) : catImages.length === 0 ? (
        <p style={{ color: "#8A7A6A", fontStyle: "italic" }}>No images in {category}</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1rem" }}>
          {catImages.map(img => (
            <div key={img.id} style={{ position: "relative" }}>
              <img src={img.thumbnailUrl || img.url} alt={img.caption}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
              <button
                onClick={() => handleDelete(img.id, category)}
                style={{
                  position: "absolute", top: "0.3rem", right: "0.3rem",
                  background: "rgba(181,69,75,0.9)", border: "none", color: "white",
                  padding: "0.3rem 0.5rem", cursor: "pointer", fontSize: "0.7rem"
                }}>✕</button>
              <p style={{ fontSize: "0.75rem", color: "#8A7A6A", padding: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Enquiries ─────────────────────────────────────────────────────────────────
function Enquiries({ showToast }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    enquiryAPI.getAll(filter !== "all" ? { status: filter } : {})
      .then(res => setEnquiries(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await enquiryAPI.update(id, { status });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
      showToast("Status updated");
    } catch { showToast("❌ Update failed"); }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      await enquiryAPI.delete(id);
      setEnquiries(prev => prev.filter(e => e._id !== id));
      showToast("Enquiry deleted");
    } catch { showToast("❌ Delete failed"); }
  };

  return (
    <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(201,150,63,0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(201,150,63,0.2)", paddingBottom: "0.75rem" }}>
        <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 300, color: "#1A0D00", margin: 0 }}>
          Enquiries ({enquiries.length})
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["all","new","contacted","confirmed","closed"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{
                padding: "0.3rem 0.8rem", border: "1px solid rgba(201,150,63,0.3)",
                background: filter === s ? "#C9963F" : "transparent",
                color: filter === s ? "#1A0D00" : "#3D1F00",
                fontFamily: "inherit", fontSize: "0.75rem", cursor: "pointer", textTransform: "capitalize"
              }}>{s}</button>
          ))}
        </div>
      </div>
      {loading ? (
        <p style={{ color: "#8A7A6A" }}>Loading...</p>
      ) : enquiries.length === 0 ? (
        <p style={{ color: "#8A7A6A", fontStyle: "italic" }}>No enquiries found</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {enquiries.map(e => (
            <div key={e._id} style={{ padding: "1.25rem", border: "1px solid rgba(201,150,63,0.2)", background: "#FDF8F0", position: "relative" }}>
              <button onClick={() => deleteEnquiry(e._id)}
                style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "none", color: "#B5454B", cursor: "pointer", fontSize: "0.85rem" }}>✕</button>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", color: "#1A0D00" }}>{e.name}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#8A7A6A" }}>{e.phone} {e.email && `· ${e.email}`}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(201,150,63,0.15)", color: "#C9963F", border: "1px solid rgba(201,150,63,0.3)", padding: "0.15rem 0.6rem", fontSize: "0.7rem", borderRadius: "2px" }}>{e.event}</span>
                  <select value={e.status} onChange={ev => updateStatus(e._id, ev.target.value)}
                    style={{ padding: "0.2rem 0.5rem", border: `1px solid ${STATUS_COLORS[e.status]}`, background: "transparent", color: STATUS_COLORS[e.status], fontFamily: "inherit", fontSize: "0.75rem", cursor: "pointer" }}>
                    {["new","contacted","confirmed","closed"].map(s => <option key={s} value={s} style={{ color: "#2D1500" }}>{s}</option>)}
                  </select>
                </div>
              </div>
              <p style={{ margin: "0.75rem 0 0", fontSize: "0.85rem", color: "#3D1F00", lineHeight: 1.6 }}>{e.message}</p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.7rem", color: "#8A7A6A" }}>{new Date(e.createdAt).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const handleLogout = async () => { await logout(); navigate("/"); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Jost, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap'); @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      <Sidebar onLogout={handleLogout} />
      <main style={{ marginLeft: 240, flex: 1, background: "#F0E8D8", minHeight: "100vh" }}>
        <div style={{ background: "white", padding: "1rem 2rem", borderBottom: "1px solid rgba(201,150,63,0.2)", position: "sticky", top: 0, zIndex: 10 }}>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", fontWeight: 300, color: "#1A0D00", margin: 0 }}>Admin Dashboard</h1>
        </div>
        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="upload" element={<UploadImages showToast={showToast} />} />
            <Route path="manage" element={<ManageGallery showToast={showToast} />} />
            <Route path="enquiries" element={<Enquiries showToast={showToast} />} />
          </Routes>
        </div>
      </main>
      <Toast msg={toast} />
    </div>
  );
}
