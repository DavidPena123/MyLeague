import { useState } from "react";

// search by team/field. Cancelled games are marked as so.
// games right now are just placeholders since the backend isn't set up
const sampleGames = [
    { id: 1, dayOffset: 0, time: "17:30", field: "Field 1", division: "Majors", home: "Athletics", visitors: "Cubs", status: "Scheduled" },
    { id: 2, dayOffset: 0, time: "17:30", field: "Field 2", division: "Rookies", home: "Nationals", visitors: "Mariners", status: "Scheduled" },
    { id: 3, dayOffset: 1, time: "18:00", field: "Field 3", division: "Uppers", home: "Lady Dodgers", visitors: "Vipers", status: "Cancelled" },
];

const shortDate = { month: "short", day: "numeric" };

function getWeekStart() {
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const day = monday.getDay();
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
    return monday;
}

const weekStart = getWeekStart();

// The sample data is being turned into real dates, sorted by date then time
const games = sampleGames
    .map((game) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + game.dayOffset);
        const [hours, minutes] = game.time.split(":").map(Number);
        date.setHours(hours, minutes);
        return { ...game, date };
    })
    .sort((a, b) => a.date - b.date);

const weekEnd = new Date(weekStart);
weekEnd.setDate(weekStart.getDate() + 6);
const weekRange = `Week of ${weekStart.toLocaleDateString("en-US", shortDate)} - ${weekEnd.toLocaleDateString("en-US", shortDate)}`;

const divisions = [...new Set(games.map((game) => game.division))];

function formatDay(date) {
    return date.toLocaleDateString("en-US", { weekday: "short", ...shortDate });
}

// Text for the warning banner listing any cancelled games
const cancelled = games.filter((game) => game.status === "Cancelled");
const cancelledText = cancelled
    .map((game) => `${game.division} ${game.home} vs. ${game.visitors} at ${game.field} (${formatDay(game.date)})`)
    .join(", ");

function GamesThisWeek() {
    const [division, setDivision] = useState("");
    const [search, setSearch] = useState("");

    const searchText = search.trim().toLowerCase();
    const filtered = games.filter((game) => {
        const matchesDivision = division === "" || game.division === division;
        const matchesSearch =
            searchText === "" ||
            [game.home, game.visitors, game.field].some((text) =>
                text.toLowerCase().includes(searchText)
            );
        return matchesDivision && matchesSearch;
    });

    return (
        <section id="games-this-week" className="container py-4" aria-labelledby="games-heading">
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                <h2 id="games-heading" className="mb-0">
                    Games this Week
                </h2>
                <p id="games-week-range" className="text-secondary mb-0">
                    {weekRange}
                </p>
            </div>

            <p className="small mb-0">
                <i className="bi bi-telephone" aria-hidden="true"></i>
                {/* If the field is closed */}
                Game status: Our Fields Hotline <a href="tel:12098316350">(209) 831-6350</a>
            </p>

            {cancelled.length > 0 && (
                <div id="cancel-alert" className="alert alert-warning py-2" role="status">
                    <i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> <strong>Cancelled:</strong> {cancelledText}
                </div>
            )}

            {/* the filters for the games this week table */}
            <div className="row g-2 mb-3">
                <div className="col-12 col-md-4">
                    <label htmlFor="games-division" className="form-label visually-hidden">
                        Division
                    </label>
                    <select
                        id="games-division"
                        className="form-select"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                    >
                        <option value="">All Divisions</option>
                        {divisions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-8">
                    <label htmlFor="games-search" className="form-label visually-hidden">
                        Search games
                    </label>
                    <input
                        id="games-search"
                        type="search"
                        className="form-control"
                        placeholder="Search by team or field"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped align-middle games-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Field</th>
                            <th scope="col">Division</th>
                            <th scope="col">Home</th>
                            <th scope="col">Visitors</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody id="games-body">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-secondary py-4 games-empty">
                                    No games match your filters.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((game) => (
                                <tr key={game.id} className={game.status === "Cancelled" ? "game-cancelled" : undefined}>
                                    <td data-label="Date">{formatDay(game.date)}</td>
                                    <td data-label="Time">
                                        {game.date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                                    </td>
                                    <td data-label="Field">{game.field}</td>
                                    <td data-label="Division">{game.division}</td>
                                    <td data-label="Home">{game.home}</td>
                                    <td data-label="Visitors">{game.visitors}</td>
                                    <td data-label="Status">
                                        <span
                                            className={"badge " + (game.status === "Cancelled" ? "text-bg-danger" : "text-bg-success")}
                                        >
                                            {game.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default GamesThisWeek;