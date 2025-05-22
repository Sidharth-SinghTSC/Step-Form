// phone Number validation functions
function validatePhone(e) {
  e.target.value = e.target.value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{0,5})/, "$1 $2")
    .trim();
}

// Percentage validationgghjgjg
document.getElementById("percentage").addEventListener("change", (e) => {
  const value = Number(e.target.value);
  if (value > 100 || value < 0) {
    alert("Invalid percentage. Please enter a value between 0 and 100.");
  }
});

//Employee validation

const validateEmployeeForm = () => {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  let valid = true;

  ["nameError", "ageError", "genderError", "emailError", "phoneError"].forEach(
    (id) => (document.getElementById(id).textContent = "")
  );

  if (!name) {
    document.getElementById("nameError").textContent = "Name id Required";
    valid = false;
  }

  if (!age) {
    document.getElementById("ageError").textContent = "age is required";
    valid = false;
  }

  if (!gender) {
    document.getElementById("genderError").textContent = "Gender is required";
    valid = false;
  }

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email";
    valid = false;
  }

  if (!phoneNumber) {
    document.getElementById("phoneError").textContent =
      "Phone number is required";
    valid = false;
  } else if (phoneNumber.replace(/\D/g, "").length !== 10) {
    document.getElementById("phoneError").textContent =
      "Phone number must be exactly 10 digits";
    valid = false;
  }

  document.getElementById("name").addEventListener("input", () => {
    document.getElementById("nameError").textContent = "";
  });

  document.getElementById("age").addEventListener("input", () => {
    document.getElementById("ageError").textContent = "";
  });

  document.getElementById("gender").addEventListener("change", () => {
    document.getElementById("genderError").textContent = "";
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("emailError").textContent = "";
  });

  document.getElementById("phoneNumber").addEventListener("input", () => {
    document.getElementById("phoneError").textContent = "";
  });
  return valid;
};

const empNext = document.querySelector(
  'button.next-btn[data-next="educationForm"]'
);
empNext.addEventListener("click", (e) => {
  e.preventDefault(); // prevent default navigation
  const isValid = validateEmployeeForm();

  if (!isValid) {
    console.log("Form validation failed", isValid);
    return;
  } else showForm("educationForm");
});

// Education section management

const makeEducation = () => {
  return `
    <div class="education_entry">
        <div class="course">

          <div class="form_group">
            <label for="courseName">Course Name:</label>
            <input type="text" id="courseName" name="courseName" required />
            <span class="courseNameError error" style="color: red; font-size: 12px;"></span>
          </div>

          <div class="form_group">
            <label for="courseYear">Course Year:</label>
            <input type="number" id="courseYear" name="courseYear" min="1900" max="2099" required />
            <span class="courseYearError error" style="color: red; font-size: 12px;"></span>
          </div>
          
          <div class="form_group">
            <label for="percentage">Percentage:</label>
            <input type="number" min="0" max="100" id="percentage" name="percentage" />
            <span class="percentageError error" style="color: red; font-size: 12px;"></span>
          </div>
          
          <div class="form_btn">
            <div id="add_button" class="btn_increase">
              <button class="btn_inc" type="button">+</button>
            </div>
            <div class="btn_decrease">
              <button class="btn_dec" type="button">-</button>
            </div>
          </div>

          <span id="alert"></span>

        </div>
      </div>
  `;
};

const eduContainer = document.getElementById("education_entries");

eduContainer.addEventListener("click", (e) => {
  if (e.target.matches(".btn_inc")) {
    const entry = e.target.closest(".education_entry");
    entry.insertAdjacentHTML("afterend", makeEducation());
  }

  if (e.target.matches(".btn_dec")) {
    const all = document.querySelectorAll(".education_entry");
    if (all.length > 1) {
      e.target.closest(".education_entry").remove();
    } else {
      alert("Atleast one education entry is required");
    }
  }
});

eduContainer.addEventListener("input", clearError);
eduContainer.addEventListener("change", clearError);

