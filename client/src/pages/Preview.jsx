import React from 'react'
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../configs/api';


const Preview = () => {
  const {resumeId} = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [resumeData, setResumeData] = React.useState(null);

  // function to load resume data based on resumeId

  const loadResume = async () =>{
   try{
     const {data} = await api.get(`/api/resumes/public/` + resumeId);
     setResumeData(data.resume);
 
   }catch(error){
     console.log(error.message)
   }finally{
    setIsLoading(false);
  }
}
  useEffect(() => {
    loadResume();
  }, []);

  return  resumeData ?(
    <div className='bg-slate-100'>
      <div className=' max-w-3xl mx-auto py-10'>
        {/* <ResumePreview resumeData={resumeData}  template ={resumeData.template} */}
        <ResumePreview data={resumeData}  template ={resumeData.template}
        accentColor={resumeData.accent_color}
        className='py-4 bg-white'/>
      </div>
    </div>
  ) :(
     <div>
      {isLoading ? <Loader/> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
          <a href="/" className='mt-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full
           px-6 h-9 m-1 ring-offset-1 ring-1 ring-purple-400 flex items-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4'/>  Go to home page
          </a>
        </div>
      )}
     </div>
  )
}

export default Preview
