import { useState } from "react";

const RANKS = [
  {
    id: "trial",
    label: "Trial Raider",
    subtitle: "2–4 week evaluation",
    color: "#E2704A",
    glow: "rgba(226,112,74,0.35)",
    icon: "⚔",
    description:
      "The proving ground. Trials earn their spot through performance, attitude, and showing they can follow the guild's culture before it's offered to them.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "Minimum 50% Warcraft Logs percentile for their role/spec",
          "Zero avoidable deaths — every wipe reviewed publicly",
          "Correct consumables every pull: flasks, food, runes",
          "Sim their character weekly — no excuse for sub-optimal gear",
        ],
      },
      {
        name: "Attendance & Preparation",
        icon: "📅",
        items: [
          "100% attendance during trial period — no exceptions",
          "Raid-ready 15 mins before first pull: repaired, stocked, logged in",
          "Pre-studied all assigned boss tactics before raid night",
          "Voice comms installed and working — listening is mandatory",
        ],
      },
      {
        name: "Conduct",
        icon: "🛡",
        items: [
          "Zero complaints or drama during trial — you're being watched",
          "Accept criticism constructively and implement it immediately",
          "Never blame others for raid wipes publicly",
          "Loot Council decisions are final — no complaints or lobbying",
        ],
      },
    ],
  },
  {
    id: "raider",
    label: "Raider",
    subtitle: "Trial passed — core candidate",
    color: "#5B9BD5",
    glow: "rgba(91,155,213,0.35)",
    icon: "🗡",
    description:
      "You've earned your spot. Maintain standards and prove you belong in the core team rotation. Raider rank can be lost — complacency is never tolerated.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "Maintain 50%+ Warcraft Logs ranking on current tier bosses",
          "Full knowledge of all current tier mechanics — no officer carries",
          "BiS or near-BiS gear at all times — weekly M+ minimum completed",
          "Off-spec maintained to a playable standard if roster depth requires",
        ],
      },
      {
        name: "Attendance & Comms",
        icon: "📅",
        items: [
          "90%+ raid attendance — absences notified 24hrs in advance minimum",
          "Active in guild Discord between raids — not a ghost",
          "React to scheduling polls within 12 hours",
          "Honest self-assessment submitted after progression nights if requested",
        ],
      },
      {
        name: "Conduct & Culture",
        icon: "🛡",
        items: [
          "Constructive on comms — no raging or meme spam on prog",
          "Help newer members without being asked — culture matters",
          "Raise issues with officers privately, never create public drama",
          "Demotion to Trial is on the table for prolonged underperformance",
        ],
      },
    ],
  },
  {
    id: "core",
    label: "Core Raider",
    subtitle: "The backbone of CE attempts",
    color: "#58C49A",
    glow: "rgba(88,196,154,0.35)",
    icon: "💎",
    description:
      "The best players in the roster. Core Raiders are untouchable on logs, lead by example, and are the first names on the sheet for every progression pull.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "75%+ Warcraft Logs parse — consistently, not occasionally",
          "Full BiS for their spec — enchants, gems, everything maxed",
          "Able to call assignments/adjustments mid-pull if asked",
          "Deep spec knowledge — expected to theorycraft and contribute strategy",
        ],
      },
      {
        name: "Commitment",
        icon: "📅",
        items: [
          "95%+ attendance — missing CE prog without cause is unacceptable",
          "Available for extra sessions called at short notice during prog",
          "Maintain two viable specs in the current meta if class allows",
          "Vault and crafting priorities aligned with officer loot strategy",
        ],
      },
      {
        name: "Leadership",
        icon: "🛡",
        items: [
          "Mentor Raiders and Trials without being asked",
          "Provide raid feedback in officer channels when relevant",
          "Represent the guild's values in PuGs, on streams, on socials",
          "Vouch or veto trial raiders — your opinion matters at this rank",
        ],
      },
    ],
  },
  {
    id: "officer",
    label: "Officer",
    subtitle: "Leads from the front",
    color: "#B47FD4",
    glow: "rgba(180,127,212,0.35)",
    icon: "👑",
    description:
      "Officers are not just great players — they are the engine of the guild. They shoulder the invisible work that makes CE possible: tactics, recruitment, loot, morale, scheduling.",
    categories: [
      {
        name: "In-Raid Responsibilities",
        icon: "📊",
        items: [
          "Own a specific domain: tactics, healing, tank, or ranged/melee lead",
          "Prepare and communicate strats before every progression boss",
          "Analyse Warcraft Logs after every session — spot patterns, not just mistakes",
          "Call wipes decisively — never let bad pulls drag on",
        ],
      },
      {
        name: "Guild Management",
        icon: "📅",
        items: [
          "Own the trial process end-to-end for their role type",
          "Write public feedback for trials within 48hrs of eval period end",
          "Manage roster depth — never be caught short for progression",
          "Attend weekly officer meeting — decisions made together, executed consistently",
        ],
      },
      {
        name: "Culture & Standards",
        icon: "🛡",
        items: [
          "Model the standards publicly — never have a bad attitude on pull night",
          "Handle conflicts privately and swiftly — no festering drama",
          "Give individual performance feedback monthly, not just during crisis",
          "Officers can be demoted — rank is earned continuously, not awarded permanently",
        ],
      },
    ],
  },
];

