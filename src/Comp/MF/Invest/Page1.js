import React from 'react';
import "./Purchase-Invest.css"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
// import axios from "axios";

const DropdownMenu = () => {
  const nav = useNavigate();
  const [amcCodes, setAmcCodes] = useState([]);
  const [schemeTypes, setSchemeTypes] = useState([]);
  const [selectedAMCCode, setSelectedAMCCode] = useState('');
  const [selectedSchemeType, setSelectedSchemeType] = useState('');
  const [selectedSchemeName, setSelectedSchemeName] = useState('');
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/mutualfunds/get_schemes')
      .then(response => response.json())
      .then(data => {
        if (data.amc_codes) {
          setAmcCodes(data.amc_codes);
        }
        if (data.scheme_types) {
          setSchemeTypes(data.scheme_types);
        }
        console.log(data.amc_codes);
      })
      .catch(error => console.error(error));
  }, []);

  const fetchSchemes = () => {
    if (!selectedAMCCode || !selectedSchemeType) {
      fetch('http://127.0.0.1:5000/mutualfunds/get_schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheme_name: selectedSchemeName
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.scheme) {
          setSchemes(data.scheme);
          nav("/Page2", { state: { results: data.scheme } });
        }
      })
      .catch(error => console.error(error));
    }
    else{
      fetch('http://127.0.0.1:5000/mutualfunds/get_schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amc_code: selectedAMCCode,
          scheme_type: selectedSchemeType,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.schemes) {
            setSchemes(data.schemes);
            nav("/Page2", { state: { results: data.schemes } });
          }
        })
        .catch(error => console.error(error));
    };
  }
  

  const handleAMCCodeChange = event => {
    setSelectedAMCCode(event.target.value);
  };

  const handleSchemeTypeChange = event => {
    setSelectedSchemeType(event.target.value);
  };

  const handleSchemeNameChange = event => {
    setSelectedSchemeName(event.target.value);
  };

// export default function Page1() {
//   const nav = useNavigate();
//     const [results, setresults] = useState([]);
//     const [AMC, setAMC] = useState('');
//     const [nature, setnature] = useState('');
//     const [category, setcategory] = useState('');
//     const [name, setname] = useState('');
//     const [options, setOptions] = useState([]);


  //   const [api, setapi] = useState("http://127.0.0.1:5000//mutualfunds/get_schemes");
  //   useEffect(() => {
  //       fetch(api)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           const input1Options = [...new Set(data.map((item) => item.postId))];
  //           const input2Options = [...new Set(data.map((item) => item.name))];
  //           const input3Options = [...new Set(data.map((item) => item.email))];
  //           const input4Options = [...new Set(data.map((item) => item.body))];
  //           setOptions([input1Options, input2Options, input3Options, input4Options]);
  //         })
  //     }, [api]);
  //       function changeAMC(i){
            
  //           setAMC(i);
  //           let a = api ;
  //              setapi("http://127.0.0.1:5000//mutualfunds/get_schemes");
               
  //       }
  
          
        
  //       function changenature(i) {
           
  //         setnature(i);
  //         let a = api ;
      
  //         setapi(a + `&name=${i}`);
          
  //       }
  //       function changecategory(i){
           
  //         setcategory(i);
  //         let a = api ;
  //         setapi(a + `&email=${i}`);
  
  //     }
  
  
  // function changename(i) {
  //   setname(i);
  //         let a = api ;
  //         setapi(a +`&body=${i}`);
  
  //       }
        
  //       let Search = () => {
  //         fetch(api)
  //           .then(response => response.json())
  //           .then(json => {
  //             setresults(json);
  //             nav("/Page2", { state: { results: json } });


  //           })


  //       };
              
  return (
    <div>        <div>
    <label className='label'>
      Select AMC:<br /> <br /> 
      <select className = "textip" value={selectedAMCCode} onChange={handleAMCCodeChange}> <option value="">Select an option</option>
      {amcCodes.map(code => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
    </select>
    </label> <br />

    <label className='label'>
      Select Nature:<br /> <br /> 
      <select className = "textip" value={selectedSchemeType} onChange={handleSchemeTypeChange}><option value="">Select an option</option>
      {schemeTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        </select> 
    </label><br /><br /><br />

    <label className='label'>
     Search Scheme Name:<br /><br />
     <input type='text' value={selectedSchemeName} onChange={handleSchemeNameChange}></input>
     {/* <select className = "textip"><option value="">Select an option</option>
     {schemes.map(scheme => (
         <option key={scheme.scheme_name} value={scheme.scheme_name}>
           {scheme.scheme_name}
         </option>
       ))}
     </select> */}
    </label><br /><br /><br />
    <button onClick={fetchSchemes}>Get Schemes</button> <br /> <br />
    {/* <label className='label'>
      Select Category:<br /><br />
      <select className = "textip" type="text" value={scheme_sub_type} onChange={(e) => handleSchemeSubTypeChange(e.target.value)}><option value="">Select an option</option>
      {options[2]?.map((option,index) => (
        <option key={index} value={option}>{option}</option>
      ))}</select> 
      </label><br /><br /><br /> */}

    {/* <label className='label'>
     Name:<br /><br />
     <select className = "textip"><option value="">Select an option</option>
     {schemes.map(scheme => (
         <option key={scheme.scheme_name} value={scheme.scheme_name}>
           {scheme.scheme_name}
         </option>
       ))}
     </select>
    </label> */}

       <br /> <br/><br /><br />
     <div> <br/><br/>
                 </div>
  </div>
           
    </div>
  )
}
export default DropdownMenu;