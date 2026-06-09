import { useState } from "react";

const RANKS = [
  {
    id: "trial",
    label: "Trial Raider",
    subtitle: "4 raids — 2 week evaluation",
    color: "#E2704A",
    glow: "rgba(226,112,74,0.35)",
    icon: "⚔",
    description:
      "The proving ground. Trials must complete 4 consecutive raid nights across 2 weeks from an agreed start date. The officer team does not want you to fail — support and feedback will be provided throughout. This period is also for you to decide if PFTL is the right community for you.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "**Minimum 50% Warcraft Logs** percentile for their role/spec on **Mythic difficulty**",
          "**Zero avoidable deaths** — every wipe reviewed",
          "**Correct consumables every pull**: flasks, food, runes",
          "Sim their character weekly — **no excuse for sub-optimal gear**",
          "All **mandatory addons** installed and configured before first raid",
        ],
      },
      {
        name: "Attendance",
        icon: "📅",
        items: [
          "Must attend **4 consecutive raids (2 weeks)** from agreed start date",
          "Missing 1 raid **extends trial by 1 week** — 24hr advance notice required",
          "Missing a second raid extends trial by a **final additional week**",
          "**Raid-ready 15 mins** before pull: repaired, stocked, logged in",
          "Trials **exceeding expectations** may be fast-tracked. Raiders/Core Raiders **vouching** for a trial may also accelerate the process.",
        ],
      },
      {
        name: "Loot",
        icon: "💰",
        items: [
          "**Trials do not receive loot** during their trial period — no exceptions",
          "This applies to all item drops regardless of upgrade value or spec priority (BOE drops are the exception to this rule, if you get one **its yours**)",
          "Loot Council decisions are **final** — no lobbying",
          "Upon passing your trial, you enter the loot council rotation immediately",
        ],
      },
      {
        name: "Conduct",
        icon: "🛡",
        items: [
          "**Zero complaints or drama** — you are being evaluated at all times",
          "Accept criticism **constructively and implement it immediately**",
          "**Never** blame others for raid wipes publicly",
          "You are here to prove yourself — **respect the process**",
        ],
      },
      {
        name: "Automatic Fails",
        icon: "🚫",
        items: [
          "**Missing 3 raids** during the trial period",
          "Missing a raid **without 24hr notice**, or arriving **10+ minutes late** without warning",
          "**Signing absent 3 consecutive raids** without officer agreement",
          "Arriving **without consumables** more than once",
          "**Grey parsing** with no improvement after officer feedback",
          "**Repeatedly failing the same mechanic** after it has been flagged",
          "Failure to install **mandatory addons** announced by the Raid Leader",
          "The **Raid Leader has final say** on all pass/fail decisions",
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
      "You have earned your spot. These are the bare minimum standards to maintain Raider rank — they will rise as the guild matures. Complacency is never tolerated and Raider rank can be lost.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "Maintain **50%+ Warcraft Logs** on current **Mythic tier** bosses — not LFR or Heroic",
          "**Act on personal mistakes** flagged in post-raid analysis — the number means nothing if errors repeat",
          "**Full knowledge** of all current tier mechanics — no officer carries",
          "**BiS or near-BiS** gear at all times",
          "Complete enough Mythic+ weekly for **2 vault slots minimum**, at the highest key level awarding **myth track gear**",
        ],
      },
      {
        name: "Attendance & Comms",
        icon: "📅",
        items: [
          "**90%+ raid attendance** — absences notified **24hrs in advance** minimum",
          "Respond to scheduling polls and officer pings **within 12 hours**",
          "**Active in guild Discord** between raids — not a ghost",
          "Honest self-assessment submitted after progression nights if requested",
        ],
      },
      {
        name: "Conduct & Culture",
        icon: "🛡",
        items: [
          "**Constructive on comms** — no raging or meme spam on prog",
          "Help newer members **without being asked** — culture matters",
          "Raise issues with officers **privately** — never create public drama",
          "**Demotion to Trial** is on the table for prolonged underperformance or breach of standards",
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
      "The best players in the roster. First names on the sheet for every progression pull. These are baseline standards — they will be raised as the guild matures. Core Raider status is not permanent; it is reviewed each tier.",
    categories: [
      {
        name: "Performance",
        icon: "📊",
        items: [
          "**75%+ Warcraft Logs** maintained as a **session average** across the tier — not cherry-picked boss pulls",
          "**Full BiS** — enchants, gems, everything maxed",
          "Able to **call assignments and adjustments** mid-pull if asked",
          "**Deep spec knowledge** — expected to theorycraft and contribute strategy",
          "If the meta shifts and your spec becomes non-viable, **discuss reroll options with officers** within the same tier",
        ],
      },
      {
        name: "Commitment",
        icon: "📅",
        items: [
          "**95%+ attendance** — missing CE prog without cause is unacceptable",
          "Available for **unscheduled extra sessions** with 48hrs notice during final boss prog",
          "Maintain **two viable specs** in the current meta if class allows",
          "**Vault and crafting priorities** aligned with officer loot strategy",
        ],
      },
      {
        name: "Leadership",
        icon: "🛡",
        items: [
          "**Mentor Raiders and Trials** without being asked",
          "Provide **raid feedback** in officer channels when relevant",
          "Represent **PFTL's values** in PuGs, on streams, and on socials",
          "**Vouch or veto** trial raiders — your opinion carries weight at this rank",
        ],
      },
      {
        name: "Demotion Triggers",
        icon: "⚠️",
        items: [
          "Core Raider status **reviewed at the end of each tier**",
          "Session log average **below 75% for two consecutive weeks** without cause → demotion to Raider",
          "Attendance **below 90% for two consecutive weeks** without cause → demotion to Raider",
          "**Failure to engage** with officers on spec viability is treated as a conduct issue",
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
          "**Own a specific domain**: tactics, healing, tank, or ranged/melee lead",
          "**Prepare and communicate strats** before every progression boss",
          "**Analyse Warcraft Logs** after every session — spot patterns, not just mistakes",
          "**Call wipes decisively** — never let bad pulls drag on",
        ],
      },
      {
        name: "Guild Management",
        icon: "📅",
        items: [
          "**Own the trial process** end-to-end for their role type",
          "Write **public feedback for trials** within 48hrs of eval period end",
          "**Manage roster depth** — never be caught short for progression",
          "Attend **weekly officer meeting** — decisions made together, executed consistently",
        ],
      },
      {
        name: "Culture & Standards",
        icon: "🛡",
        items: [
          "**Model the standards publicly** — never have a bad attitude on pull night",
          "Handle conflicts **privately and swiftly** — no festering drama",
          "Give **individual performance feedback monthly**, not just during crisis",
          "**Officers can be demoted** — rank is earned continuously, not awarded permanently",
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
    color: "#C9922A",
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

function hex2rgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// Parses **bold** markers in item strings into <strong> elements
function renderItem(text, accentColor) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: accentColor, fontWeight: 600 }}>{part}</strong>
      : part
  );
}

export default function GuildApp() {
  const [view, setView] = useState("matrix");
  const [activeRank, setActiveRank] = useState("trial");
  const [expandedRule, setExpandedRule] = useState(null);

  const rank = RANKS.find((r) => r.id === activeRank);

  return (
    <div style={styles.root}>
      {/* Background layers */}
      <div style={styles.bgLayer} />
      <div style={styles.gridLayer} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerBrand}>
          <div style={styles.guildSeal}>
            <div style={styles.sealRing} />
            <div style={styles.sealRingInner} />
            <img
              src="/PFTL.png"
              alt="Pull First Think Later guild logo"
              style={styles.sealLogo}
            />
          </div>
          <div style={styles.brandText}>
            <div style={styles.guildName}>PFTL</div>
            <div style={styles.guildTagline}>
              Cutting Edge Protocol — Raider Standards
            </div>
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
          <div style={styles.matrixLayout}>
            {/* Left spine */}
            <div style={styles.rankSpine}>
              <div style={styles.spineTitle}>Rank Progression</div>
              <div style={styles.spineTrack}>
                <div style={styles.spineGlow} />
              </div>
              <div>
                {RANKS.map((r) => {
                  const isActive = r.id === activeRank;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveRank(r.id)}
                      style={{
                        ...styles.rankTab,
                        ...(isActive ? {
                          borderLeftColor: r.color,
                          color: r.color,
                          background: hex2rgba(r.color, 0.06),
                        } : {}),
                      }}
                    >
                      <span style={styles.tabIcon}>{r.icon}</span>
                      <span style={styles.tabTextWrap}>
                        <span style={{ ...styles.tabLabel, ...(isActive ? { color: r.color } : {}) }}>
                          {r.label}
                        </span>
                        <span style={styles.tabSub}>{r.subtitle}</span>
                      </span>
                      <span
                        style={{
                          ...styles.tabPip,
                          ...(isActive ? {
                            background: r.color,
                            boxShadow: `0 0 8px ${r.color}`,
                            width: 8,
                            height: 8,
                            right: -4,
                          } : {}),
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right detail panel */}
            <div style={styles.rankDetail}>
              <div style={styles.rankHero}>
                <div style={styles.rankHeroTop}>
                  <div
                    style={{
                      ...styles.rankEmblem,
                      background: hex2rgba(rank.color, 0.1),
                      borderColor: hex2rgba(rank.color, 0.4),
                      boxShadow: `0 0 24px ${hex2rgba(rank.color, 0.2)}`,
                    }}
                  >
                    <span style={styles.rankEmblemIcon}>{rank.icon}</span>
                  </div>
                  <div style={styles.rankHeaderText}>
                    <div
                      style={{
                        ...styles.rankTitle,
                        color: rank.color,
                        textShadow: `0 0 30px ${hex2rgba(rank.color, 0.4)}`,
                      }}
                    >
                      {rank.label}
                    </div>
                    <div style={styles.rankSubtitle}>{rank.subtitle}</div>
                  </div>
                </div>
                <div
                  style={{
                    ...styles.rankBar,
                    background: `linear-gradient(90deg, ${rank.color}99, transparent)`,
                  }}
                />
                <p style={styles.rankDesc}>{rank.description}</p>
              </div>

              <div style={styles.catsGrid}>
                {rank.categories.map((cat) => (
                  <div
                    key={cat.name}
                    style={{
                      ...styles.catCard,
                      borderTop: `2px solid ${hex2rgba(rank.color, 0.5)}`,
                    }}
                  >
                    <div style={styles.catHead}>
                      <span style={styles.catIcon}>{cat.icon}</span>
                      <span style={{ ...styles.catName, color: rank.color }}>
                        {cat.name}
                      </span>
                    </div>
                    <ul style={styles.catList}>
                      {cat.items.map((item, i) => (
                        <li key={i} style={styles.catItem}>
                          <span
                            style={{ ...styles.catBullet, background: rank.color }}
                          />
                          <span>{renderItem(item, rank.color)}</span>
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
              <p style={styles.rulesLead}>
                These rules are non-negotiable, built from how Method, Echo, and
                Liquid actually operate. Every rule exists to protect the
                collective standard that makes Cutting Edge achievable.
              </p>
              <div style={styles.primeLaw}>
                <span style={styles.primeIcon}>⚜</span>
                <p style={styles.primeText}>
                  "Cutting Edge is not a reward for showing up. It is earned by
                  a collective standard maintained 52 weeks a year — not just
                  during prog week."
                </p>
              </div>
            </div>

            {RULES.map((group) => (
              <div key={group.group} style={styles.ruleGroup}>
                <div style={styles.ruleGroupHead}>
                  <div
                    style={{ ...styles.ruleGroupLine, background: group.color }}
                  />
                  <h3
                    style={{ ...styles.ruleGroupTitle, color: group.color }}
                  >
                    {group.group}
                  </h3>
                </div>
                <div>
                  {group.rules.map((rule) => {
                    const key = `${group.group}-${rule.num}`;
                    const isOpen = expandedRule === key;
                    return (
                      <div
                        key={rule.num}
                        style={{
                          ...styles.ruleCard,
                          borderColor: isOpen
                            ? group.color + "66"
                            : "rgba(255,255,255,0.07)",
                          background: isOpen
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(13,14,21,0.6)",
                        }}
                        onClick={() =>
                          setExpandedRule(isOpen ? null : key)
                        }
                      >
                        <div style={styles.ruleCardHead}>
                          <span
                            style={{ ...styles.ruleNum, color: group.color }}
                          >
                            {String(rule.num).padStart(2, "0")}
                          </span>
                          <p style={styles.ruleTitle}>{rule.title}</p>
                          <span
                            style={{
                              ...styles.chevron,
                              color: group.color,
                              transform: isOpen ? "rotate(180deg)" : "none",
                            }}
                          >
                            ▾
                          </span>
                        </div>
                        {isOpen && (
                          <div
                            style={{
                              ...styles.ruleBody,
                              borderColor: group.color + "33",
                            }}
                          >
                            {rule.body}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={styles.rulesFooter}>
              <span style={styles.footerGem}>💎</span>
              <p style={styles.footerText}>
                The single biggest separator between guilds that get CE and
                guilds that stall at 7/8?{" "}
                <strong style={{ color: "#C9922A", fontStyle: "normal" }}>
                  Accountability without ego.
                </strong>{" "}
                Build that culture from day one and protect it mercilessly.
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
    background: "#07080C",
    backgroundImage:
      "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(107,63,160,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 85% 100%, rgba(107,63,160,0.12) 0%, transparent 70%)",
    color: "#EDE9E1",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgLayer: {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    background:
      "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(107,63,160,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 85% 100%, rgba(107,63,160,0.12) 0%, transparent 70%), radial-gradient(ellipse 80% 30% at 50% 50%, rgba(201,146,42,0.04) 0%, transparent 70%)",
  },
  gridLayer: {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.03,
    backgroundImage:
      "linear-gradient(rgba(201,146,42,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,146,42,0.8) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  },
  header: {
    position: "relative", zIndex: 100,
    borderBottom: "1px solid rgba(201,146,42,0.2)",
    background: "rgba(7,8,12,0.85)",
    backdropFilter: "blur(20px)",
    padding: "0 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 16, flexWrap: "wrap",
  },
  headerBrand: {
    display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
  },
  guildSeal: {
    width: 56, height: 56, position: "relative", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  sealRing: {
    position: "absolute", inset: 0, borderRadius: "50%",
    border: "1.5px solid rgba(201,146,42,0.6)",
    boxShadow: "0 0 12px rgba(201,146,42,0.3)",
  },
  sealRingInner: {
    position: "absolute", inset: 4, borderRadius: "50%",
    border: "1px solid rgba(201,146,42,0.2)",
  },
  sealLogo: {
    width: 48, height: 48, borderRadius: "50%",
    objectFit: "cover", position: "relative", zIndex: 1,
  },
  brandText: {
    display: "flex", flexDirection: "column", gap: 4,
  },
  guildName: {
    fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 900,
    letterSpacing: "0.3em", color: "#C9922A",
    textShadow: "0 0 30px rgba(201,146,42,0.5)", lineHeight: 1,
  },
  guildTagline: {
    fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "rgba(90,87,82,1)", fontWeight: 400,
  },
  nav: { display: "flex", gap: 4, padding: "16px 0" },
  navBtn: {
    padding: "9px 22px", background: "transparent",
    border: "1px solid rgba(201,146,42,0.15)", borderRadius: 2,
    color: "rgba(90,87,82,1)", cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.12em",
    transition: "all 0.25s", textTransform: "uppercase",
  },
  navBtnActive: {
    background: "rgba(201,146,42,0.12)",
    borderColor: "rgba(201,146,42,0.55)",
    color: "#C9922A",
    boxShadow: "0 0 16px rgba(201,146,42,0.15)",
  },
  main: {
    position: "relative", zIndex: 10,
    maxWidth: 1040, margin: "0 auto", padding: "40px 24px 80px",
  },

  // Matrix
  matrixLayout: {
    display: "grid", gridTemplateColumns: "240px 1fr", gap: 0, minHeight: 600,
  },
  rankSpine: {
    borderRight: "1px solid rgba(201,146,42,0.12)",
    position: "relative", display: "flex", flexDirection: "column",
  },
  spineTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.25em",
    textTransform: "uppercase", color: "rgba(90,87,82,1)",
    padding: "0 20px 16px 0", marginBottom: 4,
  },
  spineTrack: {
    position: "absolute", left: -1, top: 60, bottom: 60, width: 1,
    background: "linear-gradient(to bottom, transparent, #3D2260 20%, #6B3FA0 50%, #3D2260 80%, transparent)",
    overflow: "hidden",
  },
  spineGlow: {
    position: "absolute", width: "100%", height: "40%",
    background: "linear-gradient(to bottom, transparent, #9B6FD0, transparent)",
    animation: "spineScroll 3s ease-in-out infinite",
  },
  rankTab: {
    position: "relative", padding: "18px 20px 18px 16px",
    cursor: "pointer", border: "none", background: "transparent",
    textAlign: "left", width: "100%", color: "rgba(90,87,82,1)",
    transition: "all 0.3s", borderLeft: "2px solid transparent",
    display: "flex", alignItems: "center", gap: 12, marginBottom: 2,
  },
  tabIcon: { fontSize: 20, lineHeight: 1, flexShrink: 0 },
  tabTextWrap: { display: "flex", flexDirection: "column", gap: 3 },
  tabLabel: {
    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.08em",
    fontWeight: 600, lineHeight: 1, color: "rgba(168,164,156,0.7)",
    transition: "color 0.3s",
  },
  tabSub: { fontSize: 10, letterSpacing: "0.05em", color: "rgba(90,87,82,1)", lineHeight: 1 },
  tabPip: {
    position: "absolute", right: -1, top: "50%", transform: "translateY(-50%)",
    width: 6, height: 6, borderRadius: "50%", background: "transparent",
    transition: "all 0.3s",
  },

  // Detail
  rankDetail: { paddingLeft: 40 },
  rankHero: {
    paddingBottom: 28, marginBottom: 28,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  rankHeroTop: { display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 16 },
  rankEmblem: {
    width: 72, height: 72, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 4, border: "1px solid", transition: "all 0.4s", position: "relative",
  },
  rankEmblemIcon: { fontSize: 36, lineHeight: 1 },
  rankHeaderText: { flex: 1 },
  rankTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 30, fontWeight: 700,
    letterSpacing: "0.08em", lineHeight: 1, marginBottom: 6, transition: "color 0.4s",
  },
  rankSubtitle: {
    fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
    color: "rgba(90,87,82,1)",
  },
  rankBar: { height: 1, width: "100%", marginTop: 4 },
  rankDesc: {
    fontSize: 14, lineHeight: 1.8, color: "rgba(232,224,210,0.75)",
    maxWidth: 680, marginTop: 16,
  },
  catsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12,
  },
  catCard: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 4, padding: 20,
    transition: "border-color 0.3s, background 0.3s",
  },
  catHead: {
    display: "flex", alignItems: "center", gap: 8,
    paddingBottom: 12, marginBottom: 14,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  catIcon: { fontSize: 15 },
  catName: {
    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.18em",
    textTransform: "uppercase", fontWeight: 600,
  },
  catList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
  catItem: { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.6, color: "rgba(220,212,198,0.8)" },
  catBullet: { flexShrink: 0, marginTop: 6, width: 4, height: 4, borderRadius: "50%" },

  // Rules
  rulesIntro: { marginBottom: 40 },
  rulesLead: {
    fontSize: 14, lineHeight: 1.85, color: "rgba(200,190,170,0.75)",
    marginBottom: 20, maxWidth: 720,
  },
  primeLaw: {
    display: "flex", gap: 18, alignItems: "flex-start",
    background: "rgba(201,146,42,0.06)",
    border: "1px solid rgba(201,146,42,0.22)",
    borderLeft: "3px solid #C9922A",
    borderRadius: 2, padding: "20px 24px",
  },
  primeIcon: { fontSize: 20, color: "#C9922A", flexShrink: 0, marginTop: 2 },
  primeText: { margin: 0, fontSize: 14, lineHeight: 1.8, color: "rgba(232,220,190,0.9)", fontStyle: "italic" },
  ruleGroup: { marginBottom: 36 },
  ruleGroupHead: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12 },
  ruleGroupLine: { width: 28, height: 2, borderRadius: 1, flexShrink: 0 },
  ruleGroupTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.22em",
    textTransform: "uppercase", fontWeight: 700, margin: 0,
  },
  ruleCard: {
    border: "1px solid", borderRadius: 3, cursor: "pointer",
    marginBottom: 6, transition: "all 0.2s", overflow: "hidden",
  },
  ruleCardHead: { display: "flex", alignItems: "center", gap: 16, padding: "14px 18px" },
  ruleNum: {
    fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700,
    minWidth: 34, lineHeight: 1, opacity: 0.85,
  },
  ruleTitle: {
    flex: 1, fontSize: 13.5, fontWeight: 500,
    color: "rgba(225,215,195,0.95)", margin: 0,
  },
  chevron: { fontSize: 11, flexShrink: 0, transition: "transform 0.25s" },
  ruleBody: {
    padding: "14px 18px 16px 68px", fontSize: 13, lineHeight: 1.8,
    color: "rgba(200,190,170,0.72)",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  rulesFooter: {
    marginTop: 52, display: "flex", gap: 18, alignItems: "flex-start",
    padding: "24px 28px", background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(201,146,42,0.1)", borderRadius: 4,
  },
  footerGem: { fontSize: 26, flexShrink: 0 },
  footerText: { margin: 0, fontSize: 13.5, lineHeight: 1.85, color: "rgba(210,200,180,0.8)", fontStyle: "italic" },
};
