import path from "path";
import { fileURLToPath, URL } from "url";

import { isSameYear } from "date-fns";
import fse from "fs-extra";
import { take, uniqueId } from "lodash-es";

const dbPath = fileURLToPath(
  new URL(path.join("..", "db", "toggl.json"), import.meta.url),
);

const db = fse.readJsonSync(dbPath);

// noinspection EqualityComparisonWithCoercionJS
const isEmpty = process.env.LOCAL_API_TOGGL_EMPTY == "true";

export function assignTogglRoutes(router) {
  router
    .get("/me", (req, res) => {
      const [firstUser] = db.users;
      const payload = {
        since: 1555774945,
        data: {
          ...firstUser,
          workspaces: db.workspaces,
        },
      };

      res.status(200).send(payload);
    })
    .get("/workspaces/:workspaceId/clients", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.clients),
    )
    .get("/workspaces/:workspaceId/projects", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.projects),
    )
    .get("/projects/:projectId/project_users", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.projectUsers),
    )
    .get("/workspaces/:workspaceId/tags", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.tags),
    )
    .get("/workspaces/:workspaceId/tasks", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.tasks),
    )
    .get("/details", (req, res) => {
      const { since } = req.query;
      const queryDate = new Date(since);

      const timeEntries = Object.values(db.timeEntries).filter(({ start }) =>
        isSameYear(queryDate, new Date(start)),
      );

      const payload = {
        total_grand: isEmpty === true ? 0 : 10000,
        total_billable: isEmpty === true ? 0 : 10000,
        total_currencies: [],
        total_count: isEmpty === true ? 0 : timeEntries.length,
        per_page: 50,
        data: isEmpty === true ? [] : take(timeEntries, 50),
      };

      res.status(200).send(payload);
    })
    .get("/workspaces/:workspaceId/groups", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.userGroups),
    )
    .get("/workspaces/:workspaceId/users", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.users),
    )
    .get("/workspaces", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.workspaces),
    )
    .get("/workspaces/:workspaceId/workspace_users", (req, res) =>
      res.status(200).send(isEmpty === true ? [] : db.workspaceUsers),
    );

  router
    .post("/clients", (req, res) => {
      const newClient = {
        id: +uniqueId("30"),
        wid: +req.body.wid,
        name: req.body.name,
        at: new Date().toLocaleString(),
      };

      res.status(200).send({ data: newClient });
    })
    .post("/projects", (req, res) => {
      const newProject = {
        id: +uniqueId("20"),
        wid: +req.body.wid,
        cid: +req.body.cid,
        name: req.body.name,
        billable: false,
        is_private: true,
        active: true,
        color: "5",
        at: new Date().toLocaleString(),
      };

      res.status(200).send({ data: newProject });
    })
    .post("/tags", (req, res) => {
      const newTag = {
        id: +uniqueId("40"),
        wid: +req.body.wid,
        name: req.body.name,
      };

      res.status(200).send({ data: newTag });
    })
    .post("/tasks", (req, res) => {
      const [workspace] = db.workspaces;
      const newTask = {
        id: +uniqueId("70"),
        pid: +req.body.pid,
        wid: +workspace.id,
        name: req.body.name,
        active: true,
        estimated_seconds: 0,
      };

      res.status(200).send({ data: newTask });
    })
    .post("/time_entries", (req, res) => {
      const { time_entry: entry } = req.body;
      const newTimeEntry = {
        id: +uniqueId("80"),
        pid: +entry.pid,
        wid: +entry.wid,
        description: entry.description,
        billable: entry.billable,
        duration: entry.duration,
        start: entry.start,
        tags: entry.tags,
      };

      res.status(200).send({ data: newTimeEntry });
    })
    .post("/groups", (req, res) => {
      const newUserGroup = {
        id: +uniqueId("50"),
        wid: +req.body.wid,
        name: req.body.name,
        at: new Date().toLocaleString(),
      };

      res.status(200).send({ data: newUserGroup });
    });

  router
    .delete("/clients/:clientId", (req, res) => res.status(200).send({}))
    .delete("/projects/:projectId", (req, res) => res.status(200).send({}))
    .delete("/tags/:tagId", (req, res) => res.status(200).send({}))
    .delete("/tasks/:taskId", (req, res) => res.status(200).send({}))
    .delete("/time_entries/:timeEntryId", (req, res) =>
      res.status(200).send({}),
    )
    .delete("/groups/:userGroupId", (req, res) => res.status(200).send({}))
    .delete("/project_users/:userId", (req, res) => res.status(200).send());
}
