/* ============================================================
   SMART GROUP SOLUTION - скрипт страницы.
   Плиты (герой с куполом-клошем, фото-плиты с раскрытием куполом) ·
   перевод RU/EN · меню · бегущие ленты городов и логотипов · ленты
   с кнопками листания · счётчики · WhatsApp с готовым текстом ·
   форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77713353377";              /* для wa.me */

var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Ярлыки задаёт index.html (window.SGS_CONV): phone, contact, lead. Пусто - не шлём. */
function conv(key){
  var id = (window.SGS_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {send_to: id, value: 1.0, currency: "USD", transport_type: "beacon"});
}
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  if (h.indexOf("tel:") === 0) conv("phone");
  else if (h.indexOf("wa.me") > -1) conv("contact");
}, true);

/* ---------------- АНГЛИЙСКИЙ СЛОВАРЬ ---------------- */
var EN = {
  "m.title":"Catering and Turnkey Event Management in Almaty and across Kazakhstan - Smart Group Solution",
  "m.desc":"Coffee breaks from 5 guests, buffet receptions, banquets, gala dinners up to 2,000 guests. Turnkey events, branding, rentals. 3,000+ events a year, working across Kazakhstan since 2016.",
  "m.ogt":"Smart Group Solution - catering and turnkey events across Kazakhstan",
  "a.menu":"Menu","a.nav":"Sections","a.call":"Call","a.lang":"Site language","a.hero":"Catering and turnkey events",
  "a.nums":"Company in numbers","a.cat":"Catering","a.catg":"Catering services","a.ev":"Turnkey events","a.evg":"Event formats",
  "a.br":"Event branding","a.brg":"Branding services","a.team":"Team","a.teamg":"Team photos","a.prev":"Previous","a.next":"Next",
  "a.cl":"Clients","a.fnav":"Services","a.bar":"Quick contact",
  "n.cat":"Catering","n.ev":"Events","n.br":"Branding","n.ar":"Rentals","n.pr":"Prices","n.ko":"Contacts","n.geo":"Coverage","n.fk":"Facts","n.gl":"Gallery",
  "alt.hero":"Smart Group Solution buffet line in a bright hall with guests",
  "h.k":"Almaty · all of Kazakhstan · since 2016","h.t1":"Catering","h.t2":"and turnkey events",
  "h.lead":"3,000+ events a year: from a coffee break for 5 to a gala dinner for 2,000 guests. 40+ partners nationwide - we work in any city of Kazakhstan.",
  "h.b1":"Message on WhatsApp","h.b2":"Services and prices","h.ig":"Our events on Instagram",
  "c.1":"founded","c.2":"events a year","c.3":"partners nationwide","c.4":"guests at a single event","c.5b":"all KZ","c.5":"including small towns",
  "u.k":"Four directions","u.t":"Take one service or the whole event",
  "u.lead":"Each direction works on its own. Together they make a turnkey event: from the menu and barista to the press wall and nationwide logistics.",
  "u.d1":"Catering","u.d1s":"Coffee breaks, buffets, banquets, chefs and bar on site",
  "u.d2":"Turnkey events","u.d2s":"Conferences, team building, gala dinners, openings, festivals",
  "u.d3":"Branding","u.d3s":"Press walls, stages, print, merchandise, logo cakes",
  "u.d4":"Rentals and services","u.d4s":"Furniture, tents, AV, coffee machine, hosts, artists, coaches",
  "u.more":"Learn more","u.joincap":"or all at once","u.join":"Turnkey event - get a quote",
  "alt.d1":"Buffet line with canapés","alt.d2":"Conference hall with guests","alt.d3":"Branded press wall","alt.d4":"Event tent in the evening",
  "k.k":"Catering · own kitchen","k.t":"Food delivered straight from the oven",
  "k.lead":"Coffee breaks from 5 guests, buffets and banquets up to 2,000. Custom menus, chefs and bartenders on site.",
  "k.b1":"Request a menu","k.b2":"See prices","alt.pcat":"Buffet table with canapés and tartlets",
  "s1.t":"Coffee break","s1.s":"Pastries, canapés, coffee with a barista. From 5 guests.","s1.p":"from 2,900 ₸ / person",
  "s2.t":"Buffet reception","s2.s":"Canapés, tartlets, bruschetta, hot stations.","s2.p":"from 4,400 ₸ / person",
  "s3.t":"Banquet","s3.s":"Full table setting, hot dishes, waiters, table decor.","s3.p":"from 15,000 ₸ / person",
  "s4.t":"Corporate breakfasts","s4.s":"Delivered to the office on your team's schedule.",
  "s5.t":"Lunch boxes and corporate boxes","s5.s":"Office lunches and branded gift sets.",
  "s6.t":"Desserts and pastry","s6.s":"Cakes, macarons, gingerbread, ice cream, fruit baskets.",
  "s7.t":"Mobile bar","s7.s":"Matcha, smoothies, lemonades, cocktails. Bartenders from the world's top 50.",
  "s8.t":"Chefs on site","s8.s":"Hot and cold kitchen right at your venue.",
  "s.onreq":"quote on request","s.order":"Order",
  "alt.s1":"Canapés on a tray for a coffee break","alt.s2":"Buffet line close-up","alt.s3":"Banquet table setting","alt.s4":"Bruschetta on a wooden board",
  "alt.s5":"Gift box and flowers","alt.s6":"Branded gingerbread in packaging","alt.s7":"Champagne glass tower","alt.s8":"Chef cooking on site",
  "p.k":"Prices","p.t":"Price per guest","p.lead":"Starting prices in tenge per person. Exact quote after a short brief, same day.",
  "p.c1":"Buffet reception","p.c2":"Coffee break","p.c3":"Banquet","p.std":"Standard","p.biz":"Business","p.prem":"Premium","p.sets":"Ready sets","p.calc":"Get a quote",
  "p.c4":"Turnkey event","p.c4s":"Venue, menu, decor, programme, logistics to any city. Quote on request.","p.c4b":"quote on request","p.c4btn":"Discuss an event",
  "p.note":"Bank transfer, contract and closing documents for legal entities.",
  "e.k":"Turnkey events","e.t":"From the idea to the last guest",
  "e.lead":"Venue, programme, hosts, decor, catering and logistics - one team. Up to 7 events in one city per day.",
  "e.b1":"Discuss an event","e.b2":"Formats","alt.pev":"Conference hall, guests and a stage with a screen",
  "e1.t":"Team building","e1.s":"Culinary, sports, creative. Outdoors or in the office.",
  "e2.t":"Masterclasses","e2.s":"Cooking, bar, pastry. With a chef and all the equipment.",
  "e3.t":"Conferences and round tables","e3.s":"Hall, AV, registration, coffee breaks, wayfinding.",
  "e4.t":"Gala dinners","e4.s":"Up to 2,000 guests: table setting, chef's menu, artists, lighting.",
  "e5.t":"Corporate parties","e5.s":"Programme, host, music, bar and dinner within your budget.",
  "e6.t":"Office and store openings","e6.s":"Entrance decor, buffet, host, photo zone, guest gifts.",
  "e7.t":"Festivals","e7.s":"Tents, stage, food zones, bars and logistics at any venue.",
  "e8.t":"Your own format?","e8.s":"Describe the task - we will put together a programme and a quote the same day.","e8.b":"Message us",
  "alt.e1":"Team tasting dishes at a team-building event","alt.e2":"Guest with a dessert at a masterclass","alt.e3":"Conference: hall with guests",
  "alt.e4":"Table set for an outdoor gala dinner","alt.e5":"Corporate party stage with lighting","alt.e6":"Store entrance decorated for an opening","alt.e7":"Festival tent in the evening",
  "b.k":"Event branding","b.t":"Your brand in every detail",
  "b.lead":"Press walls, stages, wayfinding, print, merchandise and even logo cakes. All in the client's corporate style.",
  "b.b1":"Request a quote","b.b2":"What we do","alt.pbr":"Branded press wall at an event",
  "b1.t":"Press walls and photo zones","b1.s":"Printing, structure, set-up and dismantling on site.",
  "b2.t":"Stage and entrance decor","b2.s":"Decor, arches, lighting, branded elements.",
  "b3.t":"Print and wayfinding","b3.s":"Menus, badges, invitations, certificates, signage.",
  "b4.t":"Merchandise and corporate gifts","b4.s":"Gift sets for partners and staff with your logo.",
  "b5.t":"Branded pastry","b5.s":"Cakes, gingerbread, macarons and sweets with a logo.",
  "b6.t":"Corporate boxes","b6.s":"Nuts, sweets, champagne - assembled and delivered nationwide.",
  "alt.b1":"Press wall with a branded banner","alt.b2":"Entrance decorated with balloons","alt.b3":"Menu card on a plate in a banquet setting","alt.b4":"Gift merchandise in packaging with a ribbon","alt.b5":"Cake with the client's logo","alt.b6":"Corporate box",
  "ph.poli":"Photo: print and wayfinding","ph.kofe":"Photo: coffee machine and barista","ph.kouch":"Photo: coaches and practices",
  "r.k":"Rentals and services","r.t":"Everything for the venue in one call",
  "r.lead":"Take items separately or as part of an event. We deliver, set up, service and collect.",
  "r1.t":"Furniture and tents","r1.s":"Tables, chairs, poufs, tents of any size.",
  "r2.t":"AV and LED screens","r2.s":"Sound, lighting, screens, stage, engineer on site.",
  "r3.t":"Coffee machine with barista","r3.s":"Our machine, our barista, beans and milk - all included.",
  "r4.t":"Hosts and artists","r4.s":"Hosts, musicians, artists, entertainers, DJs.",
  "r5.t":"Coaches and practices","r5.s":"Yoga, nutritionists, psychologists, business mentors, art therapy.",
  "alt.r1":"Tables and chairs at an outdoor event","alt.r2":"Stage with sound and lighting","alt.r3":"Barista at the coffee machine of a mobile coffee station","alt.r4":"Musician on stage",
  "g.k":"Coverage","g.t":"We work all over Kazakhstan",
  "g.lead":"Own logistics and 40+ trusted partners. Capitals, regional centres and small towns - yes, we will come to Ridder too.",
  "g.h":"h","g.f1":"to deliver anything from one end of the country to the other","g.f2":"documents from city to city",
  "g.f3":"events across Kazakhstan in a single day","g.f4b":"Ridder","g.f4":"and any small town: same team, same standard",
  "cl.k":"Trusted by","cl.t":"Pharma, FMCG, oil and energy",
  "f.k":"Facts about us","f.t":"We do what others call impossible",
  "f1.t":"Urgent events","f1.s":"We take orders less than 24 hours before the start.",
  "f2.t":"A crocodile across the country","f2.s":"We will find and ship it from one part of Kazakhstan to another. Yes, a live one. Yes, it happened.",
  "f3.t":"Events per day","f3.s":"More than 7 in one city and more than 15 nationwide - at the same time.",
  "f4.t":"Documents city to city","f4.s":"Contracts, originals, acts - delivered by us.",
  "f5.b":"own","f5.t":"Coffee machine and barista","f5.s":"They travel with us to any venue, outdoor events included.",
  "f6.b":"max","f6.t":"Responsibility and speed","f6.s":"Fair prices, maximum responsibility, the fastest response.",
  "w.k":"How we work","w.t":"Four steps to your event",
  "w1.t":"Request","w1.s":"WhatsApp, call or email: format, date, city, number of guests.",
  "w2.t":"Quote","w2.s":"Menu and estimate the same day. Venue and programme within budget.",
  "w3.t":"Preparation","w3.s":"Kitchen, branding, logistics, partners in your city.",
  "w4.t":"Event","w4.s":"Team on site from the first guest to clean-up. Closing documents.",
  "t.k":"Team","t.t":"The people who answer for everything",
  "t.lead":"Managers are always available. One person runs your event from the brief to the closing documents.",
  "t.b1":"Message a manager","alt.pteam":"Smart Group Solution team in the studio","alt.team":"Smart Group Solution team",
  "ga.k":"Gallery","ga.t":"What it looks like on site",
  "ga.1":"Buffet","ga.2":"Bruschetta","ga.3":"Mobile bar","ga.4":"Canapés","ga.5":"Outdoor event","ga.6":"Coffee break","ga.7":"Social media shoot","ga.8":"Desserts","ga.9":"Branding","ga.10":"Masterclass",
  "ga.ig":"More events on Instagram",
  "alt.g1":"Buffet table","alt.g2":"Bruschetta close-up","alt.g3":"Champagne tower","alt.g4":"Tartlets and canapés","alt.g5":"Long table outdoors",
  "alt.g6":"Guests taking snacks","alt.g7":"Filming a buffet on a phone","alt.g8":"Dessert in a tartlet","alt.g9":"Press wall at the venue","alt.g10":"Guest with a dessert",
  "q.t":"Frequently asked questions",
  "q1.q":"How far in advance should I order?","q1.a":"Usually 3-5 days. Urgent orders are accepted less than 24 hours ahead: a coffee break for tomorrow is a normal task.",
  "q2.q":"What is the minimum order?","q2.a":"Coffee break from 5 guests. There is no upper limit: gala dinners up to 2,000 guests.",
  "q3.q":"Do you travel to other cities?","q3.a":"Yes, we work all over Kazakhstan: regional centres and small towns, Ridder included. Own logistics and 40+ local partners.",
  "q4.q":"Do you work by bank transfer?","q4.a":"Yes. Contract, invoice, closing documents. Originals delivered from city to city within 12 hours.",
  "q5.q":"Can the menu be customised?","q5.a":"Yes: themed dishes, dietary and lean options, kids' menu, national cuisine. Our own kitchen cooks to the brief.",
  "q6.q":"Do you do the branding yourselves?","q6.a":"Yes: printing, structures, stationery, merchandise and logo pastry. One contractor for the whole event.",
  "ko.k":"Request and contacts","ko.t":"Tell us about the event - we will quote today","ko.lead":"WhatsApp and email are the fastest channels. Managers are always available.",
  "fo.name":"Name","fo.nameph":"How should we address you","fo.phone":"Phone","fo.phoneph":"+7 ___ ___ __ __","fo.fmt":"Format",
  "fo.o0":"Choose a format","fo.o1":"Coffee break","fo.o2":"Buffet reception","fo.o3":"Banquet / gala dinner","fo.o4":"Turnkey event","fo.o5":"Branding","fo.o6":"Rentals and services","fo.o7":"Other",
  "fo.guests":"Guests","fo.city":"City","fo.cityph":"Almaty","fo.msg":"Date and wishes","fo.msgph":"Date, venue, menu, branding","fo.send":"Send via WhatsApp",
  "fo.ok":"Thank you! Opening WhatsApp with your request - if the window did not appear, message us directly.","fo.err":"Please enter a phone number so we can reply.",
  "ko.tel":"Phones","ko.addr":"Office","ko.addr1":"Almaty, 24 Iyunya street, 27","ko.addr2":"AizEx business centre, 5th floor, office 507",
  "ko.hrs":"Hours","ko.hrs1":"Office: 09:00-19:00","ko.hrs2":"Managers are always available","ko.2gis":"Office on 2GIS",
  "ft.s":"Catering and turnkey event management across Kazakhstan since 2016.","ft.addr":"Almaty, 24 Iyunya st., 27, AizEx BC, office 507","ft.c":"Smart Catering · Almaty",
  "bar.tel":"Call"
};

