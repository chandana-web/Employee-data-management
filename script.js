const form = document.getElementById("form");
const eTable= document.getElementById("eTable");
const createButton=document.querySelector("#form button")
let formState="CREATE";
const employeeList=[];
let empId= 1000;
function onSubmit(event){
    
    event.preventDefault();
    const employee = {
        employeeId: ++empId,
        name: event.target.name.value,
        email: event.target.email.value,
        salary: event.target.salary.value,
        companyName: event.target.companyName.value,
        role: event.target.role.value,
    };
    if(formState==="CREATE"){
    // Call a function to add the employee to the table
    addEmployeeToTable(employee);
    }else if(formState==="UPDATE"){
        //update the employee corresponding record
        
        formState="CREATE"
        createButton.innerText="Create Employee"
    }

    // You can also clear the form if needed
    form.reset();
}

function deleteRecord(event){
    if(formState==="UPDATE"){
        alert("Please update the record before deletion");
        return;
    }
    const deleteicon=event.target;
    deleteicon.parentNode.parentNode.remove();
    const currentEmployeeId=parseInt(deleteicon.getAttribute("data-empId"));
    for(let i=0;i<employeeList.length;i++){
        if(employeeList[i].employeeId===currentEmployeeId){
            employeeList.splice(i,1);
            break;
        }
    }
}
function fillFormWithData(employee){
    for(let key in employee){
    if(key!=="employeeId"){
    
        form[key].value=employee[key];
    }
}

}
function editRecord(event){
    const editButton =event.target;
 const currentEmployeeId=parseInt(editButton.getAttribute("data-empId"));
 for(let i=0;i<employeeList.length;i++){
    if(currentEmployeeId===employeeList[i].employeeId){
        fillFormWithData(employeeList[i]);
        break;
    }
 }
}

function addEmployeeToTable(employee){
    const record=document.createElement("tr");
    for(let key in employee){
        const cell=document.createElement("td");
        cell.innerText=employee[key];
        record.appendChild(cell);
    }
const optioncell=document.createElement("td");
const editicon=document.createElement("span");
editicon.className="material-icons icon";
editicon.innerText="edit";
editicon.setAttribute("data-empId",employee.employeeId);
editicon.addEventListener("click",editRecord);

const deleteicon=document.createElement("span");
deleteicon.className ="material-icons icon";
deleteicon.innerText="delete";
deleteicon.setAttribute("data-empId",employee.employeeId);

deleteicon.addEventListener("click",deleteRecord)
optioncell.append(editicon,deleteicon);
record.appendChild(optioncell);
eTable.appendChild(record);
employeeList.push(employee);
}
form.addEventListener("submit", onSubmit);