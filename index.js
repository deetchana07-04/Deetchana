const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Connection Error.", err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollno: String
});

const Student = mongoose.model("Student", studentSchema);

app.post('/insert', async (req, res) => {
    const { name, age, department, rollno } = req.body;
    const newStudent = new Student({ name, age, department, rollno });
    try {
        await newStudent.save();
        res.status(201).send("Student Inserted");
    } catch (error) {
        res.status(400).send("Error inserting student");
    }
});

app.get('/getAllStudents', async (req, res) => {
    try {
        const data = await Student.find();
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching students");
    }
});

app.get('/getStudentByQuery', async (req, res) => {
    try {
        const { rollno } = req.query;
        const data = await Student.findOne({ rollno });
        if (data) {
            res.send(data);
        } else {
            res.status(400).send("Student not found");
        }
    }
    catch (error) {
        res.status(500).send("Error fetching students");
    }
});

app.delete('/deleteStudentByRollNo', async (req, res) => {
    const { rollno } = req.body;
    try {
        const deleteCount = await Student.deleteOne({ rollno });
        if (deleteCount.deletedCount > 0) {
            res.send("Student deleted");
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        res.send("Error in deleting student");
    }
});

app.delete('/deleteStudentByRollNo', async (req, res) => {
    const { rollno } = req.body;
    try {
        const deletedCount = await Student.findOneAndDelete({ rollno });
        console.log(deletedStudent,rollno);
        if (deletedStudent) {
            res.send("Student deleted");
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        res.send("Error in deleting student");
    }
});
app.put('/updateStudent', async (req, res) => {
  const { rollNo, name, age, department } = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo },
      { name, age, department },
      { new: true }   
    );

    if (updatedStudent) {
      res.send('Student updated');
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Error updating student');
  }
});
app.listen(3000);