var WA_T = {
  ru: {
    hero:"Здравствуйте! Хочу рассчитать кейтеринг / мероприятие.\nФормат, дата, город, число гостей: ",
    card:"Здравствуйте! Интересует: {t}.\nДата, город, число гостей: ",
    turnkey:"Здравствуйте! Хочу заказать мероприятие под ключ.\nФормат, дата, город, число гостей: ",
    price:"Здравствуйте! Хочу расчёт: {t}.\nЧисло гостей, дата, город: ",
    kontakty:"Здравствуйте! Пишу с сайта Smart Group Solution. Вопрос: "
  },
  en: {
    hero:"Hello! I would like a quote for catering / an event.\nFormat, date, city, number of guests: ",
    card:"Hello! I am interested in: {t}.\nDate, city, number of guests: ",
    turnkey:"Hello! I would like to order a turnkey event.\nFormat, date, city, number of guests: ",
    price:"Hello! I would like a quote: {t}.\nNumber of guests, date, city: ",
    kontakty:"Hello! Writing from the Smart Group Solution website. Question: "
  }
};
var CITIES = {
  ru:["Алматы","Астана","Шымкент","Караганда","Актобе","Атырау","Актау","Павлодар","Усть-Каменогорск","Семей","Костанай","Кызылорда","Тараз","Уральск","Петропавловск","Кокшетау","Талдыкорган","Туркестан","Экибастуз","Риддер","Жезказган","Темиртау","Рудный","Балхаш","Жанаозен","Степногорск"],
  en:["Almaty","Astana","Shymkent","Karaganda","Aktobe","Atyrau","Aktau","Pavlodar","Ust-Kamenogorsk","Semey","Kostanay","Kyzylorda","Taraz","Uralsk","Petropavlovsk","Kokshetau","Taldykorgan","Turkistan","Ekibastuz","Ridder","Zhezkazgan","Temirtau","Rudny","Balkhash","Zhanaozen","Stepnogorsk"]
};
var HL = {"Риддер":1,"Ridder":1};
var LOGOS = [["krka","KRKA"],["stada","STADA"],["takeda","Takeda"],["marykay","Mary Kay"],["redbull","Red Bull"],["sinooil","Sinooil"],["astrazeneca","AstraZeneca"],["amway","Amway"]];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ if (RU[el.dataset.iAlt] === undefined) RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ if (RU[el.dataset.iAria] === undefined) RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ if (RU[el.dataset.iC] === undefined) RU[el.dataset.iC] = el.getAttribute("content"); });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){ if (RU[el.dataset.iPh] === undefined) RU[el.dataset.iPh] = el.getAttribute("placeholder"); });
  var t = document.querySelector("title[data-i-t]"); if (t) RU[t.dataset.iT] = t.textContent;
}
function pick(k, en){ return (en && EN[k] !== undefined) ? EN[k] : RU[k]; }
function curLang(){ return root.lang === "en" ? "en" : "ru"; }

