#! /usr/bin/env node
import inquirer from "inquirer"

class student {
  id : string;
  name : string;
  coursesEnrolled : string[];
  feesAmount : number;

  constructor (id :string, name : string, coursesEnrolled : string[], feesAmount : number) 
  {
    this.id = id
    this.name = name
    this.coursesEnrolled = coursesEnrolled
    this.feesAmount = feesAmount
  }

}

let baseId = 10000
let studentId: string = "";
let continueEnrollment = true;

let students : student[] = []

do{
    let action = await inquirer.prompt({
        type : "list",
        name : "ans",
        message : "Please select an option:\n",
        choices : ["Enroll a student", "Show student Status"]
    })

    if(action.ans === "Enroll a student"){

      let studentName = await inquirer.prompt({
          type : "input",
          name : "ans",
          message : "Enter your student name:",
      
      })

      let trimmedStudentName = (studentName.ans).trim().toLowerCase();
      let studentNameCheck = students.map(obj => obj.name)
  //.map ne sary students name k array banadye

      if(studentNameCheck.includes(trimmedStudentName) === false ){
          if (trimmedStudentName !== ""){   //""= stu name agr empty string k brabr nai h 
           baseId++  //++ mean increment... if not empty then id will generate
           studentId = "STID" + baseId //concatenate to genert 5 digit spcl id

           console.log("\n\tYour account has been created");
           console.log(`Welcome, ${trimmedStudentName}!`);
     
           let course = await inquirer.prompt({
            type : "list",
            name : "ans",
            message : "Please select a course",
            choices : ["IT", "English","Biology"]
           })
      
          let courseFees = 0;
          switch(course.ans){
            case "IT" :
            courseFees = 5000;
            break;

           case "English" :
           courseFees = 500;
           break;

           case "Biology" :
           courseFees = 200;
           break;
          }
      let courseConfirm = await inquirer.prompt({
        type : "confirm",
        name : "ans",
        message : "Do you want to enroll in this course"
      })
       
      if (courseConfirm.ans=== true){
           let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees)

          students.push(Student)

          console.log("You have enrolled in this course");
         
      }

    }else{
      console.log("invalid name"); 
    }
    }else{
      console.log("This name is already exist");
    } 
  }
  else if(action.ans === "Show student Status"){
          if(students.length !== 0 ){
             let studentNameCheck = students.map(e => e.name)
// students.map(e => e.name)= jis name p b stu click krega uska status show hojaya

       let selectedStudent = await inquirer.prompt({
          type: "list",
          name: "ans",
          message: "Please select name",
          choices: studentNameCheck

       })

       let foundstudent = students.find(Student => Student.name === selectedStudent.ans)
//jis student ka name select h uska data hmy miljay

        console.log("Student information");
        console.log(foundstudent);
        console.log("\n");        

      }else{
           console.log("Record is empty");
    
      }
 }  

      let  userConfirm  = await inquirer.prompt({
          type: "confirm",
          name: "ans",
          message: "Do you want to continue?"

      })
      
      if(userConfirm.ans === false){
        continueEnrollment = false
      }


}while(continueEnrollment)  