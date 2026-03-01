const form=document.getElementById("studentForm");
const course=document.getElementById("course");
const branch=document.getElementById("branch");
const popup=document.getElementById("courseAnimation");
const message=document.getElementById("message");

/* BTECH BRACHES */
const btechBranches=[
"BTech Electrical Engineering",
"BTech Computer Science",
"BTech Mechanical Engineering",
"BTech AIML",
"BTech AIDS",
"BTech Electronics & Telecommunication"
];

course.addEventListener("change",()=>{

showCourseAnimation(course.value);

if(course.value==="BTech"){
branch.style.display="block";
branch.innerHTML="<option>Select Branch</option>";

btechBranches.forEach(b=>{
branch.innerHTML+=`<option>${b}</option>`;
});
}else{
branch.style.display="none";
}
});

/* COURSE POPUP */
function showCourseAnimation(selected){
let text="🎓 Course Selected";

if(selected==="BTech") text="💻 Engineering Mode Activated!";
if(selected==="MBA") text="📈 Business Leader Mode!";
if(selected==="BCA") text="🧑‍💻 Coding Journey Started!";
if(selected==="MCA") text="🚀 Advanced Developer!";
if(selected==="BBA") text="💼 Management Skills Loading!";

popup.innerText=text;
popup.style.display="block";

setTimeout(()=>popup.style.display="none",2500);
}

/* SAVE DATA */
form.addEventListener("submit",(e)=>{
e.preventDefault();

const student={
rollNumber:rollNumber.value,
enrollmentNumber:enrollmentNumber.value,
name:name.value,
email:email.value,
hobbies:hobbies.value,
address:address.value,
yearStudy:yearStudy.value,
semester:semester.value,
course:course.value,
branch:branch.value,
admissionDate:admissionDate.value
};

let students=JSON.parse(localStorage.getItem("students"))||[];
students.push(student);

localStorage.setItem("students",JSON.stringify(students));

message.innerText="✅ Student Registered Successfully!";
form.reset();
branch.style.display="none";
});

/* EXPORT EXCEL */
function exportExcel(){

let students=JSON.parse(localStorage.getItem("students"))||[];

if(students.length===0){
alert("No data found");
return;
}

const worksheet=XLSX.utils.json_to_sheet(students);
const workbook=XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"Students");

XLSX.writeFile(workbook,"Student_Data.xlsx");
}