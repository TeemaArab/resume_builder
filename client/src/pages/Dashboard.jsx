import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon,XIcon } from 'lucide-react'
import React, { useState, useEffect, use } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const colors =["#9333ea", "#d97706", "#dc2626","#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume,setResume]= useState(null)
  const [editResumeId,setEditResumeId]= useState('')

  const navigate = useNavigate();

  const loadAllResumes = async()=>{
    //load resumes logic here
    setAllResumes(dummyResumeData)
  }


   const createResume = async(event)=>{
    event.preventDefault()
    //create resume logic here
    setShowCreateResume(false)
    navigate(`/app/builder/resume123`)
   
   }

   const uploadResume = async(event)=>{
    event.preventDefault()
    
   }

// edit resume title function
   const editTitle = async(event)=>{
    event.preventDefault()
    setEditResumeId('')
   }

 
   // delete resume function
    const deleteResume = async(resumeId)=>{
      // delete resume logic here
      const confirm = window.confirm("Are you sure you want to delete this resume?")
      if(confirm){
        setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
      }
    }

  //to execute function
  useEffect(()=>{
    loadAllResumes()
  },[])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
       <p className='text-2xl font-medium mb-6 bg-gradient-to-r from slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome to your dashboard, Fatima Arab!</p>

       <div className='flex gap-4'>
          <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'> Create Resume</p>
          </button>

           <button onClick={()=>setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-indigo-500 text-white rounded-full'/>
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'> Upload Existing</p>
          </button>
       </div>


       <hr className='border-slate-300 my-6 sm:w-[305px]' />

{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
{/*  list of available resume */}
       <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume,index)=>{
            const baseColor = colors[index % colors.length];
            return(

              // nvigate is used to go to special user's resume page
              <button key={index} onClick ={()=>navigate(`/app/builder/${resume.id}`)} className= ' relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border group hover:shadow-lg transition-all duration-300 cursor-pointer'
               style={{background:`linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40'}}>

                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all ' style={{color: baseColor}} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color: baseColor}}>{resume.title}</p>

                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color: baseColor + '90'}}>Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>
                
                <div onClick={e => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                 <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                 <PencilIcon  onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                </div>
              </button>
            )
          })}
       </div>
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

       {/* code for create and upload resume modals box */}
       {showCreateResume &&(
         <form  onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70  backdrop-blur bg-opacitiy-50 z-10 flex items-center justify-center'>
             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create Resume</h2>
              <input  onChange={(e)=>setTitle(e.target.value )} value={title}type="text" placeholder='enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>
              <button className='w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors' >Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors '  onClick={()=>{setShowCreateResume(false); setTitle('')}}/>
             </div>
         </form>
       )
       }
{/* ---------------------------------------------------------------------------------------------------------- */}
       {/*  this  section is for uploading resume */}

       {showUploadResume &&(
        <form  onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/70  backdrop-blur bg-opacitiy-50 z-10 flex items-center justify-center'>
             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>upload Resume</h2>
              <input  onChange={(e)=>setTitle(e.target.value )} value={title} type="text" placeholder='enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>

                <div>
                  {/* Box for uploading resume from your pc or .. */}
                  <label htmlFor="resume-input" className='block text-sm text-slate-700'> Select resume file
                     <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10
                      my-4 hover:border-purple-500 hover:text-purple-700 cursor-pointer transition-colors'>
                        {resume ?(
                          <p className='text-sm text-purple-700'>{resume.name}</p>
                        ):(
                            <>
                             <UploadCloud className='size-14 stroke-1' />
                              <p className='text-sm'>Upload resume</p>
                            </>
                          )
                        }

                     </div>
                  </label>
                  <input type="file" id='resume-input' accept='.pdf' hidden 
                  onChange={(e)=>setResume(e.target.files[0])} />
                </div>
              <button className='w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors' >Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors '  onClick={()=>{setShowUploadResume(false); setTitle('')}}/>
             </div>
         </form>
       )
       }
     {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
      {/* this section is for edit icon of each available resume */}
        {editResumeId &&(
         <form  onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70  backdrop-blur bg-opacitiy-50 z-10 flex items-center justify-center'>
             <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input  onChange={(e)=>setTitle(e.target.value )} value={title}type="text" placeholder='enter resume title' className='w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600 ' required/>
              <button className='w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors' >Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors '  onClick={()=>{setEditResumeId(''); setTitle('')}}/>
             </div>
         </form>
       )
       }
      </div>
    </div>
  )
}

export default Dashboard
