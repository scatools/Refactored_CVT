import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import emailjs from '@emailjs/browser';
import * as Survey from "survey-react";
import "survey-react/modern.css";
import { MdVideoLibrary } from "react-icons/md"
import { AiFillDatabase } from "react-icons/ai"
import { SiGitbook, SiGithub } from "react-icons/si"

const Help = () => {
  Survey.StylesManager.applyTheme("modern");

  const json = {
    elements: [
      {
        type: "text",
        name: "name",
        title: "Please enter your name",
        isRequired: true
      },
      {
        type: "text",
        name: "institution",
        title: "Please enter your institution",
        isRequired: false
      },
      {
        type: "text",
        name: "email",
        title: "Please enter your Email",
        isRequired: true
      },
      {
        type: "text", 
        name: "feedback", 
        title: "Please tell us any support you need or any feedback you have", 
        isRequired: true
      }
    ]
  };

  const onComplete = (survey, options) => {
    console.log("Survey results: " + JSON.stringify(survey.data));
    emailjs.send('service_scagulf', 'template_scagulf', survey.data, 'user_itRozDPb2UuRzL2q0CMkQ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const model = new Survey.Model(json);
  
  return (
    <div>
      <Container>
        <Jumbotron>
          <br/>
          <h2>Support Ticket</h2>
          <p className="lead">
            Please open a support ticket or leave your feedback here
          </p>
          <Survey.Survey model={model} onComplete={onComplete}/>
          <hr/>
          <h2>Contact Us</h2>
          <p className="lead">
            Please contact our project managers for more information about SCA Project
          </p>
          <div className="d-flex">
            <div className="d-flex flex-column justify-content-between" style={{width:"50%"}}>
              <b>Ione Anderson</b>
              <p className="text-muted my-1">Project Coordinator</p>
              <br/><br/><br/>
              <Button className="btn-primary" style={{width:"30%"}} href="mailto:ioneanderson@icloud.com">
                Send Email
              </Button>
            </div>
            <div className="d-flex flex-column justify-content-between" style={{width:"50%"}}>
              <b>Dr. Kristine Evans</b>
              <p className="text-muted my-1">Principal Investigator</p>
              <p className="text-muted my-1">
                Assistant Professor of Conservation Biology, Mississippi State University
              </p>
              <p className="text-muted my-1">
                Co-Director of the Quantitative Ecology and Spatial Technologies Lab (QuEST) Lab
              </p>
              <Button className="btn-primary" style={{width:"30%"}} href="mailto:kristine.evans@msstate.edu">
                Send Email
              </Button>
            </div>
          </div>
          <hr/>
          <h2>Resources</h2>
          <p className="lead">
            Please utilize the following resources to know more about the Conservation Visualization Tool
          </p>
          <div className="d-flex justify-content-between">
            <p className="text-muted">
              <b>Video Tutorial </b>
              <a href="https://www.quest.fwrc.msstate.edu/sca/help-docs.php" target="_blank">
                <MdVideoLibrary size={30}/>
              </a>
            </p>
            <p className="text-muted">
              <b>Data Overview </b>
              <a href="https://studio.mapbox.com/tilesets/chuck0520.2jhtgjk6" target="_blank">
                <AiFillDatabase size={30}/>
              </a>
            </p>
            <p className="text-muted">
              <b>GitBook Documentation </b>
              <a href="https://scatoolsuite.gitbook.io/sca-tool-suite/" target="_blank">
                <SiGitbook size={30}/>
              </a>
            </p>
            <p className="text-muted">
              <b>GitHub Repository </b>
              <a href="https://github.com/scatools/CVT_PC" target="_blank">
                <SiGithub size={30}/>
              </a>
            </p>
          </div>
        </Jumbotron>
      </Container>
    </div>
  );
};

export default Help;
