import "./StreakCalendar.css";

function StreakCalendar({ loggedDays }) {
  const today = new Date();
  const currentDay   = today.getDate();         
  const currentMonth = today.getMonth();          
  const currentYear  = today.getFullYear();       
  const monthName = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  let streak = 0;
  for (let day = currentDay; day >= 1; day--) {
    if (loggedDays.includes(day)) {
      streak = streak + 1;
    } else {
      break; 
    }
  }

  const allDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    allDays.push(i);
  }

  const emptySlots = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    emptySlots.push(i);
  }

  return (
    <div className="streak-card">
      <div className="sc-header">
        <div>
          <p className="sc-month">{monthName} {currentYear}</p>
          <p className="sc-sub">Daily activity</p>
        </div>
        <div className="sc-streak">
          <span className="sc-streak-num">{streak}</span>
          <span className="sc-streak-label">day streak</span>
        </div>
      </div>

      <div className="sc-dow-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <span key={dayName} className="sc-dow">{dayName}</span>
        ))}
      </div>

      <div className="sc-grid">
        {emptySlots.map((i) => (
          <div key={"empty-" + i} className="sc-cell sc-cell--empty" />
        ))}
        {allDays.map((day) => {
          const isLogged = loggedDays.includes(day);
          const isToday  = day === currentDay;
          const isFuture = day > currentDay;
          let cssClass = "sc-cell";

          if (isFuture) {
            cssClass = cssClass + " sc-cell--future";   
          } else if (isLogged) {
            cssClass = cssClass + " sc-cell--logged";   
          } else {
            cssClass = cssClass + " sc-cell--missed";   
          }

          if (isToday) {
            cssClass = cssClass + " sc-cell--today";   
          }

          return (
            <div key={day} className={cssClass} title={monthName + " " + day} />
          );
        })}

      </div>
      <div className="sc-legend">
        <span className="sc-legend-item">
          <span className="sc-swatch sc-swatch--missed" /> No log
        </span>
        <span className="sc-legend-item">
          <span className="sc-swatch sc-swatch--logged" /> Logged
        </span>
        <span className="sc-legend-item">
          <span className="sc-swatch sc-swatch--today" /> Today
        </span>
      </div>

    </div>
  );
}

export default StreakCalendar;