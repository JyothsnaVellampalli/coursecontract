import { useState, createContext, useMemo, useEffect, useContext } from "react";
import Web3 from "web3";
import { contractABI } from "./abi";

export const CourseContext = createContext();

export function CourseContextProvider({children}) {
    const [web3, setWeb3] = useState(null);
    const [courseContract, setCourseContract] = useState(null);
    const [courses, setCourses] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(window.ethereum)
        if (window.ethereum) {
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(() => {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const contractAddress = '0x5Cdc1560C7B3984445B4fD92fB884037D03E68E3';
                const courseInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                setCourseContract(courseInstance);
    
                courseInstance.methods.listCourses().call()
                  .then(data => {
                    setCourses(data)
                    setLoading(false)
                  });
            })
            .catch(err => {
                // Handle error if the user rejects the connection request
                console.error(err);
            });
        } else {
            alert('Please install an another Ethereum wallet.');
        }
    }, [])

    async function addCourse({title, price}) {
        const accounts = await web3.eth.getAccounts();
        if(!accounts || !accounts.length) {
          return;
        }
        setLoading(true)
        courseContract.methods.addCourse(title,  Web3.utils.toWei(price, 'ether')).send({ from: accounts[0] }).then((courseId) => {
          setLoading(false)
        })
    }
    
    async function deleteCourse(courseId) {
        console.log("deleete course", courseId, courseContract)
        if(!courseContract) {
            console.log("no course contract")
            return
        }
        const accounts = await web3.eth.getAccounts();
        console.log({accounts})
        if(!accounts || !accounts.length) {
          console.log("no accounts")
          return;
        }
        courseContract.methods.deleteCourse(courseId).send({ from: accounts[0] })
        .then((data) => {
            console.log("deleted", data)
        })
    }

    async function buyCourse({courseId, fee}) {
        console.log("buy course")
        const accounts = await web3.eth.getAccounts();
        console.log({accounts})
        if(!accounts || !accounts.length) {
          console.log("no accounts")
          return;
        }
        // setLoading(true)
        courseContract.methods.buyCourse(courseId).send({ from: accounts[0], value:  Web3.utils.toWei(fee, 'ether') }).then((res) => {
          console.log({res})
        //   setLoading(false)
        })
    }

    async function fetchBills() {
        console.log("fetch bills", web3)
        if(!web3) {
            console.log("no web")
            return
        }
        const accounts = await web3.eth.getAccounts();
        console.log({accounts})
        if(!accounts || !accounts.length) {
          console.log("no accounts")
          return;
        }
        if(!courseContract) {
            console.log("no contract")
            return
        }
        // setLoading(true)
        return courseContract.methods.getBills(accounts[0]).call().then((res) => {
          console.log({res})
          return res;
        //   setLoading(false)
        }).catch((err) => {
            console.log({err})
            return [];
        })
    }

    const values = useMemo(() => ({
        courses,
        web3,
        addCourse,
        deleteCourse,
        buyCourse,
        fetchBills,
        loading
    }), [web3, courses, loading])

    return (
        <CourseContext.Provider value={values}>
            {children}
        </CourseContext.Provider>
    )
}

export const useCourseContext = () => {
    const courseContext = useContext(CourseContext)
    if(!courseContext) {
        console.log("no course context")
        throw new Error("no course context")
    }
    return courseContext
}