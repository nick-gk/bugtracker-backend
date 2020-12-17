const express = require("express");
const router = express.Router();
let projects = [
  
];
router.get('/',(req,res)=>{
    res.send(projects);
})

//am folosit tilul pentru ca nu stiu despre ce id vorbeai, o sa inlocuim titlul cu idul ala unic
router.get('/:title',(req,res)=>{
    const {title} =req.params; 
    const foundProject= projects.find((project)=>project.title===title)
    res.send(foundProject)
})

router.delete('/:title',(req,res)=>{
    const { title } = req.params; 
    projects=projects.filter((project)=>project.title!==title)
    res.send(`Project with the title ${title} deleted from the database`)
})


router.post('/',(req,res)=>{
const project = req.body;
projects.push(project);
res.send(`Project ${project.title} added to the database`);
});

router.patch('/:title',(req,res)=>{
    const {title}=req.params;
    const {description,repository,user_id,bug_id }=req.body;
    const projectToBeUpdated = projects.find((project) => project.title === title);
    if (description) projectToBeUpdated.description = description;
    if (repository) projectToBeUpdated.repository = repository;
    if (user_id) projectToBeUpdated.user_id = user_id;
    if (bug_id) projectToBeUpdated.bug_id = bug_id;
    res.send(`Porject with the title ${title} has been updated`);
})
module.exports = router;