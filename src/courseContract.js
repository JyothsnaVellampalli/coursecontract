// import Web3 from 'web3';


// const [courseContract, setCourseContract] = useState(null);
// const [web3, setWeb3] = useState(null);

// const listCourses = () => {
//     console.log(window.ethereum)
//     if (window.ethereum) {
//       window.ethereum.request({ method: 'eth_requestAccounts' })
//         .then(() => {
//             const web3Instance = new Web3(window.ethereum);
//             setWeb3(web3Instance);
//             const contractAddress = '0x5Cdc1560C7B3984445B4fD92fB884037D03E68E3';
//             // console.log({contractAddress})
//             const courseInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
//             console.log({courseInstance})
//             setCourseContract(courseInstance);

//             courseInstance.methods.listCourses().call()
//               .then(data => {
//                 console.log({data})
//                 setCourses(data)
//                 setLoading(false)
//               });
//         })
//         .catch(err => {
//             // Handle error if the user rejects the connection request
//             console.error(err);
//         });
//   } else {
//       alert('Please install an another Ethereum wallet.');
//   }
// }