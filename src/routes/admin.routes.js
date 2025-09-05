import { Router } from "express";
import { 
  registerAdmin, 
  loginAdmin, 
  logoutAdmin, 
  refreshAccessToken, 
  changePassword, 
  changeEmail
} from "../controller/admin.controller.js";
import { addStudent,deleteStudent } from "../controller/addNewstudent.controller.js";
import { addPublication, deletePublication } from "../controller/addpublication.controller.js";
import { verifyJwt } from "../middlewares/admin.middleware.js";
import { addAnnouncement, deleteAnnouncement } from "../controller/addannouncement.controller.js";
import { addLink, deleteLink } from "../controller/usefullink.controller.js";
const router = Router();

router.post("/register", registerAdmin);


router.post("/login", loginAdmin);

router.post("/addstudent",verifyJwt,addStudent)

router.post("/deletestudent/:id",verifyJwt,deleteStudent);


router.post("/addpublication", verifyJwt, addPublication);
router.delete("/publication/:id", verifyJwt, deletePublication);

router.post("/addannouncement", verifyJwt, addAnnouncement);
router.delete("/deleteannouncement/:id", verifyJwt, deleteAnnouncement);

router.post("/addlink", verifyJwt, addLink);
router.delete("/deletelink/:id", verifyJwt, deleteLink);


export default router;
