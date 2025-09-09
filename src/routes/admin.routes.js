import { Router } from "express";
import { 
  registerAdmin, 
  loginAdmin, 
  logoutAdmin, 
  refreshAccessToken, 
  changePassword, 
  changeEmail,getAllpeople,forgotPassword
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
import { addLogo, deleteLogo, getAllLogos } from "../controller/logo.controller.js";
import { addFaculty, getAllFaculty, updateFaculty, deleteFaculty } from "../controller/faculty.controller.js";
import { addImage, getAllImages, deleteImage } from "../controller/gallery.controller.js";
const router = Router();

router.post("/register", registerAdmin);


router.post("/login", loginAdmin);
router.get("/getAllpeople",getAllpeople)
router.post("/addstudent",addStudent)
router.get("/getAllStudent",getAllStudent)
router.post("/deletestudent/:id",deleteStudent);
router.get("/getAllAnnouncement",getAllAnnouncement)
router.get("/getAllUsefullLinks",getAllUsefullLinks)
router.post("/addpublication",addPublication);
router.post("/publication/:id", deletePublication);
router.get("/publications",getAllPublication);
router.post("/forgetPassword",forgotPassword)
router.post("/addannouncement", addAnnouncement);
router.post("/deleteannouncement/:id",deleteAnnouncement);

router.post("/addlink", addLink);
router.post("/deletelink/:id", deleteLink);

router.post("/research-areas", addResearchArea);
router.get("/research-areas", getAllResearchAreas);
router.post("/research-areas/:id", deleteResearchArea);

router.post("/gallery", addImage);        
router.get("/gallery", getAllImages);     
router.post("/gallery/:id", deleteImage); 


router.post("/faculty", addFaculty);
router.get("/faculty", getAllFaculty);      
router.put("/faculty/:id", updateFaculty);  
router.post("/faculty/:id", deleteFaculty); 

router.post("/logo", addLogo);
router.get("/logo", getAllLogos);
router.post("/logo/:id", deleteLogo);

export default router;
