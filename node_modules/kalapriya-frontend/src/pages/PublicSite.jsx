import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["Reception","Mantapa","Door Decoration","Name Board","Ramp Decoration","Jade","Hara","Chapra Decoration","Naming Ceremony"];
const ADMIN_CREDS = { username: "kalapriya_admin", password: "floral@2024" };

const CAT_GRADIENTS = {
  "Reception":         "linear-gradient(135deg,#e8734a 0%,#c0392b 100%)",
  "Mantapa":           "linear-gradient(135deg,#f4a14a 0%,#e05c2a 100%)",
  "Door Decoration":   "linear-gradient(135deg,#e8734a 0%,#8b4513 100%)",
  "Name Board":        "linear-gradient(135deg,#e07b39 0%,#c0392b 100%)",
  "Ramp Decoration":   "linear-gradient(135deg,#7a9e3b 0%,#e07b39 100%)",
  "Jade":              "linear-gradient(135deg,#e05c7a 0%,#e8734a 100%)",
  "Hara":              "linear-gradient(135deg,#e8734a 0%,#d4380d 100%)",
  "Chapra Decoration": "linear-gradient(135deg,#4a7a3b 0%,#e07b39 100%)",
  "Naming Ceremony":   "linear-gradient(135deg,#d4380d 0%,#e05c7a 100%)",
};

