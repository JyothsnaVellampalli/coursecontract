import './App.css';
import CourseCard from './components/CourseCard';
import {useCourseContext} from './courseContext';

function App() {

  const {courses, loading, addCourse, deleteCourse} = useCourseContext();

  return (
    <div className="App">
      {!loading && courses?.length ? (
        <div className='courses-container'>
          {courses.map((course) => 
            <CourseCard course={course} deleteCourse={deleteCourse} />
          )}
        </div>
      ) : <></>}
    </div>
  );
}

export default App;