function clearError(e) {
  if (!e.target.matches("input, select, textarea")) return;
  const errSpan = e.target.closest(".form_group")?.querySelector("span.error");
  if (errSpan) {
    errSpan.textContent = "";
    e.target.classList.remove("error");
  }
}

// Education validation Form

const validateEducationForm = () => {
  let valid = true;

  eduContainer.querySelectorAll(".error").forEach((span) => {
    span.textContent = "";
  });

  eduContainer?.querySelectorAll(".education_entry").forEach((block) => {
    const courseName = block.querySelector('input[name="courseName"]');
    const courseYear = block.querySelector('input[name="courseYear"]');
    const percentage = block.querySelector('input[name="percentage"]');

    if (!courseName.value.trim()) {
      block.querySelector(".courseNameError").textContent =
        "Course Name is required";
      valid = false;
    }

    if (!courseYear.value.trim()) {
      block.querySelector(".courseYearError").textContent =
        "Course Year is required";
      valid = false;
    }

    if (!percentage.value.trim()) {
      block.querySelector(".percentageError").textContent =
        "Course percentage is required";
      valid = false;
    }
  });

  return valid;
};

const eduNext = document.querySelector(
  'button.next-btn[data-next="experienceForm"]'
);

eduNext.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEducationForm()) {
    showForm("experienceForm");
  }
});

// Experience section management
const initialValue = {
  comapny_name: {
    label: "Company name",
    key: "company_name",
    value: "",
  },
  start_date: {
    label: "Start date",
    key: "start_date",
    value: "",
  },
  end_date: {
    label: "End date",
    key: "end_date",
    value: "",
  },
};
let experience = [initialValue];

// Function to remove experience entry
const remove = (event) => {
  const experienceList = document.querySelectorAll(".experience");
  if (experienceList.length <= 1) {
    alert("At least one experience entry is required.");
    return;
  }
  const experienceBlock = event.target.closest(".experience");
  if (experienceBlock) {
    experienceBlock.remove();
    console.log("Removed block with id:", experienceBlock.id);
  }
};

// Function to add new experience entry
const add = () => {
  let parentContainer = document.getElementById("experience_details");

  if (parentContainer) {
    experience?.push(initialValue);

    let newItem = `<div id="${experience?.length - 1}" class="experience">

        <div class="form_group">
          <label for="company_name">Company name:</label>
          <input type="text" id="company_name" name="company_name" placeholder="Company Name" />
          <span id="companyNameError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_group">
          <label for="start_date">Start Date:</label>
          <input type="date" id="start_date" name="start_date" />
          <span id="startDateError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_group">
          <label for="end_date">End Date:</label>
          <input type="date" id="end_date" name="end_date" />
          <span id="endDateError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_btn">
          <div id="add_button" class="btn_increase">
            <button class="btn_inc" type="button">+</button>
          </div>
          <div id="${experience?.length - 1}" class="btn_decrease">
            <button class="btn_dec" type="button">-</button>
          </div>
        </div>

  </div>`;
    parentContainer.innerHTML += newItem;
  }
};

// Initialize experience entries
let childItems = experience?.map(
  (item, index) =>
    `<div id="${index}" class="experience">

        <div class="form_group">
          <label for="${item?.comapny_name?.key}">${item?.comapny_name?.label}:</label>
          <input type="text" id="${item?.comapny_name?.key}" name="${item?.comapny_name?.key}" placeholder="Company Name" />
          <span id="companyNameError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_group">
          <label for="${item?.start_date?.key}">${item?.start_date?.label}:</label>
          <input type="date" id="${item?.start_date?.key}" name="${item?.start_date?.key}" />
          <span id="startDateError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_group">
          <label for="${item?.end_date?.key}">${item?.end_date?.label}:</label>
          <input type="date" id="${item?.end_date?.key}" name="${item?.end_date?.key}" />
          <span id="endDateError" style="color: red; font-size: 12px;"></span>
        </div>

        <div class="form_btn">
          <div id="add_button" class="btn_increase">
            <button class="btn_inc" type="button">+</button>
          </div>
          <div id="${index}" class="btn_decrease">
            <button  class="btn_dec" type="button">-</button>
          </div>
        </div>
  </div>`
);

