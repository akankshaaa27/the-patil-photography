<main id="main" class="main">
    <div class="pagetitle">
        <h1>Inventory Management</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">Inventory</li>
            </ol>
        </nav>
    </div>

    <section class="accessory-sec">
        <div class="container">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" id="searchAccessory" placeholder="Search inventory..." onkeyup="filterAccessories()">
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filterCategory" onchange="filterAccessories()">
                        <option value="">All Types</option>
                        <option>Camera</option>
                        <option>Lens</option>
                        <option>Battery</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="accessory-main d-flex justify-content-between align-items-center">
                                <h5 class="card-title">Manage Inventory</h5>
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#accessoryModal" onclick="clearModal()">
                                    <i class="bi bi-plus-circle me-1"></i> Add New Item
                                </button>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered mt-3" id="accessoryTable">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Condition</th>
                                            <th>Purchase Date</th>
                                            <th>Next Service</th>
                                            <th>MM</th>
                                            <th>Section</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Accessories will be added dynamically here -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal fade" id="accessoryModal" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Add New Accessory</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form class="row g-3" id="accessoryForm">
                                                <div class="col-md-6">
                                                    <label class="form-label">Type</label>
                                                    <select class="form-select" id="inputType" required onchange="onTypeChange()">
                                                        <option selected>Camera</option>
                                                        <option>Lens</option>
                                                        <option>Battery</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Name / Description</label>
                                                    <input type="text" class="form-control" id="inputName" required>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Quantity</label>
                                                    <input type="number" class="form-control" id="inputQuantity" required>
                                                </div>
                                                <div class="col-md-6" id="fieldCondition">
                                                    <label class="form-label">Condition</label>
                                                    <select class="form-select" id="inputCondition">
                                                        <option>Excellent</option>
                                                        <option>Good</option>
                                                        <option>Under Servicing</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6" id="fieldPurchase">
                                                    <label class="form-label">Purchase Date</label>
                                                    <input type="date" class="form-control" id="inputPurchase">
                                                </div>
                                                <div class="col-md-6" id="fieldNextService">
                                                    <label class="form-label">Next Service</label>
                                                    <input type="date" class="form-control" id="inputNextService">
                                                </div>
                                                <div class="col-md-6" id="fieldMM">
                                                    <label class="form-label">Focal Length (mm)</label>
                                                    <input type="text" class="form-control" id="inputMM">
                                                </div>
                                                <div class="col-md-6" id="fieldSection">
                                                    <label class="form-label">Section</label>
                                                    <input type="text" class="form-control" id="inputSection">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" onclick="saveAccessory()">Save Accessory</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
    function clearModal() {
        const form = document.getElementById("accessoryForm");
        form.reset();
        onTypeChange();
    }

    function onTypeChange() {
        const type = document.getElementById("inputType").value;
        // hide all optional sections
        ["fieldCondition", "fieldPurchase", "fieldNextService", "fieldMM", "fieldSection"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        // show relevant
        if (type === "Camera") {
            document.getElementById("fieldCondition").style.display = "";
            document.getElementById("fieldPurchase").style.display = "";
            document.getElementById("fieldNextService").style.display = "";
        } else if (type === "Lens") {
            document.getElementById("fieldMM").style.display = "";
            document.getElementById("fieldSection").style.display = "";
        }
    }

    function saveAccessory() {
        const type = document.getElementById("inputType").value;
        const name = document.getElementById("inputName").value;
        const quantity = document.getElementById("inputQuantity").value;
        const condition = document.getElementById("inputCondition")?.value || "";
        const purchase = document.getElementById("inputPurchase")?.value || "";
        const nextSvc = document.getElementById("inputNextService")?.value || "";
        const mm = document.getElementById("inputMM")?.value || "";
        const section = document.getElementById("inputSection")?.value || "";

        if (!type || !name || !quantity) {
            alert("Please fill in the required fields.");
            return;
        }

        const table = document.getElementById("accessoryTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${type}</td>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${condition}</td>
            <td>${purchase}</td>
            <td>${nextSvc}</td>
            <td>${mm}</td>
            <td>${section}</td>
        `;

        document.getElementById("accessoryForm").reset();
        onTypeChange();
        new bootstrap.Modal(document.getElementById("accessoryModal")).hide();
    }

    function filterAccessories() {
        const searchValue = document.getElementById("searchAccessory").value.toLowerCase();
        const typeFilter = document.getElementById("filterCategory").value;
        const table = document.getElementById("accessoryTable").getElementsByTagName('tbody')[0];
        const rows = table.getElementsByTagName("tr");

        for (let row of rows) {
            const name = row.cells[1].textContent.toLowerCase();
            const type = row.cells[0].textContent;
            row.style.display =
                (name.includes(searchValue) && (!typeFilter || type === typeFilter))
                ? ""
                : "none";
        }
    }
    // initialize hide/show
    document.addEventListener('DOMContentLoaded', onTypeChange);

    </script>
</main>
