const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const auth = require("../../middleware/auth");
const db = require("../../config/db");
const ProjectsUsers = require("../../models/ProjectsUsers");

router.get('/', auth.isLoggedIn, async (req,res) => {
    // return res.status(200).json(await ProjectTeam.findAll());
    try {
        await Project.findAll()
            .then(projects => {
               return res.status(200).json(projects);
            })
            .catch(err => console.log(err));
     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
});

router.post('/teams', auth.isMP, async (req, res)=>{
    const payload = { user_id, project_id } = req.body;
    try {
        await ProjectsUsers.create(payload);
        return res.status(200).json({msg: "Success"});
     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
});

router.get('/teams', auth.isMP, async (req,res)=>{
   return res.json(await ProjectsUsers.findAll());
   //  try {
   //      await ProjectsUsers.findAll().then(projects => {
   //         return res.status(200).json(projects);
   //      }).catch(err => console.log(err));
   //   } catch (error) {
   //      console.log(error);
   //      return res.status(500).json(error);
   //   }
});

router.get('/:projectId/team', auth.isLoggedIn, async (req,res) => {
    // return res.status(200).json(await ProjectTeam.findAll());
    try {
        await ProjectsUsers.findAll({where: req.body}).then(projects => {
           return res.status(200).json(projects);
        }).catch(err => console.log(err));

     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
});

//am folosit tilul pentru ca nu stiu despre ce id vorbeai, o sa inlocuim titlul cu idul ala unic
// router.get('/:title',(req,res)=>{
//     const { title } = req.params; 
//     const foundProject= projects.find((project)=>project.title===title)
//     res.send(foundProject)
// })

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 

    let proiect = await Project.findByPk(id);
    return res.send(proiect.destroy());
})


router.post('/', auth.isMP, async (req, res) => {
    const payload = { title, description, repository, bug_id } = req.body;

    try {
        await Project.create(payload);
        return res.status(200).json({ msg: "Succes" } );
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.patch('/:project_id', auth.isMP, async (req,res)=>{
    const { project_id } = req.params;
    const payload = { title, description, repository, bug_id } = req.body;
    const projectToBeUpdated = await Project.findByPk(project_id);

      // if (title) projectToBeUpdated.title = title;
      // if (description) projectToBeUpdated.description = description;
      // if (repository) projectToBeUpdated.repository = repository;
      // if (bug_id) projectToBeUpdated.bug_id = bug_id;

      console.log(payload);
   
    
   res.send(await projectToBeUpdated.update(payload));

    // const { title, description, repository, user_id, bug_id } = req.body;

    // primim proiectu din baza de date, dupa id
    // primim din request fieldul sau field-urile pe care vrem sa facem modificari
    // facem o functie care realizeaza update-ul
    // const payload = {
    //     title?: title,
    //     description?: description,
    //     repository?: repository,
    //     user_id?: user_id,
    //     bug_id?: bug_id,
    // }

    // try {
    //     const payload = {
    //         title: title,
    //         description: description,
    //         repository: repository,
    //         user_id: user_id,
    //         bug_id: bug_id,
    //     }

    //     await Project.create(payload);
    //     return res.status(200).json({ msg: "Succes" } );
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
})
module.exports = router;