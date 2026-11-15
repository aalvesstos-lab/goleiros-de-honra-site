import { useEffect, useMemo, useRef, useState } from "react";
import { LOGO_SJE, LOGO_ATLETA, LOGO_LUVAS } from "@/partners";
import {
  Menu, X, ArrowDown, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, Target, Flame, Users,
  Hand, Dumbbell, Crosshair, Brain, Check, Camera, Quote, Phone, Mail, MapPin, AtSign, MessageCircle,
  User, Flag, Trophy, Goal, Shield, Medal,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { PHOTO_ROBERT, PHOTO_SERGIO } from "@/photos";

/* =====================================================================
   CONFIGURAÇÃO — dados da escola (PRD 2.1) e integrações (PRD 8)
   Campo vazio = não aparece / integração desligada.
   ===================================================================== */
const CONFIG = {
  whatsapp: "5512997709004",
  phoneLabel: "(12) 99770-9004",
  email: "aalvesstos@gmail.com",
  local: "São Paulo, SP — unidades parceiras",
  endereco: "",
  horarios: "",
  cnpj: "",
  instagramUser: "goleirosdehonra",
  instagram: "https://instagram.com/goleirosdehonra",
  luvasInstagram: "https://www.instagram.com/serginho.luvas",
  sheetsWebhookUrl: "", // Google Sheets: URL do Apps Script que grava os leads
  gaId: "", // Google Analytics (ex.: G-XXXXXXX)
  metaPixelId: "", // Meta Pixel
};

const WA_TEXT = "Olá! Tenho interesse em conhecer os treinamentos da Goleiros de Honra.";
const waLink = (text = WA_TEXT) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
/* Abre o wa.me como um link normal (target _blank), igual aos botões de WhatsApp do site. */
function openWaLink(url: string) {
  const a = document.createElement("a");
  a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.style.display = "none";
  document.body.appendChild(a); a.click(); a.remove();
}

/* RF-05: últimos conteúdos do Instagram. Preencha com { src, href, alt } de cada publicação. */
const INSTAGRAM_POSTS: { src: string; href: string; alt: string }[] = [];

const NAV = [
  ["Início", "#inicio"], ["Sobre nós", "#sobre"], ["Equipe", "#equipe"], ["Metodologia", "#metodologia"],
  ["Treinamentos", "#treinamentos"], ["Turmas e planos", "#turmas"], ["Estrutura", "#estrutura"],
  ["Galeria", "#galeria"], ["Dúvidas frequentes", "#faq"], ["Contato", "#contato"],
] as const;

/* ---------- peças de interface ---------- */
const wrap = "relative mx-auto w-full max-w-6xl px-5 sm:px-8";
const Eyebrow = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
  <p className={`font-mono text-[11px] sm:text-xs uppercase tracking-[.3em] text-gold mb-4 ${center ? "text-center" : ""}`}>{children}</p>
);
const H2 = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
  <h2 className={`font-display uppercase font-normal text-4xl md:text-[2.75rem] leading-[1.32] text-bone ${center ? "text-center" : ""}`} style={{ textWrap: "balance" }}>{children}</h2>
);
const Gold = ({ children }: { children: React.ReactNode }) => <span className="gold-text">{children}</span>;
const Hazard = ({ label }: { label?: string }) => (
  <div className="relative flex items-center gap-4 px-4 sm:px-8" aria-hidden="true">
    <div className="hazard flex-1" />
    {label && <span className="font-mono text-[10px] uppercase tracking-[.3em] text-gold">{label}</span>}
    {label && <div className="hazard flex-1" />}
  </div>
);
const WaIcon = ({ className = "w-5 h-5" }: { className?: string }) => <MessageCircle className={className} aria-hidden="true" />;

/* ---------- Cabeçalho (RF-01) ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${solid || open ? "bg-ink/95 backdrop-blur border-b border-gold-dim/30" : "bg-transparent"}`}>
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 h-[68px] md:h-[84px] flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3 shrink-0" aria-label="Goleiros de Honra — início">
          <Logo size={58} className="w-12 h-12 md:w-[60px] md:h-[60px]" />
          <span className="font-display uppercase tracking-wide text-[18px] md:text-[20px] text-bone whitespace-nowrap">Goleiros de Honra</span>
        </a>
        <nav className="hidden xl:flex flex-1 items-center justify-evenly px-4" aria-label="Principal">
          {NAV.slice(1).map(([l, h]) => (
            <a key={h} href={h} className="font-mono text-[11px] uppercase tracking-[.1em] text-bone-dim hover:text-gold-bright transition-colors whitespace-nowrap">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="xl:hidden p-2 text-bone" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className={`${wrap} xl:hidden pb-6 grid`} aria-label="Menu móvel">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 border-b border-gold-dim/20 font-display uppercase tracking-wide text-xl">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------- Hero (RF-02) ---------- */
