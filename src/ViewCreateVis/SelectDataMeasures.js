import React, { useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  ToggleButton,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { GoInfo, GoQuestion } from "react-icons/go";
import {
  changeMeasures,
  changeMeasuresWeight,
  changeGoalWeights,
} from "../action";

const SelectDataMeasures = ({ setView }) => {
  const [show, setShow] = useState(false);
  const [restoreGoal, setRestoreGoal] = useState("");
  const [inputType, setInputType] = useState("scaled");
  const [inputMeasureName, setInputMeasureName] = useState("");
  const [inputMeasureValueList, setInputMeasureValueList] = useState([]);
  const weights = useSelector((state) => state.weights);
  const [habitatSelect, setHabitatSelect] = useState(false);
  const [waterSelect, setWaterSelect] = useState(false);
  const [resourceSelect, setResourceSelect] = useState(false);
  const [resilienceSelect, setResilienceSelect] = useState(false);
  const [economySelect, setEconomySelect] = useState(false);
  const dispatch = useDispatch();
  const arrowIcon = <FontAwesomeIcon icon={faArrowLeft} size="lg" />;

  // For predefined data measures

  const handleChange = (value, name, label, type) => {
    dispatch(changeMeasuresWeight(value, name, label, type));
  };
  // *************         Causing bug when removing datameasures to 0            **************//
  // const handleWeights = (value, goal) => {
  //   const newValue = Number(value) > 100 ? 100 : Number(value);
  //   dispatch(changeGoalWeights(newValue, goal));
  // };

  const [options, setOptions] = useState({
    hab: [
      {
        value: "hab1",
        label: "Padus - Connectivity to Existing Protected Area",
      },
      { value: "hab2", label: "Connectivity of Natural Lands" },
      { value: "hab3", label: "Threat of Urbanization" },
      {
        value: "hab4",
        label: "Land Cover - Composition of Natural Lands ",
      },
    ],
    wq: [
      {
        value: "wq1",
        type: "checkbox",
        label: "303(D): Impaired Watershed Area ",
      },
      {
        value: "wq2",
        type: "checkbox",
        label: "Hydrologic Response to Land-Use Change",
      },
      {
        value: "wq3",
        type: "checkbox",
        label: "Percent Irrigated Agriculture",
      },
      {
        value: "wq4",
        type: "checkbox",
        label: "Lateral Connectivity to Floodplain",
      },
      {
        value: "wq5",
        type: "checkbox",
        label: "Composition of Riparizan Zone Lands",
      },
    ],
    lcmr: [
      {
        value: "lcmr1",
        label: "Vulnerable Area of Terrestrial Endemic Species",
      },
      {
        value: "lcmr2",
        label: "Threatened and Endangered Species - Critical Habitat Area ",
      },
      {
        value: "lcmr3",
        label: "Threatened and Endangered Species - Number of Species ",
      },
      { value: "lcmr4", label: "Light Pollution Index" },
    ],
    cl: [
      { value: "cl1", label: "National Register of Historic Places" },
      { value: "cl2", label: "National Heritage Area" },
      {
        value: "cl3",
        label: "Proximity to Socially Vulnerable Communities",
      },
      { value: "cl4", label: "Community Threat Index " },
    ],
    eco: [
      { value: "eco1", label: "High Priority Working Lands" },
      { value: "eco2", label: "Commercial Fishery Reliance" },
      { value: "eco3", label: "Recreational Fishery Engagement" },
      {
        value: "eco4",
        label: "Access & Recreation - Number of Access Points",
      },
    ],
  });

  let dataMeasList = ["hab", "wq", "lcmr", "cl", "eco"];
  const [dataI, setDataI] = useState(0);

  for (const elem of dataMeasList) {
    if (!weights[elem].weight)
      dataMeasList = dataMeasList.filter((a) => a !== elem);
  }

  const handleNext = () => {
    if (dataI === dataMeasList.length - 1) {
      setView("reviewVisSettings");
    } else {
      setDataI(dataI + 1);
    }
  };

  const handleBack = () => {
    if (dataI === 0) {
      setView("weights");
    } else {
      let newI = dataI - 1;
      setDataI(newI);
    }
  };

  return (
    <Container>
      <h3>Data Measures </h3>
      <p className="smaller-text">
        For each of the previously selected goals, here are data measures
        associated with each goal.
        <br />
        <br />
        Select each relevant data measure and set your prioritization level
        (Low, Medium, High)
      </p>
      {dataMeasList[dataI] === "hab" && (
        <div>
          <span>Habitat:</span>
          <Select
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            options={[
              {
                value: "hab1",
                label: "Connectivity to Existing Protected Area",
              },
              { value: "hab2", label: "Connectivity of Natural Lands" },
              { value: "hab3", label: "Threat of Urbanization" },
              { value: "hab4", label: "Composition of Priority Natural Lands" },
            ]}
            isMulti
            isClearable={false}
            placeholder="Select Habitat measures..."
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            value={weights.hab.selected}
            onChange={(selectedOption) => {
              console.log(habitatSelect);
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                  utility: selected["utility"] || "1",
                  weight: selected["weight"] || "medium",
                }));
              } else {
                state = null;
              }
              dispatch(changeMeasures("hab", state));
            }}
          />

          {weights.hab.selected &&
            weights.hab.selected.map((measure) => (
              <div className="m-2 measure-container" key={measure.value}>
                <span style={{ display: "block" }} className="my-1">
                  {measure.label} &nbsp;
                  <GoInfo data-tip data-for={measure.value} />
                  <ReactTooltip
                    delayHide={500}
                    delayUpdate={500}
                    id={measure.value}
                    clickable="true"
                    type="dark"
                  >
                    <span>
                      {measure.label ===
                      "Connectivity to Existing Protected Area" ? (
                        <>
                          Connectivity to existing protected area indicates if
                          the proposed conservation area is close to an area
                          classified as protected by PAD-US 2.0 data.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/habitat#connectivity-to-existing-protected-area"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Connectivity of Natural Lands" ? (
                        <>
                          A percent attribute that stands for the proportion of
                          area classified as a hub or corridor.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/habitat#connectivity-of-natural-lands"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Threat of Urbanization" ? (
                        <>
                          Threat of urbanization (ToU) indicates the likelihood
                          of the given project area or area of interest (AoI)
                          being urbanized by the year 2060.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/habitat#threat-of-urbanization"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Composition of Priority Natural Lands" ? (
                        <>
                          This attribute prioritizes rare habitat types and
                          those that have been identified as conservation
                          priorities in state and regional plans.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/habitat#composition-of-priority-natural-lands"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </ReactTooltip>
                </span>
                <div className="d-flex justify-content-between utility-btn-cont">
                  <div>
                    <div>
                      <p className="smaller-text no-margin no-padding">
                        {measure.label ===
                        "Connectivity to Existing Protected Area"
                          ? "Is more or less connected better for your project?"
                          : measure.label === "Connectivity of Natural Lands"
                          ? "Is more or less connectivity better for your project?"
                          : measure.label === "Threat of Urbanization"
                          ? "Is higher or lower threat of urbanization better for your project?"
                          : measure.label ===
                            "Composition of Priority Natural Lands"
                          ? "Are more or less natural lands better for your project?"
                          : ""}
                      </p>
                    </div>
                    <ButtonGroup className="utility-inner" toggle>
                      <ToggleButton
                        type="radio"
                        data-tip
                        data-for={"positive-" + measure.value}
                        variant="outline-secondary"
                        name="utility"
                        value="1"
                        checked={measure.utility === "1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "hab"
                          )
                        }
                      >
                        {measure.label ===
                        "Connectivity to Existing Protected Area"
                          ? "More"
                          : measure.label === "Connectivity of Natural Lands"
                          ? "More"
                          : measure.label === "Threat of Urbanization"
                          ? "Lower"
                          : measure.label ===
                            "Composition of Priority Natural Lands"
                          ? "More"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="positive-hab" place="top">
                        {measure.label ===
                        "Connectivity to Existing Protected Area"
                          ? "More connectivity is better."
                          : measure.label === "Connectivity of Natural Lands"
                          ? "More connectivity is better."
                          : measure.label === "Threat of Urbanization"
                          ? "Lower threat of urbanization is better."
                          : measure.label ===
                            "Composition of Priority Natural Lands"
                          ? "More natural lands is better."
                          : ""}
                      </ReactTooltip>
                      <ToggleButton
                        type="radio"
                        data-tip
                        data-for={"negative-" + measure.value}
                        variant="outline-secondary"
                        name="utility"
                        value="-1"
                        checked={measure.utility === "-1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "hab"
                          )
                        }
                      >
                        {measure.label ===
                        "Connectivity to Existing Protected Area"
                          ? "Less"
                          : measure.label === "Connectivity of Natural Lands"
                          ? "Less"
                          : measure.label === "Threat of Urbanization"
                          ? "Higher"
                          : measure.label ===
                            "Composition of Priority Natural Lands"
                          ? "Less"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="less" place="top">
                        {measure.label ===
                        "Connectivity to Existing Protected Area"
                          ? "Less connectivity is better."
                          : measure.label === "Connectivity of Natural Lands"
                          ? "Less connectivity is better."
                          : measure.label === "Threat of Urbanization"
                          ? "Higher threat of urbanization is better."
                          : measure.label ===
                            "Composition of Priority Natural Lands"
                          ? "Less natural lands is better."
                          : ""}
                      </ReactTooltip>
                    </ButtonGroup>
                  </div>
                  <div>
                    <div>
                      <p className="smaller-text no-margin">
                        Select the priority
                      </p>
                      <br />
                    </div>
                    <ButtonGroup toggle className="ml-2 weight-inner">
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="low"
                        checked={measure.weight === "low"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "hab"
                          )
                        }
                      >
                        Low
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="medium"
                        checked={measure.weight === "medium"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "hab"
                          )
                        }
                      >
                        Medium
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="high"
                        checked={measure.weight === "high"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "hab"
                          )
                        }
                      >
                        High
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}

          <br />
          <Container className="add-assess-cont">
            <Button variant="secondary" onClick={handleBack}>
              {arrowIcon} Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        </div>
      )}

      {dataMeasList[dataI] === "wq" && (
        <div>
          <span>Water Quality & Quantity:</span>
          <Select
            styles={{
              menuPortal: (base, state) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
            options={[
              { value: "wq1", label: "303(d): Impaired Watershed Area" },
              { value: "wq2", label: "Hydrologic Response to Land-Use Change" },
              { value: "wq3", label: "Percent Irrigated Agriculture" },
              { value: "wq4", label: "Lateral Connectivity of Floodplain" },
              { value: "wq5", label: "Composition of Riparizan Zone Lands" },
              { value: "wq6", label: "Presence of Impoundments" },
            ]}
            isMulti
            placeholder="Select Water Quality & Quantity measures..."
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            value={weights.wq.selected}
            isClearable={false}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                  utility: selected["utility"] || "1",
                  weight: selected["weight"] || "medium",
                }));
              } else {
                state = null;
              }
              dispatch(changeMeasures("wq", state));
            }}
          />

          {weights.wq.selected &&
            weights.wq.selected.map((measure) => (
              <div className="m-2 measure-container" key={measure.value}>
                <span style={{ display: "block" }} className="my-1">
                  {measure.label} &nbsp;
                  <GoInfo data-tip data-for={measure.value} />
                  <ReactTooltip
                    place="top"
                    delayHide={500}
                    delayUpdate={500}
                    id={measure.value}
                    clickable="true"
                    type="dark"
                  >
                    <span>
                      {measure.label === "303(d): Impaired Watershed Area" ? (
                        <>
                          A percent attribute that stands for the proportion of
                          impaired watershed within each hexagon.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#303-d-impaired-watershed-area"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Hydrologic Response to Land-Use Change" ? (
                        <>
                          The magnitude of change in peak flow due to
                          Land-Use/Land-Cover change from 1996 to 2016.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#hydrologic-response-to-land-use-change"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Percent Irrigated Agriculture" ? (
                        <>
                          The proportion (%) of the area of interest that is
                          covered by irrigated agriculture.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#percent-irrigated-agriculture"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Lateral Connectivity of Floodplain" ? (
                        <>
                          The proportion of floodplain within the area of
                          interest that is connected.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#lateral-connectivity-of-floodplain"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Composition of Riparizan Zone Lands" ? (
                        <>
                          An average index value of the composition of lands
                          within a 100-meter buffer of streams.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#composition-of-riparian-zone-lands"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Presence of Impoundments" ? (
                        <>
                          This measure describes whether or not an area is
                          impacted by hydromodification.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/waterquality_quantity#presence-of-impoundments"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </ReactTooltip>
                </span>
                <div className="d-flex justify-content-between utility-btn-cont">
                  <div>
                    <div>
                      <p className="smaller-text no-margin no-padding">
                        {measure.label === "303(d): Impaired Watershed Area"
                          ? "Is more or less impaired area better for your project?"
                          : measure.label ===
                            "Hydrologic Response to Land-Use Change"
                          ? "Is more or less impact on hydrology better for your project?"
                          : measure.label === "Percent Irrigated Agriculture"
                          ? "Is more or less irrigated agriculture better for your project?"
                          : measure.label ===
                            "Lateral Connectivity of Floodplain"
                          ? "Is more or less connectivity better for your project?"
                          : measure.label ===
                            "Composition of Riparizan Zone Lands"
                          ? "Is more or less natural riparian zone better for your project?"
                          : measure.label === "Presence of Impoundments"
                          ? "Is more or less impoundment better for your project?"
                          : ""}
                      </p>
                    </div>
                    <ButtonGroup className="utility-inner" toggle>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        data-tip
                        data-for={"positive-" + measure.value}
                        name="utility"
                        value="1"
                        checked={measure.utility === "1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "wq"
                          )
                        }
                      >
                        {measure.label === "303(d): Impaired Watershed Area"
                          ? "Less"
                          : measure.label ===
                            "Hydrologic Response to Land-Use Change"
                          ? "Less"
                          : measure.label === "Percent Irrigated Agriculture"
                          ? "Less"
                          : measure.label ===
                            "Lateral Connectivity of Floodplain"
                          ? "More"
                          : measure.label ===
                            "Composition of Riparizan Zone Lands"
                          ? "More"
                          : measure.label === "Presence of Impoundments"
                          ? "Less"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="positive-wq" place="top">
                        {measure.label === "303(d): Impaired Watershed Area"
                          ? "Less impaired area is better."
                          : measure.label ===
                            "Hydrologic Response to Land-Use Change"
                          ? "Less impact on hydrology is better."
                          : measure.label === "Percent Irrigated Agriculture"
                          ? "Less irrigated agriculture is better."
                          : measure.label ===
                            "Lateral Connectivity of Floodplain"
                          ? "More connectivity is better."
                          : measure.label ===
                            "Composition of Riparizan Zone Lands"
                          ? "More natural riparian zone is better."
                          : measure.label === "Presence of Impoundments"
                          ? "Less impoundment is better."
                          : ""}
                      </ReactTooltip>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        data-tip
                        data-for={"negative-" + measure.value}
                        name="utility"
                        value="-1"
                        checked={measure.utility === "-1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "wq"
                          )
                        }
                      >
                        {measure.label === "303(d): Impaired Watershed Area"
                          ? "More"
                          : measure.label ===
                            "Hydrologic Response to Land-Use Change"
                          ? "More"
                          : measure.label === "Percent Irrigated Agriculture"
                          ? "More"
                          : measure.label ===
                            "Lateral Connectivity of Floodplain"
                          ? "Less"
                          : measure.label ===
                            "Composition of Riparizan Zone Lands"
                          ? "Less"
                          : measure.label === "Presence of Impoundments"
                          ? "More"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="negative-wq" place="top">
                        {measure.label === "303(d): Impaired Watershed Area"
                          ? "More impaired area is better."
                          : measure.label ===
                            "Hydrologic Response to Land-Use Change"
                          ? "More impact on hydrology is better."
                          : measure.label === "Percent Irrigated Agriculture"
                          ? "More irrigated agriculture is better."
                          : measure.label ===
                            "Lateral Connectivity of Floodplain"
                          ? "Less connectivity is better."
                          : measure.label ===
                            "Composition of Riparizan Zone Lands"
                          ? "Less natural riparian zone is better."
                          : measure.label === "Presence of Impoundments"
                          ? "More impoundment is better."
                          : ""}
                      </ReactTooltip>
                    </ButtonGroup>
                  </div>
                  <div>
                    <div>
                      <p className="smaller-text no-margin">
                        Select the priority
                      </p>
                      <br />
                    </div>
                    <ButtonGroup toggle className="ml-2 weight-inner">
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="low"
                        checked={measure.weight === "low"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "wq"
                          )
                        }
                      >
                        Low
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="medium"
                        checked={measure.weight === "medium"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "wq"
                          )
                        }
                      >
                        Medium
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="high"
                        checked={measure.weight === "high"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "wq"
                          )
                        }
                      >
                        High
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}

          <br />
          <Container className="add-assess-cont">
            <Button variant="secondary" onClick={handleBack}>
              {arrowIcon} Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        </div>
      )}

      {dataMeasList[dataI] === "lcmr" && (
        <div>
          <span>Living Coastal & Marine Resources:</span>
          <Select
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            options={[
              {
                value: "lcmr1",
                label: "Vulnerable Areas of Terrestrial Endemic Species",
              },
              {
                value: "lcmr2",
                label:
                  "Threatened and Endangered Species - Critical Habitat Area",
              },
              {
                value: "lcmr3",
                label: "Threatened and Endangered Species - Number of Species",
              },
              { value: "lcmr4", label: "Light Pollution Index" },
              { value: "lcmr5", label: "Terrestrial Vertebrate Biodiversity" },
              { value: "lcmr6", label: "Vulnerability to Invasive Plants" },
            ]}
            isMulti
            placeholder="Select Living Coastal & Marine Resources measures..."
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable={false}
            value={weights.lcmr.selected}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                  utility: selected["utility"] || "1",
                  weight: selected["weight"] || "medium",
                }));
              } else {
                state = null;
              }
              dispatch(changeMeasures("lcmr", state));
            }}
          />

          {weights.lcmr.selected &&
            weights.lcmr.selected.map((measure) => (
              <div className="m-2 measure-container" key={measure.value}>
                <span style={{ display: "block" }} className="my-1">
                  {measure.label} &nbsp;
                  <GoInfo data-tip data-for={measure.value} />
                  <ReactTooltip
                    place="top"
                    delayHide={500}
                    delayUpdate={500}
                    id={measure.value}
                    clickable="true"
                    type="dark"
                  >
                    <span>
                      {measure.label ===
                      "Vulnerable Areas of Terrestrial Endemic Species" ? (
                        <>
                          This measure represents the ratio of endemic species
                          to the amount of protected land in the contiguous U.S.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/lcmr#vulnerable-areas-of-terrestrial-endemic-species"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Threatened and Endangered Species - Critical Habitat Area" ? (
                        <>
                          The measure is based on the U.S. Fish and Wildlife
                          Service designated federally threatened and endangered
                          (T&E) critical habitat.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/lcmr#threatened-and-endangered-species-critical-habitat-area"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Threatened and Endangered Species - Number of Species" ? (
                        <>
                          This attribute measures the number of federally
                          threatened and endangered (T&E) species that have
                          habitat ranges identified within each hexagon.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/lcmr#threatened-and-endangered-species-number-of-species"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Light Pollution Index" ? (
                        <>
                          An index that measures the intensity of light
                          pollution within each hexagon.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/lcmr#light-pollution-index"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Terrestrial Vertebrate Biodiversity" ? (
                        "Definition of Terrestrial Vertebrate Biodiversity coming soon."
                      ) : measure.label ===
                        "Vulnerability to Invasive Plants" ? (
                        "Definition of Vulnerability to Invasive Plants coming soon."
                      ) : (
                        ""
                      )}
                    </span>
                  </ReactTooltip>
                </span>
                <div className="d-flex justify-content-between utility-btn-cont">
                  <div>
                    <div>
                      <p className="smaller-text no-margin no-padding">
                        {measure.label ===
                        "Vulnerable Areas of Terrestrial Endemic Species"
                          ? "Is more or less vulnerable area better for your project?"
                          : measure.label ===
                            "Threatened and Endangered Species - Critical Habitat Area"
                          ? "Is more or less critical habitat better for your project?"
                          : measure.label ===
                            "Threatened and Endangered Species - Number of Species"
                          ? "Are more or less T&E species better for your project?"
                          : measure.label === "Light Pollution Index"
                          ? "Is more or less light pollution better for your project?"
                          : measure.label ===
                            "Terrestrial Vertebrate Biodiversity"
                          ? "Is higher or lower terrestrial vertebrate biodiversity better for your project?"
                          : measure.label === "Vulnerability to Invasive Plants"
                          ? "Is higher or lower vulnerability to invasive plants better for your project?"
                          : ""}
                      </p>
                    </div>
                    <ButtonGroup className="utility-inner" toggle>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="utility"
                        data-tip
                        data-for={"positive-" + measure.value}
                        value="1"
                        checked={measure.utility === "1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "lcmr"
                          )
                        }
                      >
                        {measure.label ===
                        "Vulnerable Areas of Terrestrial Endemic Species"
                          ? "More"
                          : measure.label ===
                            "Threatened and Endangered Species - Critical Habitat Area"
                          ? "More"
                          : measure.label ===
                            "Threatened and Endangered Species - Number of Species"
                          ? "More"
                          : measure.label === "Light Pollution Index"
                          ? "Less"
                          : measure.label ===
                            "Terrestrial Vertebrate Biodiversity"
                          ? "Higher"
                          : measure.label === "Vulnerability to Invasive Plants"
                          ? "Higher"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="positive-lcmr" place="top">
                        {measure.label ===
                        "Vulnerable Areas of Terrestrial Endemic Species"
                          ? "More vulnerable area is better"
                          : measure.label ===
                            "Threatened and Endangered Species - Critical Habitat Area"
                          ? "More critical habitat is better"
                          : measure.label ===
                            "Threatened and Endangered Species - Number of Species"
                          ? "More T&E species is better"
                          : measure.label === "Light Pollution Index"
                          ? "Less light pollution is better"
                          : measure.label ===
                            "Terrestrial Vertebrate Biodiversity"
                          ? "Higher terrestrial vertebrate biodiversity is better"
                          : measure.label === "Vulnerability to Invasive Plants"
                          ? "Higher vulnerability to invasive plants is better"
                          : ""}
                      </ReactTooltip>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="utility"
                        data-tip
                        data-for={"negative-" + measure.value}
                        value="-1"
                        checked={measure.utility === "-1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "lcmr"
                          )
                        }
                      >
                        {measure.label ===
                        "Vulnerable Areas of Terrestrial Endemic Species"
                          ? "Less"
                          : measure.label ===
                            "Threatened and Endangered Species - Critical Habitat Area"
                          ? "Less"
                          : measure.label ===
                            "Threatened and Endangered Species - Number of Species"
                          ? "Less"
                          : measure.label === "Light Pollution Index"
                          ? "More"
                          : measure.label ===
                            "Terrestrial Vertebrate Biodiversity"
                          ? "Lower"
                          : measure.label === "Vulnerability to Invasive Plants"
                          ? "Lower"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="negative-lcmr" place="top">
                        {measure.label ===
                        "Vulnerable Areas of Terrestrial Endemic Species"
                          ? "Less vulnerable area is better"
                          : measure.label ===
                            "Threatened and Endangered Species - Critical Habitat Area"
                          ? "Less critical habitat is better"
                          : measure.label ===
                            "Threatened and Endangered Species - Number of Species"
                          ? "Less T&E species is better"
                          : measure.label === "Light Pollution Index"
                          ? "More light pollution is better"
                          : measure.label ===
                            "Terrestrial Vertebrate Biodiversity"
                          ? "Lower terrestrial vertebrate biodiversity is better"
                          : measure.label === "Vulnerability to Invasive Plants"
                          ? "Lower vulnerability to invasive plants is better"
                          : ""}
                      </ReactTooltip>
                    </ButtonGroup>
                  </div>
                  <div>
                    <div>
                      <p className="smaller-text no-margin">
                        Select the priority
                      </p>
                      <br />
                    </div>
                    <ButtonGroup toggle className="ml-2 weight-inner">
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="low"
                        checked={measure.weight === "low"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "lcmr"
                          )
                        }
                      >
                        Low
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="medium"
                        checked={measure.weight === "medium"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "lcmr"
                          )
                        }
                      >
                        Medium
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="high"
                        checked={measure.weight === "high"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "lcmr"
                          )
                        }
                      >
                        High
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}

          <br />
          <Container className="add-assess-cont">
            <Button variant="secondary" onClick={handleBack}>
              {arrowIcon} Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        </div>
      )}

      {dataMeasList[dataI] === "cl" && (
        <div>
          <span>Community Resilience:</span>
          <Select
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            options={[
              { value: "cl1", label: "National Register of Historic Places" },
              { value: "cl2", label: "National Heritage Area" },
              {
                value: "cl3",
                label: "Proximity to Socially Vulnerable Communities",
              },
              { value: "cl4", label: "Community Threat Index" },
              { value: "cl5", label: "Social Vulnerability Index" },
            ]}
            isMulti
            placeholder="Select Community Resilience measures..."
            name="colors"
            isClearable={false}
            className="basic-multi-select"
            classNamePrefix="select"
            value={weights.cl.selected}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                  utility: selected["utility"] || "1",
                  weight: selected["weight"] || "medium",
                }));
              } else {
                state = null;
              }
              dispatch(changeMeasures("cl", state));
            }}
          />

          {weights.cl.selected &&
            weights.cl.selected.map((measure) => (
              <div className="m-2 measure-container" key={measure.value}>
                <span style={{ display: "block" }} className="my-1">
                  {measure.label} &nbsp;
                  <GoInfo data-tip data-for={measure.value} />
                  <ReactTooltip
                    place="top"
                    delayHide={500}
                    delayUpdate={500}
                    id={measure.value}
                    clickable="true"
                    type="dark"
                  >
                    <span>
                      {measure.label ===
                      "National Register of Historic Places" ? (
                        <>
                          A numeric attribute that represents the counts of
                          historic places within each hexagon.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/community_resilience#national-register-of-historic-places"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "National Heritage Area" ? (
                        <>
                          A percent attribute that stands for the proportion of
                          heritage area within each hexagon.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/community_resilience#national-heritage-area"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Proximity to Socially Vulnerable Communities" ? (
                        <>
                          This measure indicates the proximity to communities
                          that are socially vulnerable according to the National
                          Oceanic and Atmospheric Administration’s (NOAA) Social
                          Vulnerability Index.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/community_resilience#proximity-to-socially-vulnerable-communities"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Community Threat Index" ? (
                        <>
                          The Community Threat Index (CTI) comes from the
                          Coastal Resilience Evaluation and Siting Tool (CREST).
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/community_resilience#community-threat-index"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Social Vulnerability Index" ? (
                        "Definition of Social Vulnerability Index Coming Soon"
                      ) : (
                        ""
                      )}
                    </span>
                  </ReactTooltip>
                </span>
                <div className="d-flex justify-content-between utility-btn-cont">
                  <div>
                    <div>
                      <p className="smaller-text no-margin no-padding">
                        {measure.label ===
                        "National Register of Historic Places"
                          ? "Are more or less historic places better for your project?"
                          : measure.label === "National Heritage Area"
                          ? "Are more or less national heritage areas better for your project?"
                          : measure.label === "Community Threat Index"
                          ? "Is higher or lower threat to community better for your project?"
                          : ""}
                      </p>
                    </div>
                    {measure.label !==
                      "Proximity to Socially Vulnerable Communities" &&
                      measure.label !== "Social Vulnerability Index" && (
                        <ButtonGroup className="utility-inner" toggle>
                          <ToggleButton
                            type="radio"
                            variant="outline-secondary"
                            data-tip
                            data-for={"positive-" + measure.value}
                            name="utility"
                            value="1"
                            checked={measure.utility === "1"}
                            onChange={(e) =>
                              handleChange(
                                e.currentTarget.value,
                                e.currentTarget.name,
                                measure.value,
                                "cl"
                              )
                            }
                          >
                            {measure.label ===
                            "National Register of Historic Places"
                              ? "More"
                              : measure.label === "National Heritage Area"
                              ? "More"
                              : measure.label ===
                                "Proximity to Socially Vulnerable Communities"
                              ? "More"
                              : measure.label === "Community Threat Index"
                              ? "Higher"
                              : measure.label === "Social Vulnerability Index"
                              ? "Higher"
                              : ""}
                          </ToggleButton>
                          <ReactTooltip id="positive-cl" place="top">
                            {measure.label ===
                            "National Register of Historic Places"
                              ? "More historic places is better"
                              : measure.label === "National Heritage Area"
                              ? "More national heritage areas is better"
                              : measure.label ===
                                "Proximity to Socially Vulnerable Communities"
                              ? "More connection to socially vulnerable communities is better"
                              : measure.label === "Community Threat Index"
                              ? "Higher threat to community is better"
                              : measure.label === "Social Vulnerability Index"
                              ? "Higher social vulnerability is better"
                              : ""}
                          </ReactTooltip>
                          <ToggleButton
                            type="radio"
                            variant="outline-secondary"
                            data-tip
                            data-for={"negative-" + measure.value}
                            name="utility"
                            value="-1"
                            checked={measure.utility === "-1"}
                            onChange={(e) =>
                              handleChange(
                                e.currentTarget.value,
                                e.currentTarget.name,
                                measure.value,
                                "cl"
                              )
                            }
                          >
                            {measure.label ===
                            "National Register of Historic Places"
                              ? "Less"
                              : measure.label === "National Heritage Area"
                              ? "Less"
                              : measure.label ===
                                "Proximity to Socially Vulnerable Communities"
                              ? "Less"
                              : measure.label === "Community Threat Index"
                              ? "Lower"
                              : measure.label === "Social Vulnerability Index"
                              ? "Lower"
                              : ""}
                          </ToggleButton>
                          <ReactTooltip id="negative-cl" place="top">
                            {measure.label ===
                            "National Register of Historic Places"
                              ? "Fewer historic places is better"
                              : measure.label === "National Heritage Area"
                              ? "Less national heritage areas is better"
                              : measure.label ===
                                "Proximity to Socially Vulnerable Communities"
                              ? "Less connection to socially vulnerable communities is better"
                              : measure.label === "Community Threat Index"
                              ? "Lower threat to community is better"
                              : measure.label === "Social Vulnerability Index"
                              ? "Lower social vulnerability is better"
                              : ""}
                          </ReactTooltip>
                        </ButtonGroup>
                      )}
                  </div>
                  <div>
                    <div>
                      <p className="smaller-text no-margin">
                        Select the priority
                      </p>
                      <br />
                    </div>
                    <ButtonGroup toggle className="ml-2 weight-inner">
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="low"
                        checked={measure.weight === "low"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "cl"
                          )
                        }
                      >
                        Low
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="medium"
                        checked={measure.weight === "medium"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "cl"
                          )
                        }
                      >
                        Medium
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="high"
                        checked={measure.weight === "high"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "cl"
                          )
                        }
                      >
                        High
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}

          <br />
          <Container className="add-assess-cont">
            <Button variant="secondary" onClick={handleBack}>
              {arrowIcon} Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        </div>
      )}

      {dataMeasList[dataI] === "eco" && (
        <div>
          <span>Gulf Economy:</span>
          <Select
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            options={[
              { value: "eco1", label: "High Priority Working Lands" },
              { value: "eco2", label: "Commercial Fishing Reliance" },
              { value: "eco3", label: "Recreational Fishing Engagement" },
              {
                value: "eco4",
                label: "Access & Recreation - Number of Access Points",
              },
            ]}
            isMulti
            placeholder="Select Gulf Economy..."
            name="colors"
            isClearable={false}
            className="basic-multi-select"
            classNamePrefix="select"
            value={weights.eco.selected}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                  utility: selected["utility"] || "1",
                  weight: selected["weight"] || "medium",
                }));
              } else {
                state = null;
              }
              dispatch(changeMeasures("eco", state));
            }}
          />

          {weights.eco.selected &&
            weights.eco.selected.map((measure) => (
              <div className="m-2 measure-container" key={measure.value}>
                <span style={{ display: "block" }} className="my-1">
                  {measure.label} &nbsp;
                  <GoInfo data-tip data-for={measure.value} />
                  <ReactTooltip
                    place="top"
                    delayHide={500}
                    delayUpdate={500}
                    id={measure.value}
                    clickable="true"
                    type="dark"
                  >
                    <span>
                      {measure.label === "High Priority Working Lands" ? (
                        <>
                          The percentage area of pine, cropland, and pasture/hay
                          classes from the National Land Cover Database (NLCD)
                          2016 classification map.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/economy#high-priority-working-lands"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label === "Commercial Fishing Reliance" ? (
                        <>
                          Commercial fishing reliance measures the presence of
                          commercial fishing through fishing activity as shown
                          through permits and vessel landings relative to the
                          population of a community.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/economy#commercial-fishing-reliance"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Recreational Fishing Engagement" ? (
                        <>
                          Recreational fishing engagement measures the presence
                          of recreational fishing through fishing activity
                          estimates, including charter fishing pressure, private
                          fishing pressure, and shore fishing pressure.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/economy#recreational-fishing-engagement"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : measure.label ===
                        "Access & Recreation - Number of Access Points" ? (
                        <>
                          This measure indicates the number of points within a
                          25 km buffer radius of a hexagon, where the public can
                          access places to engage in outdoor recreation.
                          <br />
                          <a
                            href="https://scatoolsuite.gitbook.io/sca-tool-suite/support/economy#access-and-recreation-number-of-access-points"
                            target="_blank"
                            rel="noreferrer"
                            className="tool-link"
                          >
                            Click for more
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </ReactTooltip>
                </span>
                <div className="d-flex justify-content-between utility-btn-cont">
                  <div>
                    <div>
                      <p className="smaller-text no-margin no-padding">
                        {measure.label === "High Priority Working Lands"
                          ? "Are more or less priority working lands better for your project?"
                          : measure.label === "Commercial Fishing Reliance"
                          ? "Is higher or lower reliance better for your project?"
                          : measure.label === "Recreational Fishing Engagement"
                          ? "Is more or less engagement better for your project?"
                          : measure.label ===
                            "Access & Recreation - Number of Access Points"
                          ? "Are more or less recreational access points better for your project?"
                          : ""}
                      </p>
                    </div>
                    <ButtonGroup className="utility-inner" toggle>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        data-tip
                        data-for={"positive-" + measure.value}
                        name="utility"
                        value="1"
                        checked={measure.utility === "1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "eco"
                          )
                        }
                      >
                        {measure.label === "High Priority Working Lands"
                          ? "More"
                          : measure.label === "Commercial Fishing Reliance"
                          ? "Higher"
                          : measure.label === "Recreational Fishing Engagement"
                          ? "More"
                          : measure.label ===
                            "Access & Recreation - Number of Access Points"
                          ? "More"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="positive-eco" place="top">
                        {measure.label === "High Priority Working Lands"
                          ? "More priority working lands is better"
                          : measure.label === "Commercial Fishing Reliance"
                          ? "Higher reliance is better"
                          : measure.label === "Recreational Fishing Engagement"
                          ? "More engagement is better"
                          : measure.label ===
                            "Access & Recreation - Number of Access Points"
                          ? "More recreational access points is better"
                          : ""}
                      </ReactTooltip>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        data-tip
                        data-for={"negative-" + measure.value}
                        name="utility"
                        value="-1"
                        checked={measure.utility === "-1"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "eco"
                          )
                        }
                      >
                        {measure.label === "High Priority Working Lands"
                          ? "Less"
                          : measure.label === "Commercial Fishing Reliance"
                          ? "Lower"
                          : measure.label === "Recreational Fishing Engagement"
                          ? "Less"
                          : measure.label ===
                            "Access & Recreation - Number of Access Points"
                          ? "Less"
                          : ""}
                      </ToggleButton>
                      <ReactTooltip id="negative-eco" place="top">
                        {measure.label === "High Priority Working Lands"
                          ? "Less priority working lands is better"
                          : measure.label === "Commercial Fishing Reliance"
                          ? "Lower reliance is better"
                          : measure.label === "Recreational Fishing Engagement"
                          ? "Less engagement is better"
                          : measure.label ===
                            "Access & Recreation - Number of Access Points"
                          ? "Less recreational access points is better"
                          : ""}
                      </ReactTooltip>
                    </ButtonGroup>
                  </div>
                  <div>
                    <div>
                      <p className="smaller-text no-margin">
                        Select the priority
                      </p>
                      <br />
                    </div>
                    <ButtonGroup toggle className="ml-2 weight-inner">
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="low"
                        checked={measure.weight === "low"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "eco"
                          )
                        }
                      >
                        Low
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="medium"
                        checked={measure.weight === "medium"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "eco"
                          )
                        }
                      >
                        Medium
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant="outline-secondary"
                        name="weight"
                        value="high"
                        checked={measure.weight === "high"}
                        onChange={(e) =>
                          handleChange(
                            e.currentTarget.value,
                            e.currentTarget.name,
                            measure.value,
                            "eco"
                          )
                        }
                      >
                        High
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}

          <br />
          <Container className="add-assess-cont">
            <Button variant="secondary" onClick={handleBack}>
              {arrowIcon} Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        </div>
      )}
    </Container>
  );
};

export default SelectDataMeasures;