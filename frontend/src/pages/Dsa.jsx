import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import api from "../api/axios";
import toast from "react-hot-toast";
import { dsaPatterns } from "../data/DsaProblems";
import "./Dsa.css";

// ── DIFFICULTY BADGE ─────────────────────────────────────
function DiffBadge({ level }) {
  const map = {
    Easy:   { bg: "rgba(74,222,128,0.12)",  color: "#4ade80", border: "rgba(74,222,128,0.25)" },
    Medium: { bg: "rgba(250,204,21,0.12)",  color: "#facc15", border: "rgba(250,204,21,0.25)" },
    Hard:   { bg: "rgba(248,113,113,0.12)", color: "#f87171", border: "rgba(248,113,113,0.25)" },
  };
  const s = map[level] || map.Medium;
  return (
    <span className="diff-badge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {level}
    </span>
  );
}

// ── SMALL CIRCULAR PROGRESS ───────────────────────────────
// SVG circle that fills based on percentage
// radius=18, circumference = 2*π*18 ≈ 113
function CircleProgress({ pct }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      {/* grey track */}
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
      {/* orange fill — strokeDashoffset controls how much is filled */}
      <circle
        cx="22" cy="22" r={r}
        fill="none"
        stroke="#f97316"
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={fill}
        strokeLinecap="round"
        // rotate so fill starts from top not right
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      {/* percentage text in center */}
      <text x="22" y="26" textAnchor="middle" fontSize="9" fill="#e6edf3" fontWeight="600">
        {pct}%
      </text>
    </svg>
  );
}

// ── PATTERN CARD ──────────────────────────────────────────
// one card per DSA pattern in the grid
function PatternCard({ pattern, completedProblems, isActive, onClick }) {
  const done = pattern.problems.filter(p => completedProblems.includes(p.id)).length;
  const total = pattern.problems.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div
      className={`pattern-card ${isActive ? "pattern-card--active" : ""}`}
      onClick={onClick}
    >
      <div className="pc-top">
        <span className="pc-icon">{pattern.icon}</span>
        <CircleProgress pct={pct} />
      </div>
      <p className="pc-name">{pattern.name}</p>
      <p className="pc-count">{done} / {total} solved</p>
    </div>
  );
}

// ── PROBLEM ROW ───────────────────────────────────────────
function ProblemRow({ problem, index, isDone, note, onToggle, onSaveNote }) {
  const [noteText, setNoteText] = useState(note);
  const [editing, setEditing] = useState(false);

  useEffect(() => { setNoteText(note); }, [note]);

  const handleSave = () => {
    onSaveNote(problem.id, noteText);
    setEditing(false);
  };

  return (
    <div className={`problem-row ${isDone ? "problem-row--done" : ""}`}>
      <span className="pr-check">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(problem.id)}
          className="problem-checkbox"
        />
      </span>
      <span className="pr-num">{index}</span>
      <span className="pr-name" style={{
        textDecoration: isDone ? "line-through" : "none",
        opacity: isDone ? 0.45 : 1
      }}>
        {problem.name}
      </span>
      <span className="pr-diff"><DiffBadge level={problem.difficulty} /></span>
      <span className="pr-link">
        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="lc-link">
          LeetCode ↗
        </a>
      </span>
      <span className="pr-note">
        {editing ? (
          <div className="note-edit">
            <input
              className="note-input"
              type="text"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add note..."
              autoFocus
              onKeyDown={e => e.key === "Enter" && handleSave()}
            />
            <button className="note-save" onClick={handleSave}>Save</button>
            <button className="note-cancel" onClick={() => { setEditing(false); setNoteText(note); }}>✕</button>
          </div>
        ) : (
          <div className="note-view" onClick={() => setEditing(true)}>
            {noteText
              ? <span className="note-text">{noteText}</span>
              : <span className="note-empty">+ note</span>
            }
          </div>
        )}
      </span>
    </div>
  );
}

// ── PROBLEMS PANEL ────────────────────────────────────────
// expanded panel that shows when a card is selected
function ProblemsPanel({ pattern, completedProblems, notes, onToggle, onSaveNote }) {
  const done = pattern.problems.filter(p => completedProblems.includes(p.id)).length;
  const total = pattern.problems.length;

  return (
    <div className="problems-panel">
      {/* panel header */}
      <div className="panel-header">
        <span className="panel-icon">{pattern.icon}</span>
        <div>
          <p className="panel-title">{pattern.name}</p>
          <p className="panel-sub">{done} of {total} problems solved</p>
        </div>
        {/* pattern progress bar */}
        <div className="panel-prog">
          <div className="panel-prog-track">
            <div className="panel-prog-fill" style={{ width: `${Math.round((done/total)*100)}%` }} />
          </div>
        </div>
      </div>

      {/* table header */}
      <div className="prob-table-header">
        <span className="pth-check" />
        <span className="pth-num">#</span>
        <span className="pth-name">Problem</span>
        <span className="pth-diff">Difficulty</span>
        <span className="pth-link">Link</span>
        <span className="pth-note">Notes</span>
      </div>

      {/* problem rows */}
      {pattern.problems.map((problem, idx) => (
        <ProblemRow
          key={problem.id}
          problem={problem}
          index={idx + 1}
          isDone={completedProblems.includes(problem.id)}
          note={notes[problem.id] || ""}
          onToggle={onToggle}
          onSaveNote={onSaveNote}
        />
      ))}
    </div>
  );
}

