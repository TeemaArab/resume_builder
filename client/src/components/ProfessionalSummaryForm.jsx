import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../configs/api.js'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

  const {token} = useSelector(state => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async()=>{
    try{
       setIsGenerating(true);
       const prompt = `Rewrite the following professional summary to be more formal, concise,
                       and recruiter-friendly.Do not add explanations, options, or headings.
                       Return ONLY the rewritten summary text. "${data}"`; 
       const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers:{Authorization:token}});
       setResumeData(prev =>({
        ...prev, professional_summary: response.data.enhancedContent
       }))
       setIsGenerating(false);
    }catch(error){
    toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false);
    }
  }
  return (
    <div className='space-y-4'>
       <div className='flex items-center justify-between'>
        {/* left side */}
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'> Add summary for your resume here</p>
        </div>

        {/* right side */}
        <button disabled={isGenerating} onClick={generateSummary} 
        className='flex items-center gap-2 px-3 py-1 text-sm bh-purple-100 text-purple-700 
        rounded hover:bg-purple-200 transition-colors disabled:capacity-50'>
          {isGenerating ? ( <Loader2 className="size-4 animate-spin" /> ) : (
            <Sparkles className='size-4 '/>)}
            {isGenerating ? 'Enhancing...' : 'AI Enhance'}
     
        </button>
       </div>

       <div className='mt-6'>
        <textarea value={data || ''} onChange={(e)=>onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring 
        focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
         placeholder=' Write a complelling professional summary that highligts your key strengths and career objectives ...'/>
          <p className='text-ex text-gray-500 max-w-4/5 mx-auto text-center'>Tip: keep it concise (3-5 sentences) and focus on your most relavent skills and experiences.</p>
       </div>
    </div>
  )
}

export default ProfessionalSummaryForm

