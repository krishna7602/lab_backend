import { Router } from "express";
import { 
  registerAdmin, 
  loginAdmin, 
  logoutAdmin, 
  refreshAccessToken, 
  changePassword, 
  changeEmail,getAllpeople
} from "../controller/admin.controller.js";
import { addStudent,deleteStudent,getAllStudent } from "../controller/addNewstudent.controller.js";
import { addPublication, deletePublication, getAllPublication } from "../controller/addpublication.controller.js";
import { verifyJwt } from "../middlewares/admin.middleware.js";
import { addAnnouncement, deleteAnnouncement,getAllAnnouncement } from "../controller/addannouncement.controller.js";
import { addLink, deleteLink,getAllUsefullLinks } from "../controller/usefullink.controller.js";
import {
  addResearchArea,
  getAllResearchAreas,
  deleteResearchArea,
} from "../controller/researchrea.controller.js";
import { addImage, getAllImages, deleteImage } from "../controller/gallery.controller.js";
const router = Router();

router.post("/register", registerAdmin);


router.post("/login", loginAdmin);
router.get("/getAllpeople",getAllpeople)
router.post("/addstudent",verifyJwt,addStudent)
router.get("/getAllStudent",getAllStudent)
router.post("/deletestudent/:id",verifyJwt,deleteStudent);
router.get("/getAllAnnouncement",getAllAnnouncement)
router.get("/getAllUsefullLinks",getAllUsefullLinks)
router.post("/addpublication", verifyJwt, addPublication);
router.post("/publication/:id", verifyJwt, deletePublication);
router.get("/publications",getAllPublication);

router.post("/addannouncement", verifyJwt, addAnnouncement);
router.post("/deleteannouncement/:id", verifyJwt, deleteAnnouncement);

router.post("/addlink", verifyJwt, addLink);
router.post("/deletelink/:id", verifyJwt, deleteLink);

router.post("/research-areas", addResearchArea);
router.get("/research-areas", getAllResearchAreas);
router.post("/research-areas/:id", deleteResearchArea);

router.post("/gallery", addImage);        
router.get("/gallery", getAllImages);     
router.post("/gallery/:id", deleteImage); 


export default router;
