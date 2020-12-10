const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/zoom-getid", (req, res) => {
  let config = {
    method: "get",
    url: `https://api.zoom.us/v2/users/bernardodmelo@gmail.com?login_type=<string>`,
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ilk2TE55WHB0UzQtR2w4TlNWd255UWciLCJleHAiOjE2MDgxNjc1NDQsImlhdCI6MTYwNzU2Mjc0NX0.CnkvAYc5OYAztuW5WJbdLj6ZcpErhs80_W73UA5YU4U`,
      Cookie:
        "_zm_csp_script_nonce=plj65-xcSiqgpyM6KlOR9Q; _zm_mtk_guid=30120b1a51654ebeac19a2b3d36df93d; TS01c8ca07=01e4395013f9aa29856323d49f4bbccc9f6794c9a851fc6df74ee5b7f380de0800e595fd9c515dfe9a50eeb3080867173cefa7ac9e; _zm_ssid=aw1_c_aP1VtP5YQ7GpHW-8V5b1Pg; _zm_page_auth=us04_c_0KUtL36IQVCrK51-01rsnw; TS017870df=01e439501357323f979e2fec821d3b89924eb1102badd14b7bfef7f1bcd3c5acaaeb6948dcce48049b78fc856f11f0084a19c14653; cred=61E54C3C3CCE4343E35E5665EE3D9A36",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
router.post("/zoom-postmeeting", (req, res) => {
  let zoomID = req.body.zoomID;
  let axios = require("axios");
  let thisDate = new Date().toISOString();
  function generatePassword() {
    let length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  let data = JSON.stringify({
    topic: "NewRoom",
    type: 2,
    start_time: `${thisDate}`,
    duration: 60,
    password: `${generatePassword()}`,
    settings: {
      host_video: true,
      participant_video: true,
      cn_meeting: false,
      in_meeting: false,
      join_before_host: false,
      mute_upon_entry: false,
      watermark: false,
      use_pmi: false,
      approval_type: 0,
      registration_type: 1,
      audio: "both",
      auto_recording: "none",
      alternative_hosts: "",
      close_registration: true,
      waiting_room: true,
      registrants_email_notification: true,
      meeting_authentication: true,
      authentication_option: "",
      authentication_domains: "",
    },
  });

  let config = {
    method: "post",
    url: "https://api.zoom.us/v2/users/emS02YK5T0a9A8pIlTTGCg/meetings",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ilk2TE55WHB0UzQtR2w4TlNWd255UWciLCJleHAiOjE2MDgxNjc1NDQsImlhdCI6MTYwNzU2Mjc0NX0.CnkvAYc5OYAztuW5WJbdLj6ZcpErhs80_W73UA5YU4U`,
      Cookie:
        "_zm_csp_script_nonce=plj65-xcSiqgpyM6KlOR9Q; _zm_currency=EUR; _zm_mtk_guid=30120b1a51654ebeac19a2b3d36df93d; TS01c8ca07=01e4395013f9aa29856323d49f4bbccc9f6794c9a851fc6df74ee5b7f380de0800e595fd9c515dfe9a50eeb3080867173cefa7ac9e; _zm_ssid=aw1_c_aP1VtP5YQ7GpHW-8V5b1Pg; _zm_page_auth=us04_c_0KUtL36IQVCrK51-01rsnw; TS017870df=01e439501357323f979e2fec821d3b89924eb1102badd14b7bfef7f1bcd3c5acaaeb6948dcce48049b78fc856f11f0084a19c14653; cred=9C945E748ADFF6A2A525DD5030220AFB",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
module.exports = router;