function Hero() {
  return (
    <section id="inicio" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden hero-lines pt-24 md:pt-28 pb-10">
      <div className={`${wrap} grid lg:grid-cols-[1.1fr_.9fr] gap-4 lg:gap-14 items-center`}>
        <div>
          <Eyebrow>Escola Goleiros de Honra · Formação de goleiros</Eyebrow>
          <h1 className="font-display uppercase font-normal leading-[1.1] text-[clamp(2.3rem,5.4vw,4rem)] text-bone" style={{ textWrap: "balance" }}>
            Formando goleiros <Gold>dentro e fora</Gold> das quatro linhas
          </h1>
          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-bone-dim">
            Desenvolvimento técnico, disciplina, confiança e preparação especializada para goleiros de todas as categorias — com método estruturado e acompanhamento individual de cada atleta.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contato" className="inline-flex items-center px-7 py-4 bg-gold text-ink font-display uppercase tracking-wide text-[15px] hover:bg-gold-bright transition-colors">Agendar aula experimental</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 border border-gold text-gold-bright font-display uppercase tracking-wide text-[15px] hover:bg-gold hover:text-ink transition-colors"><WaIcon /> Falar pelo WhatsApp</a>
          </div>
          <a href="#metodologia" className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-bone border-b border-gold pb-1 hover:text-gold-bright">Conheça a metodologia <ArrowDown className="w-3.5 h-3.5" /></a>
          <dl className="mt-10 pt-7 border-t border-gold-dim/30 flex gap-10 max-w-md">
            {[["12+", "Anos de método"], ["300+", "Goleiros formados"], ["7–17", "Faixa etária"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-gold-bright leading-none">{n}</dt>
                <dd className="mt-2 font-mono text-[10px] uppercase tracking-[.18em] text-bone-dim">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-hero-logo className="relative flex items-center justify-center lg:justify-end self-center order-first lg:order-none">
          {/* quadrado único: glow, anéis e logo compartilham o mesmo centro */}
          <div className="relative w-[min(50vw,220px)] lg:w-[min(80vw,470px)] aspect-square my-4 mx-8 lg:my-[6%] lg:mx-[6%]">
            <div className="absolute -inset-[6%] rounded-full opacity-30 blur-3xl bg-gold glow-pulse" aria-hidden="true" />
            <div className="absolute -inset-[11%] rounded-full border border-gold-dim/30 ring-pulse" aria-hidden="true" />
            <div className="absolute -inset-[22%] rounded-full border border-gold-dim/20 ring-pulse ring-pulse-2" aria-hidden="true" />
            <Logo size={470} className="relative w-full h-full shadow-[0_0_70px_rgba(200,162,65,.35)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sobre + valores + equipe ---------- */
const VALUES = [
  { icon: ShieldCheck, t: "Honra", d: "Palavra, respeito e postura dentro e fora do campo." },
  { icon: Target, t: "Precisão", d: "Técnica refinada repetição após repetição, sem atalhos." },
  { icon: Flame, t: "Coragem", d: "Encarar a bola, a pressão e o erro de cabeça erguida." },
  { icon: Users, t: "Time", d: "O goleiro que protege o grupo antes de proteger o placar." },
];
const TEAM = [
  { name: "Robert Fernando", role: "Treinador de goleiros", photo: PHOTO_ROBERT, bio: "Atleta Profissional com passagens por São José EC e Audax, treinador especializado em formação de goleiros, com foco em fundamentos técnicos e evolução individual por categoria.", tag: "Equipe Goleiros de Honra" },
  { name: "Sérgio Amorim", role: "Treinador de goleiros", photo: PHOTO_SERGIO, bio: "Formado em Educação Física, Pós-Graduado em Fisiologia do Exercício. CREF 168952-G/SP.", tag: "Certificado pela CBF" },
];
function About() {
  return (
    <section id="sobre" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={`${wrap} grid lg:grid-cols-2 gap-14 items-start`}>
        <div>
          <Eyebrow>Sobre a Goleiros de Honra</Eyebrow>
          <H2>Mais que treinos. <Gold>Formação de atletas.</Gold></H2>
          <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-bone-dim max-w-xl">
            <p>A Goleiros de Honra nasceu com o propósito de desenvolver goleiros através de treinamento especializado, promovendo evolução esportiva e crescimento pessoal.</p>
            <p>Prepara goleiros em iniciação, amadores e profissionais através de um treinamento específico focado no desenvolvimento físico e técnico dos atletas. A equipe é formada em Educação Física, e o atendimento é individualizado e personalizado de acordo com o que cada goleiro necessita.</p>
            <p>Temos à disposição de nossos atletas tudo o que há de mais avançado e adequado em metodologia de treinamento de goleiros; muito próxima do que é disponibilizado em clubes profissionais.</p>
          </div>
          <a href="#contato" className="mt-6 inline-block font-display uppercase tracking-wide text-gold-bright hover:text-gold text-[15px] max-w-sm leading-snug">Faça um treino experimental gratuito e conheça nossa metodologia!</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold-dim/25 border border-gold-dim/25">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="p-7 bg-card2">
              <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display uppercase text-xl tracking-wide">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Metodologia (PRD 3.3 + pilares da referência) ---------- */
function Team() {
  return (
    <section id="equipe" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <Eyebrow center>Equipe</Eyebrow>
        <div className="text-center"><H2>Quem forma os <Gold>Goleiros de Honra</Gold></H2></div>
        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {TEAM.map((m) => (
            <article key={m.name} className="bg-card2 border border-gold-dim/25">
              <div className="relative">
                <img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" width={512} height={640} className="w-full aspect-[5/4] sm:aspect-[4/5] md:aspect-square object-top object-cover" />
                <span className="absolute top-3 right-4 font-mono text-[10px] uppercase tracking-[.3em] text-gold-bright/90">Ficha técnica</span>
              </div>
              <div className="p-6">
                <h3 className="font-display uppercase text-xl tracking-wide">{m.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[.22em] text-gold">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">{m.bio}</p>
                <span className="mt-5 inline-block border border-gold-dim/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.2em] text-gold-bright">{m.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
const METHOD = [
  { icon: Hand, t: "Técnica", items: ["Defesas e quedas", "Posicionamento", "Saídas de gol e jogo aéreo", "Reposição de bola"] },
  { icon: Dumbbell, t: "Física", items: ["Agilidade", "Explosão", "Coordenação", "Velocidade de reação"] },
  { icon: Crosshair, t: "Tática", items: ["Leitura de jogo", "Tomada de decisão", "Organização defensiva", "Comunicação com a zaga"] },
  { icon: Brain, t: "Mental", items: ["Confiança", "Liderança", "Concentração", "Controle emocional"] },
];
const CATEGORIES = [["Sub-9", 1], ["Sub-11", 2], ["Sub-13", 3], ["Sub-15", 4], ["Sub-17", 5], ["Adulto", 6]] as const;
function Method() {
  return (
    <section id="metodologia" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <Eyebrow>Metodologia</Eyebrow>
        <H2>Nossa metodologia: <Gold>quatro frentes, um único goleiro</Gold></H2>
        <p className="mt-6 max-w-xl text-bone-dim leading-relaxed">O treino é dividido em módulos que se reforçam mutuamente — trabalhados em conjunto a cada sessão, na proporção certa para a fase do atleta.</p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold-dim/25 border border-gold-dim/25">
          {METHOD.map(({ icon: Icon, t, items }, i) => (
            <article key={t} className="relative p-7 bg-ink">
              <span className="absolute top-4 right-5 font-display text-5xl text-gold-dim/20" aria-hidden="true">0{i + 1}</span>
              <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display uppercase text-2xl tracking-wide">{t}</h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((it) => (<li key={it} className="flex items-start gap-2.5 text-sm text-bone-dim"><Check className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {it}</li>))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-14"><Hazard label="Categorias" /></div>
      <div className={`${wrap} mt-10 grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4`}>
        {CATEGORIES.map(([n]) => (
          <div key={n}>
            <div className="font-display uppercase text-xl text-gold-bright">{n}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Treinamentos: programas (PRD 3.4) + planos (referência) ---------- */
const PROGRAMS = [
  { icon: User, t: "Treinamento individual", d: "Sessões personalizadas focadas nas necessidades específicas do goleiro." },
  { icon: Users, t: "Treinamento em grupo", d: "Desenvolvimento coletivo com exercícios dinâmicos e situações reais de jogo." },
  { icon: Flag, t: "Preparação para avaliações", d: "Treinos específicos para peneiras, testes e competições." },
  { icon: Trophy, t: "Alto rendimento", d: "Programa avançado para atletas que buscam desempenho competitivo." },
];
const PLANS = [
  { name: "Avaliação avulsa", price: "R$ 90", unit: "/ aula única", items: ["1 sessão individual", "Relatório técnico do atleta", "Sem fidelidade"] },
  { name: "Plano trimestral", price: "R$ 320", unit: "/ por mês", items: ["2x por semana", "Avaliação técnica mensal", "Acompanhamento individual", "Grupo por categoria"], featured: true },
  { name: "Plano mensal", price: "R$ 380", unit: "/ por mês", items: ["2x por semana", "Avaliação técnica ao final", "Grupo por categoria"] },
];
function Programs() {
  return (
    <>
    <section id="treinamentos" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <Eyebrow>Treinamentos</Eyebrow>
        <H2>Um programa para <Gold>cada fase do goleiro</Gold></H2>
        <div className="mt-12 grid sm:grid-cols-2 gap-px bg-gold-dim/25 border border-gold-dim/25">
          {PROGRAMS.map(({ icon: Icon, t, d }) => (
            <article key={t} className="bg-card2 p-8 flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 border border-gold-dim/50 grid place-items-center text-gold"><Icon className="w-6 h-6" strokeWidth={1.5} /></div>
              <div>
                <h3 className="font-display uppercase text-xl tracking-wide">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{d}</p>
                <a href="#contato" className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] text-gold-bright hover:text-gold">Quero saber mais <ArrowRight className="w-3.5 h-3.5" /></a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
    <section id="turmas" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <div>
          <Eyebrow>Turmas e planos</Eyebrow>
          <H2>Escolha seu <Gold>ritmo de treino</Gold></H2>
          <p className="mt-6 max-w-xl text-bone-dim leading-relaxed">Turmas por categoria, com horários nas unidades parceiras. Fale conosco para confirmar disponibilidade na sua região.</p>
          <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((p) => (
              <article key={p.name} className={`relative flex flex-col p-8 bg-card2 ${p.featured ? "border-2 border-gold shadow-[0_0_50px_rgba(200,162,65,.18)] md:-my-3 md:py-11" : "border border-gold-dim/30"}`}>
                {p.featured && <span className="absolute -top-3 left-6 bg-oxblood text-bone font-mono text-[10px] uppercase tracking-[.22em] px-3 py-1.5">Vagas limitadas</span>}
                <h3 className="font-display uppercase text-xl tracking-wide">{p.name}</h3>
                <p className="mt-4 flex items-baseline gap-2"><span className="font-display text-4xl text-gold-bright">{p.price}</span><span className="font-mono text-[10px] uppercase tracking-[.15em] text-bone-dim">{p.unit}</span></p>
                <ul className="mt-6 space-y-3 flex-1">
                  {p.items.map((it) => (<li key={it} className="flex items-start gap-2.5 text-sm text-bone-dim"><Check className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {it}</li>))}
                </ul>
                <a href="#contato" className={`mt-8 text-center font-display uppercase tracking-wide text-sm px-6 py-3.5 transition-colors ${p.featured ? "bg-gold text-ink hover:bg-gold-bright" : "border border-gold text-gold-bright hover:bg-gold hover:text-ink"}`}>Quero me matricular</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

/* ---------- Estrutura (PRD 3.5) ---------- */
const STRUCTURE = [
  { icon: Flag, t: "Campo oficial" }, { icon: Hand, t: "Materiais específicos para goleiros" },
  { icon: Dumbbell, t: "Equipamentos de treinamento" }, { icon: Shield, t: "Espaço de preparação física" },
];
function Structure() {
  return (
    <section id="estrutura" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={`${wrap} grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-center`}>
        <div>
          <Eyebrow>Estrutura</Eyebrow>
          <H2>Ambiente preparado para <Gold>evolução</Gold></H2>
          <p className="mt-6 max-w-md text-bone-dim leading-relaxed">Infraestrutura e materiais usados nos treinamentos. Ao entrar em contato, indicamos os horários disponíveis mais próximos de você.</p>
          <p className="mt-5 text-sm text-bone-dim max-w-md">Precisa de luvas? Indicamos o <a className="text-gold-bright underline" href={CONFIG.luvasInstagram} target="_blank" rel="noopener noreferrer">@serginho.luvas</a>.</p>
          <a href={CONFIG.luvasInstagram} target="_blank" rel="noopener noreferrer" aria-label="Serginho Luvas no Instagram" className="mt-5 inline-block hover:opacity-90 transition-opacity"><img src={LOGO_LUVAS} alt="Logo Serginho Luvas — artigos esportivos" loading="lazy" className="h-28 w-auto object-contain" /></a>
        </div>
        <ul className="grid sm:grid-cols-2 gap-px bg-gold-dim/25 border border-gold-dim/25">
          {STRUCTURE.map(({ icon: Icon, t }, i) => (
            <li key={t} className={`flex items-center gap-4 bg-ink p-8 min-h-[120px] ${i === STRUCTURE.length - 1 && STRUCTURE.length % 2 === 1 ? "sm:col-span-2" : ""}`}>
              <Icon className="w-6 h-6 text-gold shrink-0" strokeWidth={1.5} />
              <span className="font-display uppercase text-lg tracking-wide">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Galeria (RF-06) + Instagram (RF-05) ---------- */
type Cat = "Treinos" | "Jogos" | "Eventos";
const GALLERY: { id: string; cat: Cat; label: string; src?: string }[] = [
  { id: "g1", cat: "Treinos", label: "Treino técnico" }, { id: "g2", cat: "Treinos", label: "Jogo aéreo" },
  { id: "g3", cat: "Eventos", label: "Categoria de base" }, { id: "g4", cat: "Treinos", label: "Preparação física" },
  { id: "g5", cat: "Jogos", label: "Competição" }, { id: "g6", cat: "Jogos", label: "Dia de jogo" },
  { id: "g7", cat: "Treinos", label: "Treino de reflexos" }, { id: "g8", cat: "Eventos", label: "Confraternização" },
];
function Gallery() {
  const [f, setF] = useState<"Todos" | Cat>("Todos");
  const [imgs, setImgs] = useState<Record<string, string>>({});
  const input = useRef<HTMLInputElement>(null);
  const target = useRef("");
  const track = useRef<HTMLDivElement>(null);
  const slide = (d: number) => { const el = track.current; if (el) el.scrollBy({ left: d * (el.clientWidth + 12), behavior: "smooth" }); };
  const shown = useMemo(() => GALLERY.filter((g) => f === "Todos" || g.cat === f), [f]);
  const pick = (id: string) => { target.current = id; input.current?.click(); };
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setImgs((p) => ({ ...p, [target.current]: String(r.result) }));
    r.readAsDataURL(file);
    e.target.value = "";
  };
  return (
    <section id="galeria" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <Eyebrow>Galeria</Eyebrow>
        <H2>Registros de <Gold>quadra e área</Gold></H2>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-bone-dim">Treinos, jogos, eventos e conquistas. Clique em um espaço para enviar a foto correspondente.</p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar galeria">
          {(["Todos", "Treinos", "Jogos", "Eventos"] as const).map((c) => (
            <button key={c} role="tab" aria-selected={f === c} onClick={() => { setF(c); track.current?.scrollTo({ left: 0 }); }} className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[.18em] border transition-colors ${f === c ? "bg-gold text-ink border-gold" : "border-gold-dim/50 text-bone-dim hover:border-gold"}`}>{c}</button>
          ))}
        </div>
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={onFile} aria-label="Enviar foto" />
        <div className="mt-6 relative">
          <div ref={track} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-roledescription="carrossel" aria-label="Fotos da galeria">
            {shown.map((g) => {
              const src = imgs[g.id] || g.src;
              return (
                <button key={g.id} onClick={() => pick(g.id)} className="relative shrink-0 snap-start basis-full sm:basis-[calc((100%-0.75rem)/2)] lg:basis-[calc((100%-1.5rem)/3)] aspect-[4/3] lg:aspect-[16/10] border border-gold-dim/30 bg-gradient-to-br from-[#1b1812] to-ink group text-left" aria-label={`${g.label} — enviar foto`}>
                  {src ? <img src={src} alt={g.label} className="absolute inset-0 w-full h-full object-cover" /> : (
                    <span className="absolute inset-0 grid place-content-center justify-items-center gap-3 text-gold group-hover:text-gold-bright transition-colors">
                      <Camera className="w-8 h-8" strokeWidth={1.5} />
                      <span className="font-mono text-[11px] uppercase tracking-[.2em]">{g.label}</span>
                    </span>
                  )}
                  {src && <span className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 to-transparent font-mono text-[11px] uppercase tracking-[.18em] text-gold-bright">{g.label}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => slide(-1)} aria-label="Foto anterior" className="w-10 h-10 grid place-items-center border border-gold-dim/50 text-gold hover:bg-gold hover:text-ink transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => slide(1)} aria-label="Próxima foto" className="w-10 h-10 grid place-items-center border border-gold-dim/50 text-gold hover:bg-gold hover:text-ink transition-colors"><ChevronRight className="w-5 h-5" /></button>
            <span className="font-mono text-[11px] tracking-[.18em] text-bone-dim">{shown.length} {shown.length === 1 ? "foto" : "fotos"}</span>
          </div>
        </div>
        {/* Instagram */}
        <div className="mt-5 border border-gold-dim/40 bg-card2 px-5 py-4 sm:px-6">
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-5 items-center">
            <Logo size={52} />
            <div>
              <h3 className="font-display uppercase text-xl tracking-wide flex items-center gap-2"><AtSign className="w-4 h-4 text-gold" /> {CONFIG.instagramUser}</h3>
              <p className="mt-0.5 text-sm text-bone-dim">Treinamento específico para goleiros! Para todas as idades. Ser goleiro é uma honra!</p>
            </div>
            <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-gold text-ink font-display uppercase tracking-wide text-sm hover:bg-gold-bright">Seguir no Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Resultados + Depoimentos (RF-07) ---------- */
const STATS = [
  { n: "312+", l: "Goleiros formados" }, { n: "27", l: "Aprovados em clubes" },
  { n: String(new Date().getFullYear() - 2020), l: "Anos de método" }, { n: "98%", l: "Satisfação das famílias" },
];
function Results() {
  return (
    <section id="resultados" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={wrap}>
        <Eyebrow>Resultados</Eyebrow>
        <H2>O que fica <Gold>depois do apito</Gold></H2>
        <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s) => (
            <div key={s.l}>
              <dt className="font-display text-5xl md:text-6xl text-gold-bright leading-none">{s.n}</dt>
              <dd className="mt-3 font-mono text-[10px] uppercase tracking-[.2em] text-bone-dim">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="my-14"><Hazard label="Cases" /></div>
      <p className={`${wrap} text-center text-bone-dim text-sm max-w-2xl leading-relaxed`}>Alunos formados na Goleiros de Honra já defendem as traves em seletivas e categorias de base de clubes regionais e estaduais — resultado direto do acompanhamento técnico individual desde as primeiras categorias.</p>
    </section>
  );
}
function Partners() {
  const items = [
    { logo: LOGO_SJE, t: "São José EC", d: "Clube onde atletas da escola já assinaram contrato e vestem o uniforme da base." },
    { logo: LOGO_ATLETA, t: "Atleta Cidadão – SJC", d: "Programa em que atletas da escola foram aprovados em avaliação." },
    { logo: LOGO_LUVAS, t: "@serginho.luvas", d: "Luvas para goleiros. Compre o seu par com nosso parceiro.", href: CONFIG.luvasInstagram },
  ];
  return (
    <section className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10">
      <div className={wrap}>
        <Eyebrow>Clubes e parceiros</Eyebrow>
        <div className="mt-2 grid md:grid-cols-3 gap-px bg-gold-dim/25 border border-gold-dim/25">
          {items.map(({ logo, t, d, href }) => {
            const body = (<>
              <div className="h-24 flex items-center"><img src={logo} alt={`Logo ${t}`} loading="lazy" className="max-h-24 w-auto max-w-[160px] object-contain" /></div>
              <h3 className="mt-4 font-display uppercase text-xl tracking-wide">{t}</h3>
              <p className="mt-2 text-sm text-bone-dim leading-relaxed">{d}</p>
            </>);
            return href
              ? <a key={t} href={href} target="_blank" rel="noopener noreferrer" className="bg-ink p-7 hover:bg-[#15140f] transition-colors">{body}</a>
              : <div key={t} className="bg-ink p-7">{body}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ: { q: string; a: React.ReactNode }[] = [
  { q: "A partir de qual idade meu filho pode começar?", a: "Atendemos a partir dos 7 anos (categoria Sub-9) até a categoria Livre/Adulto. O plano de treino é ajustado conforme a faixa etária e o nível técnico do atleta." },
  { q: "Preciso levar equipamento próprio?", a: <>É recomendado ter luvas de goleiro e uniforme de treino com chuteira apropriada para grama. Orientamos a lista completa na matrícula.<br />Para luvas, indicamos o <a className="text-gold-bright underline" href={CONFIG.luvasInstagram} target="_blank" rel="noopener noreferrer">@serginho.luvas</a>.</> },
  { q: "Como funciona a aula experimental?", a: "É uma sessão única, sem custo de matrícula, em que o atleta participa de um treino junto à turma da categoria e recebe uma devolutiva técnica inicial do treinador responsável." },
  { q: "Quais as formas de pagamento?", a: "Aceitamos Pix e dinheiro. Fale com a nossa equipe para mais informações." },
  { q: "Os treinos acontecem em qual local?", a: "Trabalhamos com unidades parceiras em diferentes regiões. Ao entrar em contato, indicamos a unidade e os horários mais próximos de você." },
];
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="lg:min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={`${wrap} max-w-3xl`}>
        <Eyebrow center>Dúvidas frequentes</Eyebrow>
        <H2 center>Antes de <Gold>vestir a luva</Gold></H2>
        <div className="mt-12 border-t border-gold-dim/25">
          {FAQ.map((f, i) => (
            <div key={f.q} className="border-b border-gold-dim/25">
              <button className="w-full flex items-center justify-between gap-4 py-5 text-left font-display uppercase tracking-wide text-[17px]" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <ChevronDown className={`w-4 h-4 shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p id={`faq-${i}`} className="pb-6 pr-8 text-sm leading-relaxed text-bone-dim">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contato + formulário de inscrição (PRD 4, RF-03, RF-04) ---------- */
type Form = { nome: string; nascimento: string; responsavel: string; whatsapp: string; email: string; categoria: string; cidade: string; objetivo: string; lgpd: boolean };
const EMPTY: Form = { nome: "", nascimento: "", responsavel: "", whatsapp: "", email: "", categoria: "", cidade: "", objetivo: "", lgpd: false };
const CAT_OPTIONS = ["Sub-9", "Sub-11", "Sub-13", "Sub-15", "Sub-17", "Adulto / livre"];
function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.nome.trim().length < 3) e.nome = "Informe o nome do atleta.";
  if (!f.nascimento) e.nascimento = "Informe a data de nascimento.";
  else if (new Date(f.nascimento) > new Date()) e.nascimento = "Data inválida.";
  if (f.responsavel.trim().length < 3) e.responsavel = "Informe o nome do responsável.";
  if (f.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe um WhatsApp com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Informe um e-mail válido.";
  if (!f.categoria) e.categoria = "Selecione a categoria.";
  if (f.cidade.trim().length < 2) e.cidade = "Informe a cidade.";
  if (f.objetivo.trim().length < 5) e.objetivo = "Conte o objetivo do treinamento.";
  if (!f.lgpd) e.lgpd = "É necessário aceitar o tratamento dos dados.";
  return e;
}
function Contact() {
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [copied, setCopied] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) return;
    setState("sending");
    // abre o WhatsApp já no clique (evita bloqueio de pop-up) com todos os dados do formulário
    openWaLink(waLink(waMsg));
    // colunas da planilha (PRD 8): Data, Nome, Responsável, WhatsApp, E-mail, Categoria, Cidade, Objetivo, Status
    const lead = { Data: new Date().toLocaleString("pt-BR"), Nome: f.nome, Responsável: f.responsavel, WhatsApp: f.whatsapp, "E-mail": f.email, Categoria: f.categoria, Cidade: f.cidade, Objetivo: f.objetivo, Status: "Novo" };
    try {
      if (CONFIG.sheetsWebhookUrl) await fetch(CONFIG.sheetsWebhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
    } catch { /* falha de rede não impede o contato pelo WhatsApp */ }
    setState("done");
  }
  const nascBR = f.nascimento ? f.nascimento.split("-").reverse().join("/") : "—";
  const waMsg = [
    "Olá! Quero agendar uma aula experimental na Goleiros de Honra.",
    "",
    `*Atleta:* ${f.nome || "—"}`,
    `*Nascimento:* ${nascBR}`,
    `*Responsável:* ${f.responsavel || "—"}`,
    `*WhatsApp:* ${f.whatsapp || "—"}`,
    `*E-mail:* ${f.email || "—"}`,
    `*Categoria:* ${f.categoria || "—"}`,
    `*Cidade:* ${f.cidade || "—"}`,
    `*Objetivo:* ${f.objetivo || "—"}`,
  ].join("\n");
  const field = "w-full bg-ink border border-gold-dim/50 focus:border-gold px-4 py-3 text-[15px] text-bone placeholder:text-bone-dim/60 outline-none";
  const Lbl = ({ id, children }: { id: string; children: React.ReactNode }) => <label htmlFor={id} className="block mb-2 font-mono text-[10px] uppercase tracking-[.2em] text-bone-dim">{children}</label>;
  const Err = ({ k }: { k: keyof Form }) => errors[k] ? <p role="alert" className="mt-1.5 text-xs text-[#F0A0A0]">{errors[k]}</p> : null;
  return (
    <section id="contato" className="lg:min-h-[calc(100svh-56px)] flex flex-col justify-center relative overflow-hidden bg-card2 pt-24 pb-10 md:pt-28 md:pb-12">
      <div className={`${wrap} grid lg:grid-cols-[.8fr_1.2fr] gap-14`}>
        <div>
          <Eyebrow>Contato</Eyebrow>
          <H2>Agende a <Gold>primeira defesa</Gold></H2>
          <p className="mt-6 max-w-sm text-bone-dim leading-relaxed">Preencha o formulário e envie direto pelo WhatsApp. Retornamos com o horário disponível mais próximo de você.</p>
          <ul className="mt-8 space-y-4 text-[15px]">
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-bright"><Phone className="w-4 h-4 text-gold" /> {CONFIG.phoneLabel}</a></li>
            <li className="flex items-center gap-3 break-all"><Mail className="w-4 h-4 text-gold shrink-0" /> {CONFIG.email}</li>
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold shrink-0" /> {[CONFIG.endereco, CONFIG.local].filter(Boolean).join(" · ")}</li>
            <li><a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-bright"><AtSign className="w-4 h-4 text-gold" /> @{CONFIG.instagramUser}</a></li>
            {CONFIG.horarios && <li className="text-bone-dim text-sm">Horários: {CONFIG.horarios}</li>}
          </ul>
        </div>
        <div className="bg-ink border border-gold-dim/40 p-6 sm:p-8">
          {state === "done" ? (
            <div className="py-10 text-center" role="status">
              <Check className="w-12 h-12 mx-auto text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display uppercase text-3xl">Quase lá! Finalize no WhatsApp</h3>
              <p className="mt-3 text-bone-dim">Abrimos o WhatsApp com os dados preenchidos. É só enviar a mensagem para agendar a aula experimental. Se não abriu, toque no botão abaixo ou copie a mensagem.</p>
              <textarea readOnly rows={6} value={waMsg} onFocus={(e) => e.currentTarget.select()} className="mt-5 w-full bg-card2 border border-gold-dim/40 p-3 text-left text-xs text-bone-dim" aria-label="Mensagem para o WhatsApp" />
              <button type="button" onClick={() => { const t = waMsg; const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2500); }; if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).then(done, () => { const el = document.createElement("textarea"); el.value = t; document.body.appendChild(el); el.select(); try { document.execCommand("copy"); done(); } catch { /* ignora */ } el.remove(); }); else { const el = document.createElement("textarea"); el.value = t; document.body.appendChild(el); el.select(); try { document.execCommand("copy"); done(); } catch { /* ignora */ } el.remove(); } }} className="mt-3 text-xs font-mono uppercase tracking-[.18em] text-gold-bright hover:text-gold underline underline-offset-4">{copied ? "Mensagem copiada!" : "Copiar mensagem"}</button>
              <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 px-7 py-4 bg-gold text-ink font-display uppercase tracking-wide text-sm hover:bg-gold-bright"><WaIcon className="w-4 h-4" /> Abrir WhatsApp novamente</a>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2"><Lbl id="nome">Nome do atleta</Lbl><input id="nome" className={field} value={f.nome} onChange={(e) => set("nome", e.target.value)} autoComplete="off" /><Err k="nome" /></div>
              <div><Lbl id="nasc">Data de nascimento</Lbl><input id="nasc" type="date" className={field} value={f.nascimento} onChange={(e) => set("nascimento", e.target.value)} /><Err k="nascimento" /></div>
              <div><Lbl id="resp">Nome do responsável</Lbl><input id="resp" className={field} value={f.responsavel} onChange={(e) => set("responsavel", e.target.value)} autoComplete="name" /><Err k="responsavel" /></div>
              <div><Lbl id="wpp">WhatsApp</Lbl><input id="wpp" inputMode="tel" className={field} placeholder="(00) 00000-0000" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} autoComplete="tel" /><Err k="whatsapp" /></div>
              <div><Lbl id="mail">E-mail</Lbl><input id="mail" type="email" className={field} placeholder="voce@email.com" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /><Err k="email" /></div>
              <div><Lbl id="cat">Categoria</Lbl>
                <select id="cat" className={field} value={f.categoria} onChange={(e) => set("categoria", e.target.value)}>
                  <option value="">Selecione</option>{CAT_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                </select><Err k="categoria" /></div>
              <div><Lbl id="cid">Cidade</Lbl><input id="cid" className={field} value={f.cidade} onChange={(e) => set("cidade", e.target.value)} autoComplete="address-level2" /><Err k="cidade" /></div>
              <div className="sm:col-span-2"><Lbl id="obj">Objetivo do treinamento</Lbl><textarea id="obj" rows={3} className={field} placeholder="Conte um pouco sobre o atleta e o objetivo com os treinos" value={f.objetivo} onChange={(e) => set("objetivo", e.target.value)} /><Err k="objetivo" /></div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-bone-dim cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#C8A241]" checked={f.lgpd} onChange={(e) => set("lgpd", e.target.checked)} />
                  <span>Aceito o tratamento dos meus dados e dos dados do atleta menor de idade pela Goleiros de Honra, exclusivamente para contato e agendamento, conforme a LGPD.</span>
                </label>
                <Err k="lgpd" />
              </div>
              <button type="submit" disabled={state === "sending"} className="sm:col-span-2 py-4 bg-gold text-ink font-display uppercase tracking-wide text-sm hover:bg-gold-bright disabled:opacity-60 transition-colors">
                {state === "sending" ? "Abrindo WhatsApp…" : "Enviar pelo WhatsApp"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink border-t border-gold-dim/25 py-4 lg:py-0 lg:h-14 flex items-center">
      <div className={`${wrap} w-full grid gap-3 md:grid-cols-[1fr_auto_1fr] items-center justify-items-center md:justify-items-start`}>
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display uppercase tracking-wide text-base block">Goleiros de Honra</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-bone-dim text-center">© {new Date().getFullYear()} Goleiros de Honra.<br /> Dados tratados conforme a LGPD.</p>
        <span aria-hidden="true" className="hidden md:block" />
      </div>
    </footer>
  );
}

export default function App() {
  // fontes e analytics carregados em runtime (o bundle em arquivo único não inlina links externos)
  useEffect(() => {
    if (!document.getElementById("gdh-fonts")) {
      const l = document.createElement("link");
      l.id = "gdh-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap";
      document.head.appendChild(l);
    }
    if (CONFIG.gaId && !document.getElementById("gdh-ga")) {
      const s = document.createElement("script");
      s.id = "gdh-ga"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`;
      document.head.appendChild(s);
      const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag("js", new Date()); w.gtag("config", CONFIG.gaId);
    }
    if (CONFIG.metaPixelId && !document.getElementById("gdh-fbq")) {
      const s = document.createElement("script");
      s.id = "gdh-fbq";
      s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${CONFIG.metaPixelId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, []);
  useEffect(() => {
    const fit = () => {
      const secs = Array.from(document.querySelectorAll<HTMLElement>("main section"));
      const H0 = window.innerHeight;
      const reset = (kids: HTMLElement[]) => kids.forEach((k) => { const st = k.style as any; st.zoom = ""; st.width = ""; st.maxWidth = ""; });
      secs.forEach((sec) => {
        const H = (sec.id === "contato" ? H0 - (document.querySelector("footer")?.offsetHeight || 56) : H0) - 40; // folga: a barra do host cobre parte da tela útil
        const kids = Array.from(sec.children) as HTMLElement[];
        reset(kids);
        sec.style.paddingTop = ""; sec.style.paddingBottom = "";
        if (window.innerWidth < 1024) return;
        sec.style.paddingTop = "96px"; sec.style.paddingBottom = "20px"; // topo livre para o header fixo
        const maxW = kids.map((k) => parseFloat(getComputedStyle(k).maxWidth) || 0);
        const prev = sec.style.minHeight;
        sec.style.minHeight = "0px";
        const cs = getComputedStyle(sec);
        const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        let z = 1;
        for (let i = 0; i < 5; i++) {
          const nat = sec.offsetHeight;
          if (nat <= H + 1 && i > 0 && nat >= H - 40) break;
          if (nat <= H && z === 1) break;
          z = Math.min(1, Math.max(0.5, z * ((H - pad) / (nat - pad)) * 0.99));
          kids.forEach((k, j) => { const st = k.style as any; st.zoom = String(z); st.width = (100 / z) + "%"; if (maxW[j]) st.maxWidth = (maxW[j] / z) + "px"; });
        }
        sec.style.minHeight = prev;
      });
    };
    fit();
    const t = [300, 1200, 2500, 5000, 9000].map((ms) => setTimeout(fit, ms));
    // refaz o ajuste quando as fontes (Oswald etc.) terminam de carregar e alteram as alturas
    const fonts = (document as any).fonts;
    fonts?.ready?.then(fit);
    fonts?.addEventListener?.("loadingdone", fit);
    window.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    return () => { window.removeEventListener("resize", fit); window.removeEventListener("load", fit); fonts?.removeEventListener?.("loadingdone", fit); t.forEach(clearTimeout); };
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    root.classList.add("js-motion");
    /* marca elementos para revelar ao rolar */
    const tag = (el: Element, i: number, zoom = false) => {
      el.classList.add("rv"); if (zoom) el.classList.add("rv-zoom");
      (el as HTMLElement).style.setProperty("--d", `${Math.min(i, 8) * 90}ms`);
    };
    document.querySelectorAll<HTMLElement>("main section").forEach((sec) => {
      Array.from(sec.children).forEach((c) => {
        if (!(c instanceof HTMLElement) || !c.className.toString().includes("max-w")) return;
        Array.from(c.children).forEach((k, i) => {
          const kids = Array.from(k.children);
          const isGrid = k.className.toString().includes("grid") && kids.length >= 2 && sec.id !== "inicio";
          if (isGrid) kids.forEach((g, j) => tag(g, j));
          else tag(k, i);
        });
      });
    });
    const hero = document.querySelector<HTMLElement>("#inicio .grid");
    if (hero) {
      hero.querySelectorAll(".rv").forEach((e) => e.classList.remove("rv"));
      Array.from(hero.children[0].children).forEach((k, i) => { tag(k, i); k.classList.add("rv-left"); });
      const lg = hero.querySelector("[data-hero-logo]"); if (lg) tag(lg, 2, true);
    }
    const sobre = document.querySelector<HTMLElement>("#sobre > div");
    if (sobre && sobre.children.length >= 2) {
      const left = sobre.children[0] as HTMLElement; left.classList.remove("rv");
      Array.from(left.children).forEach((k, i) => { tag(k, i); k.classList.add("rv-left"); });
      Array.from(sobre.children[1].children).forEach((k, i) => { tag(k, i + 1); k.classList.add("rv-right"); });
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((e) => io.observe(e));
    /* contadores */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("#inicio dt, #resultados dt")).filter((e) => /^\d+\D*$/.test(e.textContent || ""));
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      const el = e.target as HTMLElement; const m = (el.textContent || "").match(/^(\d+)(\D*)$/)!; const to = +m[1]; const suf = m[2]; const t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      el.textContent = "0" + suf; requestAnimationFrame(step);
    }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
    /* progresso + menu ativo */
    const bar = document.getElementById("gdh-progress");
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("header nav a"));
    const secs = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const max = root.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      const mid = window.scrollY + window.innerHeight * 0.4;
      let cur = ""; secs.forEach((s) => { if (s.offsetTop <= mid) cur = s.id; });
      links.forEach((a) => a.toggleAttribute("data-active", a.getAttribute("href") === "#" + cur));
    }); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); cio.disconnect(); root.classList.remove("js-motion"); };
  }, []);
  return (
    <div className="min-h-screen bg-ink text-bone">
      <div id="gdh-progress" aria-hidden="true" />
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-gold focus:text-ink focus:px-4 focus:py-2">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Team />
        <Method />
        <Programs />
        <Structure />
        <Results />
        <Gallery />
        <Partners />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp" className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gold hover:bg-gold-bright text-ink grid place-items-center shadow-xl hover:scale-105 transition-transform">
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
