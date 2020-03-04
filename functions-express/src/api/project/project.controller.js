const { db } = require("../../db");
const controller = {};

controller.createProject = (req, res, next) => {
  db.collection("projects")
    .add({
      ...req.body.project,
      archived: false
    })
    .then(ref => res.json({ success: true, data: ref.id }))
    .catch(e => res.json({ success: false, error: e }));
};

controller.getProjects = (req, res, next) => {
  db.collection("projects")
    .where("userId", "==", req.query.userId)
    .where("archived", "==", false)
    .get()
    .then(snapShot => {
      let projects = [];
      snapShot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        projects.push(obj);
      });

      return res.json({ success: true, data: projects });
    })
    .catch(e => res.json({ success: false, error: e, data: {} }));
};

controller.getCurrentFiles = (req, res, next) => {
  db.collection("latestSnaps")
    .where("projectId", "==", req.query.projectId)
    .get()
    .then(snapShot => {
      let obj;
      snapShot.forEach(doc => {
        obj = doc.data();
        obj.id = doc.id;
      });
      return res.json({ success: true, data: obj });
    })
    .catch(e => res.json({ success: false, error: e }));
};

controller.getHistoryFiles = (req, res, next) => {
  db.collection("snapHistory")
    .where("projectId", "==", req.query.projectId)
    .get()
    .then(snapShot => {
      let objs = [];
      snapShot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        objs.push(obj);
      });
      return res.json({ success: true, data: objs });
    })
    .catch(e => res.json({ success: false, error: e }));
};

controller.createLatestSnap = async (req, res, next) => {
  console.log("came here");
  try {
    console.log(JSON.stringify(req.body.project));
    await db
      .collection("latestSnaps")
      .doc(req.body.project.projectId)
      .set(req.body.project, { merge: true });
    console.log("latest snaps saved");
    return res.json({ success: true, data: {} });
  } catch (e) {
    console.log("exception occured " + JSON.stringify(e));
    return res.json({ success: false, error: e });
  }
};

controller.addSnapHistory = async (req, res, next) => {
  console.log("came here");
  // let filtered = ;
  try {
    await Promise.all(
      req.body.snaps
        .filter(snap => snap.new && snap.projectId)
        .map(snap => {
          snap.new = false;
          console.log(snap);
          return db
            .collection("snapHistory")
            .doc(snap.time + snap.projectId)
            .set(snap);
        })
    );
    return res.json({ success: true, data: {} });
  } catch (e) {
    console.log("exception thrown");
    console.log(e);
    return res.json({ success: false, error: e });
  }
};

controller.archiveProject = async (req, res, next) => {
  try {
    await db
      .collection("projects")
      .doc(req.params.id)
      .update({ archived: true });
    return res.json({ success: true, data: {} });
  } catch (e) {
    console.log("error occured");
    return res.json({ success: false, error: e });
  }
};

controller.unarchiveProject = async (req, res, next) => {
  try {
    await db
      .collection("projects")
      .doc(req.params.id)
      .update({ archived: false });
    return res.json({ success: true, data: {} });
  } catch (e) {
    console.log("error occured");
    return res.json({ success: false, error: e });
  }
}

controller.getArchivedProjects = async (req, res, next) => {
  db.collection("projects")
    .where("userId", "==", req.query.userId)
    .where("archived", "==", true)
    .get()
    .then(snapShot => {
      let projects = [];
      snapShot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        projects.push(obj);
      });

      return res.json({ success: true, data: projects });
    })
    .catch(e => res.json({ success: false, error: e, data: {} }));
}

module.exports = {
  controller: controller
};