let parentContainer = document.getElementById("experience_details");
if (parentContainer) {
  parentContainer.insertAdjacentHTML("beforeend", childItems.join(""));
}

// Add event listener for experience buttons
document
  .getElementById("experience_details")
  .addEventListener("click", function (e) {
    if (
      e.target.tagName === "BUTTON" &&
      e.target.parentElement.classList.contains("btn_increase")
    ) {
      add();
    }
    if (
      e.target.tagName === "BUTTON" &&
      e.target.parentElement.classList.contains("btn_decrease")
    ) {
      remove(e);
    }
  });

//experience validation

const validateExperienceForm = () => {
  let valid = true;
  document.querySelectorAll(".experience").forEach((entry) => {
    const companyName = entry.querySelector('input[name="company_name"]');
    const startDate = entry.querySelector('input[name="start_date"]');
    const endDate = entry.querySelector('input[name="end_date"]');

    const companyNameError = entry.querySelector("#companyNameError");
    const startDateError = entry.querySelector("#startDateError");
    const endDateError = entry.querySelector("#endDateError");

    if (!companyName.value.trim()) {
      companyNameError.textContent = "Company Name is required";
      valid = false;
    } else {
      companyNameError.textContent = "";
    }

    if (!startDate.value.trim()) {
      startDateError.textContent = "Start Date is required";
      valid = false;
    } else {
      startDateError.textContent = "";
    }

    if (!endDate.value.trim()) {
      endDateError.textContent = "End Date is required";
      valid = false;
    } else {
      endDateError.textContent = "";
    }
  });

  return valid;
};

// Add event listeners to clear errors on input
document.getElementById("experienceForm").addEventListener("input", (e) => {
  const targetId = e.target.id;
  if (targetId === "company_name") {
    document.getElementById("companyNameError").textContent = "";
  } else if (targetId === "start_date") {
    document.getElementById("startDateError").textContent = "";
  } else if (targetId === "end_date") {
    document.getElementById("endDateError").textContent = "";
  }
});

const sumNext = document.querySelector(
  'button.next-btn[data-next="summaryForm"]'
);
sumNext.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateExperienceForm()) {
    showForm("summaryForm");
  }
});

function showForm(formId) {
  document.querySelectorAll(".custom-form").forEach((form) => {
    form.classList.remove("active-form");
  });

  document.getElementById(formId).classList.add("active-form");

  const steps = document.querySelectorAll(".step");
  const stepMap = {
    employeeForm: 1,
    educationForm: 2,
    experienceForm: 3,
    summaryForm: 4,
  };
  const currentStep = stepMap[formId];

  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    if (stepNumber < currentStep) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNumber === currentStep) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active", "completed");
    }
  });
}

// Initialize forms - show first form only

const forms = document.querySelectorAll(".custom-form");
forms.forEach((form, index) => {
  index === 0
    ? form.classList.add("active-form")
    : form.classList.remove("active-form");
});

// Initialize progress bar
showForm("employeeForm");

// Form navigation event listeners
// document.querySelectorAll(".next-btn").forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     e.preventDefault();
//     const nextFormId = this.dataset.next;
//     console.log("nextFormId", nextFormId);
//     if (nextFormId) {
//       // showForm(nextFormId);
//       const currentForm = this.closest("form");
//       if (currentForm) {
//         currentForm.classList.remove("active-form");
//         document.getElementById(nextFormId).classList.add("active-form");
//       }
//     }
//   });
// });

document.querySelectorAll(".prev-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const prevFormId = this.dataset.prev;
    if (prevFormId) {
      showForm(prevFormId);

      const currentForm = this.closest("form");
      if (currentForm) {
        currentForm.classList.remove("active-form");
        document.getElementById(prevFormId).classList.add("active-form");
      }
    }
  });
});

// summary validation

