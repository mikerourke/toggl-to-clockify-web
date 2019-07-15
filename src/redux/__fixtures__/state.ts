/* eslint-disable */
// @ts-ignore
export default {
  app: {
    notifications: [],
    currentTransferType: "SINGLE",
    inTransferDetails: {
      countCurrentInGroup: 0,
      countTotalInGroup: 0,
      entityGroup: null,
      workspaceId: null,
    },
    countCurrentInWorkspace: 0,
    countTotalInWorkspace: 0,
    countCurrentOverall: 0,
    countTotalOverall: 0,
  },
  credentials: {
    togglEmail: "test-user@test.com",
    togglApiKey: "TOGGLAPIKEY",
    togglUserId: "6001",
    clockifyUserId: "clock-user-01",
    clockifyApiKey: "CLOCKIFYAPIKEY",
    isValid: true,
    isValidating: false,
  },
  entities: {
    clients: {
      clockify: {
        byId: {},
        idValues: [],
      },
      toggl: {
        byId: {
          "3001": {
            id: "3001",
            name: "Test Client A",
            workspaceId: "1001",
            linkedId: null,
            isIncluded: true,
            memberOf: "clients",
            entryCount: 3,
          },
          "3002": {
            id: "3002",
            name: "Test Client B",
            workspaceId: "1001",
            linkedId: null,
            isIncluded: true,
            memberOf: "clients",
            entryCount: 3,
          },
        },
        idValues: ["3001", "3002"],
      },
      isFetching: false,
    },
    projects: {
      clockify: {
        byId: {
          "clock-project-01": {
            id: "clock-project-01",
            name: "Test Project A",
            workspaceId: "clock-workspace-01",
            clientId: "clock-client-01",
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#ea468d",
            userIds: [],
            entryCount: 0,
            linkedId: "2001",
            isIncluded: true,
            memberOf: "projects",
          },
          "clock-project-02": {
            id: "clock-project-02",
            name: "Test Project B",
            workspaceId: "clock-workspace-01",
            clientId: "clock-client-02",
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#c56bff",
            userIds: [],
            entryCount: 0,
            linkedId: "2002",
            isIncluded: true,
            memberOf: "projects",
          },
          "clock-project-03": {
            id: "clock-project-03",
            name: "Test Project C",
            workspaceId: "clock-workspace-01",
            clientId: "",
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#04bb9b",
            userIds: [],
            entryCount: 0,
            linkedId: "2003",
            isIncluded: true,
            memberOf: "projects",
          },
          "clock-project-04": {
            id: "clock-project-04",
            name: "Test Project D",
            workspaceId: "clock-workspace-01",
            clientId: "",
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#04bb9b",
            userIds: [],
            entryCount: 0,
            linkedId: "2004",
            isIncluded: true,
            memberOf: "projects",
          },
          "clock-project-05": {
            id: "clock-project-05",
            name: "Test Project E",
            workspaceId: "clock-workspace-01",
            clientId: "",
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#205500",
            userIds: [],
            entryCount: 0,
            linkedId: "2005",
            isIncluded: true,
            memberOf: "projects",
          },
          "clock-project-06": {
            id: "clock-project-06",
            name: "Test Project F",
            workspaceId: "clock-workspace-01",
            clientId: "",
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#a01aa5",
            userIds: [],
            entryCount: 0,
            linkedId: "2006",
            isIncluded: true,
            memberOf: "projects",
          },
        },
        idValues: [
          "clock-project-01",
          "clock-project-02",
          "clock-project-03",
          "clock-project-04",
          "clock-project-05",
          "clock-project-06",
        ],
      },
      toggl: {
        byId: {
          "2001": {
            id: "2001",
            name: "Test Project A",
            workspaceId: "1001",
            clientId: "3001",
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#ea468d",
            userIds: ["6001"],
            linkedId: "clock-project-01",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 3,
          },
          "2002": {
            id: "2002",
            name: "Test Project B",
            workspaceId: "1001",
            clientId: null,
            isBillable: false,
            isPublic: false,
            isActive: false,
            color: "#3750b5",
            userIds: ["6001"],
            linkedId: "clock-project-02",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 3,
          },
          "2003": {
            id: "2003",
            name: "Test Project C",
            workspaceId: "1001",
            clientId: null,
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#c56bff",
            userIds: ["6001"],
            linkedId: "clock-project-03",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 3,
          },
          "2004": {
            id: "2004",
            name: "Test Project D",
            workspaceId: "1001",
            clientId: null,
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#04bb9b",
            userIds: ["6001"],
            linkedId: "clock-project-04",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 3,
          },
          "2005": {
            id: "2005",
            name: "Test Project E",
            workspaceId: "1001",
            clientId: null,
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#205500",
            userIds: ["6001"],
            linkedId: "clock-project-05",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 4,
          },
          "2006": {
            id: "2006",
            name: "Test Project F",
            workspaceId: "1001",
            clientId: null,
            isBillable: false,
            isPublic: false,
            isActive: true,
            color: "#a01aa5",
            userIds: ["6001"],
            linkedId: "clock-project-06",
            isIncluded: true,
            memberOf: "projects",
            entryCount: 4,
          },
        },
        idValues: ["2001", "2002", "2003", "2004", "2005", "2006"],
      },
      isFetching: false,
    },
    tags: {
      clockify: {
        byId: {},
        idValues: [],
      },
      toggl: {
        byId: {
          "4001": {
            id: "4001",
            name: "tag-a",
            workspaceId: "1001",
            entryCount: 1,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4002": {
            id: "4002",
            name: "tag-b",
            workspaceId: "1001",
            entryCount: 1,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4003": {
            id: "4003",
            name: "tag-c",
            workspaceId: "1001",
            entryCount: 1,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4004": {
            id: "4004",
            name: "tag-d",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4005": {
            id: "4005",
            name: "tag-e",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4006": {
            id: "4006",
            name: "tag-f",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4007": {
            id: "4007",
            name: "tag-g",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4008": {
            id: "4008",
            name: "tag-h",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
          "4009": {
            id: "4009",
            name: "tag-i",
            workspaceId: "1001",
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "tags",
          },
        },
        idValues: [
          "4001",
          "4002",
          "4003",
          "4004",
          "4005",
          "4006",
          "4007",
          "4008",
          "4009",
        ],
      },
      isFetching: false,
    },
    tasks: {
      clockify: {
        byId: {},
        idValues: [],
      },
      toggl: {
        byId: {},
        idValues: [],
      },
      isFetching: false,
    },
    timeEntries: {
      clockify: {
        byId: {
          "clock-entry-15": {
            id: "clock-entry-15",
            description: "This is a test entry (15)",
            projectId: "clock-project-05",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-25T18:00:00.000Z",
            end: "2017-06-25T23:00:00.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-16": {
            id: "clock-entry-16",
            description: "This is a test entry (16)",
            projectId: "clock-project-05",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-24T14:00:00.000Z",
            end: "2017-06-24T22:00:00.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-17": {
            id: "clock-entry-17",
            description: "This is a test entry (17)",
            projectId: "clock-project-06",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-23T14:30:00.000Z",
            end: "2017-06-24T04:30:00.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-18": {
            id: "clock-entry-18",
            description: "This is a test entry (18)",
            projectId: "clock-project-06",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-23T14:00:20.000Z",
            end: "2017-06-23T17:05:20.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-19": {
            id: "clock-entry-19",
            description: "This is a test entry (19)",
            projectId: "clock-project-06",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-22T14:00:19.000Z",
            end: "2017-06-22T19:15:19.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-20": {
            id: "clock-entry-20",
            description: "This is a test entry (20)",
            projectId: "clock-project-06",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-21T20:45:57.000Z",
            end: "2017-06-21T21:50:57.000Z",
            year: 2017,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-09": {
            id: "clock-entry-09",
            description: "This is a test entry (09)",
            projectId: "clock-project-03",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-25T18:00:00.000Z",
            end: "2018-06-25T23:00:00.000Z",
            year: 2018,
            tagNames: null,
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-10": {
            id: "clock-entry-10",
            description: "This is a test entry (10)",
            projectId: "clock-project-04",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-24T14:00:00.000Z",
            end: "2018-06-24T22:00:00.000Z",
            year: 2018,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-11": {
            id: "clock-entry-11",
            description: "This is a test entry (11)",
            projectId: "clock-project-04",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-23T14:30:00.000Z",
            end: "2018-06-24T04:30:00.000Z",
            year: 2018,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-12": {
            id: "clock-entry-12",
            description: "This is a test entry (12)",
            projectId: "clock-project-04",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-23T14:00:20.000Z",
            end: "2018-06-23T17:05:20.000Z",
            year: 2018,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-13": {
            id: "clock-entry-13",
            description: "This is a test entry (13)",
            projectId: "clock-project-05",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-22T14:00:19.000Z",
            end: "2018-06-22T19:15:19.000Z",
            year: 2018,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "clock-entry-14": {
            id: "clock-entry-14",
            description: "This is a test entry (14)",
            projectId: "clock-project-05",
            taskId: null,
            userId: "clock-user-01",
            userGroupIds: [],
            workspaceId: "clock-workspace-01",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-21T20:45:57.000Z",
            end: "2018-06-21T21:50:57.000Z",
            year: 2018,
            tagNames: null,
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
        },
        idValues: [
          "clock-entry-15",
          "clock-entry-16",
          "clock-entry-17",
          "clock-entry-18",
          "clock-entry-19",
          "clock-entry-20",
          "clock-entry-09",
          "clock-entry-10",
          "clock-entry-11",
          "clock-entry-12",
          "clock-entry-13",
          "clock-entry-14",
        ],
      },
      toggl: {
        byId: {
          "8001": {
            id: "8001",
            description: "This is a test entry (01)",
            projectId: "2001",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3001",
            clientName: "Test Client A",
            isBillable: false,
            start: "2019-06-25T18:00:00.000Z",
            end: "2019-06-25T23:00:00.000Z",
            year: 2019,
            tagNames: ["tag-a", "tag-b"],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8002": {
            id: "8002",
            description: "This is a test entry (02)",
            projectId: "2001",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3001",
            clientName: "Test Client A",
            isBillable: false,
            start: "2019-06-24T14:00:00.000Z",
            end: "2019-06-24T22:00:00.000Z",
            year: 2019,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8003": {
            id: "8003",
            description: "This is a test entry (03)",
            projectId: "2001",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3001",
            clientName: "Test Client A",
            isBillable: false,
            start: "2019-06-23T14:30:00.000Z",
            end: "2019-06-24T04:30:00.000Z",
            year: 2019,
            tagNames: ["tag-c"],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8004": {
            id: "8004",
            description: "This is a test entry (04)",
            projectId: "2002",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3002",
            clientName: "Test Client B",
            isBillable: false,
            start: "2019-06-23T14:00:20.000Z",
            end: "2019-06-23T17:05:20.000Z",
            year: 2019,
            tagNames: [],
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8005": {
            id: "8005",
            description: "This is a test entry (05)",
            projectId: "2002",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3002",
            clientName: "Test Client B",
            isBillable: false,
            start: "2019-06-22T14:00:19.000Z",
            end: "2019-06-22T19:15:19.000Z",
            year: 2019,
            tagNames: [],
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8006": {
            id: "8006",
            description: "This is a test entry (06)",
            projectId: "2002",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: "3002",
            clientName: "Test Client B",
            isBillable: false,
            start: "2019-06-21T20:45:57.000Z",
            end: "2019-06-21T21:50:57.000Z",
            year: 2019,
            tagNames: [],
            isActive: false,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8007": {
            id: "8007",
            description: "This is a test entry (07)",
            projectId: "2003",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2019-05-02T10:00:00.000Z",
            end: "2019-05-02T12:00:00.000Z",
            year: 2019,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8008": {
            id: "8008",
            description: "This is a test entry (08)",
            projectId: "2003",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2019-05-01T20:00:00.000Z",
            end: "2019-05-01T21:00:00.000Z",
            year: 2019,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8009": {
            id: "8009",
            description: "This is a test entry (09)",
            projectId: "2003",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-25T18:00:00.000Z",
            end: "2018-06-25T23:00:00.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8010": {
            id: "8010",
            description: "This is a test entry (10)",
            projectId: "2004",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-24T14:00:00.000Z",
            end: "2018-06-24T22:00:00.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8011": {
            id: "8011",
            description: "This is a test entry (11)",
            projectId: "2004",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-23T14:30:00.000Z",
            end: "2018-06-24T04:30:00.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8012": {
            id: "8012",
            description: "This is a test entry (12)",
            projectId: "2004",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-23T14:00:20.000Z",
            end: "2018-06-23T17:05:20.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8013": {
            id: "8013",
            description: "This is a test entry (13)",
            projectId: "2005",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-22T14:00:19.000Z",
            end: "2018-06-22T19:15:19.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8014": {
            id: "8014",
            description: "This is a test entry (14)",
            projectId: "2005",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2018-06-21T20:45:57.000Z",
            end: "2018-06-21T21:50:57.000Z",
            year: 2018,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8015": {
            id: "8015",
            description: "This is a test entry (15)",
            projectId: "2005",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-25T18:00:00.000Z",
            end: "2017-06-25T23:00:00.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8016": {
            id: "8016",
            description: "This is a test entry (16)",
            projectId: "2005",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-24T14:00:00.000Z",
            end: "2017-06-24T22:00:00.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8017": {
            id: "8017",
            description: "This is a test entry (17)",
            projectId: "2006",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-23T14:30:00.000Z",
            end: "2017-06-24T04:30:00.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8018": {
            id: "8018",
            description: "This is a test entry (18)",
            projectId: "2006",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-23T14:00:20.000Z",
            end: "2017-06-23T17:05:20.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8019": {
            id: "8019",
            description: "This is a test entry (19)",
            projectId: "2006",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-22T14:00:19.000Z",
            end: "2017-06-22T19:15:19.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
          "8020": {
            id: "8020",
            description: "This is a test entry (20)",
            projectId: "2006",
            taskId: null,
            userId: "6001",
            userGroupIds: [],
            workspaceId: "1001",
            clientId: null,
            clientName: null,
            isBillable: false,
            start: "2017-06-21T20:45:57.000Z",
            end: "2017-06-21T21:50:57.000Z",
            year: 2017,
            tagNames: [],
            isActive: true,
            name: null,
            linkedId: null,
            isIncluded: true,
            memberOf: "timeEntries",
          },
        },
        idValues: [
          "8015",
          "8016",
          "8017",
          "8018",
          "8019",
          "8020",
          "8009",
          "8010",
          "8011",
          "8012",
          "8013",
          "8014",
          "8001",
          "8002",
          "8003",
          "8004",
          "8005",
          "8006",
          "8007",
          "8008",
        ],
      },
      isFetching: false,
    },
    userGroups: {
      clockify: {
        byId: {},
        idValues: [],
      },
      toggl: {
        byId: {
          "5001": {
            id: "5001",
            name: "Test Group A",
            workspaceId: "1001",
            userIds: [],
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "userGroups",
          },
          "5002": {
            id: "5002",
            name: "Test Group B",
            workspaceId: "1001",
            userIds: [],
            entryCount: 0,
            linkedId: null,
            isIncluded: true,
            memberOf: "userGroups",
          },
        },
        idValues: ["5001", "5002"],
      },
      isFetching: false,
    },
    users: {
      clockify: {
        byId: {},
        idValues: [],
      },
      toggl: {
        byId: {
          "6001": {
            id: "6001",
            name: "John Test",
            email: "test-user@test.com",
            isAdmin: null,
            isActive: true,
            userGroupIds: [],
            workspaceId: "1001",
            linkedId: null,
            isIncluded: true,
            memberOf: "users",
            entryCount: 20,
          },
        },
        idValues: ["6001"],
      },
      isFetching: false,
    },
    workspaces: {
      clockify: {
        byId: {
          "clock-workspace-01": {
            id: "clock-workspace-01",
            name: "Test Workspace",
            userIds: [],
            inclusionsByYear: {},
            isAdmin: null,
            workspaceId: "clock-workspace-01",
            entryCount: 0,
            linkedId: "1001",
            isIncluded: true,
            memberOf: "workspaces",
          },
        },
        idValues: ["clock-workspace-01"],
      },
      toggl: {
        byId: {
          "1001": {
            id: "1001",
            name: "Test Workspace",
            userIds: ["6001"],
            inclusionsByYear: {
              "2017": true,
              "2018": true,
              "2019": true,
            },
            isAdmin: true,
            workspaceId: "1001",
            entryCount: 0,
            linkedId: "clock-workspace-01",
            isIncluded: true,
            memberOf: "workspaces",
          },
        },
        idValues: ["1001"],
      },
      workspaceNameBeingFetched: null,
      isFetching: false,
    },
  },
} as any;
