const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const auth = require("../../middleware/auth");

router.get('/', auth.isLoggedIn, async (req,res)=>{
    try {
        await Project.findAll().then(projects => {
           return res.status(200).json(projects);
        }).catch(err => console.log(err));
     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
})

//am folosit tilul pentru ca nu stiu despre ce id vorbeai, o sa inlocuim titlul cu idul ala unic
// router.get('/:title',(req,res)=>{
//     const { title } = req.params; 
//     const foundProject= projects.find((project)=>project.title===title)
//     res.send(foundProject)
// })

// router.delete('/:title',(req,res)=>{
//     const { title } = req.params; 
//     projects=projects.filter((project)=>project.title!==title)
//     res.send(`Project with the title ${title} deleted from the database`)
// })


router.post('/', auth.isMP, async (req, res) => {
    const payload = { title, description, repository, user_id, bug_id } = req.body;

    try {
        await Project.create(payload);
        return res.status(200).json({ msg: "Succes" } );
    } catch (error) {
        return res.status(500).json(error);
    }
});

// router.patch('/:title', auth.isMP, (req,res)=>{
//     const {title}=req.params;
//     const { description, repository, user_id, bug_id }=req.body;
//     const projectToBeUpdated = projects.find((project) => project.title === title);
//     if (description) projectToBeUpdated.description = description;
//     if (repository) projectToBeUpdated.repository = repository;
//     if (user_id) projectToBeUpdated.user_id = user_id;
//     if (bug_id) projectToBeUpdated.bug_id = bug_id;
//     res.send(`Porject with the title ${title} has been updated`);

//     // const { title, description, repository, user_id, bug_id } = req.body;

//     // primim proiectu din baza de date, dupa id
//     // primim din request fieldul sau field-urile pe care vrem sa facem modificari
//     // facem o functie care realizeaza update-ul
//     // const payload = {
//     //     title?: title,
//     //     description?: description,
//     //     repository?: repository,
//     //     user_id?: user_id,
//     //     bug_id?: bug_id,
//     // }

//     // try {
//     //     const payload = {
//     //         title: title,
//     //         description: description,
//     //         repository: repository,
//     //         user_id: user_id,
//     //         bug_id: bug_id,
//     //     }

//     //     await Project.create(payload);
//     //     return res.status(200).json({ msg: "Succes" } );
//     // } catch (error) {
//     //     return res.status(500).json(error);
//     // }
// })
module.exports = router;