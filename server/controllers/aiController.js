import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

//----------------------------------------------------------------------------------------



// controller for enhancing a resume's professional summary
// post: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async(req,res) =>{
    try{
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message: "Content is required"});
        }

        const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
         messages: [
        {   role: "system",
            content: "You are a professional resume writer. Your task is to enhance the professional summary section of a resume based on the user's input. Provide a polished, concise, and impactful summary that highlights key skills, experiences, and career objectives." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

//----------------------------------------------------------------------------------------
//controller for enhancing a resume's job description
// post: /api/ai/enhance-job-desc

export const enhanceJobDescription = async(req,res) =>{
    try{
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message: "Content is required"});
        }

        const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
         messages: [
        {   role: "system",
            content: `You are a professional resume writer. 
                      Your task is to enhance the job description section of a resume based on the user's
                      input.THe job description should only be in 1-2 sentences also highlighting key responsibilities 
                      and achievements. Use action verbs and qualifiable results where possible. Make it ATS friendly.`
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

//----------------------------------------------------------------------------------------
//controller function for uploading a resume to the database
// post: /api/ai/upload-resume


export const uploadResume = async(req,res) =>{
    try{
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: "Resume text is required"});
        }

         const systemPrompt = `You are an expert AI agent to extract data from resumes.`
        
        const userPrompt = `
            Extract data from this resume text and return ONLY a valid JSON object (no extra text).

            Rules:
            - Every text field must be a STRING
            - skills must be an ARRAY OF STRINGS
            - experience/project/education must be ARRAYS of objects
            - Do NOT include keys like "type" or "default"

            Return JSON exactly like this shape:

            {
            "professional_summary": "",
            "skills": ["", ""],
            "personal_info": {
                "image": "",
                "full_name": "",
                "profession": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": ""
            },
            "experience": [
                {
                "company": "",
                "position": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "is_current": false
                }
            ],
            "project": [
                {
                "name": "",
                "type": "",
                "description": ""
                }
            ],
            "education": [
                {
                "institution": "",
                "degree": "",
                "field": "",
                "graduation_date": "",
                "gpa": ""
                }
            ]
            }

            Resume text:
            ${resumeText}
    `;

         //Ai generated response
        const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
         messages: [
        {   role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: userPrompt,
        },
    ],
     response_format: {type: "json_object" }
        })
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
         
        //create a new resume in the database
        const newResume = await Resume.create({userId, title,...parsedData});

        //now send the response
         res.json({resumeId: newResume._id})
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}
