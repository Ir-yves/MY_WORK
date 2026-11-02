import { useState } from 'react';
import './App.css';

function App() {
  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function handleRegister(event) {
    event.preventDefault();

    if (!studentName.trim() || !age || !course.trim()) {
      alert('Please fill in all fields!');
      return;
    }

    if (Number(age) <= 0) {
      alert('Please enter a valid age.');
      return;
    }

    setStudents((currentStudents) => [
      ...currentStudents,
      {
        id: crypto.randomUUID(),
        studentName: studentName.trim(),
        age,
        course: course.trim()
      }
    ]);
    setStudentName('');
    setAge('');
    setCourse('');
  }

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(normalizedSearch)
  );

  return (
    <main className="page-shell">
      <div className="container">
        <header className="page-header">
          <h1 id="student">Student Registration System</h1>
          <p>Register students and find them quickly in your list.</p>
        </header>

        <form id="register" onSubmit={handleRegister}>
          <label htmlFor="student-name">Student Name</label>
          <input
            id="student-name"
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            required
          />

          <label htmlFor="student-age">Age</label>
          <input
            id="student-age"
            type="number"
            placeholder="Enter student age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            min="1"
            required
          />

          <label htmlFor="student-course">Course</label>
          <input
            id="student-course"
            type="text"
            placeholder="Enter course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            required
          />

          <button type="submit">Register Student</button>
        </form>

        <section className="student-list-section" aria-labelledby="student-list-heading">
          <div className="student-list-header">
            <div>
              <h2 id="student-list-heading">Registered Students</h2>
              <p className="student-count">
                {students.length} {students.length === 1 ? 'student' : 'students'}
              </p>
            </div>
            <div className="student-search">
              <label htmlFor="student-search">Search by student name</label>
              <input
                id="student-search"
                type="search"
                placeholder="Type a name to search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>

          {students.length === 0 ? (
            <p className="empty-list">No students registered yet.</p>
          ) : filteredStudents.length === 0 ? (
            <p className="no-search-results" role="status">
              No students found with that name.
            </p>
          ) : (
            <div className="student-table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentName}</td>
                      <td>{student.age}</td>
                      <td>{student.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