/* ссылки WhatsApp собираются заранее (при смене языка), а не в момент клика -
   так трекер LeadBot спокойно дописывает код обращения в href */
function setWaLinks(){
  var L = curLang(), W = WA_T[L];
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var key = a.dataset.wa, t = W[key] || W.hero;
    if (t.indexOf("{t}") > -1) {
      var name = "";
      if (a.dataset.t) name = (L === "en" && a.dataset.ten) ? a.dataset.ten : a.dataset.t;
      else {
        var box = a.closest(".card, .pcol"), h = box ? box.querySelector("h3") : null;
        name = h ? h.textContent.trim() : "";
      }
      t = t.replace("{t}", name);
    }
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var en = lang === "en";
  root.setAttribute("lang", en ? "en" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){ var v = pick(el.dataset.i, en); if (v !== undefined) el.innerHTML = v; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ var v = pick(el.dataset.iAlt, en); if (v !== undefined) el.alt = v; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ var v = pick(el.dataset.iAria, en); if (v !== undefined) el.setAttribute("aria-label", v); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ var v = pick(el.dataset.iC, en); if (v !== undefined) el.setAttribute("content", v); });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){ var v = pick(el.dataset.iPh, en); if (v !== undefined) el.setAttribute("placeholder", v); });
  var t = document.querySelector("title[data-i-t]");
  if (t) { var tv = pick(t.dataset.iT, en); if (tv !== undefined) t.textContent = tv; }
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", en ? "en_US" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (en ? "en" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("sgs-lang", en ? "en" : "ru"); } catch(e){}
  setWaLinks();
  fillTickers();
  requestAnimationFrame(function(){ measureDome(); fitText(); });
}
/* ?lang= в URL сильнее localStorage: русское объявление не должно открыть английскую версию */
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("sgs-lang"); } catch(e){}
  var lang = (url === "en" || url === "ru") ? url : (saved === "en" ? "en" : "ru");
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки героя: ужимаем, пока не влезут в контейнер */
function fitText(){
  document.querySelectorAll(".h1 .l1, .h1 .l2").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    el.style.whiteSpace = "nowrap";
    while (el.scrollWidth > box + 1 && size > base * 0.5) { size *= 0.95; el.style.fontSize = size + "px"; }
    el.style.whiteSpace = "";
  });
}

