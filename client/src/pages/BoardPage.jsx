import BoardMemberCard from "../components/BoardMemberCard.jsx";
import boardMembers from "../data/boardMembers.js";

function BoardPage() {
    return (
        <section id="board" className="board-page container py-5" aria-labelledby="board-heading">
            <header className="board-header mb-4 mb-lg-5">
                <p className="board-eyebrow mb-2">Tracy Babe Ruth</p>
                <h1 id="board-heading" className="display-5 fw-bold mb-3">Board of Directors</h1>
                <p className="lead mb-3">
                    Meet the volunteers who support our league, our players, and our families.
                </p>
            </header>

            <ul id="board-list" className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 list-unstyled mb-0 justify-content-center">
                {boardMembers.map((member) => (
                    <li key={member.id} className="col">
                        <BoardMemberCard member={member} />
                    </li>
                ))}
            </ul>
            
        </section>
    );
}

export default BoardPage;
