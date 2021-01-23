const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const auth = require("../../middleware/auth");
const db = require("../../config/db");
const ProjectsUsers = require("../../models/ProjectsUsers");
const { sequelize } = require("../../models/Project");
const User = require("../../models/User");
const { roles } = require("../../shared/constants");
const { route } = require("./auth");
const Bug = require("../../models/Bug");

router.post('/teams', auth.isLoggedIn, async (req, res)=>{
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

router.get('/:id/team/mps', auth.isLoggedIn, async (req,res)=>{
     try {
         await ProjectsUsers.findAll({
             where: { project_id: req.params.id}
         }).then(async projects => {
            let ids = [];
            projects.forEach(project => ids.push(+project.get().user_id));
            let users = await User.findAll({ where: { id: [...ids], role: roles.MP } });
            return res.status(200).json(users);
         }).catch(err => console.log(err));
      } catch (error) {
         console.log(error);
         return res.status(500).json(error);
      }
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

router.get('/:project_id/team/tsts', auth.isLoggedIn, async (req,res) => {
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
    const payload = { title, description, repository } = req.body;
    try {
        await Project.create(payload);
        res.status(200).json({ msg: "Succes" } );
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.patch('/:project_id', auth.isMP, async (req,res) => {
    const { project_id } = req.params;
    const payload = { title, description, repository, bug_id } = req.body;
    const projectToBeUpdated = await Project.findByPk(project_id);
    res.send(await projectToBeUpdated.update(payload));
});

router.get('/:project_id', auth.isLoggedIn, async (req,res) => {
    const { project_id } = req.params;
    const pr = await Project.findByPk(project_id);
    return res.status(200).json(pr);
});

router.post('/add-bug', auth.isTST, async(req, res) => {
    const payload = { severity, title, project_id, priority, foundOnCommit, status } = req.body;
    try {
        await Bug.create(payload);
        res.status(200).json({ msg: "Succes" } );
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/get-bugs/:project_id', auth.isLoggedIn, async(req, res) => {
    try {
        await Bug.findAll({
            where: {
                project_id: req.params.project_id
            }
        })
            .then(bugs => {
               return res.status(200).json(bugs);
            })
            .catch(err => console.log(err));
     } catch (error) {
        console.log(error);
        return res.status(500).json(error);
     }
})


module.exports = router;