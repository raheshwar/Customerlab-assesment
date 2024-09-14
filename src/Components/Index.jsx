import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Drawer } from "antd";
import { GoDotFill } from "react-icons/go";
import { TiMinus } from "react-icons/ti";
import apiService from '../Components/service'
const LabForm = () => {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setselectedSchema] = useState([]);
  const [selected, setSelected] = useState('');

  const options = [{ Label: 'First Name', Value: 'first_name' },
  { Label: 'Last Name', Value: 'last_name' },
  { Label: 'Gender ', Value: 'gender' },
  { Label: 'Age ', Value: 'age' },
  { Label: 'Account Name ', Value: 'account_name' },
  { Label: 'City ', Value: 'city' },
  { Label: 'State ', Value: 'state' },
  ]
  const showDrawer = () => {
    setOpen(true);
  };
  const handleSchemaChange = (event) => {
    setSelected(event.target.value)

  };
  const handleSchemaChange1 = (event, index, schema) => {

    if (selectedSchema.includes(event.target.value)) {
      alert('Schema already added')
      let data =  []
      data = selectedSchema
      data[index] = schema
      setselectedSchema(data)

    } else {
      let data1 = [...selectedSchema];  
      data1[index] = event.target.value;
      setselectedSchema(data1); 
      setSelected(''); 
      
    }
  
};
const add = () => {
  if (selectedSchema.includes(selected)) {
    alert('Schema already added')
  } else {
    let data1 = []
    data1 = selectedSchema
    data1.push(selected)
    setselectedSchema(data1)
    setSelected('')
  }

}
useEffect(() => {
  console.log(selectedSchema)

}, [selectedSchema]);
const onClose = () => {
  setOpen(false);
};
const removeSchema=(index)=>{
  let data = [...selectedSchema]
  data.splice(index, 1);
  setselectedSchema(data);


}
const savesegment =async ()=>{

  if(!segmentName){
    return alert('Please enter segment name')}
    else if(!selectedSchema){
     return alert('Please Add atlease one schema')}

    
    else{
   let payloadSchma = []
   options.forEach(element => {
    if(selectedSchema.includes(element.Value)){
      payloadSchma.push(element)
    }
   });
  let payload =
    { 
      "segment_name": segmentName, 
      "schema": payloadSchma
      }
    
  
  const otpResponse = await apiService.saveSegment(payload);
  }
}
return (
  <div className=" ">
    <div className="bg-cyan-500 py-3 px-6 flex items-center gap-4 text-white">
      <i>
        <RiArrowLeftSLine className="font-medium h-10 w-6 mr-2 " />
      </i>
      <p className="text-base font-medium">View Audience</p>
    </div>
    <div className="border-2 text-gray-500 font-medium hover:bg-gray-300 hover:text-white border-gray-300 ml-28 text-center w-32 py-2 mt-10 ">
      <button type="primary" onClick={showDrawer}>
        Save Segment
      </button>
    </div>
    <Drawer
      title={
        <div className="flex  items-center w-full h-16 text-white bg-cyan-500 px-4  ">
          <i>
            <RiArrowLeftSLine className="font-medium h-10 w-6 mr-2 cursor-pointer" />
          </i>
          <p className="text-base font-medium">Saving Segment</p>
        </div>
      }
      onClose={onClose}
      closeIcon={false}
      open={open}
      width={"35%"}
    >
      <div className="">
        <h2 className="text-sm font-medium">Enter the Name of the Segmnet</h2>
        <input
          type="text"
          className="px-3 py-2 mt-3 border-2 border-gray-200  w-full"
          placeholder="Name of the Segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <p className="mt-5 text-sm font-medium">
          To Save your segment, your need to add the schemas to build the
          query
        </p>
        {selectedSchema.length > 0 &&
          <><div className="flex justify-end gap-3 mt-3">
            <p className="inline-flex items-center">
              <GoDotFill className="text-green-500" />
              -User Tracks
            </p>
            <p className="inline-flex items-center">
              <GoDotFill className="text-pink-500" />
              -Gorup Tracks
            </p>
          </div>
            <div className="mt-2 border-2  border-blue-400 p-2">
              {selectedSchema.map((schema, index) => (<div className="flex items-center mb-2">
                <i>
                <GoDotFill className={`text-${index % 2 === 0 ? 'pink' : 'green'}-500 mt-4 w-5`} />
                </i>
                <select
                  className="px-3 py-2 mt-5 border-2 border-gray-200 w-full"
                  placeholder="Name of the Segment"
                  value={schema}
                  onChange={(event) => handleSchemaChange1(event, index, schema)}


                >
                  {options.map((option, index) => (
                    <option key={index} value={option.Value}>
                      {option.Label}
                    </option>
                  ))}
                </select>
                <i>
                  <TiMinus onClick={(e)=>removeSchema(index)} className="bg-slate-200 mt-4 ml-3 cursor-pointer" />
                </i>
              </div>))}
            </div>
          </>

        }
        <div className="flex items-center mb-2">
          <i>
            <GoDotFill className="text-slate-200 mt-4 w-5" />
          </i>
          <select
            className="px-3 py-2 mt-5 border-2 border-gray-200 w-full"
            value={selected}
            onChange={(event) => handleSchemaChange(event)}


          >
            <option value=''>Add Schema to Segment </option>
            {options && options.length > 0 ? (
              options.map((option, index) => (
                <option key={index} value={option.Value}>
                  {option.Label}
                </option>
              ))
            ) : (
              <option value="" disabled>No options available</option>
            )}
          </select>
          {/* <i>
            <TiMinus className="bg-slate-200 mt-4 ml-4 cursor-pointer" />
          </i> */}
        </div>
        <a onClick={add} className="hover:underline transition duration-300 mt-3" >
          <span className="text-lg font-extrabold" >+</span> Add New Scema
        </a>

      </div>
      <div className="gap-3  flex items-center justify-start mt-20">
        <div className="bg-green-600 px-2 py-2 rounded-md font-medium text-white" onClick={savesegment}><button>Save to segment</button></div>
        <div className="border-2 border-red-500 px-4 py-2 font-medium rounded-md text-red-500 "><button>Cancel</button></div>

      </div>
    </Drawer>
  </div>
);
}
export default LabForm;