const RULES = [
  {
    group: "Preparation",
    color: "#E2704A",
    rules: [
      {
        num: 1,
        title: "Come prepared or don't come",
        body: "Every raider is expected to have studied assigned boss tactics, watched relevant Method/Echo PoV vods, and have correct consumables before the first pull. Officers will not explain mechanics from scratch on prog night. Ignorance is benched.",
      },
      {
        num: 2,
        title: "Be online and raid-ready 15 minutes before pull time",
        body: "Pull time is pull time. Not invites time. Not food buff time. The first pull goes out at the scheduled minute. Chronic latecomers are replaced mid-tier, no warning required.",
      },
      {
        num: 3,
        title: "Maintain your character between raids",
        body: "Full enchants, gems, tier set optimisation, simming for gear upgrades, weekly M+ completed, vault opened. Officers run a pre-raid check. Being undergeared when a better option was available is treated as misconduct, not bad luck.",
      },
    ],
  },
  {
    group: "Progression",
    color: "#5B9BD5",
    rules: [
      {
        num: 4,
        title: "Silence on comms during prog pulls",
        body: "One officer calls pulls and wipes. No unsolicited mid-pull commentary. If you see something critical, one sentence. Chatter kills focus at 3% wipes.",
      },
      {
        num: 5,
        title: "Wipes are analysed, not mourned",
        body: "After a wipe, the officer reviewing logs has 60 seconds maximum. Pull again. On difficult nights, a longer debrief is posted in Discord — it does not happen on voice during the raid.",
      },
      {
        num: 6,
        title: "Strategy adjustments are officer decisions",
        body: "If you have a better idea, post it in the tactics channel. Do not suggest alternatives on comms mid-progression unless directly asked. The chain of command exists to prevent 20 people pulling in different directions.",
      },
      {
        num: 7,
        title: "Extra sessions during end-of-tier prog are mandatory for Core Raiders",
        body: "If you cannot commit to crunch time, say so before the tier starts. Ghosting an extra session during final boss prog is a Core demotion.",
      },
    ],
  },
  {
    group: "Loot",
    color: "#F5C842",
    rules: [
      {
        num: 8,
        title: "Loot Council is final",
        body: "The council considers: performance on the current boss, overall contribution, spec priority, and guild progression value. It is not democratic. There is no appeals process on the night. Post-session concerns go to the GM in private.",
      },
      {
        num: 9,
        title: "Trading loot is a guild decision, not a personal one",
        body: "All tradeable drops are announced to the council before any trade is made. Trading outside this process is an immediate infraction.",
      },
      {
        num: 10,
        title: "Selfless loot behaviour is tracked and rewarded",
        body: "Repeatedly passing upgrades for the good of the guild is noted by officers and factors into Core Raider promotion decisions.",
      },
    ],
  },
  {
    group: "Conduct",
    color: "#58C49A",
    rules: [
      {
        num: 11,
        title: "Public blame culture is a zero-tolerance offence",
        body: "Calling out individual players for mistakes in raid chat, voice comms, or Discord is an immediate warning. Second offence is removal. Officers handle performance privately.",
      },
      {
        num: 12,
        title: "No streaming during active CE progression",
        body: "Streaming is permitted on farm. During active CE progression on new bosses, streaming is off unless explicitly agreed with the GM. Spoiling strats or leaking roster decisions publicly is a removal offence.",
      },
      {
        num: 13,
        title: "Recruitment is everyone's job",
        body: "When a quality player is spotted in a PuG or on your friends list, report it to the recruitment officer. Do not recruit directly without officer sign-off.",
      },
    ],
  },
  {
    group: "Rank & Accountability",
    color: "#B47FD4",
    rules: [
      {
        num: 14,
        title: "All ranks are under continuous review",
        body: "There is no tenure. A Core Raider who underperforms for three consecutive prog nights goes to Raider. A Raider who goes three weeks without correcting a flagged issue goes to Trial or is released. Officers are reviewed by the GM each tier.",
      },
      {
        num: 15,
        title: "The GM has final say, exercised rarely",
        body: "Officers run the guild day to day. The GM steps in for rank disputes, removal decisions, and major strategic calls. Officers do not override each other publicly — disagreements go to the officer channel and come out as a unified decision.",
      },
      {
        num: 16,
        title: "The guild's reputation is your reputation",
        body: "How you behave in PuGs, on Discord servers, on social media, and in trade chat reflects on the tag above your head. Toxic behaviour outside the guild is treated the same as inside it.",
      },
    ],
  },
];

