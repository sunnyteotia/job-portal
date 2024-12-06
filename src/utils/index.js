import qs from 'query-string'
export const recruiterOnBoardFormControls=[
    {
        label:'Name',
        name:"name",
        placeholder:'Enter your name',
        componentType:'input'
    },
    {
        label:'Companny Name',
        name:"companyName",
        placeholder:'Enter your company name',
        componentType:'input'
    },
    {
        label:'Company Role',
        name:"companyRole",
        placeholder:'Enter your company role',
        componentType:'input'
    }
]
export const initialRecruiterFormData={
    name:'',
    companyName:'',
    companyRole:'',
}
export const candidateOnboardFormControls=[
    {
        label:'Resume',
        name:'resume',
        componentType:'file'
    },
    {
        label:'Name',
        name:"name",
        placeholder:'Enter your name',
        componentType:'input'
    },
    {
        label:'Current Company',
        name:"currentCompany",
        placeholder:'Enter your current comapny',
        componentType:'input'
    },
    {
        label:'Current Job Location',
        name:"currentJobLocation",
        placeholder:'Enter your current job location',
        componentType:'input'
    },
    {
        label:'Prefered Job Location',
        name:"preferedJobLocation",
        placeholder:'Enter your prefered job location',
        componentType:'input'
    },
    {
        label:'Current Salary',
        name:"currentSalary",
        placeholder:'Enter your current salary',
        componentType:'input'
    },
    {
        label:'Notice Period',
        name:"noticePeriod",
        placeholder:'Enter your notice period',
        componentType:'input'
    },
    {
        label:'Skills',
        name:"skills",
        placeholder:'Enter your skills',
        componentType:'input'
    },
    {
        label:'Previous Companies',
        name:"previousCompanies",
        placeholder:'Enter your previous companies',
        componentType:'input'
    },
    {
        label:'Total Experience',
        name:"totalExperience",
        placeholder:'Enter your total experience',
        componentType:'input'
    },
    {
        label:'College',
        name:"college",
        placeholder:'Enter your college',
        componentType:'input'
    },
    {
        label:'College Location',
        name:"collegeLocation",
        placeholder:'Enter your college location',
        componentType:'input'
    },
    {
        label:'Graduated Year',
        name:"graduatedYear",
        placeholder:'Enter your graduated year',
        componentType:'input'
    },
    {
        label:'Linkedin Profile',
        name:"linkedinProfile",
        placeholder:'Enter your linkedin profile',
        componentType:'input'
    },
    {
        label:'Github Profile',
        name:"githubProfile",
        placeholder:'Enter your github profile',
        componentType:'input'
    },
    
]
export const initialCandidateFormData={
    resume:"",
    name:'',
    currentCompany:'',
    currentJobLocation:'',
    preferedJobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}
export const initialCandidateAccountFormData={
    name:'',
    currentCompany:'',
    currentJobLocation:'',
    preferedJobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}
export const postNewJobFormControls=[
    {
    label:'Company Name',
        name:"companyName",
        placeholder:'Company name',
        componentType:'input',
        disabled:true
    },
    {
        label:'title',
            name:"title",
            placeholder:'Job title',
            componentType:'input'
    },
    {
            label:'Type',
            name:"type",
            placeholder:'Job Type',
            componentType:'input'
    },
    {
        label:'Location',
            name:"location",
            placeholder:'Job Location',
            componentType:'input'
        },
        {
            label:'Experience',
                name:"experience",
                placeholder:'Experience',
                componentType:'input'
            }
        ,{
            label:'Description',
                name:"description",
                placeholder:'Description',
                componentType:'input'
        },
        {
            label:'Skills',
                name:"skills",
                placeholder:'Skills',
                componentType:'input'
        },
]
export const intialPostNewJobFormData={
    companyName:"",
    title:'',
    type:'',
    location:'',
    experirence:'',
    description:'',
    skills:'',
    recruiterId:""
}
export const filterMenuDataArray=[
    {
    id:'companyName',
    label:'Company Name',
    },
    {
        id:'title',
        label:'Title',
    },
    {
        id:'type',
        label:'Type',
    },
    {
        id:'location',
        label:'Location',
    },

]
export function formUrlQuery({params,dataToAdd}){
let currentUrl=qs.parse(params);
 if(Object.keys(dataToAdd).length>0){
    Object.keys(dataToAdd).map((key)=>{
        if(dataToAdd[key].length===0)delete currentUrl[key];
        else currentUrl[key]=dataToAdd[key].join(",")
    });
 }
 return qs.stringifyUrl({
    url:window.location.pathname,
    query:currentUrl,
 },
 {
    skipNull:true,
 }
)
}
export const membershipPlans=[
    {
        heading:'Tier 1',
        price:100,
        type:'basic'
    },
    {
        heading:'Tier 2',
        price:1000,
        type:'teams'
    },
    {
        heading:'Tier 3',
        price:5000,
        type:'enterprise'
    },
]