import React from 'react';

function Mark(props) {
  return (
    <tr className="border-b text-center">
      <td className="p-2">{props.subject}</td>
      <td className="p-2">{props.marks_exam}</td>
      <td className="p-2">{props.marks_ica}</td>
      <td className="p-2 font-bold">{props.total}</td>
      <td className="p-2">{props.grades}</td>
      <td className="p-2">{props.grades_point}</td>
      <td className="p-2">{props.credits}</td>
      <td className="p-2 font-bold text-blue-600">{props.credits * props.grades_point}</td>
    </tr>
  );
}

export default Mark;