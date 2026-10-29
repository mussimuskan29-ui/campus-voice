// ==================================================
// CAMPUS VOICE
// Day 2 - Development Day
// ==================================================


// ==================================================
// 1. INITIAL DATA
// ==================================================

const initialNotices = [

    {
        id: 4,

        title:
            "Ahlya Technologies On-Campus Placement Drive",

        category:
            "Placements",

        description:
            "Ahlya Technologies is conducting an on-campus evaluation for final year students.",

        author:
            "GEC Training & Placement Cell",

        date:
            "Sep 28, 2026",

        upvotes:
            64
    },


    {
        id: 3,

        title:
            "Government Engineering college Hassan camous voice",

        category:
            "Exams",

        description:
            "The practical examination timetable and laboratory batch details have been released.",

        author:
            "Department of Computer Applications",

        date:
            "Oct 8, 2026",

        upvotes:
            31
    },


    {
        id: 2,

        title:
            "Web Innovation Prototype Challenge",

        category:
            "Hackathons",

        description:
            "Student squads can register for the web prototype innovation challenge.",

        author:
            "Student Innovation Club",

        date:
            "Sep 26, 2026",

        upvotes:
            49
    },


    {
        id: 1,

        title:
            "Annual Cultural Fest 2026",

        category:
            "Cultural",

        description:
            "Registrations are open for music, dance and cultural events.",

        author:
            "Student Welfare Committee",

        date:
            "Sep 25, 2026",

        upvotes:
            18
    }

];



// ==================================================
// 2. LOAD DATA FROM LOCALSTORAGE
// ==================================================

// Try to get previously stored notices

const storedNotices =
    localStorage.getItem("campusNotices");


// Application state

let notices;


if (storedNotices) {

    // Convert JSON string back into JavaScript data

    notices =
        JSON.parse(storedNotices);

}
else {

    // First-time user
    // Use our initial demo data

    notices =
        initialNotices;

}



// ==================================================
// 3. APPLICATION STATE
// ==================================================

let currentFilter =
    "All";


let searchText =
    "";


let currentSort =
    "latest";



// ==================================================
// 4. DOM REFERENCES
// ==================================================


// Cards

const cardsGrid =
    document.getElementById("cardsGrid");


// Empty state

const emptyState =
    document.getElementById("emptyState");


// Search

const searchInput =
    document.getElementById("searchInput");


const clearSearchBtn =
    document.getElementById("clearSearchBtn");


// Filters

const filterContainer =
    document.getElementById("filterContainer");


const filterButtons =
    document.querySelectorAll(".filter-pill");


// Sort

const sortSelect =
    document.getElementById("sortSelect");


// Statistics

const totalCount =
    document.getElementById("totalCount");


const trendingCount =
    document.getElementById("trendingCount");


// Modal

const openModalBtn =
    document.getElementById("openModalBtn");


const closeModalBtn =
    document.getElementById("closeModalBtn");


const cancelModalBtn =
    document.getElementById("cancelModalBtn");


const noticeModal =
    document.getElementById("noticeModal");


// Form

const noticeForm =
    document.getElementById("noticeForm");


const noticeDescription =
    document.getElementById("noticeDescription");


const characterCount =
    document.getElementById("characterCount");


// Toast

const toast =
    document.getElementById("toast");


const toastMessage =
    document.getElementById("toastMessage");



// ==================================================
// 5. CATEGORY STYLE FUNCTION
// ==================================================

function getCategoryStyle(category) {

    if (category === "Placements") {

        return "bg-emerald-50 text-emerald-700 border-emerald-200";

    }


    if (category === "Exams") {

        return "bg-rose-50 text-rose-700 border-rose-200";

    }


    if (category === "Hackathons") {

        return "bg-indigo-50 text-indigo-700 border-indigo-200";

    }


    if (category === "Cultural") {

        return "bg-amber-50 text-amber-700 border-amber-200";

    }


    return "bg-slate-100 text-slate-700 border-slate-200";

}



// ==================================================
// 6. MAIN RENDER FUNCTION
// ==================================================

