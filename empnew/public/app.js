document.addEventListener("DOMContentLoaded", function () {
    loadEmployees();
});

async function addEmployee() {
    const nameInput = document.getElementById("employeeName");
    const positionInput = document.getElementById("employeePosition");
    const salaryInput = document.getElementById("employeeSalary");

    const name = nameInput.value;
    const position = positionInput.value;
    const salary = salaryInput.value;

    if (name && position && salary) {
        try {
            const response = await fetch('/api/addEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, position, salary }),
            });

            if (response.ok) {
                // Employee added successfully
                loadEmployees();
                nameInput.value = "";
                positionInput.value = "";
                salaryInput.value = "";
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding the employee.');
        }
    } else {
        alert("Please enter all the details.");
    }
}

async function loadEmployees() {
    try {
        const response = await fetch('/api/getEmployees');

        if (response.ok) {
            const employees = await response.json();
            displayEmployees(employees);
        } else {
            const data = await response.json();
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while retrieving employee data.');
    }
}

function displayEmployees(employees) {
    const employeesList = document.getElementById("employees");
    employeesList.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
        `;
        employeesList.appendChild(row);
    });
}
