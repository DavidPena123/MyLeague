function BoardMemberCard({ member }) {
    const headingId = `board-member-${member.id}`;
    const contactName = member.name || member.title;

    return (
        <article className="card board-member-card h-100" aria-labelledby={headingId}>
            <div className="card-body d-flex align-items-start gap-3 p-3 p-lg-4">
                <div className="board-member-portrait flex-shrink-0">
                    {member.photo ? (
                        <img src={member.photo} alt={member.name ? `Portrait of ${member.name}` : ""} />
                    ) : (
                        <i className="bi bi-person" aria-hidden="true"></i>
                    )}
                </div>
                <div className="board-member-info d-flex flex-column align-self-stretch">
                    <h2 id={headingId} className="h5 board-member-title mb-2">{member.title}</h2>
                    <p className={`mb-4 ${member.name ? "fw-semibold" : "text-secondary"}`}>
                        {member.name}
                    </p>
                    <ul className="board-member-contact list-unstyled d-grid gap-2 mt-auto mb-0 pt-3">
                        {member.phone && (
                            <li>
                                <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`} aria-label={`Call ${contactName}: ${member.phone}`}>
                                    <i className="bi bi-telephone me-2" aria-hidden="true"></i>
                                    {member.phone}
                                </a>
                            </li>
                        )}
                        {member.email && (
                            <li>
                                <a href={`mailto:${member.email}`} aria-label={`Email ${contactName}: ${member.email}`}>
                                    <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                                    {member.email}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </article>
    );
}

export default BoardMemberCard;