function renderNotices() {


    // ----------------------------------------------
    // Start with a copy of all notices
    // ----------------------------------------------

    let filteredNotices =
        [...notices];



    // ----------------------------------------------
    // CATEGORY FILTER
    // ----------------------------------------------

    if (currentFilter !== "All") {

        filteredNotices =
            filteredNotices.filter(
                function (notice) {

                    return (
                        notice.category
                        ===
                        currentFilter
                    );

                }
            );

    }



    // ----------------------------------------------
    // SEARCH FILTER
    // ----------------------------------------------

    if (searchText !== "") {

        filteredNotices =
            filteredNotices.filter(
                function (notice) {


                    const search =
                        searchText.toLowerCase();


                    const titleMatch =
                        notice.title
                            .toLowerCase()
                            .includes(search);


                    const descriptionMatch =
                        notice.description
                            .toLowerCase()
                            .includes(search);


                    const authorMatch =
                        notice.author
                            .toLowerCase()
                            .includes(search);


                    return (
                        titleMatch
                        ||
                        descriptionMatch
                        ||
                        authorMatch
                    );

                }
            );

    }



    // ----------------------------------------------
    // SORTING
    // ----------------------------------------------

    if (currentSort === "upvotes") {

        filteredNotices.sort(
            function (a, b) {

                return (
                    b.upvotes
                    -
                    a.upvotes
                );

            }
        );

    }
    else {

        // Latest first

        filteredNotices.sort(
            function (a, b) {

                return (
                    b.id
                    -
                    a.id
                );

            }
        );

    }



    // ----------------------------------------------
    // UPDATE STATISTICS
    // ----------------------------------------------

    totalCount.textContent =
        notices.length;



    const trendingNotices =
        notices.filter(
            function (notice) {

                return (
                    notice.upvotes >= 30
                );

            }
        );


    trendingCount.textContent =
        trendingNotices.length;



    // ----------------------------------------------
    // EMPTY STATE
    // ----------------------------------------------

    if (filteredNotices.length === 0) {

        cardsGrid.innerHTML =
            "";


        emptyState.classList.remove(
            "hidden"
        );


        return;

    }


    emptyState.classList.add(
        "hidden"
    );



    // ----------------------------------------------
    // CREATE HTML CARDS USING MAP
    // ----------------------------------------------

    const cards =
        filteredNotices.map(
            function (notice) {


                const categoryStyle =
                    getCategoryStyle(
                        notice.category
                    );


                // Business rule:
                // 30+ upvotes = Trending

                let trendingBadge =
                    "";


                if (notice.upvotes >= 30) {

                    trendingBadge = `
                        <span
                            class="
                                text-[10px]
                                font-bold
                                bg-orange-50
                                text-orange-600
                                border
                                border-orange-200
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            TRENDING
                        </span>
                    `;

                }



                return `

                    <article
                        class="
                            notice-card
                            bg-white
                            border
                            border-slate-200
                            rounded-2xl
                            p-5
                            shadow-sm
                        "
                    >


                        <!-- Category + Trending -->

                        <div
                            class="
                                flex
                                items-center
                                justify-between
                                gap-2
                                mb-3
                            "
                        >

                            <div
                                class="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    class="
                                        text-xs
                                        font-bold
                                        px-2.5
                                        py-1
                                        rounded-lg
                                        border
                                        ${categoryStyle}
                                    "
                                >
                                    ${notice.category}
                                </span>


                                ${trendingBadge}

                            </div>


                            <span
                                class="
                                    text-xs
                                    text-slate-400
                                "
                            >
                                ${notice.date}
                            </span>

                        </div>



                        <!-- Title -->

                        <h3
                            class="
                                text-lg
                                font-bold
                                text-slate-900
                                leading-snug
                            "
                        >
                            ${notice.title}
                        </h3>



                        <!-- Description -->

                        <p
                            class="
                                text-sm
                                text-slate-600
                                mt-2
                                leading-relaxed
                            "
                        >
                            ${notice.description}
                        </p>



                        <!-- Author -->

                        <p
                            class="
                                text-xs
                                text-slate-400
                                mt-4
                            "
                        >
                            ${notice.author}
                        </p>



                        <!-- Bottom Actions -->

                        <div
                            class="
                                flex
                                justify-between
                                items-center
                                mt-4
                                pt-4
                                border-t
                            "
                        >


                            <button
                                onclick="upvoteNotice(${notice.id})"

                                class="
                                    bg-slate-100
                                    hover:bg-indigo-50
                                    text-slate-700
                                    hover:text-brand-600
                                    font-semibold
                                    text-sm
                                    px-3
                                    py-2
                                    rounded-xl
                                    transition
                                "
                            >
                                ↑ Upvote
                                <span
                                    class="
                                        ml-1
                                        font-bold
                                    "
                                >
                                    ${notice.upvotes}
                                </span>
                            </button>


                            <span
                                class="
                                    text-xs
                                    text-slate-400
                                "
                            >
                                ID: ${notice.id}
                            </span>


                        </div>

                    </article>

                `;

            }
        );



    // ----------------------------------------------
    // PLACE GENERATED CARDS INTO HTML
    // ----------------------------------------------

    cardsGrid.innerHTML =
        cards.join("");

}



// ==================================================
// 7. CATEGORY FILTER EVENT
// ==================================================