const validateSummaryForm = () => {
  const summaryInput = document.getElementById("summary").value.trim();
  const skillsInput = document.getElementById("skills").value.trim();

  let valid = true;

  // Clear previous error messages
  document.getElementById("summaryError").textContent = "";
  document.getElementById("skillsError").textContent = "";

  if (!summaryInput) {
    document.getElementById("summaryError").textContent =
      "Please add about your experiences of your past companies";
    valid = false;
  }

  if (!skillsInput) {
    document.getElementById("skillsError").textContent =
      "Please add about your skills";
    valid = false;
  }

  return valid;
};

// Add event listeners for summary form
document.getElementById("summaryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateSummaryForm()) {
    console.log("Summary form validated successfully");
  }
});

// Add event listeners to clear errors on input
document.getElementById("summary").addEventListener("input", () => {
  document.getElementById("summaryError").textContent = "";
});

document.getElementById("skills").addEventListener("input", () => {
  document.getElementById("skillsError").textContent = "";
});

// submit button
document.querySelector(".btn-submit").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateSummaryForm()) {
    const formData = collectFormData();
    displayFormData(formData);
    showDisplaySection();
  }
});

// Display Form Data

const collectFormData = () => {
  return {
    personal: {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phoneNumber").value,
    },

    education: Array.from(document.querySelectorAll(".education_entry")).map(
      (entry) => ({
        courseName: entry.querySelector('input[name="courseName"]').value,
        courseYear: entry.querySelector('input[name="courseYear"]').value,
        percentage: entry.querySelector('input[name="percentage"]').value,
      })
    ),

    experience: Array.from(document.querySelectorAll(".experience")).map(
      (exp) => ({
        company: exp.querySelector('input[name="company_name"]').value,
        startDate: exp.querySelector('input[name="start_date"]').value,
        endDate: exp.querySelector('input[name="end_date"]').value,
      })
    ),

    summary: {
      professional: document.getElementById("summary").value,
      skills: document.getElementById("skills").value,
    },
  };
};

const displayFormData = (data) => {
  const displayContent = document.getElementById("displayContent");
  let html = "";

  //Personal Information

  html += `<div class="data-section">
  <h2>Personal Information</h2>
  <div class="data-row">
    <div class="data-item">
      <p><strong>Name:</strong> ${data.personal.name}</p>
      <p><strong>Age:</strong> ${data.personal.age}</p>
      <p><strong>Gender:</strong> ${data.personal.gender}</p>
    </div>
    <div class="data-item">
      <p><strong>Email:</strong> ${data.personal.email}</p>
      <p><strong>Phone:</strong> ${data.personal.phone}</p>
    </div>
  </div>
</div>`;

  //Education Information

  html += `<div class="data-section">
  <h2>Education</h2>`;

  data.education.forEach((edu) => {
    html += `<div>
    <div class="data-row">
    <div class="data-item">
    <p><strong>Course name:</strong> ${edu.courseName}</p>
    <p><strong>Course year:</strong> ${edu.courseYear}</p> 
     <p><strong>Percentage:</strong> ${edu.percentage}</p>
    </div>
    </div>
    </div>`;
  });
  html += `</div>`;

  // Experience Information

  html += `<div class="data-section">
  <h2>Experience</h2>`;

  data.experience.forEach((exp) => {
    html += `<div class="data-row">
              <div class="data-item">
                <p><strong>Company:</strong> ${exp.company}</p>
                <p><strong>Start Date:</strong> ${exp.startDate}</p>
                <p><strong>End Date:</strong> ${exp.endDate}</p>
              </div>
            </div>`;
  });
  html += `</div>`;

  // Summary
  html += `<div class="data-section">
            <h2>Professional Summary</h2>
            <div class="data-row">
              <div class="data-item">
                <p>${data.summary.professional}</p>
                <p><strong>Skills:</strong> ${data.summary.skills}</p>
              </div>
            </div>
          </div>`;
  displayContent.innerHTML = html;
};

const showDisplaySection = () => {
  document.querySelectorAll(".custom-form").forEach((form) => {
    form.style.display = "none";
  });

  document.getElementById("displayData").style.display = "block";

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.add("completed");
    step.classList.remove("active");
  });
};