export default function GuildApp() {
  const [view, setView] = useState("matrix");
  const [activeRank, setActiveRank] = useState("trial");
  const [expandedRule, setExpandedRule] = useState(null);

  const rank = RANKS.find((r) => r.id === activeRank);

  return (
    <div style={styles.root}>
      {/* Noise texture overlay */}
      <div style={styles.noise} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.guildBadge}>⚜</div>
          <div>
            <h1 style={styles.guildName}>GUILD CHARTER</h1>
            <p style={styles.guildTagline}>Standards of Excellence — Cutting Edge Protocol</p>
          </div>
        </div>
        <nav style={styles.nav}>
          <button
            style={{ ...styles.navBtn, ...(view === "matrix" ? styles.navBtnActive : {}) }}
            onClick={() => setView("matrix")}
          >
            Rank Matrix
          </button>
          <button
            style={{ ...styles.navBtn, ...(view === "rules" ? styles.navBtnActive : {}) }}
            onClick={() => setView("rules")}
          >
            Guild Rules
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {view === "matrix" ? (
          <div>
            {/* Rank selector */}
            <div style={styles.rankTabs}>
              {RANKS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRank(r.id)}
                  style={{
                    ...styles.rankTab,
                    ...(activeRank === r.id
                      ? {
                          borderColor: r.color,
                          color: r.color,
                          boxShadow: `0 0 18px ${r.glow}, inset 0 0 12px ${r.glow}`,
                          background: `rgba(0,0,0,0.6)`,
                        }
                      : {}),
                  }}
                >
                  <span style={styles.rankTabIcon}>{r.icon}</span>
                  <span style={styles.rankTabLabel}>{r.label}</span>
                </button>
              ))}
            </div>

            {/* Rank detail */}
            <div style={styles.rankDetail}>
              <div style={{ ...styles.rankDetailHeader, borderColor: rank.color }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ ...styles.rankIcon, color: rank.color, textShadow: `0 0 20px ${rank.glow}` }}>
                    {rank.icon}
                  </span>
                  <div>
                    <h2 style={{ ...styles.rankTitle, color: rank.color }}>{rank.label}</h2>
                    <p style={styles.rankSubtitle}>{rank.subtitle}</p>
                  </div>
                </div>
                <div
                  style={{
                    ...styles.rankGlowBar,
                    background: `linear-gradient(90deg, ${rank.color}66, transparent)`,
                  }}
                />
              </div>
              <p style={styles.rankDesc}>{rank.description}</p>

              <div style={styles.categoriesGrid}>
                {rank.categories.map((cat) => (
                  <div key={cat.name} style={styles.catCard}>
                    <div style={{ ...styles.catHeader, borderColor: rank.color + "55" }}>
                      <span style={styles.catIcon}>{cat.icon}</span>
                      <span style={{ ...styles.catName, color: rank.color }}>{cat.name}</span>
                    </div>
                    <ul style={styles.catList}>
                      {cat.items.map((item, i) => (
                        <li key={i} style={styles.catItem}>
                          <span style={{ ...styles.bullet, color: rank.color }}>▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={styles.rulesIntro}>
              <p style={styles.rulesIntroText}>
                These rules are non-negotiable, built from how Method, Echo, and Liquid actually
                operate. Every rule exists to protect the collective standard that makes Cutting
                Edge achievable.
              </p>
              <div style={styles.primeLaw}>
                <span style={styles.primeLawIcon}>⚜</span>
                <p style={styles.primeLawText}>
                  "Cutting Edge is not a reward for showing up. It is earned by a collective
                  standard maintained 52 weeks a year — not just during prog week."
                </p>
              </div>
            </div>

            {RULES.map((group) => (
              <div key={group.group} style={styles.ruleGroup}>
                <div style={styles.ruleGroupHeader}>
                  <div style={{ ...styles.ruleGroupLine, background: group.color }} />
                  <h3 style={{ ...styles.ruleGroupTitle, color: group.color }}>{group.group}</h3>
                </div>
                <div style={styles.rulesList}>
                  {group.rules.map((rule) => {
                    const isOpen = expandedRule === `${group.group}-${rule.num}`;
                    return (
                      <div
                        key={rule.num}
                        style={{
                          ...styles.ruleCard,
                          borderColor: isOpen ? group.color + "88" : "rgba(255,255,255,0.07)",
                          background: isOpen ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)",
                        }}
                        onClick={() =>
                          setExpandedRule(isOpen ? null : `${group.group}-${rule.num}`)
                        }
                      >
                        <div style={styles.ruleCardHeader}>
                          <div style={{ ...styles.ruleNum, color: group.color }}>
                            {String(rule.num).padStart(2, "0")}
                          </div>
                          <p style={styles.ruleTitle}>{rule.title}</p>
                          <span style={{ ...styles.chevron, color: group.color }}>
                            {isOpen ? "▴" : "▾"}
                          </span>
                        </div>
                        {isOpen && (
                          <div style={{ ...styles.ruleBody, borderColor: group.color + "33" }}>
                            {rule.body}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={styles.footer}>
              <span style={styles.footerGem}>💎</span>
              <p style={styles.footerText}>
                The single biggest separator between guilds that get CE and guilds that stall at 7/8?{" "}
                <strong style={{ color: "#F5C842" }}>Accountability without ego.</strong> Build that
                culture from day one and protect it mercilessly.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0b0f",
    backgroundImage:
      "radial-gradient(ellipse at 20% 10%, rgba(90,50,20,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(30,20,70,0.3) 0%, transparent 50%)",
    color: "#d8d4c8",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  noise: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.5,
  },
  header: {
    position: "relative",
    zIndex: 10,
    borderBottom: "1px solid rgba(255,200,100,0.15)",
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(12px)",
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  guildBadge: {
    fontSize: 36,
    color: "#F5C842",
    textShadow: "0 0 24px rgba(245,200,66,0.6)",
    lineHeight: 1,
  },
  guildName: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.25em",
    color: "#F5C842",
    textShadow: "0 0 20px rgba(245,200,66,0.4)",
    fontFamily: "'Georgia', serif",
  },
  guildTagline: {
    margin: "2px 0 0",
    fontSize: 11,
    letterSpacing: "0.18em",
    color: "rgba(200,190,160,0.6)",
    textTransform: "uppercase",
    fontFamily: "'Georgia', serif",
  },
  nav: {
    display: "flex",
    gap: 8,
  },
  navBtn: {
    padding: "8px 20px",
    background: "transparent",
    border: "1px solid rgba(255,200,100,0.2)",
    borderRadius: 4,
    color: "rgba(200,185,150,0.7)",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    fontSize: 13,
    letterSpacing: "0.08em",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "rgba(245,200,66,0.12)",
    borderColor: "rgba(245,200,66,0.5)",
    color: "#F5C842",
    boxShadow: "0 0 12px rgba(245,200,66,0.2)",
  },
  main: {
    position: "relative",
    zIndex: 5,
    maxWidth: 960,
    margin: "0 auto",
    padding: "32px 24px 64px",
  },
  rankTabs: {
    display: "flex",
    gap: 10,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  rankTab: {
    flex: "1 1 140px",
    padding: "14px 16px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    color: "rgba(180,170,150,0.6)",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    transition: "all 0.25s",
  },
  rankTabIcon: {
    fontSize: 22,
  },
  rankTabLabel: {
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  rankDetail: {
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8,
    overflow: "hidden",
  },
  rankDetailHeader: {
    padding: "24px 28px 20px",
    borderBottom: "1px solid",
    position: "relative",
  },
  rankIcon: {
    fontSize: 42,
    lineHeight: 1,
  },
  rankTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "0.1em",
    fontFamily: "'Georgia', serif",
  },
  rankSubtitle: {
    margin: "3px 0 0",
    fontSize: 12,
    color: "rgba(180,170,150,0.5)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  rankGlowBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  rankDesc: {
    padding: "20px 28px",
    fontSize: 14,
    lineHeight: 1.75,
    color: "rgba(210,200,180,0.8)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    margin: 0,
  },
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 0,
  },
  catCard: {
    padding: "20px 24px",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    borderTop: "1px solid rgba(255,255,255,0.03)",
  },
  catHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingBottom: 12,
    marginBottom: 14,
    borderBottom: "1px solid",
  },
  catIcon: {
    fontSize: 16,
  },
  catName: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontFamily: "'Georgia', serif",
  },
  catList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  catItem: {
    display: "flex",
    gap: 8,
    fontSize: 13,
    lineHeight: 1.55,
    marginBottom: 10,
    color: "rgba(210,200,180,0.8)",
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 10,
    marginTop: 3,
    flexShrink: 0,
  },

  // Rules view
  rulesIntro: {
    marginBottom: 36,
  },
  rulesIntroText: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(200,190,170,0.75)",
    marginBottom: 20,
  },
  primeLaw: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    background: "rgba(245,200,66,0.06)",
    border: "1px solid rgba(245,200,66,0.2)",
    borderRadius: 6,
    padding: "18px 22px",
  },
  primeLawIcon: {
    fontSize: 22,
    color: "#F5C842",
    flexShrink: 0,
    marginTop: 2,
  },
  primeLawText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.75,
    color: "rgba(230,220,190,0.9)",
    fontStyle: "italic",
  },
  ruleGroup: {
    marginBottom: 36,
  },
  ruleGroupHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  ruleGroupLine: {
    width: 32,
    height: 2,
    borderRadius: 2,
  },
  ruleGroupTitle: {
    margin: 0,
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontFamily: "'Georgia', serif",
    fontWeight: 700,
  },
  rulesList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  ruleCard: {
    border: "1px solid",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.2s",
    overflow: "hidden",
  },
  ruleCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "14px 18px",
  },
  ruleNum: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'Georgia', serif",
    minWidth: 36,
    lineHeight: 1,
    opacity: 0.9,
  },
  ruleTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(225,215,195,0.95)",
    flex: 1,
    fontFamily: "'Georgia', serif",
  },
  chevron: {
    fontSize: 12,
    flexShrink: 0,
  },
  ruleBody: {
    padding: "0 18px 16px 70px",
    fontSize: 13,
    lineHeight: 1.75,
    color: "rgba(200,190,170,0.75)",
    borderTop: "1px solid",
    paddingTop: 14,
    marginTop: 0,
  },
  footer: {
    marginTop: 48,
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    padding: "24px 28px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(245,200,66,0.1)",
    borderRadius: 8,
  },
  footerGem: {
    fontSize: 28,
    flexShrink: 0,
  },
  footerText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(210,200,180,0.8)",
    fontStyle: "italic",
  },
};
