const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const auth = require("../../middleware/auth");
const db = require("../../config/db");
const ProjectsUsers = require("../../models/ProjectsUsers");
const { sequelize } = require("../../models/Project");
const User = require("../../models/User");
const { roles } = require("../../shared/constants");

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

router.post('/:project_id/tst', auth.isTST, async (req, res) => {
   const payload = { project_id } = req.params;
   payload.user_id = req.user.id;
   try {
       await ProjectsUsers.create(payload);
       return res.status(200).json({msg: "Success"});
    } catch (error) {
       console.log(error);
       return res.status(500).json(error);
    }
});

router.get('/:project_id/team/testerii', auth.isLoggedIn, async (req,res) => {
    // return res.status(200).json(await ProjectTeam.findAll());

    const { project_id } = req.params;
    try {
        await ProjectsUsers.findAll({
           where: { project_id: project_id }
         }).then(async (projects) => {
            let ids = [];
            projects.forEach(project => ids.push(+project.get().user_id));
            let users = await User.findAll({ where: { id: [...ids], role: roles.TST } });
            return res.status(200).json(users);
        }).catch(err => console.log(err));
     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
});

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

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    let proiect = await Project.findByPk(id);
    return res.send(proiect.destroy());
});

router.post('/', auth.isMP, async (req, res) => {
    const payload = { title, description, repository, bug_id } = req.body;
    try {
        await Project.create(payload);
        return res.status(200).json({ msg: "Succes" } );
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.patch('/:project_id', auth.isMP, async (req,res) => {
    const { project_id } = req.params;
    const payload = { title, description, repository, bug_id } = req.body;
    const projectToBeUpdated = await Project.findByPk(project_id);
    res.send(await projectToBeUpdated.update(payload));
})
module.exports = router;