/* ---------------- БЕГУЩИЕ ЛЕНТЫ ---------------- */
function fillRow(el, html, speed){
  if (!el) return;
  el.innerHTML = html;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var out = "";
  for (var i = 0; i < need; i++) out += html;
  el.innerHTML = out;
  el.style.setProperty("--tkw", w + "px");
  el.style.setProperty("--tkd", Math.max(16, w / speed) + "s");
}
function fillTickers(){
  var list = CITIES[curLang()];
  var one = list.map(function(c){ return "<b" + (HL[c] ? ' class="hl"' : "") + ">" + c + "</b>"; }).join("");
  fillRow(document.getElementById("cities1"), one, 42);
  fillRow(document.getElementById("cities2"), list.slice().reverse().map(function(c){ return "<b" + (HL[c] ? ' class="hl"' : "") + ">" + c + "</b>"; }).join(""), 36);
  var logos = document.getElementById("logos");
  if (logos && !logos.dataset.done) {
    logos.dataset.done = "1";
    fillRow(logos, LOGOS.map(function(l){ return '<img src="assets/logos/' + l[0] + '.png" height="120" alt="' + l[1] + '" loading="lazy" decoding="async">'; }).join(""), 30);
    /* картинки грузятся позже - ширина копии пересчитывается по факту */
    var imgs = logos.querySelectorAll("img"), left = imgs.length;
    imgs.forEach(function(im){ var d = function(){ if (--left <= 0) refitLogos(); }; if (im.complete) d(); else { im.addEventListener("load", d); im.addEventListener("error", d); } });
  }
}
function refitLogos(){
  var logos = document.getElementById("logos"); if (!logos) return;
  var kids = logos.children, n = LOGOS.length; if (kids.length < n) return;
  var w = kids[n].offsetLeft - kids[0].offsetLeft;
  if (w > 0) { logos.style.setProperty("--tkw", w + "px"); logos.style.setProperty("--tkd", Math.max(16, w / 30) + "s"); }
}
var rsTimer;
addEventListener("resize", function(){ clearTimeout(rsTimer); rsTimer = setTimeout(function(){ fillTickers(); refitLogos(); fitText(); measureDome(); stripsState(); }, 200); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTickers(); refitLogos(); fitText(); measureDome(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 72; };
function goTo(id, smooth){
  var t = document.getElementById(id); if (!t) return false;
  var isPw = t.classList.contains("pw");
  var off = isPw ? 0 : (t.classList.contains("sec") ? HH() - 30 : HH() + 16);
  var top = t.getBoundingClientRect().top + scrollY - off;
  if (!smooth) root.style.scrollBehavior = "auto";
  scrollTo({ top: Math.max(0, top), behavior: (smooth && !RED) ? "smooth" : "auto" });
  if (!smooth) setTimeout(function(){ root.style.scrollBehavior = ""; }, 50);
  return true;
}
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  if (!document.getElementById(id)) return;
  e.preventDefault();
  closeMenu();
  goTo(id, true);
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ШАПКА ---------------- */
var hdr = document.getElementById("hdr");
function hdrState(){ if (hdr) hdr.classList.toggle("solid", scrollY > 40); }

/* ---------------- ПЛИТЫ ----------------
   Один слушатель scroll через rAF. На каждую .pw пишем --enter/--exit/--stay
   и --open (раскрытие фото куполом). Герой получает --f (интро: купол поднимается)
   и --dy (на сколько купол опущен на текст в закрытом состоянии). */
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function easeInOut(t){ return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

var heroPw = document.getElementById("top");
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true;
function measureDome(){
  var c = document.querySelector(".hclip"); if (!c || !heroPw) return;
  heroPw.style.setProperty("--dy", (c.offsetHeight + 22) + "px");
}
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    var open  = pw === heroPw ? 1 : easeOut(clamp((enter - 0.2) / 0.68));
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.style.setProperty("--open",  open.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) pw.style.setProperty("--f", easeInOut(clamp((introK - 0.14) / 0.86)).toFixed(3));
  });
  hdrState();
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  root.classList.add("no-intro");
  pws.forEach(function(pw){ pw.classList.add("on"); });
  addEventListener("scroll", function(){ hdrState(); if (bar) bar.classList.toggle("show", scrollY > innerHeight * 0.55); }, {passive:true});
  hdrState();
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  /* интро 1400 мс: купол лежит на кадре и поднимается, открывая заголовок из-под кромки.
     Пропускаем при хэше / прокрутке - человек из рекламы сразу видит собранный экран. */
  var skip = location.hash || scrollY > 80;
  measureDome();
  if (skip) {
    root.classList.add("no-intro");
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1400);
      introK = p;
      update();
      if (p < 1) requestAnimationFrame(step);
      else introDone = true;
    };
    requestAnimationFrame(function(){ requestAnimationFrame(step); });
    setTimeout(function(){ if (!introDone) { introDone = true; introK = 1; update(); } }, 2000);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; update(); };
