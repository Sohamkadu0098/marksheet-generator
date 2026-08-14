import React, { useState } from 'react';

function Exam_marks({ verifiedStudentId, onSubmit }) {
  const [subject, setSubject] = useState('');
  const [sem, setSem] = useState('1');
  const [icaMarks, setIcaMarks] = useState('');
  const [eseMarks, setEseMarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({
      target_student_id: verifiedStudentId,
      subject: subject,
      sem: Number(sem),
      ica_marks: Number(icaMarks),
      ese_marks: Number(eseMarks)
    });

    setSubject('');
    setIcaMarks('');
    setEseMarks('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium">Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="border p-2 rounded w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Semester:</label>
        <select value={sem} onChange={(e) => setSem(e.target.value)} className="border p-2 rounded w-full">
          <option value="1">Sem 1</option>
          <option value="2">Sem 2</option>
          <option value="3">Sem 3</option>
          <option value="4">Sem 4</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">ICA Marks:</label>
        <input type="number" value={icaMarks} onChange={(e) => setIcaMarks(e.target.value)} className="border p-2 rounded w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">ESE Marks:</label>
        <input type="number" value={eseMarks} onChange={(e) => setEseMarks(e.target.value)} className="border p-2 rounded w-full" required />
      </div>
      <button type="submit" className="bg-gray-800 text-white p-2 rounded mt-2">
        Save Subject Marks
      </button>
    </form>
  );
}

export default Exam_marks;