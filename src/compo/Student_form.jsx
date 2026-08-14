import React from 'react';

function Student_form({ formData, onChange }) {
  const handleChange = (e) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-col text-black gap-3">
      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Student Id:</label>
        <input type="number" name="student_id" value={formData.student_id} onChange={handleChange} className="border p-2 rounded w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Course:</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} className="border p-2 rounded w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Roll No:</label>
        <input type="text" name="roll_no" value={formData.roll_no} onChange={handleChange} className="border p-2 rounded w-full" required />
      </div>
    </form>
  );
}

export default Student_form;