const SEED = {

 
  
  
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const Heart=({filled,size=18})=><svg viewBox="0 0 24 24" fill={filled?"currentColor":"none"} stroke="currentColor" strokeWidth="2" style={{width:size,height:size}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const WaIcon=({size=22})=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:size,height:size}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
const ChevL=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:20,height:20}}><polyline points="15 18 9 12 15 6"/></svg>;
const ChevR=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:20,height:20}}><polyline points="9 18 15 12 9 6"/></svg>;
const FlowerIcon=()=><svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" style={{width:48,height:48,marginBottom:"0.5rem"}}><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 3 3c0 1.5-1 2.5-3 3-2 .5-3 1.5-3 3a3 3 0 0 1-3-3c0-1.5 1-2.5 3-3 2-.5 3-1.5 3-3z" opacity=".5"/><ellipse cx="12" cy="7" rx="2" ry="3"/><ellipse cx="17" cy="12" rx="3" ry="2"/><ellipse cx="12" cy="17" rx="2" ry="3"/><ellipse cx="7" cy="12" rx="3" ry="2"/></svg>;
const PhoneIcon=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>;
const MailIcon=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const PinIcon=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const SendIcon=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
const ArrowRight=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:16,height:16}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:#fdf6f0;color:#2d1a0e;overflow-x:hidden}
  .pf{font-family:'Playfair Display',serif}
  
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes pulseWa{0%,100%{box-shadow:0 4px 24px rgba(37,211,102,.45)}50%{box-shadow:0 8px 36px rgba(37,211,102,.7)}}
  @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
  
  .afu{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) both}
  .afi{animation:fadeIn .2s ease both}
  .asu{animation:slideUp .3s cubic-bezier(.16,1,.3,1) both}
  .waf{animation:pulseWa 2.5s ease-in-out infinite}

  /* Gallery card */
  .gcrd{border-radius:20px;overflow:hidden;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease}
  .gcrd:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(180,80,30,.25)}
  .gcrd img{transition:transform .6s ease;width:100%;height:100%;object-fit:cover;display:block}
  .gcrd:hover img{transform:scale(1.06)}
  .gcrd:hover .gov{opacity:1}
  .gov{opacity:0;transition:opacity .3s;position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 50%);display:flex;align-items:flex-end;padding:1rem;border-radius:20px}

  /* Category card (coming soon) */
  .ccat{border-radius:20px;overflow:hidden;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease;background:white;box-shadow:0 2px 16px rgba(0,0,0,.08)}
  .ccat:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(180,80,30,.2)}
  .ccat-thumb{display:flex;flex-direction:column;align-items:center;justify-content:center;height:180px}
  .ccat-body{padding:1rem 1.25rem 1.25rem}

  /* Nav pill button */
  .nav-link{color:rgba(45,26,14,.75);font-size:.8rem;font-weight:500;letter-spacing:.04em;text-decoration:none;padding:.4rem .85rem;border-radius:999px;cursor:pointer;transition:all .2s}
  .nav-link:hover{background:rgba(224,123,57,.12);color:#e07b39}

  /* Category tab pills */
  .cat-pill{padding:.45rem 1.1rem;border-radius:999px;border:1.5px solid rgba(224,123,57,.35);background:transparent;color:#6b3a1f;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:500;cursor:pointer;transition:all .22s}
  .cat-pill.active{background:linear-gradient(135deg,#e8734a,#c0392b);border-color:transparent;color:white;box-shadow:0 4px 16px rgba(224,115,74,.4)}

  /* Contact card */
  .contact-card{background:white;border-radius:24px;padding:2rem;box-shadow:0 4px 32px rgba(180,80,30,.1)}
  .contact-icon{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#e8734a,#c0392b);display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0}
  
  /* Form inputs */
  .finp{width:100%;padding:.85rem 1.1rem;border:1.5px solid #e8d5c8;border-radius:12px;background:white;font-family:'Inter',sans-serif;font-size:.9rem;color:#2d1a0e;outline:none;transition:border-color .2s,box-shadow .2s}
  .finp:focus{border-color:#e8734a;box-shadow:0 0 0 3px rgba(232,115,74,.12)}
  .finp::placeholder{color:#b8a090}

  /* Primary button - orange gradient */
  .btn-grad{background:linear-gradient(135deg,#e8734a 0%,#c0392b 100%);color:white;border:none;border-radius:12px;padding:.85rem 1.75rem;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;cursor:pointer;transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:.55rem;box-shadow:0 4px 20px rgba(232,115,74,.35)}
  .btn-grad:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(232,115,74,.5)}
  .btn-outline{background:transparent;color:white;border:2px solid rgba(255,255,255,.6);border-radius:12px;padding:.82rem 1.75rem;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:500;cursor:pointer;transition:all .2s;backdrop-filter:blur(4px)}
  .btn-outline:hover{background:rgba(255,255,255,.15);border-color:white}

  /* Admin sidebar */
  .adm-nav{display:flex;align-items:center;gap:.65rem;padding:.78rem 1.4rem;border-radius:12px;color:rgba(255,255,255,.6);background:transparent;font-family:'Inter',sans-serif;font-size:.84rem;cursor:pointer;width:100%;text-align:left;transition:all .18s;border:none;margin:.1rem .75rem;width:calc(100% - 1.5rem)}
  .adm-nav.active{background:rgba(232,115,74,.2);color:#f4a77e;font-weight:500}
  .adm-nav:hover:not(.active){background:rgba(255,255,255,.06);color:rgba(255,255,255,.85)}

  /* Stat card */
  .stat-card{background:white;border-radius:16px;padding:1.4rem;box-shadow:0 2px 16px rgba(0,0,0,.06);border-bottom:3px solid transparent;background-clip:padding-box;position:relative;overflow:hidden}
  .stat-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#e8734a,#c0392b)}

  /* Upload drop zone */
  .drop-zone{border:2px dashed rgba(232,115,74,.4);border-radius:16px;padding:2rem;text-align:center;cursor:pointer;background:rgba(252,245,240,.8);transition:all .2s}
  .drop-zone:hover{border-color:#e8734a;background:rgba(232,115,74,.06)}

  /* Enquiry card */
  .enq-card{background:white;border-radius:16px;padding:1.25rem;box-shadow:0 2px 12px rgba(0,0,0,.06);border-left:4px solid #e8734a}

  /* Scrollbar */
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:#fdf6f0}
  ::-webkit-scrollbar-thumb{background:linear-gradient(#e8734a,#c0392b);border-radius:3px}

  select option{color:#2d1a0e!important}
`;

// ── Color tokens ───────────────────────────────────────────────────────────────
const ora="#e8734a", red="#c0392b", cream="#fdf6f0", dark="#2d1a0e", muted="#8a7060";
const gradBtn="linear-gradient(135deg,#e8734a 0%,#c0392b 100%)";

function Toast({msg}){
  if(!msg) return null;
  return <div className="afi" style={{position:"fixed",bottom:"5.5rem",right:"1.5rem",zIndex:999,background:dark,color:"#f4a77e",padding:".7rem 1.2rem",borderRadius:12,fontSize:".8rem",maxWidth:250,boxShadow:"0 8px 24px rgba(0,0,0,.3)"}}>{msg}</div>;
}

function GCard({img,isFav,onFav,onClick}){
  return(
    <div className="gcrd" onClick={onClick} style={{position:"relative",background:"#e8d5c8",aspectRatio:"4/3"}}>
      <img src={img.url} alt={img.caption} loading="lazy"/>
      <button onClick={e=>{e.stopPropagation();onFav();}} style={{position:"absolute",top:".6rem",right:".6rem",zIndex:2,background:"rgba(255,255,255,.85)",backdropFilter:"blur(6px)",border:"none",cursor:"pointer",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:isFav?"#e05c7a":"#8a7060",transition:"all .22s",boxShadow:"0 2px 10px rgba(0,0,0,.15)"}}>
        <Heart filled={isFav}/>
      </button>
      <div className="gov"><span className="pf" style={{color:"white",fontSize:"1rem",fontStyle:"italic",textShadow:"0 1px 4px rgba(0,0,0,.5)"}}>{img.caption}</span></div>
    </div>
  );
}

// Category card with gradient placeholder (matching screenshot style)
function CatCard({cat,count,onClick}){
  const grad=CAT_GRADIENTS[cat]||"linear-gradient(135deg,#e8734a,#c0392b)";
  if(count>0) return null; // shown as image grid when has images
  return(
    <div className="ccat" onClick={onClick}>
      <div className="ccat-thumb" style={{background:grad}}>
        <FlowerIcon/>
        <span style={{color:"rgba(255,255,255,.8)",fontSize:".78rem",letterSpacing:".06em"}}>Gallery coming soon</span>
      </div>
      <div className="ccat-body">
        <h3 style={{fontWeight:700,fontSize:"1.05rem",color:dark,marginBottom:".35rem"}}>{cat}</h3>
        <button style={{background:"none",border:"none",color:ora,fontFamily:"Inter,sans-serif",fontSize:".84rem",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:".3rem",padding:0}}>
          View Gallery <ArrowRight/>
        </button>
      </div>
    </div>
  );
}

function Lightbox({images,index,onClose,favs,onFav,showToast}){
  const [idx,setIdx]=useState(index);
  const img=images[idx];
  const prev=()=>setIdx(i=>Math.max(0,i-1));
  const next=()=>setIdx(i=>Math.min(images.length-1,i+1));
  useEffect(()=>{
    const h=e=>{if(e.key==="ArrowLeft")prev();if(e.key==="ArrowRight")next();if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h);
  },[idx]);
  if(!img) return null;
  const isFav=favs.includes(img.id);
  return(
    <div className="afi" onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.9)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{position:"relative",maxWidth:"90vw",maxHeight:"90vh"}}>
        <button onClick={onClose} style={{position:"absolute",top:"-2.5rem",right:0,background:"none",border:"none",color:"white",cursor:"pointer",fontSize:"1.4rem",lineHeight:1,opacity:.8}}>✕</button>
        {idx>0&&<button onClick={prev} style={{position:"absolute",top:"50%",left:"-3.2rem",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",color:"white",cursor:"pointer",padding:".5rem",display:"flex",borderRadius:8,backdropFilter:"blur(4px)"}}><ChevL/></button>}
        {idx<images.length-1&&<button onClick={next} style={{position:"absolute",top:"50%",right:"-3.2rem",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",color:"white",cursor:"pointer",padding:".5rem",display:"flex",borderRadius:8,backdropFilter:"blur(4px)"}}><ChevR/></button>}
        <img src={img.url} alt={img.caption} style={{maxWidth:"100%",maxHeight:"80vh",objectFit:"contain",borderRadius:16}}/>
        <div style={{textAlign:"center",marginTop:".75rem",display:"flex",alignItems:"center",justifyContent:"center",gap:".75rem"}}>
          <span className="pf" style={{color:"rgba(255,255,255,.9)",fontSize:"1rem",fontStyle:"italic"}}>{img.caption}</span>
          <button onClick={()=>{onFav(img.id);showToast(isFav?"Removed from favourites":"Added to favourites");}} style={{background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",color:isFav?"#e05c7a":"rgba(255,255,255,.65)",display:"flex",padding:".35rem",borderRadius:8,backdropFilter:"blur(4px)"}}>
            <Heart filled={isFav}/>
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:".35rem",color:"rgba(255,255,255,.35)",fontSize:".68rem"}}>{idx+1} / {images.length}</div>
      </div>
    </div>
  );
}

function PublicSite({onAdmin,gallery,favs,toggleFav,addEnquiry,showToast}){
  const [cat,setCat]=useState("Reception");
  const [lb,setLb]=useState(null);
  const allImgs=Object.values(gallery).flat();
  const scroll=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  useEffect(()=>{document.body.style.overflow=lb?"hidden":"";return()=>{document.body.style.overflow="";};},[lb]);

  // Form
  const [form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const [formOk,setFormOk]=useState(false);
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submitForm=()=>{
    if(!form.name||!form.email||!form.message){showToast("Please fill required fields");return;}
    addEnquiry(form); setFormOk(true);
  };

  const catImgs=gallery[cat]||[];

  return(
    <>
      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(253,246,240,.92)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(232,115,74,.15)",padding:"0 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div className="pf" style={{fontSize:"1.25rem",fontWeight:700,color:dark,letterSpacing:".01em"}}>
          Kalapriya <span style={{color:ora,fontStyle:"italic"}}>Flower Decor</span>
        </div>
        <ul style={{display:"flex",gap:".25rem",listStyle:"none"}}>
          {["Gallery","Favourites","Contact"].map(l=>(
            <li key={l}><a onClick={()=>scroll(l.toLowerCase())} className="nav-link">{l}</a></li>
          ))}
        </ul>
        <button onClick={onAdmin} style={{padding:".45rem 1.2rem",border:"1.5px solid rgba(232,115,74,.5)",background:"transparent",color:ora,fontFamily:"Inter,sans-serif",fontSize:".78rem",fontWeight:600,cursor:"pointer",borderRadius:999,transition:"all .2s"}}
          onMouseEnter={e=>{e.target.style.background=ora;e.target.style.color="white";}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=ora;}}>
          Admin ↗
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",padding:"0 5%",backgroundImage:"url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80')",backgroundSize:"cover",backgroundPosition:"center"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,.62) 0%,rgba(20,10,5,.45) 60%,rgba(0,0,0,.3) 100%)"}}/>
        <div className="afu" style={{position:"relative",maxWidth:680}}>
          <p style={{fontSize:".72rem",letterSpacing:".35em",textTransform:"uppercase",color:"rgba(255,255,255,.75)",marginBottom:"1.1rem",fontWeight:500}}>Kalapriya Flower Decor Event Management</p>
          <h1 className="pf" style={{fontSize:"clamp(2.4rem,6vw,4.8rem)",fontWeight:700,lineHeight:1.1,color:"white",marginBottom:"1.25rem"}}>
            Elegant floral<br/>decorations for<br/><em style={{fontStyle:"italic",color:"#f4c17a"}}>every celebration.</em>
          </h1>
          <p style={{fontSize:"1rem",color:"rgba(255,255,255,.78)",lineHeight:1.7,marginBottom:"2.2rem",maxWidth:520}}>
            From Reception and Mantapa to Naming Ceremony setups, we design unforgettable spaces with premium flowers, themed styling, and meticulous execution.
          </p>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <button className="btn-grad" onClick={()=>scroll("gallery")}>View Gallery <ArrowRight/></button>
            <button className="btn-outline" onClick={()=>scroll("contact")}>Send Enquiry</button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:".35rem",color:"rgba(255,255,255,.5)",fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",animation:"floatY 2s ease-in-out infinite"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>Scroll
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{padding:"5.5rem 5%",background:cream}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <p style={{fontSize:".72rem",letterSpacing:".3em",textTransform:"uppercase",color:ora,fontWeight:600,marginBottom:".7rem"}}>Our Portfolio</p>
            <h2 className="pf" style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:dark}}>Gallery of <em style={{fontStyle:"italic",color:red}}>Excellence</em></h2>
          </div>

          {/* Category pills */}
          <div style={{display:"flex",flexWrap:"wrap",gap:".5rem",justifyContent:"center",marginBottom:"2.5rem"}}>
            {CATEGORIES.map(c=>(
              <button key={c} className={`cat-pill${cat===c?" active":""}`} onClick={()=>setCat(c)}>{c}</button>
            ))}
          </div>

          {/* Images grid or coming-soon cards */}
          {catImgs.length>0
            ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
                {catImgs.map((img,i)=>(
                  <GCard key={img.id} img={img} isFav={favs.includes(img.id)}
                    onClick={()=>setLb({images:catImgs,index:i})}
                    onFav={()=>{toggleFav(img.id);showToast(favs.includes(img.id)?"Removed from favourites":"Added to favourites");}}/>
                ))}
              </div>
            : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1.25rem"}}>
                <div className="ccat" style={{cursor:"default"}}>
                  <div className="ccat-thumb" style={{background:CAT_GRADIENTS[cat]}}>
                    <FlowerIcon/>
                    <span style={{color:"rgba(255,255,255,.8)",fontSize:".78rem",letterSpacing:".06em"}}>Gallery coming soon</span>
                  </div>
                  <div className="ccat-body">
                    <h3 style={{fontWeight:700,fontSize:"1.05rem",color:dark,marginBottom:".35rem"}}>{cat}</h3>
                    <span style={{color:ora,fontSize:".84rem",fontWeight:500}}>Photos uploading soon →</span>
                  </div>
                </div>
              </div>
          }

          {/* All category cards overview when no specific filter */}
          <div style={{marginTop:"3.5rem"}}>
            <p style={{textAlign:"center",fontSize:".78rem",letterSpacing:".2em",textTransform:"uppercase",color:muted,marginBottom:"1.75rem",fontWeight:500}}>All Service Categories</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1.1rem"}}>
              {CATEGORIES.map(c=>{
                const imgs=gallery[c]||[];
                const grad=CAT_GRADIENTS[c];
                return(
                  <div key={c} className="ccat" onClick={()=>{setCat(c);scroll("gallery");}}>
                    {imgs.length>0
                      ? <div style={{height:140,overflow:"hidden"}}><img src={imgs[0].url} alt={c} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .4s ease"}}/></div>
                      : <div style={{height:140,background:grad,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><FlowerIcon/><span style={{color:"rgba(255,255,255,.7)",fontSize:".72rem"}}>Coming soon</span></div>
                    }
                    <div className="ccat-body" style={{padding:".9rem 1rem 1rem"}}>
                      <h3 style={{fontWeight:700,fontSize:".95rem",color:dark,marginBottom:".25rem"}}>{c}</h3>
                      <button style={{background:"none",border:"none",color:ora,fontFamily:"Inter,sans-serif",fontSize:".8rem",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:".3rem",padding:0}}>
                        View Gallery <ArrowRight/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAVOURITES ── */}
      <section id="favourites" style={{padding:"5.5rem 5%",background:"#f5ebe0"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <p style={{fontSize:".72rem",letterSpacing:".3em",textTransform:"uppercase",color:ora,fontWeight:600,marginBottom:".7rem"}}>Your Collection</p>
            <h2 className="pf" style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:dark}}>My <em style={{fontStyle:"italic",color:red}}>Favourites</em></h2>
          </div>
          {favs.length===0
            ? <div style={{textAlign:"center",padding:"3.5rem",background:"white",borderRadius:24,boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
                <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🌸</div>
                <p className="pf" style={{fontSize:"1.2rem",fontStyle:"italic",color:muted}}>Click the ♡ on any image to save it here</p>
              </div>
            : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
                {allImgs.filter(img=>favs.includes(img.id)).map((img,i)=>{
                  const fi=allImgs.filter(x=>favs.includes(x.id));
                  return<GCard key={img.id} img={img} isFav={true} onClick={()=>setLb({images:fi,index:i})} onFav={()=>{toggleFav(img.id);showToast("Removed from favourites");}}/>;
                })}
              </div>
          }
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"5.5rem 5%",background:cream}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <p style={{fontSize:".72rem",letterSpacing:".3em",textTransform:"uppercase",color:ora,fontWeight:600,marginBottom:".7rem"}}>Get In Touch</p>
            <h2 className="pf" style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:dark}}>Plan Your <em style={{fontStyle:"italic",color:red}}>Dream Event</em></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:"2rem",alignItems:"start"}}>

            {/* Left: Get In Touch card */}
            <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
              <div className="contact-card">
                <h3 style={{fontWeight:700,fontSize:"1.4rem",color:dark,marginBottom:"1.5rem"}}>Get In Touch</h3>
                {[
                  [<PhoneIcon/>,"+91 86606 10864","PHONE"],
                  [<MailIcon/>,"kalapriyadecorations@gmail.com","EMAIL"],
                  [<PinIcon/>,"Chikkaballapur, Karnataka, India","ADDRESS"],
                ].map(([icon,val,label])=>(
                  <div key={label} style={{display:"flex",gap:"1rem",alignItems:"flex-start",marginBottom:"1.2rem"}}>
                    <div className="contact-icon">{icon}</div>
                    <div>
                      <div style={{fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,fontWeight:600,marginBottom:".2rem"}}>{label}</div>
                      <div style={{fontSize:".9rem",color:dark,fontWeight:500}}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/918660610864" target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".75rem",padding:"1rem",background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",borderRadius:16,textDecoration:"none",fontFamily:"Inter,sans-serif",fontSize:".95rem",fontWeight:600,boxShadow:"0 6px 24px rgba(37,211,102,.3)",transition:"transform .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(37,211,102,.45)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 6px 24px rgba(37,211,102,.3)";}}>
                <WaIcon size={22}/> Chat on WhatsApp
              </a>
            </div>

            {/* Right: Send an Enquiry card */}
            <div className="contact-card">
              <h3 style={{fontWeight:700,fontSize:"1.4rem",color:dark,marginBottom:"1.5rem"}}>Send an Enquiry</h3>
              {formOk
                ? <div style={{textAlign:"center",padding:"2rem 1rem"}}>
                    <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✅</div>
                    <p className="pf" style={{fontSize:"1.2rem",fontStyle:"italic",color:"#2d7a3f"}}>Thank you! We'll be in touch within 24 hours.</p>
                  </div>
                : <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                    {[
                      ["YOUR NAME *","text","e.g. Priya Sharma","name"],
                      ["EMAIL ADDRESS *","email","you@example.com","email"],
                      ["PHONE NUMBER","tel","+91 98765 43210","phone"],
                    ].map(([label,type,ph,key])=>(
                      <div key={key}>
                        <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>{label}</label>
                        <input className="finp" type={type} placeholder={ph} value={form[key]} onChange={e=>sf(key,e.target.value)}/>
                      </div>
                    ))}
                    <div>
                      <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>MESSAGE *</label>
                      <textarea className="finp" rows={4} placeholder="Tell us about your event, date, and requirements..." value={form.message} onChange={e=>sf("message",e.target.value)} style={{resize:"vertical"}}/>
                    </div>
                    <button className="btn-grad" onClick={submitForm} style={{width:"100%",justifyContent:"center",borderRadius:12,padding:"1rem"}}>
                      <SendIcon/> Send Enquiry
                    </button>
                    <p style={{fontSize:".75rem",color:muted,textAlign:"center"}}>This will open your email app with the message pre-filled.</p>
                  </div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#1a0e08",padding:"3rem 5% 1.5rem",color:"rgba(255,255,255,.55)"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr",gap:"2.5rem",marginBottom:"2.5rem"}}>
            <div>
              <h3 className="pf" style={{fontSize:"1.3rem",color:"white",marginBottom:".85rem"}}>Kalapriya Flower Decor</h3>
              <p style={{fontSize:".82rem",lineHeight:1.75,maxWidth:280}}>Transforming venues into floral masterpieces. Every event is a canvas; every bloom is a brushstroke.</p>
            </div>
            <div>
              <h4 style={{fontSize:".7rem",letterSpacing:".2em",textTransform:"uppercase",color:ora,marginBottom:"1rem",fontWeight:600}}>Services</h4>
              {CATEGORIES.slice(0,6).map(c=><div key={c} style={{fontSize:".82rem",marginBottom:".45rem",cursor:"pointer"}} onClick={()=>{setCat(c);scroll("gallery");}}>{c}</div>)}
            </div>
            <div>
              <h4 style={{fontSize:".7rem",letterSpacing:".2em",textTransform:"uppercase",color:ora,marginBottom:"1rem",fontWeight:600}}>Quick Links</h4>
              {["Gallery","Favourites","Contact"].map(l=>(
                <div key={l} onClick={()=>scroll(l.toLowerCase())} style={{fontSize:".82rem",marginBottom:".45rem",cursor:"pointer"}}>{l}</div>
              ))}
              <div onClick={onAdmin} style={{fontSize:".82rem",marginBottom:".45rem",cursor:"pointer",color:ora}}>Admin Panel ↗</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:"1.25rem",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",fontSize:".72rem"}}>
            <span>© 2024 Kalapriya Flower Decor. All rights reserved.</span>
            <span>Designed with ♥ for every celebration</span>
          </div>
        </div>
      </footer>

      {/* WA Float */}
      <a href="https://wa.me/918660610864" target="_blank" rel="noopener noreferrer" className="waf"
        style={{position:"fixed",bottom:"1.75rem",right:"1.75rem",zIndex:200,background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,.45)"}}>
        <WaIcon size={28}/>
      </a>

      {lb&&<Lightbox images={lb.images} index={lb.index} onClose={()=>setLb(null)} favs={favs} onFav={toggleFav} showToast={showToast}/>}
    </>
  );
}

function AdminLogin({onLogin,onClose}){
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
  const go=()=>{u===ADMIN_CREDS.username&&p===ADMIN_CREDS.password?onLogin():setErr("Invalid credentials.");};
  return(
    <div className="afi" onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div className="asu" style={{background:"white",width:"100%",maxWidth:420,borderRadius:24,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.2)"}}>
        <div style={{background:gradBtn,padding:"1.5rem 1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span className="pf" style={{fontSize:"1.3rem",color:"white",fontStyle:"italic"}}>Admin Login</span>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",cursor:"pointer",fontSize:"1.1rem",lineHeight:1,width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"1.75rem"}}>
          <div style={{fontSize:".78rem",color:muted,marginBottom:"1.25rem",background:"#fdf6f0",padding:".75rem 1rem",borderRadius:12,lineHeight:1.65}}>
            Username: <strong style={{color:dark}}>kalapriya_admin</strong><br/>Password: <strong style={{color:dark}}>floral@2024</strong>
          </div>
          {err&&<div style={{background:"#fff0f0",border:"1.5px solid #fca5a5",color:"#dc2626",padding:".65rem 1rem",fontSize:".82rem",marginBottom:".9rem",borderRadius:10,textAlign:"center"}}>{err}</div>}
          {[["Username",u,setU,"text"],["Password",p,setP,"password"]].map(([label,val,setter,type])=>(
            <div key={label} style={{marginBottom:".9rem"}}>
              <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>{label}</label>
              <input className="finp" type={type} value={val} onChange={e=>setter(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} style={{borderRadius:12}}/>
            </div>
          ))}
          <button className="btn-grad" onClick={go} style={{width:"100%",justifyContent:"center",marginTop:".5rem",borderRadius:12,padding:".9rem"}}>
            Login to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({gallery,enquiries,onAdd,onDel,onLogout,showToast}){
  const [sec,setSec]=useState("upload");
  const NAVS=[["dashboard","📊","Dashboard"],["upload","📤","Upload Images"],["manage","🗂","Manage Gallery"],["enquiries","📋","Enquiries"]];
  const total=Object.values(gallery).flat().length;
  const [cat,setCat]=useState(CATEGORIES[0]);
  const [caption,setCaption]=useState(""); const [url,setUrl]=useState(""); const [preview,setPreview]=useState(""); const [file,setFile]=useState(null);
  const [manageCat,setManageCat]=useState(CATEGORIES[0]);
  const fileRef=useRef();
  const handleFile=e=>{const f=e.target.files[0];if(!f)return;setFile(f);setUrl("");const r=new FileReader();r.onload=ev=>{setPreview(ev.target.result);setUrl(ev.target.result);};r.readAsDataURL(f);};
  const handleUrl=v=>{setUrl(v);setFile(null);setPreview(v);};
  const submitUpload=()=>{if(!caption||!url){showToast("Please provide image and caption");return;}onAdd(cat,{id:`img_${Date.now()}`,url,caption});setCaption("");setUrl("");setPreview("");setFile(null);if(fileRef.current)fileRef.current.value="";showToast("Image added to "+cat);};

  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"Inter,sans-serif",background:"#f5ebe0"}}>
      {/* Sidebar */}
      <aside style={{width:256,background:"#1a0e08",position:"fixed",top:0,left:0,bottom:0,overflowY:"auto",zIndex:50,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"1.5rem",marginBottom:".5rem"}}>
          <div style={{background:gradBtn,borderRadius:12,padding:"1rem 1.25rem"}}>
            <h2 className="pf" style={{fontSize:"1.1rem",color:"white",fontStyle:"italic"}}>Kalapriya Admin</h2>
            <p style={{fontSize:".62rem",color:"rgba(255,255,255,.6)",letterSpacing:".1em",textTransform:"uppercase",marginTop:".15rem"}}>Management Portal</p>
          </div>
        </div>
        {NAVS.map(([key,icon,label])=>(
          <button key={key} onClick={()=>setSec(key)} className={`adm-nav${sec===key?" active":""}`}>
            <span style={{fontSize:"1rem"}}>{icon}</span> {label}
          </button>
        ))}
        <div style={{marginTop:"auto",padding:"1.25rem"}}>
          <button onClick={onLogout} style={{width:"100%",padding:".6rem",background:"rgba(232,115,74,.15)",border:"1.5px solid rgba(232,115,74,.3)",color:ora,fontFamily:"Inter,sans-serif",fontSize:".78rem",cursor:"pointer",borderRadius:10,fontWeight:500}}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{marginLeft:256,flex:1,minHeight:"100vh"}}>
        <div style={{background:"white",padding:"1rem 2rem",borderBottom:"1px solid rgba(232,115,74,.15)",position:"sticky",top:0,zIndex:10,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 1px 12px rgba(0,0,0,.06)"}}>
          <h1 className="pf" style={{fontSize:"1.5rem",fontWeight:700,color:dark}}>{NAVS.find(n=>n[0]===sec)?.[2]}</h1>
          <span style={{fontSize:".78rem",color:muted,background:"#fdf6f0",padding:".35rem .85rem",borderRadius:999}}>{total} total images</span>
        </div>
        <div style={{padding:"2rem"}}>

          {/* DASHBOARD */}
          {sec==="dashboard"&&(<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2rem"}}>
              {[["Total Images",total,"🖼️"],["Categories",CATEGORIES.length,"📁"],["Enquiries",enquiries.length,"💌"]].map(([l,n,e])=>(
                <div key={l} className="stat-card">
                  <div style={{fontSize:"2.4rem",marginBottom:".25rem"}}>{e}</div>
                  <div className="pf" style={{fontSize:"2rem",color:ora,fontWeight:700,lineHeight:1}}>{n}</div>
                  <div style={{fontSize:".72rem",color:muted,textTransform:"uppercase",letterSpacing:".08em",marginTop:".35rem"}}>{l}</div>
                </div>
              ))}
            </div>
            <h3 className="pf" style={{fontWeight:700,color:dark,marginBottom:"1rem",fontSize:"1.2rem"}}>Images per Category</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:".85rem"}}>
              {CATEGORIES.map(c=>(
                <div key={c} style={{background:"white",borderRadius:14,padding:".9rem",border:"1px solid rgba(232,115,74,.15)",cursor:"pointer"}} onClick={()=>{setSec("manage");setManageCat(c);}}>
                  <div style={{height:6,borderRadius:3,background:CAT_GRADIENTS[c],marginBottom:".65rem"}}/>
                  <div className="pf" style={{fontSize:"1.75rem",color:ora,fontWeight:700}}>{(gallery[c]||[]).length}</div>
                  <div style={{fontSize:".76rem",color:dark,marginTop:".1rem",fontWeight:500}}>{c}</div>
                </div>
              ))}
            </div>
            {enquiries.length>0&&(<div style={{marginTop:"2rem",background:"white",borderRadius:16,padding:"1.5rem",border:"1px solid rgba(232,115,74,.15)"}}>
              <h3 className="pf" style={{fontWeight:700,color:dark,marginBottom:"1rem",fontSize:"1.2rem"}}>Recent Enquiries</h3>
              {enquiries.slice(0,3).map(e=>(
                <div key={e.id} className="enq-card" style={{marginBottom:".75rem"}}>
                  <strong style={{color:dark}}>{e.name}</strong> <span style={{fontSize:".8rem",color:muted,marginLeft:".5rem"}}>{e.phone||e.email}</span>
                  <p style={{fontSize:".82rem",color:dark,marginTop:".3rem",opacity:.75}}>{(e.message||"").slice(0,100)}{(e.message||"").length>100?"…":""}</p>
                </div>
              ))}
            </div>)}
          </>)}

          {/* UPLOAD */}
          {sec==="upload"&&(
            <div style={{background:"white",borderRadius:20,padding:"2rem",border:"1px solid rgba(232,115,74,.15)",maxWidth:560,boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
              <h2 className="pf" style={{fontWeight:700,color:dark,marginBottom:"1.5rem",fontSize:"1.35rem"}}>Upload New Image</h2>
              <div style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
                <div>
                  <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>Category</label>
                  <select className="finp" style={{borderRadius:12}} value={cat} onChange={e=>setCat(e.target.value)}>
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="drop-zone" onClick={()=>fileRef.current?.click()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={ora} strokeWidth="1.5" style={{width:40,height:40,margin:"0 auto .6rem",display:"block"}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p style={{color:muted,fontSize:".82rem",marginBottom:".35rem"}}>{file?<strong style={{color:dark}}>{file.name}</strong>:"Click to select image"}</p>
                  <p style={{color:"#c4a898",fontSize:".72rem"}}>JPG, PNG, WebP — max 10MB</p>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
                </div>
                <div>
                  <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>Or Paste Image URL</label>
                  <input className="finp" style={{borderRadius:12}} value={url.startsWith("data:")?"":(preview===url?url:"")} onChange={e=>handleUrl(e.target.value)} placeholder="https://example.com/image.jpg"/>
                </div>
                {preview&&<img src={preview} alt="preview" onError={()=>setPreview("")} style={{width:140,height:100,objectFit:"cover",borderRadius:12,border:"2px solid rgba(232,115,74,.25)"}}/>}
                <div>
                  <label style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:muted,display:"block",marginBottom:".4rem",fontWeight:600}}>Caption *</label>
                  <input className="finp" style={{borderRadius:12}} value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Describe this image…"/>
                </div>
                <button className="btn-grad" onClick={submitUpload} style={{alignSelf:"flex-start",borderRadius:12}}>Add to Gallery</button>
              </div>
            </div>
          )}

          {/* MANAGE */}
          {sec==="manage"&&(
            <div style={{background:"white",borderRadius:20,padding:"2rem",border:"1px solid rgba(232,115,74,.15)",boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
              <h2 className="pf" style={{fontWeight:700,color:dark,marginBottom:"1.5rem",fontSize:"1.35rem"}}>Manage Gallery</h2>
              <div style={{display:"flex",flexWrap:"wrap",gap:".5rem",marginBottom:"1.5rem"}}>
                {CATEGORIES.map(c=>(
                  <button key={c} className={`cat-pill${manageCat===c?" active":""}`} onClick={()=>setManageCat(c)}>
                    {c} ({(gallery[c]||[]).length})
                  </button>
                ))}
              </div>
              {(gallery[manageCat]||[]).length===0
                ? <div style={{textAlign:"center",padding:"2.5rem",color:muted,fontStyle:"italic"}}>No images in {manageCat}</div>
                : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"1rem"}}>
                    {(gallery[manageCat]||[]).map(img=>(
                      <div key={img.id} style={{position:"relative",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.1)"}}>
                        <img src={img.url} alt={img.caption} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",display:"block"}}/>
                        <button onClick={()=>onDel(manageCat,img.id)} style={{position:"absolute",top:".4rem",right:".4rem",background:"rgba(220,38,38,.9)",border:"none",color:"white",padding:".3rem .45rem",cursor:"pointer",display:"flex",alignItems:"center",borderRadius:8,backdropFilter:"blur(4px)"}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{width:13,height:13}}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                        </button>
                        <div style={{padding:".45rem .6rem",background:"white"}}>
                          <p style={{fontSize:".7rem",color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{img.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}

          {/* ENQUIRIES */}
          {sec==="enquiries"&&(
            <div style={{background:"white",borderRadius:20,padding:"2rem",border:"1px solid rgba(232,115,74,.15)",boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
              <h2 className="pf" style={{fontWeight:700,color:dark,marginBottom:"1.5rem",fontSize:"1.35rem"}}>Enquiries ({enquiries.length})</h2>
              {enquiries.length===0
                ? <div style={{textAlign:"center",padding:"2.5rem",color:muted,fontStyle:"italic"}}>No enquiries yet</div>
                : <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                    {enquiries.map(e=>(
                      <div key={e.id} className="enq-card">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:".45rem"}}>
                          <div><h4 style={{margin:"0 0 .18rem",color:dark,fontWeight:600}}>{e.name}</h4><p style={{margin:0,fontSize:".8rem",color:muted}}>{e.phone||""}{e.email&&` · ${e.email}`}</p></div>
                          {e.event&&<span style={{background:"rgba(232,115,74,.12)",color:ora,border:"1.5px solid rgba(232,115,74,.25)",padding:".12rem .65rem",fontSize:".68rem",borderRadius:999,fontWeight:500}}>{e.event}</span>}
                        </div>
                        <p style={{margin:".6rem 0 0",fontSize:".84rem",color:dark,lineHeight:1.6,opacity:.8}}>{e.message}</p>
                        <p style={{margin:".4rem 0 0",fontSize:".68rem",color:muted}}>{e.date}</p>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("home");
  const [gallery,setGallery]=useState(SEED);
  const [favs,setFavs]=useState([]);
  const [enquiries,setEnquiries]=useState([]);
  const [toast,setToast]=useState(null);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),3000);};
  const toggleFav=id=>setFavs(p=>p.includes(id)?p.filter(f=>f!==id):[...p,id]);
  const addImage=(cat,img)=>setGallery(p=>({...p,[cat]:[...(p[cat]||[]),img]}));
  const delImage=(cat,id)=>{setGallery(p=>({...p,[cat]:p[cat].filter(i=>i.id!==id)}));setFavs(p=>p.filter(f=>f!==id));showToast("Image removed");};
  const addEnquiry=data=>setEnquiries(p=>[{...data,id:Date.now(),date:new Date().toLocaleString()},...p]);
  return(<>
    <style>{CSS}</style>
    {page==="home"&&<PublicSite onAdmin={()=>setPage("login")} gallery={gallery} favs={favs} toggleFav={toggleFav} addEnquiry={addEnquiry} showToast={showToast}/>}
    {page==="admin"&&<AdminDashboard gallery={gallery} enquiries={enquiries} onAdd={addImage} onDel={delImage} onLogout={()=>setPage("home")} showToast={showToast}/>}
    {page==="login"&&(<>
      <PublicSite onAdmin={()=>setPage("login")} gallery={gallery} favs={favs} toggleFav={toggleFav} addEnquiry={addEnquiry} showToast={showToast}/>
      <AdminLogin onLogin={()=>setPage("admin")} onClose={()=>setPage("home")}/>
    </>)}
    <Toast msg={toast}/>
  </>);
}