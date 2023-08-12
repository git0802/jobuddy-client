import axios from "axios";

import authHeader from "./auth-header";

// const API_URL = `https://3.142.248.96/api/bot`;
const API_URL = `https://jobuddy-server-aivinya.onrender.com/api/bot`;

class Service {
  getBots(data) {
    console.log(data, "jobsearchdata");
    return axios.post(
      `${API_URL}/jobsearch`,
      { url: data },
      {
        headers: authHeader(),
      }
    );
  }

  getIndeedjob(data) {
    console.log(data, "jobsearchindeeddata");
    return axios.post(`${API_URL}/jobsearchindeed`, data, {
      headers: authHeader(),
    });
  }

  uploadTrainData(data) {
    let file = data.file;
    let namespace = data.namespace;
    let formData = new FormData();
    formData.append("namespace", namespace);
    formData.append("file", file);

    return axios.post(`${API_URL}/traindata/upload`, formData, {
      headers: authHeader(),
    });
  }

  getReply(sentMsg) {
    return axios.post(
      `${API_URL}/getReply`,
      { message: sentMsg, namespace: "Linkdin" },
      {
        headers: authHeader(),
      }
    );
  }
  getReplyQA(sentMsg) {
    console.log(sentMsg);
    return axios.post(
      `${API_URL}/getReplyQA`,
      { message: sentMsg.sentMsg, namespace: "QA" },
      {
        headers: authHeader(),
      }
    );
  }

  delTrainDataById(delTrainDataId, delTrainDataFilename, bot_name) {
    return axios.post(
      `${API_URL}/delTrainDataById`,
      { delTrainDataId, delTrainDataFilename, bot_name },
      { headers: authHeader() }
    );
  }

  clearTrainDataByBotId(bot_id, bot_name) {
    return axios.post(
      `${API_URL}/clearTrainDataByBotId`,
      { bot_id, bot_name },
      { headers: authHeader() }
    );
  }

  isAllowedFile(allowedTypes, files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileExtension = "." + file.name.split(".").pop();

      let validFlag = false;
      for (let j = 0; j < allowedTypes.length; j++) {
        let allowedType = allowedTypes[j];
        if (
          fileType === allowedType.type ||
          fileExtension === allowedType.extension
        ) {
          validFlag = true;
          break;
        }
      }
    }
    return true;
  }

  parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
      queryEnd = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {},
      i,
      n,
      v,
      nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }
}

export default new Service();
