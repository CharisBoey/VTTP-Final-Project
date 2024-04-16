const CLIENT_ID="279744208752-9odck6g3k3tfsgdoqt78fa4sfp3jpo1t.apps.googleusercontent.com"; 
const API_KEY="AIzaSyDlLJsT8l0PqOgRRrM8_Ztnz4XBp3hmWDc";
const DISCOVERY_DOC="https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES="https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;
let gapiInitilized; 

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

function gapiLoaded() {
  gapiInitilized = new Promise((successful, reject) => {
    gapi.load("client", () => {
      initializeGapiClient()
        .then(() => successful())
        .catch((error) => reject(error));
    });
  });
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "",
  });
  gisInited = true;
}

async function createGoogleEvent(eventDetails) {
  try {
    await gapiInitilized

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      await scheduleEvent(eventDetails);
    };
    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }

  } catch (error) {
    console.log(error);
  }
}

function scheduleEvent(eventDetails) {
  const event = {
    summary: eventDetails.summary,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "Asia/Singapore",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "Asia/Singapore",
    },
    attendees: [{ email: eventDetails.email }, { email: "ris.developertesting@gmail.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  request.execute(function (event) {
    console.info("Event created: " + event.htmlLink);
  });
}