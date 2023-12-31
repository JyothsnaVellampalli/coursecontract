import { useRef } from "react";
import "./AddCourse.css";
import {useCourseContext} from '../courseContext';

export default function AddCourse() {
    const titleRef = useRef(null)
    const priceRef = useRef(null)

    const {addCourse, loading} = useCourseContext()

    function handleClick() {
        const title = titleRef.current.value
        const price = priceRef.current.value
        console.log({title, price})
        addCourse({title, price})
    }

    return (
        <div className="form-container">
            <h3>Add Course</h3>
            <input type="text" ref={titleRef} placeholder="title" className="form-input"/>
            <input type="text" ref={priceRef} placeholder="price" className="form-input"/>
            <button type="button" className="add-button" onClick={handleClick}>{loading ? 'loading...' : 'Add Course'}</button>
        </div>
    )
}