filterContainer.addEventListener(
    "click",
    function (event) {


        // Only continue if a filter button was clicked

        if (
            event.target
                .classList
                .contains("filter-pill")
        ) {


            // Remove active style from every button

            filterButtons.forEach(
                function (button) {

                    button
                        .classList
                        .remove(
                            "active-pill"
                        );

                }
            );


            // Add active style to clicked button

            event.target
                .classList
                .add(
                    "active-pill"
                );


            // Read category from data-category

            currentFilter =
                event.target
                    .dataset
                    .category;


            // Update UI

            renderNotices();

        }

    }
);



// ==================================================
// 8. SEARCH EVENT
// ==================================================

searchInput.addEventListener(
    "input",
    function (event) {


        searchText =
            event.target.value.trim();


        renderNotices();

    }
);



// ==================================================
// 9. CLEAR SEARCH
// ==================================================

clearSearchBtn.addEventListener(
    "click",
    function () {


        // Clear UI input

        searchInput.value =
            "";


        // Clear application state

        searchText =
            "";


        renderNotices();

    }
);



// ==================================================
// 10. SORT EVENT
// ==================================================

sortSelect.addEventListener(
    "change",
    function (event) {


        currentSort =
            event.target.value;


        renderNotices();

    }
);



// ==================================================
// 11. OPEN MODAL
// ==================================================

function openModal() {

    noticeModal
        .classList
        .remove(
            "hidden"
        );


    noticeModal
        .classList
        .add(
            "flex"
        );

}



// ==================================================
// 12. CLOSE MODAL
// ==================================================

function closeModal() {

    noticeModal
        .classList
        .add(
            "hidden"
        );


    noticeModal
        .classList
        .remove(
            "flex"
        );

}



// ==================================================
// 13. MODAL BUTTON EVENTS
// ==================================================

openModalBtn.addEventListener(
    "click",
    openModal
);


closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelModalBtn.addEventListener(
    "click",
    closeModal
);



// ==================================================
// 14. CHARACTER COUNTER
// ==================================================

noticeDescription.addEventListener(
    "input",
    function (event) {


        const length =
            event.target.value.length;


        characterCount.textContent =
            length + " / 250";

    }
);



// ==================================================
// 15. CREATE NEW NOTICE
// ==================================================

noticeForm.addEventListener(
    "submit",
    function (event) {


        // Prevent normal form refresh

        event.preventDefault();



        // Get form values

        const title =
            document
                .getElementById(
                    "noticeTitle"
                )
                .value
                .trim();



        const category =
            document
                .getElementById(
                    "noticeCategory"
                )
                .value;



        const author =
            document
                .getElementById(
                    "noticeAuthor"
                )
                .value
                .trim();



        const description =
            document
                .getElementById(
                    "noticeDescription"
                )
                .value
                .trim();



        // Basic validation

        if (
            title === ""
            ||
            author === ""
            ||
            description === ""
        ) {

            showToast(
                "Please complete all fields."
            );


            return;

        }



        // Create new JavaScript object

        const newNotice = {

            id:
                Date.now(),

            title:
                title,

            category:
                category,

            description:
                description,

            author:
                author,

            date:
                new Date()
                    .toLocaleDateString(
                        "en-US",
                        {
                            month:
                                "short",

                            day:
                                "numeric",

                            year:
                                "numeric"
                        }
                    ),

            upvotes:
                0

        };



        // Add notice to beginning of array

        notices.unshift(
            newNotice
        );



        // Save to browser

        saveNotices();



        // Update UI

        renderNotices();



        // Clear form

        noticeForm.reset();


        characterCount.textContent =
            "0 / 250";



        // Close modal

        closeModal();



        // User feedback

        showToast(
            "Announcement published successfully!"
        );

    }
);



// ==================================================
// 16. UPVOTE FEATURE
// ==================================================

function upvoteNotice(id) {


    // Find exact notice

    const selectedNotice =
        notices.find(
            function (notice) {

                return (
                    notice.id === id
                );

            }
        );



    if (!selectedNotice) {

        return;

    }



    // Increase upvote count

    selectedNotice.upvotes =
        selectedNotice.upvotes + 1;



    // Persist updated data

    saveNotices();



    // Update UI

    renderNotices();



    // Feedback

    showToast(
        "Upvote recorded!"
    );

}



// ==================================================
// 17. SAVE TO LOCALSTORAGE
// ==================================================

function saveNotices() {


    const noticeJSON =
        JSON.stringify(
            notices
        );


    localStorage.setItem(
        "campusNotices",
        noticeJSON
    );

}



// ==================================================
// 18. TOAST MESSAGE
// ==================================================

function showToast(message) {


    toastMessage.textContent =
        message;


    toast.classList.remove(
        "hidden"
    );



    setTimeout(
        function () {

            toast.classList.add(
                "hidden"
            );

        },

        2500
    );

}



// ==================================================
// 19. INITIAL APPLICATION LOAD
// ==================================================

console.log(
    "Campus Voice JavaScript Connected"
);


renderNotices()