addEventListener("hashchange", function(){
  root.classList.add("no-intro");
  var id = location.hash.slice(1); if (!id || !document.getElementById(id)) return;
  goTo(id, false);
  setTimeout(function(){ goTo(id, false); }, 420);
});

/* ---------------- ПОЯВЛЕНИЕ И СЧЁТЧИКИ ---------------- */
function runCounters(box){
  box.querySelectorAll("[data-count]").forEach(function(el){
    var to = parseInt(el.dataset.count, 10) || 0, t0 = null;
    if (RED) { el.textContent = to; return; }
    var step = function(ts){
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1300), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); if (e.target.classList.contains("nums")) runCounters(e.target); io.unobserve(e.target); } });
  }, {threshold:.08, rootMargin:"0px 0px -5% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) { el.classList.add("in"); if (el.classList.contains("nums")) runCounters(el); }
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- ЛЕНТЫ С КНОПКАМИ ЛИСТАНИЯ ----------------
   Шаг - ровно одна карточка (ширина из getBoundingClientRect + gap из стилей),
   крайняя кнопка гаснет, обе прячутся, если всё влезло без прокрутки. */
var strips = [];
document.querySelectorAll(".strip-wrap").forEach(function(w){
  var s = w.querySelector(".strip"), prev = w.querySelector(".prev"), next = w.querySelector(".next");
  if (!s || !prev || !next) return;
  function stepW(){
    var f = s.querySelector("figure"); if (!f) return s.clientWidth;
    var gap = parseFloat(getComputedStyle(s).columnGap); if (isNaN(gap)) gap = 16;
    return f.getBoundingClientRect().width + gap;
  }
  function state(){
    var max = s.scrollWidth - s.clientWidth;
    var none = max <= 1;
    prev.hidden = none; next.hidden = none;
    prev.disabled = s.scrollLeft <= 1;
    next.disabled = s.scrollLeft >= max - 1;
  }
  prev.addEventListener("click", function(){ s.scrollBy({left: -stepW(), behavior: RED ? "auto" : "smooth"}); });
  next.addEventListener("click", function(){ s.scrollBy({left: stepW(), behavior: RED ? "auto" : "smooth"}); });
  s.addEventListener("scroll", state, {passive:true});
  s.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev.click(); }
  });
  strips.push(state);
  state();
});
function stripsState(){ strips.forEach(function(f){ f(); }); }
addEventListener("load", stripsState);

