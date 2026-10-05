(function(){
  // ---- Edit these two links with your real profiles ----
  // Leave a link as "" and clicking it shows the Coming Soon card until you add the real URL.
  var LINKS = { linkedin: "", github: "" };
  var EMAIL = "arkueharrison@gmail.com";
  // Form delivery: FormSubmit sends messages straight to EMAIL (first message needs a one-time activation click in your inbox).
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL;
  var CERTS = ["Python","Digital Marketing","AI Tools","Computer Networks","Excel","IT"]; // add more to list them in "View All"
  var PROJECTS = [
    {t:"H Info Tech Education Foundation",c:"Foundation • Education",s:"Bringing practical IT learning within reach.",g:["Education","Community","IT Skills"]},
    {t:"H-Tech Education Centre",c:"Training Centre",s:"A hands-on space to learn and build.",g:["Training","Hands-on","Technology"]},
    {t:"Python Training Project",c:"Programming",s:"Beginner-friendly Python, taught by building.",g:["Python","Teaching","Projects"]},
    {t:"AI & Generative AI Learning",c:"Learning",s:"Using AI tools with confidence and care.",g:["AI","Generative AI","Tools"]},
    {t:"Data Analysis Using Excel",c:"Data",s:"From raw sheets to clear answers.",g:["Excel","Analysis","Reports"]},
    {t:"Student Teaching & Academic Resources",c:"Education",s:"Guides and materials that make lessons stick.",g:["Teaching","Resources","Students"]}
  ];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-link]").forEach(function(a){ var u = LINKS[a.dataset.link]; if(u){ a.href = u; } else { a.setAttribute("data-soon", a.textContent.trim()); a.removeAttribute("target"); } });
  // Anything not ready yet shows the Coming Soon card instead of an error.
  var soon = document.getElementById("soon");
  function showSoon(label){
    document.getElementById("sText").textContent = (label ? label + " is" : "This is") + " being updated. Please check back shortly.";
    if(!soon.open) soon.showModal();
  }
  document.getElementById("sClose").addEventListener("click", function(){ soon.close(); });
  document.getElementById("sBack").addEventListener("click", function(){ soon.close(); });
  soon.addEventListener("click", function(e){ if(e.target === soon) soon.close(); });
  document.addEventListener("click", function(e){
    var a = e.target.closest("[data-soon], a[href='#'], a[href='']");
    if(!a) return;
    e.preventDefault(); showSoon(a.getAttribute("data-soon") || "");
  });

  // ---- nav ----
  var nav = document.getElementById("nav");
  // ---- scroll reveal ----
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.2, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

  // timeline: stagger milestones + line
  var track = document.getElementById("track");
  var tio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      track.classList.add("in");
      track.querySelectorAll(".ms").forEach(function(m,i){ setTimeout(function(){ m.classList.add("in"); }, 500 + i*1100); });
      tio.disconnect();
    });
  },{threshold:.35});
  tio.observe(track);

  // count-up
  var cnt = document.getElementById("count");
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return; cio.disconnect();
      if(reduce) return;
      var to = +cnt.dataset.to, t0 = performance.now(), dur = 2200;
      (function step(t){ var p = Math.min(1,(t-t0)/dur); cnt.textContent = Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); })(t0);
    });
  },{threshold:.5});
  cio.observe(cnt);

  // ---- scroll-linked: about story, parallax, nav ----
  var about = document.getElementById("about"), aImg = document.getElementById("aboutImg");
  var kws = document.querySelectorAll(".kw"), ticking = false;
  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle("solid", y > 40);
    var r = about.getBoundingClientRect(), total = about.offsetHeight - window.innerHeight;
    var p = Math.max(0, Math.min(1, -r.top / total));
    kws.forEach(function(k,i){ k.style.transitionDelay = "0s"; k.classList.toggle("on", p > .22 + i*.17); });
    if(!reduce){
      aImg.style.transform = "scale(" + (1.04 + p*.1) + ") translateX(" + (p*-2) + "%)";
      var hp = document.querySelector(".hero .photo");
      if(y < window.innerHeight) hp.style.transform = "translateY(" + (y*.12) + "px)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function(){ if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
  onScroll();

  // ---- skills orbit ----
  var skills = [
    ["Python","Scripts, automation and teaching."],
    ["SQL","Queries, schemas and clean data."],
    ["Systems","Administration built for reliability."],
    ["Networking","Connections that stay up."],
    ["Excel","Analysis, formulas, clear reports."],
    ["AI","Practical generative AI tools."],
    ["Programming","Logic first, language second."],
    ["Education","Making complex things clear."]
  ];
  var orbit = document.getElementById("orbit"), svg = document.getElementById("lines"), cap = document.getElementById("cap");
  var R = 40, nodes = [], lines = [];
  skills.forEach(function(s,i){
    var a = (i/skills.length)*Math.PI*2 - Math.PI/2, x = 50 + R*Math.cos(a), y = 50 + R*Math.sin(a);
    var ln = document.createElementNS("http://www.w3.org/2000/svg","line");
    ln.setAttribute("x1",50); ln.setAttribute("y1",50); ln.setAttribute("x2",x); ln.setAttribute("y2",y);
    svg.appendChild(ln); lines.push(ln);
    var b = document.createElement("button");
    b.className = "node"; b.type = "button"; b.textContent = s[0];
    b.style.left = x + "%"; b.style.top = y + "%";
    b.setAttribute("aria-label", s[0] + ": " + s[1]);
    function on(){ nodes.forEach(function(n,j){ n.classList.toggle("act", j===i); lines[j].classList.toggle("on", j===i); }); cap.innerHTML = "<b>" + s[0] + "</b>" + s[1]; }
    function off(){ nodes[i].classList.remove("act"); lines[i].classList.remove("on"); cap.innerHTML = "&nbsp;"; }
    b.addEventListener("mouseenter", on); b.addEventListener("focus", on);
    b.addEventListener("mouseleave", off); b.addEventListener("blur", off);
    b.addEventListener("click", on);
    orbit.appendChild(b); nodes.push(b);
  });

  // ---- card spotlight + project prefill ----
  document.querySelectorAll(".card").forEach(function(c){
    c.addEventListener("pointermove", function(e){
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
  var msg = document.getElementById("message");
  function goContact(text){
    if(text){ msg.value = text; msg.dispatchEvent(new Event("input")); }
    document.getElementById("contact").scrollIntoView({behavior: reduce ? "auto" : "smooth"});
    setTimeout(function(){ document.getElementById(text ? "message" : "name").focus({preventScroll:true}); }, 700);
  }
  // modals
  function wire(dlg, closers){
    closers.forEach(function(id){ document.getElementById(id).addEventListener("click", function(){ dlg.close(); }); });
    dlg.addEventListener("click", function(e){ if(e.target === dlg) dlg.close(); });
  }
  var dlg = document.getElementById("dlg"), cur = null;
  wire(dlg, ["dClose","dBack"]);
  document.querySelectorAll(".more").forEach(function(b){
    b.addEventListener("click", function(){
      cur = PROJECTS[+b.dataset.i];
      document.getElementById("dCat").textContent = cur.c;
      document.getElementById("dTitle").textContent = cur.t;
      document.getElementById("dText").textContent = cur.s;
      document.getElementById("dTags").innerHTML = cur.g.map(function(x){ return '<span class="chip">' + x + '</span>'; }).join("");
      dlg.showModal();
    });
  });
  document.getElementById("dTalk").addEventListener("click", function(){
    dlg.close(); goContact("Hello Harrison, I'd like to know more about " + cur.t + ".");
  });
  var certDlg = document.getElementById("certDlg");
  wire(certDlg, ["cClose","cBack"]);
  document.getElementById("cList").innerHTML = CERTS.map(function(x){ return "<li>" + x + "</li>"; }).join("");
  document.getElementById("certBtn").addEventListener("click", function(){ certDlg.showModal(); });

  // mobile menu
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  function setMenu(open){
    menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open); document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function(){ setMenu(!menu.classList.contains("open")); });
  menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ setMenu(false); }); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") setMenu(false); });

  // ---- form validation ----
  var form = document.getElementById("form"), status = document.getElementById("status");
  var rules = {
    name: function(v){ return v.trim().length < 2 ? "Enter your name." : ""; },
    email: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address."; },
    message: function(v){ return v.trim().length < 10 ? "Write at least 10 characters." : ""; }
  };
  function check(name){
    var f = form.elements[name], err = rules[name](f.value), box = f.closest(".field");
    box.classList.toggle("bad", !!err);
    form.querySelector('.err[data-for="'+name+'"]').textContent = err;
    return !err;
  }
  Object.keys(rules).forEach(function(n){
    form.elements[n].addEventListener("blur", function(){ check(n); });
    form.elements[n].addEventListener("input", function(){ if(form.elements[n].closest(".field").classList.contains("bad")) check(n); });
  });
  var send = document.getElementById("send");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var ok = Object.keys(rules).map(check).every(Boolean);
    status.className = "status";
    if(!ok){ status.classList.add("err"); status.textContent = "Fix the highlighted fields and try again."; return; }
    if(form.elements._honey.value){ return; }
    var n = form.elements.name.value.trim(), em = form.elements.email.value.trim(), m = form.elements.message.value.trim();
    function fallback(){
      var body = m + "\n\n— " + n + " (" + em + ")";
      status.className = "status err";
      status.textContent = "Couldn't send directly — opening your email app instead…";
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Portfolio message from " + n) + "&body=" + encodeURIComponent(body);
    }
    send.disabled = true; send.textContent = "Sending…"; status.textContent = "";
    fetch(FORM_ENDPOINT, {
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body: JSON.stringify({name:n, email:em, message:m, _subject:"Portfolio message from " + n, _replyto:em, _template:"table", _captcha:"false"})
    }).then(function(r){ return r.json(); }).then(function(d){
      if(d && (d.success === true || d.success === "true")){
        status.className = "status ok"; status.textContent = "Message sent. Thank you, " + n.split(" ")[0] + " — I'll reply soon.";
        form.reset(); form.querySelectorAll(".field").forEach(function(f){ f.classList.remove("bad"); });
      } else { fallback(); }
    }).catch(fallback).then(function(){ send.disabled = false; send.textContent = "Send Message"; });
  });
})();
