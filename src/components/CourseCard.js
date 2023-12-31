import Web3 from 'web3';
import './CourseCard.css';
import {useCourseContext} from '../courseContext'

export default function CourseCard({course, deleteCourse}) {

    const {buyCourse} = useCourseContext()
    // name, id, fee, date
    const handleBuyCourse = () => {
        console.log("buy course", course[1])
        buyCourse({courseId: course[1], fee:  Web3.utils.fromWei(Number(course[2]), 'ether')})
    }

    return (
        <div className='card-wrapper'>
            <div className='image-container'>
                <img src='' className='image' />
            </div>
            <div className='content-conatiner'>
                <div className='course-name'>{course[0]}</div>
                {/* Web3.utils.fromWei(Number(course[2]), 'ether') */}
                <div className='course-fee'>{`${ Web3.utils.fromWei(Number(course[2]), 'ether')} eth`}</div>
            </div>
            <div className='action-container'>
                <button type="button" onClick={handleBuyCourse} className='buy-button'>Buy Course</button>
                <button type="button" onClick={() => deleteCourse(course[1])} className='buy-button'>delete Course</button>
            </div>
        </div>
    )
}