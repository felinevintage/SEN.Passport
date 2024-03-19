var express = require("express");
var router = express.Router();
var models = require("../models");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mime = require("mime-types");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const childMustExist = require("../guards/childMustExist");
const mustHaveChildPermission = require("../guards/mustHaveChildPermission");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

//POST new child
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  const { user } = req;
  const {
    firstname,
    lastname,
    diagnoses,
    school_support,
    home_support,
    specialists,
    medication,
    education,
    aids,
    dateofbirth,
    emergency_contact,
    profileImage,
  } = req.body;

  try {
    const child = await user.createChild({
      firstname: firstname,
      lastname: lastname,
      diagnoses: diagnoses,
      school_support: school_support,
      home_support: home_support,
      specialists: specialists,
      medication: medication,
      education: education,
      aids: aids,
      dateofbirth: dateofbirth,
      emergency_contact: emergency_contact,
      profileImage: profileImage,
    });
    res.send(child);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET child
router.get(
  "/:id",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async function (req, res, next) {
    const { child } = req;

    try {
      res.send(child);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/* GET all assessments of one child */
router.get(
  "/:id/assessments",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const childId = child.id;
    try {
      const assessments = await models.Assessments.findAll({
        where: {
          childId,
        },
      });
      res.send(assessments);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/* POST assessment for one specific child */
router.post(
  "/:id/assessments",
  [
    userShouldBeLoggedIn,
    childMustExist,
    mustHaveChildPermission,
    upload.single("file"),
  ],
  async (req, res) => {
    const { child } = req;
    const file = req.file;
    const { assessment_type, date } = req.body;
    const extension = mime.extension(file.mimetype);
    const newFilename = uuidv4() + "." + extension;
    const tmpPath = file.path;
    const targetPath = path.join(__dirname, "../uploads/") + newFilename;
    try {
      await fs.rename(tmpPath, targetPath);

      const assessment = await child.createAssessment({
        assessment_type: file.originalname,
        date: date,
        results_doc: newFilename,
      });
      res.send(assessment);
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
);

/* GET assessment by id for one specific child */
router.get(
  "/:id/assessments/:assessId",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const childId = child.id;
    const id = req.params.assessId;
    try {
      const assessment = await models.Assessments.findOne({
        where: {
          childId,
          id,
        },
      });
      if (assessment === null) {
        res.status(404).send("This assessment does not exist.");
      } else {
        const filename =
          path.join(__dirname, "../uploads/") + assessment.results_doc;
        const data = await fs.readFile(filename);

        res.set("Content-Type", mime.lookup(filename)).send(data);
      }
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
);

/* DELETE assessment by id */
router.delete(
  "/:id/assessments/:assessId",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const id = req.params.assessId;
    try {
      const assessment = await models.Assessments.destroy({
        where: {
          id,
        },
      });
      if (!assessment) {
        res.status(404).send("This assessment does not exist.");
      } else {
        res.send({ success: true });
      }
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
);

/* GET all documents of one child */
router.get(
  "/:id/documents",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const childId = child.id;
    try {
      const documents = await models.Documents.findAll({
        where: {
          childId,
        },
      });
      res.send(documents);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/* POST document for one specific child */
router.post(
  "/:id/documents",
  [
    userShouldBeLoggedIn,
    childMustExist,
    mustHaveChildPermission,
    upload.single("file"),
  ],
  async (req, res) => {
    const { child } = req;

    // we can use the doc_name to type the name we want to appear on the database or the originalname to use the file name
    // const { doc_name } = req.body;
    const file = req.file;
    // console.log(file); // Do this to see all the data it contains
    const extension = mime.extension(file.mimetype);
    // file.filename is the name that is going to have the file in the uploads folder
    const newFilename = uuidv4() + "." + extension;
    const tmpPath = file.path;
    const targetPath = path.join(__dirname, "../uploads/") + newFilename;
    try {
      await fs.rename(tmpPath, targetPath);
      const document = await child.createDocument({
        doc_name: file.originalname,
        document: newFilename,
      });
      res.send(document);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error });
    }
  }
);

/* GET document by id for one specific child */
router.get(
  "/:id/documents/:docId",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const childId = child.id;
    const id = req.params.docId;
    try {
      const document = await models.Documents.findOne({
        where: {
          childId,
          id,
        },
      });
      if (!document) {
        res.status(404).send("This document does not exist.");
      } else {
        const filename =
          path.join(__dirname, "../uploads/") + document.document;
        const data = await fs.readFile(filename);

        res.set("Content-Type", mime.lookup(filename)).send(data);
      }
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
);

/* DELETE document by id */
router.delete(
  "/:id/documents/:docId",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    try {
      const document = await models.Documents.destroy({
        where: {
          id: req.params.docId,
        },
      });
      if (!document) {
        res.status(404).send("This document does not exist.");
      } else {
        res.send({ success: true });
      }
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
);





module.exports = router;