/* ---------------- ФОРМА → WhatsApp ---------------- */
var FORM_T = {
  ru:{hello:"Здравствуйте! Заявка с сайта Smart Group Solution.", name:"Имя", what:"Формат", guests:"Гостей", city:"Город", msg:"Пожелания", phone:"Телефон", none:"не выбран"},
  en:{hello:"Hello! Request from the Smart Group Solution website.", name:"Name", what:"Format", guests:"Guests", city:"City", msg:"Wishes", phone:"Phone", none:"not chosen"}
};
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var phone = form.phone.value.trim();
  if (phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; form.phone.focus(); return; }
  err.hidden = true;
  var F = FORM_T[curLang()];
  var sel = form.what, what = sel.value ? sel.options[sel.selectedIndex].textContent.trim() : F.none;
  var name = form.name.value.trim(), guests = form.guests.value.trim(), city = form.city.value.trim(), msg = form.msg.value.trim();
  var t = F.hello + "\n" + (name ? F.name + ": " + name + "\n" : "") + F.what + ": " + what + "\n" +
          (guests ? F.guests + ": " + guests + "\n" : "") + (city ? F.city + ": " + city + "\n" : "") +
          (msg ? F.msg + ": " + msg + "\n" : "") + F.phone + ": " + phone;
  ok.hidden = false;
  conv("lead");
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
hdrState();
/* прямой переход по якорю: встать на блок, интро пропущено выше */
if (location.hash) {
  var hid = location.hash.slice(1);
  if (document.getElementById(hid)) {
    setTimeout(function(){ goTo(hid, false); }, 60);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (location.hash.slice(1) === hid) goTo(hid, false); });
  }
}
})();
