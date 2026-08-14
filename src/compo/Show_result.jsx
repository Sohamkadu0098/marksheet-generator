import React, { useState } from 'react';
import Mark from './Mark';

function Show_result({ studentsData }) {
  const [searchId, setSearchId] = useState('');
  const [course, setCourse] = useState('');
  const [sem, setSem] = useState('1');
  const [errorMsg, setErrorMsg] = useState('');
  const [foundResult, setFoundResult] = useState(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const student = studentsData[searchId];
    if (!student) {
      setErrorMsg("Student ID not found.");
      return;
    }
    if (student.programme.toLowerCase() !== course.toLowerCase()) {
      setErrorMsg(`Course mismatch. Enrolled in ${student.programme}`);
      return;
    }

    const semMarks = student.exam_marks.filter(mark => String(mark.sem) === String(sem));
    if (semMarks.length === 0) {
      setErrorMsg("No marks found for this semester.");
      return;
    }

    setFoundResult({ studentInfo: student, marks: semMarks });
  };

  if (foundResult) {
    let sumCredits = 0;
    let sumPoints = 0;

    return (
      <div className="border p-6 rounded ">
        <h2 className="text-xl font-bold mb-2">Results for {foundResult.studentInfo.name} ({foundResult.studentInfo.student_id})</h2>
        <p className="mb-4 text-gray-600">Course: {foundResult.studentInfo.programme}</p>
        
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Exam</th>
              <th className="p-2">ICA</th>
              <th className="p-2">Total</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Point</th>
              <th className="p-2">Credits</th>
              <th className="p-2">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {foundResult.marks.map((markData, index) => {
              const total = markData.ica_marks + markData.ese_marks;
              
              let grades;
              let grades_point;
              let credits;

              if (markData.ese_marks < 40 || markData.ica_marks < 8) {
                grades = 'F';
                grades_point = 0;
                credits = 0;
              } else if (total >= 90) {
                grades = 'O';
                grades_point = 9;
                credits = 2;
              } else if (total >= 80) {
                grades = 'A';
                grades_point = 8;
                credits = 2;
              } else if (total >= 70) {
                grades = 'B';
                grades_point = 7;
                credits = 2;
              } else if (total >= 60) {
                grades = 'C';
                grades_point = 6;
                credits = 2;
              } else if (total >= 50) {
                grades = 'D';
                grades_point = 5;
                credits = 2;
              } else if (total >= 40) {
                grades = 'E';
                grades_point = 4;
                credits = 2;
              } else {
                grades = 'F';
                grades_point = 0;
                credits = 0;
              }
              
              sumCredits += credits;
              sumPoints += (credits * grades_point);

              return (
                <Mark 
                  key={index}
                  subject={markData.subject}
                  marks_exam={markData.ese_marks}
                  marks_ica={markData.ica_marks}
                  total={total}
                  grades={grades}
                  grades_point={grades_point}
                  credits={credits} 
                />
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 p-4 rounded flex justify-end text-lg">
          <span className="font-medium mr-4">Final SGPA:</span>
          <span className="font-bold text-blue-600">
            {sumCredits === 0 ? "0.00" : (sumPoints / sumCredits).toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-6 rounded ">
      <h2 className="text-xl font-bold mb-4">Search Student Result</h2>
      
      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium">Student Id:</label>
          <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Course:</label>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Sem:</label>
          <select value={sem} onChange={(e) => setSem(e.target.value)} className="border p-2 rounded w-full">
            <option value="1">Sem 1</option>
            <option value="2">Sem 2</option>
            <option value="3">Sem 3</option>
            <option value="4">Sem 4</option>
          </select>
        </div>
        <button type="submit" className="bg-gray-700 text-white p-2 rounded mt-2">
          Find Results
        </button>
      </form>

      {errorMsg && <p className="text-red-500 font-bold mt-4">{errorMsg}</p>}
    </div>
  );
}

export default Show_result;