document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BIẾN CHUNG
    ===================================================== */

    const foodForm = document.getElementById("foodForm");

    const foodContainer =
        document.getElementById("foodContainer");

    const searchInput =
        document.getElementById("searchInput");


    /* =====================================================
       HÀM LẤY DANH SÁCH MÓN
    ===================================================== */

    function getFoods() {

        return JSON.parse(
            localStorage.getItem("foods")
        ) || [];
    }


    /* =====================================================
       HÀM LƯU DANH SÁCH MÓN
    ===================================================== */

    function saveFoods(foods) {

        localStorage.setItem(
            "foods",
            JSON.stringify(foods)
        );
    }


    /* =====================================================
       POPUP THÔNG BÁO THÀNH CÔNG
    ===================================================== */

    function showSuccessMessage(
        titleText,
        descriptionText
    ) {

        let successMessage =
            document.getElementById(
                "successMessage"
            );


        if (!successMessage) {

            successMessage =
                document.createElement("div");

            successMessage.id =
                "successMessage";

            successMessage.className =
                "success-message";

            successMessage.innerHTML = `
                <div class="success-icon">
                    ✓
                </div>

                <h2></h2>

                <p></p>
            `;

            document.body.appendChild(
                successMessage
            );
        }


        successMessage.querySelector(
            "h2"
        ).textContent = titleText;


        successMessage.querySelector(
            "p"
        ).textContent = descriptionText;


        successMessage.classList.add(
            "show"
        );


        setTimeout(function () {

            window.location.href =
                "menu.html";

        }, 1500);
    }


    /* =====================================================
       FORM THÊM / SỬA MÓN
    ===================================================== */

    if (foodForm) {

        const submitButton =
            document.querySelector(
                ".submit-food-button"
            );


        const editingFoodId =
            localStorage.getItem(
                "editingFoodId"
            );


        /* =================================================
           NẾU ĐANG SỬA
        ================================================= */

        if (editingFoodId) {

            const foods = getFoods();


            const food =
                foods.find(function (item) {

                    return String(item.id) ===
                        String(editingFoodId);

                });


            if (food) {

                const foodName =
                    document.getElementById(
                        "foodName"
                    );

                const foodDescription =
                    document.getElementById(
                        "foodDescription"
                    );

                const foodCategory =
                    document.getElementById(
                        "foodCategory"
                    );

                const restaurantName =
                    document.getElementById(
                        "restaurantName"
                    );

                const restaurantMap =
                    document.getElementById(
                        "restaurantMap"
                    );


                if (foodName) {
                    foodName.value =
                        food.name || "";
                }


                if (foodDescription) {
                    foodDescription.value =
                        food.description || "";
                }


                if (foodCategory) {
                    foodCategory.value =
                        food.category || "";
                }


                if (restaurantName) {
                    restaurantName.value =
                        food.restaurant || "";
                }


                if (restaurantMap) {
                    restaurantMap.value =
                        food.map || "";
                }


                const title =
                    document.querySelector(
                        ".add-header h1"
                    );


                const subtitle =
                    document.querySelector(
                        ".add-header p"
                    );


                if (title) {
                    title.textContent =
                        "Sửa món ăn";
                }


                if (subtitle) {
                    subtitle.textContent =
                        "Cập nhật thông tin món ăn";
                }


                if (submitButton) {
                    submitButton.textContent =
                        "CẬP NHẬT MÓN";
                }

            }
        }


        /* =================================================
           SUBMIT FORM
        ================================================= */

        foodForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const foodName =
                    document.getElementById(
                        "foodName"
                    ).value.trim();


                const foodDescription =
                    document.getElementById(
                        "foodDescription"
                    ).value.trim();


                const foodCategory =
                    document.getElementById(
                        "foodCategory"
                    ).value;


                const restaurantName =
                    document.getElementById(
                        "restaurantName"
                    ).value.trim();


                const restaurantMap =
                    document.getElementById(
                        "restaurantMap"
                    ).value.trim();


                let foods = getFoods();


                /* =========================================
                   ĐANG SỬA MÓN
                ========================================= */

                const currentEditingId =
                    localStorage.getItem(
                        "editingFoodId"
                    );


                if (currentEditingId) {

                    const index =
                        foods.findIndex(
                            function (item) {

                                return String(item.id) ===
                                    String(currentEditingId);

                            }
                        );


                    if (index !== -1) {

                        foods[index].name =
                            foodName;

                        foods[index].description =
                            foodDescription;

                        foods[index].category =
                            foodCategory;

                        foods[index].restaurant =
                            restaurantName;

                        foods[index].map =
                            restaurantMap;


                        saveFoods(foods);


                        localStorage.removeItem(
                            "editingFoodId"
                        );


                        showSuccessMessage(
                            "Cập nhật thành công!",
                            "Thông tin món ăn đã được cập nhật."
                        );

                        return;
                    }
                }


                /* =========================================
                   THÊM MÓN MỚI
                ========================================= */

                const newFood = {

                    id: Date.now(),

                    name:
                        foodName,

                    description:
                        foodDescription,

                    category:
                        foodCategory,

                    restaurant:
                        restaurantName,

                    map:
                        restaurantMap
                };


                foods.push(
                    newFood
                );


                saveFoods(
                    foods
                );


                showSuccessMessage(
                    "Thêm món thành công!",
                    "Món ăn đã được thêm vào menu."
                );

            }
        );

    }


    /* =====================================================
       NẾU KHÔNG PHẢI MENU.HTML
       DỪNG PHẦN MENU
    ===================================================== */

    if (!foodContainer) {
        return;
    }


    /* =====================================================
       HIỂN THỊ MÓN
    ===================================================== */

    displaySavedFoods();


    /* =====================================================
       TÌM KIẾM
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterFoods
        );

    }


    /* =====================================================
       DANH MỤC
    ===================================================== */

    const categoryButtons =
        document.querySelectorAll(
            ".category"
        );


    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    categoryButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    filterFoods();

                }
            );

        }
    );


    /* =====================================================
       TẠO CỤM 3 NÚT CHỨC NĂNG
    ===================================================== */

    createActionButtons();


    /* =====================================================
       TẠO 3 NÚT
    ===================================================== */

    function createActionButtons() {

        /*
         * Nếu HTML đã có nút thì không tạo lại
         */

        if (
            document.getElementById(
                "actionButtons"
            )
        ) {
            return;
        }


        const actionButtons =
            document.createElement("div");


        actionButtons.id =
            "actionButtons";

        actionButtons.className =
            "action-buttons";


        /* =============================================
           NÚT THÊM
        ============================================= */

        const addButton =
            document.createElement("button");


        addButton.type =
            "button";

        addButton.className =
            "action-button add-action";

        addButton.innerHTML = `
            <span class="action-icon">＋</span>
            <span class="action-label">
                Thêm món
            </span>
        `;


        addButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "editingFoodId"
                );


                window.location.href =
                    "add-food.html";

            }
        );


        /* =============================================
           NÚT SỬA
        ============================================= */

        const editButton =
            document.createElement("button");


        editButton.type =
            "button";

        editButton.className =
            "action-button edit-action";

        editButton.innerHTML = `
            <span class="action-icon">✎</span>
            <span class="action-label">
                Sửa món
            </span>
        `;


        editButton.addEventListener(
            "click",
            function () {

                showFoodSelector(
                    "edit"
                );

            }
        );


        /* =============================================
           NÚT XÓA
        ============================================= */

        const deleteButton =
            document.createElement("button");


        deleteButton.type =
            "button";

        deleteButton.className =
            "action-button delete-action";

        deleteButton.innerHTML = `
            <span class="action-icon">🗑</span>
            <span class="action-label">
                Xóa món
            </span>
        `;


        deleteButton.addEventListener(
            "click",
            function () {

                showFoodSelector(
                    "delete"
                );

            }
        );


        /* =============================================
           GHÉP 3 NÚT
        ============================================= */

        actionButtons.appendChild(
            addButton
        );

        actionButtons.appendChild(
            editButton
        );

        actionButtons.appendChild(
            deleteButton
        );


        document.body.appendChild(
            actionButtons
        );
    }


    /* =====================================================
       HIỂN THỊ DANH SÁCH CHỌN MÓN
    ===================================================== */

    function showFoodSelector(
        mode
    ) {

        const foods =
            getFoods();


        if (foods.length === 0) {

            showEmptyMessage();

            return;
        }


        /*
         * Xóa popup cũ nếu có
         */

        const oldModal =
            document.getElementById(
                "foodSelectorModal"
            );


        if (oldModal) {
            oldModal.remove();
        }


        const modal =
            document.createElement("div");


        modal.id =
            "foodSelectorModal";

        modal.className =
            "food-selector-overlay";


        const box =
            document.createElement("div");


        box.className =
            "food-selector";


        /* =============================================
           TIÊU ĐỀ
        ============================================= */

        const title =
            document.createElement("h2");


        if (mode === "edit") {

            title.textContent =
                "Chọn món cần sửa";

        } else {

            title.textContent =
                "Chọn món cần xóa";
        }


        const subtitle =
            document.createElement("p");


        if (mode === "edit") {

            subtitle.textContent =
                "Chọn món ăn bạn muốn chỉnh sửa";

        } else {

            subtitle.textContent =
                "Chọn món ăn bạn muốn xóa khỏi menu";
        }


        box.appendChild(
            title
        );

        box.appendChild(
            subtitle
        );


        /* =============================================
           DANH SÁCH MÓN
        ============================================= */

        const list =
            document.createElement("div");


        list.className =
            "food-selector-list";


        foods.forEach(
            function (food) {

                const item =
                    document.createElement("button");


                item.type =
                    "button";

                item.className =
                    "food-selector-item";


                item.innerHTML = `
                    <div class="selector-food-info">
                        <span class="selector-food-category">
                            ${escapeHTML(food.category)}
                        </span>

                        <strong>
                            ${escapeHTML(food.name)}
                        </strong>

                        <small>
                            ${escapeHTML(food.restaurant)}
                        </small>
                    </div>

                    <span class="selector-arrow">
                        ›
                    </span>
                `;


                item.addEventListener(
                    "click",
                    function () {

                        if (mode === "edit") {

                            startEditingFood(
                                food.id
                            );

                            modal.remove();

                        } else {

                            confirmDeleteFood(
                                food,
                                modal
                            );

                        }

                    }
                );


                list.appendChild(
                    item
                );

            }
        );


        box.appendChild(
            list
        );


        /* =============================================
           NÚT ĐÓNG
        ============================================= */

        const closeButton =
            document.createElement("button");


        closeButton.type =
            "button";

        closeButton.className =
            "selector-close";

        closeButton.textContent =
            "Đóng";


        closeButton.addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


        box.appendChild(
            closeButton
        );


        modal.appendChild(
            box
        );


        document.body.appendChild(
            modal
        );


        /*
         * Click ra ngoài popup để đóng
         */

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.remove();

                }

            }
        );

    }


    /* =====================================================
       BẮT ĐẦU SỬA MÓN
    ===================================================== */

    function startEditingFood(
        foodId
    ) {

        localStorage.setItem(
            "editingFoodId",
            foodId
        );


        window.location.href =
            "add-food.html";
    }


    /* =====================================================
       XÁC NHẬN XÓA
    ===================================================== */

    function confirmDeleteFood(
        food,
        modal
    ) {

        const confirmBox =
            document.createElement("div");


        confirmBox.className =
            "delete-confirm";


        confirmBox.innerHTML = `
            <div class="delete-confirm-icon">
                🗑
            </div>

            <h3>
                Xóa món ăn?
            </h3>

            <p>
                Bạn có chắc muốn xóa
                <strong>
                    ${escapeHTML(food.name)}
                </strong>
                khỏi menu không?
            </p>
        `;


        const buttons =
            document.createElement("div");


        buttons.className =
            "delete-confirm-buttons";


        const cancelButton =
            document.createElement("button");


        cancelButton.type =
            "button";

        cancelButton.className =
            "cancel-delete";

        cancelButton.textContent =
            "Hủy";


        cancelButton.addEventListener(
            "click",
            function () {

                confirmBox.remove();

            }
        );


        const confirmButton =
            document.createElement("button");


        confirmButton.type =
            "button";

        confirmButton.className =
            "confirm-delete";

        confirmButton.textContent =
            "Xóa món";


        confirmButton.addEventListener(
            "click",
            function () {

                deleteFood(
                    food.id,
                    modal
                );

            }
        );


        buttons.appendChild(
            cancelButton
        );

        buttons.appendChild(
            confirmButton
        );


        confirmBox.appendChild(
            buttons
        );


        modal.querySelector(
            ".food-selector"
        ).appendChild(
            confirmBox
        );

    }


    /* =====================================================
       XÓA MÓN
    ===================================================== */

    function deleteFood(
        foodId,
        modal
    ) {

        let foods =
            getFoods();


        foods =
            foods.filter(
                function (food) {

                    return String(food.id) !==
                        String(foodId);

                }
            );


        saveFoods(
            foods
        );


        modal.remove();


        /*
         * Xóa card khỏi giao diện
         */

        displaySavedFoods();


        /*
         * Thông báo
         */

        showDeleteMessage();

    }


    /* =====================================================
       HIỂN THỊ LẠI CARD
    ===================================================== */

    function displaySavedFoods() {

        /*
         * Chỉ xóa các card được tạo bằng JS
         * Không xóa card HTML có sẵn
         */

        const savedCards =
            foodContainer.querySelectorAll(
                ".saved-food-card"
            );


        savedCards.forEach(
            function (card) {

                card.remove();

            }
        );


        const foods =
            getFoods();


        foods.forEach(
            function (food) {

                createFoodCard(
                    food
                );

            }
        );


        filterFoods();
    }


    /* =====================================================
       TẠO CARD MÓN
    ===================================================== */

    function createFoodCard(
        food
    ) {

        const card =
            document.createElement("div");


        card.className =
            "food-card saved-food-card";


        card.dataset.category =
            food.category;


        const info =
            document.createElement("div");


        info.className =
            "food-info";


        const tag =
            document.createElement("span");


        tag.className =
            "food-tag";


        tag.textContent =
            food.category;


        const title =
            document.createElement("h2");


        title.textContent =
            food.name;


        const description =
            document.createElement("p");


        description.className =
            "description";


        description.textContent =
            food.description;


        const bottom =
            document.createElement("div");


        bottom.className =
            "food-bottom";


        let restaurant;


        if (food.map) {

            restaurant =
                document.createElement("a");


            restaurant.href =
                food.map;


            restaurant.target =
                "_blank";


            restaurant.rel =
                "noopener noreferrer";

        } else {

            restaurant =
                document.createElement(
                    "span"
                );

        }


        restaurant.className =
            "restaurant";


        restaurant.textContent =
            "📍 " + food.restaurant;


        bottom.appendChild(
            restaurant
        );


        info.appendChild(
            tag
        );

        info.appendChild(
            title
        );

        info.appendChild(
            description
        );

        info.appendChild(
            bottom
        );


        card.appendChild(
            info
        );


        foodContainer.appendChild(
            card
        );

    }


    /* =====================================================
       LỌC MÓN
    ===================================================== */

    function filterFoods() {

        const keyword =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const activeButton =
            document.querySelector(
                ".category.active"
            );


        const selectedCategory =
            activeButton
                ? activeButton.dataset.category
                : "all";


        const cards =
            foodContainer.querySelectorAll(
                ".food-card"
            );


        let visibleCount =
            0;


        cards.forEach(
            function (card) {

                const titleElement =
                    card.querySelector(
                        "h2"
                    );


                const descriptionElement =
                    card.querySelector(
                        ".description"
                    );


                const cardName =
                    titleElement
                        ? titleElement
                            .textContent
                            .toLowerCase()
                        : "";


                const cardDescription =
                    descriptionElement
                        ? descriptionElement
                            .textContent
                            .toLowerCase()
                        : "";


                const cardCategory =
                    card.dataset.category;


                const matchesSearch =
                    cardName.includes(
                        keyword
                    ) ||
                    cardDescription.includes(
                        keyword
                    );


                const matchesCategory =
                    selectedCategory === "all" ||
                    cardCategory ===
                        selectedCategory;


                if (
                    matchesSearch &&
                    matchesCategory
                ) {

                    card.style.display =
                        "block";

                    visibleCount++;

                } else {

                    card.style.display =
                        "none";
                }

            }
        );


        const noResult =
            document.getElementById(
                "noResult"
            );


        if (noResult) {

            noResult.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    /* =====================================================
       THÔNG BÁO KHÔNG CÓ MÓN
    ===================================================== */

    function showEmptyMessage() {

        const oldMessage =
            document.getElementById(
                "emptyFoodMessage"
            );


        if (oldMessage) {
            oldMessage.remove();
        }


        const message =
            document.createElement("div");


        message.id =
            "emptyFoodMessage";

        message.className =
            "empty-food-message";


        message.innerHTML = `
            <div class="empty-food-icon">
                🍽️
            </div>

            <h3>
                Chưa có món ăn
            </h3>

            <p>
                Hãy thêm món ăn trước khi sử dụng chức năng này.
            </p>

            <button type="button">
                Thêm món
            </button>
        `;


        document.body.appendChild(
            message
        );


        message
            .querySelector("button")
            .addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "editingFoodId"
                    );

                    window.location.href =
                        "add-food.html";

                }
            );


        setTimeout(
            function () {

                message.classList.add(
                    "show"
                );

            },
            10
        );

    }


    /* =====================================================
       THÔNG BÁO XÓA
    ===================================================== */

    function showDeleteMessage() {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "delete-success-message";


        message.innerHTML = `
            <div class="delete-success-icon">
                ✓
            </div>

            <span>
                Đã xóa món ăn
            </span>
        `;


        document.body.appendChild(
            message
        );


        setTimeout(
            function () {

                message.classList.add(
                    "show"
                );

            },
            10
        );


        setTimeout(
            function () {

                message.classList.remove(
                    "show"
                );


                setTimeout(
                    function () {

                        message.remove();

                    },
                    300
                );

            },
            1500
        );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value || "";


        return div.innerHTML;
    }

});