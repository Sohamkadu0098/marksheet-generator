import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Student_form from './compo/Student_form'; 
import Exam_marks from './compo/Exam_marks';
import Show_result from './compo/Show_result';

const initialStudentsData = {
  "101": {
    student_id: "101",
    name: "Soham",
    roll_no: "A1",
    programme: "Bsc",
    exam_marks: [
      { subject: "hindi", sem: 1, ica_marks: 33, ese_marks: 48 }
    ]
  }
};

export default function App() {
  const [studentsData, setStudentsData] = useState(initialStudentsData);
  const [formData, setFormData] = useState({ student_id: '', name: '', course: '', roll_no: '' });
  const [showExamForm, setShowExamForm] = useState(false);

  const inputId = String(formData.student_id).trim();
  const student = studentsData[inputId];
  
  const isVerified = !!(
    student && 
    student.name.toLowerCase() === formData.name.trim().toLowerCase() &&
    student.roll_no.toLowerCase() === formData.roll_no.trim().toLowerCase() &&
    student.programme.toLowerCase() === formData.course.trim().toLowerCase()
  );

  const handleAddMarks = (marksData) => {
    const { target_student_id, ...subjectDetails } = marksData;
    setStudentsData((prevData) => ({
      ...prevData,
      [target_student_id]: {
        ...prevData[target_student_id],
        exam_marks: [...prevData[target_student_id].exam_marks, subjectDetails]
      }
    }));
  };

  return (
    <BrowserRouter>
      <div className="p-6 max-w-2xl mx-auto font-sans">
        <h1 className="text-3xl font-bold text-center mb-6">University Portal</h1>
      
        <Routes>
          <Route path="/" element={
            <div>
              <h2 className="text-xl font-bold mb-2">1. Verify Student Details</h2>
              <p className="text-gray-500 mb-4 text-sm">Example: ID 101, Soham, Bsc, A1</p>
              
              <div className="border p-4 rounded mb-4">
                <Student_form formData={formData} onChange={setFormData} />
              </div>

              {isVerified && <p className="text-green-600 font-bold mb-4"> Details match!</p>}

              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => { isVerified ? setShowExamForm(true) : alert("Please enter matching student details first!") }} 
                  className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
                >
                  Add Exam Marks
                </button>
                <Link 
                  to="/result" 
                  className="bg-gray-800 text-white p-2 rounded flex items-center justify-center hover:bg-gray-900"
                >
                  Go to Show Results
                </Link>
              </div>

              {showExamForm && isVerified && (
                <div className="border p-4 rounded ">
                  <h2 className="text-lg font-bold mb-4">2. Add Marks</h2>
                  <Exam_marks verifiedStudentId={inputId} onSubmit={handleAddMarks} />
                </div>
              )}
            </div>
          } />

          <Route path="/result" element={<Show_result studentsData={studentsData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}