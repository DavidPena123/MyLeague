import { useRef, useState } from "react";

// Prototype only. Needs to be replaced once real authentication and database access have been implemented.
// Node.js would be good for admin validation.
const isAdmin = true;

const startingAnnouncements = [
    {
        id: 1,
        title: "Lorem Ipsum",
        message:
            "lorem ipsum dolor sit amet consectetur adipiscing elit illum quos dignissimos et in id culpa dolor cumque quod voluptas omnis in excepturi tempore labore ducimus est et consectetur in voluptate possimus mollit velit iusto atque libero dolorum nihil dignissimos mollit temporibus minus placeat irure omnis assumenda est nostrud ut libero",
        image: null,
    },
];

function Announcements() {
    const [announcements, setAnnouncements] = useState(startingAnnouncements);

    const addButtonRef = useRef(null);
    const dialogRef = useRef(null);
    const formRef = useRef(null);
    const imgRef = useRef(null);
    const titleRef = useRef(null);
    const messageRef = useRef(null);

    function openDialog() {
        if (!isAdmin) return;
        dialogRef.current.showModal();
        titleRef.current.focus();
    }

    function cancelDialog() {
        formRef.current.reset();
        imgRef.current.setCustomValidity("");
        titleRef.current.setCustomValidity("");
        messageRef.current.setCustomValidity("");
        dialogRef.current.close();
    }

    // Prototype only. Adds announcements only in the page's memory. They get deleted when the page reloads.
    function handleSubmit(event) {
        event.preventDefault();
        if (!isAdmin) return;

        const title = titleRef.current;
        const message = messageRef.current;
        title.setCustomValidity(title.value.trim() === "" ? "Please enter a title." : "");
        message.setCustomValidity(message.value.trim() === "" ? "Please enter a message." : "");

        if (!title.checkValidity() || !message.checkValidity()) return;

        const img = imgRef.current.files[0];
        const newAnnouncement = {
            id: Date.now(),
            title: title.value,
            message: message.value,
            image: img ? URL.createObjectURL(img) : null,
        };

        setAnnouncements([newAnnouncement, ...announcements]);
        formRef.current.reset();
        dialogRef.current.close();
    }

    function handleDelete(announcement) {
        if (!isAdmin) return;
        if (announcement.image) URL.revokeObjectURL(announcement.image);
        setAnnouncements(announcements.filter((item) => item.id !== announcement.id));
        addButtonRef.current.focus();
    }

    return (
        <section id="announcement-container" className="container mt-3 py-5">
            <div className="d-flex justify-content-between">
                <h2 id="news-heading" className="mb-0">
                    News and Updates
                </h2>
                <button
                    type="button"
                    name="add-announcement"
                    id="add-announcement"
                    ref={addButtonRef}
                    className="btn btn-primary rounded-circle flex-shrink-0 m-1"
                    title="Add an announcement"
                    hidden={!isAdmin}
                    disabled={!isAdmin}
                    onClick={openDialog}
                >
                    <b className="fs-3 lh-1">+</b>
                </button>
            </div>

            <p
                id="announcement-status"
                className="border rounded p-4 text-secondary bg-light"
            >
                No announcements yet. Check back for news and updates.
            </p>

            <div className="container row-lg g-4">
                <div id="announcement-list" className="row flex-lg-nowrap pb-3">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="col-lg-5 card announcement-card">
                            {announcement.image && <img src={announcement.image} alt="" />}
                            <h4 className="card-title">{announcement.title}</h4>
                            <p className="card-text">{announcement.message}</p>
                            {isAdmin && (
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm align-self-end mt-auto"
                                    aria-label={`Delete announcement: ${announcement.title}`}
                                    onClick={() => handleDelete(announcement)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <dialog
                id="announcement-dialog"
                ref={dialogRef}
                className="announcement-dialog"
                aria-labelledby="announcement-dialog-title"
            >
                <form
                    id="announcement-form"
                    ref={formRef}
                    className="p-4"
                    onSubmit={handleSubmit}
                >
                    <h2 id="announcement-dialog-title" className="h4 mb-1">
                        Add an announcement
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="announcement-img" className="form-label">
                            Upload Image
                        </label>
                        <input
                            id="announcement-img"
                            name="img"
                            ref={imgRef}
                            className="form-control"
                            type="file"
                            accept="image/*"
                            disabled={!isAdmin}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="announcement-title" className="form-label">
                            Title
                        </label>
                        <input
                            id="announcement-title"
                            name="title"
                            ref={titleRef}
                            className="form-control"
                            type="text"
                            required
                            maxLength={120}
                            placeholder=""
                            disabled={!isAdmin}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="announcement-message" className="form-label">
                            Announcement
                        </label>
                        <textarea
                            id="announcement-message"
                            name="message"
                            ref={messageRef}
                            className="form-control"
                            rows={5}
                            required
                            maxLength={2000}
                            placeholder=""
                            disabled={!isAdmin}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            id="cancel-announcement"
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={cancelDialog}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!isAdmin}>
                            Post announcement
                        </button>
                    </div>
                </form>
            </dialog>
        </section>
    );
}

export default Announcements;