// ── NOTES TAB ─────────────────────────────────────────────
// shows all saved notes across all problems in one place
// this is the unique feature TUF doesn't have
function AllNotes({ notes, completedProblems }) {
  // collect all problems that have notes
  const allNotedProblems = [];
  dsaPatterns.forEach(pattern => {
    pattern.problems.forEach(problem => {
      if (notes[problem.id]) {
        allNotedProblems.push({
          ...problem,
          patternName: pattern.name,
          patternIcon: pattern.icon,
          note: notes[problem.id],
          isDone: completedProblems.includes(problem.id),
        });
      }
    });
  });

  if (allNotedProblems.length === 0) {
    return (
      <div className="notes-empty">
        <p>No notes yet.</p>
        <p>Click "+ note" next to any problem to add one.</p>
      </div>
    );
  }

  return (
    <div className="all-notes">
      {allNotedProblems.map(p => (
        <div key={p.id} className="note-card">
          <div className="note-card-top">
            <span className="note-card-pattern">{p.patternIcon} {p.patternName}</span>
            {p.isDone && <span className="note-card-done">✓ Solved</span>}
          </div>
          <p className="note-card-problem">{p.name}</p>
          <p className="note-card-text">"{p.note}"</p>
        </div>
      ))}
    </div>
  );
}

// ── MAIN DSA PAGE ─────────────────────────────────────────
function DSA() {
  const [completedProblems, setCompletedProblems] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [activePattern, setActivePattern] = useState(null);
  // tab: "tracker" | "notes"
  const [tab, setTab] = useState("tracker");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/dsa/progress");
        setCompletedProblems(res.data.completedProblems);
        setNotes(res.data.notes);
      } catch {
        toast.error("Failed to load DSA progress");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleToggle = async (problemId) => {
    const alreadyDone = completedProblems.includes(problemId);
    setCompletedProblems(prev =>
      alreadyDone ? prev.filter(id => id !== problemId) : [...prev, problemId]
    );
    try {
      const res = await api.post("/dsa/toggle", { problemId });
      setCompletedProblems(res.data.completedProblems);
    } catch {
      toast.error("Failed to save");
      setCompletedProblems(prev =>
        alreadyDone ? [...prev, problemId] : prev.filter(id => id !== problemId)
      );
    }
  };

  const handleSaveNote = async (problemId, note) => {
    try {
      await api.post("/dsa/note", { problemId, note });
      setNotes(prev => ({ ...prev, [problemId]: note }));
      toast.success("Note saved");
    } catch {
      toast.error("Failed to save note");
    }
  };

  const handleCardClick = (patternId) => {
    // clicking the same card again closes it
    setActivePattern(prev => prev === patternId ? null : patternId);
  };

  if (loading) return <Sidebar><Spinner /></Sidebar>;

  const totalProblems = dsaPatterns.reduce((s, p) => s + p.problems.length, 0);
  const totalDone = completedProblems.length;
  const overallPct = totalProblems > 0 ? Math.round((totalDone / totalProblems) * 100) : 0;

  const activePatternData = dsaPatterns.find(p => p.id === activePattern);

  // find which row the active card is in (4 per row)
  // so we can insert the panel after that row
  const cardIndex = dsaPatterns.findIndex(p => p.id === activePattern);
  const panelAfterRow = cardIndex >= 0 ? Math.floor(cardIndex / 4) : -1;

  return (
    <Sidebar>
      {/* ── HEADER ── */}
      <div className="page-header">
        <h1 className="page-title">DSA Tracker</h1>
        <p className="page-sub">Click a pattern to see problems</p>
      </div>

      {/* ── OVERALL BAR ── */}
      <div className="overall-bar-card">
        <div className="ob-info">
          <span className="ob-label">Overall Progress</span>
          <span className="ob-count">
            <span className="ob-done">{totalDone}</span>
            <span className="ob-total"> / {totalProblems}</span>
          </span>
        </div>
        <div className="ob-track">
          <div className="ob-fill" style={{ width: `${overallPct}%` }} />
        </div>
        <span className="ob-pct">{overallPct}%</span>
      </div>

      {/* ── TABS ── */}
      <div className="tabs">
        <button
          className={`tab-btn ${tab === "tracker" ? "tab-btn--active" : ""}`}
          onClick={() => setTab("tracker")}
        >
          📋 Tracker
        </button>
        <button
          className={`tab-btn ${tab === "notes" ? "tab-btn--active" : ""}`}
          onClick={() => setTab("notes")}
        >
          📝 My Notes
          {Object.keys(notes).length > 0 && (
            <span className="notes-badge">{Object.keys(notes).length}</span>
          )}
        </button>
      </div>

      {/* ── TRACKER TAB ── */}
      {tab === "tracker" && (
        <div className="tracker-content">
          {/* card grid — 4 per row */}
          {/* we render cards in groups of 4 rows,
              inserting the problems panel after the active row */}
          {Array.from({ length: Math.ceil(dsaPatterns.length / 4) }, (_, rowIdx) => {
            const rowPatterns = dsaPatterns.slice(rowIdx * 4, rowIdx * 4 + 4);
            return (
              <div key={rowIdx}>
                {/* row of 4 cards */}
                <div className="pattern-grid">
                  {rowPatterns.map(pattern => (
                    <PatternCard
                      key={pattern.id}
                      pattern={pattern}
                      completedProblems={completedProblems}
                      isActive={activePattern === pattern.id}
                      onClick={() => handleCardClick(pattern.id)}
                    />
                  ))}
                </div>

                {/* insert panel after this row if active card is in this row */}
                {panelAfterRow === rowIdx && activePatternData && (
                  <ProblemsPanel
                    pattern={activePatternData}
                    completedProblems={completedProblems}
                    notes={notes}
                    onToggle={handleToggle}
                    onSaveNote={handleSaveNote}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── NOTES TAB ── */}
      {tab === "notes" && (
        <AllNotes notes={notes} completedProblems={completedProblems} />
      )}
    </Sidebar>
  );
}

export default DSA;
